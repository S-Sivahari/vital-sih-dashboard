"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  ReferenceLine,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  AlertTriangle,
  Target,
  Download,
  Bell,
  MapPin,
} from "lucide-react"
import type { User } from "@/lib/auth"

interface MarketAnalystDashboardProps {
  user: User
}

// Mock data for market analyst dashboard
const marketKPIs = [
  {
    title: "Price Volatility Index",
    value: "7.2",
    change: "+1.3",
    trend: "up",
    description: "market instability",
    icon: BarChart3,
    color: "text-red-600",
  },
  {
    title: "Average Mandi Price",
    value: "₹2,847",
    change: "+12.5%",
    trend: "up",
    description: "per quintal (weighted avg)",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Forecast Accuracy",
    value: "87.3%",
    change: "+2.1%",
    trend: "up",
    description: "last 30 days",
    icon: Target,
    color: "text-blue-600",
  },
  {
    title: "Active Alerts",
    value: "12",
    change: "+4",
    trend: "up",
    description: "price anomalies",
    icon: AlertTriangle,
    color: "text-orange-600",
  },
]

const priceData = [
  { date: "Jan 1", rice: 2100, wheat: 2300, cotton: 5800, sugarcane: 350, onion: 1200 },
  { date: "Jan 8", rice: 2150, wheat: 2280, cotton: 5950, sugarcane: 360, onion: 1350 },
  { date: "Jan 15", rice: 2200, wheat: 2350, cotton: 6100, sugarcane: 355, onion: 1180 },
  { date: "Jan 22", rice: 2180, wheat: 2400, cotton: 5900, sugarcane: 365, onion: 1420 },
  { date: "Jan 29", rice: 2250, wheat: 2450, cotton: 6200, sugarcane: 370, onion: 1380 },
  { date: "Feb 5", rice: 2300, wheat: 2500, cotton: 6350, sugarcane: 375, onion: 1250 },
  { date: "Feb 12", rice: 2280, wheat: 2480, cotton: 6180, sugarcane: 380, onion: 1480 },
  { date: "Feb 19", rice: 2350, wheat: 2520, cotton: 6400, sugarcane: 385, onion: 1320 },
  { date: "Feb 26", rice: 2400, wheat: 2580, cotton: 6500, sugarcane: 390, onion: 1550 },
  { date: "Mar 5", rice: 2380, wheat: 2550, cotton: 6300, sugarcane: 395, onion: 1450 },
]

const mandiComparison = [
  {
    mandi: "Pune APMC",
    location: "Maharashtra",
    rice: 2400,
    wheat: 2580,
    cotton: 6500,
    volume: 1250,
    trend: "up",
    lastUpdate: "2 hours ago",
  },
  {
    mandi: "Nashik Mandi",
    location: "Maharashtra",
    rice: 2350,
    wheat: 2520,
    cotton: 6300,
    volume: 980,
    trend: "stable",
    lastUpdate: "3 hours ago",
  },
  {
    mandi: "Solapur APMC",
    location: "Maharashtra",
    rice: 2420,
    wheat: 2600,
    cotton: 6600,
    volume: 1100,
    trend: "up",
    lastUpdate: "1 hour ago",
  },
  {
    mandi: "Aurangabad Mandi",
    location: "Maharashtra",
    rice: 2380,
    wheat: 2550,
    cotton: 6400,
    volume: 850,
    trend: "down",
    lastUpdate: "4 hours ago",
  },
  {
    mandi: "Kolhapur APMC",
    location: "Maharashtra",
    rice: 2450,
    wheat: 2620,
    cotton: 6550,
    volume: 1300,
    trend: "up",
    lastUpdate: "1 hour ago",
  },
]

const demandSupplyForecast = [
  { month: "Jan", demand: 85, supply: 92, price: 2100 },
  { month: "Feb", demand: 88, supply: 89, price: 2250 },
  { month: "Mar", demand: 92, supply: 87, price: 2400 },
  { month: "Apr", demand: 95, supply: 85, price: 2580 },
  { month: "May", demand: 98, supply: 82, price: 2750 },
  { month: "Jun", demand: 100, supply: 80, price: 2900 },
  { month: "Jul", demand: 96, supply: 85, price: 2650 },
  { month: "Aug", demand: 90, supply: 90, price: 2400 },
]

