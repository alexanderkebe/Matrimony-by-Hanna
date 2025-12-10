"use client"

import type { Activity, User } from "@/lib/mock-data"
import { Heart, HandHeart, MessageCircle, Sparkles, Check, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ActivityCardProps {
  activity: Activity
  partner: User
  isCompleted?: boolean
}

const iconMap = {
  heart: Heart,
  "hands-praying": HandHeart,
  "message-circle": MessageCircle,
  sparkles: Sparkles,
}

const typeColors = {
  "weekly-task": "bg-primary/10 text-primary",
  journal: "bg-pastel-blush text-deep-charcoal",
  prayer: "bg-accent/30 text-deep-charcoal",
  discussion: "bg-secondary text-deep-charcoal",
}

export function ActivityCard({ activity, partner, isCompleted = false }: ActivityCardProps) {
  const IconComponent = iconMap[activity.icon as keyof typeof iconMap] || Heart
  const typeColor = typeColors[activity.type] || typeColors["weekly-task"]

  return (
    <Link
      href={`/activities/${activity.id}`}
      className={cn("block glass rounded-2xl p-4 transition-transform hover:scale-[1.02]", isCompleted && "opacity-70")}
    >
      <div className="flex gap-4">
        {/* Activity Icon */}
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0", typeColor)}>
          <IconComponent className="w-6 h-6" />
        </div>

        {/* Activity Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground">{activity.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{activity.description}</p>

          {/* Progress & Due Date */}
          <div className="flex items-center gap-3 mt-3">
            {/* Partner Status */}
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                {/* Your status */}
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center border-2 border-background",
                    activity.isCompleted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                  )}
                >
                  {activity.isCompleted ? <Check className="w-3 h-3" /> : <span className="text-[10px]">Y</span>}
                </div>
                {/* Partner status */}
                <Avatar className="w-6 h-6 border-2 border-background">
                  {activity.partnerCompleted ? (
                    <div className="w-full h-full bg-primary text-primary-foreground flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                  ) : (
                    <>
                      <AvatarImage src={partner.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-[10px] bg-muted">{partner.name.charAt(0)}</AvatarFallback>
                    </>
                  )}
                </Avatar>
              </div>
              <span className="text-xs text-muted-foreground">
                {activity.isCompleted && activity.partnerCompleted
                  ? "Both completed"
                  : activity.isCompleted
                    ? "Waiting for partner"
                    : activity.partnerCompleted
                      ? "Partner completed"
                      : "Not started"}
              </span>
            </div>

            {/* Due Date */}
            {activity.dueDate && !isCompleted && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                <Clock className="w-3 h-3" />
                {new Date(activity.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
