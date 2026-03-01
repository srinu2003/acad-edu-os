import type {
  StudentProfile,
  Course,
  GradeRecord,
  SemesterGPA,
  CourseAttendance,
  AttendanceRecord,
  FeeRecord,
  FeeSummary,
  Announcement,
  DashboardStats,
} from "./types"

export const studentProfile: StudentProfile = {
  id: "stu-001",
  rollNo: "257Y1D5805",
  firstName: "John",
  lastName: "Doe",
  email: "student@example.com",
  phone: "+91 98765 43210",
  dateOfBirth: "2003-06-15",
  bloodGroup: "O+",
  address: "42 MG Road, Hyderabad, Telangana 500001",
  emergencyContact: "Jane Doe",
  emergencyPhone: "+91 98765 43211",
  program: "B.Tech Computer Science & Engineering",
  department: "Computer Science",
  semester: 4,
  section: "A",
  academicYear: "2023-2027",
  admissionDate: "2023-08-01",
  cgpa: 3.45,
  totalCredits: 72,
  avatarUrl: null,
}

export const courses: Course[] = [
  { id: "crs-001", code: "CS201", name: "Data Structures & Algorithms", credits: 4, semester: 4, faculty: "Dr. Rajesh Kumar", type: "theory" },
  { id: "crs-002", code: "CS202", name: "Database Management Systems", credits: 4, semester: 4, faculty: "Prof. Anjali Sharma", type: "theory" },
  { id: "crs-003", code: "CS203", name: "Operating Systems", credits: 3, semester: 4, faculty: "Dr. Suresh Babu", type: "theory" },
  { id: "crs-004", code: "CS204", name: "Computer Networks", credits: 3, semester: 4, faculty: "Prof. Meena Iyer", type: "theory" },
  { id: "crs-005", code: "CS205", name: "Discrete Mathematics", credits: 3, semester: 4, faculty: "Dr. Priya Nair", type: "theory" },
  { id: "crs-006", code: "CS206", name: "DBMS Laboratory", credits: 2, semester: 4, faculty: "Prof. Anjali Sharma", type: "lab" },
]

