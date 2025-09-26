"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Leaf, Shield, Users, TrendingUp, Settings, MapPin, LogOut, Menu, X, Bell, Search, Home } from "lucide-react"
import { type User, getRoleDisplayName } from "@/lib/auth"
import { Input } from "@/components/ui/input"

interface DashboardLayoutProps {
  user: User
  children: React.ReactNode
  onLogout: () => void
}

export function DashboardLayout({ user, children, onLogout }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifications, setNotifications] = useState(3)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "government":
        return <Shield className="h-5 w-5" />
      case "agricultural_officer":
        return <MapPin className="h-5 w-5" />
      case "ngo_partner":
        return <Users className="h-5 w-5" />
      case "market_analyst":
        return <TrendingUp className="h-5 w-5" />
      case "system_admin":
        return <Settings className="h-5 w-5" />
      default:
        return <Leaf className="h-5 w-5" />
    }
  }

  const handleNavigation = (section: string) => {
    // Close mobile sidebar
    setSidebarOpen(false)
    
    // Navigate based on section
    switch (section) {
      case "overview":
        // Scroll to top or refresh current page
        window.scrollTo({ top: 0, behavior: 'smooth' })
        break
      case "field-reports":
        // Navigate to reports tab (we'll implement this in the dashboard)
        const event = new CustomEvent('navigateToTab', { detail: 'reports' })
        window.dispatchEvent(event)
        break
      case "analytics":
        const analyticsEvent = new CustomEvent('navigateToTab', { detail: 'analytics' })
        window.dispatchEvent(analyticsEvent)
        break
      case "notifications":
        const notificationsEvent = new CustomEvent('navigateToTab', { detail: 'notifications' })
        window.dispatchEvent(notificationsEvent)
        // Clear notification badge
        setNotifications(0)
        break
      case "farmer-directory":
        // For now, show an alert - in a real app this would navigate to a farmer directory page
        alert("Farmer Directory - This would navigate to a comprehensive farmer database")
        break
      case "settings":
        alert("Settings - This would open user preferences and system settings")
        break
      case "home":
        // Navigate back to home page
        window.location.href = "/"
        break
      default:
        break
    }
  }

  const handleNotificationClick = () => {
    setNotifications(0)
    alert("Notifications: You have 3 new farmer reports pending verification")
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Dispatch search event to dashboard components
      const searchEvent = new CustomEvent('globalSearch', { detail: searchQuery.trim() })
      window.dispatchEvent(searchEvent)
      alert(`Searching for: "${searchQuery.trim()}"`)
    }
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    // Real-time search dispatch
    if (e.target.value.length > 2) {
      const searchEvent = new CustomEvent('globalSearch', { detail: e.target.value })
      window.dispatchEvent(searchEvent)
    } else if (e.target.value.length === 0) {
      // Clear search
      const searchEvent = new CustomEvent('globalSearch', { detail: '' })
      window.dispatchEvent(searchEvent)
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:relative lg:flex-shrink-0
      `}
      >
        <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
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
              <h1 className="text-lg font-bold text-sidebar-foreground tracking-wide">V.I.T.A.L</h1>
              <p className="text-xs text-sidebar-foreground/70 font-medium">Village Intelligence & Technology</p>
              <p className="text-xs text-sidebar-foreground/60">for Agricultural Leadership</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          <div className="flex items-center space-x-3 p-4 bg-sidebar-accent rounded-xl border border-sidebar-border/50 shadow-sm">
            <div className="flex-shrink-0 w-10 h-10 bg-sidebar-primary rounded-full flex items-center justify-center">
              {getRoleIcon(user.role)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-sidebar-foreground truncate">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/70 truncate font-medium">{getRoleDisplayName(user.role)}</p>
              {user.district && (
                <p className="text-xs text-sidebar-foreground/60 mt-0.5">
                  📍 {user.district}, {user.state}
                </p>
              )}
            </div>
          </div>
        </div>

        <nav className="px-6 pb-6">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-3">
              Navigation
            </div>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/70 rounded-lg h-10 font-medium"
              onClick={() => handleNavigation("home")}
            >
              <Home className="h-4 w-4 mr-3 text-sidebar-primary" />
              Back to Home
            </Button>
            
            <div className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-3 mt-6">
              Dashboard
            </div>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/70 rounded-lg h-10 font-medium"
              onClick={() => handleNavigation("overview")}
            >
              <Shield className="h-4 w-4 mr-3 text-sidebar-primary" />
              Overview
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/70 rounded-lg h-10 font-medium"
              onClick={() => handleNavigation("field-reports")}
            >
              <MapPin className="h-4 w-4 mr-3 text-sidebar-primary" />
              Field Reports
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/70 rounded-lg h-10 font-medium"
              onClick={() => handleNavigation("analytics")}
            >
              <TrendingUp className="h-4 w-4 mr-3 text-sidebar-primary" />
              Analytics
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/70 rounded-lg h-10 font-medium"
              onClick={() => handleNavigation("notifications")}
            >
              <Bell className="h-4 w-4 mr-3 text-sidebar-primary" />
              Notifications
              {notifications > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{notifications}</span>
              )}
            </Button>
            
            <div className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-3 mt-6">
              Tools
            </div>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/70 rounded-lg h-10 font-medium"
              onClick={() => handleNavigation("farmer-directory")}
            >
              <Users className="h-4 w-4 mr-3 text-sidebar-primary" />
              Farmer Directory
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/70 rounded-lg h-10 font-medium"
              onClick={() => handleNavigation("settings")}
            >
              <Settings className="h-4 w-4 mr-3 text-sidebar-primary" />
              Settings
            </Button>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="bg-white border-b border-border shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>

              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search farmers, reports, or locations..." 
                  className="pl-10 w-80 bg-gray-50 border-gray-200 focus:bg-white focus:border-primary rounded-lg" 
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
              </form>
            </div>

            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative"
                onClick={handleNotificationClick}
              >
                <Bell className="h-4 w-4" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{notifications}</span>
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-gray-100">
                    <Avatar className="h-10 w-10 border-2 border-gray-200">
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end">
                  <div className="flex items-center justify-start gap-3 p-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-muted-foreground">{getRoleDisplayName(user.role)}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-8 bg-gray-50">{children}</main>
      </div>
    </div>
  )
}
