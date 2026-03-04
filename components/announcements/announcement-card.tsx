"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Paperclip } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Announcement } from "@/lib/types"
import { formatDate, cn } from "@/lib/utils"

const priorityStyles: Record<string, string> = {
  urgent: "bg-destructive/15 text-destructive border-destructive/20",
  high: "bg-chart-5/15 text-chart-5 border-chart-5/20",
  normal: "bg-chart-1/15 text-chart-1 border-chart-1/20",
  low: "bg-muted text-muted-foreground border-muted",
}

const priorityBorder: Record<string, string> = {
  urgent: "border-l-destructive",
  high: "border-l-chart-5",
  normal: "border-l-chart-1",
  low: "border-l-muted-foreground",
}

interface AnnouncementCardProps {
  announcement: Announcement
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className={cn("border-l-4", priorityBorder[announcement.priority])}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="text-sm font-semibold text-foreground">{announcement.title}</h3>
              <Badge className={cn("text-[10px]", priorityStyles[announcement.priority])} variant="outline">
                {announcement.priority}
              </Badge>
              <Badge variant="secondary" className="text-[10px]">
                {announcement.category}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>{announcement.author}</span>
              <span>&middot;</span>
              <span>{formatDate(announcement.publishedAt)}</span>
              {announcement.attachments.length > 0 && (
                <>
                  <span>&middot;</span>
                  <span className="flex items-center gap-0.5">
                    <Paperclip className="h-3 w-3" />
                    {announcement.attachments.length} attachment{announcement.attachments.length > 1 ? "s" : ""}
                  </span>
                </>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? "Collapse" : "Expand"}
            aria-expanded={expanded}
          >
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        {!expanded && (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
            {announcement.content}
          </p>
        )}

        {expanded && (
          <div className="mt-3 space-y-3">
            <p className="text-sm text-foreground leading-relaxed">{announcement.content}</p>
            {announcement.attachments.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {announcement.attachments.map((file) => (
                  <Badge key={file} variant="outline" className="gap-1 font-mono text-xs">
                    <Paperclip className="h-3 w-3" />
                    {file}
                  </Badge>
                ))}
              </div>
            )}
            {announcement.expiresAt && (
              <p className="text-xs text-muted-foreground">
                Expires: {formatDate(announcement.expiresAt)}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
