"use client"

import { useState, use } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Heart, Check, Share2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { mockActivities, mockCouple } from "@/lib/mock-data"
import { notFound } from "next/navigation"

interface ActivityDetailPageProps {
  params: Promise<{ activityId: string }>
}

export default function ActivityDetailPage({ params }: ActivityDetailPageProps) {
  const { activityId } = use(params)
  const activity = mockActivities.find((a) => a.id === activityId)
  const [isCompleted, setIsCompleted] = useState(activity?.isCompleted || false)
  const [response, setResponse] = useState("")

  if (!activity) {
    notFound()
  }

  const handleComplete = () => {
    // TODO: Save activity completion to backend
    setIsCompleted(true)
  }

  return (
    <div className="space-y-6 -mx-4 -mt-4">
      {/* Header */}
      <div className="glass-strong px-4 py-3 sticky top-0 z-30 flex items-center gap-3">
        <Link href="/activities" className="w-10 h-10 rounded-xl bg-background flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-medium text-foreground flex-1 truncate">{activity.title}</h1>
        <Button variant="ghost" size="icon" className="rounded-xl">
          <Share2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Activity Icon & Title */}
      <div className="px-4 text-center animate-fade-in-up">
        <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Heart className="w-10 h-10 text-primary" />
        </div>
        <h2 className="font-serif text-2xl font-semibold text-foreground">{activity.title}</h2>
        <p className="text-muted-foreground mt-2">{activity.description}</p>
      </div>

      {/* Partner Progress */}
      <div className="px-4 animate-fade-in-up delay-100">
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-medium text-foreground mb-3">Progress</h3>
          <div className="flex gap-4">
            {/* Your Progress */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isCompleted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {isCompleted ? <Check className="w-6 h-6" /> : <span className="text-sm">You</span>}
              </div>
              <span className="text-xs text-muted-foreground">{isCompleted ? "Completed" : "Not started"}</span>
            </div>

            {/* Divider */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-8 h-px bg-border" />
            </div>

            {/* Partner Progress */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <Avatar className="w-12 h-12">
                {activity.partnerCompleted ? (
                  <div className="w-full h-full bg-primary text-primary-foreground flex items-center justify-center rounded-full">
                    <Check className="w-6 h-6" />
                  </div>
                ) : (
                  <>
                    <AvatarImage src={mockCouple.partner2.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{mockCouple.partner2.name.charAt(0)}</AvatarFallback>
                  </>
                )}
              </Avatar>
              <span className="text-xs text-muted-foreground">
                {activity.partnerCompleted ? "Completed" : mockCouple.partner2.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Instructions */}
      <div className="px-4 animate-fade-in-up delay-200">
        <div className="glass rounded-2xl p-5">
          <h3 className="font-serif text-lg font-semibold text-foreground mb-3">How to Complete</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>1. Find a quiet moment with your partner</p>
            <p>2. Take turns sharing your thoughts on the prompt</p>
            <p>3. Listen actively without interrupting</p>
            <p>4. Reflect together on what you learned</p>
          </div>
        </div>
      </div>

      {/* Response Area */}
      <div className="px-4 animate-fade-in-up delay-300">
        <div className="glass rounded-2xl p-5">
          <h3 className="font-serif text-lg font-semibold text-foreground mb-3">Your Response</h3>
          <Textarea
            placeholder="Share your thoughts..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className="min-h-[120px] rounded-xl bg-background/50 border-border/50"
          />
        </div>
      </div>

      {/* Complete Button */}
      <div className="px-4 pb-8 animate-fade-in-up delay-400">
        {!isCompleted ? (
          <Button onClick={handleComplete} className="w-full h-14 rounded-2xl text-base">
            <Check className="w-5 h-5 mr-2" />
            Mark as Complete
          </Button>
        ) : (
          <div className="glass rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-primary mb-2">
              <Check className="w-5 h-5" />
              <span className="font-medium">You completed this activity!</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {activity.partnerCompleted
                ? "Great job! You both completed this activity."
                : "Waiting for your partner to complete their part."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
