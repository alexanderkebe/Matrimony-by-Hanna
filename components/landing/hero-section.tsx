"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"
import Link from "next/link"
import { Heart, BookOpen, Users, ChevronRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url('/images/hero-couple.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <header className="p-3 md:p-4 lg:p-6 flex items-center justify-between relative z-30">
          <Link href="/" className="relative z-30">
            <Logo size="sm" className="brightness-0 invert lg:scale-125 lg:ml-4" />
          </Link>
          <nav className="hidden lg:flex items-center gap-6 mr-4 relative z-30">
            <Link href="/about" className="text-white/90 hover:text-white transition-colors relative z-30">
              About
            </Link>
            <Link href="/learn/courses" className="text-white/90 hover:text-white transition-colors relative z-30">
              Courses
            </Link>
            <Link href="/login" className="text-white/90 hover:text-white transition-colors relative z-30">
              Sign In
            </Link>
            <Button asChild className="rounded-xl relative z-30">
              <Link href="/register">Get Started</Link>
            </Button>
          </nav>
        </header>

        {/* Hero Content */}
        <main className="flex-1 flex flex-col lg:flex-row items-center justify-center px-4 lg:px-16 text-center lg:text-left gap-8 lg:gap-16 relative z-20">
          <div className="max-w-lg mx-auto lg:mx-0 lg:max-w-xl space-y-4 lg:space-y-6 animate-fade-in-up relative z-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs text-white border border-white/30">
              <Heart className="w-3 h-3 text-primary" fill="currentColor" />
              <span>Faith-Centered Learning</span>
            </div>

            {/* Heading */}
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white leading-tight text-balance drop-shadow-lg">
              Grow Together in <span className="text-primary">Faith & Love</span>
            </h1>

            {/* Subheading */}
            <p className="text-white/90 text-base md:text-lg lg:text-xl leading-relaxed max-w-sm lg:max-w-md mx-auto lg:mx-0 text-pretty drop-shadow-md">
              Strengthen your marriage through guided spiritual learning for couples.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 lg:gap-4 justify-center lg:justify-start pt-2 relative z-20">
              <Button
                asChild
                size="lg"
                className="rounded-2xl px-6 lg:px-8 py-5 lg:py-6 text-sm lg:text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 relative z-20"
              >
                <Link href="/register">
                  Begin Your Journey
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-2xl px-6 lg:px-8 py-5 lg:py-6 text-sm lg:text-base font-medium bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 transition-all duration-300 relative z-20"
              >
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>

          {/* Features Preview - Shows on right side on desktop */}
          <div className="w-full max-w-sm lg:max-w-xs mx-auto lg:mx-0 px-4 lg:px-0 animate-fade-in-up delay-300 relative z-20">
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-2 lg:gap-3">
              <FeatureCard
                icon={<BookOpen className="w-4 h-4 lg:w-5 lg:h-5" />}
                label="Courses"
                description="Faith-based curriculum"
              />
              <FeatureCard
                icon={<Heart className="w-4 h-4 lg:w-5 lg:h-5" />}
                label="Activities"
                description="Couple exercises"
              />
              <FeatureCard
                icon={<Users className="w-4 h-4 lg:w-5 lg:h-5" />}
                label="Community"
                description="Church connection"
              />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-3 text-center">
          <p className="text-xs text-white/70">A ministry for couples seeking spiritual growth</p>
        </footer>
      </div>
    </section>
  )
}

function FeatureCard({ icon, label, description }: { icon: React.ReactNode; label: string; description?: string }) {
  const getHref = () => {
    if (label === "Courses") return "/learn/courses"
    if (label === "Activities") return "/learn/activities"
    if (label === "Community") return "/learn/community"
    return "#"
  }

  return (
    <Link
      href={getHref()}
      className="bg-white/15 backdrop-blur-md border border-white/20 rounded-xl p-3 lg:p-4 flex flex-col lg:flex-row items-center gap-1.5 lg:gap-3 hover:scale-105 hover:bg-white/25 transition-all duration-300 cursor-pointer"
    >
      <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-primary flex items-center justify-center text-white">
        {icon}
      </div>
      <div className="text-center lg:text-left">
        <span className="text-xs lg:text-sm font-medium text-white">{label}</span>
        {description && <p className="hidden lg:block text-xs text-white/70">{description}</p>}
      </div>
    </Link>
  )
}
