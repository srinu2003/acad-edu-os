-- ================================================================
-- Acad Institute ERP - PostgreSQL Database Schema
-- Phase 1 (MVP): Authentication + Student Portal
-- ================================================================

-- Enable UUID extension for better primary keys (optional but recommended)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================================
-- CORE TABLES (Phase 1 MVP)
-- ================================================================

-- Users table: Central authentication and user management
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'teacher', 'admin', 'parent', 'registrar', 'accountant')),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'graduated')),
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster email lookups (login queries)
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);

-- ================================================================

-- Departments table: Academic departments
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    description TEXT,
    head_user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================================================

-- Programs table: Degree programs (BTech CSE, BTech ECE, etc.)
CREATE TABLE programs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    department_id INTEGER REFERENCES departments(id) ON DELETE CASCADE,
    duration_years INTEGER NOT NULL DEFAULT 4,
    total_credits INTEGER NOT NULL DEFAULT 160,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_programs_department ON programs(department_id);
CREATE INDEX idx_programs_active ON programs(is_active);

-- ================================================================

-- Students table: Student-specific information
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    roll_no VARCHAR(50) UNIQUE NOT NULL,
    enrollment_date DATE NOT NULL,
    program_id INTEGER NOT NULL REFERENCES programs(id) ON DELETE RESTRICT,
    current_semester INTEGER DEFAULT 1 CHECK (current_semester BETWEEN 1 AND 8),
    gpa DECIMAL(3, 2) DEFAULT 0.00 CHECK (gpa BETWEEN 0 AND 4.00),
    photo_url VARCHAR(500),
    address TEXT,
    date_of_birth DATE,
    blood_group VARCHAR(5),
    emergency_contact VARCHAR(20),
    parent_user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_students_user ON students(user_id);
CREATE INDEX idx_students_roll ON students(roll_no);
CREATE INDEX idx_students_program ON students(program_id);

-- ================================================================

-- Staff table: Staff/teacher-specific information
CREATE TABLE staff (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    employee_id VARCHAR(50) UNIQUE NOT NULL,
    department_id INTEGER REFERENCES departments(id) ON DELETE SET NULL,
    designation VARCHAR(100),
    qualification VARCHAR(200),
    specialization TEXT,
    joining_date DATE NOT NULL,
    salary DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_staff_user ON staff(user_id);
CREATE INDEX idx_staff_department ON staff(department_id);

-- ================================================================

-- Courses table: All courses offered
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    credits INTEGER NOT NULL DEFAULT 3 CHECK (credits BETWEEN 1 AND 6),
    program_id INTEGER NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
    semester INTEGER NOT NULL CHECK (semester BETWEEN 1 AND 8),
    course_type VARCHAR(20) CHECK (course_type IN ('core', 'elective', 'lab', 'project')),
    description TEXT,
    prerequisites TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_courses_program ON courses(program_id);
CREATE INDEX idx_courses_semester ON courses(semester);
CREATE INDEX idx_courses_code ON courses(code);

-- ================================================================

-- Course Offerings table: Track when courses are offered (semester-year specific)
CREATE TABLE course_offerings (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    teacher_id INTEGER REFERENCES staff(id) ON DELETE SET NULL,
    academic_year VARCHAR(9) NOT NULL, -- e.g., '2025-2026'
    semester VARCHAR(10) NOT NULL CHECK (semester IN ('Fall', 'Spring', 'Summer')),
    max_students INTEGER DEFAULT 60,
    room_no VARCHAR(20),
    schedule TEXT, -- JSON or simple text like 'Mon/Wed 10:00-11:30'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_offerings_course ON course_offerings(course_id);
CREATE INDEX idx_offerings_teacher ON course_offerings(teacher_id);
CREATE INDEX idx_offerings_year_semester ON course_offerings(academic_year, semester);

-- ================================================================

-- Enrollments table: Student course enrollments
CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    course_offering_id INTEGER NOT NULL REFERENCES course_offerings(id) ON DELETE CASCADE,
    enrollment_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'dropped', 'completed', 'failed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, course_offering_id)
);

CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_offering ON enrollments(course_offering_id);
CREATE INDEX idx_enrollments_status ON enrollments(status);

-- ================================================================

-- Grades table: Student grades for courses
CREATE TABLE grades (
    id SERIAL PRIMARY KEY,
    enrollment_id INTEGER UNIQUE NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
    marks DECIMAL(5, 2) CHECK (marks BETWEEN 0 AND 100),
    grade_letter VARCHAR(3) CHECK (grade_letter IN ('A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F', 'I', 'W')),
    grade_points DECIMAL(3, 2) CHECK (grade_points BETWEEN 0 AND 4.00),
    remarks TEXT,
    graded_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    graded_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_grades_enrollment ON grades(enrollment_id);
CREATE INDEX idx_grades_letter ON grades(grade_letter);

-- ================================================================

-- Attendance table: Daily attendance records
CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    enrollment_id INTEGER NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('present', 'absent', 'late', 'excused', 'on_leave')),
    marked_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(enrollment_id, date)
);

