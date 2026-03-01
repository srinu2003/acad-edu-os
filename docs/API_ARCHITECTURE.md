# Acad Institute ERP - API Architecture

## Overview

This document defines the RESTful API architecture for the Acad Institute ERP system. The API follows REST principles, uses JWT authentication, and implements role-based access control (RBAC).

---

## Technology Stack

```
┌──────────────────────────────────────┐
│  Frontend: Next.js Client            │
│  (React, @knadh/oat UI)              │
└────────────────┬─────────────────────┘
                 │
                 │ HTTP/HTTPS REST API
                 │ JSON Payload
                 │
┌────────────────▼─────────────────────┐
│  API Gateway / Rate Limiter          │
│  (Express Middleware)                │
└────────────────┬─────────────────────┘
                 │
                 ├──► Authentication Middleware (JWT)
                 ├──► Authorization Middleware (RBAC)
                 ├──► Input Validation Middleware
                 └──► Error Handler Middleware
                 │
┌────────────────▼─────────────────────┐
│  Business Logic Layer                │
│  (Services, Controllers)             │
└────────────────┬─────────────────────┘
                 │
┌────────────────▼─────────────────────┐
│  Data Access Layer (Models)          │
│  (PostgreSQL with node-postgres)     │
└──────────────────────────────────────┘
```

---

## API Design Principles

1. **RESTful:** Resource-based URLs, HTTP methods for CRUD
2. **Stateless:** JWT tokens, no server-side sessions
3. **Versioned:** `/api/v1/...` for future compatibility
4. **Secure:** HTTPS, JWT, input validation, rate limiting
5. **Consistent:** Standard response format across all endpoints
6. **Documented:** OpenAPI/Swagger documentation
7. **Error-friendly:** Clear error messages with HTTP status codes

---

## Base URL Structure

```
Production:   https://acad-erp.com/api/v1
Development:  http://localhost:3000/api/v1
Staging:      https://staging.acad-erp.com/api/v1
```

---

## Authentication Flow

### 1. Login Flow
```
Client                    Server                    Database
  │                          │                          │
  ├─ POST /api/v1/auth/login │                          │
  │  { email, password }     │                          │
  │                          ├─ Validate input          │
  │                          ├─ Query user ────────────►│
  │                          │◄─ User data ─────────────┤
  │                          ├─ Verify password (bcrypt) │
  │                          ├─ Generate JWT (access+refresh)
  │                          │                          │
  │◄─ 200 OK                 │                          │
     {                       │                          │
       "status": "success",  │                          │
       "data": {             │                          │
         "user": {...},      │                          │
         "accessToken": "...",│                         │
         "refreshToken": "..."│                         │
       }                     │                          │
     }                       │                          │
```

### 2. Protected Route Access
```
Client                    Server
  │                          │
  ├─ GET /api/v1/student/grades
  │  Authorization: Bearer <JWT>
  │                          │
  │                          ├─ Verify JWT signature
  │                          ├─ Check expiration
  │                          ├─ Extract user ID + role
  │                          ├─ Authorize (RBAC check)
  │                          ├─ Fetch data
  │                          │
  │◄─ 200 OK { data }        │
```

### 3. Token Refresh Flow
```
Client                    Server
  │                          │
  ├─ POST /api/v1/auth/refresh
  │  { refreshToken }        │
  │                          ├─ Verify refresh token
  │                          ├─ Generate new access token
  │                          │
  │◄─ 200 OK                 │
     { accessToken }         │
```

---

## Standard Response Format

### Success Response
```json
{
  "status": "success",
  "data": {
    // Response payload
  },
  "message": "Optional success message",
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150
  }
}
```

### Error Response
```json
{
  "status": "error",
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password",
    "details": [
      {
        "field": "email",
        "message": "Email not found"
      }
    ]
  }
}
```

---

## HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful GET, PUT, PATCH |
| 201 | Created | Successful POST (resource created) |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Invalid input, validation error |
| 401 | Unauthorized | Missing or invalid JWT |
| 403 | Forbidden | Valid JWT but insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate resource (e.g., email exists) |
| 422 | Unprocessable Entity | Semantic validation error |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error (log it) |

---

## API Endpoints (Phase 1 - MVP)

### Authentication Endpoints

