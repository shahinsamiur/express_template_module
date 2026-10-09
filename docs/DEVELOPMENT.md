# Development Guide

This guide explains how to set up, develop, test, build, and maintain the backend.

## Requirements

* Node.js 22+
* npm
* PostgreSQL or Supabase
* Git
* Docker (optional)

## Installation

Clone the repository:

```bash
git clone https://github.com/shahinsamiur/express_template.git
cd express_template
```

Install dependencies:

```bash
npm install
```

## Environment Configuration

Create your environment file:

```bash
cp .env.example .env
```

Configure `DATABASE_URL` and other required environment variables in `.env`.

Never commit `.env` or expose credentials.

## Database Setup

Generate the Prisma client:

```bash
npx prisma generate
```

For development databases using migrations:

```bash
npx prisma migrate dev
```

Ensure PostgreSQL is running and the database connection is configured correctly before starting the application.

## Development

Start the development server with hot reload:

```bash
npm run dev
```

The server restarts automatically when watched source files change.

## Build and Production

Build the application:

```bash
npm run build
```

Start the compiled application:

```bash
npm start
```

## Docker Development

Build the development image:

```bash
docker build -f Dockerfile.dev -t express-api-dev .
```

Run the container with hot reload:

```bash
docker run -d \
  --name express-api-dev \
  -p 5000:5000 \
  --add-host=host.docker.internal:host-gateway \
  --env-file .env \
  -v "$PWD:/app" \
  -v /app/node_modules \
  express-api-dev
```

View live logs:

```bash
docker logs -f --tail 100 express-api-dev
```

## Testing and Verification

Test the root endpoint:

```bash
curl -i http://localhost:5000
```

Run the project's configured test scripts when available. Verify API behavior, validation, authentication, and database operations after making changes.

## Common Docker Issues

* **Database connection fails:** Check `DATABASE_URL`; inside Docker, use `host.docker.internal` for host-based PostgreSQL.
* **Port already in use:** Stop the conflicting container or change the host port mapping.
* **Hot reload fails:** Verify source bind mounts and the `npm run dev` command.
* **Prisma errors:** Run `npx prisma generate` and verify the schema and database configuration.
* **Container crashes:** Inspect logs using `docker logs --tail 100 express-api-dev`.

## Development Guidelines

* Follow the existing modular architecture.
* Keep business logic in services and database queries in repositories.
* Validate request data using the existing Yup validation patterns.
* Reuse shared middleware, error handlers, and response utilities.
* Preserve existing API contracts and business logic.
* Make minimal, targeted changes and test them before committing.
* Never commit secrets or production credentials.
