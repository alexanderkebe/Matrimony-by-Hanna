"use client"

import type { CommunityPost as CommunityPostType } from "@/lib/mock-data"
import { useState } from "react"
import { Heart, Church, Users, Award } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface CommunityPostProps {
  post: CommunityPostType
}

const roleIcons = {
  deacon: Church,
  leader: Award,
  couple: Users,
}

const roleColors = {
  deacon: "bg-primary/10 text-primary",
  leader: "bg-accent/30 text-deep-charcoal",
  couple: "bg-secondary text-deep-charcoal",
}

export function CommunityPost({ post }: CommunityPostProps) {
  const [likes, setLikes] = useState(post.likes)
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    // TODO: Update likes in backend
    if (isLiked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setIsLiked(!isLiked)
  }

  const RoleIcon = roleIcons[post.authorRole]
  const roleColor = roleColors[post.authorRole]

  return (
    <div className="glass rounded-2xl p-4">
      {/* Author */}
      <div className="flex items-center gap-3 mb-3">
        {post.avatar ? (
          <Avatar className="w-10 h-10">
            <AvatarImage src={post.avatar} alt={post.author} />
            <AvatarFallback className={cn(roleColor)}>
              <RoleIcon className="w-5 h-5" />
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", roleColor)}>
            <RoleIcon className="w-5 h-5" />
          </div>
        )}
        <div className="flex-1">
          <p className="font-medium text-foreground">{post.author}</p>
          <p className="text-xs text-muted-foreground capitalize">{post.authorRole}</p>
        </div>
        <span className="text-xs text-muted-foreground">
          {new Date(post.timestamp).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      {/* Content */}
      <p className="text-foreground leading-relaxed">{post.content}</p>

      {/* Actions */}
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border/50">
        <button
          onClick={handleLike}
          className={cn(
            "flex items-center gap-1.5 text-sm transition-colors",
            isLiked ? "text-primary" : "text-muted-foreground",
          )}
        >
          <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
          <span>{likes}</span>
        </button>
      </div>
    </div>
  )
}
