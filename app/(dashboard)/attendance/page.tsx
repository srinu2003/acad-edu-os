"use client"

import { AttendanceOverview } from "@/components/attendance/attendance-overview"
import { CourseAttendance } from "@/components/attendance/course-attendance"
import { AttendanceRecords } from "@/components/attendance/attendance-records"

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <AttendanceOverview />
      <CourseAttendance />
      <AttendanceRecords />
    </div>
  )
}
