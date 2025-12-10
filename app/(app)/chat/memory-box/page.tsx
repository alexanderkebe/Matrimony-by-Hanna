import { ArrowLeft, Bookmark, Calendar } from "lucide-react"
import Link from "next/link"
import { mockMessages, mockCouple, mockUser } from "@/lib/mock-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

export default function MemoryBoxPage() {
  const savedMessages = mockMessages.filter((m) => m.isSaved)

  return (
    <div className="space-y-6 -mx-4 -mt-4">
      {/* Header */}
      <div className="glass-strong px-4 py-3 flex items-center gap-3">
        <Link href="/chat" className="w-10 h-10 rounded-xl bg-background flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2 flex-1">
          <Bookmark className="w-5 h-5 text-primary" />
          <h1 className="font-medium text-foreground">Memory Box</h1>
        </div>
      </div>

      {/* Saved Messages */}
      <div className="px-4 space-y-4">
        {savedMessages.length > 0 ? (
          savedMessages.map((message) => {
            const isOwn = message.senderId === mockUser.id
            const sender = isOwn ? mockUser : mockCouple.partner2

            return (
              <div key={message.id} className="glass rounded-2xl overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={sender.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">{sender.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{sender.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(message.timestamp).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <Bookmark className="w-4 h-4 fill-primary text-primary" />
                  </div>
                  {message.image && (
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-3">
                      <Image
                        src={message.image}
                        alt="Shared image"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  {message.text && <p className="text-foreground">{message.text}</p>}
                </div>
              </div>
            )
          })
        ) : (
          <div className="glass rounded-2xl p-8 text-center">
            <Bookmark className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="font-serif text-lg font-semibold text-foreground mb-2">No Saved Messages</h2>
            <p className="text-sm text-muted-foreground">
              Save special messages from your conversations to keep them here forever.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
