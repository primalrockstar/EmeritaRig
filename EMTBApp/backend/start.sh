#!/bin/bash

set -e

echo "Running database migrations..."
alembic upgrade head

echo "Migrations completed successfully."

echo "Starting the application..."
PORT=${PORT:-8000}
uvicorn main:app --host 0.0.0.0 --port $PORT