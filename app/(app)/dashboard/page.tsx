import { WelcomeCard } from "@/components/dashboard/welcome-card"
import { ProgressCard } from "@/components/dashboard/progress-card"
import { ContinueWatchingCard } from "@/components/dashboard/continue-watching-card"
import { ResumeWatchingCard } from "@/components/dashboard/resume-watching-card"
import { UpcomingActivitiesCard } from "@/components/dashboard/upcoming-activities-card"
import { QuickActionsCard } from "@/components/dashboard/quick-actions-card"
import { mockCouple, mockCourses, mockActivities } from "@/lib/mock-data"

export default function DashboardPage() {
  const currentCourse = mockCourses.find((c) => c.id === mockCouple.currentCourse)
  const pendingActivities = mockActivities.filter((a) => !a.isCompleted)

  return (
    <div className="space-y-4 pb-4">
      {/* Welcome Section */}
      <WelcomeCard couple={mockCouple} />

      {/* Resume Watching - Shows where user paused */}
      {currentCourse && <ResumeWatchingCard course={currentCourse} />}

      {/* Continue Watching - Shows next incomplete lesson */}
      {currentCourse && <ContinueWatchingCard course={currentCourse} />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Progress Overview */}
        <ProgressCard progress={mockCouple.overallProgress} coursesCompleted={1} totalCourses={3} />

        {/* Upcoming Activities */}
        <UpcomingActivitiesCard activities={pendingActivities.slice(0, 3)} />
      </div>

      {/* Quick Actions */}
      <QuickActionsCard />
    </div>
  )
}
