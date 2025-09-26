"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Shield, Users, TrendingUp, Settings, MapPin, ArrowRight, LogOut, User, BarChart3, Smartphone, Globe, Award, CheckCircle, Star } from "lucide-react"
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
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-white rounded-full p-1 shadow-lg">
                <div className="w-full h-full bg-gradient-to-br from-green-600 via-green-500 to-green-400 rounded-full flex items-center justify-center">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <div className="w-7 h-7 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-green-400 to-green-600 rounded-b-full"></div>
                      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-orange-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-wide">V.I.T.A.L</h1>
                <p className="text-sm text-gray-600 font-medium">Village Intelligence & Technology for Agricultural Leadership</p>
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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 via-blue-600/10 to-orange-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-semibold text-gray-700">Empowering Agriculture with AI</span>
                <Star className="h-5 w-5 text-yellow-500" />
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Welcome to <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">V.I.T.A.L</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Revolutionizing rural agriculture through intelligent technology solutions. 
              Choose your role to access specialized agricultural intelligence tools and insights.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Real-time Monitoring</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">AI-Powered Analytics</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
                <CheckCircle className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">Community Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Select Your Dashboard Role
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access role-specific tools and insights tailored to your agricultural responsibilities
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {mockUsers.map((user) => (
            <Card 
              key={user.id} 
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 ${getRoleColor(user.role)} group`}
              onClick={() => handleRoleSelect(user.role.replace('_', '-'))}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-4 bg-white rounded-2xl shadow-md group-hover:shadow-lg transition-shadow">
                      {getRoleIcon(user.role, "h-10 w-10 text-primary")}
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">{getRoleDisplayName(user.role)}</CardTitle>
                    </div>
                  </div>
                  <ArrowRight className="h-6 w-6 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-gray-700 mb-4">
                  {getRoleDescription(user.role)}
                </CardDescription>
                <div className="mt-6 pt-4 border-t border-gray-200/50">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 font-medium">Demo Account</span>
                    <span className="text-gray-600 font-mono text-xs">{user.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg border border-gray-200 p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Platform Features
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover the powerful tools and capabilities that make V.I.T.A.L the leading agricultural intelligence platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Real-time Monitoring</h4>
              <p className="text-gray-600 leading-relaxed">Live field reports, crop health tracking, and environmental monitoring with IoT sensors</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Advanced Analytics</h4>
              <p className="text-gray-600 leading-relaxed">Comprehensive data analysis, predictive modeling, and actionable insights for better decisions</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Community Network</h4>
              <p className="text-gray-600 leading-relaxed">Connect farmers, experts, and stakeholders for knowledge sharing and collaborative growth</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Intelligence</h4>
              <p className="text-gray-600 leading-relaxed">Machine learning algorithms for crop optimization, disease prediction, and yield forecasting</p>
            </div>
          </div>
        </div>

        {/* Additional Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl flex items-center justify-center">
                <Smartphone className="h-6 w-6 text-indigo-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">Mobile Accessibility</h4>
            </div>
            <p className="text-gray-600">Access all features on-the-go with our responsive mobile interface designed for field work</p>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl flex items-center justify-center">
                <Globe className="h-6 w-6 text-teal-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">Global Connectivity</h4>
            </div>
            <p className="text-gray-600">Connect with agricultural networks worldwide and access global market data and trends</p>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">Certified Solutions</h4>
            </div>
            <p className="text-gray-600">Government-approved methodologies and industry-standard practices for reliable results</p>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-full p-1">
                  <div className="w-full h-full bg-gradient-to-br from-green-600 via-green-500 to-green-400 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-green-400 to-green-600 rounded-b-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold">V.I.T.A.L</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Village Intelligence & Technology for Agricultural Leadership - Transforming rural agriculture through innovative technology solutions.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Platform Features</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Real-time Crop Monitoring</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>AI-Powered Analytics</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Community Networking</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Market Intelligence</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Mission Statement</h4>
              <p className="text-gray-300 leading-relaxed mb-4">
                Empowering rural communities through intelligent agricultural solutions that bridge the gap between traditional farming and modern technology.
              </p>
              <div className="flex items-center space-x-2 text-green-400">
                <Leaf className="h-5 w-5" />
                <span className="font-medium">Sustainable Agriculture for All</span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-gray-300">
                  &copy; 2025 V.I.T.A.L - Village Intelligence & Technology for Agricultural Leadership
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Empowering rural communities through intelligent agricultural solutions
                </p>
              </div>
              <div className="flex items-center space-x-4 text-gray-400">
                <span className="text-sm">Powered by Advanced AI Technology</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
