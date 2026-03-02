"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { courseAttendance } from "@/lib/mock-data"

export function AttendanceChart() {
  const chartData = courseAttendance.map((ca) => ({
    name: ca.courseCode,
    percentage: ca.percentage,
    color: ca.percentage < 75 ? "#dc2626" : ca.percentage < 85 ? "#f97316" : "#16a34a",
  }))

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold">Attendance Overview</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/attendance" className="gap-1 text-xs">
            View details <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} className="text-muted-foreground" />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} className="text-muted-foreground" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  fontSize: "12px",
                  color: "#1f2937",
                }}
                formatter={(value: number) => [`${value.toFixed(1)}%`, "Attendance"]}
              />
              <Bar dataKey="percentage" radius={[4, 4, 0, 0]} maxBarSize={40}>
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
