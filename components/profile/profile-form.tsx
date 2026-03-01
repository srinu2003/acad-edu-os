"use client"

import { useState } from "react"
import { Save } from "lucide-react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { studentProfile } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils"

interface InfoField {
  label: string
  value: string
  editable?: boolean
  key?: string
}

export function ProfileForm() {
  const [phone, setPhone] = useState(studentProfile.phone)
  const [address, setAddress] = useState(studentProfile.address)
  const [emergencyContact, setEmergencyContact] = useState(studentProfile.emergencyContact)
  const [emergencyPhone, setEmergencyPhone] = useState(studentProfile.emergencyPhone)
  const [isSaving, setIsSaving] = useState(false)

  async function handleSave() {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 600))
    setIsSaving(false)
    toast.success("Profile updated successfully")
  }

  const personalInfo: InfoField[] = [
    { label: "Full Name", value: `${studentProfile.firstName} ${studentProfile.lastName}` },
    { label: "Email", value: studentProfile.email },
    { label: "Date of Birth", value: formatDate(studentProfile.dateOfBirth) },
    { label: "Blood Group", value: studentProfile.bloodGroup },
    { label: "Phone", value: phone, editable: true, key: "phone" },
    { label: "Address", value: address, editable: true, key: "address" },
  ]

  const academicInfo: InfoField[] = [
    { label: "Roll Number", value: studentProfile.rollNo },
    { label: "Program", value: studentProfile.program },
    { label: "Department", value: studentProfile.department },
    { label: "Semester", value: String(studentProfile.semester) },
    { label: "Section", value: studentProfile.section },
    { label: "Academic Year", value: studentProfile.academicYear },
    { label: "Admission Date", value: formatDate(studentProfile.admissionDate) },
    { label: "CGPA", value: studentProfile.cgpa.toFixed(2) },
    { label: "Total Credits", value: String(studentProfile.totalCredits) },
  ]

  const emergencyInfo: InfoField[] = [
    { label: "Contact Name", value: emergencyContact, editable: true, key: "emergencyContact" },
    { label: "Contact Phone", value: emergencyPhone, editable: true, key: "emergencyPhone" },
  ]

  function renderFields(fields: InfoField[]) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fields.map((field) => (
          <div key={field.label} className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">{field.label}</Label>
            {field.editable ? (
              <Input
                value={field.value}
                onChange={(e) => {
                  if (field.key === "phone") setPhone(e.target.value)
                  else if (field.key === "address") setAddress(e.target.value)
                  else if (field.key === "emergencyContact") setEmergencyContact(e.target.value)
                  else if (field.key === "emergencyPhone") setEmergencyPhone(e.target.value)
                }}
              />
            ) : (
              <p className="text-sm font-medium text-foreground">{field.value}</p>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Personal Information</CardTitle>
        </CardHeader>
        <CardContent>{renderFields(personalInfo)}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Academic Information</CardTitle>
        </CardHeader>
        <CardContent>{renderFields(academicInfo)}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Emergency Contact</CardTitle>
        </CardHeader>
        <CardContent>{renderFields(emergencyInfo)}</CardContent>
      </Card>

      <Separator />

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}
