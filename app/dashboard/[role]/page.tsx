import { notFound } from "next/navigation"
import { DashboardWrapper } from "@/components/dashboard-wrapper"
import type { User } from "@/lib/auth"

const validRoles = [
  "government",
  "agricultural-officer", 
  "ngo-partner",
  "market-analyst",
  "system-admin"
] as const

// Mock user data for demo purposes
const getMockUser = (role: string): User => {
  const baseUser = {
    id: "demo-user-1",
    name: "Priya Sharma",
    email: "priya.sharma@vital.gov.in",
    district: "Pune",
    state: "Maharashtra",
  }

  switch (role) {
    case "government":
      return { ...baseUser, role: "government" as const }
    case "agricultural-officer":
      return { ...baseUser, role: "agricultural_officer" as const }
    case "ngo-partner":
      return { ...baseUser, role: "ngo_partner" as const }
    case "market-analyst":
      return { ...baseUser, role: "market_analyst" as const }
    case "system-admin":
      return { ...baseUser, role: "system_admin" as const }
    default:
      return { ...baseUser, role: "agricultural_officer" as const }
  }
}

interface DashboardPageProps {
  params: {
    role: string
  }
}

export default function DashboardPage({ params }: DashboardPageProps) {
  if (!validRoles.includes(params.role as any)) {
    notFound()
  }

  const user = getMockUser(params.role)

  return (
    <DashboardWrapper 
      role={params.role as any}
      user={user} 
    />
  )
}

export function generateStaticParams() {
  return validRoles.map((role) => ({
    role,
  }))
}
