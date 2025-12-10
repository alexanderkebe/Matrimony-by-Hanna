"use client"

import { useState } from "react"
import { ArrowLeft, Bell, BookOpen, Users, Calendar, Sparkles } from "lucide-react"
import Link from "next/link"
import { Switch } from "@/components/ui/switch"

export default function NotificationSettingsPage() {
  const [settings, setSettings] = useState({
    lessons: true,
    partner: true,
    events: true,
    motivation: true,
    email: false,
  })

  const toggleSetting = (key: keyof typeof settings) => {
    // TODO: Save to backend
    setSettings({ ...settings, [key]: !settings[key] })
  }

  const notificationTypes = [
    {
      key: "lessons" as const,
      icon: BookOpen,
      label: "Lesson Reminders",
      description: "Get notified about new and unfinished lessons",
    },
    {
      key: "partner" as const,
      icon: Users,
      label: "Partner Activity",
      description: "Know when your partner completes activities",
    },
    {
      key: "events" as const,
      icon: Calendar,
      label: "Church Events",
      description: "Updates about upcoming events and sessions",
    },
    {
      key: "motivation" as const,
      icon: Sparkles,
      label: "Weekly Inspiration",
      description: "Receive motivational messages and scriptures",
    },
  ]

  return (
    <div className="space-y-6 -mx-4 -mt-4">
      {/* Header */}
      <div className="glass-strong px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
        <Link href="/settings" className="w-10 h-10 rounded-xl bg-background flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2 flex-1">
          <Bell className="w-5 h-5 text-primary" />
          <h1 className="font-medium text-foreground">Notifications</h1>
        </div>
      </div>

      {/* Push Notifications */}
      <div className="px-4 space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Push Notifications</h2>
        <div className="glass rounded-2xl overflow-hidden">
          {notificationTypes.map((type, idx) => (
            <div
              key={type.key}
              className={`flex items-center gap-4 px-4 py-4 ${
                idx !== notificationTypes.length - 1 ? "border-b border-border/50" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <type.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">{type.label}</p>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
              <Switch checked={settings[type.key]} onCheckedChange={() => toggleSetting(type.key)} />
            </div>
          ))}
        </div>
      </div>

      {/* Email Notifications */}
      <div className="px-4 space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Email</h2>
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive updates via email</p>
            </div>
            <Switch checked={settings.email} onCheckedChange={() => toggleSetting("email")} />
          </div>
        </div>
      </div>
    </div>
  )
}
