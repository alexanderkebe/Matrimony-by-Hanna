"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Bookmark, Heart, MoreVertical } from "lucide-react"
import { mockMessages, mockCouple, mockUser } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function ChatPage() {
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      id: `m${messages.length + 1}`,
      senderId: mockUser.id,
      text: newMessage,
      timestamp: new Date().toISOString(),
      isSaved: false,
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const handleSaveMessage = (messageId: string) => {
    setMessages(messages.map((m) => (m.id === messageId ? { ...m, isSaved: !m.isSaved } : m)))
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const partner = mockCouple.partner2

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] lg:h-[calc(100vh-120px)] mx-0 mt-0 lg:max-w-4xl lg:mx-auto lg:rounded-3xl lg:overflow-hidden lg:glass lg:border lg:border-border/50">
      {/* Chat Header */}
      <div className="glass-strong lg:glass px-4 py-3 flex items-center gap-3 border-b border-border/50">
        <Avatar className="w-10 h-10">
          <AvatarImage src={partner.avatar || "/placeholder.svg"} alt={partner.name} />
          <AvatarFallback>{partner.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="font-medium text-foreground">{partner.name}</h1>
          <p className="text-xs text-primary">Your Partner</p>
        </div>
        <Button variant="ghost" size="icon" className="rounded-xl">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>

      {/* Reflection Prompt */}
      <div className="px-4 py-3 bg-primary/5 border-b border-border/50">
        <p className="text-sm text-center text-muted-foreground">
          <Heart className="w-4 h-4 inline mr-1 text-primary" />
          Today&apos;s reflection: What made you grateful for your partner this week?
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => {
          const isOwn = message.senderId === mockUser.id

          return (
            <div key={message.id} className={cn("flex gap-2", isOwn && "flex-row-reverse")}>
              {!isOwn && (
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src={partner.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs">{partner.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}

              <div className={cn("max-w-[75%] lg:max-w-[60%] group", isOwn && "items-end")}>
                <div
                  className={cn(
                    "rounded-2xl overflow-hidden",
                    isOwn ? "bg-primary text-primary-foreground rounded-br-md" : "glass text-foreground rounded-bl-md",
                    message.image ? "p-0" : "px-4 py-2.5",
                  )}
                >
                  {message.image && (
                    <div className="relative w-full aspect-video">
                      <Image
                        src={message.image}
                        alt="Shared image"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  {message.text && (
                    <p className={cn("text-sm leading-relaxed", message.image && "px-4 py-2.5")}>
                      {message.text}
                    </p>
                  )}
                </div>

                <div className={cn("flex items-center gap-2 mt-1", isOwn && "flex-row-reverse")}>
                  <span className="text-[10px] text-muted-foreground">{formatTime(message.timestamp)}</span>
                  <button
                    onClick={() => handleSaveMessage(message.id)}
                    className={cn(
                      "opacity-0 group-hover:opacity-100 transition-opacity",
                      message.isSaved && "opacity-100",
                    )}
                  >
                    <Bookmark
                      className={cn(
                        "w-3.5 h-3.5",
                        message.isSaved ? "fill-primary text-primary" : "text-muted-foreground",
                      )}
                    />
                    <span className="sr-only">{message.isSaved ? "Unsave message" : "Save to memory box"}</span>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="glass-strong lg:glass px-4 py-3 border-t border-border/50">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 h-12 rounded-2xl glass border-border/50"
          />
          <Button type="submit" size="icon" className="h-12 w-12 rounded-2xl" disabled={!newMessage.trim()}>
            <Send className="w-5 h-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
