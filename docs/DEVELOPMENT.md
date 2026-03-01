**Acad Institute ERP — Development Plan**

---

## **1. Core Modules Needed**

### **A. Authentication & User Management**
- Admin login, staff login, student login, parent login
- Role-based access control (RBAC)
- Profile management, password reset

### **B. Academic Management**
- **Programs & Courses:** Degree programs, semesters, courses, course offerings
- **Enrollment:** Student enrollment in courses, prerequisites checking
- **Attendance:** Track class attendance, generate reports
- **Grades:** Grade entry, grade calculation, transcript generation
- **Timetable:** Class scheduling, exam scheduling, conflict detection

### **C. Student Management**
- Student registration, personal info, contact details
- Admission process, application tracking
- Student dashboard (courses, grades, attendance, fees)
- Document uploads (certificates, ID proofs)

### **D. Staff Management**
- Teacher registration, department assignment, qualifications
- Workload management (courses assigned, class hours)
- Leave management, payroll integration
- Performance tracking

### **E. Financial Management**
- Fee structure definition (per program, per semester)
- Fee collection, payment tracking, receipt generation
- Expense management, budget allocation
- Financial reports (income/expense, collections)

### **F. Parent Portal**
- View child's attendance, grades, fees due
- Communication with teachers/admin
- Fee payment tracking

### **G. Communication**
- Internal messaging (admin ↔ staff ↔ student)
- Email notifications (exam schedules, fee reminders)
- Announcements & circulars

### **H. Reports & Analytics**
- Student performance analytics
- Attendance reports
- Fee collection reports
- Department-wise statistics

### **I. Admin Panel**
- User management, backup/restore
- System settings, audit logs
- Data imports/exports

---

## **2. User Roles & Permissions**

```
┌─────────────────┐
├─ Admin          │ (Full access, system config)
├─ Principal      │ (Approve admissions, view all reports)
├─ Dean           │ (Department oversight)
├─ Teacher        │ (Enter grades, mark attendance)
├─ Registrar      │ (Enrollment, transcripts)
├─ Accountant     │ (Fee collection, payroll)
├─ Student        │ (View grades, attendance, fees)
├─ Parent         │ (View child's info only)
└─ Guest/Visitor  │ (View-only portal info)
```

---

## **3. Database Entities (Simplified Schema)**

```
Core Tables:
├── users (id, email, password, role, status)
├── students (id, user_id, roll_no, program_id, admission_date, ...)
├── staff (id, user_id, department_id, designation, ...)
├── programs (id, name, duration, credits)
├── courses (id, name, code, credits, program_id)
├── enrollments (id, student_id, course_id, semester_id)
├── attendance (id, student_id, course_id, date, status)
├── grades (id, student_id, course_id, marks, grade, semester_id)
├── fees (id, student_id, fee_type, amount, due_date, status)
├── timetable (id, course_id, teacher_id, room, day, time)
└── announcements (id, title, content, created_by, created_at)
```

---

## **4. Technology Architecture**

```
┌─────────────────────────────────────┐
│  Frontend: Next.js + @knadh/oat     │
│  (Student/ Parent / Staff portals)  │
└────────────────────┬────────────────┘
                     │ API Calls (REST)
┌────────────────────▼────────────────┐
│  Backend: Express.js + Node.js      │
│  (Authentication, Business Logic)   │
└────────────────────┬────────────────┘
                     │ Queries
┌────────────────────▼────────────────┐
│  Database: PostgreSQL (local)       │
│  (Data storage & relationships)     │
└─────────────────────────────────────┘
```

---

## **5. Development Phases**

**Phase 1 (MVP):** Authentication + Student Portal
- Login system (secure)
- Student dashboard (view grades, attendance, fees)
- Basic student management (admin view)

**Phase 2:** Academic Features
- Course enrollment
- Attendance tracking
- Grade entry & viewing

**Phase 3:** Financial & Communication
- Fee management & collection
- Email notifications
- Announcements

**Phase 4:** Advanced Features
- Timetable generation
- Analytics & reports
- Parent portal
- Staff management

**Phase 5:** Polish & Deployment
- Security audit
- Performance optimization
- Deployment (free tier first, paid later)

---

## **6. Before We Code: Questions**

1. **Scope:** Start with Phase 1 only, then expand? Or build all modules at once?
2. **Authentication:** Should students/parents use admission ID or email?
3. **Fee Payment:** Online payment gateway or manual entry only?
4. **Reporting:** PDF exports needed?
5. **Mobile:** Mobile-responsive only, or native app later?
6. **Integration:** Any external systems (email provider, payment API)?

**Ready to deep-dive into Phase 1, or discuss scope/architecture first?**