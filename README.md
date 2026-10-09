# Express Template Module

Backend starter template built with Node.js, Express.js, TypeScript, PostgreSQL, and Prisma.

## Tech Stack and Packages

* Node.js, Express.js, TypeScript
* PostgreSQL, Prisma ORM
* bcryptjs, jsonwebtoken
* cors, dotenv, helmet
* express-rate-limit, express-xss-sanitizer
* Yup, Supabase
* Pino, Swagger
* nodemon, tsx

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/shahinsamiur/express_template.git
cd express_template
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Update `.env` with your database credentials and required secrets. Never commit `.env`.

### 4. Run Locally

Generate the Prisma client:

```bash
npx prisma generate
```

Start development mode with hot reload:

```bash
npm run dev
```

Build and start for production:

```bash
npm run build
npm start
```

## Docker Setup

### Development with Hot Reload

```bash
docker build -f Dockerfile.dev -t express-api-dev .
```

```bash
docker run -d --name express-api-dev -p 5000:5000 --add-host=host.docker.internal:host-gateway --env-file .env -v "$PWD:/app" -v /app/node_modules express-api-dev
```

### View Live Logs

```bash
docker logs -f --tail 100 express-api-dev
```

### Test the API

Open `http://localhost:5000` in your browser or run:

```bash
curl -i http://localhost:5000
```

**Note:** Ensure PostgreSQL is running and `DATABASE_URL` is correctly configured before starting the application.
