"use client"

import { Calendar, Wallet } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { feeRecords } from "@/lib/mock-data"
import { formatCurrency, formatDate } from "@/lib/utils"

const pendingFees = feeRecords
  .filter((f) => f.status === "pending" || f.status === "overdue" || f.status === "partial")
  .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())

const upcomingExams = [
  { id: "ex-1", name: "DBMS - End Semester", date: "2025-05-10" },
  { id: "ex-2", name: "DSA - End Semester", date: "2025-05-12" },
  { id: "ex-3", name: "OS - End Semester", date: "2025-05-14" },
]

export function UpcomingDeadlines() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Fee Payments</p>
          {pendingFees.map((fee) => (
            <div key={fee.id} className="flex items-center justify-between rounded-[var(--radius)] border p-3">
              <div className="flex items-center gap-3">
                <Wallet className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{fee.feeType}</p>
                  <p className="text-xs text-muted-foreground">Due: {formatDate(fee.dueDate)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{formatCurrency(fee.balance)}</span>
                <Badge
                  variant={fee.status === "overdue" ? "destructive" : "secondary"}
                  className="text-[10px]"
                >
                  {fee.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Examinations</p>
          {upcomingExams.map((exam) => (
            <div key={exam.id} className="flex items-center justify-between rounded-[var(--radius)] border p-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{exam.name}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(exam.date)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
