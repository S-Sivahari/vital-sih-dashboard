"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  TrendingUp,
  DollarSign,
  BarChart3,
  AlertTriangle,
} from "lucide-react"
import type { User } from "@/lib/auth"

interface MarketAnalystDashboardProps {
  user: User
}

// Mock data for market analyst dashboard
const marketKPIs = [
  {
    title: "Average Mandi Price",
    value: "₹2,847",
    description: "per quintal",
    icon: DollarSign,
  },
  {
    title: "Price Volatility",
    value: "7.2%",
    description: "market change",
    icon: BarChart3,
  },
  {
    title: "Active Alerts",
    value: "12",
    description: "price anomalies",
    icon: AlertTriangle,
  },
]

const priceData = [
  { date: "Week 1", rice: 2100, wheat: 2300 },
  { date: "Week 2", rice: 2150, wheat: 2280 },
  { date: "Week 3", rice: 2200, wheat: 2350 },
  { date: "Week 4", rice: 2180, wheat: 2400 },
  { date: "Week 5", rice: 2250, wheat: 2450 },
  { date: "Week 6", rice: 2300, wheat: 2500 },
]

const mandiData = [
  { name: "Pune APMC", rice: 2400, wheat: 2580, trend: "up" },
  { name: "Mumbai APMC", rice: 2350, wheat: 2520, trend: "down" },
  { name: "Nashik Mandi", rice: 2380, wheat: 2550, trend: "up" },
  { name: "Aurangabad", rice: 2420, wheat: 2600, trend: "up" },
]

export function MarketAnalystDashboard({ user }: MarketAnalystDashboardProps) {
  const [selectedCommodity, setSelectedCommodity] = useState("rice")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Market Analyst Dashboard</h1>
          <p className="text-muted-foreground">
            Price analysis and market monitoring for {user.district}, {user.state}
          </p>
        </div>
      </div>

      {/* Dashboard KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {marketKPIs.map((kpi, index) => {
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
        {/* Price Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Price Trends</CardTitle>
            <CardDescription>Weekly commodity price movements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Select value={selectedCommodity} onValueChange={setSelectedCommodity}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey={selectedCommodity} 
                  stroke="#2563eb" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Mandi Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Mandi Comparison</CardTitle>
            <CardDescription>Current prices across different mandis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mandiData.map((mandi, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium">{mandi.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Rice: ₹{mandi.rice} • Wheat: ₹{mandi.wheat}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={mandi.trend === "up" ? "default" : "secondary"}>
                      {mandi.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <div className="h-3 w-3 bg-gray-400 rounded-full mr-1" />
                      )}
                      {mandi.trend}
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