#### POST `/api/v1/auth/register`
Register a new user (admin-only in production, open for development).

**Request:**
```json
{
  "email": "student@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "9876543210",
  "role": "student"
}
```

**Response (201 Created):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": 123,
      "email": "student@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "student"
    }
  },
  "message": "User registered successfully"
}
```

---

#### POST `/api/v1/auth/login`
Authenticate user and return JWT tokens.

**Request:**
```json
{
  "email": "student@example.com",
  "password": "SecurePass123!"
}
```

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": 123,
      "email": "student@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "student"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error (401 Unauthorized):**
```json
{
  "status": "error",
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  }
}
```

---

#### POST `/api/v1/auth/refresh`
Refresh access token using refresh token.

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

#### POST `/api/v1/auth/logout`
Invalidate refresh token (optional: blacklist token).

**Request Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200 OK):**
```json
{
  "status": "success",
  "message": "Logged out successfully"
}
```

---

#### POST `/api/v1/auth/forgot-password`
Request password reset email.

**Request:**
```json
{
  "email": "student@example.com"
}
```

**Response (200 OK):**
```json
{
  "status": "success",
  "message": "Password reset instructions sent to your email"
}
```

---

#### POST `/api/v1/auth/reset-password`
Reset password using token.

**Request:**
```json
{
  "token": "randomly-generated-token",
  "newPassword": "NewSecurePass123!"
}
```

**Response (200 OK):**
```json
{
  "status": "success",
  "message": "Password reset successfully"
}
```

---

#### GET `/api/v1/auth/me`
Get current authenticated user details.

**Request Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": 123,
      "email": "student@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "student",
      "status": "active"
    }
  }
}
```

---

### Student Endpoints

#### GET `/api/v1/student/dashboard`
Get student dashboard summary (grades, attendance, fees).

**Auth:** Required (student role)

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "student": {
      "rollNo": "257Y1D5805",
      "program": "BTech CSE",
      "semester": 4,
      "gpa": 3.45
    },
    "summary": {
      "enrolledCourses": 6,
      "attendancePercentage": 87.5,
      "pendingFees": 5000.00,
      "upcomingExams": 2
    },
    "recentGrades": [
      {
        "courseCode": "CS301",
        "courseName": "Data Structures",
        "grade": "A",
        "credits": 4
      }
    ],
    "recentAnnouncements": [
      {
        "id": 1,
        "title": "Mid-term exam schedule",
        "date": "2026-03-05"
      }
    ]
  }
}
```

---

#### GET `/api/v1/student/profile`
Get student profile details.

**Auth:** Required (student role)

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "id": 123,
    "rollNo": "257Y1D5805",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "program": {
      "id": 1,
      "name": "BTech CSE",
      "semester": 4
    },
    "enrollmentDate": "2024-08-01",
    "gpa": 3.45,
    "address": "123 Main St, City",
    "dateOfBirth": "2004-05-15",
    "bloodGroup": "O+",
    "emergencyContact": "9876543211",
    "photoUrl": "https://example.com/photos/student123.jpg"
  }
}
```

---

#### PUT `/api/v1/student/profile`
Update student profile (limited fields).

**Auth:** Required (student role)

**Request:**
```json
{
  "phone": "9999999999",
  "address": "456 New St, City",
  "emergencyContact": "8888888888"
}
```

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "user": {
      // Updated profile
    }
  },
  "message": "Profile updated successfully"
}
```

---

#### GET `/api/v1/student/grades`
Get all grades for current student.

**Auth:** Required (student role)

**Query Parameters:**
- `semester` (optional): Filter by semester
- `academicYear` (optional): Filter by academic year

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "grades": [
      {
        "id": 1,
        "course": {
          "code": "CS301",
          "name": "Data Structures",
          "credits": 4
        },
        "semester": 3,
        "marks": 85,
        "grade": "A",
        "gradePoints": 4.0,
        "teacher": "Dr. Smith",
        "gradedAt": "2026-01-15"
      },
      {
        "id": 2,
        "course": {
          "code": "CS302",
          "name": "Algorithms",
          "credits": 3
        },
        "semester": 3,
        "marks": 78,
        "grade": "B+",
        "gradePoints": 3.5,
        "teacher": "Prof. Johnson",
        "gradedAt": "2026-01-16"
      }
    ],
    "summary": {
      "totalCredits": 24,
      "earnedCredits": 24,
      "gpa": 3.45,
      "sgpa": {
        "semester3": 3.57
      }
    }
  }
}
```

