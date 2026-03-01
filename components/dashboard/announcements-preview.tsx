"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { announcements } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils"
import { cn } from "@/lib/utils"

const priorityStyles: Record<string, string> = {
  urgent: "bg-destructive/15 text-destructive border-destructive/20",
  high: "bg-chart-5/15 text-chart-5 border-chart-5/20",
  normal: "bg-chart-1/15 text-chart-1 border-chart-1/20",
  low: "bg-muted text-muted-foreground border-muted",
}

export function AnnouncementsPreview() {
  const recent = announcements.slice(0, 3)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold">Recent Announcements</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/announcements" className="gap-1 text-xs">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recent.map((ann) => (
            <div key={ann.id} className="rounded-[var(--radius)] border p-3">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="text-sm font-medium leading-tight">{ann.title}</h4>
                <Badge className={cn("shrink-0 text-[10px]", priorityStyles[ann.priority])} variant="outline">
                  {ann.priority}
                </Badge>
              </div>
              <p className="line-clamp-2 text-xs text-muted-foreground leading-relaxed">{ann.content}</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <span>{ann.author}</span>
                <span>&middot;</span>
                <span>{formatDate(ann.publishedAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
