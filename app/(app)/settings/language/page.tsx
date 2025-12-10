"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Globe, Check } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/lib/i18n/context"

const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "am", name: "Amharic", nativeName: "አማርኛ" },
]

export default function LanguageSettingsPage() {
  const { language, setLanguage, t } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState(language)

  useEffect(() => {
    setSelectedLanguage(language)
  }, [language])

  const handleSelectLanguage = (code: "en" | "am") => {
    setLanguage(code)
    setSelectedLanguage(code)
  }

  return (
    <div className="space-y-6 -mx-4 -mt-4">
      {/* Header */}
      <div className="glass-strong px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
        <Link href="/settings" className="w-10 h-10 rounded-xl bg-background flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2 flex-1">
          <Globe className="w-5 h-5 text-primary" />
          <h1 className="font-medium text-foreground">{t("settings.language")}</h1>
        </div>
      </div>

      {/* Language Options */}
      <div className="px-4">
        <div className="glass rounded-2xl overflow-hidden">
          {languages.map((language, idx) => (
            <button
              key={language.code}
              onClick={() => handleSelectLanguage(language.code as "en" | "am")}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-muted/50",
                idx !== languages.length - 1 && "border-b border-border/50",
              )}
            >
              <div className="flex-1">
                <p className="font-medium text-foreground">{language.name}</p>
                <p className="text-sm text-muted-foreground">{language.nativeName}</p>
              </div>
              {selectedLanguage === language.code && <Check className="w-5 h-5 text-primary" />}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mt-4 px-1">{t("settings.moreLanguagesSoon")}</p>
      </div>
    </div>
  )
}