CREATE INDEX idx_attendance_enrollment ON attendance(enrollment_id);
CREATE INDEX idx_attendance_date ON attendance(date);
CREATE INDEX idx_attendance_status ON attendance(status);

-- ================================================================

-- Fee Types table: Define different fee categories
CREATE TABLE fee_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_recurring BOOLEAN DEFAULT true,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================================================

-- Fee Structure table: Define fees per program/semester
CREATE TABLE fee_structure (
    id SERIAL PRIMARY KEY,
    program_id INTEGER NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
    fee_type_id INTEGER NOT NULL REFERENCES fee_types(id) ON DELETE CASCADE,
    semester INTEGER CHECK (semester BETWEEN 1 AND 8),
    amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 0),
    academic_year VARCHAR(9) NOT NULL,
    due_date_offset INTEGER DEFAULT 30, -- days from semester start
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(program_id, fee_type_id, semester, academic_year)
);

CREATE INDEX idx_fee_structure_program ON fee_structure(program_id);

-- ================================================================

-- Fees table: Individual student fee records
CREATE TABLE fees (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    fee_type_id INTEGER NOT NULL REFERENCES fee_types(id) ON DELETE RESTRICT,
    academic_year VARCHAR(9) NOT NULL,
    semester INTEGER CHECK (semester BETWEEN 1 AND 8),
    amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 0),
    due_date DATE NOT NULL,
    paid_amount DECIMAL(10, 2) DEFAULT 0.00 CHECK (paid_amount >= 0),
    paid_date DATE,
    payment_method VARCHAR(50), -- 'cash', 'card', 'online', 'cheque', etc.
    transaction_id VARCHAR(100),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'partial', 'overdue', 'waived')),
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_fees_student ON fees(student_id);
CREATE INDEX idx_fees_status ON fees(status);
CREATE INDEX idx_fees_due_date ON fees(due_date);
CREATE INDEX idx_fees_academic_year ON fees(academic_year);

-- ================================================================

-- Announcements table: Institute-wide announcements
CREATE TABLE announcements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    audience VARCHAR(50) DEFAULT 'all' CHECK (audience IN ('all', 'students', 'teachers', 'staff', 'parents', 'specific_program', 'specific_semester')),
    audience_filter INTEGER, -- program_id or semester number if audience is specific
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    attachment_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_announcements_audience ON announcements(audience);
CREATE INDEX idx_announcements_active ON announcements(is_active);
CREATE INDEX idx_announcements_published ON announcements(published_at);

-- ================================================================

-- Password Reset Tokens table: For forgot password functionality
CREATE TABLE password_reset_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reset_tokens_user ON password_reset_tokens(user_id);
CREATE INDEX idx_reset_tokens_token ON password_reset_tokens(token);
CREATE INDEX idx_reset_tokens_expires ON password_reset_tokens(expires_at);

-- ================================================================

-- Audit Log table: Track important system actions
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50), -- 'user', 'grade', 'fee', etc.
    entity_id INTEGER,
    old_value TEXT,
    new_value TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_action ON audit_logs(action);
CREATE INDEX idx_audit_created ON audit_logs(created_at);

-- ================================================================
-- FUNCTIONS & TRIGGERS
-- ================================================================

