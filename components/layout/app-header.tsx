"use client"

import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import Link from "next/link"
import { mockNotifications } from "@/lib/mock-data"

interface AppHeaderProps {
  title?: string
  showLogo?: boolean
  showNotifications?: boolean
}

export function AppHeader({ title, showLogo = true, showNotifications = true }: AppHeaderProps) {
  const unreadCount = mockNotifications.filter((n) => !n.isRead).length

  return (
    <header className="sticky top-0 z-40 glass-strong border-b border-border/50 lg:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        {showLogo ? <Logo size="sm" /> : <h1 className="font-serif text-xl font-semibold text-foreground">{title}</h1>}

        {showNotifications && (
          <Button variant="ghost" size="icon" className="relative rounded-xl" asChild>
            <Link href="/notifications">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
              <span className="sr-only">Notifications ({unreadCount} unread)</span>
            </Link>
          </Button>
        )}
      </div>
    </header>
  )
}