const priceAlerts = [
  {
    id: "PA001",
    commodity: "Onion",
    mandi: "Pune APMC",
    currentPrice: 1550,
    threshold: 1200,
    change: "+29.2%",
    severity: "High",
    type: "Price Spike",
    timestamp: "15 minutes ago",
  },
  {
    id: "PA002",
    commodity: "Cotton",
    mandi: "Solapur APMC",
    currentPrice: 6600,
    threshold: 6000,
    change: "+10.0%",
    severity: "Medium",
    type: "Above Threshold",
    timestamp: "1 hour ago",
  },
  {
    id: "PA003",
    commodity: "Rice",
    mandi: "Nashik Mandi",
    currentPrice: 2350,
    threshold: 2500,
    change: "-6.0%",
    severity: "Low",
    type: "Below Expected",
    timestamp: "2 hours ago",
  },
  {
    id: "PA004",
    commodity: "Wheat",
    mandi: "Aurangabad Mandi",
    currentPrice: 2550,
    threshold: 2400,
    change: "+6.3%",
    severity: "Medium",
    type: "Gradual Rise",
    timestamp: "3 hours ago",
  },
]

const volatilityData = [
  { commodity: "Onion", volatility: 24.5, avgPrice: 1380, volume: 450 },
  { commodity: "Cotton", volatility: 12.3, avgPrice: 6350, volume: 1200 },
  { commodity: "Rice", volatility: 8.7, avgPrice: 2320, volume: 2100 },
  { commodity: "Wheat", volatility: 6.2, avgPrice: 2520, volume: 1800 },
  { commodity: "Sugarcane", volatility: 4.1, avgPrice: 380, volume: 3200 },
]

const seasonalTrends = [
  { month: "Jan", historical: 2200, current: 2400, forecast: 2350 },
  { month: "Feb", historical: 2150, current: 2380, forecast: 2420 },
  { month: "Mar", historical: 2300, current: 2450, forecast: 2500 },
  { month: "Apr", historical: 2450, current: 2580, forecast: 2650 },
  { month: "May", historical: 2600, current: 2750, forecast: 2800 },
  { month: "Jun", historical: 2750, current: 2900, forecast: 2950 },
]

