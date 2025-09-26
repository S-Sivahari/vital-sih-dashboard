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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full p-1 shadow-sm">
                <div className="w-full h-full bg-gradient-to-br from-green-600 via-green-500 to-green-400 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-green-400 to-green-600 rounded-b-full"></div>
                      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-orange-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 tracking-wide">V.I.T.A.L</h1>
                <p className="text-xs text-gray-600 font-medium">Village Intelligence & Technology for Agricultural Leadership</p>
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to V.I.T.A.L Dashboard
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your role to access specialized agricultural intelligence tools and insights
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mockUsers.map((user) => (
            <Card 
              key={user.id} 
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${getRoleColor(user.role)}`}
              onClick={() => handleRoleSelect(user.role.replace('_', '-'))}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-white rounded-xl shadow-sm">
                      {getRoleIcon(user.role, "h-8 w-8 text-primary")}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{getRoleDisplayName(user.role)}</CardTitle>
                      <Badge variant="outline" className="mt-1">
                        {user.district}, {user.state}
                      </Badge>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {getRoleDescription(user.role)}
                </CardDescription>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Demo Account</span>
                    <span>{user.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Platform Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Real-time Monitoring</h4>
              <p className="text-sm text-gray-600">Live field reports and crop health tracking</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Analytics Dashboard</h4>
              <p className="text-sm text-gray-600">Comprehensive data analysis and insights</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Community Support</h4>
              <p className="text-sm text-gray-600">Farmer networks and expert guidance</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">AI-Powered Insights</h4>
              <p className="text-sm text-gray-600">Machine learning for crop optimization</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 V.I.T.A.L - Village Intelligence & Technology for Agricultural Leadership</p>
            <p className="text-sm mt-2">Empowering rural communities through intelligent agricultural solutions</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
