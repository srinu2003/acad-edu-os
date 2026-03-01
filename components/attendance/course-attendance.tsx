"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { courseAttendance } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

function getStatusBadge(percentage: number) {
  if (percentage < 75) return { label: "Critical", className: "bg-destructive/15 text-destructive" }
  if (percentage < 85) return { label: "Warning", className: "bg-chart-3/15 text-chart-3" }
  return { label: "Good", className: "bg-chart-2/15 text-chart-2" }
}

function getProgressColor(percentage: number) {
  if (percentage < 75) return "[&>div]:bg-destructive"
  if (percentage < 85) return "[&>div]:bg-chart-3"
  return "[&>div]:bg-chart-2"
}

export function CourseAttendance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Course-wise Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courseAttendance.map((course) => {
            const status = getStatusBadge(course.percentage)
            return (
              <div key={course.courseId} className="rounded-[var(--radius)] border p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="truncate text-sm font-medium">{course.courseName}</h4>
                      <Badge className={cn("shrink-0 text-[10px]", status.className)} variant="secondary">
                        {status.label}
                      </Badge>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {course.courseCode} &middot; {course.faculty}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{course.percentage.toFixed(1)}%</p>
                    <p className="text-xs text-muted-foreground">
                      {course.attended}/{course.totalClasses} classes
                    </p>
                  </div>
                </div>
                <Progress
                  value={course.percentage}
                  className={cn("mt-3 h-2", getProgressColor(course.percentage))}
                />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
