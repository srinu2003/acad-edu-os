"use client"

import { GraduationCap, ClipboardList, Wallet, BookOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { dashboardStats } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"

const stats = [
  {
    label: "Current SGPA",
    value: dashboardStats.currentGPA.toFixed(2),
    subtitle: `CGPA: ${dashboardStats.cgpa.toFixed(2)}`,
    icon: GraduationCap,
    color: "text-chart-1",
    bg: "bg-chart-1/10",
  },
  {
    label: "Attendance",
    value: `${dashboardStats.attendancePercentage}%`,
    subtitle: "Overall this semester",
    icon: ClipboardList,
    color: "text-chart-2",
    bg: "bg-chart-2/10",
  },
  {
    label: "Pending Fees",
    value: formatCurrency(dashboardStats.pendingFees),
    subtitle: "Due this semester",
    icon: Wallet,
    color: "text-chart-5",
    bg: "bg-chart-5/10",
  },
  {
    label: "Enrolled Courses",
    value: dashboardStats.enrolledCourses.toString(),
    subtitle: `${dashboardStats.totalCredits} credits`,
    icon: BookOpen,
    color: "text-chart-4",
    bg: "bg-chart-4/10",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
              </div>
              <div className={`rounded-[var(--radius)] p-2.5 ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
