"use client"

import type { Couple } from "@/lib/mock-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTranslation } from "@/lib/i18n/context"

interface WelcomeCardProps {
  couple: Couple
}

export function WelcomeCard({ couple }: WelcomeCardProps) {
  const { t } = useTranslation()

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return t("dashboard.goodMorning")
    if (hour < 17) return t("dashboard.goodAfternoon")
    return t("dashboard.goodEvening")
  }

  return (
    <div className="glass rounded-3xl p-5 animate-fade-in-up">
      <div className="flex items-center gap-4">
        {/* Couple Avatars */}
        <div className="flex -space-x-3">
          <Avatar className="w-12 h-12 border-2 border-background ring-2 ring-primary/20">
            <AvatarImage src={couple.partner1.avatar || "/placeholder.svg"} alt={couple.partner1.name} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {couple.partner1.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <Avatar className="w-12 h-12 border-2 border-background ring-2 ring-primary/20">
            <AvatarImage src={couple.partner2.avatar || "/placeholder.svg"} alt={couple.partner2.name} />
            <AvatarFallback className="bg-accent text-accent-foreground">
              {couple.partner2.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Greeting */}
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">{getGreeting()}</p>
          <h2 className="font-serif text-xl font-semibold text-foreground">
            {couple.partner1.name} & {couple.partner2.name}
          </h2>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <p className="text-sm text-muted-foreground italic text-center">
          &ldquo;{t("dashboard.progressBringsCloser")}&rdquo;
        </p>
      </div>
    </div>
  )
}
