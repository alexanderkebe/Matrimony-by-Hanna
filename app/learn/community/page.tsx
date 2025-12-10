"use client"

import { Users, MessageCircle, Heart, Church, Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import { useTranslation } from "@/lib/i18n/context"

const communityFeatures = [
  {
    icon: Users,
    title: "Connect with Couples",
    description: "Join a community of couples on the same journey of faith and growth",
  },
  {
    icon: MessageCircle,
    title: "Share Experiences",
    description: "Share your journey and learn from others' experiences",
  },
  {
    icon: Heart,
    title: "Support Each Other",
    description: "Encourage and be encouraged by fellow couples",
  },
  {
    icon: Church,
    title: "Church Community",
    description: "Connect with couples from your church and beyond",
  },
]

const benefits = [
  "Share your journey with like-minded couples",
  "Get encouragement and support from the community",
  "Learn from others' experiences and insights",
  "Participate in group discussions and activities",
  "Build lasting friendships rooted in faith",
]

export default function CommunityInfoPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background */}
      <section className="relative py-20 lg:py-32 overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/ethiopian-orthodox-wedding-couple-church.jpg"
            alt="Wedding Couple"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/30 via-transparent to-secondary/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/20 backdrop-blur-sm text-white mb-6 animate-fade-in delay-200">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Community</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 drop-shadow-lg animate-fade-in-up delay-300">
              Join a Community of Faithful Couples
            </h1>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md animate-fade-in-up delay-400">
              Connect with other couples, share your journey, and grow together in faith and love
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-500">
              <Button asChild size="lg" className="rounded-2xl shadow-xl hover:scale-105 transition-transform">
                <Link href="/register">Join Community</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-2xl bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/10 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              What You'll Experience
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Be part of a supportive community of couples growing together
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {communityFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="glass rounded-2xl p-6 text-center hover:scale-105 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 hover:scale-110 hover:rotate-6 transition-transform">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
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
              Community Benefits
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Why join our community?
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="glass rounded-2xl p-6 flex items-center gap-4 hover:scale-105 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 hover:scale-110 hover:rotate-6 transition-transform">
                    <Check className="w-5 h-5" />
                  </div>
                  <p className="text-foreground font-medium">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/10 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              What Couples Are Saying
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="glass rounded-2xl p-6 hover:scale-105 hover:shadow-xl transition-all duration-300 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                  <AvatarImage src="/ethiopian-couple-courtship-prayer.jpg" alt="Solomon & Sarah" />
                  <AvatarFallback className="bg-primary text-primary-foreground">S&S</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">Solomon & Sarah</p>
                  <p className="text-xs text-muted-foreground">Pre-Marriage Course</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">
                "This community has been a blessing. We've learned so much and made wonderful friends."
              </p>
            </div>

            <div className="glass rounded-2xl p-6 hover:scale-105 hover:shadow-xl transition-all duration-300 animate-fade-in-up delay-200">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-12 h-12 ring-2 ring-accent/20">
                  <AvatarImage src="/ethiopian-orthodox-wedding-couple-church.jpg" alt="Daniel & Ruth" />
                  <AvatarFallback className="bg-accent text-accent-foreground">D&R</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">Daniel & Ruth</p>
                  <p className="text-xs text-muted-foreground">Marriage Course</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">
                "The support and encouragement from other couples has strengthened our marriage."
              </p>
            </div>

            <div className="glass rounded-2xl p-6 hover:scale-105 hover:shadow-xl transition-all duration-300 animate-fade-in-up delay-400">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-12 h-12 ring-2 ring-secondary/20">
                  <AvatarImage src="/ethiopian-orthodox-wedding-ceremony-church.jpg" alt="Michael & Mary" />
                  <AvatarFallback className="bg-secondary text-secondary-foreground">M&M</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">Michael & Mary</p>
                  <p className="text-xs text-muted-foreground">Post-Wedding Course</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">
                "We're grateful for this ministry and the community it has created."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/ethiopian-orthodox-wedding-ceremony-church.jpg"
            alt="Wedding Ceremony"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="glass rounded-3xl p-8 lg:p-12 text-center max-w-3xl mx-auto backdrop-blur-xl border-white/20 animate-fade-in-up">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white mb-4">
              Ready to Join?
            </h2>
            <p className="text-white/90 mb-8">
              Become part of a community of couples growing together in faith
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-2xl shadow-xl hover:scale-105 transition-transform">
                <Link href="/register">
                  Join Now
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
