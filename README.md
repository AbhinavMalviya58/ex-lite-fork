# ex-lite

`ex-lite` is a lightweight utility library for Express.js, designed to simplify common patterns and improve error handling in your Express applications. It includes helper functions, HTTP error handling, status code management, response formatting, input validation with Zod, and dependency injection with `tsyringe`.

## Installation

Install `ex-lite` and its peer dependencies via npm, yarn and pnpm:

```bash
npm install ex-lite zod tsyringe
```

```bash
yarn add ex-lite zod tsyringe
```

```bash
pnpm add ex-lite zod tsyringe
```

## Features

- **`HttpError`**: A class for handling and customizing HTTP errors. and includes some prebuilt error classes `BadRequestError`, `ConflictError`, `ForbiddenError`, `InternalServerError`, `NotFoundError`, and `UnauthorizedError`.
- **`wrapper`**: A function to simplify async controller functions.
- **`HttpStatus`**: An enumeration of HTTP status codes.
- **`HttpRes`**: A class for creating standardized JSON responses.
- **`ApiRes`**: An extension of HttpRes with static methods for common API responses(Ok, Create).
- **`validate`**: Middleware for validating request body, query, and params using Zod.
- **`controllerFactory`**: A factory function for creating controller handlers with dependency injection using `tsyringe`.

## Project Configuration

To use `ex-lite` in your Express.js project, follow these steps to set up your project structure and configure the library.

### 1. Project Structure

Here’s a basic example of how to structure your Express.js project using `ex-lite`:

```
my-express-app/
│
├── src/
│   ├── controllers/
│   │   └── AuthController.ts
│   ├── services/
│   │   └── AuthService.ts
│   ├── middlewares/
│   │   └── error.middleware.ts
│   ├── routes/
│   │   └── auth.routes.ts
│   ├── app.ts
│   └── server.ts
│
├── package.json
└── tsconfig.json
```

### 2. Global Error Handler

Use the following global error handler to handle exceptions across your application:

```typescript
// src/middlewares/error.middleware.ts
import { ErrorRequestHandler } from "express";
import { HttpError, InternalServerError, HttpStatus } from "ex-lite";

export const globalError: ErrorRequestHandler = (err, req, res, next) => {
  // Handle known HTTP errors
  if (HttpError.isHttpError(err)) {
    return res.status(err.status).json(err.getBody());
  }

  // Log unknown errors to the console
  console.error(err);

  // Handle unknown errors with a generic Internal Server Error response
  return res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .send(new InternalServerError(err.message).getBody());
};
```

### 3. Setting Up `ex-lite` in Express

Integrate `ex-lite` into your Express application as follows:

```typescript
// src/app.ts
import express from "express";
import { globalError } from "./middlewares/error.middleware";
import authRoutes from "./routes/auth.routes";

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Register your routes
app.use("/auth", authRoutes);

// Global error handler
app.use(globalError);

export default app;
```

### 4. Setting Up Your Server

Create an entry point to start your Express application:

```typescript
// src/server.ts
import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

## Usage

### 1. Handling Async Controllers with `wrapper`

The `wrapper` function helps you manage async controller functions, automatically handling promise resolution and errors.

```typescript
import { wrapper } from "ex-lite";

const getUser = wrapper(async (req, res) => {
  const user = await getUserById(req.params.id);
  return ApiRes.ok(user);
});

app.get("/user/:id", getUser);
```

### 2. With Prebuilt HTTP Errors

`ex-lite` provides a set of prebuilt HTTP errors to make error handling easier.

```typescript
import { BadRequestError, NotFoundError } from "ex-lite";

app.post(
  "/example",
  wrapper((req, res, next) => {
    if (!req.body.name) throw new BadRequestError("Name is required");
  })
);

app.get(
  "/example/:id",
  wrapper((req, res, next) => {
    const item = findItemById(req.params.id);
    if (!item) throw new NotFoundError("Item not found");

    return new HttpRes(item);
  })
);

// example with unknown error
app.get(
  "/unknown-error",
  wrapper((req, res, next) => {
    throw new Error("Hello World");
  })
);
```

### 3. Using `HttpStatus` for Consistent Status Codes

The `HttpStatus` enumeration provides a consistent way to manage HTTP status codes.

```typescript
import { HttpStatus } from "ex-lite";

app.get("/status-example", (req, res) => {
  res.status(HttpStatus.OK).json({ message: "All good!" });
});
```

### 4. Standardized JSON Responses with `HttpRes` and `ApiRes`

`HttpRes` provides a consistent structure for JSON responses. `ApiRes` extends `HttpRes` and includes static methods like `ok` and `created` for common API response patterns.

```typescript
import { ApiRes } from "ex-lite";

app.post(
  "/create-user",
  wrapper((req) => {
    const user = createUser(req.body);
    return ApiRes.created(user, "User created successfully");
  })
);

app.get(
  "/get-user",
  wrapper((req) => {
    const user = getUserById(req.query.id);
    return ApiRes.ok(user);
  })
);
```

### 5. Request Validation with `validate`

Use the `validate` middleware to enforce schema-based validation using Zod.

```typescript
import { validate } from "ex-lite";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(1),
  age: z.number().min(0),
});

app.post("/user", validate.body(userSchema), (req, res) => {
  res.json(ApiRes.ok(req.body));
});
```

### 6. Dependency Injection with `controllerFactory`

`ex-lite` supports dependency injection for controllers using `tsyringe`. Use the `controllerFactory` function to create controller handlers.

```typescript
import { singleton } from "tsyringe";
import { controllerFactory } from "ex-lite";
import { AuthService } from "./services";

@singleton()
export class AuthController {
  constructor(private authService: AuthService) {}

  async signin(req, res) {
    const { access, refresh, user } = await this.authService.signin(req.body);
    res.cookie("access-token", access.token, {
      httpOnly: true,
      maxAge: access.maxAge,
    });
    res.cookie("refresh-token", refresh.token, {
      httpOnly: true,
      maxAge: refresh.maxAge,
    });
    return ApiRes.ok(user.id, "User login successfully");
  }

  async signup(req) {
    const user = await this.authService.signup(req.body);
    return ApiRes.created(user.id, "User created successfully");
  }
}

// Create controller handlers with dependency injection
const authController = controllerFactory(AuthController);

app.post("/signin", authController.getMethod("signin"));
app.post("/signup", authController.getMethod("signup"));
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your improvements.

## License

`ex-lite` is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.

---

**Disclaimer:** This library is currently under development. While contributions are appreciated, there is no need to start begging for features or fixes.
