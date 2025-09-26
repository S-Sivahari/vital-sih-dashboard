"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { authenticate, mockUsers, getRoleDisplayName } from "@/lib/auth"
import { Leaf, Shield, Users, TrendingUp, Settings, MapPin } from "lucide-react"

interface LoginFormProps {
  onLogin: (user: any) => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const user = await authenticate(email, password)
      if (user) {
        onLogin(user)
      } else {
        setError("Invalid credentials")
      }
    } catch (err) {
      setError("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "government":
        return <Shield className="h-4 w-4" />
      case "agricultural_officer":
        return <MapPin className="h-4 w-4" />
      case "ngo_partner":
        return <Users className="h-4 w-4" />
      case "market_analyst":
        return <TrendingUp className="h-4 w-4" />
      case "system_admin":
        return <Settings className="h-4 w-4" />
      default:
        return <Leaf className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center space-y-6">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-balance">V.I.T.A.L</h1>
            </div>
            <p className="text-muted-foreground">Village Intelligence for Technology & Agricultural Leadership</p>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold text-balance mb-2">Smart Agricultural Intelligence System</h2>
            <p className="text-muted-foreground text-pretty">
              Empowering rural communities with AI-driven agricultural intelligence, real-time crop monitoring, and
              comprehensive leadership support for sustainable farming.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-card rounded-lg border">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-medium">AI-Powered</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Advanced pest detection and crop advisory using machine learning
              </p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="font-medium">Real-time Data</span>
              </div>
              <p className="text-sm text-muted-foreground">Live weather, market prices, and agricultural insights</p>
            </div>
          </div>
        </div>

        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Dashboard Login</CardTitle>
            <CardDescription>Access your role-based agricultural dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</div>}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6">
              <div className="text-sm text-muted-foreground mb-3">Demo Accounts:</div>
              <div className="space-y-2">
                {mockUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => {
                      setEmail(user.email)
                      setPassword("demo123")
                    }}
                    className="w-full text-left p-3 bg-muted/50 hover:bg-muted rounded-md transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(user.role)}
                      <div>
                        <div className="font-medium text-sm">{getRoleDisplayName(user.role)}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="text-xs text-muted-foreground mt-2">Password: demo123</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
