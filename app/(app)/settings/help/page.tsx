"use client"

import { useState } from "react"
import { ArrowLeft, HelpCircle, Mail, MessageCircle, Book, ChevronRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function HelpSettingsPage() {
  const [showContactForm, setShowContactForm] = useState(false)
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    email: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Send to backend
    console.log("Support request:", formData)
    alert("Thank you! We'll get back to you soon.")
    setFormData({ subject: "", message: "", email: "" })
    setShowContactForm(false)
  }

  const helpSections = [
    {
      icon: Book,
      title: "Getting Started Guide",
      description: "Learn how to use Matrimony by Hana",
      href: "#",
    },
    {
      icon: MessageCircle,
      title: "FAQs",
      description: "Frequently asked questions",
      href: "#",
    },
    {
      icon: Mail,
      title: "Contact Support",
      description: "Send us a message",
      action: () => setShowContactForm(true),
    },
  ]

  const faqs = [
    {
      question: "How do I invite my partner?",
      answer: "Go to Couple Settings and click 'Invite New Partner'. Your partner will receive an email invitation.",
    },
    {
      question: "Can I change my church affiliation?",
      answer: "Yes, you can update your church affiliation in Settings > Church Affiliation at any time.",
    },
    {
      question: "How do I save messages?",
      answer: "Hover over any message in the chat and click the bookmark icon to save it to your Memory Box.",
    },
    {
      question: "What if I forget my password?",
      answer: "Use the 'Forgot Password' link on the login page to reset your password via email.",
    },
  ]

  return (
    <div className="space-y-6 -mx-4 -mt-4">
      {/* Header */}
      <div className="glass-strong px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
        <Link href="/settings" className="w-10 h-10 rounded-xl bg-background flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2 flex-1">
          <HelpCircle className="w-5 h-5 text-primary" />
          <h1 className="font-medium text-foreground">Help & Support</h1>
        </div>
      </div>

      <div className="px-4 space-y-6 pb-8">
        {/* Help Sections */}
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Resources</h2>
          <div className="glass rounded-2xl overflow-hidden">
            {helpSections.map((section, idx) => (
              <button
                key={section.title}
                onClick={section.action}
                className={`w-full flex items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-muted/50 ${
                  idx !== helpSections.length - 1 ? "border-b border-border/50" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{section.title}</p>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        {showContactForm && (
          <div className="glass rounded-2xl p-5 space-y-4 animate-fade-in-up">
            <h2 className="font-medium text-foreground">Contact Support</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Your Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12 rounded-xl"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="h-12 rounded-xl"
                  placeholder="What can we help you with?"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="min-h-[120px] rounded-xl"
                  placeholder="Describe your issue or question..."
                  required
                />
              </div>
              <div className="flex gap-3">
                <Button type="submit" className="flex-1 h-12 rounded-xl">
                  Send Message
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowContactForm(false)}
                  className="h-12 rounded-xl"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Frequently Asked Questions</h2>
          <div className="glass rounded-2xl overflow-hidden">
            {faqs.map((faq, idx) => (
              <div
                key={faq.question}
                className={`px-4 py-4 ${idx !== faqs.length - 1 ? "border-b border-border/50" : ""}`}
              >
                <p className="font-medium text-foreground mb-2">{faq.question}</p>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Help */}
        <div className="glass rounded-2xl p-5 text-center space-y-3">
          <p className="text-sm text-foreground">Need more help?</p>
          <Button variant="outline" className="w-full h-12 rounded-xl" asChild>
            <a href="mailto:support@matrimonybyhana.com" target="_blank" rel="noopener noreferrer">
              <Mail className="w-4 h-4 mr-2" />
              Email Us Directly
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

