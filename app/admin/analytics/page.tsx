"use client"

import { TrendingUp, Users, DollarSign, BookOpen, Heart, Calendar } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock analytics data - Replace with actual API calls
const analyticsData = {
  overview: {
    totalUsers: 1247,
    activeUsers: 892,
    newUsersThisMonth: 156,
    revenue: 36163,
    monthlyRevenue: 2580,
    growthRate: 12.5,
  },
  userGrowth: [
    { month: "Jul", users: 800 },
    { month: "Aug", users: 920 },
    { month: "Sep", users: 1050 },
    { month: "Oct", users: 1120 },
    { month: "Nov", users: 1180 },
    { month: "Dec", users: 1247 },
  ],
  revenue: [
    { month: "Jul", revenue: 2320 },
    { month: "Aug", revenue: 2400 },
    { month: "Sep", revenue: 2450 },
    { month: "Oct", revenue: 2500 },
    { month: "Nov", revenue: 2550 },
    { month: "Dec", revenue: 2580 },
  ],
  courseStats: [
    { name: "Pre-Marriage", enrolled: 892, completed: 624, progress: 70 },
    { name: "Marriage", enrolled: 456, completed: 289, progress: 63 },
    { name: "Post-Wedding", enrolled: 234, completed: 156, progress: 67 },
  ],
  activityStats: [
    { name: "Weekly Tasks", completed: 1247, total: 1800, progress: 69 },
    { name: "Journal", completed: 892, total: 1500, progress: 59 },
    { name: "Prayer", completed: 1456, total: 2000, progress: 73 },
    { name: "Discussion", completed: 678, total: 1200, progress: 57 },
  ],
  paymentMethods: {
    card: 45,
    chapa: 35,
    prepaid: 20,
  },
}

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-semibold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-1">Detailed insights and metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={Users}
          label="Total Users"
          value={analyticsData.overview.totalUsers.toLocaleString()}
          change={`+${analyticsData.overview.newUsersThisMonth} this month`}
          trend="up"
        />
        <MetricCard
          icon={TrendingUp}
          label="Active Users"
          value={analyticsData.overview.activeUsers.toLocaleString()}
          change={`${Math.round((analyticsData.overview.activeUsers / analyticsData.overview.totalUsers) * 100)}% of total`}
          trend="up"
        />
        <MetricCard
          icon={DollarSign}
          label="Total Revenue"
          value={`$${analyticsData.overview.revenue.toLocaleString()}`}
          change={`$${analyticsData.overview.monthlyRevenue} this month`}
          trend="up"
        />
        <MetricCard
          icon={TrendingUp}
          label="Growth Rate"
          value={`${analyticsData.overview.growthRate}%`}
          change="vs last month"
          trend="up"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="glass rounded-2xl p-6">
          <h2 className="font-serif text-xl font-semibold text-foreground mb-4">User Growth</h2>
          <div className="space-y-3">
            {analyticsData.userGrowth.map((data, idx) => {
              const maxUsers = Math.max(...analyticsData.userGrowth.map((d) => d.users))
              const percentage = (data.users / maxUsers) * 100
              return (
                <div key={data.month} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">{data.month}</span>
                    <span className="text-muted-foreground">{data.users} users</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              )
            })}
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="glass rounded-2xl p-6">
          <h2 className="font-serif text-xl font-semibold text-foreground mb-4">Monthly Revenue</h2>
          <div className="space-y-3">
            {analyticsData.revenue.map((data, idx) => {
              const maxRevenue = Math.max(...analyticsData.revenue.map((d) => d.revenue))
              const percentage = (data.revenue / maxRevenue) * 100
              return (
                <div key={data.month} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">{data.month}</span>
                    <span className="text-muted-foreground">${data.revenue.toLocaleString()}</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Course Statistics */}
      <div className="glass rounded-2xl p-6">
        <h2 className="font-serif text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Course Statistics
        </h2>
        <div className="space-y-4">
          {analyticsData.courseStats.map((course) => (
            <div key={course.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{course.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {course.enrolled} enrolled • {course.completed} completed
                  </p>
                </div>
                <span className="text-sm font-semibold text-primary">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          ))}
        </div>
      </div>

      {/* Activity Statistics */}
      <div className="glass rounded-2xl p-6">
        <h2 className="font-serif text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-accent" />
          Activity Statistics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analyticsData.activityStats.map((activity) => (
            <div key={activity.name} className="space-y-2 p-4 rounded-xl bg-background/50">
              <div className="flex items-center justify-between">
                <p className="font-medium text-foreground">{activity.name}</p>
                <span className="text-sm font-semibold text-primary">{activity.progress}%</span>
              </div>
              <Progress value={activity.progress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {activity.completed} of {activity.total} completed
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods Distribution */}
      <div className="glass rounded-2xl p-6">
        <h2 className="font-serif text-xl font-semibold text-foreground mb-4">Payment Methods Distribution</h2>
        <div className="space-y-4">
          {Object.entries(analyticsData.paymentMethods).map(([method, percentage]) => (
            <div key={method} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground capitalize">{method}</span>
                <span className="text-sm text-muted-foreground">{percentage}%</span>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MetricCard({
  icon: Icon,
  label,
  value,
  change,
  trend,
}: {
  icon: React.ElementType
  label: string
  value: string
  change: string
  trend: "up" | "down"
}) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        {trend === "up" && (
          <div className="flex items-center gap-1 text-sm text-primary">
            <TrendingUp className="w-4 h-4" />
          </div>
        )}
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className="text-2xl font-semibold text-foreground mb-1">{value}</p>
        <p className="text-xs text-muted-foreground">{change}</p>
      </div>
    </div>
  )
}

