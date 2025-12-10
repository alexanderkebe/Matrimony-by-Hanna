"use client"

import { useState } from "react"
import type { Course } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Play, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface CurrentLessonCardProps {
  course: Course
}

export function CurrentLessonCard({ course }: CurrentLessonCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)

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

  return (
    <div className="glass rounded-3xl overflow-hidden animate-fade-in-up delay-200">
      <div className="relative aspect-video">
        {!isPlaying ? (
          <>
            <Image src="/images/lesson-thumbnail.png" alt={currentLesson.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Play Button Overlay */}
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center group"
            >
              <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm border border-white/40 flex items-center justify-center transition-all duration-300 group-hover:bg-white/50 group-hover:scale-110">
                <Play className="w-7 h-7 text-white fill-white ml-1" />
              </div>
            </button>

            {/* Lesson info overlay */}
            <div className="absolute bottom-3 left-4 right-4">
              <p className="text-xs text-white/80">{currentModule.title}</p>
              <h3 className="font-serif text-lg font-semibold text-white">{currentLesson.title}</h3>
            </div>
          </>
        ) : (
          <video
            src="/videos/lesson-sample.mp4"
            controls
            autoPlay
            className="w-full h-full object-cover"
            poster="/images/lesson-thumbnail.png"
            onEnded={() => setIsPlaying(false)}
          />
        )}
      </div>

      {/* Lesson Info */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{currentLesson.duration}</span>
            {currentLesson.scriptureReference && (
              <>
                <span className="text-border">|</span>
                <span className="text-primary">{currentLesson.scriptureReference}</span>
              </>
            )}
          </div>
          <Button asChild size="sm" className="rounded-xl gap-2">
            <Link href={`/courses/${course.id}/lessons/${currentLesson.id}`}>
              <Play className="w-4 h-4" />
              Continue
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
