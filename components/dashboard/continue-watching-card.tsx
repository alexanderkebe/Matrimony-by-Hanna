"use client"

import { useState } from "react"
import type { Course } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Play, Clock, BookOpen } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"

interface ContinueWatchingCardProps {
  course: Course
}

export function ContinueWatchingCard({ course }: ContinueWatchingCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)

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

  // Find current lesson (first incomplete lesson)
  let currentLesson = null
  let currentModule = null

  for (const mod of course.modules) {
    for (const lesson of mod.lessons) {
      if (!lesson.isCompleted) {
        currentLesson = lesson
        currentModule = mod
        break
      }
    }
    if (currentLesson) break
  }

  if (!currentLesson || !currentModule) return null

  // Calculate progress percentage for the current lesson
  const completedLessons = course.modules.reduce(
    (acc, mod) => acc + mod.lessons.filter((l) => l.isCompleted).length,
    0,
  )
  const totalLessons = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0)
  const lessonProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

  return (
    <div className="glass rounded-3xl overflow-hidden animate-fade-in-up delay-200">
      <div className="relative aspect-video">
        {!isPlaying ? (
          <>
            <Image 
              src={getThumbnail(currentLesson.title)} 
              alt={currentLesson.title} 
              fill 
              className="object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Play Button Overlay */}
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center group"
            >
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/50 flex items-center justify-center transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110 group-hover:border-white/70">
                <Play className="w-10 h-10 text-white fill-white ml-1" />
              </div>
            </button>

            {/* Lesson info overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-white/80" />
                <p className="text-xs text-white/90 font-medium">{currentModule.title}</p>
              </div>
              <h3 className="font-serif text-xl font-semibold text-white mb-2">{currentLesson.title}</h3>
              {currentLesson.scriptureReference && (
                <p className="text-sm text-white/80 italic">{currentLesson.scriptureReference}</p>
              )}
            </div>
          </>
        ) : (
          <video
            src="/videos/lesson-sample.mp4"
            controls
            autoPlay
            className="w-full h-full object-cover"
            poster={getThumbnail(currentLesson.title)}
            onEnded={() => setIsPlaying(false)}
          />
        )}
      </div>

      {/* Card Content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{currentLesson.duration}</span>
            </div>
            <span className="text-border">•</span>
            <span className="text-sm text-muted-foreground">{course.title}</span>
          </div>
          <Button asChild size="sm" className="rounded-xl gap-2">
            <Link href={`/courses/${course.id}/lessons/${currentLesson.id}`}>
              <Play className="w-4 h-4" />
              Continue
            </Link>
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Course Progress</span>
            <span>{Math.round(lessonProgress)}%</span>
          </div>
          <Progress value={lessonProgress} className="h-2 bg-primary/10" />
        </div>
      </div>
    </div>
  )
}

