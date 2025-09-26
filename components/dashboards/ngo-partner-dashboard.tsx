"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Users, MapPin, Target, TrendingUp, Calendar, Phone, MessageCircle, CheckCircle, AlertTriangle, Heart, Megaphone } from 'lucide-react'
import type { User } from "@/lib/auth"

interface NGOPartnerDashboardProps {
  user: User
}

// Mock data for NGO dashboard
const impactKPIs = [
  {
    title: "Farmers Engaged",
    value: "2,847",
    change: "+324",
    trend: "up",
    description: "this month",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Awareness Drives",
    value: "18",
    change: "+5",
    trend: "up",
    description: "completed this month",
    icon: Megaphone,
    color: "text-green-600",
  },
  {
    title: "Hotspots Covered",
    value: "89%",
    change: "+12%",
    trend: "up",
    description: "of severity hotspots",
    icon: Target,
    color: "text-purple-600",
  },
  {
    title: "Success Rate",
    value: "76%",
    change: "+8%",
    trend: "up",
    description: "intervention success",
    icon: TrendingUp,
    color: "text-orange-600",
  },
]

const hotspotClusters = [
  {
    id: "HS001",
    location: "Ahmednagar District",
    villages: 12,
    farmers: 1250,
    severity: "High",
    issue: "Cotton bollworm outbreak",
    status: "active_intervention",
    resources: "Pesticides, Training",
    coordinator: "Priya Sharma",
    lastUpdate: "2 hours ago",
  },
  {
    id: "HS002",
    location: "Solapur District",
    villages: 8,
    farmers: 890,
    severity: "Medium",
    issue: "Sugarcane red rot",
    status: "monitoring",
    resources: "Disease-resistant seeds",
    coordinator: "Rajesh Patil",
    lastUpdate: "5 hours ago",
  },
  {
    id: "HS003",
    location: "Sangli District",
    villages: 15,
    farmers: 1680,
    severity: "High",
    issue: "Grape powdery mildew",
    status: "resource_allocation",
    resources: "Fungicides, Equipment",
    coordinator: "Sunita Desai",
    lastUpdate: "1 day ago",
  },
  {
    id: "HS004",
    location: "Kolhapur District",
    villages: 6,
    farmers: 520,
    severity: "Low",
    issue: "Rice blast disease",
    status: "completed",
    resources: "Training completed",
    coordinator: "Amit Kumar",
    lastUpdate: "3 days ago",
  },
]

const outreachPrograms = [
  {
    id: "OP001",
    name: "Integrated Pest Management Training",
    location: "Pune District",
    participants: 450,
    target: 500,
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    status: "ongoing",
    budget: 125000,
    spent: 89000,
  },
  {
    id: "OP002",
    name: "Organic Farming Awareness",
    location: "Nashik District",
    participants: 320,
    target: 300,
    startDate: "2024-01-10",
    endDate: "2024-01-25",
    status: "completed",
    budget: 85000,
    spent: 82000,
  },
  {
    id: "OP003",
    name: "Climate-Smart Agriculture",
    location: "Aurangabad District",
    participants: 180,
    target: 400,
    startDate: "2024-02-01",
    endDate: "2024-03-01",
    status: "ongoing",
    budget: 150000,
    spent: 67000,
  },
]

const monthlyEngagement = [
  { month: "Jan", farmers: 1850, programs: 12, villages: 45, success: 72 },
  { month: "Feb", farmers: 2100, programs: 15, villages: 52, success: 74 },
  { month: "Mar", farmers: 2350, programs: 18, villages: 58, success: 76 },
  { month: "Apr", farmers: 2650, programs: 21, villages: 63, success: 78 },
  { month: "May", farmers: 2400, programs: 19, villages: 61, success: 75 },
  { month: "Jun", farmers: 2847, programs: 23, villages: 67, success: 76 },
]

const resourceAllocation = [
  { category: "Training Materials", allocated: 450000, used: 380000, remaining: 70000 },
  { category: "Pesticides/Fertilizers", allocated: 680000, used: 620000, remaining: 60000 },
  { category: "Equipment", allocated: 320000, used: 280000, remaining: 40000 },
  { category: "Transportation", allocated: 150000, used: 135000, remaining: 15000 },
  { category: "Personnel", allocated: 800000, used: 750000, remaining: 50000 },
]

const interventionTypes = [
  { name: "Training Programs", value: 35, color: "#10b981" },
  { name: "Resource Distribution", value: 28, color: "#3b82f6" },
  { name: "Technical Support", value: 22, color: "#f59e0b" },
  { name: "Awareness Campaigns", value: 15, color: "#8b5cf6" },
]

