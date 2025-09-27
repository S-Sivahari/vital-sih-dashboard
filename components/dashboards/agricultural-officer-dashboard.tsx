"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import {
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Phone,
} from "lucide-react"
import type { User } from "@/lib/auth"

interface AgriculturalOfficerDashboardProps {
  user: User
}

interface FarmerReport {
  id: string
  farmer: string
  location: string
  crop: string
  issue: string
  severity: "High" | "Medium" | "Low"
  timestamp: string
  status: "pending" | "verified"
  phone: string
}

// Mock data for agricultural officer dashboard
const dashboardKPIs = [
  {
    title: "Pending Reports",
    value: "47",
    description: "awaiting verification",
    icon: Clock,
  },
  {
    title: "Verified Today",
    value: "23",
    description: "reports processed",
    icon: CheckCircle,
  },
  {
    title: "District Risk",
    value: "6.8/10",
    description: "crop health index",
    icon: AlertCircle,
  },
]

const farmerReports: FarmerReport[] = [
  {
    id: "FR001",
    farmer: "Ramesh Patil",
    location: "Khed, Pune",
    crop: "Cotton",
    issue: "Bollworm infestation",
    severity: "High" as const,
    timestamp: "2 hours ago",
    status: "pending" as const,
    phone: "+91 98765 43210",
  },
  {
    id: "FR002",
    farmer: "Sunita Sharma",
    location: "Baramati, Pune",
    crop: "Sugarcane",
    issue: "Red rot disease",
    severity: "Medium" as const,
    timestamp: "4 hours ago",
    status: "pending" as const,
    phone: "+91 98765 43211",
  },
  {
    id: "FR003",
    farmer: "Vijay Kumar",
    location: "Shirur, Pune",
    crop: "Tomato",
    issue: "Leaf curl virus",
    severity: "High" as const,
    timestamp: "6 hours ago",
    status: "verified" as const,
    phone: "+91 98765 43212",
  },
  {
    id: "FR004",
    farmer: "Meera Devi",
    location: "Junnar, Pune",
    crop: "Grapes",
    issue: "Powdery mildew",
    severity: "Low" as const,
    timestamp: "8 hours ago",
    status: "pending" as const,
    phone: "+91 98765 43213",
  },
]

const cropHealthData = [
  { crop: "Cotton", healthy: 65, affected: 35 },
  { crop: "Sugarcane", healthy: 78, affected: 22 },
  { crop: "Rice", healthy: 82, affected: 18 },
  { crop: "Tomato", healthy: 71, affected: 29 },
]

export function AgriculturalOfficerDashboard({ user }: AgriculturalOfficerDashboardProps) {
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const handleVerifyReport = (reportId: string) => {
    console.log('Verifying report:', reportId)
  }

  const filteredReports = farmerReports.filter(report => {
    const matchesStatus = filterStatus === "all" || report.status === filterStatus
    const matchesSearch = searchTerm === "" || 
      report.farmer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High": return "destructive"
      case "Medium": return "secondary" 
      case "Low": return "outline"
      default: return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Agricultural Officer Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor farmer reports and crop health in {user.district}, {user.state}
          </p>
        </div>
      </div>

      {/* Dashboard KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {dashboardKPIs.map((kpi, index) => {
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
        {/* Farmer Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Latest farmer reports requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search farmers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Filter */}
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Reports List */}
              <div className="space-y-3">
                {filteredReports.slice(0, 5).map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <div className="font-medium">{report.farmer}</div>
                      <div className="text-sm text-muted-foreground">{report.location} • {report.crop}</div>
                      <div className="text-xs text-muted-foreground">{report.issue}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getSeverityColor(report.severity)}>
                        {report.severity}
                      </Badge>
                      {report.status === 'pending' && (
                        <Button size="sm" onClick={() => handleVerifyReport(report.id)}>
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Crop Health Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Crop Health Overview</CardTitle>
            <CardDescription>Health status by crop type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cropHealthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="crop" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="healthy" fill="#10b981" name="Healthy %" />
                <Bar dataKey="affected" fill="#ef4444" name="Affected %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
