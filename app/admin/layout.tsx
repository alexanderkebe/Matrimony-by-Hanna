"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { LayoutDashboard, Users, CreditCard, BookOpen, Heart, BarChart3, Settings, LogOut, Award, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/ui/logo"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

const adminNavItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/users", icon: Users, label: "Users" },
  { href: "/admin/payments", icon: CreditCard, label: "Payments" },
  { href: "/admin/courses", icon: BookOpen, label: "Courses" },
  { href: "/admin/activities", icon: Heart, label: "Activities" },
  { href: "/admin/certificates", icon: Award, label: "Certificates" },
  { href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const SidebarContent = () => (
    <>
      <div className="p-4 lg:p-6 border-b border-border/50">
        <Logo size="md" />
        <p className="text-xs text-muted-foreground mt-2">Admin Portal</p>
      </div>

      <nav className="p-4 space-y-1">
        {adminNavItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border/50 mt-auto">
        <Link
          href="/dashboard"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Back to App</span>
        </Link>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-strong border-b border-border/50">
        <div className="flex items-center justify-between p-4">
          <Logo size="sm" />
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 glass-strong">
              <div className="flex flex-col h-full">
                <SidebarContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 glass-strong border-r border-border/50 z-40 overflow-y-auto flex-col">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}

