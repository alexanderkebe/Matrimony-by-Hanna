"use client"

import type { Activity } from "@/lib/mock-data"
import { Heart, HandHeart, MessageCircle, Sparkles, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/lib/i18n/context"

interface UpcomingActivitiesCardProps {
  activities: Activity[]
}

const iconMap = {
  heart: Heart,
  "hands-praying": HandHeart,
  "message-circle": MessageCircle,
  sparkles: Sparkles,
}

export function UpcomingActivitiesCard({ activities }: UpcomingActivitiesCardProps) {
  const { t } = useTranslation()

  if (activities.length === 0) return null

  return (
    <div className="glass rounded-3xl p-5 animate-fade-in-up delay-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg font-semibold text-foreground">{t("dashboard.upcomingActivities")}</h3>
        <Link href="/activities" className="text-sm text-primary hover:underline flex items-center gap-1">
          {t("dashboard.viewAll")}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {activities.map((activity) => {
          const IconComponent = iconMap[activity.icon as keyof typeof iconMap] || Heart
          return (
            <Link
              key={activity.id}
              href={`/activities/${activity.id}`}
              className="flex items-center gap-3 p-3 rounded-2xl bg-background/50 hover:bg-background/80 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <IconComponent className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{activity.title}</p>
                <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
              </div>
              {activity.dueDate && (
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {new Date(activity.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
