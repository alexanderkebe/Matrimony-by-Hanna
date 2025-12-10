"use client"

import type { Course } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Play, Clock, BookOpen, RotateCcw } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"

interface ResumeWatchingCardProps {
  course: Course
}

export function ResumeWatchingCard({ course }: ResumeWatchingCardProps) {
  // Find the lesson with video progress (where user paused)
  let pausedLesson = null
  let pausedModule = null

  for (const mod of course.modules) {
    for (const lesson of mod.lessons) {
      if (lesson.type === "video" && lesson.videoProgress && lesson.videoProgress > 0 && !lesson.isCompleted) {
        pausedLesson = lesson
        pausedModule = mod
        break
      }
    }
    if (pausedLesson) break
  }

  if (!pausedLesson || !pausedModule || !pausedLesson.videoProgress) return null

  // Get thumbnail based on course and lesson
  const getThumbnail = (lessonTitle: string) => {
    // Special case for specific lesson
    if (lessonTitle === "Biblical Criteria for a Spouse") {
      return "/images/biblical-criteria-thumbnail.png"
    }
    // Use course thumbnail
    const thumbnailMap: Record<string, string> = {
      "pre-marriage": "/images/pre-marriage-thumbnail.png",
      "marriage": "/images/marriage-thumbnail.png",
      "post-wedding": "/images/post-wedding-thumbnail.png",
    }
    return thumbnailMap[course.id] || "/images/lesson-thumbnail.png"
  }

  // Calculate time position (assuming 20 min = 1200 seconds for example)
  const parseDuration = (duration: string): number => {
    const match = duration.match(/(\d+)\s*min/)
    return match ? parseInt(match[1]) * 60 : 0
  }

  const totalSeconds = parseDuration(pausedLesson.duration)
  const watchedSeconds = Math.floor((pausedLesson.videoProgress / 100) * totalSeconds)
  const minutes = Math.floor(watchedSeconds / 60)
  const seconds = watchedSeconds % 60
  const watchedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`

  // Format last watched time
  const formatLastWatched = (timestamp?: string) => {
    if (!timestamp) return ""
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins} min ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`
  }

  return (
    <div className="glass rounded-3xl overflow-hidden animate-fade-in-up delay-100">
      <div className="relative aspect-video">
        <Image src={getThumbnail(pausedLesson.title)} alt={pausedLesson.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Progress Indicator Overlay */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/20">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${pausedLesson.videoProgress}%` }}
          />
        </div>

        {/* Play Button Overlay */}
        <Link
          href={`/courses/${course.id}/lessons/${pausedLesson.id}`}
          className="absolute inset-0 flex items-center justify-center group"
        >
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/50 flex items-center justify-center transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110 group-hover:border-white/70">
            <Play className="w-10 h-10 text-white fill-white ml-1" />
          </div>
        </Link>

        {/* Lesson info overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-white/80" />
            <p className="text-xs text-white/90 font-medium">{pausedModule.title}</p>
            {pausedLesson.lastWatchedAt && (
              <>
                <span className="text-white/60">•</span>
                <p className="text-xs text-white/70">{formatLastWatched(pausedLesson.lastWatchedAt)}</p>
              </>
            )}
          </div>
          <h3 className="font-serif text-xl font-semibold text-white mb-2">{pausedLesson.title}</h3>
          {pausedLesson.scriptureReference && (
            <p className="text-sm text-white/80 italic mb-2">{pausedLesson.scriptureReference}</p>
          )}
          {/* Time Progress */}
          <div className="flex items-center gap-2 text-sm text-white/90">
            <Clock className="w-4 h-4" />
            <span>
              {watchedTime} / {pausedLesson.duration}
            </span>
            <span className="text-white/60">•</span>
            <span>{pausedLesson.videoProgress}% watched</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <RotateCcw className="w-4 h-4" />
              <span>Resume from where you left off</span>
            </div>
          </div>
          <Button asChild size="sm" className="rounded-xl gap-2">
            <Link
              href={`/courses/${course.id}/lessons/${pausedLesson.id}?resume=true`}
              className="flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Resume
            </Link>
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Video Progress</span>
            <span>{pausedLesson.videoProgress}%</span>
          </div>
          <Progress value={pausedLesson.videoProgress} className="h-2 bg-primary/10" />
        </div>
      </div>
    </div>
  )
}

