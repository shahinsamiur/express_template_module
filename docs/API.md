# API Documentation

## Base URL

**Development:**

```text
http://localhost:5000
```

**API Prefix:**

```text
/api
```

API endpoints are mounted under `/api` where configured in the application.

## API Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "message": "Something went wrong",
  "data": null
}
```

## API Testing

* Use Postman, `curl`, or Swagger UI to test endpoints.
* Check the application's route definitions for available endpoints and HTTP methods.
* Include the required request body, headers, and JWT token when an endpoint requires authentication.
* Validate request data using the configured Yup schemas.

## Important Notes

* The root endpoint `GET /` currently returns a plain-text response, not the standard JSON response format.
* The JSON response examples above describe the expected format; verify each endpoint's implementation before assuming it follows that format.
* If Swagger is configured, access the API documentation at its configured route.
