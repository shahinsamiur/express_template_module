# Backend Architecture

## Overview

This project is a Node.js backend built with Express.js, TypeScript, PostgreSQL, and Prisma ORM.

It follows a modular, layered architecture that separates HTTP handling, business logic, database operations, validation, and shared infrastructure.

### Request Flow

```text
Client Request
      ↓
Global Middleware
      ↓
Route
      ↓
Validation Middleware
      ↓
Controller
      ↓
Service
      ↓
Repository
      ↓
Prisma / Database
      ↓
Response
```

Not every endpoint must use every layer. Follow the existing module's implementation.

## Project Structure

```text
src/
├── config/
│   ├── mongodb_db.ts
│   └── supabase_db.ts
│
├── lib/
│   └── prisma.ts
│
├── modules/
│   └── auth/
│       ├── tests/
│       │   ├── integration/
│       │   └── unit/
│       ├── authController.ts
│       ├── authRepository.ts
│       ├── authRoutes.ts
│       ├── authService.ts
│       ├── authTypes.ts
│       └── authValidators.ts
│
├── shared/
│   ├── errors/
│   │   └── errorHandler.ts
│   ├── logger/
│   │   ├── logger.ts
│   │   └── httpLogger.ts
│   ├── middleware/
│   │   ├── authMiddleware.ts
│   │   └── validate.ts
│   └── utils/
│       ├── AppError.ts
│       ├── error.ts
│       ├── response.ts
│       └── upload.ts
│
├── types/
│   ├── common.ts
│   └── express.d.ts
│
├── app.ts
└── server.ts
```

## Layer Responsibilities

* **Routes:** Define endpoints and connect middleware to controllers.
* **Middleware:** Handle authentication, validation, rate limiting, security, and request processing.
* **Controllers:** Handle HTTP requests and responses; delegate business operations to services.
* **Services:** Contain business logic and coordinate operations.
* **Repositories:** Handle database queries and data access.
* **Validators:** Validate request data using Yup schemas.
* **Types:** Define shared TypeScript types and Express extensions.
* **Shared Utilities:** Provide common errors, responses, logging, and upload functionality.
* **Config / Lib:** Initialize external services and shared clients, such as Prisma.

## Development Rules

* Keep business logic out of controllers and routes.
* Keep database queries in repositories when following the repository pattern.
* Reuse shared middleware, errors, and response utilities.
* Validate incoming request data before processing it.
* Use environment variables for credentials and configuration.
* Add unit and integration tests for relevant functionality.
* Follow existing naming conventions and module patterns.
* Avoid unnecessary abstractions; preserve existing behavior when modifying code.

## AI Coding Instructions

Before modifying the codebase:

1. Inspect the existing implementation and trace the request flow.
2. Identify the root cause before changing code.
3. Make the smallest change that solves the problem.
4. Preserve existing business logic, routes, API contracts, and response formats.
5. Run relevant tests and verify the change.
6. Do not create new layers, files, or dependencies unless necessary.
