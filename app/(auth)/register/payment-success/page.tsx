"use client"

import { CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"success" | "pending" | "failed">("pending")

  useEffect(() => {
    const statusParam = searchParams.get("status")
    if (statusParam === "success") {
      setStatus("success")
    } else if (statusParam === "failed") {
      setStatus("failed")
    } else {
      // Default to success if no status param (Chapa redirect)
      setStatus("success")
    }
  }, [searchParams])

  if (status === "pending") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full px-4">
        <div className="text-center animate-fade-in-up">
          <div className="w-16 h-16 rounded-full bg-muted animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Processing payment...</p>
        </div>
      </div>
    )
  }

  if (status === "failed") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full px-4">
        <div className="text-center space-y-6 animate-fade-in-up">
          <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
            <span className="text-4xl">❌</span>
          </div>
          <div>
            <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">Payment Failed</h1>
            <p className="text-muted-foreground">Your payment could not be processed. Please try again.</p>
          </div>
          <Button asChild className="w-full h-14 rounded-2xl">
            <Link href="/register">Try Again</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full px-4">
      <div className="text-center space-y-6 animate-fade-in-up">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Heading */}
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground">Your account has been activated</p>
        </div>

        {/* Message */}
        <div className="glass rounded-2xl p-6">
          <p className="text-sm text-muted-foreground">
            Thank you for your payment. Your subscription is now active and you have full access to all features.
            You can now start your journey together!
          </p>
        </div>

        {/* Action Button */}
        <Button asChild className="w-full h-14 rounded-2xl" size="lg">
          <Link href="/dashboard">
            Go to Dashboard
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full px-4">
        <div className="text-center animate-fade-in-up">
          <div className="w-16 h-16 rounded-full bg-muted animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}

