# Acad Institute ERP - Database Schema Documentation

## Overview

This document describes the PostgreSQL database schema for the Acad Institute ERP system (Phase 1 MVP).

---

## Entity Relationship Diagram (Text Format)

```
┌─────────────┐
│    users    │ (Central authentication)
└──────┬──────┘
       │
       ├─────────────────────────────────┐
       │                                 │
       ▼                                 ▼
┌─────────────┐                   ┌─────────────┐
│  students   │                   │    staff    │
└──────┬──────┘                   └──────┬──────┘
       │                                 │
       │                                 │
       ▼                                 ▼
┌─────────────┐                   ┌──────────────────┐
│ enrollments │◄──────────────────┤ course_offerings │
└──────┬──────┘                   └────────┬─────────┘
       │                                   │
       ├────────────┬────────────┐         │
       ▼            ▼            ▼         ▼
┌───────────┐ ┌────────────┐ ┌───────────────┐
│  grades   │ │ attendance │ │    courses    │
└───────────┘ └────────────┘ └───────┬───────┘
                                     │
                                     ▼
                              ┌─────────────┐
                              │  programs   │
                              └──────┬──────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │ departments  │
                              └──────────────┘

       ┌─────────────┐
       │    fees     │◄─── students
       └──────┬──────┘
              │
              ▼
       ┌──────────────┐
       │  fee_types   │
       └──────────────┘

       ┌──────────────────┐
       │  announcements   │◄─── users (created_by)
       └──────────────────┘
```

---

## Core Tables (Phase 1)

### 1. **users**
Central authentication and user management table.

| Column        | Type         | Constraints      | Description                                       |
|---------------|--------------|------------------|---------------------------------------------------|
| id            | SERIAL       | PRIMARY KEY      | Auto-increment ID                                 |
| uuid          | UUID         | UNIQUE, NOT NULL | Universal unique ID                               |
| email         | VARCHAR(255) | UNIQUE, NOT NULL | Login email                                       |
| password_hash | VARCHAR(255) | NOT NULL         | Bcrypt hashed password                            |
| first_name    | VARCHAR(100) | NOT NULL         | First name                                        |
| last_name     | VARCHAR(100) | NOT NULL         | Last name                                         |
| phone         | VARCHAR(20)  | NULL             | Phone number                                      |
| role          | VARCHAR(20)  | NOT NULL         | student/teacher/admin/parent/registrar/accountant |
| status        | VARCHAR(20)  | DEFAULT 'active' | active/inactive/suspended/graduated               |
| last_login    | TIMESTAMP    | NULL             | Last login timestamp                              |
| created_at    | TIMESTAMP    | DEFAULT NOW()    | Creation timestamp                                |
| updated_at    | TIMESTAMP    | DEFAULT NOW()    | Update timestamp                                  |

**Indexes:** email, role, status

---

### 2. **students**
Student-specific information.

| Column            | Type         | Constraints                 | Description              |
|-------------------|--------------|-----------------------------|--------------------------|
| id                | SERIAL       | PRIMARY KEY                 | Auto-increment ID        |
| user_id           | INTEGER      | UNIQUE, NOT NULL, FK(users) | Link to users table      |
| roll_no           | VARCHAR(50)  | UNIQUE, NOT NULL            | Student roll number      |
| enrollment_date   | DATE         | NOT NULL                    | Date of enrollment       |
| program_id        | INTEGER      | NOT NULL, FK(programs)      | Enrolled program         |
| current_semester  | INTEGER      | DEFAULT 1, CHECK(1-8)       | Current semester         |
| gpa               | DECIMAL(3,2) | DEFAULT 0.00, CHECK(0-4)    | Cumulative GPA           |
| photo_url         | VARCHAR(500) | NULL                        | Profile photo URL        |
| address           | TEXT         | NULL                        | Residential address      |
| date_of_birth     | DATE         | NULL                        | Date of birth            |
| blood_group       | VARCHAR(5)   | NULL                        | Blood group              |
| emergency_contact | VARCHAR(20)  | NULL                        | Emergency contact number |
| parent_user_id    | INTEGER      | NULL, FK(users)             | Link to parent account   |
| created_at        | TIMESTAMP    | DEFAULT NOW()               | Creation timestamp       |
| updated_at        | TIMESTAMP    | DEFAULT NOW()               | Update timestamp         |