export function MarketAnalystDashboard({ user }: MarketAnalystDashboardProps) {
  const [selectedCommodity, setSelectedCommodity] = useState("rice")
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d")

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />
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
          <h1 className="text-3xl font-bold text-balance">Market Intelligence Dashboard</h1>
          <p className="text-muted-foreground text-pretty">
            Real-time price analysis, demand forecasting, and market stability monitoring
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Set Alert
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Market KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketKPIs.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className={`h-5 w-5 ${kpi.color}`} />
                  </div>
                  <Badge variant={kpi.trend === "up" ? "secondary" : "default"} className="text-xs">
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
      <Tabs defaultValue="prices" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="prices">Price Trends</TabsTrigger>
          <TabsTrigger value="mandis">Mandi Comparison</TabsTrigger>
          <TabsTrigger value="forecasts">Demand & Supply</TabsTrigger>
          <TabsTrigger value="alerts">Price Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="prices" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Price Trends Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <span>Commodity Price Trends</span>
                    </CardTitle>
                    <CardDescription>Historical price movements (₹ per quintal)</CardDescription>
                  </div>
                  <Select value={selectedCommodity} onValueChange={setSelectedCommodity}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="cotton">Cotton</SelectItem>
                      <SelectItem value="onion">Onion</SelectItem>
                      <SelectItem value="sugarcane">Sugarcane</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={priceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey={selectedCommodity}
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ fill: "#10b981" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Volatility Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-orange-500" />
                  <span>Volatility Index</span>
                </CardTitle>
                <CardDescription>Price stability by commodity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {volatilityData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium">{item.commodity}</div>
                        <div className="text-sm text-muted-foreground">₹{item.avgPrice.toLocaleString()}</div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-bold ${item.volatility > 15 ? "text-red-600" : item.volatility > 10 ? "text-yellow-600" : "text-green-600"}`}
                        >
                          {item.volatility}%
                        </div>
                        <div className="text-xs text-muted-foreground">{item.volume}T volume</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Seasonal Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Seasonal Price Patterns</CardTitle>
              <CardDescription>Historical vs current vs forecast prices for {selectedCommodity}</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={seasonalTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="historical"
                    stroke="#94a3b8"
                    strokeWidth={2}
                    name="Historical Avg"
                    strokeDasharray="5 5"
                  />
                  <Line type="monotone" dataKey="current" stroke="#10b981" strokeWidth={2} name="Current Year" />
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Forecast"
                    strokeDasharray="3 3"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mandis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-blue-500" />
                <span>Mandi Price Comparison</span>
              </CardTitle>
              <CardDescription>Real-time prices across major agricultural markets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Mandi</th>
                      <th className="text-right p-3">Rice (₹/Q)</th>
                      <th className="text-right p-3">Wheat (₹/Q)</th>
                      <th className="text-right p-3">Cotton (₹/Q)</th>
                      <th className="text-right p-3">Volume (T)</th>
                      <th className="text-center p-3">Trend</th>
                      <th className="text-right p-3">Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mandiComparison.map((mandi, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-3">
                          <div>
                            <div className="font-medium">{mandi.mandi}</div>
                            <div className="text-sm text-muted-foreground">{mandi.location}</div>
                          </div>
                        </td>
                        <td className="text-right p-3 font-mono">{mandi.rice.toLocaleString()}</td>
                        <td className="text-right p-3 font-mono">{mandi.wheat.toLocaleString()}</td>
                        <td className="text-right p-3 font-mono">{mandi.cotton.toLocaleString()}</td>
                        <td className="text-right p-3">{mandi.volume}</td>
                        <td className="text-center p-3">{getTrendIcon(mandi.trend)}</td>
                        <td className="text-right p-3 text-sm text-muted-foreground">{mandi.lastUpdate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecasts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Demand Supply Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Demand vs Supply Forecast</CardTitle>
                <CardDescription>Market balance prediction for rice (index: 100 = balanced)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={demandSupplyForecast}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <ReferenceLine y={100} stroke="#94a3b8" strokeDasharray="3 3" />
                    <Bar dataKey="demand" fill="#ef4444" name="Demand Index" />
                    <Bar dataKey="supply" fill="#10b981" name="Supply Index" />
                    <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} name="Price (₹/Q)" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Price Forecast */}
            <Card>
              <CardHeader>
                <CardTitle>Price Forecast Model</CardTitle>
                <CardDescription>AI-predicted price movements based on market indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50/50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Next Week Prediction</span>
                      <Badge variant="default">87% Confidence</Badge>
                    </div>
                    <div className="text-2xl font-bold text-green-600">₹2,420 - ₹2,480</div>
                    <p className="text-sm text-muted-foreground">Expected price range for rice</p>
                  </div>
                  <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Monthly Outlook</span>
                      <Badge variant="outline">72% Confidence</Badge>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">Moderate Increase</div>
                    <p className="text-sm text-muted-foreground">5-8% price appreciation expected</p>
                  </div>
                  <div className="p-4 bg-yellow-50/50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Risk Factors</span>
                      <Badge className="bg-yellow-600 hover:bg-yellow-700">Medium Risk</Badge>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Monsoon dependency</li>
                      <li>• Export policy changes</li>
                      <li>• Storage capacity constraints</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span>Active Price Alerts</span>
              </CardTitle>
              <CardDescription>Real-time anomaly detection and threshold breaches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {priceAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 border rounded-lg ${
                      alert.severity === "High"
                        ? "border-red-200 bg-red-50/50"
                        : alert.severity === "Medium"
                          ? "border-yellow-200 bg-yellow-50/50"
                          : "border-blue-200 bg-blue-50/50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium">{alert.commodity}</h4>
                          <Badge variant="outline" className="text-xs">
                            {alert.id}
                          </Badge>
                          {getSeverityBadge(alert.severity)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{alert.mandi}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span>
                            <strong>Current:</strong> ₹{alert.currentPrice.toLocaleString()}
                          </span>
                          <span>
                            <strong>Threshold:</strong> ₹{alert.threshold.toLocaleString()}
                          </span>
                          <span
                            className={`font-medium ${alert.change.startsWith("+") ? "text-red-600" : "text-green-600"}`}
                          >
                            {alert.change}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-2">
                          {alert.type}
                        </Badge>
                        <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
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