export const gradeRecords: GradeRecord[] = [
  // Semester 1
  { id: "grd-001", courseId: "c101", courseCode: "CS101", courseName: "Programming in C", credits: 4, semester: 1, internalMarks: 38, externalMarks: 52, totalMarks: 90, grade: "A+", gradePoints: 10, faculty: "Dr. Ramesh Gupta", examDate: "2023-12-15" },
  { id: "grd-002", courseId: "c102", courseCode: "MA101", courseName: "Engineering Mathematics I", credits: 4, semester: 1, internalMarks: 32, externalMarks: 45, totalMarks: 77, grade: "B+", gradePoints: 8, faculty: "Prof. Kavitha Rao", examDate: "2023-12-18" },
  { id: "grd-003", courseId: "c103", courseCode: "PH101", courseName: "Engineering Physics", credits: 3, semester: 1, internalMarks: 35, externalMarks: 48, totalMarks: 83, grade: "A", gradePoints: 9, faculty: "Dr. Srinivas Reddy", examDate: "2023-12-20" },
  // Semester 2
  { id: "grd-004", courseId: "c201", courseCode: "CS102", courseName: "Object Oriented Programming", credits: 4, semester: 2, internalMarks: 36, externalMarks: 50, totalMarks: 86, grade: "A", gradePoints: 9, faculty: "Dr. Ramesh Gupta", examDate: "2024-05-10" },
  { id: "grd-005", courseId: "c202", courseCode: "MA102", courseName: "Engineering Mathematics II", credits: 4, semester: 2, internalMarks: 28, externalMarks: 40, totalMarks: 68, grade: "B", gradePoints: 7, faculty: "Prof. Kavitha Rao", examDate: "2024-05-13" },
  { id: "grd-006", courseId: "c203", courseCode: "EC101", courseName: "Basic Electronics", credits: 3, semester: 2, internalMarks: 30, externalMarks: 42, totalMarks: 72, grade: "B+", gradePoints: 8, faculty: "Dr. Anil Verma", examDate: "2024-05-15" },
  // Semester 3
  { id: "grd-007", courseId: "c301", courseCode: "CS103", courseName: "Digital Logic Design", credits: 4, semester: 3, internalMarks: 34, externalMarks: 46, totalMarks: 80, grade: "A", gradePoints: 9, faculty: "Prof. Meena Iyer", examDate: "2024-12-12" },
  { id: "grd-008", courseId: "c302", courseCode: "CS104", courseName: "Automata Theory", credits: 3, semester: 3, internalMarks: 25, externalMarks: 38, totalMarks: 63, grade: "B", gradePoints: 7, faculty: "Dr. Priya Nair", examDate: "2024-12-14" },
  { id: "grd-009", courseId: "c303", courseCode: "MA201", courseName: "Probability & Statistics", credits: 3, semester: 3, internalMarks: 37, externalMarks: 50, totalMarks: 87, grade: "A", gradePoints: 9, faculty: "Prof. Sunita Das", examDate: "2024-12-16" },
  // Semester 4 (current - partial results)
  { id: "grd-010", courseId: "crs-001", courseCode: "CS201", courseName: "Data Structures & Algorithms", credits: 4, semester: 4, internalMarks: 36, externalMarks: 49, totalMarks: 85, grade: "A", gradePoints: 9, faculty: "Dr. Rajesh Kumar", examDate: "2025-05-10" },
  { id: "grd-011", courseId: "crs-005", courseCode: "CS205", courseName: "Discrete Mathematics", credits: 3, semester: 4, internalMarks: 30, externalMarks: 40, totalMarks: 70, grade: "B+", gradePoints: 8, faculty: "Dr. Priya Nair", examDate: "2025-05-12" },
  { id: "grd-012", courseId: "crs-003", courseCode: "CS203", courseName: "Operating Systems", credits: 3, semester: 4, internalMarks: 26, externalMarks: 35, totalMarks: 61, grade: "C+", gradePoints: 6, faculty: "Dr. Suresh Babu", examDate: "2025-05-14" },
]

export const semesterGPAs: SemesterGPA[] = [
  { semester: 1, sgpa: 9.09, credits: 11, totalCourses: 3 },
  { semester: 2, sgpa: 8.09, credits: 11, totalCourses: 3 },
  { semester: 3, sgpa: 8.40, credits: 10, totalCourses: 3 },
  { semester: 4, sgpa: 7.80, credits: 10, totalCourses: 3 },
]

export const courseAttendance: CourseAttendance[] = [
  { courseId: "crs-001", courseCode: "CS201", courseName: "Data Structures & Algorithms", totalClasses: 42, attended: 38, percentage: 90.5, faculty: "Dr. Rajesh Kumar" },
  { courseId: "crs-002", courseCode: "CS202", courseName: "Database Management Systems", totalClasses: 40, attended: 36, percentage: 90.0, faculty: "Prof. Anjali Sharma" },
  { courseId: "crs-003", courseCode: "CS203", courseName: "Operating Systems", totalClasses: 38, attended: 30, percentage: 78.9, faculty: "Dr. Suresh Babu" },
  { courseId: "crs-004", courseCode: "CS204", courseName: "Computer Networks", totalClasses: 36, attended: 26, percentage: 72.2, faculty: "Prof. Meena Iyer" },
  { courseId: "crs-005", courseCode: "CS205", courseName: "Discrete Mathematics", totalClasses: 40, attended: 37, percentage: 92.5, faculty: "Dr. Priya Nair" },
  { courseId: "crs-006", courseCode: "CS206", courseName: "DBMS Laboratory", totalClasses: 20, attended: 19, percentage: 95.0, faculty: "Prof. Anjali Sharma" },
]

