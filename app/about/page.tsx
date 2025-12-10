"use client"

import { Heart, BookOpen, Users, Church, ArrowRight, Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useTranslation } from "@/lib/i18n/context"

const values = [
  {
    icon: Heart,
    title: "Faith-Centered",
    description: "Everything we do is rooted in biblical principles and spiritual wisdom",
  },
  {
    icon: BookOpen,
    title: "Educational",
    description: "Comprehensive courses designed to guide couples through their journey",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building connections and support networks for couples",
  },
  {
    icon: Church,
    title: "Church-Aligned",
    description: "Supporting couples within their church communities",
  },
]

const mission = {
  title: "Our Mission",
  content:
    "Matrimony by Hana is a ministry dedicated to helping couples strengthen their relationships through faith-centered learning, meaningful activities, and community support. We believe that marriage is a sacred covenant that flourishes when couples grow together in faith, love, and understanding.",
}

const vision = {
  title: "Our Vision",
  content:
    "To see couples thriving in their marriages, deeply connected to each other and to God, serving as examples of Christ-like love in their families and communities.",
}

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background Image */}
      <section className="relative py-20 lg:py-32 overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/ethiopian-orthodox-wedding-couple-church.jpg"
            alt="Ethiopian Orthodox Wedding"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 backdrop-blur-sm text-white mb-6 animate-fade-in delay-200">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">About Us</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 drop-shadow-lg animate-fade-in-up delay-300">
              Matrimony by Hana
            </h1>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md animate-fade-in-up delay-400">
              A ministry for couples seeking spiritual growth and deeper connection in their marriage
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

      {/* Mission & Vision with Images */}
      <section className="py-16 lg:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="glass rounded-3xl p-8 hover:scale-105 transition-transform duration-300 animate-fade-in-up">
              <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
                <Image
                  src="/ethiopian-couple-courtship-prayer.jpg"
                  alt="Couple in Prayer"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">{mission.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{mission.content}</p>
            </div>
            <div className="glass rounded-3xl p-8 hover:scale-105 transition-transform duration-300 animate-fade-in-up delay-200">
              <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
                <Image
                  src="/ethiopian-family-children-blessing.jpg"
                  alt="Family Blessing"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">{vision.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{vision.content}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section with Background */}
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
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, idx) => (
              <div
                key={idx}
                className="glass rounded-2xl p-6 text-center hover:scale-105 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer with Images */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              What We Offer
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive resources for couples at every stage of their journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glass rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 group animate-fade-in-up">
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/10">
                <BookOpen className="w-16 h-16 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform" />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">Courses</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Faith-based curriculum for pre-marriage, marriage, and post-wedding stages
                </p>
                <Button asChild variant="outline" className="rounded-xl w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Link href="/learn/courses">Learn More</Link>
                </Button>
              </div>
            </div>

            <div className="glass rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 group animate-fade-in-up delay-200">
              <div className="relative h-48 bg-gradient-to-br from-accent/20 to-accent/10">
                <Heart className="w-16 h-16 text-accent absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform" />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">Activities</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Meaningful exercises and tasks designed for couples to complete together
                </p>
                <Button asChild variant="outline" className="rounded-xl w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <Link href="/learn/activities">Learn More</Link>
                </Button>
              </div>
            </div>

            <div className="glass rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 group animate-fade-in-up delay-400">
              <div className="relative h-48 bg-gradient-to-br from-secondary/20 to-secondary/10">
                <Users className="w-16 h-16 text-secondary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform" />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">Community</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect with other couples and share your journey together
                </p>
                <Button asChild variant="outline" className="rounded-xl w-full group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                  <Link href="/learn/community">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section with Background */}
      <section className="py-16 lg:py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/ethiopian-orthodox-wedding-ceremony-church.jpg"
            alt="Wedding Ceremony"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/10" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="glass rounded-3xl p-8 lg:p-12 text-center max-w-3xl mx-auto backdrop-blur-xl animate-fade-in-up">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Get in Touch
            </h2>
            <p className="text-muted-foreground mb-8">
              Have questions? We'd love to hear from you
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center gap-2 text-foreground">
                <span className="text-sm">Email:</span>
                <a href="mailto:support@matrimonybyhana.com" className="text-primary hover:underline font-medium">
                  support@matrimonybyhana.com
                </a>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-2xl shadow-lg hover:scale-105 transition-transform">
                <Link href="/register">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-2xl">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
