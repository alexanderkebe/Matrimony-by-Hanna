"use client"

import { useState, use } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, X, Award } from "lucide-react"
import Link from "next/link"
import { mockQuiz, mockCourses } from "@/lib/mock-data"
import { notFound } from "next/navigation"
import { cn } from "@/lib/utils"

interface QuizPageProps {
  params: Promise<{ quizId: string }>
}

export default function QuizPage({ params }: QuizPageProps) {
  const { quizId } = use(params)
  const quiz = mockQuiz.id === quizId ? mockQuiz : null
  const course = mockCourses.find((c) => c.id === quiz?.courseId)

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)

  if (!quiz || !course) {
    notFound()
  }

  const question = quiz.questions[currentQuestion]
  const isLastQuestion = currentQuestion === quiz.questions.length - 1

  const handleSelectAnswer = (index: number) => {
    setSelectedAnswer(index)
  }

  const handleNext = () => {
    if (selectedAnswer === null) return

    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)

    if (isLastQuestion) {
      setShowResult(true)
    } else {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    }
  }

  const score = answers.reduce((acc, answer, idx) => {
    return acc + (answer === quiz.questions[idx].correctAnswer ? 1 : 0)
  }, 0)

  const percentage = Math.round((score / quiz.questions.length) * 100)

  if (showResult) {
    return (
      <div className="space-y-6 -mx-4 -mt-4 min-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="glass-strong px-4 py-3 flex items-center gap-3">
          <Link href="/quizzes" className="w-10 h-10 rounded-xl bg-background flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-medium text-foreground flex-1">Quiz Results</h1>
        </div>

        {/* Result */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <div
            className={cn(
              "w-24 h-24 rounded-full flex items-center justify-center mb-6",
              percentage >= 70 ? "bg-primary/10" : "bg-destructive/10",
            )}
          >
            {percentage >= 70 ? (
              <Award className="w-12 h-12 text-primary" />
            ) : (
              <X className="w-12 h-12 text-destructive" />
            )}
          </div>

          <h2 className="font-serif text-3xl font-semibold text-foreground">{percentage}%</h2>
          <p className="text-muted-foreground mt-2">
            You got {score} out of {quiz.questions.length} questions correct
          </p>

          {percentage >= 70 ? (
            <p className="text-primary font-medium mt-4">Great job! You passed the quiz!</p>
          ) : (
            <p className="text-muted-foreground mt-4">Keep learning and try again</p>
          )}

          {/* Answer Summary */}
          <div className="w-full mt-8 space-y-2">
            {quiz.questions.map((q, idx) => (
              <div
                key={q.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl",
                  answers[idx] === q.correctAnswer ? "bg-primary/10" : "bg-destructive/10",
                )}
              >
                {answers[idx] === q.correctAnswer ? (
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <X className="w-5 h-5 text-destructive flex-shrink-0" />
                )}
                <span className="text-sm text-foreground text-left truncate">
                  Q{idx + 1}: {q.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="px-4 pb-8 space-y-3">
          <Button asChild className="w-full h-14 rounded-2xl">
            <Link href={`/courses/${course.id}`}>Continue Learning</Link>
          </Button>
          <Button asChild variant="outline" className="w-full h-14 rounded-2xl bg-transparent">
            <Link href="/quizzes">Back to Quizzes</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 -mx-4 -mt-4 min-h-[80vh] flex flex-col">
      {/* Header */}
      <div className="glass-strong px-4 py-3 flex items-center gap-3">
        <Link href="/quizzes" className="w-10 h-10 rounded-xl bg-background flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-medium text-foreground flex-1 truncate">{quiz.title}</h1>
        <span className="text-sm text-muted-foreground">
          {currentQuestion + 1}/{quiz.questions.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="px-4">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 px-4">
        <div className="glass rounded-2xl p-5 animate-fade-in-up">
          <h2 className="font-serif text-xl font-semibold text-foreground mb-6">{question.text}</h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectAnswer(idx)}
                className={cn(
                  "w-full p-4 rounded-xl text-left transition-all",
                  selectedAnswer === idx
                    ? "bg-primary text-primary-foreground"
                    : "bg-background/50 hover:bg-background/80 text-foreground",
                )}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium",
                      selectedAnswer === idx ? "bg-primary-foreground/20" : "bg-muted",
                    )}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="px-4 pb-8">
        <Button onClick={handleNext} disabled={selectedAnswer === null} className="w-full h-14 rounded-2xl text-base">
          {isLastQuestion ? "See Results" : "Next Question"}
        </Button>
      </div>
    </div>
  )
}