**Indexes:** user_id, roll_no, program_id

---

### 3. **staff**
Staff and teacher information.

| Column         | Type          | Constraints                 | Description               |
|----------------|---------------|-----------------------------|---------------------------|
| id             | SERIAL        | PRIMARY KEY                 | Auto-increment ID         |
| user_id        | INTEGER       | UNIQUE, NOT NULL, FK(users) | Link to users table       |
| employee_id    | VARCHAR(50)   | UNIQUE, NOT NULL            | Employee ID               |
| department_id  | INTEGER       | NULL, FK(departments)       | Department assignment     |
| designation    | VARCHAR(100)  | NULL                        | Job designation           |
| qualification  | VARCHAR(200)  | NULL                        | Educational qualification |
| specialization | TEXT          | NULL                        | Area of specialization    |
| joining_date   | DATE          | NOT NULL                    | Date of joining           |
| salary         | DECIMAL(10,2) | NULL                        | Monthly salary            |
| created_at     | TIMESTAMP     | DEFAULT NOW()               | Creation timestamp        |

**Indexes:** user_id, department_id

---

### 4. **departments**
Academic departments.

| Column       | Type         | Constraints      | Description                      |
|--------------|--------------|------------------|----------------------------------|
| id           | SERIAL       | PRIMARY KEY      | Auto-increment ID                |
| name         | VARCHAR(200) | NOT NULL         | Department name                  |
| code         | VARCHAR(10)  | UNIQUE, NOT NULL | Department code (CSE, ECE, etc.) |
| description  | TEXT         | NULL             | Department description           |
| head_user_id | INTEGER      | NULL, FK(users)  | Department head                  |
| created_at   | TIMESTAMP    | DEFAULT NOW()    | Creation timestamp               |

---

### 5. **programs**
Degree programs (BTech CSE, BTech ECE, etc.).

| Column         | Type         | Constraints           | Description            |
|----------------|--------------|-----------------------|------------------------|
| id             | SERIAL       | PRIMARY KEY           | Auto-increment ID      |
| name           | VARCHAR(200) | NOT NULL              | Program name           |
| code           | VARCHAR(20)  | UNIQUE, NOT NULL      | Program code           |
| department_id  | INTEGER      | FK(departments)       | Associated department  |
| duration_years | INTEGER      | NOT NULL, DEFAULT 4   | Duration in years      |
| total_credits  | INTEGER      | NOT NULL, DEFAULT 160 | Total credits required |
| description    | TEXT         | NULL                  | Program description    |
| is_active      | BOOLEAN      | DEFAULT true          | Active status          |
| created_at     | TIMESTAMP    | DEFAULT NOW()         | Creation timestamp     |

**Indexes:** department_id, is_active

---

### 6. **courses**
Master course catalog.

| Column        | Type         | Constraints                     | Description               |
|---------------|--------------|---------------------------------|---------------------------|
| id            | SERIAL       | PRIMARY KEY                     | Auto-increment ID         |
| code          | VARCHAR(20)  | UNIQUE, NOT NULL                | Course code (CS101, etc.) |
| name          | VARCHAR(200) | NOT NULL                        | Course name               |
| credits       | INTEGER      | NOT NULL, DEFAULT 3, CHECK(1-6) | Credit hours              |
| program_id    | INTEGER      | NOT NULL, FK(programs)          | Associated program        |
| semester      | INTEGER      | NOT NULL, CHECK(1-8)            | Recommended semester      |
| course_type   | VARCHAR(20)  | CHECK                           | core/elective/lab/project |
| description   | TEXT         | NULL                            | Course description        |
| prerequisites | TEXT         | NULL                            | Prerequisite courses      |
| is_active     | BOOLEAN      | DEFAULT true                    | Active status             |
| created_at    | TIMESTAMP    | DEFAULT NOW()                   | Creation timestamp        |

**Indexes:** program_id, semester, code

---

### 7. **course_offerings**
Specific course instances offered in a semester.

