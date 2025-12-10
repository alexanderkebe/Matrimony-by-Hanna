"use client"

import { Users, CreditCard, BookOpen, TrendingUp, Clock, CheckCircle, XCircle, DollarSign, Heart } from "lucide-react"
import { useTranslation } from "@/lib/i18n/context"

// Mock data - Replace with actual API calls
const mockStats = {
  totalUsers: 1247,
  activeUsers: 892,
  pendingApprovals: 23,
  totalRevenue: 36163,
  monthlyRevenue: 2580,
  totalCourses: 3,
  totalActivities: 15,
  completionRate: 68,
  growthRate: 12.5,
}

const recentUsers = [
  { id: 1, name: "Solomon & Sarah", email: "solomon@example.com", status: "active", joined: "2 hours ago" },
  { id: 2, name: "Daniel & Ruth", email: "daniel@example.com", status: "pending", joined: "5 hours ago" },
  { id: 3, name: "Michael & Mary", email: "michael@example.com", status: "active", joined: "1 day ago" },
  { id: 4, name: "John & Grace", email: "john@example.com", status: "pending", joined: "2 days ago" },
]

const recentPayments = [
  { id: 1, user: "Solomon & Sarah", amount: 29, method: "Chapa", status: "completed", date: "2 hours ago" },
  { id: 2, user: "Daniel & Ruth", amount: 29, method: "Prepaid", status: "pending", date: "5 hours ago" },
  { id: 3, user: "Michael & Mary", amount: 29, method: "Card", status: "completed", date: "1 day ago" },
]

export default function AdminDashboard() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-semibold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your application</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Total Users"
          value={mockStats.totalUsers.toLocaleString()}
          change={`${mockStats.activeUsers} active`}
          trend="up"
        />
        <StatCard
          icon={Clock}
          label="Pending Approvals"
          value={mockStats.pendingApprovals.toString()}
          change="Requires attention"
          trend="neutral"
          variant="warning"
        />
        <StatCard
          icon={DollarSign}
          label="Total Revenue"
          value={`$${mockStats.totalRevenue.toLocaleString()}`}
          change={`$${mockStats.monthlyRevenue} this month`}
          trend="up"
        />
        <StatCard
          icon={TrendingUp}
          label="Growth Rate"
          value={`${mockStats.growthRate}%`}
          change="vs last month"
          trend="up"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Courses</p>
                <p className="text-2xl font-semibold text-foreground">{mockStats.totalCourses}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>All active</span>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Activities</p>
                <p className="text-2xl font-semibold text-foreground">{mockStats.totalActivities}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span>{mockStats.completionRate}% completion rate</span>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-semibold text-foreground">${mockStats.monthlyRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span>+{mockStats.growthRate}% from last month</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-semibold text-foreground">Recent Users</h2>
            <a href="/admin/users" className="text-sm text-primary hover:underline">
              View All
            </a>
          </div>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 rounded-xl bg-background/50">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  {user.status === "pending" ? (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
                      Pending
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      Active
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">{user.joined}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-semibold text-foreground">Recent Payments</h2>
            <a href="/admin/payments" className="text-sm text-primary hover:underline">
              View All
            </a>
          </div>
          <div className="space-y-3">
            {recentPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-3 rounded-xl bg-background/50">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{payment.user}</p>
                  <p className="text-sm text-muted-foreground">{payment.method} • {payment.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">${payment.amount}</span>
                  {payment.status === "completed" ? (
                    <CheckCircle className="w-4 h-4 text-primary" />
                  ) : (
                    <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  change,
  trend,
  variant = "default",
}: {
  icon: React.ElementType
  label: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  variant?: "default" | "warning"
}) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className={`w-6 h-6 ${variant === "warning" ? "text-yellow-600 dark:text-yellow-400" : "text-primary"}`} />
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

