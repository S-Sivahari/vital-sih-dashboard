"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import {
  Activity,
  Server,
  Database,
  Users,
  AlertTriangle,
  CheckCircle,
  Cpu,
  HardDrive,
  Wifi,
  Shield,
} from "lucide-react"

// Mock data for system metrics
const systemHealthData = [
  { time: "00:00", cpu: 45, memory: 62, disk: 78, network: 34 },
  { time: "04:00", cpu: 52, memory: 58, disk: 79, network: 42 },
  { time: "08:00", cpu: 78, memory: 71, disk: 80, network: 67 },
  { time: "12:00", cpu: 85, memory: 76, disk: 81, network: 73 },
  { time: "16:00", cpu: 92, memory: 82, disk: 82, network: 81 },
  { time: "20:00", cpu: 67, memory: 69, disk: 83, network: 58 },
]

const aiModelPerformance = [
  { model: "Pest Detection CNN", accuracy: 94.2, confidence: 87.5, requests: 15420, errors: 23 },
  { model: "Crop Disease Classifier", accuracy: 91.8, confidence: 84.2, requests: 12350, errors: 18 },
  { model: "Yield Prediction ML", accuracy: 88.5, confidence: 79.3, requests: 8760, errors: 45 },
  { model: "NLP Advisory Engine", accuracy: 92.7, confidence: 85.8, requests: 9840, errors: 12 },
  { model: "Weather Impact Model", accuracy: 89.3, confidence: 81.6, requests: 6540, errors: 8 },
]

const userActivityData = [
  { role: "Farmers", active: 45230, total: 52000, growth: 8.2 },
  { role: "Agricultural Officers", active: 1250, total: 1400, growth: 12.5 },
  { role: "Government Officials", active: 340, total: 380, growth: 15.2 },
  { role: "NGO Partners", active: 180, total: 220, growth: 22.1 },
  { role: "Market Analysts", active: 95, total: 110, growth: 18.7 },
]

const alertsData = [
  { id: 1, type: "critical", message: "High CPU usage on AI inference server", time: "2 min ago", status: "active" },
  { id: 2, type: "warning", message: "Database connection pool near capacity", time: "15 min ago", status: "active" },
  {
    id: 3,
    type: "info",
    message: "Scheduled maintenance completed successfully",
    time: "1 hour ago",
    status: "resolved",
  },
  {
    id: 4,
    type: "warning",
    message: "Unusual spike in API requests from Maharashtra",
    time: "2 hours ago",
    status: "investigating",
  },
  { id: 5, type: "critical", message: "IMD weather API rate limit exceeded", time: "3 hours ago", status: "resolved" },
]

const dataIngestionStatus = [
  { source: "IMD Weather API", status: "healthy", lastSync: "2 min ago", records: 15420 },
  { source: "Agmarknet Prices", status: "healthy", lastSync: "5 min ago", records: 8760 },
  { source: "eNAM Market Data", status: "warning", lastSync: "25 min ago", records: 6540 },
  { source: "ICAR Research Data", status: "healthy", lastSync: "1 hour ago", records: 2340 },
  { source: "KVK Extension Data", status: "error", lastSync: "3 hours ago", records: 0 },
  { source: "Farmer App Reports", status: "healthy", lastSync: "30 sec ago", records: 45230 },
]

export function SystemAdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Administration</h1>
          <p className="text-muted-foreground">Monitor platform health, AI performance, and user activity</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Shield className="h-4 w-4 mr-2" />
            Security Logs
          </Button>
          <Button size="sm">
            <Activity className="h-4 w-4 mr-2" />
            System Report
          </Button>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">Healthy</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47,095</div>
            <p className="text-xs text-muted-foreground">+12.5% from last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Requests/min</CardTitle>
            <Activity className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">Peak: 1,890 at 2:30 PM</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">3</div>
            <p className="text-xs text-muted-foreground">2 warnings, 1 critical</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="infrastructure" className="space-y-4">
        <TabsList>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
          <TabsTrigger value="ai-models">AI Models</TabsTrigger>
          <TabsTrigger value="data-sources">Data Sources</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="alerts">Alerts & Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="infrastructure" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  System Resources (24h)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={systemHealthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="cpu" stroke="#ef4444" name="CPU %" />
                    <Line type="monotone" dataKey="memory" stroke="#3b82f6" name="Memory %" />
                    <Line type="monotone" dataKey="disk" stroke="#10b981" name="Disk %" />
                    <Line type="monotone" dataKey="network" stroke="#f59e0b" name="Network %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Resource Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-4 w-4" />
                      <span className="text-sm">CPU Usage</span>
                    </div>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      <span className="text-sm">Memory Usage</span>
                    </div>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HardDrive className="h-4 w-4" />
                      <span className="text-sm">Disk Usage</span>
                    </div>
                    <span className="text-sm font-medium">42%</span>
                  </div>
                  <Progress value={42} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wifi className="h-4 w-4" />
                      <span className="text-sm">Network I/O</span>
                    </div>
                    <span className="text-sm font-medium">23%</span>
                  </div>
                  <Progress value={23} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Model Performance</CardTitle>
              <CardDescription>Real-time accuracy, confidence scores, and request metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiModelPerformance.map((model, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{model.model}</h4>
                      <Badge variant={model.accuracy > 90 ? "default" : "secondary"}>{model.accuracy}% Accuracy</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Confidence</p>
                        <p className="font-medium">{model.confidence}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Requests (24h)</p>
                        <p className="font-medium">{model.requests.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Errors</p>
                        <p className="font-medium text-red-500">{model.errors}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Error Rate</p>
                        <p className="font-medium">{((model.errors / model.requests) * 100).toFixed(3)}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data-sources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Ingestion Pipeline Status</CardTitle>
              <CardDescription>Monitor India-specific data source integrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dataIngestionStatus.map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          source.status === "healthy"
                            ? "bg-green-500"
                            : source.status === "warning"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      />
                      <div>
                        <p className="font-medium">{source.source}</p>
                        <p className="text-sm text-muted-foreground">Last sync: {source.lastSync}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{source.records.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">records</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Activity by Role</CardTitle>
              <CardDescription>Active users and growth metrics across all user types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userActivityData.map((role, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{role.role}</p>
                      <p className="text-sm text-muted-foreground">
                        {role.active.toLocaleString()} / {role.total.toLocaleString()} active
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant={role.growth > 15 ? "default" : "secondary"}>+{role.growth}%</Badge>
                      <p className="text-sm text-muted-foreground mt-1">growth</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts & Notifications</CardTitle>
              <CardDescription>Recent system events and alerts requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alertsData.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        alert.type === "critical"
                          ? "bg-red-500"
                          : alert.type === "warning"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{alert.message}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <p className="text-sm text-muted-foreground">{alert.time}</p>
                        <Badge
                          variant={
                            alert.status === "resolved"
                              ? "default"
                              : alert.status === "investigating"
                                ? "secondary"
                                : "destructive"
                          }
                          size="sm"
                        >
                          {alert.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SystemAdminDashboard
