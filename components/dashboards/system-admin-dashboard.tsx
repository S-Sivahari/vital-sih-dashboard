"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import {
  Activity,
  Server,
  Database,
  Users,
  AlertTriangle,
  CheckCircle,
  Cpu,
  Shield,
} from "lucide-react"

// Mock data for system metrics
const systemHealthData = [
  { time: "00:00", cpu: 45, memory: 62 },
  { time: "04:00", cpu: 52, memory: 58 },
  { time: "08:00", cpu: 78, memory: 71 },
  { time: "12:00", cpu: 85, memory: 76 },
  { time: "16:00", cpu: 92, memory: 82 },
  { time: "20:00", cpu: 67, memory: 69 },
]

const systemKPIs = [
  {
    title: "System Uptime",
    value: "99.8%",
    description: "last 30 days",
    icon: Server,
  },
  {
    title: "Active Users",
    value: "47,095",
    description: "currently online",
    icon: Users,
  },
  {
    title: "API Health",
    value: "98.5%",
    description: "success rate",
    icon: Activity,
  },
  {
    title: "Data Sources",
    value: "5/6",
    description: "operational",
    icon: Database,
  },
]

const alertsData = [
  { id: 1, type: "critical", message: "High CPU usage on AI inference server", time: "2 min ago", status: "active" },
  { id: 2, type: "warning", message: "Database connection pool near capacity", time: "15 min ago", status: "active" },
  { id: 3, type: "info", message: "Scheduled maintenance completed successfully", time: "1 hour ago", status: "resolved" },
  { id: 4, type: "warning", message: "Unusual spike in API requests", time: "2 hours ago", status: "investigating" },
]

const dataIngestionStatus = [
  { source: "IMD Weather API", status: "healthy", lastSync: "2 min ago" },
  { source: "Agmarknet Prices", status: "healthy", lastSync: "5 min ago" },
  { source: "eNAM Market Data", status: "warning", lastSync: "25 min ago" },
  { source: "ICAR Research Data", status: "healthy", lastSync: "1 hour ago" },
  { source: "KVK Extension Data", status: "error", lastSync: "3 hours ago" },
  { source: "Farmer App Reports", status: "healthy", lastSync: "30 sec ago" },
]

export function SystemAdminDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "default"
      case "warning": return "secondary"
      case "error": return "destructive"
      default: return "outline"
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical": return "destructive"
      case "warning": return "secondary"
      case "info": return "outline"
      default: return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">System Administration</h1>
          <p className="text-muted-foreground">Monitor platform health and performance</p>
        </div>
        <Button size="sm">
          <Activity className="h-4 w-4 mr-2" />
          System Report
        </Button>
      </div>

      {/* System Health KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemKPIs.map((kpi, index) => {
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
        {/* System Performance */}
        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
            <CardDescription>CPU and Memory usage over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={systemHealthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="cpu" stroke="#3b82f6" name="CPU %" />
                <Line type="monotone" dataKey="memory" stroke="#10b981" name="Memory %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Data Sources Status */}
        <Card>
          <CardHeader>
            <CardTitle>Data Sources</CardTitle>
            <CardDescription>External API and data ingestion status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dataIngestionStatus.map((source, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium">{source.source}</div>
                    <div className="text-sm text-muted-foreground">Last sync: {source.lastSync}</div>
                  </div>
                  <Badge variant={getStatusColor(source.status)}>
                    {source.status === "healthy" && <CheckCircle className="h-3 w-3 mr-1" />}
                    {source.status === "warning" && <AlertTriangle className="h-3 w-3 mr-1" />}
                    {source.status === "error" && <AlertTriangle className="h-3 w-3 mr-1" />}
                    {source.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>System Alerts</CardTitle>
          <CardDescription>Recent system notifications and warnings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alertsData.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge variant={getAlertColor(alert.type)}>
                    {alert.type}
                  </Badge>
                  <div>
                    <div className="font-medium">{alert.message}</div>
                    <div className="text-sm text-muted-foreground">{alert.time}</div>
                  </div>
                </div>
                <Badge variant="outline">
                  {alert.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