---

#### GET `/api/v1/student/attendance`
Get attendance records.

**Auth:** Required (student role)

**Query Parameters:**
- `courseId` (optional): Filter by course
- `startDate` (optional): Filter from date
- `endDate` (optional): Filter to date

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "attendance": [
      {
        "course": {
          "id": 1,
          "code": "CS301",
          "name": "Data Structures"
        },
        "totalClasses": 40,
        "attendedClasses": 35,
        "percentage": 87.5,
        "records": [
          {
            "date": "2026-03-01",
            "status": "present"
          },
          {
            "date": "2026-02-28",
            "status": "absent"
          }
        ]
      }
    ],
    "overall": {
      "totalClasses": 240,
      "attendedClasses": 210,
      "percentage": 87.5
    }
  }
}
```

---

#### GET `/api/v1/student/fees`
Get fee status and payment history.

**Auth:** Required (student role)

**Query Parameters:**
- `status` (optional): pending/paid/overdue
- `academicYear` (optional): Filter by year

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "fees": [
      {
        "id": 1,
        "type": "Tuition Fee",
        "semester": 4,
        "academicYear": "2025-2026",
        "amount": 50000.00,
        "paidAmount": 30000.00,
        "balance": 20000.00,
        "dueDate": "2026-03-15",
        "status": "partial"
      },
      {
        "id": 2,
        "type": "Library Fee",
        "semester": 4,
        "academicYear": "2025-2026",
        "amount": 2000.00,
        "paidAmount": 2000.00,
        "balance": 0.00,
        "paidDate": "2026-01-10",
        "status": "paid",
        "transactionId": "TXN123456"
      }
    ],
    "summary": {
      "totalDue": 52000.00,
      "totalPaid": 32000.00,
      "balance": 20000.00
    }
  }
}
```

---

### Announcements Endpoints

#### GET `/api/v1/announcements`
Get active announcements for current user.

**Auth:** Required

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 20)

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "announcements": [
      {
        "id": 1,
        "title": "Mid-term Exam Schedule Released",
        "content": "The mid-term exam schedule for Semester 4 has been published...",
        "priority": "high",
        "publishedAt": "2026-03-01T10:00:00Z",
        "expiresAt": "2026-03-20T23:59:59Z",
        "attachmentUrl": null
      }
    ]
  },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 15
  }
}
```

---

#### GET `/api/v1/announcements/:id`
Get single announcement details.

**Auth:** Required

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "announcement": {
      "id": 1,
      "title": "Mid-term Exam Schedule Released",
      "content": "Full announcement content...",
      "priority": "high",
      "publishedAt": "2026-03-01T10:00:00Z",
      "expiresAt": "2026-03-20T23:59:59Z",
      "attachmentUrl": "https://example.com/files/exam-schedule.pdf",
      "createdBy": {
        "name": "Admin User",
        "role": "admin"
      }
    }
  }
}
```

---

## Authorization Matrix (RBAC)

| Endpoint | Student | Teacher | Admin | Parent |
|----------|---------|---------|-------|--------|
| `GET /student/dashboard` | ✅ Self | ❌ | ✅ All | ✅ Child |
| `GET /student/grades` | ✅ Self | ✅ Class | ✅ All | ✅ Child |
| `GET /student/attendance` | ✅ Self | ✅ Class | ✅ All | ✅ Child |
| `GET /student/fees` | ✅ Self | ❌ | ✅ All | ✅ Child |
| `PUT /student/profile` | ✅ Self | ❌ | ✅ All | ❌ |
| `POST /auth/register` | ❌ | ❌ | ✅ | ❌ |
| `GET /announcements` | ✅ | ✅ | ✅ | ✅ |

---

## Rate Limiting Strategy

### Login Endpoint
- **Limit:** 5 requests per 15 minutes per IP
- **Purpose:** Prevent brute-force attacks

### API Endpoints (Authenticated)
- **Limit:** 100 requests per 15 minutes per user
- **Purpose:** Prevent abuse

