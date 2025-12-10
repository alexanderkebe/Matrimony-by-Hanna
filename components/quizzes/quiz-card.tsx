import type { Quiz, Course } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { HelpCircle, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface QuizCardProps {
  quiz: Quiz
  course: Course
}

export function QuizCard({ quiz, course }: QuizCardProps) {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="flex gap-4 p-4">
        {/* Course Image */}
        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
          <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
        </div>

        {/* Quiz Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground">{quiz.title}</h3>
          <p className="text-sm text-muted-foreground">{course.title}</p>
          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{quiz.questions.length} questions</span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <Button asChild className="w-full rounded-xl" variant={quiz.isCompleted ? "outline" : "default"}>
          <Link href={`/quizzes/${quiz.id}`}>
            {quiz.isCompleted ? "Retake Quiz" : "Start Quiz"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
