import type { Course } from "@/lib/mock-data"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, BookOpen, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface CourseHeaderProps {
  course: Course
}

export function CourseHeader({ course }: CourseHeaderProps) {
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
    <div className="relative">
      {/* Background Image */}
      <div className="relative h-56">
        <Image src={getCourseThumbnail()} alt={course.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        {/* Back Button */}
        <Link
          href="/courses"
          className="absolute top-4 left-4 w-10 h-10 rounded-full glass flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
      </div>

      {/* Course Info Overlay */}
      <div className="relative -mt-20 px-4">
        <div className="glass-strong rounded-3xl p-5">
          <h1 className="font-serif text-2xl font-semibold text-foreground">{course.title}</h1>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{course.description}</p>

          {/* Meta Stats */}
          <div className="flex items-center gap-4 mt-4 text-sm">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-4 h-4" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <BookOpen className="w-4 h-4" />
              {totalLessons} lessons
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Award className="w-4 h-4" />
              Certificate
            </span>
          </div>

          {/* Progress */}
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Your Progress</span>
              <span className="text-primary font-medium">{course.progress}% Complete</span>
            </div>
            <Progress value={course.progress} className="h-2.5 bg-primary/10" />
            <p className="text-xs text-muted-foreground mt-2">
              {completedLessons} of {totalLessons} lessons completed
            </p>
          </div>

          {/* Continue Button */}
          <Button className="w-full mt-4 h-12 rounded-2xl" asChild>
            <Link href={`/courses/${course.id}/lessons/${course.modules[0]?.lessons[0]?.id || ""}`}>
              {course.progress > 0 ? "Continue Learning" : "Start Course"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