### Public Endpoints
- **Limit:** 30 requests per minute per IP
- **Purpose:** Prevent DoS

### Headers Returned
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1709283600
```

---

## Security Middleware Stack

```javascript
// Middleware execution order
app.use(helmet());                    // Security headers
app.use(cors(corsOptions));           // CORS policy
app.use(rateLimiter);                 // Rate limiting
app.use(bodyParser.json());           // Parse JSON
app.use(sanitize);                    // Input sanitization
app.use(authenticate);                // JWT verification
app.use(authorize);                   // RBAC check
// ... route handlers
app.use(errorHandler);                // Centralized error handler
```

---

## Pagination Strategy

For list endpoints (grades, attendance, announcements):

**Query Parameters:**
- `page` (default: 1): Page number
- `limit` (default: 20, max: 100): Items per page
- `sort` (optional): Sort field (e.g., `date`, `-date` for desc)

**Response Meta:**
```json
{
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## Error Codes Reference

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_CREDENTIALS` | 401 | Email/password incorrect |
| `TOKEN_EXPIRED` | 401 | JWT token expired |
| `TOKEN_INVALID` | 401 | JWT malformed or tampered |
| `INSUFFICIENT_PERMISSIONS` | 403 | User lacks required role |
| `RESOURCE_NOT_FOUND` | 404 | Requested resource doesn't exist |
| `DUPLICATE_EMAIL` | 409 | Email already registered |
| `VALIDATION_ERROR` | 400 | Input validation failed |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error (logged) |

---

## JWT Token Structure

### Access Token (15 minutes expiry)
```json
{
  "userId": 123,
  "email": "student@example.com",
  "role": "student",
  "iat": 1709280000,
  "exp": 1709280900
}
```

### Refresh Token (7 days expiry)
```json
{
  "userId": 123,
  "type": "refresh",
  "iat": 1709280000,
  "exp": 1709884800
}
```

---

## API Versioning Strategy

### Current: v1
- `/api/v1/...` (all endpoints)

### Future: v2
- `/api/v2/...` (breaking changes)
- v1 maintained for 6-12 months deprecation period
- Client specifies version in URL (not headers)

---

## Testing Strategy

### Unit Tests
- Test individual services (auth, student, grades)
- Mock database calls

### Integration Tests
- Test complete API flows (login → fetch data)
- Use test database

### Load Tests
- Simulate 1000+ concurrent users
- Identify bottlenecks

### Security Tests
- SQL injection attempts
- XSS attempts
- JWT tampering
- Rate limit bypass

---

## API Documentation

### Tools
- **Swagger/OpenAPI:** Interactive API documentation
- **Postman Collection:** Pre-configured requests for testing

### Auto-generation
```javascript
// Using swagger-jsdoc + swagger-ui-express
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
```

---

## Performance Optimization

1. **Database Indexing:** All foreign keys + frequently queried fields
2. **Query Optimization:** Use joins instead of N+1 queries
3. **Caching:** Redis for user sessions, announcement lists
4. **Pagination:** Never return all records at once
5. **Compression:** gzip response bodies
6. **Connection Pooling:** PostgreSQL connection pool (max 20)

---

## Monitoring & Logging

### Logs to Capture
- **Access logs:** All API requests (URL, method, status, duration)
- **Error logs:** 500 errors with stack traces
- **Security logs:** Failed login attempts, suspicious activity
- **Audit logs:** Grade changes, fee payments, user edits

### Tools
- **Winston:** Structured logging
- **Morgan:** HTTP request logging
- **Sentry:** Error tracking

---

## Deployment Checklist

- [ ] Environment variables configured (.env)
- [ ] Database migrations applied
- [ ] SSL/TLS certificate installed (HTTPS)
- [ ] Rate limiting enabled
- [ ] CORS origins whitelisted
- [ ] Error logging configured
- [ ] API documentation published
- [ ] Health check endpoint (`/api/v1/health`)
- [ ] Database backups automated
- [ ] Monitoring alerts configured

---

## Next Steps

1. Implement authentication endpoints first
2. Setup JWT middleware
3. Create database models (node-postgres or Prisma ORM)
4. Implement student endpoints
5. Add input validation (Joi or express-validator)
6. Write unit tests
7. Setup Swagger documentation
8. Deploy to staging environment