-- Function to update 'updated_at' timestamp automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables with updated_at column
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_grades_updated_at BEFORE UPDATE ON grades
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fees_updated_at BEFORE UPDATE ON fees
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ================================================================
-- VIEWS (For easier queries)
-- ================================================================

-- View: Student Dashboard Summary
CREATE VIEW student_dashboard AS
SELECT 
    s.id AS student_id,
    s.roll_no,
    u.first_name,
    u.last_name,
    u.email,
    p.name AS program_name,
    s.current_semester,
    s.gpa,
    COUNT(DISTINCT e.id) AS enrolled_courses,
    SUM(CASE WHEN f.status = 'pending' THEN f.amount - f.paid_amount ELSE 0 END) AS pending_fees
FROM students s
JOIN users u ON s.user_id = u.id
JOIN programs p ON s.program_id = p.id
LEFT JOIN enrollments e ON s.id = e.student_id AND e.status = 'active'
LEFT JOIN fees f ON s.id = f.student_id
WHERE u.status = 'active'
GROUP BY s.id, s.roll_no, u.first_name, u.last_name, u.email, p.name, s.current_semester, s.gpa;

-- ================================================================

-- View: Student Attendance Summary
CREATE VIEW student_attendance_summary AS
SELECT 
    e.student_id,
    co.course_id,
    c.name AS course_name,
    c.code AS course_code,
    COUNT(a.id) AS total_classes,
    SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) AS classes_attended,
    ROUND(
        (SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END)::DECIMAL / 
        NULLIF(COUNT(a.id), 0)) * 100, 
        2
    ) AS attendance_percentage
FROM enrollments e
JOIN course_offerings co ON e.course_offering_id = co.id
JOIN courses c ON co.course_id = c.id
LEFT JOIN attendance a ON e.id = a.enrollment_id
WHERE e.status = 'active'
GROUP BY e.student_id, co.course_id, c.name, c.code;

-- ================================================================
-- SEED DATA (Sample data for testing - Phase 1)
-- ================================================================

-- Insert sample departments
INSERT INTO departments (name, code, description) VALUES
('Computer Science & Engineering', 'CSE', 'Department of Computer Science and Engineering'),
('Electronics & Communication', 'ECE', 'Department of Electronics and Communication Engineering'),
('Mechanical Engineering', 'MECH', 'Department of Mechanical Engineering'),
('Civil Engineering', 'CIVIL', 'Department of Civil Engineering');

-- Insert sample programs
INSERT INTO programs (name, code, department_id, duration_years, total_credits) VALUES
('Bachelor of Technology in Computer Science', 'BTECHCSE', 1, 4, 160),
('Bachelor of Technology in Electronics', 'BTECHECE', 2, 4, 160),
('Bachelor of Technology in Mechanical', 'BTECHMECH', 3, 4, 160);

-- Insert sample fee types
INSERT INTO fee_types (name, description, is_recurring) VALUES
('Tuition Fee', 'Semester tuition fee', true),
('Hostel Fee', 'Hostel accommodation fee', true),
('Laboratory Fee', 'Laboratory and equipment usage fee', true),
('Library Fee', 'Library access and book fee', true),
('Examination Fee', 'Semester examination fee', true),
('Transport Fee', 'Bus transportation fee', true),
('Miscellaneous Fee', 'Other administrative fees', true);

-- ================================================================
-- COMMENTS (Database documentation)
-- ================================================================

COMMENT ON TABLE users IS 'Central user table for authentication and authorization';
COMMENT ON TABLE students IS 'Student-specific information linked to users';
COMMENT ON TABLE staff IS 'Staff and teacher information linked to users';
COMMENT ON TABLE courses IS 'Master course catalog';
COMMENT ON TABLE course_offerings IS 'Specific course instances offered in a semester';
COMMENT ON TABLE enrollments IS 'Student enrollment in specific course offerings';
COMMENT ON TABLE grades IS 'Final grades for enrolled courses';
COMMENT ON TABLE attendance IS 'Daily attendance records for enrolled courses';
COMMENT ON TABLE fees IS 'Individual student fee records and payment tracking';
COMMENT ON TABLE announcements IS 'Institute-wide announcements and notices';

-- ================================================================
-- END OF SCHEMA
-- ================================================================
