"use client"

import { useState } from "react"
import { ArrowLeft, BookOpen, Users, Calendar, Sparkles, Check } from "lucide-react"
import Link from "next/link"
import { mockNotifications } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const typeIcons = {
  lesson: BookOpen,
  partner: Users,
  event: Calendar,
  motivation: Sparkles,
}

const typeColors = {
  lesson: "bg-primary/10 text-primary",
  partner: "bg-pastel-blush text-deep-charcoal",
  event: "bg-accent/30 text-deep-charcoal",
  motivation: "bg-secondary text-deep-charcoal",
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)

  const handleMarkAllRead = () => {
    // TODO: Update in backend
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })))
  }

  const handleMarkRead = (id: string) => {
    // TODO: Update in backend
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <div className="space-y-6 -mx-4 -mt-4">
      {/* Header */}
      <div className="glass-strong px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
        <Link href="/dashboard" className="w-10 h-10 rounded-xl bg-background flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-medium text-foreground flex-1">Notifications</h1>
        {unreadCount > 0 && (
          <button onClick={handleMarkAllRead} className="text-sm text-primary font-medium">
            Mark all read
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="px-4 space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notification) => {
            const Icon = typeIcons[notification.type]
            const colorClass = typeColors[notification.type]

            return (
              <button
                key={notification.id}
                onClick={() => handleMarkRead(notification.id)}
                className={cn(
                  "w-full glass rounded-2xl p-4 text-left transition-all hover:scale-[1.02]",
                  !notification.isRead && "ring-2 ring-primary/20",
                )}
              >
                <div className="flex gap-3">
                  {/* Icon */}
                  <div
                    className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", colorClass)}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className={cn("font-medium text-foreground", !notification.isRead && "font-semibold")}>
                        {notification.title}
                      </h3>
                      {!notification.isRead && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(notification.timestamp).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </button>
            )
          })
        ) : (
          <div className="glass rounded-2xl p-8 text-center">
            <Check className="w-12 h-12 mx-auto text-primary mb-4" />
            <h2 className="font-serif text-lg font-semibold text-foreground mb-2">All Caught Up!</h2>
            <p className="text-sm text-muted-foreground">You have no new notifications.</p>
          </div>
        )}
      </div>
    </div>
  )
}
