"use client"

import { FeeSummary } from "@/components/fees/fee-summary"
import { FeeTable } from "@/components/fees/fee-table"

export default function FeesPage() {
  return (
    <div className="space-y-6">
      <FeeSummary />
      <FeeTable />
    </div>
  )
}
