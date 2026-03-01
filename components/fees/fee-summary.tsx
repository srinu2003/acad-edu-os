"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { feeSummary } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"

const items = [
  { label: "Total Fees", value: feeSummary.totalDue, color: "text-foreground" },
  { label: "Total Paid", value: feeSummary.totalPaid, color: "text-chart-2" },
  { label: "Balance Due", value: feeSummary.totalBalance, color: "text-chart-3" },
  { label: "Overdue", value: feeSummary.overdueAmount, color: "text-destructive" },
]

export function FeeSummary() {
  const paidPercentage = (feeSummary.totalPaid / feeSummary.totalDue) * 100

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <Card key={item.label}>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className={`mt-1 text-2xl font-bold ${item.color}`}>{formatCurrency(item.value)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Payment Progress</p>
            <p className="text-sm text-muted-foreground">{paidPercentage.toFixed(0)}% paid</p>
          </div>
          <Progress value={paidPercentage} className="h-3 [&>div]:bg-chart-2" />
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>Paid: {formatCurrency(feeSummary.totalPaid)}</span>
            <span>Remaining: {formatCurrency(feeSummary.totalBalance)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
