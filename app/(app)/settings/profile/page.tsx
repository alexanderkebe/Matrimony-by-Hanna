"use client"

import { useState } from "react"
import { ArrowLeft, User, Camera } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockUser } from "@/lib/mock-data"

export default function ProfileSettingsPage() {
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    relationshipStage: mockUser.relationshipStage,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Save to backend
    console.log("Profile updated:", formData)
  }

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <div className="space-y-6 -mx-4 -mt-4">
      {/* Header */}
      <div className="glass-strong px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
        <Link href="/settings" className="w-10 h-10 rounded-xl bg-background flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2 flex-1">
          <User className="w-5 h-5 text-primary" />
          <h1 className="font-medium text-foreground">Edit Profile</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-4 space-y-6 pb-8">
        {/* Profile Picture */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Avatar className="w-24 h-24 border-4 border-primary/20">
              <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={formData.name} />
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {formData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <button
              type="button"
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center border-2 border-background"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground text-center">Tap to change profile picture</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="h-12 rounded-xl"
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="h-12 rounded-xl"
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="relationshipStage">Relationship Stage</Label>
            <select
              id="relationshipStage"
              value={formData.relationshipStage}
              onChange={(e) => handleChange("relationshipStage", e.target.value)}
              className="w-full h-12 rounded-xl bg-background border border-border px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="engaged">Engaged</option>
              <option value="newly-married">Newly Married</option>
              <option value="married-years">Married (Years)</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <Button type="submit" className="w-full h-12 rounded-xl" size="lg">
          Save Changes
        </Button>
      </form>
    </div>
  )
}

