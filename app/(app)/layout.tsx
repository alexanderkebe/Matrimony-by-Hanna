import type React from "react"
import { MobileNav } from "@/components/layout/mobile-nav"
import { AppHeader } from "@/components/layout/app-header"
import { DesktopSidebar } from "@/components/layout/desktop-sidebar"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <DesktopSidebar />

      <AppHeader />

      <main className="px-4 py-4 pb-20 lg:pb-4 lg:ml-64 lg:px-8 lg:py-6 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>

      <MobileNav />
    </div>
  )
}
