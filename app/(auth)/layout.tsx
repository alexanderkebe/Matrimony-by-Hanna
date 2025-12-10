import type React from "react"
import { Logo } from "@/components/ui/logo"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-soft-cream flex flex-col">
      {/* Background Pattern */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url('/subtle-cross-pattern.jpg')`,
          backgroundSize: "200px",
        }}
      />

      {/* Header */}
      <header className="relative z-10 p-4">
        <Logo size="sm" />
      </header>

      {/* Content */}
      <main className="relative z-10 flex-1 flex flex-col px-4 pb-8">{children}</main>
    </div>
  )
}
