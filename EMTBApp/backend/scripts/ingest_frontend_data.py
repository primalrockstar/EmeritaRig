#!/usr/bin/env python3
"""
Data Migration Script: Ingest Frontend Scenarios into Backend Database
Migrates 234+ scenarios from JSON files to the FastAPI backend database.
"""

import json
import os
import sys
from pathlib import Path

# Add the backend directory to the path so we can import modules
backend_dir = Path(__file__).parent.parent
sys.path.insert(0, str(backend_dir))

from database import SessionLocal, Base, engine
from models import Scenario

# Ensure tables are created
Base.metadata.create_all(bind=engine)

def load_json_file(file_path):
    """Load and parse a JSON file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading {file_path}: {e}")
        return None

def transform_scenario(json_scenario):
    """
    Transform frontend JSON scenario to backend database format.
    Maps JSON fields to Scenario model fields.
    """
    # Map the fields from JSON to database model
    db_scenario = {
        'title': json_scenario.get('title', ''),
        'category': json_scenario.get('category', 'Unknown'),
        'dispatch_info': json_scenario.get('pcr_text', ''),
        'vitals': json.dumps(json_scenario.get('vitals', {})),
        'narrative_key_points': json.dumps({
            'correct_error': json_scenario.get('correct_error', ''),
            'chaos_events': json_scenario.get('chaos_events', []),
            'stress_fto_responses': json_scenario.get('stress_fto_responses', []),
            'hazards': json_scenario.get('hazards', {})
        }),
        'difficulty': json_scenario.get('difficulty', 'Medium')  # Default if missing
    }

    return db_scenario

def ingest_scenarios():
    """Main ingestion function."""
    # Path to frontend scenarios directory
    frontend_scenarios_dir = backend_dir.parent / 'ProMedixEMS-main' / 'src' / 'data' / 'scenarios'

    if not frontend_scenarios_dir.exists():
        print(f"Error: Frontend scenarios directory not found at {frontend_scenarios_dir}")
        return

    print(f"🔍 Scanning frontend scenarios directory: {frontend_scenarios_dir}")

    # Get all JSON files
    json_files = list(frontend_scenarios_dir.glob('*.json'))
    json_files = [f for f in json_files if f.name != 'audit_scenarios.js']  # Exclude the audit script

    print(f"📁 Found {len(json_files)} JSON files to process")

    db = SessionLocal()
    total_ingested = 0
    total_skipped = 0

    try:
        for json_file in json_files:
            print(f"\n📄 Processing: {json_file.name}")

            scenarios_data = load_json_file(json_file)
            if scenarios_data is None:
                continue

            if not isinstance(scenarios_data, list):
                print(f"⚠️ Skipping {json_file.name}: Expected array of scenarios")
                continue

            print(f"   📊 Found {len(scenarios_data)} scenarios in file")

            for scenario_data in scenarios_data:
                # Check for existing scenario by title
                existing = db.query(Scenario).filter(Scenario.title == scenario_data.get('title', '')).first()

                if existing:
                    print(f"   ⏭️ Skipping duplicate: {scenario_data.get('title', '')[:50]}...")
                    total_skipped += 1
                    continue

                # Transform and create new scenario
                db_scenario_data = transform_scenario(scenario_data)

                try:
                    new_scenario = Scenario(**db_scenario_data)
                    db.add(new_scenario)
                    total_ingested += 1
                    print(f"   ✅ Ingested: {scenario_data.get('title', '')[:50]}...")
                except Exception as e:
                    print(f"   ❌ Error creating scenario: {e}")
                    continue

        # Commit all changes
        db.commit()
        print("\n🎉 Migration completed successfully!")
        print(f"📈 Total scenarios ingested: {total_ingested}")
        print(f"⏭️ Total scenarios skipped (duplicates): {total_skipped}")
        print(f"📊 Total scenarios in database: {db.query(Scenario).count()}")

    except Exception as e:
        print(f"❌ Migration failed: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("🚀 Starting Frontend Scenarios Data Migration")
    print("=" * 50)
    ingest_scenarios()