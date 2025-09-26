export type UserRole =
  | "government"
  | "agricultural_officer"
  | "ngo_partner"
  | "market_analyst"
  | "system_admin"
  | "farmer"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  district?: string
  state?: string
  organization?: string
  permissions?: string[]
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Mock authentication - replace with real auth service
export const mockUsers: User[] = [
  {
    id: "1",
    email: "policy@gov.in",
    name: "Dr. Rajesh Kumar",
    role: "government",
    state: "Maharashtra",
    permissions: ["view_national_data", "view_policy_insights", "export_reports"],
  },
  {
    id: "2",
    email: "officer@agri.gov.in",
    name: "Priya Sharma",
    role: "agricultural_officer",
    district: "Pune",
    state: "Maharashtra",
    permissions: ["verify_reports", "assign_field_visits", "view_district_data"],
  },
  {
    id: "3",
    email: "coordinator@ngo.org",
    name: "Amit Patel",
    role: "ngo_partner",
    organization: "Rural Development Foundation",
    permissions: ["view_hotspots", "manage_outreach", "track_interventions"],
  },
  {
    id: "4",
    email: "analyst@mandi.com",
    name: "Sunita Reddy",
    role: "market_analyst",
    permissions: ["view_price_trends", "forecast_demand", "track_market_data"],
  },
  {
    id: "5",
    email: "admin@farm.system",
    name: "Tech Admin",
    role: "system_admin",
    permissions: ["manage_system", "view_all_data", "monitor_performance"],
  },
]

export const authenticate = async (email: string, password: string): Promise<User | null> => {
  // Mock authentication logic
  const user = mockUsers.find((u) => u.email === email)
  if (user && password === "demo123") {
    return user
  }
  return null
}

export const hasPermission = (user: User | null, permission: string): boolean => {
  return user?.permissions?.includes(permission) || false
}

export const getRoleDisplayName = (role: UserRole): string => {
  const roleNames = {
    government: "Government/Policy Maker",
    agricultural_officer: "Agricultural Officer",
    ngo_partner: "NGO/Partner Organization",
    market_analyst: "Market/Mandi Analyst",
    system_admin: "System Administrator",
    farmer: "Farmer",
  }
  return roleNames[role]
}
