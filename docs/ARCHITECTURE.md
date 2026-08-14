# Backend Architecture

## Overview

This project is a Node.js backend built with Express.js and TypeScript.

The application follows a modular and layered architecture designed to keep
business logic, database operations, HTTP handling, and shared infrastructure
separated.

The main request flow is:

Request
↓
Middleware
↓
Route
↓
Controller
↓
Service
↓
Repository
↓
Database

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
