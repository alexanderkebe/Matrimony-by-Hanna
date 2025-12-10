"use client"

import { useState } from "react"
import { ArrowLeft, Shield, Eye, Lock, UserX, Database } from "lucide-react"
import Link from "next/link"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export default function PrivacySettingsPage() {
  const [settings, setSettings] = useState({
    profileVisibility: "private",
    showProgress: true,
    showActivities: true,
    allowMessages: true,
    dataCollection: false,
  })

  const toggleSetting = (key: keyof typeof settings) => {
    if (typeof settings[key] === "boolean") {
      setSettings({ ...settings, [key]: !settings[key] })
    }
  }

  const privacyOptions = [
    {
      icon: Eye,
      label: "Profile Visibility",
      description: "Who can see your profile",
      type: "select" as const,
      value: settings.profileVisibility,
      options: ["private", "community", "public"],
    },
    {
      icon: Shield,
      label: "Show Progress",
      description: "Display your course progress to your partner",
      type: "toggle" as const,
      value: settings.showProgress,
    },
    {
      icon: Lock,
      label: "Show Activities",
      description: "Share your activities with your partner",
      type: "toggle" as const,
      value: settings.showActivities,
    },
    {
      icon: UserX,
      label: "Allow Messages",
      description: "Let your partner send you messages",
      type: "toggle" as const,
      value: settings.allowMessages,
    },
    {
      icon: Database,
      label: "Data Collection",
      description: "Help improve the app by sharing anonymous usage data",
      type: "toggle" as const,
      value: settings.dataCollection,
    },
  ]

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      console.log("Account deletion requested")
    }
  }

  return (
    <div className="space-y-6 -mx-4 -mt-4">
      {/* Header */}
      <div className="glass-strong px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
        <Link href="/settings" className="w-10 h-10 rounded-xl bg-background flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2 flex-1">
          <Shield className="w-5 h-5 text-primary" />
          <h1 className="font-medium text-foreground">Privacy</h1>
        </div>
      </div>

      <div className="px-4 space-y-6 pb-8">
        {/* Privacy Settings */}
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Privacy Settings</h2>
          <div className="glass rounded-2xl overflow-hidden">
            {privacyOptions.map((option, idx) => (
              <div
                key={option.label}
                className={`flex items-center gap-4 px-4 py-4 ${
                  idx !== privacyOptions.length - 1 ? "border-b border-border/50" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <option.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{option.label}</p>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
                {option.type === "toggle" && (
                  <Switch
                    checked={option.value as boolean}
                    onCheckedChange={() => {
                      const keyMap: Record<string, keyof typeof settings> = {
                        "Show Progress": "showProgress",
                        "Show Activities": "showActivities",
                        "Allow Messages": "allowMessages",
                        "Data Collection": "dataCollection",
                      }
                      toggleSetting(keyMap[option.label])
                    }}
                  />
                )}
                {option.type === "select" && (
                  <select
                    value={option.value as string}
                    onChange={(e) => setSettings({ ...settings, profileVisibility: e.target.value })}
                    className="px-3 py-1.5 rounded-lg bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="private">Private</option>
                    <option value="community">Community</option>
                    <option value="public">Public</option>
                  </select>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Data Management */}
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Data Management</h2>
          <div className="glass rounded-2xl p-4 space-y-3">
            <Button variant="outline" className="w-full h-12 rounded-xl">
              Download My Data
            </Button>
            <Button variant="outline" className="w-full h-12 rounded-xl">
              Clear Chat History
            </Button>
            <Button variant="outline" className="w-full h-12 rounded-xl">
              Reset Progress
            </Button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-destructive uppercase tracking-wider">Danger Zone</h2>
          <div className="glass rounded-2xl p-4 border border-destructive/30">
            <p className="text-sm text-foreground mb-4">
              Deleting your account will permanently remove all your data, progress, and messages. This action cannot
              be undone.
            </p>
            <Button
              variant="outline"
              onClick={handleDeleteAccount}
              className="w-full h-12 rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

