"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeft,
  LayoutDashboard,
  FileText,
  BarChart3,
  Settings,
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  Search,
  Eye,
  ArrowUpRight,
  Activity,
  Bell,
  RefreshCw,
  Download,
  ChevronRight,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { mockIssues, categoryIcons, statusColors, type Issue } from "@/lib/data"
import {
  IssuesCategoryPieChart,
  IssuesMonthlyBarChart,
  ResolutionTrendChart,
  IssueStatusChart,
} from "@/components/charts"

interface AdminDashboardProps {
  onBack: () => void
}

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [currentPage, setCurrentPage] = useState<"dashboard" | "issues" | "reports" | "settings">("dashboard")
  const [isLoading, setIsLoading] = useState(false)
  const [notifications, setNotifications] = useState(3)

  const handlePageChange = (page: typeof currentPage) => {
    setIsLoading(true)
    setTimeout(() => {
      setCurrentPage(page)
      setIsLoading(false)
    }, 300)
  }

  const sidebarItems = [
    {
      id: "dashboard" as const,
      label: "Dashboard",
      icon: LayoutDashboard,
      description: "Overview and statistics",
      badge: null,
    },
    {
      id: "issues" as const,
      label: "Issue Management",
      icon: FileText,
      description: "Manage reported issues",
      badge: "23",
    },
    {
      id: "reports" as const,
      label: "Reports",
      icon: BarChart3,
      description: "Analytics and insights",
      badge: null,
    },
    {
      id: "settings" as const,
      label: "Settings",
      icon: Settings,
      description: "System configuration",
      badge: null,
    },
  ]

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
            <p className="text-slate-600 animate-pulse">Loading...</p>
          </div>
        </div>
      )
    }

    switch (currentPage) {
      case "issues":
        return <IssueManagementPage />
      case "reports":
        return <ReportsPage />
      case "settings":
        return <SettingsPage />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 flex">
      <div className="w-64 bg-gradient-to-b from-white to-slate-50/80 backdrop-blur-sm border-r border-slate-200/60 flex flex-col shadow-lg">
        <div className="p-6 border-b border-slate-200/60">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="bg-transparent hover:bg-slate-100 hover:scale-105 transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="font-bold text-slate-800 text-lg">Admin Dashboard</h1>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-600 bg-emerald-50 px-3 py-2 rounded-lg">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="font-medium">City Administrator</span>
            </div>
            <div className="relative">
              <Button variant="ghost" size="sm" className="hover:bg-emerald-50 transition-colors">
                <Bell className="h-4 w-4 text-slate-600" />
                {notifications > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce">
                    {notifications}
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 group relative overflow-hidden",
                    isActive
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25 transform scale-[1.02]"
                      : "text-slate-700 hover:bg-slate-100 hover:shadow-md hover:transform hover:scale-[1.01]",
                  )}
                >
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-emerald-600/20 opacity-0 transition-opacity duration-300",
                      !isActive && "group-hover:opacity-100",
                    )}
                  />

                  <Icon
                    className={cn(
                      "h-5 w-5 flex-shrink-0 relative z-10 transition-transform duration-200",
                      isActive ? "text-white" : "text-slate-500 group-hover:text-emerald-600 group-hover:scale-110",
                    )}
                  />
                  <div className="min-w-0 flex-1 relative z-10">
                    <div className="font-semibold text-sm flex items-center justify-between">
                      {item.label}
                      {item.badge && (
                        <Badge className="bg-red-500 text-white text-xs px-2 py-0.5 animate-pulse">{item.badge}</Badge>
                      )}
                    </div>
                    <div className={cn("text-xs", isActive ? "text-emerald-100" : "text-slate-500")}>
                      {item.description}
                    </div>
                  </div>
                  {!isActive && (
                    <ChevronRight className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1" />
                  )}
                </button>
              )
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-slate-200/60 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">System Status</span>
            <div className="flex items-center gap-1 text-emerald-600">
              <Zap className="h-3 w-3" />
              <span className="font-medium">Optimal</span>
            </div>
          </div>
          <div className="text-xs text-slate-500 bg-slate-100 px-3 py-2 rounded-lg text-center">
            Smart Civic Reporting v1.0
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="bg-gradient-to-r from-white via-white to-emerald-50/50 border-b border-slate-200/60 px-8 py-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                <span>Admin</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-emerald-600 font-medium capitalize">{currentPage}</span>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-emerald-700 bg-clip-text text-transparent capitalize">
                {currentPage}
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                {sidebarItems.find((item) => item.id === currentPage)?.description}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="hover:bg-slate-50 transition-colors bg-transparent">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" className="hover:bg-slate-50 transition-colors bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 px-4 py-2 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-shadow cursor-pointer">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                System Online
              </Badge>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-auto">
          <div
            className={cn(
              "transition-all duration-300",
              isLoading ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0",
            )}
          >
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}

