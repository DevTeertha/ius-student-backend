# IUS Student API

REST API for managing university student records: students, their education history, work experience and profile photos. Built with **NestJS**, **TypeORM** and **MySQL**, with JWT authentication and Swagger documentation.

The React admin panel that uses this API lives in [ius-student](https://github.com/DevTeertha/ius-student).

## Features

- **JWT authentication** with Passport (local strategy for login, JWT strategy for protected routes) and an admin guard
- **Students CRUD** with related **education** and **experience** records (one-to-many relations in TypeORM)
- **Photo upload** to Firebase Storage through a `media` module
- **Validation** on every request with `class-validator` DTOs and a global `ValidationPipe` (whitelisting + transform)
- **Swagger / OpenAPI docs** generated from the controllers, with bearer-token support
- Consistent response shape through shared response DTOs and a shared base entity
- Server-side pagination (`limit` / `offset`) on list endpoints

## Tech stack

NestJS 9 · TypeScript · TypeORM · MySQL · Passport (JWT + local) · bcrypt · class-validator · Swagger · Firebase Storage · Jest

## API overview

All routes are prefixed with `/api`. Write operations are protected with `JwtAuthGuard`.

| Module | Endpoints |
|---|---|
| Auth | `POST /auth/login` |
| Users | `POST /user`, `GET /user`, `GET /user/:id`, `PATCH /user/:id`, `DELETE /user/:id` |
| Students | `POST /students`, `GET /students`, `GET /students/:id`, `PATCH /students/:id`, `DELETE /students/:id` |
| Education | `POST /education`, `GET /education`, `GET /education/:id`, `PATCH /education/:id`, `DELETE /education/:id` |
| Experience | `POST /experience`, `GET /experience`, `GET /experience/:id`, `PATCH /experience/:id`, `DELETE /experience/:id` |
| Media | `POST /media` (upload), `GET /media/delete/:key` |

Interactive docs: run the app and open **http://localhost:8081/docs**.

## Project structure

```
src/
├── auth/         # login, JWT + local Passport strategies
├── user/         # admin users
├── student/      # student entity, DTOs, service, controller
├── education/    # education records linked to a student
├── experience/   # work experience linked to a student
├── media/        # Firebase Storage upload / delete
└── shared/       # base entity, response DTOs, guards, constants
```

## Getting started

```bash
npm install
```

Create a `.env` file with your MySQL connection:

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USERNAME=root
MYSQL_PASSWORD=your_password
MYSQL_DB_NAME=ius_student
```

```bash
npm run start:dev   # http://localhost:8081/api
npm run test        # unit tests
```

TypeORM runs with `synchronize: true`, so tables are created on first start. Use migrations instead before running this against a production database.