| Column        | Type        | Constraints           | Description                |
|---------------|-------------|-----------------------|----------------------------|
| id            | SERIAL      | PRIMARY KEY           | Auto-increment ID          |
| course_id     | INTEGER     | NOT NULL, FK(courses) | Course reference           |
| teacher_id    | INTEGER     | NULL, FK(staff)       | Assigned teacher           |
| academic_year | VARCHAR(9)  | NOT NULL              | Academic year (2025-2026)  |
| semester      | VARCHAR(10) | NOT NULL, CHECK       | Fall/Spring/Summer         |
| max_students  | INTEGER     | DEFAULT 60            | Maximum enrollment         |
| room_no       | VARCHAR(20) | NULL                  | Classroom/lab number       |
| schedule      | TEXT        | NULL                  | Class schedule (JSON/text) |
| is_active     | BOOLEAN     | DEFAULT true          | Active status              |
| created_at    | TIMESTAMP   | DEFAULT NOW()         | Creation timestamp         |

**Indexes:** course_id, teacher_id, academic_year+semester

---

### 8. **enrollments**
Student enrollment in specific course offerings.

| Column             | Type        | Constraints                    | Description                     |
|--------------------|-------------|--------------------------------|---------------------------------|
| id                 | SERIAL      | PRIMARY KEY                    | Auto-increment ID               |
| student_id         | INTEGER     | NOT NULL, FK(students)         | Student reference               |
| course_offering_id | INTEGER     | NOT NULL, FK(course_offerings) | Course offering reference       |
| enrollment_date    | DATE        | DEFAULT CURRENT_DATE           | Enrollment date                 |
| status             | VARCHAR(20) | DEFAULT 'active', CHECK        | active/dropped/completed/failed |
| created_at         | TIMESTAMP   | DEFAULT NOW()                  | Creation timestamp              |

**Unique constraint:** (student_id, course_offering_id)
**Indexes:** student_id, course_offering_id, status

---

### 9. **grades**
Final grades for enrolled courses.

| Column        | Type         | Constraints                       | Description            |
|---------------|--------------|-----------------------------------|------------------------|
| id            | SERIAL       | PRIMARY KEY                       | Auto-increment ID      |
| enrollment_id | INTEGER      | UNIQUE, NOT NULL, FK(enrollments) | Enrollment reference   |
| marks         | DECIMAL(5,2) | CHECK(0-100)                      | Marks obtained         |
| grade_letter  | VARCHAR(3)   | CHECK                             | A+/A/B+/B/C+/C/D/F/I/W |
| grade_points  | DECIMAL(3,2) | CHECK(0-4)                        | Grade points for GPA   |
| remarks       | TEXT         | NULL                              | Additional remarks     |
| graded_by     | INTEGER      | NULL, FK(users)                   | Teacher who graded     |
| graded_at     | TIMESTAMP    | NULL                              | Grading timestamp      |
| created_at    | TIMESTAMP    | DEFAULT NOW()                     | Creation timestamp     |
| updated_at    | TIMESTAMP    | DEFAULT NOW()                     | Update timestamp       |

**Indexes:** enrollment_id, grade_letter

---

### 10. **attendance**
Daily attendance records for enrolled courses.

| Column        | Type        | Constraints               | Description                          |
|---------------|-------------|---------------------------|--------------------------------------|
| id            | SERIAL      | PRIMARY KEY               | Auto-increment ID                    |
| enrollment_id | INTEGER     | NOT NULL, FK(enrollments) | Enrollment reference                 |
| date          | DATE        | NOT NULL                  | Attendance date                      |
| status        | VARCHAR(20) | NOT NULL, CHECK           | present/absent/late/excused/on_leave |
| marked_by     | INTEGER     | NULL, FK(users)           | Who marked attendance                |
| remarks       | TEXT        | NULL                      | Additional remarks                   |
| created_at    | TIMESTAMP   | DEFAULT NOW()             | Creation timestamp                   |

**Unique constraint:** (enrollment_id, date)
**Indexes:** enrollment_id, date, status

---

### 11. **fee_types**
Define different fee categories.