function DashboardOverview() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const stats = [
    {
      title: "Total Issues",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: FileText,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100/50",
      shadowColor: "shadow-blue-500/20",
      delay: "delay-0",
    },
    {
      title: "Pending Issues",
      value: "355",
      change: "-8%",
      trend: "down",
      icon: Clock,
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-50 to-orange-100/50",
      shadowColor: "shadow-amber-500/20",
      delay: "delay-100",
    },
    {
      title: "Resolved Issues",
      value: "892",
      change: "+15%",
      trend: "up",
      icon: CheckCircle,
      gradient: "from-emerald-500 to-green-600",
      bgGradient: "from-emerald-50 to-green-100/50",
      shadowColor: "shadow-emerald-500/20",
      delay: "delay-200",
    },
    {
      title: "Resolution Rate",
      value: "72%",
      change: "+3%",
      trend: "up",
      icon: TrendingUp,
      gradient: "from-purple-500 to-violet-600",
      bgGradient: "from-purple-50 to-violet-100/50",
      shadowColor: "shadow-purple-500/20",
      delay: "delay-300",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.title}
              className={cn(
                "border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:transform hover:scale-[1.02] bg-gradient-to-br cursor-pointer group",
                stat.bgGradient,
                stat.shadowColor,
                stat.delay,
                isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8",
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-600 mb-1 group-hover:text-slate-700 transition-colors">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-slate-800 mb-2 group-hover:scale-105 transition-transform origin-left">
                      {stat.value}
                    </p>
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold transition-all duration-200",
                          stat.trend === "up"
                            ? "bg-emerald-100 text-emerald-700 group-hover:bg-emerald-200"
                            : "bg-red-100 text-red-700 group-hover:bg-red-200",
                        )}
                      >
                        <ArrowUpRight
                          className={cn("h-3 w-3 transition-transform", stat.trend === "down" && "rotate-90")}
                        />
                        {stat.change}
                      </div>
                      <span className="text-xs text-slate-500">from last month</span>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "p-4 rounded-2xl bg-gradient-to-br shadow-lg group-hover:scale-110 transition-transform duration-300",
                      stat.gradient,
                      stat.shadowColor,
                    )}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div
        className={cn(
          "grid lg:grid-cols-2 gap-8 transition-all duration-700 delay-500",
          isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8",
        )}
      >
        <IssuesCategoryPieChart />
        <IssuesMonthlyBarChart />
      </div>

      <div
        className={cn(
          "grid lg:grid-cols-2 gap-8 transition-all duration-700 delay-700",
          isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8",
        )}
      >
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50/50 hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg group-hover:scale-110 transition-transform">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-slate-800">Recent Issues</CardTitle>
                <CardDescription>Latest reported issues requiring attention</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockIssues.slice(0, 3).map((issue, index) => (
                <div
                  key={issue.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-slate-50/80 rounded-xl border border-slate-100 hover:shadow-md hover:border-emerald-200 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full group-hover:scale-125 transition-transform"></div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-slate-800 group-hover:text-emerald-700 transition-colors">
                        {issue.title}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="secondary"
                      className={cn("font-medium transition-all duration-200", statusColors[issue.status])}
                    >
                      {issue.status}
                    </Badge>
                    <span className="text-xs text-slate-400 font-medium">
                      {Math.floor((Date.now() - issue.reportedAt.getTime()) / (1000 * 60 * 60))}h ago
                    </span>
                    <ChevronRight className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-emerald-50/30 hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-slate-800">Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { icon: FileText, label: "Review Pending Issues", color: "emerald" },
                { icon: BarChart3, label: "Generate Monthly Report", color: "blue" },
                { icon: Users, label: "Manage User Accounts", color: "purple" },
                { icon: Settings, label: "System Configuration", color: "amber" },
              ].map((action, index) => (
                <Button
                  key={action.label}
                  className={cn(
                    "w-full justify-start bg-gradient-to-r from-slate-50 to-white text-slate-700 border border-slate-200 shadow-sm transition-all duration-300 group",
                    `hover:from-${action.color}-50 hover:to-${action.color}-100 hover:text-${action.color}-700 hover:border-${action.color}-200 hover:shadow-md hover:scale-[1.02]`,
                  )}
                  variant="outline"
                >
                  <action.icon className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform" />
                  {action.label}
                  <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1" />
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function IssueManagementPage() {
  const [issues, setIssues] = useState<Issue[]>(mockIssues)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null)
  const [showUpdateDialog, setShowUpdateDialog] = useState(false)

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.reportedBy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || issue.category === filterCategory
    const matchesStatus = filterStatus === "all" || issue.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const updateIssueStatus = (issueId: string, newStatus: Issue["status"]) => {
    setIssues(
      issues.map((issue) =>
        issue.id === issueId
          ? { ...issue, status: newStatus, resolvedAt: newStatus === "resolved" ? new Date() : undefined }
          : issue,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search issues by title or reporter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="garbage">Garbage</SelectItem>
                <SelectItem value="pothole">Pothole</SelectItem>
                <SelectItem value="waterlogging">Waterlogging</SelectItem>
                <SelectItem value="streetlight">Street Light</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Issues ({filteredIssues.length})</CardTitle>
          <CardDescription>Manage and track all reported civic issues</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Issue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reporter</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIssues.map((issue) => {
                  const IconComponent = categoryIcons[issue.category]
                  return (
                    <TableRow key={issue.id}>
                      <TableCell>
                        <div className="flex items-start gap-3">
                          {issue.imageUrl && (
                            <img
                              src={issue.imageUrl || "/placeholder.svg"}
                              alt={issue.title}
                              className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="font-medium text-sm">{issue.title}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={statusColors[issue.status]}>
                          {issue.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{issue.reportedBy}</TableCell>
                      <TableCell className="text-sm">{issue.reportedAt.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedIssue(issue)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>{issue.title}</DialogTitle>
                                <DialogDescription>Issue Details</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                {issue.imageUrl && (
                                  <img
                                    src={issue.imageUrl || "/placeholder.svg"}
                                    alt={issue.title}
                                    className="w-full h-64 object-cover rounded-lg"
                                  />
                                )}
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Status</Label>
                                    <p className="text-sm">{issue.status}</p>
                                  </div>
                                  <div>
                                    <Label>Reporter</Label>
                                    <p className="text-sm">{issue.reportedBy}</p>
                                  </div>
                                  <div>
                                    <Label>Reported Date</Label>
                                    <p className="text-sm">{issue.reportedAt.toLocaleDateString()}</p>
                                  </div>
                                </div>
                                <div>
                                  <Label>Description</Label>
                                  <p className="text-sm">{issue.description}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Select
                            value={issue.status}
                            onValueChange={(value: Issue["status"]) => updateIssueStatus(issue.id, value)}
                          >
                            <SelectTrigger className="w-32 h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-green-600">+23% from last month</p>
              </div>
              <div className="p-3 rounded-full bg-blue-50">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Resolution Time</p>
                <p className="text-2xl font-bold">3.2 days</p>
                <p className="text-xs text-green-600">-0.5 days improvement</p>
              </div>
              <div className="p-3 rounded-full bg-green-50">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Satisfaction Rate</p>
                <p className="text-2xl font-bold">4.2/5</p>
                <p className="text-xs text-green-600">+0.3 improvement</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-50">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">2,847</p>
                <p className="text-xs text-green-600">+156 new users</p>
              </div>
              <div className="p-3 rounded-full bg-purple-50">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ResolutionTrendChart />
        <IssueStatusChart />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <IssuesCategoryPieChart />
        <IssuesMonthlyBarChart />
      </div>
    </div>
  )
}

function SettingsPage() {
  const [settings, setSettings] = useState({
    autoAssignment: true,
    emailNotifications: true,
    smsNotifications: false,
    publicReports: true,
    maintenanceMode: false,
  })

  return (
    <div className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
          <CardDescription>Manage system-wide settings and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Auto-assign Issues</Label>
                <p className="text-sm text-muted-foreground">Automatically assign new issues to available staff</p>
              </div>
              <Button
                variant={settings.autoAssignment ? "default" : "outline"}
                size="sm"
                onClick={() => setSettings({ ...settings, autoAssignment: !settings.autoAssignment })}
              >
                {settings.autoAssignment ? "Enabled" : "Disabled"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Send email updates to citizens and staff</p>
              </div>
              <Button
                variant={settings.emailNotifications ? "default" : "outline"}
                size="sm"
                onClick={() => setSettings({ ...settings, emailNotifications: !settings.emailNotifications })}
              >
                {settings.emailNotifications ? "Enabled" : "Disabled"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Send SMS updates for urgent issues</p>
              </div>
              <Button
                variant={settings.smsNotifications ? "default" : "outline"}
                size="sm"
                onClick={() => setSettings({ ...settings, smsNotifications: !settings.smsNotifications })}
              >
                {settings.smsNotifications ? "Enabled" : "Disabled"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Public Reports</Label>
                <p className="text-sm text-muted-foreground">Allow citizens to view all reported issues</p>
              </div>
              <Button
                variant={settings.publicReports ? "default" : "outline"}
                size="sm"
                onClick={() => setSettings({ ...settings, publicReports: !settings.publicReports })}
              >
                {settings.publicReports ? "Enabled" : "Disabled"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">Temporarily disable public access</p>
              </div>
              <Button
                variant={settings.maintenanceMode ? "destructive" : "outline"}
                size="sm"
                onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
              >
                {settings.maintenanceMode ? "Active" : "Inactive"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Export and backup system data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <FileText className="h-4 w-4 mr-2" />
              Export Issues Report (CSV)
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <BarChart3 className="h-4 w-4 mr-2" />
              Export Analytics Data
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Users className="h-4 w-4 mr-2" />
              Export User Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {settings.maintenanceMode && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Maintenance mode is currently active. Citizens cannot submit new issues or access the system.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
