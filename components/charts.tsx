"use client"

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { issuesByCategory, issuesByMonth } from "@/lib/data"

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"]

interface ChartTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
}

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.dataKey}: ${entry.value}`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function IssuesCategoryPieChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Issues by Category</CardTitle>
        <CardDescription>Distribution of reported issues by type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={issuesByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {issuesByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {issuesByCategory.map((item, index) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <span className="text-sm font-medium">{item.name}</span>
              <span className="text-sm text-muted-foreground">({item.value})</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function IssuesMonthlyBarChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Issue Reports</CardTitle>
        <CardDescription>Number of issues reported each month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={issuesByMonth}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-muted-foreground" />
              <YAxis className="text-muted-foreground" />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="issues" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function ResolutionTrendChart() {
  const resolutionData = [
    { month: "Jan", resolved: 38, total: 45, rate: 84 },
    { month: "Feb", resolved: 45, total: 52, rate: 87 },
    { month: "Mar", resolved: 35, total: 38, rate: 92 },
    { month: "Apr", resolved: 48, total: 61, rate: 79 },
    { month: "May", resolved: 52, total: 55, rate: 95 },
    { month: "Jun", resolved: 41, total: 48, rate: 85 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resolution Rate Trend</CardTitle>
        <CardDescription>Percentage of issues resolved each month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={resolutionData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-muted-foreground" />
              <YAxis domain={[70, 100]} className="text-muted-foreground" />
              <Tooltip content={<ChartTooltip />} />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="hsl(var(--chart-2))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--chart-2))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function IssueStatusChart() {
  const statusData = [
    { status: "Pending", count: 355, fill: "hsl(var(--chart-3))" },
    { status: "In Progress", count: 128, fill: "hsl(var(--chart-2))" },
    { status: "Resolved", count: 892, fill: "hsl(var(--chart-1))" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Issue Status</CardTitle>
        <CardDescription>Overview of all issues by current status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statusData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis type="number" className="text-muted-foreground" />
              <YAxis dataKey="status" type="category" className="text-muted-foreground" />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
