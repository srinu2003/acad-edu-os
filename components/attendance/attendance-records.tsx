"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { attendanceRecords, courses } from "@/lib/mock-data"
import { formatDate, cn } from "@/lib/utils"

const statusStyles: Record<string, string> = {
  present: "bg-chart-2/15 text-chart-2",
  absent: "bg-destructive/15 text-destructive",
  late: "bg-chart-3/15 text-chart-3",
  excused: "bg-chart-1/15 text-chart-1",
}

export function AttendanceRecords() {
  const [courseFilter, setCourseFilter] = useState<string>("all")

  const filtered = courseFilter === "all"
    ? attendanceRecords
    : attendanceRecords.filter((r) => r.courseId === courseFilter)

  const sorted = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const displayed = sorted.slice(0, 40)

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-base font-semibold">Attendance Records</CardTitle>
        <Select value={courseFilter} onValueChange={setCourseFilter}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Filter by course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            {courses.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.code} - {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Course</TableHead>
              <TableHead className="hidden sm:table-cell">Period</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayed.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="text-sm">{formatDate(record.date)}</TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm font-medium">{record.courseCode}</p>
                    <p className="text-xs text-muted-foreground hidden sm:block">{record.courseName}</p>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground">{record.period}</TableCell>
                <TableCell>
                  <Badge className={cn("text-[10px] capitalize", statusStyles[record.status])} variant="secondary">
                    {record.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {displayed.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">No attendance records found.</p>
        )}
      </CardContent>
    </Card>
  )
}
