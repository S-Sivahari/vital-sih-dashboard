// Agmarknet & eNAM Market Price Integration
export interface MarketPriceData {
  commodity: string
  variety: string
  market: {
    name: string
    state: string
    district: string
    type: "mandi" | "enam" | "wholesale" | "retail"
  }
  prices: {
    modal: number
    minimum: number
    maximum: number
    currency: "INR"
    unit: "quintal" | "kg" | "ton"
  }
  date: string
  arrivals: number // quantity arrived in market
  trend: "up" | "down" | "stable"
  priceChange: number // percentage change from previous day
}

export interface MarketAnalytics {
  commodity: string
  avgPrice: number
  volatilityIndex: number
  seasonalTrend: Array<{
    month: string
    avgPrice: number
    volume: number
  }>
  priceForecasts: Array<{
    date: string
    predictedPrice: number
    confidence: number
  }>
}

export class AgmarknetService {
  private baseUrl = "https://api.agmarknet.gov.in/v2"
  private enamUrl = "https://api.enam.gov.in/v1"

  async getMarketPrices(commodity: string, state?: string, district?: string): Promise<MarketPriceData[]> {
    try {
      const params = new URLSearchParams({
        commodity,
        ...(state && { state }),
        ...(district && { district }),
        date: new Date().toISOString().split("T")[0],
      })

      const response = await fetch(`${this.baseUrl}/prices?${params}`)

      if (!response.ok) {
        throw new Error(`Agmarknet API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Agmarknet API error:", error)
      return this.getMockMarketData(commodity)
    }
  }

  async getENAMPrices(commodity: string): Promise<MarketPriceData[]> {
    try {
      const response = await fetch(`${this.enamUrl}/prices/${commodity}`)
      return await response.json()
    } catch (error) {
      console.error("eNAM API error:", error)
      return this.getMockMarketData(commodity)
    }
  }

  async getMarketAnalytics(commodity: string): Promise<MarketAnalytics> {
    try {
      const response = await fetch(`${this.baseUrl}/analytics/${commodity}`)
      return await response.json()
    } catch (error) {
      console.error("Market analytics error:", error)
      return this.getMockAnalytics(commodity)
    }
  }

  private getMockMarketData(commodity: string): MarketPriceData[] {
    const markets = [
      { name: "Azadpur Mandi", state: "Delhi", district: "Delhi", type: "mandi" as const },
      { name: "Vashi APMC", state: "Maharashtra", district: "Mumbai", type: "wholesale" as const },
      { name: "Koyambedu Market", state: "Tamil Nadu", district: "Chennai", type: "wholesale" as const },
      { name: "Bangalore APMC", state: "Karnataka", district: "Bangalore", type: "enam" as const },
    ]

    return markets.map((market) => ({
      commodity,
      variety: "Common",
      market,
      prices: {
        modal: 2500 + Math.random() * 1000,
        minimum: 2000 + Math.random() * 500,
        maximum: 3000 + Math.random() * 500,
        currency: "INR" as const,
        unit: "quintal" as const,
      },
      date: new Date().toISOString().split("T")[0],
      arrivals: Math.floor(100 + Math.random() * 500),
      trend: ["up", "down", "stable"][Math.floor(Math.random() * 3)] as "up" | "down" | "stable",
      priceChange: (Math.random() - 0.5) * 10,
    }))
  }

  private getMockAnalytics(commodity: string): MarketAnalytics {
    return {
      commodity,
      avgPrice: 2750,
      volatilityIndex: 15.2,
      seasonalTrend: Array.from({ length: 12 }, (_, i) => ({
        month: new Date(2024, i, 1).toLocaleString("default", { month: "short" }),
        avgPrice: 2500 + Math.random() * 800,
        volume: 1000 + Math.random() * 2000,
      })),
      priceForecasts: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        predictedPrice: 2750 + (Math.random() - 0.5) * 400,
        confidence: 0.7 + Math.random() * 0.25,
      })),
    }
  }
}
