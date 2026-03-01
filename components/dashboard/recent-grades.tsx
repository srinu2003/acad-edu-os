"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { gradeRecords } from "@/lib/mock-data"
import { getGradeColor } from "@/lib/utils"

export function RecentGrades() {
  const recent = gradeRecords.slice(-5).reverse()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold">Recent Grades</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/grades" className="gap-1 text-xs">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recent.map((grade) => (
            <div key={grade.id} className="flex items-center justify-between rounded-[var(--radius)] border p-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{grade.courseName}</p>
                <p className="text-xs text-muted-foreground">
                  {grade.courseCode} &middot; {grade.credits} credits
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">{grade.totalMarks}/100</span>
                <Badge className={getGradeColor(grade.grade)} variant="secondary">
                  {grade.grade}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
