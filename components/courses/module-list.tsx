"use client"

import type { Module } from "@/lib/mock-data"
import { useState } from "react"
import { Check, ChevronDown, Play, BookOpen, Pencil, Lock } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ModuleListProps {
  modules: Module[]
  courseId: string
}

export function ModuleList({ modules, courseId }: ModuleListProps) {
  const [expandedModule, setExpandedModule] = useState<string | null>(modules[0]?.id || null)

  return (
    <div className="space-y-3">
      {modules.map((module, moduleIdx) => {
        const isExpanded = expandedModule === module.id
        const completedCount = module.lessons.filter((l) => l.isCompleted).length
        const isLocked = moduleIdx > 0 && !modules[moduleIdx - 1].isCompleted

        return (
          <div key={module.id} className="glass rounded-2xl overflow-hidden animate-fade-in-up">
            {/* Module Header */}
            <button
              onClick={() => setExpandedModule(isExpanded ? null : module.id)}
              className={cn(
                "w-full flex items-center gap-3 p-4 text-left transition-colors",
                isLocked && "opacity-60 cursor-not-allowed",
              )}
              disabled={isLocked}
            >
              {/* Module Status Icon */}
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                  module.isCompleted ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary",
                )}
              >
                {isLocked ? (
                  <Lock className="w-5 h-5" />
                ) : module.isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="font-medium">{moduleIdx + 1}</span>
                )}
              </div>

              {/* Module Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground">{module.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {completedCount}/{module.lessons.length} lessons completed
                </p>
              </div>

              {/* Expand Icon */}
              <ChevronDown
                className={cn("w-5 h-5 text-muted-foreground transition-transform", isExpanded && "rotate-180")}
              />
            </button>

            {/* Lessons List */}
            {isExpanded && !isLocked && (
              <div className="px-4 pb-4 space-y-2">
                {module.lessons.map((lesson, lessonIdx) => {
                  const LessonIcon = lesson.type === "video" ? Play : lesson.type === "reading" ? BookOpen : Pencil

                  return (
                    <Link
                      key={lesson.id}
                      href={`/courses/${courseId}/lessons/${lesson.id}`}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl transition-colors",
                        lesson.isCompleted ? "bg-primary/5" : "bg-background/50 hover:bg-background/80",
                      )}
                    >
                      {/* Lesson Status */}
                      <div
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                          lesson.isCompleted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                        )}
                      >
                        {lesson.isCompleted ? <Check className="w-4 h-4" /> : <LessonIcon className="w-4 h-4" />}
                      </div>

                      {/* Lesson Info */}
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            "text-sm font-medium",
                            lesson.isCompleted ? "text-muted-foreground" : "text-foreground",
                          )}
                        >
                          {lesson.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                      </div>

                      {/* Lesson Number */}
                      <span className="text-xs text-muted-foreground">{lessonIdx + 1}</span>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
