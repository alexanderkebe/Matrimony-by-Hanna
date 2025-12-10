"use client"

import { BookOpen, Check, Heart, Users, ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useTranslation } from "@/lib/i18n/context"

const courseFeatures = [
  {
    title: "Pre-Marriage Course",
    description: "Prepare for your journey together with faith-centered guidance",
    lessons: 12,
    duration: "6 weeks",
    image: "/images/pre-marriage-thumbnail.png",
    bgImage: "/ethiopian-couple-courtship-prayer.jpg",
  },
  {
    title: "Marriage Course",
    description: "Strengthen your marriage through spiritual growth and understanding",
    lessons: 10,
    duration: "5 weeks",
    image: "/images/marriage-thumbnail.png",
    bgImage: "/ethiopian-orthodox-wedding-couple-church.jpg",
  },
  {
    title: "Post-Wedding Course",
    description: "Continue growing together in faith and love",
    lessons: 8,
    duration: "4 weeks",
    image: "/images/post-wedding-thumbnail.png",
    bgImage: "/ethiopian-family-children-blessing.jpg",
  },
]

const benefits = [
  {
    icon: BookOpen,
    title: "Faith-Based Curriculum",
    description: "Content rooted in biblical principles and spiritual wisdom",
  },
  {
    icon: Heart,
    title: "Couple-Focused",
    description: "Designed for couples to learn and grow together",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with other couples on the same journey",
  },
  {
    icon: Play,
    title: "Video Lessons",
    description: "Engaging video content with practical exercises",
  },
]

export default function CoursesInfoPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background */}
      <section className="relative py-20 lg:py-32 overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/ethiopian-orthodox-wedding-ceremony-church.jpg"
            alt="Wedding Ceremony"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-primary/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 backdrop-blur-sm text-white mb-6 animate-fade-in delay-200">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-medium">Faith-Centered Learning</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 drop-shadow-lg animate-fade-in-up delay-300">
              Courses for Your Marriage Journey
            </h1>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md animate-fade-in-up delay-400">
              Strengthen your relationship through guided spiritual learning designed specifically for couples
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-500">
              <Button asChild size="lg" className="rounded-2xl shadow-xl hover:scale-105 transition-transform">
                <Link href="/register">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-2xl bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Overview */}
      <section className="py-16 lg:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/10 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Our Course Offerings
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive courses designed to guide you through every stage of your relationship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {courseFeatures.map((course, idx) => (
              <div
                key={idx}
                className="glass rounded-3xl overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-500 flex flex-col group animate-fade-in-up"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="relative h-64 bg-muted overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-2 text-white text-sm">
                      <Play className="w-4 h-4" />
                      <span>Watch Preview</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{course.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {course.lessons} lessons
                    </span>
                    <span>•</span>
                    <span>{course.duration}</span>
                  </div>
                  <Button asChild variant="outline" className="w-full rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Link href="/register">Learn More</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section with Background */}
      <section className="py-16 lg:py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/couple-praying-together-church-candles.jpg"
            alt="Prayer Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Why Choose Our Courses?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience learning designed specifically for couples seeking spiritual growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="glass rounded-2xl p-6 text-center hover:scale-105 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 hover:scale-110 hover:rotate-6 transition-transform">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/ethiopian-orthodox-wedding-couple-church.jpg"
            alt="Wedding Couple"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="glass rounded-3xl p-8 lg:p-12 text-center max-w-3xl mx-auto backdrop-blur-xl border-white/20 animate-fade-in-up">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white mb-4">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-white/90 mb-8">
              Join hundreds of couples who are growing together in faith and love
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-2xl shadow-xl hover:scale-105 transition-transform">
                <Link href="/register">
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-2xl bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all">
                <Link href="/login">Already have an account? Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
