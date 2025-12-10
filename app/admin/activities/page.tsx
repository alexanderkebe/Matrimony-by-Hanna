"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Heart, HandHeart, MessageCircle, Sparkles, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Mock data - Replace with actual API calls
const mockActivities = [
  {
    id: 1,
    title: "Weekly Prayer Together",
    type: "prayer",
    description: "Set aside time each week to pray together",
    completed: 1247,
    total: 1800,
    status: "active",
  },
  {
    id: 2,
    title: "Gratitude Journal",
    type: "journal",
    description: "Write down things you're grateful for",
    completed: 892,
    total: 1500,
    status: "active",
  },
  {
    id: 3,
    title: "Date Night Discussion",
    type: "discussion",
    description: "Discuss your week and share your thoughts",
    completed: 678,
    total: 1200,
    status: "active",
  },
  {
    id: 4,
    title: "Acts of Service",
    type: "weekly-task",
    description: "Do something kind for your partner",
    completed: 1456,
    total: 2000,
    status: "active",
  },
]

const iconMap = {
  prayer: HandHeart,
  journal: Heart,
  discussion: MessageCircle,
  "weekly-task": Sparkles,
}

export default function AdminActivitiesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredActivities = mockActivities.filter((activity) =>
    activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">Activity Management</h1>
          <p className="text-muted-foreground mt-1">Manage couple activities</p>
        </div>
        <Button className="h-12 rounded-xl gap-2">
          <Plus className="w-4 h-4" />
          Add Activity
        </Button>
      </div>

      {/* Search */}
      <div className="glass rounded-2xl p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl"
          />
        </div>
      </div>

      {/* Activities List */}
      <div className="space-y-4">
        {filteredActivities.map((activity) => {
          const IconComponent = iconMap[activity.type as keyof typeof iconMap] || Heart
          const completionRate = Math.round((activity.completed / activity.total) * 100)

          return (
            <div key={activity.id} className="glass rounded-2xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-serif text-lg font-semibold text-foreground">{activity.title}</h3>
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">
                        {activity.type.replace("-", " ")}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>
                    <div className="flex items-center gap-6 text-sm">
                      <div>
                        <span className="text-muted-foreground">Completed: </span>
                        <span className="font-medium text-foreground">{activity.completed}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Total: </span>
                        <span className="font-medium text-foreground">{activity.total}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Rate: </span>
                        <span className="font-medium text-primary">{completionRate}%</span>
                      </div>
                    </div>
                    <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm" className="rounded-xl">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-xl text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredActivities.length === 0 && (
        <div className="glass rounded-2xl p-12 text-center">
          <p className="text-muted-foreground">No activities found matching your search.</p>
        </div>
      )}
    </div>
  )
}

