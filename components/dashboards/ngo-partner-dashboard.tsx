"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
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
  Users, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle, 
  Megaphone 
} from 'lucide-react'
import type { User } from "@/lib/auth"

interface NGOPartnerDashboardProps {
  user: User
}

// Mock data for NGO dashboard
const impactKPIs = [
  {
    title: "Farmers Engaged",
    value: "2,847",
    description: "this month",
    icon: Users,
  },
  {
    title: "Awareness Drives",
    value: "18",
    description: "completed",
    icon: Megaphone,
  },
  {
    title: "Success Rate",
    value: "76%",
    description: "intervention success",
    icon: TrendingUp,
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
  },
  {
    id: "HS002",
    location: "Solapur District", 
    villages: 8,
    farmers: 890,
    severity: "Medium",
    issue: "Sugarcane red rot",
    status: "monitoring",
  },
  {
    id: "HS003",
    location: "Sangli District",
    villages: 15,
    farmers: 1680,
    severity: "Low",
    issue: "Grape powdery mildew",
    status: "resolved",
  },
]

const interventionData = [
  { month: "Jan", interventions: 12, success: 9 },
  { month: "Feb", interventions: 15, success: 11 },
  { month: "Mar", interventions: 18, success: 14 },
  { month: "Apr", interventions: 22, success: 17 },
  { month: "May", interventions: 20, success: 16 },
  { month: "Jun", interventions: 25, success: 19 },
]

export function NGOPartnerDashboard({ user }: NGOPartnerDashboardProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High": return "destructive"
      case "Medium": return "secondary"
      case "Low": return "outline"
      default: return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active_intervention": return "destructive"
      case "monitoring": return "secondary"
      case "resolved": return "default"
      default: return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">NGO Partner Dashboard</h1>
          <p className="text-muted-foreground">
            Community outreach and intervention tracking for {user.district}, {user.state}
          </p>
        </div>
      </div>

      {/* Impact KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {impactKPIs.map((kpi, index) => {
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
        {/* Active Hotspots */}
        <Card>
          <CardHeader>
            <CardTitle>Active Hotspots</CardTitle>
            <CardDescription>Areas requiring intervention and monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hotspotClusters.map((hotspot) => (
                <div key={hotspot.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{hotspot.location}</h4>
                      <p className="text-sm text-muted-foreground">{hotspot.issue}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Badge variant={getSeverityColor(hotspot.severity)}>
                        {hotspot.severity}
                      </Badge>
                      <Badge variant={getStatusColor(hotspot.status)}>
                        {hotspot.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Villages:</span> {hotspot.villages}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Farmers:</span> {hotspot.farmers}
                    </div>
                  </div>
                  <div className="mt-3">
                    <Button size="sm" variant="outline">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Update Status
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Intervention Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Intervention Analytics</CardTitle>
            <CardDescription>Monthly intervention success tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={interventionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="interventions" fill="#3b82f6" name="Total Interventions" />
                <Bar dataKey="success" fill="#10b981" name="Successful" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
