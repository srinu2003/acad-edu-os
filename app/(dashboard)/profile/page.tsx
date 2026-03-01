"use client"

import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileForm } from "@/components/profile/profile-form"

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <ProfileHeader />
      <ProfileForm />
    </div>
  )
}
