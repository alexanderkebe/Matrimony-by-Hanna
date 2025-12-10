"use client"

import { Progress } from "@/components/ui/progress"
import { TrendingUp } from "lucide-react"
import { useTranslation } from "@/lib/i18n/context"

interface ProgressCardProps {
  progress: number
  coursesCompleted: number
  totalCourses: number
}

export function ProgressCard({ progress, coursesCompleted, totalCourses }: ProgressCardProps) {
  const { t } = useTranslation()

  return (
    <div className="glass rounded-3xl p-5 animate-fade-in-up delay-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg font-semibold text-foreground">{t("dashboard.yourJourney")}</h3>
        <div className="flex items-center gap-1 text-primary">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">{progress}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <Progress value={progress} className="h-3 bg-primary/10" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>
            {coursesCompleted} {t("courses.of")} {totalCourses} {t("courses.coursesPlural")}
          </span>
          <span>{t("dashboard.keepGrowingTogether")}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border/50">
        <div className="text-center">
          <p className="text-2xl font-semibold text-primary">12</p>
          <p className="text-xs text-muted-foreground">{t("dashboard.lessons")}</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-semibold text-primary">8</p>
          <p className="text-xs text-muted-foreground">{t("dashboard.activities")}</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-semibold text-primary">5</p>
          <p className="text-xs text-muted-foreground">{t("dashboard.daysStreak")}</p>
        </div>
      </div>
    </div>
  )
}
