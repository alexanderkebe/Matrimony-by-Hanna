"use client"

import type { Course } from "@/lib/mock-data"
import { Progress } from "@/components/ui/progress"
import { Lock, Clock, BookOpen } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface CourseCardProps {
  course: Course
  delay?: number
  previousCourseName?: string | null
}

export function CourseCard({ course, delay = 0, previousCourseName }: CourseCardProps) {
  const totalLessons = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0)
  const completedLessons = course.modules.reduce((acc, mod) => acc + mod.lessons.filter((l) => l.isCompleted).length, 0)

  // Get course thumbnail
  const getCourseThumbnail = () => {
    const thumbnailMap: Record<string, string> = {
      "pre-marriage": "/images/pre-marriage-thumbnail.png",
      "marriage": "/images/marriage-thumbnail.png",
      "post-wedding": "/images/post-wedding-thumbnail.png",
    }
    return thumbnailMap[course.id] || course.image || "/placeholder.svg"
  }

  return (
    <Link
      href={course.isLocked ? "#" : `/courses/${course.id}`}
      className={cn(
        "block glass rounded-3xl overflow-hidden animate-fade-in-up transition-transform hover:scale-[1.02]",
        course.isLocked && "opacity-70 cursor-not-allowed",
      )}
      style={{ animationDelay: `${delay}ms` }}
      onClick={(e) => course.isLocked && e.preventDefault()}
    >
      <div className="flex gap-4 p-4">
        {/* Course Image */}
        <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
          <Image src={getCourseThumbnail()} alt={course.title} fill className="object-cover" />
          {course.isLocked && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
          )}
        </div>

        {/* Course Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-lg font-semibold text-foreground line-clamp-1">{course.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{course.description}</p>

          {/* Meta Info */}
          <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {totalLessons} lessons
            </span>
          </div>
        </div>
      </div>

      {course.isLocked ? (
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/30 dark:text-amber-400 px-3 py-2 rounded-xl">
            <Lock className="w-3.5 h-3.5 flex-shrink-0" />
            <span>
              Complete all lessons in <strong>{previousCourseName}</strong> to unlock
            </span>
          </div>
        </div>
      ) : course.progress > 0 ? (
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">
              {completedLessons}/{totalLessons} completed
            </span>
            <span className="text-primary font-medium">{course.progress}%</span>
          </div>
          <Progress value={course.progress} className="h-2 bg-primary/10" />
        </div>
      ) : null}
    </Link>
  )
}
