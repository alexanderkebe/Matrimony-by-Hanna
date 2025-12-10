"use client"

import { useState } from "react"
import { ActivityCard } from "@/components/activities/activity-card"
import { mockActivities, mockCouple } from "@/lib/mock-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Activity } from "@/lib/mock-data"

type ActivityFilter = "All" | "Weekly Tasks" | "Journal" | "Prayer" | "Discussion"

export default function ActivitiesPage() {
  const [selectedFilter, setSelectedFilter] = useState<ActivityFilter>("All")

  // Map filter button labels to activity types
  const getActivityType = (filter: ActivityFilter): Activity["type"] | null => {
    const typeMap: Record<string, Activity["type"]> = {
      "Weekly Tasks": "weekly-task",
      Journal: "journal",
      Prayer: "prayer",
      Discussion: "discussion",
    }
    return typeMap[filter] || null
  }

  // Filter activities by type
  const filterActivities = (activities: Activity[]) => {
    if (selectedFilter === "All") {
      return activities
    }
    const activityType = getActivityType(selectedFilter)
    return activities.filter((activity) => activity.type === activityType)
  }

  const allCompletedActivities = mockActivities.filter((a) => a.isCompleted && a.partnerCompleted)
  const allPendingActivities = mockActivities.filter((a) => !a.isCompleted || !a.partnerCompleted)

  const completedActivities = filterActivities(allCompletedActivities)
  const pendingActivities = filterActivities(allPendingActivities)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground">Couple Activities</h1>
        <p className="text-muted-foreground mt-1">Grow together through shared experiences</p>
      </div>

      {/* Couple Progress Card */}
      <div className="glass rounded-3xl p-5 animate-fade-in-up delay-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <Avatar className="w-10 h-10 border-2 border-background">
                <AvatarImage src={mockCouple.partner1.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {mockCouple.partner1.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Avatar className="w-10 h-10 border-2 border-background">
                <AvatarImage src={mockCouple.partner2.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                  {mockCouple.partner2.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Together Progress</p>
              <p className="text-xs text-muted-foreground">
                {allCompletedActivities.length} activities completed together
              </p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold text-primary">{allCompletedActivities.length}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
        </div>
      </div>

      {/* Activity Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 animate-fade-in-up delay-200">
        {(["All", "Weekly Tasks", "Journal", "Prayer", "Discussion"] as ActivityFilter[]).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedFilter(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedFilter === category
                ? "bg-primary text-primary-foreground"
                : "glass hover:bg-primary/10"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Pending Activities */}
      {pendingActivities.length > 0 && (
        <div className="space-y-3 animate-fade-in-up delay-300">
          <h2 className="font-serif text-lg font-semibold text-foreground">Pending</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pendingActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} partner={mockCouple.partner2} />
            ))}
          </div>
        </div>
      )}

      {/* Completed Activities */}
      {completedActivities.length > 0 && (
        <div className="space-y-3 animate-fade-in-up delay-400">
          <h2 className="font-serif text-lg font-semibold text-foreground">Completed Together</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {completedActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} partner={mockCouple.partner2} isCompleted />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {pendingActivities.length === 0 && completedActivities.length === 0 && (
        <div className="glass rounded-3xl p-8 text-center animate-fade-in-up delay-300">
          <p className="text-muted-foreground">
            {selectedFilter === "All"
              ? "No activities available at the moment."
              : `No ${selectedFilter.toLowerCase()} activities found.`}
          </p>
        </div>
      )}
    </div>
  )
}
