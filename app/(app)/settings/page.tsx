"use client"

import { ArrowLeft, User, Users, Church, Bell, Globe, Shield, HelpCircle, ChevronRight, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTranslation } from "@/lib/i18n/context"

export default function SettingsPage() {
  const { t, language } = useTranslation()

  const settingsGroups = [
    {
      title: t("settings.account"),
      items: [
        {
          icon: User,
          label: t("settings.editProfile"),
          href: "/settings/profile",
          description: t("settings.updatePersonalInfo"),
          isToggle: false,
        },
        {
          icon: Users,
          label: t("settings.coupleSettings"),
          href: "/settings/couple",
          description: t("settings.manageSharedAccount"),
          isToggle: false,
        },
        {
          icon: Church,
          label: t("settings.churchAffiliation"),
          href: "/settings/church",
          description: t("settings.changeChurchCommunity"),
          isToggle: false,
        },
      ],
    },
    {
      title: t("settings.preferences"),
      items: [
        {
          icon: Bell,
          label: t("settings.notifications"),
          href: "/settings/notifications",
          description: t("settings.manageAlertsReminders"),
          isToggle: false,
        },
        {
          icon: Globe,
          label: t("settings.language"),
          href: "/settings/language",
          description: language === "en" ? "English" : "አማርኛ",
          isToggle: false,
        },
        {
          icon: Sun,
          label: t("settings.appearance"),
          href: "#",
          description: t("settings.lightDarkMode"),
          isToggle: true,
        },
        {
          icon: Shield,
          label: t("settings.privacy"),
          href: "/settings/privacy",
          description: t("settings.controlDataVisibility"),
          isToggle: false,
        },
      ],
    },
    {
      title: t("settings.support"),
      items: [
        {
          icon: HelpCircle,
          label: t("settings.helpSupport"),
          href: "/settings/help",
          description: t("settings.getHelpSendFeedback"),
          isToggle: false,
        },
      ],
    },
  ]

  return (
    <div className="space-y-6 -mx-4 -mt-4">
      {/* Header */}
      <div className="glass-strong px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
        <Link href="/profile" className="w-10 h-10 rounded-xl bg-background flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-serif text-xl font-semibold text-foreground">{t("settings.settings")}</h1>
      </div>

      {/* Settings Groups */}
      <div className="px-4 space-y-6">
        {settingsGroups.map((group) => (
          <div key={group.title} className="animate-fade-in-up">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 px-1">
              {group.title}
            </h2>
            <div className="glass rounded-2xl overflow-hidden">
              {group.items.map((item, idx) => (
                item.isToggle ? (
                  <div
                    key={item.label}
                    className={`flex items-center gap-4 px-4 py-4 ${
                      idx !== group.items.length - 1 ? "border-b border-border/50" : ""
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                    </div>
                    <ThemeToggle />
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-4 px-4 py-4 hover:bg-muted/50 transition-colors ${
                      idx !== group.items.length - 1 ? "border-b border-border/50" : ""
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </Link>
                )
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* App Version */}
      <div className="px-4 pb-8 text-center animate-fade-in-up">
        <p className="text-xs text-muted-foreground">{t("settings.matrimonyByHana")}</p>
        <p className="text-xs text-muted-foreground mt-1">{t("settings.ministryForCouples")}</p>
      </div>
    </div>
  )
}
