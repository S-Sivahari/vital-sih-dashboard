"use client"

import { useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { GovernmentDashboard } from "@/components/dashboards/government-dashboard"
import { AgriculturalOfficerDashboard } from "@/components/dashboards/agricultural-officer-dashboard"
import { NGOPartnerDashboard } from "@/components/dashboards/ngo-partner-dashboard"
import { MarketAnalystDashboard } from "@/components/dashboards/market-analyst-dashboard"
import { SystemAdminDashboard } from "@/components/dashboards/system-admin-dashboard"
import type { User } from "@/lib/auth"
import { sessionManager } from "@/lib/session"

const dashboardComponents = {
  government: GovernmentDashboard,
  "agricultural-officer": AgriculturalOfficerDashboard,
  "ngo-partner": NGOPartnerDashboard,
  "market-analyst": MarketAnalystDashboard,
  "system-admin": SystemAdminDashboard,
}

interface DashboardWrapperProps {
  role: keyof typeof dashboardComponents
  user: User
}

export function DashboardWrapper({ role, user }: DashboardWrapperProps) {
  // Save user session when component mounts
  useEffect(() => {
    sessionManager.saveSession(user)
  }, [user])

  const handleLogout = () => {
    // Clear session using session manager
    sessionManager.clearSession()
    // Navigate back to home page
    window.location.href = "/"
  }

  const renderDashboard = () => {
    // Some components expect user prop, others don't
    switch (role) {
      case "system-admin":
        return <SystemAdminDashboard />
      case "government":
        return <GovernmentDashboard user={user} />
      case "agricultural-officer":
        return <AgriculturalOfficerDashboard user={user} />
      case "ngo-partner":
        return <NGOPartnerDashboard user={user} />
      case "market-analyst":
        return <MarketAnalystDashboard user={user} />
      default:
        return <div>Dashboard not available</div>
    }
  }

  return (
    <DashboardLayout user={user} onLogout={handleLogout}>
      {renderDashboard()}
    </DashboardLayout>
  )
}
