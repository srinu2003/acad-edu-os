"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { studentProfile } from "@/lib/mock-data"

export function ProfileHeader() {
  const initials = `${studentProfile.firstName[0]}${studentProfile.lastName[0]}`

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-bold text-foreground text-balance">
              {studentProfile.firstName} {studentProfile.lastName}
            </h2>
            <p className="text-sm text-muted-foreground">{studentProfile.rollNo}</p>
            <p className="mt-1 text-sm text-muted-foreground">{studentProfile.program}</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <Badge variant="secondary">Semester {studentProfile.semester}</Badge>
              <Badge variant="secondary">Section {studentProfile.section}</Badge>
              <Badge className="bg-chart-2/15 text-chart-2" variant="secondary">
                CGPA: {studentProfile.cgpa.toFixed(2)}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
