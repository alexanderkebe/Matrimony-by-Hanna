import { CourseHeader } from "@/components/courses/course-header"
import { ModuleList } from "@/components/courses/module-list"
import { mockCourses } from "@/lib/mock-data"
import { notFound } from "next/navigation"

interface CourseDetailPageProps {
  params: Promise<{ courseId: string }>
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { courseId } = await params
  const course = mockCourses.find((c) => c.id === courseId)

  if (!course) {
    notFound()
  }

  return (
    <div className="space-y-6 -mx-4 -mt-4">
      {/* Course Header with Image */}
      <CourseHeader course={course} />

      {/* Modules List */}
      <div className="px-4 space-y-4">
        <h2 className="font-serif text-xl font-semibold text-foreground">Course Content</h2>
        <ModuleList modules={course.modules} courseId={course.id} />
      </div>
    </div>
  )
}
