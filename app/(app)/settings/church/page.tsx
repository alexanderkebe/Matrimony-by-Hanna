"use client"

import { useState } from "react"
import { ArrowLeft, Church, Search, MapPin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { mockUser } from "@/lib/mock-data"

export default function ChurchSettingsPage() {
  const [churchName, setChurchName] = useState(mockUser.churchAffiliation || "")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSave = () => {
    // TODO: Save to backend
    console.log("Church updated:", churchName)
  }

  const popularChurches = [
    "St. Mary Ethiopian Orthodox Church",
    "Holy Trinity Ethiopian Orthodox Church",
    "St. George Ethiopian Orthodox Church",
    "St. Michael Ethiopian Orthodox Church",
    "St. Gabriel Ethiopian Orthodox Church",
  ]

  return (
    <div className="space-y-6 -mx-4 -mt-4">
      {/* Header */}
      <div className="glass-strong px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
        <Link href="/settings" className="w-10 h-10 rounded-xl bg-background flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2 flex-1">
          <Church className="w-5 h-5 text-primary" />
          <h1 className="font-medium text-foreground">Church Affiliation</h1>
        </div>
      </div>

      <div className="px-4 space-y-6 pb-8">
        {/* Current Church */}
        <div className="glass rounded-2xl p-5">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Current Church
          </h2>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Church className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{churchName || "Not set"}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                Your spiritual community
              </p>
            </div>
          </div>
        </div>

        {/* Search/Change Church */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="church">Church Name</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="church"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 rounded-xl pl-10"
                placeholder="Search for your church..."
              />
            </div>
          </div>

          {/* Popular Churches */}
          {!searchQuery && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Popular Churches</p>
              <div className="glass rounded-xl overflow-hidden">
                {popularChurches.map((church, idx) => (
                  <button
                    key={church}
                    onClick={() => setChurchName(church)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50 ${
                      idx !== popularChurches.length - 1 ? "border-b border-border/50" : ""
                    }`}
                  >
                    <Church className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">{church}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {searchQuery && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Search Results</p>
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  {popularChurches
                    .filter((church) => church.toLowerCase().includes(searchQuery.toLowerCase()))
                    .length > 0
                    ? "Select a church from the results above"
                    : "No churches found. Try a different search term."}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Save Button */}
        <Button onClick={handleSave} className="w-full h-12 rounded-xl" size="lg">
          Save Changes
        </Button>
      </div>
    </div>
  )
}

