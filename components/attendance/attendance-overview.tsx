"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { courseAttendance } from "@/lib/mock-data"

export function AttendanceOverview() {
  const totalClasses = courseAttendance.reduce((sum, c) => sum + c.totalClasses, 0)
  const totalAttended = courseAttendance.reduce((sum, c) => sum + c.attended, 0)
  const overallPercentage = totalClasses > 0 ? (totalAttended / totalClasses) * 100 : 0
  const shortageCount = courseAttendance.filter((c) => c.percentage < 75).length

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground">Overall Attendance</p>
          <p className="mt-1 text-3xl font-bold text-foreground">{overallPercentage.toFixed(1)}%</p>
          <Progress value={overallPercentage} className="mt-3 h-2" />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground">Total Classes</p>
          <p className="mt-1 text-3xl font-bold text-foreground">{totalClasses}</p>
          <p className="mt-1 text-xs text-muted-foreground">Across all courses</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground">Classes Attended</p>
          <p className="mt-1 text-3xl font-bold text-foreground">{totalAttended}</p>
          <p className="mt-1 text-xs text-muted-foreground">Out of {totalClasses} classes</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground">Shortage Warnings</p>
          <p className={`mt-1 text-3xl font-bold ${shortageCount > 0 ? "text-destructive" : "text-chart-2"}`}>
            {shortageCount}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {shortageCount > 0 ? "Courses below 75%" : "All courses above 75%"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
