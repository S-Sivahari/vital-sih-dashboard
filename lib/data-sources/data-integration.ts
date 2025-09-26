// Central Data Integration Service
import { IMDWeatherService } from "./imd-weather"
import { AgmarknetService } from "./agmarknet"
import { ICARResearchService } from "./icar-research"

export interface FarmerReportData {
  id: string
  farmerId: string
  location: {
    state: string
    district: string
    block: string
    village: string
    coordinates: [number, number]
  }
  crop: string
  issue: {
    type: "pest" | "disease" | "nutrient" | "weather" | "other"
    description: string
    severity: "low" | "medium" | "high" | "critical"
    images: string[]
    audioNote?: string
  }
  aiAnalysis: {
    confidence: number
    diagnosis: string
    recommendations: string[]
    treatmentPlan: string
    estimatedLoss: number
  }
  verification: {
    status: "pending" | "verified" | "rejected"
    verifiedBy?: string
    verificationDate?: string
    fieldVisitRequired: boolean
  }
  timestamp: string
}

export class DataIntegrationService {
  private weatherService = new IMDWeatherService()
  private marketService = new AgmarknetService()
  private researchService = new ICARResearchService()

  // Comprehensive data aggregation for dashboards
  async getIntegratedFarmData(location: { state: string; district: string; block?: string }) {
    try {
      const [weatherData, marketData, researchData, kvkData] = await Promise.all([
        this.weatherService.getCurrentWeather(location.district, location.state),
        this.marketService.getMarketPrices("rice", location.state, location.district),
        this.researchService.getCropVarieties("rice"),
        this.researchService.getKVKData(location.district, location.state),
      ])

      return {
        weather: weatherData,
        market: marketData,
        research: researchData,
        extension: kvkData,
        lastUpdated: new Date().toISOString(),
      }
    } catch (error) {
      console.error("Data integration error:", error)
      throw new Error("Failed to fetch integrated farm data")
    }
  }

  // Real-time farmer report processing
  async processFarmerReport(reportData: Partial<FarmerReportData>): Promise<FarmerReportData> {
    const report: FarmerReportData = {
      id: `report-${Date.now()}`,
      farmerId: reportData.farmerId || "unknown",
      location: reportData.location!,
      crop: reportData.crop || "unknown",
      issue: reportData.issue!,
      aiAnalysis: {
        confidence: 0.85,
        diagnosis: "Preliminary AI analysis based on image and description",
        recommendations: [
          "Apply recommended pesticide",
          "Monitor field conditions",
          "Consult local agricultural officer",
        ],
        treatmentPlan: "Immediate treatment required within 24-48 hours",
        estimatedLoss: Math.random() * 20, // 0-20% estimated loss
      },
      verification: {
        status: "pending",
        fieldVisitRequired: reportData.issue?.severity === "critical",
      },
      timestamp: new Date().toISOString(),
    }

    // Store in database (mock implementation)
    console.log("[v0] Processing farmer report:", report.id)

    return report
  }

  // Generate dashboard analytics
  async getDashboardAnalytics(role: string, location?: { state: string; district?: string }) {
    const baseData = await this.getIntegratedFarmData({
      state: location?.state || "Delhi",
      district: location?.district || "Delhi",
    })

    switch (role) {
      case "government":
        return this.generateGovernmentAnalytics(baseData)
      case "agricultural_officer":
        return this.generateOfficerAnalytics(baseData)
      case "ngo":
        return this.generateNGOAnalytics(baseData)
      case "market_analyst":
        return this.generateMarketAnalytics(baseData)
      case "admin":
        return this.generateSystemAnalytics(baseData)
      default:
        return baseData
    }
  }

  private generateGovernmentAnalytics(data: any) {
    return {
      ...data,
      policyMetrics: {
        affectedArea: 15.2, // % of cropped land
        yieldLoss: 8.5, // % forecasted yield loss
        subsidyImpact: 2.3, // billion INR
        insuranceClaims: 1.8, // billion INR
      },
      stateComparison: [
        { state: "Punjab", yieldIndex: 95.2, riskLevel: "low" },
        { state: "Haryana", yieldIndex: 92.8, riskLevel: "medium" },
        { state: "UP", yieldIndex: 87.3, riskLevel: "high" },
      ],
    }
  }

  private generateOfficerAnalytics(data: any) {
    return {
      ...data,
      fieldMetrics: {
        pendingReports: 45,
        verifiedReports: 123,
        avgVerificationTime: 2.3, // hours
        fieldVisitsScheduled: 12,
      },
      districtHealth: {
        overallScore: 78.5,
        pestOutbreaks: 3,
        diseaseIncidence: 12.4, // %
      },
    }
  }

  private generateNGOAnalytics(data: any) {
    return {
      ...data,
      outreachMetrics: {
        farmersEngaged: 1250,
        programsActive: 8,
        hotspotsCovered: 15,
        successRate: 82.3, // %
      },
      interventions: [
        { type: "Training", count: 25, impact: "high" },
        { type: "Resource Distribution", count: 12, impact: "medium" },
        { type: "Technology Transfer", count: 8, impact: "high" },
      ],
    }
  }

  private generateMarketAnalytics(data: any) {
    return {
      ...data,
      priceAnalytics: {
        volatilityIndex: 15.2,
        avgPrice: 2750,
        priceChange: 5.8, // % change
        anomalies: 2,
      },
      marketTrends: {
        demand: "increasing",
        supply: "stable",
        forecast: "bullish",
      },
    }
  }

  private generateSystemAnalytics(data: any) {
    return {
      ...data,
      systemMetrics: {
        apiCalls: 15420,
        aiAccuracy: 94.2,
        activeUsers: 47095,
        systemHealth: "healthy",
      },
      performance: {
        responseTime: 245, // ms
        uptime: 99.8, // %
        errorRate: 0.02, // %
      },
    }
  }
}

// Export singleton instance
export const dataIntegration = new DataIntegrationService()
