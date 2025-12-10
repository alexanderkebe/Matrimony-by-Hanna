"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/ui/logo"
import { Home, BookOpen, Heart, MessageCircle, User, Bell, Settings, Users, HelpCircle } from "lucide-react"
import { useTranslation } from "@/lib/i18n/context"

export function DesktopSidebar() {
  const pathname = usePathname()
  const { t } = useTranslation()

  const mainNavItems = [
    { href: "/dashboard", icon: Home, label: t("nav.home") },
    { href: "/courses", icon: BookOpen, label: t("nav.courses") },
    { href: "/activities", icon: Heart, label: t("nav.activities") },
    { href: "/chat", icon: MessageCircle, label: t("nav.chat") },
    { href: "/community", icon: Users, label: t("nav.community") },
  ]

  const secondaryNavItems = [
    { href: "/notifications", icon: Bell, label: t("nav.notifications") },
    { href: "/profile", icon: User, label: t("nav.profile") },
    { href: "/settings", icon: Settings, label: t("nav.settings") },
  ]

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 glass-strong border-r border-border/50 z-50">
      {/* Logo */}
      <div className="p-6 border-b border-border/50">
        <Logo size="md" />
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-2">{t("nav.mainMenu")}</p>
        {mainNavItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}

        <div className="pt-6">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-2">{t("nav.account")}</p>
          {secondaryNavItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Help Section */}
      <div className="p-4 border-t border-border/50 space-y-1">
        <Link
          href="/help"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
        >
          <HelpCircle className="w-5 h-5" />
          <span className="font-medium">{t("nav.helpSupport")}</span>
        </Link>
        <Link
          href="/admin"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Admin Portal</span>
        </Link>
      </div>
    </aside>
  )
}