export const attendanceRecords: AttendanceRecord[] = (() => {
  const records: AttendanceRecord[] = []
  const statuses: ("present" | "absent" | "late" | "excused")[] = ["present", "present", "present", "present", "present", "present", "absent", "present", "late", "present"]
  let id = 1
  const courseList = [
    { id: "crs-001", code: "CS201", name: "Data Structures & Algorithms" },
    { id: "crs-002", code: "CS202", name: "Database Management Systems" },
    { id: "crs-003", code: "CS203", name: "Operating Systems" },
    { id: "crs-004", code: "CS204", name: "Computer Networks" },
  ]

  for (let day = 1; day <= 20; day++) {
    const date = `2025-04-${String(day).padStart(2, "0")}`
    const dayOfWeek = new Date(date).getDay()
    if (dayOfWeek === 0 || dayOfWeek === 6) continue

    for (const course of courseList) {
      records.push({
        id: `att-${String(id++).padStart(3, "0")}`,
        courseId: course.id,
        courseCode: course.code,
        courseName: course.name,
        date,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        period: Math.floor(Math.random() * 6) + 1,
      })
    }
  }
  return records
})()

export const feeRecords: FeeRecord[] = [
  { id: "fee-001", feeType: "Tuition Fee", semester: 4, amount: 75000, paid: 75000, balance: 0, dueDate: "2025-01-15", paidDate: "2025-01-10", status: "paid", transactionId: "TXN2025010001", paymentMode: "Online" },
  { id: "fee-002", feeType: "Hostel Fee", semester: 4, amount: 40000, paid: 20000, balance: 20000, dueDate: "2025-01-15", paidDate: "2025-01-10", status: "partial", transactionId: "TXN2025010002", paymentMode: "Online" },
  { id: "fee-003", feeType: "Laboratory Fee", semester: 4, amount: 8000, paid: 8000, balance: 0, dueDate: "2025-01-20", paidDate: "2025-01-18", status: "paid", transactionId: "TXN2025010003", paymentMode: "UPI" },
  { id: "fee-004", feeType: "Library Fee", semester: 4, amount: 3000, paid: 0, balance: 3000, dueDate: "2025-02-01", paidDate: null, status: "overdue", transactionId: null, paymentMode: null },
  { id: "fee-005", feeType: "Examination Fee", semester: 4, amount: 5000, paid: 0, balance: 5000, dueDate: "2025-04-01", paidDate: null, status: "pending", transactionId: null, paymentMode: null },
  { id: "fee-006", feeType: "Transport Fee", semester: 4, amount: 15000, paid: 15000, balance: 0, dueDate: "2025-01-15", paidDate: "2025-01-12", status: "paid", transactionId: "TXN2025010004", paymentMode: "NEFT" },
  { id: "fee-007", feeType: "Sports Fee", semester: 4, amount: 2000, paid: 0, balance: 0, dueDate: "2025-01-15", paidDate: null, status: "waived", transactionId: null, paymentMode: null },
  { id: "fee-008", feeType: "Tuition Fee", semester: 3, amount: 75000, paid: 75000, balance: 0, dueDate: "2024-07-15", paidDate: "2024-07-12", status: "paid", transactionId: "TXN2024070001", paymentMode: "Online" },
]

export const feeSummary: FeeSummary = {
  totalDue: 148000,
  totalPaid: 118000,
  totalBalance: 28000,
  overdueAmount: 3000,
}

