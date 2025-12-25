# Backend Tests

This directory contains unit tests for the Django backend API.

## Test Coverage

The test suite covers:

### HealthCheckView Tests
- ✓ Health check endpoint returns 200 OK
- ✓ Health check works without authentication

### MeView Tests  
- ✓ /me endpoint requires authentication
- ✓ /me returns authenticated user information
- ✓ /me handles users without email gracefully

### TriggerWorkflowView Tests
- ✓ Missing slug parameter returns 400 Bad Request
- ✓ Unknown workflow slug returns 404 Not Found
- ✓ Successful workflow trigger with proper payload structure
- ✓ Workflow trigger with anonymous user
- ✓ Workflow trigger with 204 No Content response
- ✓ Workflow trigger timeout handling (504 Gateway Timeout)
- ✓ Workflow trigger connection error handling (502 Bad Gateway)
- ✓ Workflow trigger n8n error response handling
- ✓ Workflow trigger with empty payload
- ✓ Workflow trigger with invalid JSON response
- ✓ Metadata includes timestamp and source information

## Running Tests

### Run all tests
```bash
./run_tests.sh
```

### Run tests with Django directly
```bash
# Using virtual environment
venv/bin/python manage.py test api

# With verbose output
venv/bin/python manage.py test api --verbosity=2

# Run specific test class
venv/bin/python manage.py test api.tests.HealthCheckViewTest

# Run specific test method
venv/bin/python manage.py test api.tests.HealthCheckViewTest.test_health_check_returns_ok
```

## Pre-commit Hook

Tests are automatically run as part of the git pre-commit hook. The hook will:
1. Run frontend linting and tests
2. Run backend unit tests

If any tests fail, the commit will be blocked.

## Test Structure

Tests are organized using Django's TestCase class and follow these patterns:

- **setUp()**: Creates test fixtures (users, API client)
- **@override_settings**: Mocks Django settings for isolated testing
- **@patch**: Mocks external dependencies (e.g., requests to n8n)

## Adding New Tests

When adding new API endpoints or modifying existing ones:

1. Create a new test class in `api/tests.py`
2. Inherit from `TestCase` or `APITestCase`
3. Use `APIClient` for making test requests
4. Mock external dependencies with `@patch`
5. Test both success and error cases
6. Verify response status codes and data structure

Example:
```python
class MyNewViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
    
    def test_my_feature(self):
        response = self.client.get('/api/my-endpoint/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('expected_key', response.data)
```

## Dependencies

Tests use:
- Django's built-in test framework
- Django REST Framework's test utilities
- Python's unittest.mock for mocking external calls
