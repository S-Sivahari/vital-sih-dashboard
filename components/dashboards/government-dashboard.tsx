"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import {
  MapPin,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Shield,
  Cloud,
  DollarSign,
  Users,
  Download,
  Filter,
} from "lucide-react"
import type { User } from "@/lib/auth"

interface GovernmentDashboardProps {
  user: User
}

// Mock data for government dashboard
const nationalKPIs = [
  {
    title: "Area Affected",
    value: "12.3%",
    change: "+2.1%",
    trend: "up",
    description: "of total cropped land",
    icon: MapPin,
  },
  {
    title: "Forecasted Yield Loss",
    value: "₹2,847 Cr",
    change: "-5.2%",
    trend: "down",
    description: "potential economic impact",
    icon: TrendingDown,
  },
  {
    title: "Outbreak Severity",
    value: "7.2/10",
    change: "+0.8",
    trend: "up",
    description: "national severity index",
    icon: AlertTriangle,
  },
  {
    title: "Subsidy Impact",
    value: "₹1,234 Cr",
    change: "+12.5%",
    trend: "up",
    description: "allocated for crop protection",
    icon: DollarSign,
  },
]

const stateData = [
  { state: "Maharashtra", affected: 15.2, yieldLoss: 450, severity: 8.1, farmers: 125000 },
  { state: "Karnataka", affected: 11.8, yieldLoss: 320, severity: 7.3, farmers: 98000 },
  { state: "Andhra Pradesh", affected: 13.5, yieldLoss: 380, severity: 7.8, farmers: 110000 },
  { state: "Tamil Nadu", affected: 9.2, yieldLoss: 280, severity: 6.5, farmers: 85000 },
  { state: "Gujarat", affected: 8.7, yieldLoss: 250, severity: 6.2, farmers: 75000 },
  { state: "Rajasthan", affected: 14.1, yieldLoss: 410, severity: 7.9, farmers: 115000 },
]

const cropYieldForecast = [
  { month: "Jan", rice: 85, wheat: 92, cotton: 78, sugarcane: 88 },
  { month: "Feb", rice: 82, wheat: 89, cotton: 75, sugarcane: 85 },
  { month: "Mar", rice: 79, wheat: 86, cotton: 72, sugarcane: 82 },
  { month: "Apr", rice: 76, wheat: 83, cotton: 69, sugarcane: 79 },
  { month: "May", rice: 73, wheat: 80, cotton: 66, sugarcane: 76 },
  { month: "Jun", rice: 70, wheat: 77, cotton: 63, sugarcane: 73 },
]

const pestOutbreakTrends = [
  { month: "Jan", bollworm: 12, aphids: 8, thrips: 15, whitefly: 10 },
  { month: "Feb", bollworm: 18, aphids: 12, thrips: 22, whitefly: 16 },
  { month: "Mar", bollworm: 25, aphids: 18, thrips: 28, whitefly: 22 },
  { month: "Apr", bollworm: 32, aphids: 25, thrips: 35, whitefly: 28 },
  { month: "May", bollworm: 28, aphids: 22, thrips: 31, whitefly: 25 },
  { month: "Jun", bollworm: 24, aphids: 19, thrips: 27, whitefly: 21 },
]

const weatherImpactData = [
  { region: "North", temperature: 42, rainfall: 15, humidity: 65, impact: "High" },
  { region: "South", temperature: 38, rainfall: 45, humidity: 78, impact: "Medium" },
  { region: "East", temperature: 35, rainfall: 85, humidity: 82, impact: "Low" },
  { region: "West", temperature: 41, rainfall: 25, humidity: 58, impact: "High" },
  { region: "Central", temperature: 39, rainfall: 35, humidity: 72, impact: "Medium" },
]

const subsidyAllocation = [
  { category: "Pest Control", amount: 450, percentage: 36.4 },
  { category: "Seed Subsidy", amount: 320, percentage: 25.9 },
  { category: "Fertilizer", amount: 280, percentage: 22.7 },
  { category: "Insurance", amount: 184, percentage: 14.9 },
]

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"]

