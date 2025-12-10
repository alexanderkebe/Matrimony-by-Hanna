"use client"

import { useState, useEffect, Suspense } from "react"
import { Clock, Mail, CheckCircle, Heart, Send, MessageCircle, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useSearchParams } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock messages - Replace with actual API calls
const initialMessages = [
  {
    id: 1,
    sender: "Support Team",
    message: "Thank you for your payment submission. We have received your reference number and are processing your account activation.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isAdmin: true,
  },
]

function PendingApprovalContent() {
  const searchParams = useSearchParams()
  const referenceNumber = searchParams.get("ref") || ""
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedAt] = useState(new Date().toISOString())
  const [paymentData, setPaymentData] = useState<any>(null)

  useEffect(() => {
    // Load payment data from localStorage
    const stored = localStorage.getItem("pendingPayment")
    if (stored) {
      setPaymentData(JSON.parse(stored))
    }
  }, [])

  const hoursSinceSubmission = Math.floor(
    (new Date().getTime() - new Date(submittedAt).getTime()) / (1000 * 60 * 60)
  )
  const showContactInfo = hoursSinceSubmission >= 48

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    setIsSubmitting(true)

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: paymentData?.name || "You",
      message: newMessage,
      timestamp: new Date().toISOString(),
      isAdmin: false,
    }

    setMessages([...messages, userMessage])
    setNewMessage("")

    // TODO: Send to backend API
    // await fetch("/api/support/message", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     referenceNumber,
    //     message: newMessage,
    //     email: paymentData?.email,
    //   }),
    // })

    // Simulate admin response after delay
    setTimeout(() => {
      const adminResponse = {
        id: messages.length + 2,
        sender: "Support Team",
        message: "Thank you for your message. We will review your inquiry and get back to you soon.",
        timestamp: new Date().toISOString(),
        isAdmin: true,
      }
      setMessages((prev) => [...prev, adminResponse])
    }, 2000)

    setIsSubmitting(false)
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full px-4 py-8">
      <div className="w-full space-y-6 animate-fade-in-up">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <Clock className="w-12 h-12 text-primary animate-pulse" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">
            Thank You for Your Payment
          </h1>
          <p className="text-muted-foreground">Your account is pending approval</p>
        </div>

        {/* Payment Reference Card */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Payment Reference Number</p>
              <p className="font-mono font-semibold text-foreground text-lg">{referenceNumber || "N/A"}</p>
            </div>
          </div>
          <div className="pt-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              Submitted: {new Date(submittedAt).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Status: <span className="text-yellow-600 dark:text-yellow-400 font-medium">Pending Review</span>
            </p>
          </div>
        </div>

        {/* Main Message Card */}
        <div className="glass rounded-2xl p-6 space-y-4">
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-foreground mb-2">We Appreciate Your Patience</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We have received your payment information and are currently processing your account activation. 
                Our team is working diligently to verify your payment and activate your account.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-foreground mb-2">What Happens Next?</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Your payment will be verified by our admin team</li>
                <li>Account activation typically takes 24-48 hours</li>
                <li>You will receive an email notification once approved</li>
                <li>You can check your account status anytime</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Info (shown if > 48 hours) */}
        {showContactInfo && (
          <div className="glass rounded-2xl p-6 bg-yellow-500/5 border border-yellow-500/20 animate-fade-in-up">
            <div className="flex items-start gap-3 mb-4">
              <Mail className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground mb-2">Taking Longer Than Expected?</p>
                <p className="text-sm text-muted-foreground mb-4">
                  If it's been more than 48 hours, please feel free to contact us directly:
                </p>
                <div className="space-y-2">
                  <a
                    href="mailto:support@matrimonybyhana.com"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <Mail className="w-4 h-4" />
                    support@matrimonybyhana.com
                  </a>
                  <a
                    href="tel:+251911234567"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <Phone className="w-4 h-4" />
                    +251 911 234 567
                  </a>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    Addis Ababa, Ethiopia
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Messaging Interface */}
        <div className="glass rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="w-5 h-5 text-primary" />
            <h2 className="font-serif text-xl font-semibold text-foreground">Contact Support</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Have a question or need to provide additional information? Send us a message below.
          </p>

          {/* Messages List */}
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.isAdmin ? "flex-row" : "flex-row-reverse"}`}
              >
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className={msg.isAdmin ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}>
                    {msg.sender.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className={`flex-1 ${msg.isAdmin ? "" : "text-right"}`}>
                  <div
                    className={`inline-block rounded-2xl px-4 py-2 ${
                      msg.isAdmin
                        ? "bg-muted text-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <p className="text-sm font-medium mb-1">{msg.sender}</p>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 min-h-[80px] rounded-xl resize-none"
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              size="icon"
              className="h-[80px] w-[80px] rounded-xl flex-shrink-0"
              disabled={isSubmitting || !newMessage.trim()}
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button asChild className="w-full h-14 rounded-2xl">
            <Link href="/login">Go to Login</Link>
          </Button>
          <Button variant="outline" asChild className="w-full h-14 rounded-2xl">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>

        {/* Support Note */}
        <p className="text-xs text-muted-foreground text-center">
          Need immediate assistance? Contact us at{" "}
          <a href="mailto:support@matrimonybyhana.com" className="text-primary hover:underline">
            support@matrimonybyhana.com
          </a>
        </p>
      </div>
    </div>
  )
}

export default function PendingApprovalPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full px-4">
          <div className="text-center animate-fade-in-up">
            <div className="w-16 h-16 rounded-full bg-muted animate-pulse mx-auto mb-4" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      }
    >
      <PendingApprovalContent />
    </Suspense>
  )
}
