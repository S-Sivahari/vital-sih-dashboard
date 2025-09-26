"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Search,
  Eye,
  UserCheck,
  MessageSquare,
  Phone,
  Map,
} from "lucide-react"
import type { User } from "@/lib/auth"
import dynamic from "next/dynamic"

// Dynamically import the map component to avoid SSR issues
const FarmerLocationMap = dynamic(
  () => import("@/components/maps/farmer-location-map"),
  { 
    ssr: false,
    loading: () => (
      <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-400 animate-pulse" />
          <p className="text-gray-500">Loading map...</p>
        </div>
      </div>
    )
  }
)

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
  confidence: number
  timestamp: string
  status: "pending" | "verified" | "field_visit"
  coordinates: string
  phone: string
  lat: number
  lng: number
}

// Mock data for agricultural officer dashboard
const dashboardKPIs = [
  {
    title: "Pending Reports",
    value: "47",
    change: "+12",
    trend: "up",
    description: "awaiting verification",
    icon: Clock,
    color: "text-yellow-600",
  },
  {
    title: "Verified Today",
    value: "23",
    change: "+8",
    trend: "up",
    description: "reports processed",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Field Visits",
    value: "8",
    change: "+3",
    trend: "up",
    description: "scheduled this week",
    icon: MapPin,
    color: "text-blue-600",
  },
  {
    title: "District Risk",
    value: "6.8/10",
    change: "+0.5",
    trend: "up",
    description: "crop health index",
    icon: AlertCircle,
    color: "text-red-600",
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
    confidence: 92,
    timestamp: "2 hours ago",
    status: "pending" as const,
    coordinates: "18.4386° N, 73.6956° E",
    phone: "+91 98765 43210",
    lat: 18.4386,
    lng: 73.6956,
  },
  {
    id: "FR002",
    farmer: "Sunita Sharma",
    location: "Baramati, Pune",
    crop: "Sugarcane",
    issue: "Red rot disease",
    severity: "Medium" as const,
    confidence: 87,
    timestamp: "4 hours ago",
    status: "pending" as const,
    coordinates: "18.1516° N, 74.5815° E",
    phone: "+91 98765 43211",
    lat: 18.1516,
    lng: 74.5815,
  },
  {
    id: "FR003",
    farmer: "Vijay Kumar",
    location: "Shirur, Pune",
    crop: "Tomato",
    issue: "Leaf curl virus",
    severity: "High" as const,
    confidence: 94,
    timestamp: "6 hours ago",
    status: "verified" as const,
    coordinates: "18.8286° N, 74.3732° E",
    phone: "+91 98765 43212",
    lat: 18.8286,
    lng: 74.3732,
  },
  {
    id: "FR004",
    farmer: "Meera Devi",
    location: "Junnar, Pune",
    crop: "Grapes",
    issue: "Powdery mildew",
    severity: "Low" as const,
    confidence: 78,
    timestamp: "8 hours ago",
    status: "pending" as const,
    coordinates: "19.2073° N, 73.8757° E",
    phone: "+91 98765 43213",
    lat: 19.2073,
    lng: 73.8757,
  },
  {
    id: "FR005",
    farmer: "Anil Jadhav",
    location: "Maval, Pune",
    crop: "Rice",
    issue: "Brown plant hopper",
    severity: "Medium" as const,
    confidence: 89,
    timestamp: "1 day ago",
    status: "field_visit" as const,
    coordinates: "18.7644° N, 73.4394° E",
    phone: "+91 98765 43214",
    lat: 18.7644,
    lng: 73.4394,
  },
]

const verificationStats = [
  { month: "Jan", verified: 145, pending: 23, fieldVisits: 12 },
  { month: "Feb", verified: 167, pending: 31, fieldVisits: 15 },
  { month: "Mar", verified: 189, pending: 28, fieldVisits: 18 },
  { month: "Apr", verified: 203, pending: 35, fieldVisits: 22 },
  { month: "May", verified: 178, pending: 42, fieldVisits: 19 },
  { month: "Jun", verified: 156, pending: 47, fieldVisits: 16 },
]

const cropHealthData = [
  { crop: "Cotton", healthy: 65, affected: 35, reports: 89 },
  { crop: "Sugarcane", healthy: 78, affected: 22, reports: 67 },
  { crop: "Rice", healthy: 82, affected: 18, reports: 45 },
  { crop: "Tomato", healthy: 71, affected: 29, reports: 34 },
  { crop: "Grapes", healthy: 88, affected: 12, reports: 23 },
]

const severityDistribution = [
  { name: "Low", value: 45, color: "#10b981" },
  { name: "Medium", value: 32, color: "#f59e0b" },
  { name: "High", value: 23, color: "#ef4444" },
]

