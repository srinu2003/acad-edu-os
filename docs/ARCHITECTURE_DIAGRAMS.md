# Acad Institute ERP - Architecture Diagrams

## 1. System Architecture (High-Level)

```mermaid
graph TB
    subgraph "Client Layer"
        A[Next.js Frontend<br/>React + @knadh/oat UI]
    end
    
    subgraph "API Gateway Layer"
        B[Express.js Server]
        C[Rate Limiter]
        D[CORS Handler]
    end
    
    subgraph "Middleware Layer"
        E[Authentication<br/>JWT Verification]
        F[Authorization<br/>RBAC]
        G[Input Validation]
        H[Error Handler]
    end
    
    subgraph "Business Logic Layer"
        I[Auth Controller]
        J[Student Controller]
        K[Grade Controller]
        L[Fee Controller]
        M[Announcement Controller]
    end
    
    subgraph "Data Access Layer"
        N[User Model]
        O[Student Model]
        P[Grade Model]
        Q[Fee Model]
        R[Course Model]
    end
    
    subgraph "Database Layer"
        S[(PostgreSQL Database)]
    end
    
    A -->|HTTP/HTTPS| B
    B --> C
    C --> D
    D --> E
    E --> F
    F --> G
    G --> I
    G --> J
    G --> K
    G --> L
    G --> M
    
    I --> N
    J --> O
    K --> P
    L --> Q
    M --> R
    
    N --> S
    O --> S
    P --> S
    Q --> S
    R --> S
    
    I -.-> H
    J -.-> H
    K -.-> H
    L -.-> H
    M -.-> H
```

---

## 2. Authentication Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant API as Express API
    participant DB as PostgreSQL
    participant JWT as JWT Service
    
    Note over C,JWT: Login Flow
    C->>+API: POST /api/v1/auth/login<br/>{email, password}
    API->>API: Validate Input
    API->>+DB: SELECT user WHERE email = ?
    DB-->>-API: User Data
    API->>API: bcrypt.compare(password, hash)
    
    alt Valid Credentials
        API->>+JWT: Generate Tokens
        JWT-->>-API: {accessToken, refreshToken}
        API-->>C: 200 OK<br/>{user, accessToken, refreshToken}
    else Invalid Credentials
        API-->>C: 401 Unauthorized<br/>{error: "Invalid credentials"}
    end
    
    Note over C,JWT: Protected Request Flow
    C->>+API: GET /api/v1/student/grades<br/>Authorization: Bearer <token>
    API->>+JWT: Verify Token
    JWT-->>-API: {userId, role}
    
    alt Token Valid
        API->>API: Authorize (RBAC Check)
        API->>+DB: SELECT grades WHERE student_id = ?
        DB-->>-API: Grades Data
        API-->>C: 200 OK<br/>{grades}
    else Token Invalid/Expired
        API-->>C: 401 Unauthorized<br/>{error: "Token invalid"}
    end
    
    Note over C,JWT: Token Refresh Flow
    C->>+API: POST /api/v1/auth/refresh<br/>{refreshToken}
    API->>+JWT: Verify Refresh Token
    JWT-->>-API: {userId}
    
    alt Valid Refresh Token
        API->>+JWT: Generate New Access Token
        JWT-->>-API: {accessToken}
        API-->>C: 200 OK<br/>{accessToken}
    else Invalid Refresh Token
        API-->>C: 401 Unauthorized<br/>{error: "Invalid token"}
    end
```

---

## 3. Request Processing Flow

```mermaid
flowchart TD
    A[Client Request] --> B{Rate Limit<br/>Exceeded?}
    B -->|Yes| C[429 Too Many Requests]
    B -->|No| D[CORS Check]
    
    D --> E{Valid<br/>Origin?}
    E -->|No| F[403 Forbidden]
    E -->|Yes| G[Parse Request Body]
    
    G --> H{Requires<br/>Auth?}
    H -->|No| I[Public Route Handler]
    H -->|Yes| J[Extract JWT Token]
    
    J --> K{Token<br/>Valid?}
    K -->|No| L[401 Unauthorized]
    K -->|Yes| M[Extract User Info]
    
    M --> N{Authorized<br/>Role?}
    N -->|No| O[403 Forbidden]
    N -->|Yes| P[Validate Input]
    
    P --> Q{Input<br/>Valid?}
    Q -->|No| R[400 Bad Request]
    Q -->|Yes| S[Route Handler]
    
    S --> T[Business Logic]
    T --> U[Database Query]
    
    U --> V{Query<br/>Success?}
    V -->|No| W[500 Internal Error]
    V -->|Yes| X[Format Response]
    
    X --> Y[200 OK Response]
    
    I --> S
    
    C --> Z[Return Error Response]
    F --> Z
    L --> Z
    O --> Z
    R --> Z
    W --> Z
    Y --> AA[Client Receives Response]
    Z --> AA
