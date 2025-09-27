"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Shield, Users, TrendingUp, Settings, MapPin, ArrowRight, LogOut, User } from "lucide-react"
import type { User as UserType } from "@/lib/auth"
import { mockUsers, getRoleDisplayName } from "@/lib/auth"

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)
  const router = useRouter()

  const handleRoleSelect = (role: string) => {
    // Navigate to the specific dashboard
    router.push(`/dashboard/${role}`)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    // Clear any stored session data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('vital-user')
      sessionStorage.removeItem('vital-user')
    }
  }

  const getRoleIcon = (role: string, size: string = "h-6 w-6") => {
    switch (role) {
      case "government":
        return <Shield className={size} />
      case "agricultural-officer":
        return <MapPin className={size} />
      case "ngo-partner":
        return <Users className={size} />
      case "market-analyst":
        return <TrendingUp className={size} />
      case "system-admin":
        return <Settings className={size} />
      default:
        return <Leaf className={size} />
    }
  }

  const getRoleDescription = (role: string) => {
    switch (role) {
      case "government":
        return "Policy oversight, resource allocation, and strategic agricultural planning"
      case "agricultural-officer":
        return "Field operations, farmer support, and crop monitoring"
      case "ngo-partner":
        return "Community outreach, training programs, and rural development"
      case "market-analyst":
        return "Market trends, pricing analysis, and economic insights"
      case "system-admin":
        return "System management, user administration, and technical support"
      default:
        return "Agricultural intelligence and monitoring"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "government":
        return "bg-blue-50 border-blue-200 hover:bg-blue-100"
      case "agricultural-officer":
        return "bg-green-50 border-green-200 hover:bg-green-100"
      case "ngo-partner":
        return "bg-purple-50 border-purple-200 hover:bg-purple-100"
      case "market-analyst":
        return "bg-orange-50 border-orange-200 hover:bg-orange-100"
      case "system-admin":
        return "bg-gray-50 border-gray-200 hover:bg-gray-100"
      default:
        return "bg-green-50 border-green-200 hover:bg-green-100"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">V.I.T.A.L</h1>
                <p className="text-xs text-gray-600">Agricultural Dashboard</p>
              </div>
            </div>
            
            {currentUser && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{currentUser.name}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Welcome to V.I.T.A.L
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Agricultural Intelligence Dashboard - Choose your role to access specialized tools and insights.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Select Your Dashboard Role
          </h3>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mockUsers.map((user) => (
            <Card 
              key={user.id} 
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg border ${getRoleColor(user.role)} group`}
              onClick={() => handleRoleSelect(user.role.replace('_', '-'))}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      {getRoleIcon(user.role, "h-6 w-6 text-primary")}
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900">{getRoleDisplayName(user.role)}</CardTitle>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-gray-600 mb-3">
                  {getRoleDescription(user.role)}
                </CardDescription>
                <div className="pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500">Demo: {user.email}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Features */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Platform Features
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">Monitoring</h4>
              <p className="text-xs text-gray-600">Real-time field tracking</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">Analytics</h4>
              <p className="text-xs text-gray-600">Data insights & reports</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">Community</h4>
              <p className="text-xs text-gray-600">Farmer networking</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">AI Intelligence</h4>
              <p className="text-xs text-gray-600">Smart predictions</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Leaf className="h-5 w-5 text-green-400" />
              <h3 className="text-lg font-bold">V.I.T.A.L</h3>
            </div>
            <p className="text-sm text-gray-300 mb-3">
              Village Intelligence & Technology for Agricultural Leadership
            </p>
            <p className="text-xs text-gray-400">
              &copy; 2025 V.I.T.A.L - Agricultural Intelligence Platform
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
