## **SCOPE & ARCHITECTURE FINALIZED**

### **Institute Profile: Large (2000+ students)**
- Multiple departments/programs
- Distributed access patterns (students accessing simultaneously)
- Need for scalability from day 1

### **Phase 1 (MVP) Focus: Auth + Student Portal**
This is where we focus first. Students can:
- Login securely
- View their grades
- Check attendance
- See fee status
- View announcements

---

## **Architecture Decision: Monolith or Microservices?**

**For you (solo dev), MONOLITH is best:**
- Single Express backend (handles auth + all Phase 1 features)
- Single Next.js frontend (student portal UI)
- Single PostgreSQL database
- **Easy to understand, deploy, and maintain**
- Can split into microservices later if needed

**Structure:**
```
backend/
  ├── src/
  │   ├── auth/          (login, JWT, sessions)
  │   ├── student/       (grades, attendance, fees, announcements)
  │   ├── database/      (PostgreSQL models, migrations)
  │   ├── middleware/    (auth check, rate-limit, error handling)
  │   └── config/        (env vars, constants)
  └── ...

frontend/
  ├── pages/
  │   ├── login.js       (login page)
  │   ├── dashboard.js   (student home - grades, attendance, fees)
  │   ├── profile.js     (student info)
  │   └── announcements.js
  └── ...
```

---

## **Phase 1 Database Schema (Minimal for MVP)**

```sql
-- Core Tables Needed for Phase 1

users (
  id, email, password_hash, first_name, last_name, 
  role (student/admin/teacher), phone, status
)

students (
  id, user_id, roll_no, enrollment_date, program_id, 
  semester, gpa, photo_url
)

programs (
  id, name (BTech CSE, BTech ECE, etc), 
  duration_years, department_id
)

courses (
  id, code, name, credits, program_id, semester
)

enrollments (
  id, student_id, course_id, semester, status
)

grades (
  id, student_id, course_id, marks, grade_letter, 
  semester, teacher_id, created_at
)

attendance (
  id, student_id, course_id, date, status (present/absent)
)

fees (
  id, student_id, semester, fee_type, amount, 
  due_date, paid_date, status (pending/paid)
)

announcements (
  id, title, content, created_by (admin_id), 
  created_at, expires_at
)
```

---

## **API Endpoints (Phase 1)**

```
POST   /api/auth/login              → Login, return JWT
POST   /api/auth/logout             → Clear session
GET    /api/auth/me                 → Get logged-in user info

GET    /api/student/dashboard       → Grades + attendance summary
GET    /api/student/grades          → Full grade list
GET    /api/student/attendance      → Attendance records
GET    /api/student/fees            → Fee status
GET    /api/student/profile         → Student profile
PUT    /api/student/profile         → Update profile

GET    /api/announcements           → Get announcements
```

---

## **Frontend Pages (Phase 1)**

```
/login                  → Login form
/dashboard              → Main student home (grades, attendance, fees at a glance)
/grades                 → Full grades view
/attendance             → Attendance records + %age
/fees                   → Fee status + payment history
/profile                → Edit student profile
/announcements          → View institute announcements
```

---

## **Security Built-in (Phase 1)**

✅ Password hashing (bcrypt)
✅ JWT authentication (stateless, scalable)
✅ Rate-limiting on login (prevent brute-force)
✅ CSRF tokens on forms
✅ SQL injection prevention (parameterized queries)
✅ Input validation + sanitization
✅ httpOnly cookies (secure JWT storage)
✅ HTTPS-ready architecture

---

## **Development Roadmap**

| Phase | Focus | Weeks | Modules |
|-------|-------|-------|---------|
| **1** | MVP | 2-3 | Auth, Student Dashboard |
| **2** | Backend Ready | 2 | Grades, Attendance, Fees tracking |
| 3 | Expand Portal | 2 | Announcements, Profile, Downloads |
| 4 | Admin Panel | 2-3 | User mgmt, Data import/export |
| 5 | Payments | 2 | Razorpay/Stripe integration |
| 6 | Optimization | 1-2 | Performance, Security audit |

---

## **Your Solo Dev Advantage**

Since it's a **learning project with no deadline**:
- Build features in order of understanding (auth → grades → attendance → fees)
- Test as you go
- Refactor without pressure
- Deploy to free tier (Render, Railway) when ready
- No rush = better code quality

---

## **Final Questions Before We Code**

1. **Student Login identifier:** Email or Roll Number?
2. **Database:** PostgreSQL local on your laptop, or managed cloud (Supabase)?
3. **Deployment initially:** Your laptop (localhost), or free cloud?
4. **Data:** Will you seed fake student data, or import from CSV later?

Ready to **initialize the project structure** once confirmed?