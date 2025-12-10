"use client"

import type React from "react"

import type { Course, Module, Lesson } from "@/lib/mock-data"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Play, Check, ChevronRight, BookOpen, Share2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface LessonContentProps {
  course: Course
  module: Module
  lesson: Lesson
  lessonIndex: number
  totalLessons: number
  nextLessonId?: string
}

export function LessonContent({ course, module, lesson, lessonIndex, totalLessons, nextLessonId }: LessonContentProps) {
  const router = useRouter()
  const [isCompleted, setIsCompleted] = useState(lesson.isCompleted)
  const [reflection, setReflection] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [videoDuration, setVideoDuration] = useState(0)

  // Get thumbnail based on course and lesson
  const getThumbnail = () => {
    // Special case for specific lesson
    if (lesson.title === "Biblical Criteria for a Spouse") {
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

  // Calculate resume time from video progress
  const getResumeTime = () => {
    if (lesson.videoProgress && lesson.videoProgress > 0) {
      const parseDuration = (duration: string): number => {
        const match = duration.match(/(\d+)\s*min/)
        return match ? parseInt(match[1]) * 60 : 0
      }
      const totalSeconds = parseDuration(lesson.duration)
      return Math.floor((lesson.videoProgress / 100) * totalSeconds)
    }
    return 0
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget
    setCurrentTime(video.currentTime)
    setVideoDuration(video.duration)
    
    // Update progress (save to backend in real app)
    if (video.duration > 0) {
      const progress = (video.currentTime / video.duration) * 100
      // TODO: Save progress to backend
    }
  }

  const handleVideoEnded = () => {
    setIsPlaying(false)
    // TODO: Mark lesson as completed when video ends
  }

  const handleMarkComplete = () => {
    // TODO: Update lesson completion in backend
    setIsCompleted(true)
  }

  const handleNext = () => {
    if (nextLessonId) {
      router.push(`/courses/${course.id}/lessons/${nextLessonId}`)
    } else {
      router.push(`/courses/${course.id}`)
    }
  }

  return (
    <div className="space-y-6 -mx-4 -mt-4 pb-8">
      {/* Header */}
      <div className="glass-strong px-4 py-3 sticky top-0 z-30 flex items-center gap-3">
        <Link
          href={`/courses/${course.id}`}
          className="w-10 h-10 rounded-xl bg-background flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground truncate">{module.title}</p>
          <h1 className="font-medium text-foreground truncate">{lesson.title}</h1>
        </div>
        <span className="text-xs text-muted-foreground">
          {lessonIndex}/{totalLessons}
        </span>
      </div>

      {/* Video Player */}
      {lesson.type === "video" && (
        <div className="px-4 animate-fade-in-up">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-deep-charcoal">
            {!isPlaying ? (
              <>
                <Image
                  src={getThumbnail()}
                  alt={lesson.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="relative w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/50 flex items-center justify-center transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110 group-hover:border-white/70">
                    <Play className="w-10 h-10 text-white fill-white ml-1" />
                    <span className="sr-only">Play video</span>
                  </div>
                </button>
                {lesson.videoProgress && lesson.videoProgress > 0 && (
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                    <div className="h-1 flex-1 bg-white/30 rounded-full">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${lesson.videoProgress}%` }}
                      />
                    </div>
                    <span className="text-xs text-white">
                      {formatTime(getResumeTime())} / {lesson.duration}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <video
                src="/videos/lesson-sample.mp4"
                controls
                autoPlay
                className="w-full h-full object-cover"
                poster={getThumbnail()}
                onTimeUpdate={handleVideoTimeUpdate}
                onLoadedMetadata={(e) => {
                  const video = e.currentTarget
                  setVideoDuration(video.duration)
                  // Resume from saved position
                  if (lesson.videoProgress && lesson.videoProgress > 0) {
                    video.currentTime = getResumeTime()
                  }
                }}
                onEnded={handleVideoEnded}
                onPause={() => setIsPlaying(false)}
              />
            )}
            {isPlaying && (
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 pointer-events-none">
                <div className="h-1 flex-1 bg-white/30 rounded-full">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{
                      width: videoDuration > 0 ? `${(currentTime / videoDuration) * 100}%` : "0%",
                    }}
                  />
                </div>
                <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">
                  {formatTime(currentTime)} / {videoDuration > 0 ? formatTime(videoDuration) : lesson.duration}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reading Content */}
      {lesson.type === "reading" && (
        <div className="px-4 animate-fade-in-up">
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 text-primary mb-4">
              <BookOpen className="w-5 h-5" />
              <span className="text-sm font-medium">Reading Material</span>
            </div>
            <div className="prose prose-sm text-foreground">
              <p className="text-muted-foreground leading-relaxed">
                This lesson explores the deep spiritual connection that forms the foundation of a Christian marriage.
                Through scripture and reflection, you will discover how faith strengthens the bond between partners and
                creates a lasting union blessed by God.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Marriage is not merely a social contract, but a sacred covenant that mirrors the relationship between
                Christ and the Church. When we understand this profound truth, we begin to see our spouse through the
                lens of divine love and purpose.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Scripture Reference */}
      {lesson.scriptureReference && (
        <div className="px-4 animate-fade-in-up delay-100">
          <div className="bg-primary/10 rounded-2xl p-5 border-l-4 border-primary">
            <p className="text-xs text-primary font-medium uppercase tracking-wider mb-2">Scripture</p>
            <p className="font-serif text-lg text-foreground italic">{lesson.scriptureReference}</p>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              &ldquo;Husbands, love your wives, just as Christ loved the church and gave himself up for her...&rdquo;
            </p>
          </div>
        </div>
      )}

      {/* Personal Reflection */}
      <div className="px-4 animate-fade-in-up delay-200">
        <div className="glass rounded-2xl p-5">
          <h3 className="font-serif text-lg font-semibold text-foreground mb-3">Personal Reflection</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Take a moment to reflect on how this lesson applies to your marriage journey.
          </p>
          <Textarea
            placeholder="Write your thoughts..."
            value={reflection}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReflection(e.target.value)}
            className="min-h-[100px] rounded-xl bg-background/50 border-border/50"
          />
        </div>
      </div>

      {/* Discussion Prompt */}
      <div className="px-4 animate-fade-in-up delay-300">
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-serif text-lg font-semibold text-foreground">Discuss with Partner</h3>
            <Button variant="ghost" size="icon" className="rounded-xl">
              <Share2 className="w-4 h-4" />
              <span className="sr-only">Share with partner</span>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Share one way you can show Christ-like love to your spouse this week.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 pt-4 space-y-3 animate-fade-in-up delay-400">
        {!isCompleted ? (
          <Button
            onClick={handleMarkComplete}
            className="w-full h-14 rounded-2xl text-base bg-transparent"
            variant="outline"
          >
            <Check className="w-5 h-5 mr-2" />
            Mark as Complete
          </Button>
        ) : (
          <div className="flex items-center justify-center gap-2 py-3 text-primary">
            <Check className="w-5 h-5" />
            <span className="font-medium">Lesson Completed</span>
          </div>
        )}

        <Button onClick={handleNext} className="w-full h-14 rounded-2xl text-base">
          {nextLessonId ? (
            <>
              Continue to Next Lesson
              <ChevronRight className="w-5 h-5 ml-2" />
            </>
          ) : (
            "Back to Course"
          )}
        </Button>
      </div>
    </div>
  )
}
