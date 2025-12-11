#!/bin/bash

set -e

echo "Starting Emerita Clinical backend..."

# Set default port if not provided
PORT=${PORT:-8000}

echo "Running on port $PORT"

# Start uvicorn - we're already in the backend directory
uvicorn main:app --host 0.0.0.0 --port $PORT --log-level info