export const announcements: Announcement[] = [
  {
    id: "ann-001",
    title: "End Semester Examination Schedule Released",
    content: "The end semester examination schedule for the academic year 2024-25 (Even Semester) has been released. Students are advised to check the examination portal for their individual time tables. The exams will commence from May 10, 2025. Ensure all library dues are cleared and hall tickets are collected from the examination cell before the exam dates.",
    priority: "urgent",
    category: "Examinations",
    author: "Controller of Examinations",
    authorRole: "admin",
    publishedAt: "2025-04-01T09:00:00Z",
    expiresAt: "2025-05-20T23:59:59Z",
    attachments: ["exam_schedule_sem4.pdf"],
  },
  {
    id: "ann-002",
    title: "Fee Payment Deadline Extended",
    content: "The deadline for payment of pending semester fees has been extended to April 15, 2025. Students with outstanding dues are requested to clear their payments at the earliest to avoid any inconvenience during examinations. Late fee of Rs. 500 per week will be applicable after the extended deadline.",
    priority: "high",
    category: "Finance",
    author: "Finance Department",
    authorRole: "admin",
    publishedAt: "2025-03-28T10:30:00Z",
    expiresAt: "2025-04-15T23:59:59Z",
    attachments: [],
  },
  {
    id: "ann-003",
    title: "Technical Symposium 2025 - Registrations Open",
    content: "The annual Technical Symposium 'TechNova 2025' registrations are now open. The event will be held on April 20-21, 2025 at the main auditorium. Events include paper presentations, hackathons, coding challenges, and robotics competitions. Register through the student portal. Early bird registration ends April 10.",
    priority: "normal",
    category: "Events",
    author: "Department of CSE",
    authorRole: "faculty",
    publishedAt: "2025-03-25T14:00:00Z",
    expiresAt: "2025-04-21T23:59:59Z",
    attachments: ["technova_brochure.pdf"],
  },
  {
    id: "ann-004",
    title: "Campus Placement Drive - Infosys",
    content: "Infosys will be conducting a campus placement drive on April 18, 2025. Eligible students (CGPA >= 6.5, no active backlogs) are requested to register through the placement portal by April 12. The drive includes an aptitude test, technical interview, and HR interview. Dress code: Formal.",
    priority: "high",
    category: "Placements",
    author: "Training & Placement Cell",
    authorRole: "admin",
    publishedAt: "2025-03-20T11:00:00Z",
    expiresAt: "2025-04-18T23:59:59Z",
    attachments: ["infosys_jd.pdf"],
  },
  {
    id: "ann-005",
    title: "Library Timings Updated",
    content: "Effective from April 1, 2025, the library timings have been updated. New timings: Weekdays 8:00 AM - 10:00 PM, Saturdays 9:00 AM - 6:00 PM, Sundays Closed. During examination period (May 1-20), the library will remain open till 11:00 PM on weekdays.",
    priority: "low",
    category: "General",
    author: "Central Library",
    authorRole: "admin",
    publishedAt: "2025-03-18T08:00:00Z",
    expiresAt: null,
    attachments: [],
  },
  {
    id: "ann-006",
    title: "Attendance Shortage Warning",
    content: "Students with attendance below 75% in any subject are hereby warned that they may not be eligible to appear for the end semester examinations as per university regulations. Please check your attendance records and attend classes regularly. Students can apply for condonation with valid medical certificates.",
    priority: "urgent",
    category: "Academic",
    author: "Dean of Academics",
    authorRole: "admin",
    publishedAt: "2025-03-15T09:30:00Z",
    expiresAt: "2025-05-10T23:59:59Z",
    attachments: [],
  },
  {
    id: "ann-007",
    title: "Workshop on Machine Learning with Python",
    content: "A 3-day hands-on workshop on 'Machine Learning with Python' will be conducted from April 7-9, 2025. The workshop is open to all CSE and IT students. Topics include supervised learning, neural networks, and model deployment. Limited seats available - first come first served basis.",
    priority: "normal",
    category: "Workshop",
    author: "Dr. Rajesh Kumar",
    authorRole: "faculty",
    publishedAt: "2025-03-12T13:00:00Z",
    expiresAt: "2025-04-09T23:59:59Z",
    attachments: ["ml_workshop_agenda.pdf"],
  },
  {
    id: "ann-008",
    title: "Holiday Notice - Ugadi Festival",
    content: "The institute will remain closed on March 30, 2025 (Sunday) and March 31, 2025 (Monday) on account of Ugadi festival. Classes will resume on April 1, 2025. Hostel students: The mess will operate as usual during the holidays.",
    priority: "normal",
    category: "General",
    author: "Administrative Office",
    authorRole: "admin",
    publishedAt: "2025-03-10T10:00:00Z",
    expiresAt: "2025-04-01T00:00:00Z",
    attachments: [],
  },
]

export const dashboardStats: DashboardStats = {
  currentGPA: 7.80,
  cgpa: 3.45,
  attendancePercentage: 87.5,
  pendingFees: 28000,
  enrolledCourses: 6,
  totalCredits: 19,
}
