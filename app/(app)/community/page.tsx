import { CommunityHeader } from "@/components/community/community-header"
import { CommunityPost } from "@/components/community/community-post"
import { EventCard } from "@/components/community/event-card"
import { mockCommunityPosts } from "@/lib/mock-data"

export default function CommunityPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground">Community</h1>
        <p className="text-muted-foreground mt-1">Stay connected with your church family</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Community Posts */}
          <div className="space-y-3 animate-fade-in-up delay-300">
            <h2 className="font-serif text-lg font-semibold text-foreground">Announcements</h2>
            {mockCommunityPosts.map((post) => (
              <CommunityPost key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Church Info Card */}
          <CommunityHeader />

          {/* Upcoming Events */}
          <div className="space-y-3 animate-fade-in-up delay-200">
            <h2 className="font-serif text-lg font-semibold text-foreground">Upcoming Events</h2>
            <EventCard
              title="Couples Fellowship"
              date="December 15, 2024"
              time="After Sunday Service"
              location="Fellowship Hall"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
