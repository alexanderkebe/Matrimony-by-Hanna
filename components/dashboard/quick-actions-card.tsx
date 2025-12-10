"use client"

import { BookOpen, Heart, MessageCircle, Users } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/lib/i18n/context"

export function QuickActionsCard() {
  const { t } = useTranslation()

  const actions = [
    { href: "/courses", icon: BookOpen, label: t("nav.courses"), color: "bg-primary/10 text-primary" },
    { href: "/activities", icon: Heart, label: t("nav.activities"), color: "bg-pastel-blush text-deep-charcoal" },
    { href: "/chat", icon: MessageCircle, label: t("nav.chat"), color: "bg-accent/30 text-deep-charcoal" },
    { href: "/community", icon: Users, label: t("nav.community"), color: "bg-secondary text-deep-charcoal" },
  ]

  return (
    <div className="glass rounded-3xl p-5 animate-fade-in-up delay-400">
      <h3 className="font-serif text-lg font-semibold text-foreground mb-4">{t("dashboard.quickActions")}</h3>

      <div className="grid grid-cols-4 gap-3">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:scale-105 transition-transform"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${action.color}`}>
              <action.icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-foreground">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
