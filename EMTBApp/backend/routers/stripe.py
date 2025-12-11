from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
import stripe
import os
from datetime import datetime, timedelta
from database import get_db
from models import User
from auth import get_current_user

router = APIRouter()

stripe.api_key = os.getenv("STRIPE_API_KEY")
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET")

# Stripe Price IDs (set these in Railway environment after creating products)
PREMIUM_PRICE_ID = os.getenv("STRIPE_PREMIUM_PRICE_ID", "price_premium_monthly")
SEMESTER_PRICE_ID = os.getenv("STRIPE_SEMESTER_PRICE_ID", "price_semester_onetime")

@router.post("/create-checkout-session")
async def create_checkout_session(
    price_type: str,  # "premium" or "semester"
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a Stripe checkout session for Premium or Semester Pass"""
    
    import logging
    logger = logging.getLogger(__name__)
    
    try:
        logger.info(f"Creating checkout session for user {current_user.email}, price_type: {price_type}")
        
        # Determine which price to use
        if price_type == "premium":
            price_id = PREMIUM_PRICE_ID
            mode = "subscription"
        elif price_type == "semester":
            price_id = SEMESTER_PRICE_ID
            mode = "payment"
        else:
            logger.error(f"Invalid price type: {price_type}")
            raise HTTPException(status_code=400, detail="Invalid price type")
        
        logger.info(f"Using price_id: {price_id}, mode: {mode}")
        
        # Create or retrieve Stripe customer
        if not current_user.stripe_customer_id:
            customer = stripe.Customer.create(
                email=current_user.email,
                metadata={"user_id": str(current_user.id)}
            )
            current_user.stripe_customer_id = customer.id
            db.commit()
        
        # Create checkout session
        checkout_session = stripe.checkout.Session.create(
            customer=current_user.stripe_customer_id,
            mode=mode,
            line_items=[{
                "price": price_id,
                "quantity": 1,
            }],
            success_url=os.getenv("FRONTEND_URL", "http://localhost:5173") + "/payment/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url=os.getenv("FRONTEND_URL", "http://localhost:5173") + "/payment/cancel",
            client_reference_id=str(current_user.id),
            metadata={
                "user_id": str(current_user.id),
                "plan_type": price_type
            }
        )
        
        return {"checkout_url": checkout_session.url, "session_id": checkout_session.id}
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/webhook")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
    """Handle Stripe webhook events"""
    
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, STRIPE_WEBHOOK_SECRET
        )
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")
    
    # Handle the event
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        await handle_checkout_session(session, db)
    
    elif event["type"] == "customer.subscription.updated":
        subscription = event["data"]["object"]
        await handle_subscription_updated(subscription, db)
    
    elif event["type"] == "customer.subscription.deleted":
        subscription = event["data"]["object"]
        await handle_subscription_deleted(subscription, db)
    
    elif event["type"] == "invoice.payment_succeeded":
        invoice = event["data"]["object"]
        await handle_payment_succeeded(invoice, db)
    
    return {"status": "success"}


async def handle_checkout_session(session, db: Session):
    """Handle completed checkout session"""
    user_id = int(session["metadata"]["user_id"])
    plan_type = session["metadata"]["plan_type"]
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return
    
    if plan_type == "premium":
        # Subscription - will be activated by subscription.created event
        user.is_premium = True
        user.stripe_subscription_id = session.get("subscription")
    
    elif plan_type == "semester":
        # One-time payment - activate for 6 months
        user.semester_pass_active = True
        user.is_premium = True
        user.plan_expiration = datetime.utcnow() + timedelta(days=180)
    
    db.commit()


async def handle_subscription_updated(subscription, db: Session):
    """Handle subscription updates (renewals, changes)"""
    customer_id = subscription["customer"]
    
    user = db.query(User).filter(User.stripe_customer_id == customer_id).first()
    if not user:
        return
    
    # Check subscription status
    if subscription["status"] in ["active", "trialing"]:
        user.is_premium = True
        user.stripe_subscription_id = subscription["id"]
        # For subscriptions, expiration is managed by Stripe
        user.plan_expiration = None
    else:
        user.is_premium = False
    
    db.commit()


async def handle_subscription_deleted(subscription, db: Session):
    """Handle subscription cancellation"""
    customer_id = subscription["customer"]
    
    user = db.query(User).filter(User.stripe_customer_id == customer_id).first()
    if not user:
        return
    
    # Only remove premium if they don't have semester pass
    if not user.semester_pass_active:
        user.is_premium = False
    
    user.stripe_subscription_id = None
    db.commit()


async def handle_payment_succeeded(invoice, db: Session):
    """Handle successful payment (for subscription renewals)"""
    customer_id = invoice["customer"]
    
    user = db.query(User).filter(User.stripe_customer_id == customer_id).first()
    if not user:
        return
    
    # Ensure premium is active on successful payment
    user.is_premium = True
    db.commit()


@router.get("/subscription-status")
async def get_subscription_status(
    current_user: User = Depends(get_current_user)
):
    """Get current user's subscription status"""
    
    # Check if semester pass expired
    if current_user.semester_pass_active and current_user.plan_expiration:
        if datetime.utcnow() > current_user.plan_expiration:
            return {
                "is_premium": False,
                "plan_type": "expired_semester",
                "message": "Your semester pass has expired"
            }
    
    # Determine plan type
    if current_user.has_lifetime_access:
        plan_type = "lifetime"
    elif current_user.semester_pass_active:
        plan_type = "semester"
    elif current_user.is_premium:
        plan_type = "premium"
    else:
        plan_type = "free"
    
    return {
        "is_premium": current_user.is_premium or current_user.has_lifetime_access or current_user.semester_pass_active,
        "plan_type": plan_type,
        "plan_expiration": current_user.plan_expiration.isoformat() if current_user.plan_expiration else None,
        "stripe_customer_id": current_user.stripe_customer_id
    }