| Column       | Type         | Constraints   | Description             |
|--------------|--------------|---------------|-------------------------|
| id           | SERIAL       | PRIMARY KEY   | Auto-increment ID       |
| name         | VARCHAR(100) | NOT NULL      | Fee type name           |
| description  | TEXT         | NULL          | Description             |
| is_recurring | BOOLEAN      | DEFAULT true  | Recurring semester fee? |
| is_active    | BOOLEAN      | DEFAULT true  | Active status           |
| created_at   | TIMESTAMP    | DEFAULT NOW() | Creation timestamp      |

---

### 12. **fee_structure**
Define fees per program/semester.

| Column          | Type          | Constraints             | Description                     |
|-----------------|---------------|-------------------------|---------------------------------|
| id              | SERIAL        | PRIMARY KEY             | Auto-increment ID               |
| program_id      | INTEGER       | NOT NULL, FK(programs)  | Program reference               |
| fee_type_id     | INTEGER       | NOT NULL, FK(fee_types) | Fee type reference              |
| semester        | INTEGER       | NULL, CHECK(1-8)        | Applicable semester             |
| amount          | DECIMAL(10,2) | NOT NULL, CHECK(>=0)    | Fee amount                      |
| academic_year   | VARCHAR(9)    | NOT NULL                | Academic year                   |
| due_date_offset | INTEGER       | DEFAULT 30              | Days offset from semester start |
| created_at      | TIMESTAMP     | DEFAULT NOW()           | Creation timestamp              |

**Unique constraint:** (program_id, fee_type_id, semester, academic_year)
**Indexes:** program_id

---

### 13. **fees**
Individual student fee records and payment tracking.

| Column         | Type          | Constraints              | Description                         |
|----------------|---------------|--------------------------|-------------------------------------|
| id             | SERIAL        | PRIMARY KEY              | Auto-increment ID                   |
| student_id     | INTEGER       | NOT NULL, FK(students)   | Student reference                   |
| fee_type_id    | INTEGER       | NOT NULL, FK(fee_types)  | Fee type reference                  |
| academic_year  | VARCHAR(9)    | NOT NULL                 | Academic year                       |
| semester       | INTEGER       | NULL, CHECK(1-8)         | Semester                            |
| amount         | DECIMAL(10,2) | NOT NULL, CHECK(>=0)     | Total fee amount                    |
| due_date       | DATE          | NOT NULL                 | Payment due date                    |
| paid_amount    | DECIMAL(10,2) | DEFAULT 0.00, CHECK(>=0) | Amount paid                         |
| paid_date      | DATE          | NULL                     | Payment date                        |
| payment_method | VARCHAR(50)   | NULL                     | cash/card/online/cheque             |
| transaction_id | VARCHAR(100)  | NULL                     | Payment transaction ID              |
| status         | VARCHAR(20)   | DEFAULT 'pending', CHECK | pending/paid/partial/overdue/waived |
| remarks        | TEXT          | NULL                     | Additional remarks                  |
| created_at     | TIMESTAMP     | DEFAULT NOW()            | Creation timestamp                  |
| updated_at     | TIMESTAMP     | DEFAULT NOW()            | Update timestamp                    |

**Indexes:** student_id, status, due_date, academic_year

---

### 14. **announcements**
Institute-wide announcements and notices.

| Column          | Type         | Constraints             | Description                                                            |
|-----------------|--------------|-------------------------|------------------------------------------------------------------------|
| id              | SERIAL       | PRIMARY KEY             | Auto-increment ID                                                      |
| title           | VARCHAR(200) | NOT NULL                | Announcement title                                                     |
| content         | TEXT         | NOT NULL                | Announcement content                                                   |
| audience        | VARCHAR(50)  | DEFAULT 'all', CHECK    | all/students/teachers/staff/parents/specific_program/specific_semester |
| audience_filter | INTEGER      | NULL                    | Program ID or semester number                                          |
| priority        | VARCHAR(20)  | DEFAULT 'normal', CHECK | low/normal/high/urgent                                                 |
| created_by      | INTEGER      | NOT NULL, FK(users)     | Creator user ID                                                        |
| published_at    | TIMESTAMP    | DEFAULT NOW()           | Publication timestamp                                                  |
| expires_at      | TIMESTAMP    | NULL                    | Expiration timestamp                                                   |
| is_active       | BOOLEAN      | DEFAULT true            | Active status                                                          |
| attachment_url  | VARCHAR(500) | NULL                    | Attachment URL                                                         |
| created_at      | TIMESTAMP    | DEFAULT NOW()           | Creation timestamp                                                     |

