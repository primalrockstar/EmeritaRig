"""
One-time migration to add subscription fields to User table
"""
from dotenv import load_dotenv
load_dotenv()
from sqlalchemy import text
from database import engine
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def migrate_user_table():
    """Add subscription columns to users table if they don't exist"""

    columns = [
        ("is_premium", "BOOLEAN DEFAULT FALSE"),
        ("semester_pass_active", "BOOLEAN DEFAULT FALSE"),
        ("plan_expiration", "TIMESTAMP"),
        ("stripe_customer_id", "VARCHAR"),
        ("stripe_subscription_id", "VARCHAR")
    ]

    with engine.connect() as conn:
        for col_name, col_type in columns:
            # Check if column exists
            result = conn.execute(text("PRAGMA table_info(users)")).fetchall()
            column_names = [row[1] for row in result]
            if col_name not in column_names:
                migration = f"ALTER TABLE users ADD COLUMN {col_name} {col_type}"
                try:
                    conn.execute(text(migration))
                    conn.commit()
                    logger.info(f"✅ Added column: {col_name}")
                except Exception as e:
                    logger.warning(f"⚠️  Failed to add column {col_name}: {str(e)[:100]}")
                    conn.rollback()
            else:
                logger.info(f"✅ Column {col_name} already exists")
    
    logger.info("✅ Database migration completed!")

if __name__ == "__main__":
    migrate_user_table()
