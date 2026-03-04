"use client"

import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentGrades } from "@/components/dashboard/recent-grades"
import { AttendanceChart } from "@/components/dashboard/attendance-chart"
import { UpcomingDeadlines } from "@/components/dashboard/upcoming-deadlines"
import { AnnouncementsPreview } from "@/components/dashboard/announcements-preview"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <StatsCards />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentGrades />
        <AttendanceChart />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <UpcomingDeadlines />
        <AnnouncementsPreview />
      </div>
    </div>
  )
}
