# Architecture Decisions

## Project

PortfolioOS Backend

---

# Architecture Style

Feature-Based Modular Architecture

```
src
│
├── app
│   ├── config
│   ├── database
│   ├── exceptions
│   ├── middlewares
│   ├── routes
│   └── utils
│
└── modules
    ├── auth
    ├── profile
    ├── skills
    ├── experience
    ├── projects
    ├── contact
    ├── blog
    └── admin
```

---

# API Convention

```
/api/auth
/api/profile
/api/projects
/api/skills
```

No API versioning unless required in the future.

---

# Error Handling

Base Exception

```
AppError
```

Derived Exceptions

- BadRequestException
- UnauthorizedException
- ConflictException
- NotFoundException

---

# Design Patterns

- Repository Pattern
- Service Layer Pattern
- Dependency Separation
- DTO Pattern

---

# Database

MongoDB Atlas

ODM:

Mongoose

---

# Authentication

JWT Access Token

JWT Refresh Token

Password Hashing:

bcrypt

---

# Coding Standards

- TypeScript Strict Mode
- ESLint
- Prettier
- Async/Await
- One Responsibility Per Class
- Feature-Based Folder Structure

---

# Route Flow

Client

↓

Express

↓

Application Routes

↓

Module Routes

↓

Controller

↓

Service

↓

Repository

↓

MongoDB

---

# Git Strategy

Main Branch

```
main
```

Development Branch

```
develop
```

Feature Branches

```
feature/module-name
```

Bug Fixes

```
bugfix/issue-name
```

---

# Future Rule

Any architecture modification must be documented in this file before implementation.