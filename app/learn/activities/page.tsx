"use client"

import { Heart, HandHeart, MessageCircle, Sparkles, Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useTranslation } from "@/lib/i18n/context"

const activityTypes = [
  {
    icon: Sparkles,
    title: "Weekly Tasks",
    description: "Meaningful activities designed to strengthen your bond and deepen your connection",
    examples: ["Acts of service", "Quality time together", "Shared goals"],
    image: "/ethiopian-couple-courtship-prayer.jpg",
  },
  {
    icon: Heart,
    title: "Journal",
    description: "Reflect on your journey together and document your growth as a couple",
    examples: ["Gratitude entries", "Reflection prompts", "Memory keeping"],
    image: "/couple-praying-together-church-candles.jpg",
  },
  {
    icon: HandHeart,
    title: "Prayer",
    description: "Pray together and grow in your spiritual life as a couple",
    examples: ["Prayer guides", "Scripture meditation", "Prayer requests"],
    image: "/ethiopian-orthodox-wedding-couple-church.jpg",
  },
  {
    icon: MessageCircle,
    title: "Discussion",
    description: "Engage in meaningful conversations that bring you closer",
    examples: ["Discussion prompts", "Deep questions", "Faith conversations"],
    image: "/ethiopian-family-children-blessing.jpg",
  },
]

const features = [
  "Complete activities together with your partner",
  "Track your progress and celebrate milestones",
  "Reflect on your growth journey",
  "Connect with other couples in the community",
]

export default function ActivitiesInfoPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background */}
      <section className="relative py-20 lg:py-32 overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/ethiopian-couple-courtship-prayer.jpg"
            alt="Couple in Prayer"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-accent/30 via-transparent to-accent/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 backdrop-blur-sm text-white mb-6 animate-fade-in delay-200">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">Couple Activities</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 drop-shadow-lg animate-fade-in-up delay-300">
              Grow Together Through Shared Experiences
            </h1>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md animate-fade-in-up delay-400">
              Engage in meaningful activities designed to strengthen your relationship and deepen your spiritual connection
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

      {/* Activity Types with Images */}
      <section className="py-16 lg:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/10 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Types of Activities
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore various activities designed to help you grow together
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {activityTypes.map((activity, idx) => (
              <div
                key={idx}
                className="glass rounded-3xl overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-500 group animate-fade-in-up"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="relative h-48">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <activity.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-white mb-2">{activity.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">{activity.description}</p>
                  <div className="space-y-2">
                    {activity.examples.map((example, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Background */}
      <section className="py-16 lg:py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/ethiopian-orthodox-wedding-ceremony-church.jpg"
            alt="Wedding Ceremony Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple steps to start growing together
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="glass rounded-2xl p-6 flex items-center gap-4 hover:scale-105 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-semibold flex-shrink-0 hover:scale-110 hover:rotate-6 transition-transform">
                    {idx + 1}
                  </div>
                  <p className="text-foreground font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/ethiopian-family-children-blessing.jpg"
            alt="Family Blessing"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="glass rounded-3xl p-8 lg:p-12 text-center max-w-3xl mx-auto backdrop-blur-xl border-white/20 animate-fade-in-up">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white mb-4">
              Start Your Journey Together
            </h2>
            <p className="text-white/90 mb-8">
              Join couples who are strengthening their relationships through shared activities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-2xl shadow-xl hover:scale-105 transition-transform">
                <Link href="/register">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-2xl bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
