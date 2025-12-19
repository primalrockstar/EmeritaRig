#!/bin/bash

# Run database migrations for production

set -e

echo "Running database migrations..."

# Run alembic migrations
alembic upgrade head

echo "Migrations completed successfully."