export function AgriculturalOfficerDashboard({ user }: AgriculturalOfficerDashboardProps) {
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("reports")
  const [reports, setReports] = useState<FarmerReport[]>(farmerReports)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [isBulkVerifyModalOpen, setIsBulkVerifyModalOpen] = useState(false)

  // Listen for navigation events from sidebar and keyboard shortcuts
  useEffect(() => {
    const handleTabNavigation = (event: CustomEvent) => {
      setActiveTab(event.detail)
    }

    const handleGlobalSearch = (event: CustomEvent) => {
      setSearchTerm(event.detail)
      // Switch to reports tab when searching
      if (event.detail && activeTab !== 'reports') {
        setActiveTab('reports')
      }
    }

    const handleKeyboardShortcuts = (event: KeyboardEvent) => {
      // Ctrl/Cmd + K to focus search (handled by layout)
      // Escape to clear filters
      if (event.key === 'Escape') {
        setFilterStatus('all')
        setSearchTerm('')
        setSelectedReport(null)
      }
      // Ctrl/Cmd + 1-4 for tab navigation
      if ((event.ctrlKey || event.metaKey) && event.key >= '1' && event.key <= '4') {
        event.preventDefault()
        const tabs = ['reports', 'analytics', 'field-visits', 'crop-health']
        setActiveTab(tabs[parseInt(event.key) - 1])
      }
    }

    window.addEventListener('navigateToTab', handleTabNavigation as EventListener)
    window.addEventListener('globalSearch', handleGlobalSearch as EventListener)
    window.addEventListener('keydown', handleKeyboardShortcuts)
    
    return () => {
      window.removeEventListener('navigateToTab', handleTabNavigation as EventListener)
      window.removeEventListener('globalSearch', handleGlobalSearch as EventListener)
      window.removeEventListener('keydown', handleKeyboardShortcuts)
    }
  }, [activeTab])

  // Handle report actions
  const handleVerifyReport = (reportId: string) => {
    setReports(prevReports => 
      prevReports.map(report => 
        report.id === reportId 
          ? { ...report, status: 'verified' }
          : report
      )
    )
    alert(`Report ${reportId} has been verified successfully!`)
  }

  const handleScheduleFieldVisit = (reportId: string) => {
    setReports(prevReports => 
      prevReports.map(report => 
        report.id === reportId 
          ? { ...report, status: 'field_visit' }
          : report
      )
    )
    alert(`Field visit scheduled for report ${reportId}`)
  }

  const handleBulkVerify = () => {
    const pendingReports = reports.filter(report => report.status === 'pending')
    if (pendingReports.length === 0) {
      alert("No pending reports to verify")
      return
    }
    
    setReports(prevReports => 
      prevReports.map(report => 
        report.status === 'pending' 
          ? { ...report, status: 'verified' }
          : report
      )
    )
    alert(`${pendingReports.length} reports have been bulk verified!`)
    setIsBulkVerifyModalOpen(false)
  }

  const handleScheduleVisit = () => {
    alert("Schedule Visit: This would open a calendar to schedule field visits")
    setIsScheduleModalOpen(false)
  }

  const handleCallFarmer = (phone: string, farmerName: string) => {
    alert(`Calling ${farmerName} at ${phone}...`)
  }

  const handleKPIClick = (kpiTitle: string) => {
    switch (kpiTitle) {
      case "Pending Reports":
        setFilterStatus("pending")
        setActiveTab("reports")
        break
      case "Verified Today":
        setFilterStatus("verified")
        setActiveTab("reports")
        break
      case "Field Visits":
        setFilterStatus("field_visit")
        setActiveTab("field-visits")
        break
      case "District Risk":
        setActiveTab("crop-health")
        break
      default:
        break
    }
  }

  const filteredReports = reports.filter((report) => {
    const matchesStatus = filterStatus === "all" || report.status === filterStatus
    const matchesSearch =
      searchTerm === "" ||
      report.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.crop.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "verified":
        return <Badge variant="default">Verified</Badge>
      case "field_visit":
        return <Badge variant="outline">Field Visit</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
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
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Field Operations Dashboard</h1>
                <p className="text-gray-600 text-sm font-medium">
                  📍 {user.district}, {user.state} • Real-time monitoring & verification
                </p>
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-2">
              Welcome back, {user.name}! You have <span className="font-semibold text-orange-600">47 pending reports</span> requiring your attention.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-gray-200 hover:bg-gray-50"
              onClick={() => setIsScheduleModalOpen(true)}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Visit
            </Button>
            <Button 
              size="sm" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => setIsBulkVerifyModalOpen(true)}
            >
              <UserCheck className="h-4 w-4 mr-2" />
              Bulk Verify
            </Button>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardKPIs.map((kpi, index) => {
          const Icon = kpi.icon
          const isPositive = kpi.trend === "up" && !kpi.title.includes("Risk")
          const isNegative = kpi.trend === "up" && kpi.title.includes("Risk")
          
          return (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer hover:scale-105"
              onClick={() => handleKPIClick(kpi.title)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${
                  kpi.title.includes("Pending") ? "bg-orange-50" :
                  kpi.title.includes("Verified") ? "bg-green-50" :
                  kpi.title.includes("Visits") ? "bg-blue-50" :
                  "bg-red-50"
                }`}>
                  <Icon className={`h-6 w-6 ${
                    kpi.title.includes("Pending") ? "text-orange-600" :
                    kpi.title.includes("Verified") ? "text-green-600" :
                    kpi.title.includes("Visits") ? "text-blue-600" :
                    "text-red-600"
                  }`} />
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isPositive ? "bg-green-100 text-green-700" :
                  isNegative ? "bg-red-100 text-red-700" :
                  "bg-gray-100 text-gray-700"
                }`}>
                  {kpi.change}
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
                <p className="text-sm font-semibold text-gray-700 mb-1">{kpi.title}</p>
                <p className="text-xs text-gray-500">{kpi.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Dashboard */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="bg-white rounded-xl p-1 shadow-sm border border-gray-100">
          <TabsList className="grid w-full grid-cols-5 bg-transparent gap-1">
            <TabsTrigger 
              value="reports" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg font-medium"
            >
              📋 Reports
            </TabsTrigger>
            <TabsTrigger 
              value="map" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg font-medium"
            >
              🗺️ Map View
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg font-medium"
            >
              📊 Analytics
            </TabsTrigger>
            <TabsTrigger 
              value="field-visits" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg font-medium"
            >
              🚜 Visits
            </TabsTrigger>
            <TabsTrigger 
              value="crop-health" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg font-medium"
            >
              🌾 Health
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Reports List */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Farmer Reports Queue</CardTitle>
                    <CardDescription>Real-time reports requiring verification</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search reports..."
                        className="pl-10 w-48"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="verified">Verified</SelectItem>
                        <SelectItem value="field_visit">Field Visit</SelectItem>
                      </SelectContent>
                    </Select>
                    {(searchTerm || filterStatus !== "all") && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSearchTerm('')
                          setFilterStatus('all')
                        }}
                      >
                        Clear Filters
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredReports.map((report) => (
                    <div
                      key={report.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedReport === report.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedReport(report.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>
                              {report.farmer
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium">{report.farmer}</h4>
                              <Badge variant="outline" className="text-xs">
                                {report.id}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{report.location}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-sm">
                                <strong>{report.crop}</strong> - {report.issue}
                              </span>
                              <div className="flex items-center space-x-1">
                                <span className="text-xs text-muted-foreground">AI Confidence:</span>
                                <Badge variant="outline" className="text-xs">
                                  {report.confidence}%
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          {getStatusBadge(report.status)}
                          {getSeverityBadge(report.severity)}
                          <span className="text-xs text-muted-foreground">{report.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Report Details */}
            <Card>
              <CardHeader>
                <CardTitle>Report Details</CardTitle>
                <CardDescription>
                  {selectedReport ? `Report ${selectedReport}` : "Select a report to view details"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedReport ? (
                  <div className="space-y-4">
                    {(() => {
                      const report = farmerReports.find((r) => r.id === selectedReport)
                      if (!report) return null
                      return (
                        <>
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm font-medium">Farmer Details</label>
                              <div className="mt-1 p-3 bg-muted/50 rounded-md">
                                <p className="font-medium">{report.farmer}</p>
                                <p className="text-sm text-muted-foreground">{report.phone}</p>
                                <p className="text-sm text-muted-foreground">{report.coordinates}</p>
                              </div>
                            </div>

                            <div>
                              <label className="text-sm font-medium">Issue Analysis</label>
                              <div className="mt-1 p-3 bg-muted/50 rounded-md">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium">{report.issue}</span>
                                  {getSeverityBadge(report.severity)}
                                </div>
                                <p className="text-sm text-muted-foreground">Crop: {report.crop}</p>
                                <p className="text-sm text-muted-foreground">AI Confidence: {report.confidence}%</p>
                              </div>
                            </div>

                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                className="flex-1"
                                onClick={() => alert(`Viewing images for ${report.issue} reported by ${report.farmer}`)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View Images
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleCallFarmer(report.phone, report.farmer)}
                              >
                                <Phone className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                className="flex-1"
                                onClick={() => handleVerifyReport(report.id)}
                                disabled={report.status === 'verified'}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                {report.status === 'verified' ? 'Verified' : 'Verify'}
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="flex-1 bg-transparent"
                                onClick={() => handleScheduleFieldVisit(report.id)}
                                disabled={report.status === 'field_visit'}
                              >
                                <MapPin className="h-4 w-4 mr-2" />
                                {report.status === 'field_visit' ? 'Scheduled' : 'Field Visit'}
                              </Button>
                            </div>
                          </div>
                        </>
                      )
                    })()}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Select a report to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="map" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map View */}
            <div className="lg:col-span-2">
              <FarmerLocationMap 
                reports={filteredReports}
                selectedReport={selectedReport}
                onReportSelect={setSelectedReport}
                onMarkerClick={(report) => {
                  setSelectedReport(report.id)
                  // You could also switch to reports tab here if needed
                }}
              />
            </div>

            {/* Map Controls & Stats */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="h-5 w-5 text-primary" />
                    Map Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Filter by Status</label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Reports</SelectItem>
                        <SelectItem value="pending">Pending Only</SelectItem>
                        <SelectItem value="verified">Verified Only</SelectItem>
                        <SelectItem value="field_visit">Field Visits</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Search Location</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by farmer or location..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  {(searchTerm || filterStatus !== "all") && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        setSearchTerm('')
                        setFilterStatus('all')
                        setSelectedReport(null)
                      }}
                    >
                      Clear All Filters
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Location Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Reports</span>
                      <Badge variant="outline">{filteredReports.length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">High Risk Areas</span>
                      <Badge variant="destructive">
                        {filteredReports.filter(r => r.severity === 'High').length}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Pending Verification</span>
                      <Badge variant="secondary">
                        {filteredReports.filter(r => r.status === 'pending').length}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Field Visits Scheduled</span>
                      <Badge variant="outline">
                        {filteredReports.filter(r => r.status === 'field_visit').length}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {selectedReport && (
                <Card>
                  <CardHeader>
                    <CardTitle>Selected Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const report = filteredReports.find(r => r.id === selectedReport)
                      if (!report) return null
                      return (
                        <div className="space-y-3">
                          <div>
                            <p className="font-medium">{report.farmer}</p>
                            <p className="text-sm text-muted-foreground">📍 {report.location}</p>
                          </div>
                          <div>
                            <p className="text-sm"><strong>Crop:</strong> {report.crop}</p>
                            <p className="text-sm"><strong>Issue:</strong> {report.issue}</p>
                          </div>
                          <div className="flex gap-2">
                            {getSeverityBadge(report.severity)}
                            {getStatusBadge(report.status)}
                          </div>
                          <div className="flex gap-2 pt-2">
                            <Button size="sm" className="flex-1" onClick={() => handleVerifyReport(report.id)}>
                              Verify
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleCallFarmer(report.phone, report.farmer)}>
                              <Phone className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )
                    })()}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Verification Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Verification Performance</CardTitle>
                <CardDescription>Monthly verification statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={verificationStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="verified" fill="#10b981" name="Verified" />
                    <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                    <Bar dataKey="fieldVisits" fill="#3b82f6" name="Field Visits" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Severity Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Issue Severity Distribution</CardTitle>
                <CardDescription>Current month breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={severityDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {severityDistribution.map((entry, index) => (
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

        <TabsContent value="field-visits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Field Visits</CardTitle>
              <CardDescription>Upcoming and completed field verification visits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-blue-200 bg-blue-50/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Anil Jadhav - Rice Farm</h4>
                      <p className="text-sm text-muted-foreground">Maval, Pune - Brown plant hopper</p>
                      <p className="text-xs text-muted-foreground">Scheduled: Tomorrow 10:00 AM</p>
                    </div>
                    <Badge variant="outline">Scheduled</Badge>
                  </div>
                </div>
                <div className="p-4 border border-green-200 bg-green-50/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Priya Desai - Cotton Farm</h4>
                      <p className="text-sm text-muted-foreground">Shirur, Pune - Bollworm infestation</p>
                      <p className="text-xs text-muted-foreground">Completed: Yesterday 2:30 PM</p>
                    </div>
                    <Badge variant="default">Completed</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crop-health" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>District Crop Health Overview</CardTitle>
              <CardDescription>Health status across major crops in {user.district}</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
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
        </TabsContent>
      </Tabs>

      {/* Simple Modal Dialogs */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Schedule Field Visit</h3>
            <p className="text-gray-600 mb-4">
              This would open a calendar interface to schedule field visits with farmers.
            </p>
            <div className="flex space-x-3">
              <Button onClick={handleScheduleVisit} className="flex-1">
                Confirm Schedule
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsScheduleModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {isBulkVerifyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Bulk Verify Reports</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to verify all pending reports? This action cannot be undone.
            </p>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-orange-800">
                <strong>{reports.filter(r => r.status === 'pending').length}</strong> reports will be verified
              </p>
            </div>
            <div className="flex space-x-3">
              <Button onClick={handleBulkVerify} className="flex-1">
                Verify All
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsBulkVerifyModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
