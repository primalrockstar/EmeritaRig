"""
One-time migration to add subscription fields to User table
"""
from sqlalchemy import text
from database import engine
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def migrate_user_table():
    """Add subscription columns to users table if they don't exist"""
    
    migrations = [
        "ALTER TABLE users ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT FALSE",
        "ALTER TABLE users ADD COLUMN IF NOT EXISTS semester_pass_active BOOLEAN DEFAULT FALSE",
        "ALTER TABLE users ADD COLUMN IF NOT EXISTS plan_expiration TIMESTAMP",
        "ALTER TABLE users ADD COLUMN IF NOT EXISTS stripe_customer_id VARCHAR",
        "ALTER TABLE users ADD COLUMN IF NOT EXISTS stripe_subscription_id VARCHAR"
    ]
    
    with engine.connect() as conn:
        for migration in migrations:
            try:
                conn.execute(text(migration))
                conn.commit()
                logger.info(f"✅ Executed: {migration[:50]}...")
            except Exception as e:
                logger.warning(f"⚠️  Migration already applied or failed: {str(e)[:100]}")
                conn.rollback()
    
    logger.info("✅ Database migration completed!")

if __name__ == "__main__":
    migrate_user_table()
