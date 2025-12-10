import { QuizCard } from "@/components/quizzes/quiz-card"
import { mockCourses, mockQuiz } from "@/lib/mock-data"
import { Award } from "lucide-react"

export default function QuizzesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground">Quizzes & Certificates</h1>
        <p className="text-muted-foreground mt-1">Test your knowledge and earn achievements</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Certificates Preview */}
        <div className="glass rounded-3xl p-5 animate-fade-in-up delay-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Award className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground">Your Certificates</h3>
              <p className="text-sm text-muted-foreground">Complete courses to earn certificates</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-primary">0</p>
              <p className="text-xs text-muted-foreground">Earned</p>
            </div>
          </div>
        </div>

        {/* Available Quizzes */}
        <div className="space-y-3 animate-fade-in-up delay-200">
          <h2 className="font-serif text-lg font-semibold text-foreground">Available Quizzes</h2>
          <QuizCard quiz={mockQuiz} course={mockCourses[0]} />
        </div>
      </div>

      {/* Completed Quizzes */}
      <div className="space-y-3 animate-fade-in-up delay-300">
        <h2 className="font-serif text-lg font-semibold text-foreground">Completed</h2>
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-muted-foreground">No quizzes completed yet</p>
          <p className="text-sm text-muted-foreground mt-1">Complete lessons to unlock quizzes</p>
        </div>
      </div>
    </div>
  )
}
