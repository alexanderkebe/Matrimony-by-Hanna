"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-12 h-6" /> // Placeholder to prevent layout shift
  }

  const isDark = theme === "dark"

  return (
    <div className="flex items-center gap-2">
      <Sun className={`w-4 h-4 transition-colors ${!isDark ? "text-primary" : "text-muted-foreground"}`} />
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => {
          setTheme(checked ? "dark" : "light")
        }}
      />
      <Moon className={`w-4 h-4 transition-colors ${isDark ? "text-primary" : "text-muted-foreground"}`} />
    </div>
  )
}

