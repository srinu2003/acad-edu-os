export interface User {
  id: string
  email: string
  role: "student" | "faculty" | "admin"
  token: string
}

export interface StudentProfile {
  id: string
  rollNo: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  bloodGroup: string
  address: string
  emergencyContact: string
  emergencyPhone: string
  program: string
  department: string
  semester: number
  section: string
  academicYear: string
  admissionDate: string
  cgpa: number
  totalCredits: number
  avatarUrl: string | null
}

export interface Course {
  id: string
  code: string
  name: string
  credits: number
  semester: number
  faculty: string
  type: "theory" | "lab" | "elective"
}

export interface GradeRecord {
  id: string
  courseId: string
  courseCode: string
  courseName: string
  credits: number
  semester: number
  internalMarks: number
  externalMarks: number
  totalMarks: number
  grade: string
  gradePoints: number
  faculty: string
  examDate: string
}

export interface SemesterGPA {
  semester: number
  sgpa: number
  credits: number
  totalCourses: number
}

export interface AttendanceRecord {
  id: string
  courseId: string
  courseCode: string
  courseName: string
  date: string
  status: "present" | "absent" | "late" | "excused"
  period: number
}

export interface CourseAttendance {
  courseId: string
  courseCode: string
  courseName: string
  totalClasses: number
  attended: number
  percentage: number
  faculty: string
}

export interface FeeRecord {
  id: string
  feeType: string
  semester: number
  amount: number
  paid: number
  balance: number
  dueDate: string
  paidDate: string | null
  status: "paid" | "pending" | "partial" | "overdue" | "waived"
  transactionId: string | null
  paymentMode: string | null
}

export interface FeeSummary {
  totalDue: number
  totalPaid: number
  totalBalance: number
  overdueAmount: number
}

export interface Announcement {
  id: string
  title: string
  content: string
  priority: "low" | "normal" | "high" | "urgent"
  category: string
  author: string
  authorRole: string
  publishedAt: string
  expiresAt: string | null
  attachments: string[]
}

export interface DashboardStats {
  currentGPA: number
  cgpa: number
  attendancePercentage: number
  pendingFees: number
  enrolledCourses: number
  totalCredits: number
}
