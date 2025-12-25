#!/bin/bash
# Script to run Django tests
# This script is called by the pre-commit hook

set -e  # Exit on error

cd "$(dirname "$0")"

echo "Running Python backend tests..."

# Use virtual environment Python if it exists, otherwise use system Python
if [ -f "venv/bin/python" ]; then
    PYTHON="venv/bin/python"
else
    PYTHON="python"
fi

# Run Django tests
$PYTHON manage.py test api --verbosity=1

echo "✓ All Python tests passed!"