```

---

## 4. Database Entity Relationship Diagram

```mermaid
erDiagram
    USERS ||--o{ STUDENTS : "has"
    USERS ||--o{ STAFF : "has"
    USERS ||--o{ AUDIT_LOGS : "creates"
    USERS ||--o{ ANNOUNCEMENTS : "creates"
    USERS ||--o{ PASSWORD_RESET_TOKENS : "has"
    
    DEPARTMENTS ||--o{ PROGRAMS : "offers"
    DEPARTMENTS ||--o{ STAFF : "employs"
    
    PROGRAMS ||--o{ STUDENTS : "enrolls"
    PROGRAMS ||--o{ COURSES : "includes"
    PROGRAMS ||--o{ FEE_STRUCTURE : "defines"
    
    COURSES ||--o{ COURSE_OFFERINGS : "offered_as"
    
    STAFF ||--o{ COURSE_OFFERINGS : "teaches"
    
    STUDENTS ||--o{ ENROLLMENTS : "enrolls_in"
    STUDENTS ||--o{ FEES : "pays"
    STUDENTS ||--o{ AUDIT_LOGS : "subject_of"
    
    COURSE_OFFERINGS ||--o{ ENROLLMENTS : "has"
    
    ENROLLMENTS ||--|| GRADES : "receives"
    ENROLLMENTS ||--o{ ATTENDANCE : "records"
    
    FEE_TYPES ||--o{ FEE_STRUCTURE : "used_in"
    FEE_TYPES ||--o{ FEES : "categorizes"
    
    USERS {
        int id PK
        uuid uuid UK
        string email UK
        string password_hash
        string first_name
        string last_name
        string role
        string status
        timestamp created_at
    }
    
    STUDENTS {
        int id PK
        int user_id FK
        string roll_no UK
        int program_id FK
        int current_semester
        decimal gpa
        date enrollment_date
    }
    
    STAFF {
        int id PK
        int user_id FK
        string employee_id UK
        int department_id FK
        date joining_date
    }
    
    DEPARTMENTS {
        int id PK
        string name
        string code UK
    }
    
    PROGRAMS {
        int id PK
        string name
        string code UK
        int department_id FK
        int duration_years
    }
    
    COURSES {
        int id PK
        string code UK
        string name
        int credits
        int program_id FK
        int semester
    }
    
    COURSE_OFFERINGS {
        int id PK
        int course_id FK
        int teacher_id FK
        string academic_year
        string semester
    }
    
    ENROLLMENTS {
        int id PK
        int student_id FK
        int course_offering_id FK
        string status
    }
    
    GRADES {
        int id PK
        int enrollment_id FK
        decimal marks
        string grade_letter
        decimal grade_points
    }
    
    ATTENDANCE {
        int id PK
        int enrollment_id FK
        date date
        string status
    }
    
    FEES {
        int id PK
        int student_id FK
        int fee_type_id FK
        decimal amount
        decimal paid_amount
        string status
    }
    
    FEE_TYPES {
        int id PK
        string name
        boolean is_recurring
    }
    
    FEE_STRUCTURE {
        int id PK
        int program_id FK
        int fee_type_id FK
        int semester
        decimal amount
    }
    
    ANNOUNCEMENTS {
        int id PK
        string title
        text content
        int created_by FK
        string audience
    }
    
    PASSWORD_RESET_TOKENS {
        int id PK
        int user_id FK
        string token UK
        timestamp expires_at
    }
    
    AUDIT_LOGS {
        int id PK
        int user_id FK
        string action
        string entity_type
        int entity_id
    }
```

---

## 5. User Role Hierarchy

```mermaid
graph LR
    A[Admin] --> B[Full System Access]
    A --> C[User Management]
    A --> D[System Configuration]
    A --> E[View All Data]
    
    F[Teacher/Staff] --> G[Mark Attendance]
    F --> H[Enter Grades]
    F --> I[View Assigned Classes]
    F --> J[Create Announcements]
    
    K[Student] --> L[View Own Grades]
    K --> M[View Own Attendance]
    K --> N[View Fee Status]
    K --> O[Update Profile Limited]
    K --> P[View Announcements]
    
    Q[Parent] --> R[View Child's Grades]
    Q --> S[View Child's Attendance]
    Q --> T[View Child's Fees]
    Q --> U[Pay Fees]
    
    V[Registrar] --> W[Student Enrollment]
    V --> X[Generate Transcripts]
    V --> Y[Course Registration]
    
    Z[Accountant] --> AA[Manage Fees]
    Z --> AB[Track Payments]
    Z --> AC[Financial Reports]
    
    style A fill:#ff6b6b
    style F fill:#4ecdc4
    style K fill:#95e1d3
    style Q fill:#feca57
    style V fill:#48dbfb
    style Z fill:#ff9ff3
```

---

## 6. API Request Authorization Flow

```mermaid
flowchart LR
    A[API Request] --> B{JWT<br/>Present?}
    
    B -->|No| C[401 Unauthorized]
    B -->|Yes| D[Verify JWT Signature]
    
    D --> E{Valid<br/>Signature?}
    E -->|No| F[401 Invalid Token]
    E -->|Yes| G[Check Expiration]
    
    G --> H{Token<br/>Expired?}
    H -->|Yes| I[401 Token Expired]
    H -->|No| J[Extract User Info<br/>userId, role]
    
    J --> K[Load Authorization Rules<br/>for Endpoint]
    
    K --> L{Role<br/>Allowed?}
    L -->|No| M[403 Forbidden]
    L -->|Yes| N{Resource<br/>Ownership<br/>Check?}
    
    N -->|Not Required| O[Proceed to Handler]
    N -->|Required| P{Owns<br/>Resource?}
    
    P -->|No| Q[403 Forbidden]
    P -->|Yes| O
    
    O --> R[Execute Business Logic]
    R --> S[200 Success]
```

---

## 7. Student Dashboard Data Flow

```mermaid
sequenceDiagram
    participant S as Student Client
    participant API as API Server
    participant Cache as Redis Cache
    participant DB as PostgreSQL
    
    S->>+API: GET /api/v1/student/dashboard
    Note over API: JWT verified, userId extracted
    
    API->>+Cache: Check cache for dashboard data
    Cache-->>-API: Cache miss
    
    par Parallel Queries
        API->>+DB: Get student profile
        DB-->>-API: Student data
        
        API->>+DB: Get enrolled courses count
        DB-->>-API: Course count
        
        API->>+DB: Get attendance summary
        DB-->>-API: Attendance %
        
        API->>+DB: Get pending fees
        DB-->>-API: Fee data
        
        API->>+DB: Get recent grades
        DB-->>-API: Latest grades
        
        API->>+DB: Get recent announcements
        DB-->>-API: Announcements
    end
    
    API->>API: Aggregate data
    API->>+Cache: Store in cache (5 min TTL)
    Cache-->>-API: Cached
    
    API-->>-S: 200 OK<br/>{dashboard data}
```

---

## 8. Fee Payment Flow (Future Phase)

```mermaid
stateDiagram-v2
    [*] --> FeePending: Fee Generated
    
    FeePending --> FeePartial: Partial Payment
    FeePending --> FeePaid: Full Payment
    FeePending --> FeeOverdue: Due Date Passed
    
    FeePartial --> FeePaid: Remaining Payment
    FeePartial --> FeeOverdue: Due Date Passed
    
    FeeOverdue --> FeePaid: Payment + Late Fee
    FeeOverdue --> FeeWaived: Admin Waiver
    
    FeePaid --> [*]
    FeeWaived --> [*]
    
    note right of FeePending
        Initial state after
        fee structure applied
    end note
    
    note right of FeeOverdue
        Automated notification
        to student and parent
    end note
```

---

## 9. Deployment Architecture

```mermaid
graph TB
    subgraph "Production Environment"
        subgraph "Frontend"
            A[Vercel/Netlify<br/>Next.js Static + SSR]
        end
        
        subgraph "Backend"
            B[Railway/Render<br/>Express.js API]
            C[Load Balancer]
        end
        
        subgraph "Database"
            D[(PostgreSQL<br/>Primary)]
            E[(PostgreSQL<br/>Replica)]
        end
        
        subgraph "Cache Layer"
            F[Redis<br/>Session + Cache]
        end
        
        subgraph "Storage"
            G[AWS S3 / Cloudinary<br/>File Storage]
        end
        
        subgraph "Monitoring"
            H[Sentry<br/>Error Tracking]
            I[Datadog/New Relic<br/>Performance]
        end
    end
    
    subgraph "External Services"
        J[SendGrid<br/>Email Service]
        K[Razorpay<br/>Payment Gateway]
    end
    
    A -->|API Calls| C
    C --> B
    B --> D
    D --> E
    B --> F
    B --> G
    B --> J
    B --> K
    B --> H
    B --> I
```

---

## 10. CI/CD Pipeline

```mermaid
flowchart LR
    A[Developer<br/>Push Code] --> B[GitHub Repository]
    
    B --> C{Branch?}
    
    C -->|main| D[GitHub Actions:<br/>Production Pipeline]
    C -->|develop| E[GitHub Actions:<br/>Staging Pipeline]
    C -->|feature/*| F[GitHub Actions:<br/>CI Only]
    
    F --> G[Run Linter]
    G --> H[Run Unit Tests]
    H --> I[Run Integration Tests]
    I --> J{Tests<br/>Pass?}
    J -->|No| K[Notify Developer]
    J -->|Yes| L[Build Success]
    
    E --> G
    I --> M{Deploy to<br/>Staging?}
    M -->|Yes| N[Deploy to Railway Staging]
    N --> O[Run E2E Tests]
    O --> P{Tests<br/>Pass?}
    P -->|No| K
    P -->|Yes| Q[Staging Live]
    
    D --> G
    I --> R{Deploy to<br/>Production?}
    R -->|Yes| S[Build Docker Image]
    S --> T[Push to Registry]
    T --> U[Deploy to Railway Prod]
    U --> V[Health Check]
    V --> W{Healthy?}
    W -->|No| X[Rollback]
    W -->|Yes| Y[Production Live]
    X --> K
```

---

## 11. Data Access Pattern (Repository Pattern)

```mermaid
classDiagram
    class Controller {
        +handleRequest()
        +validateInput()
        +formatResponse()
    }
    
    class Service {
        +businessLogic()
        +orchestrateOperations()
        +applyRules()
    }
    
    class Repository {
        +findById()
        +findAll()
        +create()
        +update()
        +delete()
    }
    
    class Database {
        +query()
        +transaction()
    }
    
    Controller --> Service: uses
    Service --> Repository: uses
    Repository --> Database: queries
    
    class StudentController {
        +getDashboard()
        +getGrades()
        +getAttendance()
    }
    
    class StudentService {
        +calculateGPA()
        +aggregateDashboard()
        +validateEnrollment()
    }
    
    class StudentRepository {
        +findStudentById()
        +findStudentByRollNo()
        +updateStudent()
    }
    
    StudentController --|> Controller
    StudentService --|> Service
    StudentRepository --|> Repository
    
    StudentController --> StudentService
    StudentService --> StudentRepository
```

---

## 12. Error Handling Flow

```mermaid
flowchart TD
    A[Error Occurs] --> B{Error<br/>Type?}
    
    B -->|Validation Error| C[400 Bad Request]
    B -->|Authentication Error| D[401 Unauthorized]
    B -->|Authorization Error| E[403 Forbidden]
    B -->|Not Found Error| F[404 Not Found]
    B -->|Conflict Error| G[409 Conflict]
    B -->|Database Error| H[500 Internal Error]
    B -->|Unknown Error| H
    
    C --> I[Format Error Response]
    D --> I
    E --> I
    F --> I
    G --> I
    H --> J[Log Error to Sentry]
    
    J --> K[Log to File/Database]
    K --> I
    
    I --> L{Production<br/>Mode?}
    L -->|Yes| M[Return Generic Message]
    L -->|No| N[Return Detailed Error]
    
    M --> O[Send to Client]
    N --> O
    
    H --> P{Critical<br/>Error?}
    P -->|Yes| Q[Alert Admin]
    P -->|No| R[Standard Logging]
```

---

## Usage Instructions

To view these diagrams in VS Code:
1. Install the "Markdown Preview Mermaid Support" extension
2. Open this file
3. Press `Ctrl+Shift+V` (or `Cmd+Shift+V` on Mac) to preview

To export diagrams:
1. Use the Mermaid Live Editor: https://mermaid.live/
2. Copy-paste individual diagrams
3. Export as PNG/SVG
