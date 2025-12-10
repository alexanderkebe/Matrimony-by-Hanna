"use client"

import { useState } from "react"
import { ArrowLeft, Users, Mail, Calendar } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { mockCouple } from "@/lib/mock-data"

export default function CoupleSettingsPage() {
  const [isInviteSent, setIsInviteSent] = useState(false)

  const handleInvitePartner = () => {
    // TODO: Send invitation to backend
    setIsInviteSent(true)
    setTimeout(() => setIsInviteSent(false), 3000)
  }

  return (
    <div className="space-y-6 -mx-4 -mt-4">
      {/* Header */}
      <div className="glass-strong px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
        <Link href="/settings" className="w-10 h-10 rounded-xl bg-background flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2 flex-1">
          <Users className="w-5 h-5 text-primary" />
          <h1 className="font-medium text-foreground">Couple Settings</h1>
        </div>
      </div>

      <div className="px-4 space-y-6 pb-8">
        {/* Current Partner */}
        <div className="glass rounded-2xl p-5">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Your Partner</h2>
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-primary/20">
              <AvatarImage src={mockCouple.partner2.avatar || "/placeholder.svg"} alt={mockCouple.partner2.name} />
              <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                {mockCouple.partner2.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-foreground">{mockCouple.partner2.name}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <Mail className="w-3.5 h-3.5" />
                {mockCouple.partner2.email}
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <Calendar className="w-3.5 h-3.5" />
                Joined {new Date(mockCouple.joinedDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </p>
            </div>
          </div>
        </div>

        {/* Shared Account Info */}
        <div className="glass rounded-2xl p-5">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Shared Account
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Shared Progress</p>
                <p className="text-sm text-muted-foreground">Both partners see the same course progress</p>
              </div>
              <div className="w-12 h-6 rounded-full bg-primary flex items-center justify-end px-1">
                <div className="w-4 h-4 rounded-full bg-white" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Shared Activities</p>
                <p className="text-sm text-muted-foreground">Complete activities together</p>
              </div>
              <div className="w-12 h-6 rounded-full bg-primary flex items-center justify-end px-1">
                <div className="w-4 h-4 rounded-full bg-white" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Shared Chat</p>
                <p className="text-sm text-muted-foreground">Private messages between partners</p>
              </div>
              <div className="w-12 h-6 rounded-full bg-primary flex items-center justify-end px-1">
                <div className="w-4 h-4 rounded-full bg-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button variant="outline" className="w-full h-12 rounded-xl" onClick={handleInvitePartner}>
            {isInviteSent ? "Invitation Sent!" : "Invite New Partner"}
          </Button>
          <Button variant="outline" className="w-full h-12 rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10">
            Remove Partner
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center px-4">
          Removing your partner will disconnect your shared account. You can reconnect later if needed.
        </p>
      </div>
    </div>
  )
}

