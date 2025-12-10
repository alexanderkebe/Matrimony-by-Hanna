import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { mockUser, mockCouple } from "@/lib/mock-data"
import {
  User,
  Users,
  Church,
  Bell,
  Globe,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Award,
  BookOpen,
  Heart,
} from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const stats = [
    { icon: BookOpen, label: "Courses", value: "2" },
    { icon: Heart, label: "Activities", value: "8" },
    { icon: Award, label: "Certificates", value: "0" },
  ]

  const menuItems = [
    { icon: User, label: "Edit Profile", href: "/settings/profile" },
    { icon: Users, label: "Couple Settings", href: "/settings/couple" },
    { icon: Church, label: "Church Affiliation", href: "/settings/church" },
    { icon: Bell, label: "Notifications", href: "/settings/notifications" },
    { icon: Globe, label: "Language", href: "/settings/language", value: "English" },
    { icon: Shield, label: "Privacy", href: "/settings/privacy" },
    { icon: HelpCircle, label: "Help & Support", href: "/settings/help" },
  ]

  return (
    <div className="space-y-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
      {/* Profile Card - Left Column on Desktop */}
      <div className="lg:col-span-1">
        <div className="glass rounded-3xl p-6 text-center animate-fade-in-up lg:sticky lg:top-6">
          <Avatar className="w-24 h-24 lg:w-32 lg:h-32 mx-auto border-4 border-primary/20">
            <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
            <AvatarFallback className="text-2xl lg:text-3xl bg-primary text-primary-foreground">
              {mockUser.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <h1 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground mt-4">{mockUser.name}</h1>
          <p className="text-muted-foreground">{mockUser.email}</p>

          {/* Partner Badge */}
          <div className="flex items-center justify-center gap-2 mt-3">
            <Avatar className="w-6 h-6">
              <AvatarImage src={mockCouple.partner2.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-xs">{mockCouple.partner2.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-primary">Partnered with {mockCouple.partner2.name}</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border/50">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-5 h-5 mx-auto text-primary mb-1" />
                <p className="text-xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items - Right Column on Desktop */}
      <div className="lg:col-span-2 space-y-6">
        <div className="glass rounded-3xl overflow-hidden animate-fade-in-up delay-100">
          {menuItems.map((item, idx) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-4 hover:bg-muted/50 transition-colors ${
                idx !== menuItems.length - 1 ? "border-b border-border/50" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="flex-1 font-medium text-foreground">{item.label}</span>
              {item.value && <span className="text-sm text-muted-foreground">{item.value}</span>}
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          ))}
        </div>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full lg:max-w-xs h-14 rounded-2xl glass border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive bg-transparent animate-fade-in-up delay-200"
          asChild
        >
          <Link href="/">
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Link>
        </Button>
      </div>
    </div>
  )
}
