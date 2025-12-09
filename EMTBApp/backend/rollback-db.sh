#!/bin/bash

# Rollback database migration

set -e

echo "Rolling back last database migration..."

# Downgrade one migration
alembic downgrade -1

echo "Database rollback completed."