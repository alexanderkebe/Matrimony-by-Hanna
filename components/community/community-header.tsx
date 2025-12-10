import { Church, Users, ChevronRight } from "lucide-react"
import Link from "next/link"
import { mockUser } from "@/lib/mock-data"

export function CommunityHeader() {
  return (
    <div className="glass rounded-3xl p-5 animate-fade-in-up delay-100">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Church className="w-7 h-7 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-foreground">{mockUser.churchAffiliation || "Your Church"}</h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            24 couples enrolled
          </p>
        </div>
        <Link
          href="/community/church"
          className="w-10 h-10 rounded-xl bg-background flex items-center justify-center hover:bg-muted transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  )
}
