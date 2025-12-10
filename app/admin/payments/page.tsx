"use client"

import { useState } from "react"
import { Search, Filter, CheckCircle, Clock, XCircle, DollarSign, CreditCard, Wallet } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Mock data - Replace with actual API calls
const mockPayments = [
  {
    id: 1,
    user: "Solomon & Sarah",
    email: "solomon@example.com",
    amount: 29,
    currency: "USD",
    method: "Chapa",
    status: "completed",
    transactionId: "chapa_txn_123456",
    date: "2024-01-20T10:30:00Z",
  },
  {
    id: 2,
    user: "Daniel & Ruth",
    email: "daniel@example.com",
    amount: 29,
    currency: "USD",
    method: "Prepaid",
    status: "pending",
    transactionId: "prepaid_ref_789012",
    date: "2024-01-20T08:15:00Z",
  },
  {
    id: 3,
    user: "Michael & Mary",
    email: "michael@example.com",
    amount: 29,
    currency: "USD",
    method: "Card",
    status: "completed",
    transactionId: "card_txn_345678",
    date: "2024-01-19T14:22:00Z",
  },
  {
    id: 4,
    user: "John & Grace",
    email: "john@example.com",
    amount: 29,
    currency: "USD",
    method: "Prepaid",
    status: "pending",
    transactionId: "prepaid_ref_901234",
    date: "2024-01-19T11:45:00Z",
  },
]

type FilterStatus = "all" | "completed" | "pending" | "failed"
type FilterMethod = "all" | "card" | "chapa" | "prepaid"

export default function AdminPaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all")
  const [filterMethod, setFilterMethod] = useState<FilterMethod>("all")

  const filteredPayments = mockPayments.filter((payment) => {
    const matchesSearch =
      payment.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || payment.status === filterStatus
    const matchesMethod = filterMethod === "all" || payment.method.toLowerCase() === filterMethod
    return matchesSearch && matchesStatus && matchesMethod
  })

  const totalRevenue = mockPayments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0)

  const pendingAmount = mockPayments
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">Payment Management</h1>
          <p className="text-muted-foreground mt-1">View and manage all payment transactions</p>
        </div>
        <Button className="h-12 rounded-xl">Export Payments</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-semibold text-foreground">${totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">From {mockPayments.filter((p) => p.status === "completed").length} completed payments</p>
        </div>
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Pending Payments</p>
            <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <p className="text-3xl font-semibold text-foreground">${pendingAmount.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {mockPayments.filter((p) => p.status === "pending").length} payments awaiting approval
          </p>
        </div>
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">This Month</p>
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-semibold text-foreground">$2,580</p>
          <p className="text-xs text-muted-foreground mt-1">+12.5% from last month</p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass rounded-2xl p-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by user, email, or transaction ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="flex gap-2">
            {(["all", "completed", "pending", "failed"] as FilterStatus[]).map((status) => (
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
          <div className="flex gap-2">
            {(["all", "card", "chapa", "prepaid"] as FilterMethod[]).map((method) => (
              <Button
                key={method}
                variant={filterMethod === method ? "default" : "outline"}
                onClick={() => setFilterMethod(method)}
                className="h-12 rounded-xl capitalize"
              >
                {method}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium text-foreground">User</th>
                <th className="text-left p-4 font-medium text-foreground">Amount</th>
                <th className="text-left p-4 font-medium text-foreground">Method</th>
                <th className="text-left p-4 font-medium text-foreground">Transaction ID</th>
                <th className="text-left p-4 font-medium text-foreground">Status</th>
                <th className="text-left p-4 font-medium text-foreground">Date</th>
                <th className="text-left p-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-foreground">{payment.user}</p>
                      <p className="text-sm text-muted-foreground">{payment.email}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-semibold text-foreground">${payment.amount}</p>
                    <p className="text-xs text-muted-foreground">{payment.currency}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {payment.method === "Card" ? (
                        <CreditCard className="w-4 h-4 text-muted-foreground" />
                      ) : payment.method === "Chapa" ? (
                        <Wallet className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Clock className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className="text-sm text-foreground">{payment.method}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-foreground font-mono">{payment.transactionId}</p>
                  </td>
                  <td className="p-4">
                    {payment.status === "completed" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        <CheckCircle className="w-3 h-3" />
                        Completed
                      </span>
                    ) : payment.status === "pending" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
                        <Clock className="w-3 h-3" />
                        Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
                        <XCircle className="w-3 h-3" />
                        Failed
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-foreground">
                      {new Date(payment.date).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(payment.date).toLocaleTimeString()}
                    </p>
                  </td>
                  <td className="p-4">
                    {payment.status === "pending" && payment.method === "Prepaid" && (
                      <Button size="sm" className="h-8 rounded-lg">
                        Verify
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPayments.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No payments found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

