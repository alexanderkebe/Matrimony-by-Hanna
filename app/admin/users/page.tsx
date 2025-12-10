"use client"

import { useState } from "react"
import { Search, Filter, CheckCircle, XCircle, Clock, Mail, Phone, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data - Replace with actual API calls
const mockUsers = [
  {
    id: 1,
    name: "Solomon & Sarah",
    email: "solomon@example.com",
    phone: "+251911234567",
    status: "active",
    joined: "2024-01-15",
    lastActive: "2 hours ago",
    paymentStatus: "paid",
    coursesCompleted: 2,
  },
  {
    id: 2,
    name: "Daniel & Ruth",
    email: "daniel@example.com",
    phone: "+251922345678",
    status: "pending",
    joined: "2024-01-20",
    lastActive: "Never",
    paymentStatus: "pending",
    coursesCompleted: 0,
  },
  {
    id: 3,
    name: "Michael & Mary",
    email: "michael@example.com",
    phone: "+251933456789",
    status: "active",
    joined: "2024-01-10",
    lastActive: "1 day ago",
    paymentStatus: "paid",
    coursesCompleted: 1,
  },
  {
    id: 4,
    name: "John & Grace",
    email: "john@example.com",
    phone: "+251944567890",
    status: "pending",
    joined: "2024-01-22",
    lastActive: "Never",
    paymentStatus: "pending",
    coursesCompleted: 0,
  },
]

type FilterStatus = "all" | "active" | "pending" | "inactive"

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all")

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || user.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleApprove = (userId: number) => {
    // TODO: API call to approve user
    console.log("Approving user:", userId)
    alert("User approved successfully!")
  }

  const handleReject = (userId: number) => {
    // TODO: API call to reject user
    if (confirm("Are you sure you want to reject this user?")) {
      console.log("Rejecting user:", userId)
      alert("User rejected.")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage and approve user accounts</p>
        </div>
        <Button className="h-12 rounded-xl">Export Users</Button>
      </div>

      {/* Filters */}
      <div className="glass rounded-2xl p-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "active", "pending", "inactive"] as FilterStatus[]).map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? "default" : "outline"}
              onClick={() => setFilterStatus(status)}
              className="h-12 rounded-xl capitalize"
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium text-foreground">User</th>
                <th className="text-left p-4 font-medium text-foreground">Contact</th>
                <th className="text-left p-4 font-medium text-foreground">Status</th>
                <th className="text-left p-4 font-medium text-foreground">Payment</th>
                <th className="text-left p-4 font-medium text-foreground">Progress</th>
                <th className="text-left p-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Joined {new Date(user.joined).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <p className="text-sm text-foreground flex items-center gap-2">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        {user.email}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Phone className="w-3 h-3" />
                        {user.phone}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    {user.status === "active" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        <CheckCircle className="w-3 h-3" />
                        Active
                      </span>
                    ) : user.status === "pending" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
                        <Clock className="w-3 h-3" />
                        Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
                        <XCircle className="w-3 h-3" />
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    {user.paymentStatus === "paid" ? (
                      <span className="text-sm text-primary font-medium">Paid</span>
                    ) : (
                      <span className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">Pending</span>
                    )}
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-foreground">{user.coursesCompleted} courses completed</p>
                    <p className="text-xs text-muted-foreground">Last active: {user.lastActive}</p>
                  </td>
                  <td className="p-4">
                    {user.status === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(user.id)}
                          className="h-8 rounded-lg bg-primary text-primary-foreground"
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(user.id)}
                          className="h-8 rounded-lg"
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No users found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass rounded-2xl p-4 text-center">
          <p className="text-2xl font-semibold text-foreground">{mockUsers.length}</p>
          <p className="text-sm text-muted-foreground">Total Users</p>
        </div>
        <div className="glass rounded-2xl p-4 text-center">
          <p className="text-2xl font-semibold text-primary">
            {mockUsers.filter((u) => u.status === "active").length}
          </p>
          <p className="text-sm text-muted-foreground">Active Users</p>
        </div>
        <div className="glass rounded-2xl p-4 text-center">
          <p className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
            {mockUsers.filter((u) => u.status === "pending").length}
          </p>
          <p className="text-sm text-muted-foreground">Pending Approval</p>
        </div>
        <div className="glass rounded-2xl p-4 text-center">
          <p className="text-2xl font-semibold text-foreground">
            {mockUsers.filter((u) => u.paymentStatus === "paid").length}
          </p>
          <p className="text-sm text-muted-foreground">Paid Users</p>
        </div>
      </div>
    </div>
  )
}

