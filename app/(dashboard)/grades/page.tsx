"use client"

import { GPASummary } from "@/components/grades/gpa-summary"
import { GradesTable } from "@/components/grades/grades-table"

export default function GradesPage() {
  return (
    <div className="space-y-6">
      <GPASummary />
      <GradesTable />
    </div>
  )
}
