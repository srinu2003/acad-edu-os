"use client"

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
import { feeRecords } from "@/lib/mock-data"
import { formatCurrency, formatDate, cn } from "@/lib/utils"

const statusStyles: Record<string, string> = {
  paid: "bg-chart-2/15 text-chart-2",
  pending: "bg-chart-3/15 text-chart-3",
  partial: "bg-chart-1/15 text-chart-1",
  overdue: "bg-destructive/15 text-destructive",
  waived: "bg-muted text-muted-foreground",
}

export function FeeTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Fee Records</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fee Type</TableHead>
              <TableHead className="hidden sm:table-cell">Semester</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="hidden md:table-cell">Paid</TableHead>
              <TableHead className="hidden md:table-cell">Balance</TableHead>
              <TableHead className="hidden lg:table-cell">Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden lg:table-cell">Transaction ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feeRecords.map((fee) => (
              <TableRow key={fee.id}>
                <TableCell className="font-medium">{fee.feeType}</TableCell>
                <TableCell className="hidden sm:table-cell">{fee.semester}</TableCell>
                <TableCell>{formatCurrency(fee.amount)}</TableCell>
                <TableCell className="hidden md:table-cell">{formatCurrency(fee.paid)}</TableCell>
                <TableCell className="hidden md:table-cell">{formatCurrency(fee.balance)}</TableCell>
                <TableCell className="hidden lg:table-cell text-muted-foreground text-xs">{formatDate(fee.dueDate)}</TableCell>
                <TableCell>
                  <Badge className={cn("text-[10px] capitalize", statusStyles[fee.status])} variant="secondary">
                    {fee.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-xs text-muted-foreground font-mono">
                  {fee.transactionId || "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
