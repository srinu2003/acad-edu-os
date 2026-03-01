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
import { gradeRecords } from "@/lib/mock-data"
import { formatDate, getGradeColor } from "@/lib/utils"

export function GradesTable() {
  const [semester, setSemester] = useState<string>("all")

  const filtered =
    semester === "all"
      ? gradeRecords
      : gradeRecords.filter((g) => g.semester === parseInt(semester))

  const sortedGrades = [...filtered].sort((a, b) => b.semester - a.semester || a.courseCode.localeCompare(b.courseCode))

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-base font-semibold">Grade Records</CardTitle>
        <Select value={semester} onValueChange={setSemester}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Semesters</SelectItem>
            <SelectItem value="1">Semester 1</SelectItem>
            <SelectItem value="2">Semester 2</SelectItem>
            <SelectItem value="3">Semester 3</SelectItem>
            <SelectItem value="4">Semester 4</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead className="hidden sm:table-cell">Credits</TableHead>
              <TableHead className="hidden md:table-cell">Internal</TableHead>
              <TableHead className="hidden md:table-cell">External</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead className="hidden lg:table-cell">Faculty</TableHead>
              <TableHead className="hidden lg:table-cell">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedGrades.map((grade) => (
              <TableRow key={grade.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{grade.courseCode}</p>
                    <p className="text-xs text-muted-foreground">{grade.courseName}</p>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{grade.credits}</TableCell>
                <TableCell className="hidden md:table-cell">{grade.internalMarks}</TableCell>
                <TableCell className="hidden md:table-cell">{grade.externalMarks}</TableCell>
                <TableCell className="font-medium">{grade.totalMarks}</TableCell>
                <TableCell>
                  <Badge className={getGradeColor(grade.grade)} variant="secondary">
                    {grade.grade}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-muted-foreground text-xs">{grade.faculty}</TableCell>
                <TableCell className="hidden lg:table-cell text-muted-foreground text-xs">{formatDate(grade.examDate)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {sortedGrades.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">No grades found for the selected semester.</p>
        )}
      </CardContent>
    </Card>
  )
}
