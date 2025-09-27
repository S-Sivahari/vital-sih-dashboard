"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  MapPin,
  TrendingUp,
  Users,
} from "lucide-react"
import type { User } from "@/lib/auth"

interface GovernmentDashboardProps {
  user: User
}

// Mock data for government dashboard
const nationalKPIs = [
  {
    title: "Active Districts",
    value: "127",
    description: "districts reporting",
    icon: MapPin,
  },
  {
    title: "Total Farmers",
    value: "2.4M",
    description: "registered farmers",
    icon: Users,
  },
  {
    title: "Crop Health",
    value: "78%",
    description: "overall health score",
    icon: TrendingUp,
  },
]

const stateData = [
  { state: "Maharashtra", farmers: 125000, reports: 234, healthScore: 82 },
  { state: "Karnataka", farmers: 98000, reports: 189, healthScore: 79 },
  { state: "Andhra Pradesh", farmers: 110000, reports: 201, healthScore: 75 },
  { state: "Tamil Nadu", farmers: 85000, reports: 156, healthScore: 85 },
  { state: "Gujarat", farmers: 75000, reports: 142, healthScore: 88 },
]

const recentReports = [
  { district: "Pune", reports: 45, status: "Active", priority: "Medium" },
  { district: "Nashik", reports: 32, status: "Resolved", priority: "Low" },
  { district: "Solapur", reports: 28, status: "Active", priority: "High" },
  { district: "Kolhapur", reports: 19, status: "Active", priority: "Medium" },
]

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"]

export function GovernmentDashboard({ user }: GovernmentDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Government Dashboard</h1>
          <p className="text-muted-foreground">
            Agricultural overview and policy insights
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="maharashtra">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="maharashtra">Maharashtra</SelectItem>
              <SelectItem value="karnataka">Karnataka</SelectItem>
              <SelectItem value="gujarat">Gujarat</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {nationalKPIs.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{kpi.value}</h3>
                    <p className="text-sm text-muted-foreground">{kpi.title}</p>
                    <p className="text-xs text-muted-foreground">{kpi.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* State Overview */}
        <Card>
          <CardHeader>
            <CardTitle>State Overview</CardTitle>
            <CardDescription>Key agricultural states performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="state" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="farmers" fill="#3b82f6" name="Farmers (K)" />
                <Bar dataKey="reports" fill="#10b981" name="Reports" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent District Reports */}
        <Card>
          <CardHeader>
            <CardTitle>District Reports</CardTitle>
            <CardDescription>Recent activity by district</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium">{report.district}</div>
                    <div className="text-sm text-muted-foreground">{report.reports} reports</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={report.status === "Active" ? "default" : "secondary"}>
                      {report.status}
                    </Badge>
                    <Badge variant={report.priority === "High" ? "destructive" : report.priority === "Medium" ? "secondary" : "outline"}>
                      {report.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
