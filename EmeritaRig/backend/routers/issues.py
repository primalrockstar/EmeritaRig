from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

from ..database import get_db
from ..models import Issue, User
from ..auth import get_current_user, get_current_user_optional

router = APIRouter(prefix="/api/issues", tags=["issues"])

# Pydantic models for API
class IssueReportRequest(BaseModel):
    content_type: str
    content_id: str
    issue_type: str  # 'clinical_error', 'typo', 'outdated', 'unclear', 'other'
    description: str
    user_email: Optional[str] = None

class IssueResponse(BaseModel):
    id: int
    content_type: str
    content_id: str
    issue_type: str
    description: str
    user_email: Optional[str]
    status: str
    priority: str
    reward_given: bool
    reward_type: Optional[str]
    created_at: datetime
    updated_at: datetime
    reviewed_at: Optional[datetime]

class IssueUpdateRequest(BaseModel):
    status: Optional[str] = None
    priority: Optional[str] = None
    admin_notes: Optional[str] = None
    reward_given: Optional[bool] = None
    reward_type: Optional[str] = None

# Report an issue (public endpoint)
@router.post("/report")
async def report_issue(
    report: IssueReportRequest,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """Report an issue with platform content"""

    # Validate issue type
    valid_issue_types = ['clinical_error', 'typo', 'outdated', 'unclear', 'other']
    if report.issue_type not in valid_issue_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid issue type. Must be one of: {', '.join(valid_issue_types)}"
        )

    # Determine priority based on issue type
    priority_map = {
        'clinical_error': 'critical',
        'typo': 'low',
        'outdated': 'high',
        'unclear': 'medium',
        'other': 'medium'
    }

    # Create issue record
    issue = Issue(
        content_type=report.content_type,
        content_id=report.content_id,
        issue_type=report.issue_type,
        description=report.description,
        user_id=current_user.id if current_user else None,
        user_email=report.user_email or (current_user.email if current_user else None),
        priority=priority_map.get(report.issue_type, 'medium')
    )

    db.add(issue)
    db.commit()
    db.refresh(issue)

    return {
        "message": "Issue reported successfully",
        "issue_id": issue.id,
        "priority": issue.priority,
        "estimated_review_time": "24 hours" if issue.priority == 'critical' else "1 week"
    }

# Get issues (admin only)
@router.get("/", response_model=List[IssueResponse])
async def get_issues(
    status_filter: Optional[str] = None,
    priority_filter: Optional[str] = None,
    issue_type_filter: Optional[str] = None,
    limit: int = 50,
    offset: int = 0,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all reported issues (admin only)"""

    # Check if user is admin (you may want to add an is_admin field to User model)
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )

    query = db.query(Issue)

    # Apply filters
    if status_filter:
        query = query.filter(Issue.status == status_filter)
    if priority_filter:
        query = query.filter(Issue.priority == priority_filter)
    if issue_type_filter:
        query = query.filter(Issue.issue_type == issue_type_filter)

    # Order by priority and creation date
    priority_order = {'critical': 4, 'high': 3, 'medium': 2, 'low': 1}
    query = query.order_by(
        Issue.priority.desc(),  # Critical first
        Issue.created_at.desc()  # Newest first
    )

    issues = query.offset(offset).limit(limit).all()

    return issues

# Get issue statistics (admin only)
@router.get("/stats")
async def get_issue_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get issue statistics for dashboard"""

    if not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )

    # Get counts by status
    total_issues = db.query(Issue).count()
    pending_issues = db.query(Issue).filter(Issue.status == 'pending').count()
    reviewed_issues = db.query(Issue).filter(Issue.status == 'reviewed').count()
    fixed_issues = db.query(Issue).filter(Issue.status == 'fixed').count()
    invalid_issues = db.query(Issue).filter(Issue.status == 'invalid').count()

    # Get counts by priority
    critical_issues = db.query(Issue).filter(Issue.priority == 'critical').count()
    high_issues = db.query(Issue).filter(Issue.priority == 'high').count()

    # Get counts by type
    clinical_errors = db.query(Issue).filter(Issue.issue_type == 'clinical_error').count()

    # Calculate error rate (simplified - you'd need total content count)
    # For now, just return the clinical error count
    error_rate = clinical_errors / max(total_issues, 1) * 100

    return {
        "total_issues": total_issues,
        "pending_issues": pending_issues,
        "reviewed_issues": reviewed_issues,
        "fixed_issues": fixed_issues,
        "invalid_issues": invalid_issues,
        "critical_issues": critical_issues,
        "high_issues": high_issues,
        "clinical_errors": clinical_errors,
        "error_rate_percent": round(error_rate, 2),
        "resolution_rate_percent": round((fixed_issues / max(total_issues, 1)) * 100, 2)
    }

# Update issue status (admin only)
@router.put("/{issue_id}")
async def update_issue(
    issue_id: int,
    update: IssueUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update issue status and details (admin only)"""

    if not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )

    issue = db.query(Issue).filter(Issue.id == issue_id).first()
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found"
        )

    # Update fields
    update_data = update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(issue, field, value)

    # Set reviewed timestamp if status changed to reviewed/fixed/invalid
    if update.status in ['reviewed', 'fixed', 'invalid'] and not issue.reviewed_at:
        issue.reviewed_at = datetime.utcnow()

    db.commit()
    db.refresh(issue)

    return {
        "message": "Issue updated successfully",
        "issue": issue
    }

# Get single issue (admin only)
@router.get("/{issue_id}", response_model=IssueResponse)
async def get_issue(
    issue_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get single issue details (admin only)"""

    if not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )

    issue = db.query(Issue).filter(Issue.id == issue_id).first()
    if not issue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Issue not found"
        )

    return issue

# Bulk update issues (admin only)
@router.post("/bulk-update")
async def bulk_update_issues(
    issue_ids: List[int],
    update: IssueUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Bulk update multiple issues (admin only)"""

    if not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )

    issues = db.query(Issue).filter(Issue.id.in_(issue_ids)).all()
    if not issues:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No issues found"
        )

    # Update all issues
    update_data = update.dict(exclude_unset=True)
    updated_count = 0

    for issue in issues:
        for field, value in update_data.items():
            setattr(issue, field, value)

        # Set reviewed timestamp if applicable
        if update.status in ['reviewed', 'fixed', 'invalid'] and not issue.reviewed_at:
            issue.reviewed_at = datetime.utcnow()

        updated_count += 1

    db.commit()

    return {
        "message": f"Successfully updated {updated_count} issues",
        "updated_count": updated_count
    }