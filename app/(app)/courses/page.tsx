"use client"

import { useState } from "react"
import { CourseCard } from "@/components/courses/course-card"
import { mockCourses, isCourseUnlocked, getPreviousCourseName } from "@/lib/mock-data"
import type { Course } from "@/lib/mock-data"
import { useTranslation } from "@/lib/i18n/context"

type FilterCategory = "All" | "In Progress" | "Completed" | "New"

export default function CoursesPage() {
  const { t } = useTranslation()
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>("All")

  const coursesWithLockStatus = mockCourses.map((course) => ({
    ...course,
    isLocked: !isCourseUnlocked(course.id, mockCourses),
    previousCourseName: getPreviousCourseName(course.id, mockCourses),
  }))

  // Filter courses based on selected category
  const filterCourses = (courses: (Course & { isLocked: boolean; previousCourseName: string | null })[]) => {
    switch (selectedFilter) {
      case "In Progress":
        return courses.filter((course) => course.progress > 0 && course.progress < 100)
      case "Completed":
        return courses.filter((course) => course.progress === 100)
      case "New":
        return courses.filter((course) => course.progress === 0)
      case "All":
      default:
        return courses
    }
  }

  const filteredCourses = filterCourses(coursesWithLockStatus)
  const categories: FilterCategory[] = ["All", "In Progress", "Completed", "New"]
  
  const getCategoryLabel = (category: FilterCategory) => {
    switch (category) {
      case "All":
        return t("courses.all")
      case "In Progress":
        return t("courses.inProgress")
      case "Completed":
        return t("courses.completed")
      case "New":
        return t("courses.new")
      default:
        return category
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground">{t("courses.courses")}</h1>
        <p className="text-muted-foreground mt-1">{t("courses.exploreFaithCentered")}</p>
      </div>

      {/* Course Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 animate-fade-in-up delay-100">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedFilter(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedFilter === category
                ? "bg-primary text-primary-foreground"
                : "glass hover:bg-primary/10"
            }`}
          >
            {getCategoryLabel(category)}
          </button>
        ))}
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredCourses.map((course, idx) => (
            <CourseCard
              key={course.id}
              course={course}
              delay={idx * 100}
              previousCourseName={course.previousCourseName}
            />
          ))}
        </div>
      ) : (
        <div className="glass rounded-3xl p-8 text-center animate-fade-in-up">
          <p className="text-muted-foreground">
            {selectedFilter === "In Progress" && t("courses.noCoursesInProgress")}
            {selectedFilter === "Completed" && t("courses.noCompletedCourses")}
            {selectedFilter === "New" && t("courses.noNewCourses")}
            {selectedFilter === "All" && t("courses.noCoursesAvailable")}
          </p>
        </div>
      )}
    </div>
  )
}