**Indexes:** audience, is_active, published_at

---

### 15. **password_reset_tokens**
For forgot password functionality.

| Column     | Type         | Constraints         | Description          |
|------------|--------------|---------------------|----------------------|
| id         | SERIAL       | PRIMARY KEY         | Auto-increment ID    |
| user_id    | INTEGER      | NOT NULL, FK(users) | User reference       |
| token      | VARCHAR(255) | UNIQUE, NOT NULL    | Reset token (hashed) |
| expires_at | TIMESTAMP    | NOT NULL            | Token expiration     |
| used       | BOOLEAN      | DEFAULT false       | Token usage status   |
| created_at | TIMESTAMP    | DEFAULT NOW()       | Creation timestamp   |

**Indexes:** user_id, token, expires_at

---

### 16. **audit_logs**
Track important system actions (security & compliance).

| Column      | Type         | Constraints     | Description                  |
|-------------|--------------|-----------------|------------------------------|
| id          | SERIAL       | PRIMARY KEY     | Auto-increment ID            |
| user_id     | INTEGER      | NULL, FK(users) | User who performed action    |
| action      | VARCHAR(100) | NOT NULL        | Action performed             |
| entity_type | VARCHAR(50)  | NULL            | Entity type (user/grade/fee) |
| entity_id   | INTEGER      | NULL            | Entity ID                    |
| old_value   | TEXT         | NULL            | Previous value (JSON)        |
| new_value   | TEXT         | NULL            | New value (JSON)             |
| ip_address  | VARCHAR(45)  | NULL            | IP address                   |
| user_agent  | TEXT         | NULL            | User agent string            |
| created_at  | TIMESTAMP    | DEFAULT NOW()   | Action timestamp             |

**Indexes:** user_id, action, created_at

---

## Database Views

### student_dashboard
Summary view for student dashboard (grades, attendance, fees).

```sql
SELECT student_id, roll_no, name, program, semester, gpa, 
       enrolled_courses, pending_fees
FROM student_dashboard;
```

### student_attendance_summary
Attendance percentage per course.

```sql
SELECT student_id, course_name, total_classes, 
       classes_attended, attendance_percentage
FROM student_attendance_summary;
```

---

## Relationships Summary

- **users** → **students** (1:1)
- **users** → **staff** (1:1)
- **programs** → **students** (1:N)
- **programs** → **courses** (1:N)
- **courses** → **course_offerings** (1:N)
- **staff** → **course_offerings** (1:N, teacher assignment)
- **students** → **enrollments** (1:N)
- **course_offerings** → **enrollments** (1:N)
- **enrollments** → **grades** (1:1)
- **enrollments** → **attendance** (1:N)
- **students** → **fees** (1:N)
- **users** → **announcements** (1:N, creator)

---

## Indexes Strategy

Performance-critical queries optimized:
- **Login:** `users(email)` index
- **Student lookup:** `students(roll_no)`, `students(user_id)` indexes
- **Course enrollment:** `enrollments(student_id, course_offering_id)` indexes
- **Attendance:** `attendance(enrollment_id, date)` compound index
- **Fee tracking:** `fees(student_id, status, due_date)` indexes

---

## Security Considerations

1. **Password storage:** Bcrypt hashing (never plaintext)
2. **Audit logging:** All grade/fee changes tracked
3. **Soft deletes:** Use `status` flags instead of DELETE for important records
4. **Row-level security:** Can be implemented via PostgreSQL RLS policies
5. **Data privacy:** Parent access limited to their child's records only

---

## Next Steps

1. Run `database-schema.sql` to create all tables
2. Verify relationships with test data
3. Test views and indexes
4. Implement database migration strategy
5. Create backup/restore procedures
