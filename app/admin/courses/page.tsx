"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Eye, BookOpen, Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

// Mock data - Replace with actual API calls
const mockCourses = [
  {
    id: "pre-marriage",
    title: "Pre-Marriage Course",
    description: "Prepare for your journey together",
    enrolled: 892,
    completed: 624,
    progress: 70,
    lessons: 12,
    status: "active",
  },
  {
    id: "marriage",
    title: "Marriage Course",
    description: "Strengthen your marriage",
    enrolled: 456,
    completed: 289,
    progress: 63,
    lessons: 10,
    status: "active",
  },
  {
    id: "post-wedding",
    title: "Post-Wedding Course",
    description: "Continue growing together",
    enrolled: 234,
    completed: 156,
    progress: 67,
    lessons: 8,
    status: "active",
  },
]

export default function AdminCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCourses = mockCourses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">Course Management</h1>
          <p className="text-muted-foreground mt-1">Manage courses and content</p>
        </div>
        <Button className="h-12 rounded-xl gap-2">
          <Plus className="w-4 h-4" />
          Add Course
        </Button>
      </div>

      {/* Search */}
      <div className="glass rounded-2xl p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="glass rounded-2xl p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  course.status === "active"
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {course.status}
              </span>
            </div>

            <div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-1">{course.title}</h3>
              <p className="text-sm text-muted-foreground">{course.description}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Enrolled
                </span>
                <span className="font-medium text-foreground">{course.enrolled}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Completed
                </span>
                <span className="font-medium text-foreground">{course.completed}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Lessons</span>
                <span className="font-medium text-foreground">{course.lessons}</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-primary">{course.progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-border/50">
              <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                <Eye className="w-4 h-4 mr-2" />
                View
              </Button>
              <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="rounded-xl text-destructive hover:text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="glass rounded-2xl p-12 text-center">
          <p className="text-muted-foreground">No courses found matching your search.</p>
        </div>
      )}
    </div>
  )
}

