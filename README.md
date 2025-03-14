# Subscription Tracker - API Documentation

To install dependencies:

```bash
bun install
```

To run:

```bash
bun dev
```

## Endpoints

### Authentication

- **POST /api/v1/auth/signup**
  - **Description**: Registers a new user.
  - **Parameters**: 
    - `name` (string): The name of the user.
    - `email` (string): The email of the user.
    - `password` (string): The password for the user.
  - **Response**: 
    - `201 Created`: Returns a success message, user data, and a JWT token.
    - `409 Conflict`: User already exists.

- **POST /api/v1/auth/signin**
  - **Description**: Authenticates a user and returns a token.
  - **Parameters**: 
    - `email` (string): The email of the user.
    - `password` (string): The password for the user.
  - **Response**: 
    - `200 OK`: Returns a success message, user data, and a JWT token.
    - `404 Not Found`: User not found.
    - `400 Bad Request`: Invalid password.

- **POST /api/v1/auth/signout**
  - **Description**: Signs out a user.
  - **Parameters**: None
  - **Response**: TBD

### Subscription

- **POST /api/v1/subscriptions**
  - **Description**: Creates a new subscription for the authenticated user.
  - **Parameters**: 
    - `body` (object): Subscription details.
  - **Response**: 
    - `201 Created`: Returns the created subscription and workflow run ID.
    - `401 Unauthorized`: User not authenticated.

- **GET /api/v1/users/:id/subscriptions**
  - **Description**: Retrieves subscriptions for a specific user.
  - **Parameters**: 
    - `id` (string): User ID.
  - **Response**: 
    - `200 OK`: Returns a list of subscriptions.
    - `401 Unauthorized`: User is not the owner of the account.

### User

- **GET /api/v1/users**
  - **Description**: Retrieves a list of all users.
  - **Parameters**: None
  - **Response**: 
    - `200 OK`: Returns a list of users.

- **GET /api/v1/users/:id**
  - **Description**: Retrieves a specific user by ID.
  - **Parameters**: 
    - `id` (string): User ID.
  - **Response**: 
    - `200 OK`: Returns user data excluding the password.
    - `404 Not Found`: User not found.

### Workflow

- **POST /api/v1/workflows/subscription/reminder**
  - **Description**: Sends reminders for subscription renewals.
  - **Parameters**: 
    - `subscriptionId` (string): ID of the subscription.
  - **Response**: 
    - `200 OK`: Reminders sent successfully.
    - `400 Bad Request`: Invalid subscription ID.

## Authentication

- **Mechanism**: JWT (JSON Web Tokens) are used for authentication. Tokens are issued upon successful sign-up or sign-in and should be included in the `Authorization` header for protected routes.

## Error Handling

- Errors are returned in JSON format with a `success` boolean and an `error` message or `message` field.

## Rate Limiting

- No rate limiting policies are currently described.

## Versioning

- The API versioning is indicated in the workflow endpoint as `v1`.