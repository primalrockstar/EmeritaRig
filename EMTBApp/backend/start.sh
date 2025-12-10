#!/bin/bash

set -e

echo "Running database migrations..."
alembic upgrade head

echo "Migrations completed successfully."

echo "Starting the application..."
uvicorn main:app --host 0.0.0.0 --port $PORT