export function GovernmentDashboard({ user }: GovernmentDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Policy & Strategic Overview</h1>
          <p className="text-muted-foreground text-pretty">
            National agricultural insights for strategic planning and policy decisions
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="national">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="national">National</SelectItem>
              <SelectItem value="state">State Level</SelectItem>
              <SelectItem value="district">District Level</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* National KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {nationalKPIs.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant={kpi.trend === "up" ? "destructive" : "default"} className="text-xs">
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

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="regional">Regional Analysis</TabsTrigger>
          <TabsTrigger value="forecasts">Yield Forecasts</TabsTrigger>
          <TabsTrigger value="policy">Policy Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pest Outbreak Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <span>Pest Outbreak Trends</span>
                </CardTitle>
                <CardDescription>Monthly pest severity across major crops</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={pestOutbreakTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="bollworm" stackId="1" stroke="#ef4444" fill="#ef4444" />
                    <Area type="monotone" dataKey="aphids" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
                    <Area type="monotone" dataKey="thrips" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                    <Area type="monotone" dataKey="whitefly" stackId="1" stroke="#10b981" fill="#10b981" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Weather Impact Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Cloud className="h-5 w-5 text-blue-500" />
                  <span>Weather Impact Analysis</span>
                </CardTitle>
                <CardDescription>Regional weather conditions and agricultural impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weatherImpactData.map((region, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="font-medium">{region.region}</div>
                        <Badge
                          variant={
                            region.impact === "High"
                              ? "destructive"
                              : region.impact === "Medium"
                                ? "secondary"
                                : "default"
                          }
                        >
                          {region.impact} Impact
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{region.temperature}°C</span>
                        <span>{region.rainfall}mm</span>
                        <span>{region.humidity}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="regional" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* State-wise Analysis */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>State-wise Agricultural Impact</CardTitle>
                <CardDescription>Comparative analysis across major agricultural states</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={stateData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="state" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="affected" fill="#ef4444" name="Area Affected %" />
                    <Bar dataKey="severity" fill="#f59e0b" name="Severity Index" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Affected States */}
            <Card>
              <CardHeader>
                <CardTitle>Priority States</CardTitle>
                <CardDescription>States requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stateData
                    .sort((a, b) => b.severity - a.severity)
                    .slice(0, 5)
                    .map((state, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{state.state}</div>
                          <div className="text-sm text-muted-foreground">{state.farmers.toLocaleString()} farmers</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-destructive">{state.severity}/10</div>
                          <div className="text-xs text-muted-foreground">severity</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecasts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Crop Yield Forecasts</span>
              </CardTitle>
              <CardDescription>Predicted yield performance for major crops (% of normal yield)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={cropYieldForecast}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="rice" stroke="#10b981" strokeWidth={2} name="Rice" />
                  <Line type="monotone" dataKey="wheat" stroke="#3b82f6" strokeWidth={2} name="Wheat" />
                  <Line type="monotone" dataKey="cotton" stroke="#f59e0b" strokeWidth={2} name="Cotton" />
                  <Line type="monotone" dataKey="sugarcane" stroke="#8b5cf6" strokeWidth={2} name="Sugarcane" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policy" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Subsidy Allocation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span>Subsidy Allocation</span>
                </CardTitle>
                <CardDescription>Current fiscal year budget distribution (₹ Crores)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={subsidyAllocation}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                    >
                      {subsidyAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Policy Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Policy Recommendations</span>
                </CardTitle>
                <CardDescription>AI-generated policy suggestions based on current data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <span className="font-medium text-destructive">High Priority</span>
                    </div>
                    <p className="text-sm">
                      Increase pest control subsidy allocation by 25% for Maharashtra and Rajasthan to address rising
                      bollworm outbreaks.
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium text-yellow-600">Medium Priority</span>
                    </div>
                    <p className="text-sm">
                      Implement weather-based crop insurance schemes in high-impact regions to mitigate climate risks.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-600">Strategic</span>
                    </div>
                    <p className="text-sm">
                      Expand F.A.R.M platform adoption through KVK partnerships to reach 2M+ additional farmers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
