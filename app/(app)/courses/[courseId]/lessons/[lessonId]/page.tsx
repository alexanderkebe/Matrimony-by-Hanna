import { LessonContent } from "@/components/courses/lesson-content"
import { mockCourses } from "@/lib/mock-data"
import { notFound } from "next/navigation"

interface LessonPageProps {
  params: Promise<{ courseId: string; lessonId: string }>
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { courseId, lessonId } = await params
  const course = mockCourses.find((c) => c.id === courseId)

  if (!course) {
    notFound()
  }

  // Find the lesson
  let currentLesson = null
  let currentModule = null
  let lessonIndex = 0
  let totalLessons = 0

  for (const mod of course.modules) {
    for (const lesson of mod.lessons) {
      totalLessons++
      if (lesson.id === lessonId) {
        currentLesson = lesson
        currentModule = mod
        lessonIndex = totalLessons
      }
    }
  }

  if (!currentLesson || !currentModule) {
    notFound()
  }

  // Find next lesson
  let foundCurrent = false
  let nextLesson = null
  for (const mod of course.modules) {
    for (const lesson of mod.lessons) {
      if (foundCurrent) {
        nextLesson = lesson
        break
      }
      if (lesson.id === lessonId) {
        foundCurrent = true
      }
    }
    if (nextLesson) break
  }

  return (
    <LessonContent
      course={course}
      module={currentModule}
      lesson={currentLesson}
      lessonIndex={lessonIndex}
      totalLessons={totalLessons}
      nextLessonId={nextLesson?.id}
    />
  )
}
