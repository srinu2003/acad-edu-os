"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AnnouncementCard } from "@/components/announcements/announcement-card"
import { announcements } from "@/lib/mock-data"

export default function AnnouncementsPage() {
  const [priority, setPriority] = useState<string>("all")

  const filtered = priority === "all"
    ? announcements
    : announcements.filter((a) => a.priority === priority)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {filtered.length} announcement{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filtered.map((announcement) => (
          <AnnouncementCard key={announcement.id} announcement={announcement} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-sm text-muted-foreground">No announcements found for the selected filter.</p>
        </div>
      )}
    </div>
  )
}
