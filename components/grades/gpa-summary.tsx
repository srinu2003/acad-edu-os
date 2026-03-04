"use client"

import { TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { studentProfile, semesterGPAs } from "@/lib/mock-data"

export function GPASummary() {
  const latestSGPA = semesterGPAs[semesterGPAs.length - 1]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground">CGPA</p>
          <p className="mt-1 text-3xl font-bold text-foreground">{studentProfile.cgpa.toFixed(2)}</p>
          <p className="mt-1 text-xs text-muted-foreground">Cumulative across all semesters</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground">Current SGPA</p>
          <div className="mt-1 flex items-baseline gap-2">
            <p className="text-3xl font-bold text-foreground">{latestSGPA.sgpa.toFixed(2)}</p>
            <span className="flex items-center text-xs text-chart-2">
              <TrendingUp className="mr-0.5 h-3 w-3" /> Semester {latestSGPA.semester}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{latestSGPA.totalCourses} courses graded</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground">Total Credits Earned</p>
          <p className="mt-1 text-3xl font-bold text-foreground">{studentProfile.totalCredits}</p>
          <p className="mt-1 text-xs text-muted-foreground">Across {semesterGPAs.length} semesters</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground">SGPA Trend</p>
          <div className="mt-2 flex items-end gap-1.5">
            {semesterGPAs.map((sg) => (
              <div key={sg.semester} className="flex flex-col items-center gap-1">
                <div
                  className="w-8 rounded-sm bg-primary/80"
                  style={{ height: `${(sg.sgpa / 10) * 60}px` }}
                />
                <span className="text-[10px] text-muted-foreground">S{sg.semester}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