export function NGOPartnerDashboard({ user }: NGOPartnerDashboardProps) {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null)
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active_intervention":
        return <Badge variant="destructive">Active Intervention</Badge>
      case "monitoring":
        return <Badge className="bg-yellow-600 hover:bg-yellow-700">Monitoring</Badge>
      case "resource_allocation":
        return <Badge variant="secondary">Resource Allocation</Badge>
      case "completed":
        return <Badge variant="default">Completed</Badge>
      case "ongoing":
        return <Badge className="bg-blue-600 hover:bg-blue-700">Ongoing</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "High":
        return <Badge variant="destructive">High</Badge>
      case "Medium":
        return <Badge className="bg-yellow-600 hover:bg-yellow-700">Medium</Badge>
      case "Low":
        return <Badge variant="default">Low</Badge>
      default:
        return <Badge variant="secondary">{severity}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Community Impact Dashboard</h1>
          <p className="text-muted-foreground text-pretty">
            {user.organization} - Grassroots interventions and farmer outreach coordination
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="all-regions">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-regions">All Regions</SelectItem>
              <SelectItem value="maharashtra">Maharashtra</SelectItem>
              <SelectItem value="karnataka">Karnataka</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Drive
          </Button>
          <Button size="sm">
            <Heart className="h-4 w-4 mr-2" />
            New Intervention
          </Button>
        </div>
      </div>

      {/* Impact KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactKPIs.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className={`h-5 w-5 ${kpi.color}`} />
                  </div>
                  <Badge variant="default" className="text-xs">
                    {kpi.change}
                  </Badge>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold">{kpi.value}</h3>
                  <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{kpi.description}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Dashboard */}
      <Tabs defaultValue="hotspots" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hotspots">Hotspot Clusters</TabsTrigger>
          <TabsTrigger value="outreach">Outreach Programs</TabsTrigger>
          <TabsTrigger value="resources">Resource Management</TabsTrigger>
          <TabsTrigger value="impact">Impact Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="hotspots" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Hotspot List */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-red-500" />
                  <span>Active Hotspot Clusters</span>
                </CardTitle>
                <CardDescription>Priority areas requiring immediate intervention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hotspotClusters.map((hotspot) => (
                    <div
                      key={hotspot.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedHotspot === hotspot.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedHotspot(hotspot.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium">{hotspot.location}</h4>
                            <Badge variant="outline" className="text-xs">
                              {hotspot.id}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{hotspot.issue}</p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span>
                              <strong>{hotspot.villages}</strong> villages
                            </span>
                            <span>
                              <strong>{hotspot.farmers.toLocaleString()}</strong> farmers
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Coordinator: {hotspot.coordinator} • {hotspot.lastUpdate}
                          </p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          {getStatusBadge(hotspot.status)}
                          {getSeverityBadge(hotspot.severity)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Hotspot Details */}
            <Card>
              <CardHeader>
                <CardTitle>Intervention Details</CardTitle>
                <CardDescription>
                  {selectedHotspot ? `Hotspot ${selectedHotspot}` : "Select a hotspot to view details"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedHotspot ? (
                  <div className="space-y-4">
                    {(() => {
                      const hotspot = hotspotClusters.find((h) => h.id === selectedHotspot)
                      if (!hotspot) return null
                      return (
                        <>
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm font-medium">Location & Scale</label>
                              <div className="mt-1 p-3 bg-muted/50 rounded-md">
                                <p className="font-medium">{hotspot.location}</p>
                                <p className="text-sm text-muted-foreground">
                                  {hotspot.villages} villages, {hotspot.farmers.toLocaleString()} farmers affected
                                </p>
                              </div>
                            </div>

                            <div>
                              <label className="text-sm font-medium">Issue & Resources</label>
                              <div className="mt-1 p-3 bg-muted/50 rounded-md">
                                <p className="font-medium">{hotspot.issue}</p>
                                <p className="text-sm text-muted-foreground">Resources: {hotspot.resources}</p>
                              </div>
                            </div>

                            <div>
                              <label className="text-sm font-medium">Coordinator</label>
                              <div className="mt-1 p-3 bg-muted/50 rounded-md">
                                <p className="font-medium">{hotspot.coordinator}</p>
                                <p className="text-sm text-muted-foreground">Last update: {hotspot.lastUpdate}</p>
                              </div>
                            </div>

                            <div className="flex space-x-2">
                              <Button size="sm" className="flex-1">
                                <Phone className="h-4 w-4 mr-2" />
                                Contact
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1">
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Update
                              </Button>
                            </div>

                            <Button size="sm" className="w-full">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Deploy Resources
                            </Button>
                          </div>
                        </>
                      )
                    })()}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Select a hotspot to view intervention details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="outreach" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Programs List */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Megaphone className="h-5 w-5 text-blue-500" />
                  <span>Outreach Programs</span>
                </CardTitle>
                <CardDescription>Active and completed awareness drives</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {outreachPrograms.map((program) => (
                    <div
                      key={program.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedProgram === program.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedProgram(program.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium">{program.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {program.id}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{program.location}</p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span>
                              <strong>{program.participants}</strong>/{program.target} participants
                            </span>
                            <span>₹{(program.spent / 1000).toFixed(0)}K spent</span>
                          </div>
                          <div className="mt-2">
                            <Progress
                              value={(program.participants / program.target) * 100}
                              className="h-2"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          {getStatusBadge(program.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Program Details */}
            <Card>
              <CardHeader>
                <CardTitle>Program Details</CardTitle>
                <CardDescription>
                  {selectedProgram ? `Program ${selectedProgram}` : "Select a program to view details"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedProgram ? (
                  <div className="space-y-4">
                    {(() => {
                      const program = outreachPrograms.find((p) => p.id === selectedProgram)
                      if (!program) return null
                      return (
                        <>
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm font-medium">Program Overview</label>
                              <div className="mt-1 p-3 bg-muted/50 rounded-md">
                                <p className="font-medium">{program.name}</p>
                                <p className="text-sm text-muted-foreground">{program.location}</p>
                              </div>
                            </div>

                            <div>
                              <label className="text-sm font-medium">Progress</label>
                              <div className="mt-1 p-3 bg-muted/50 rounded-md">
                                <div className="flex justify-between mb-2">
                                  <span className="text-sm">Participants</span>
                                  <span className="text-sm font-medium">
                                    {program.participants}/{program.target}
                                  </span>
                                </div>
                                <Progress
                                  value={(program.participants / program.target) * 100}
                                  className="h-2"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="text-sm font-medium">Budget</label>
                              <div className="mt-1 p-3 bg-muted/50 rounded-md">
                                <div className="flex justify-between mb-2">
                                  <span className="text-sm">Spent</span>
                                  <span className="text-sm font-medium">
                                    ₹{(program.spent / 1000).toFixed(0)}K / ₹{(program.budget / 1000).toFixed(0)}K
                                  </span>
                                </div>
                                <Progress
                                  value={(program.spent / program.budget) * 100}
                                  className="h-2"
                                />
                              </div>
                            </div>

                            <div className="flex space-x-2">
                              <Button size="sm" className="flex-1">
                                <Calendar className="h-4 w-4 mr-2" />
                                Schedule
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1">
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Report
                              </Button>
                            </div>
                          </div>
                        </>
                      )
                    })()}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Megaphone className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Select a program to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Resource Allocation */}
            <Card>
              <CardHeader>
                <CardTitle>Resource Allocation Overview</CardTitle>
                <CardDescription>Budget utilization across categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resourceAllocation.map((resource, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{resource.category}</span>
                        <span className="text-sm text-muted-foreground">
                          ₹{(resource.used / 1000).toFixed(0)}K / ₹{(resource.allocated / 1000).toFixed(0)}K
                        </span>
                      </div>
                      <Progress value={(resource.used / resource.allocated) * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Used: {((resource.used / resource.allocated) * 100).toFixed(1)}%</span>
                        <span>Remaining: ₹{(resource.remaining / 1000).toFixed(0)}K</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Intervention Types */}
            <Card>
              <CardHeader>
                <CardTitle>Intervention Distribution</CardTitle>
                <CardDescription>Types of interventions deployed</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={interventionTypes}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {interventionTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Monthly Engagement Trends</span>
              </CardTitle>
              <CardDescription>Farmer engagement and program success metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={monthlyEngagement}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="farmers" stackId="1" stroke="#10b981" fill="#10b981" name="Farmers" />
                  <Area type="monotone" dataKey="villages" stackId="2" stroke="#3b82f6" fill="#3b82f6" name="Villages" />
                  <Area type="monotone" dataKey="programs" stackId="3" stroke="#f59e0b" fill="#f59e0b" name="Programs" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
