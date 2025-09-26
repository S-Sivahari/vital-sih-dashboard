// IMD (India Meteorological Department) Weather API Integration
export interface IMDWeatherData {
  location: {
    state: string
    district: string
    block: string
    coordinates: [number, number]
  }
  current: {
    temperature: number
    humidity: number
    rainfall: number
    windSpeed: number
    pressure: number
    timestamp: string
  }
  forecast: Array<{
    date: string
    minTemp: number
    maxTemp: number
    rainfall: number
    humidity: number
    conditions: string
  }>
  alerts: Array<{
    type: "cyclone" | "heavy_rain" | "drought" | "heatwave"
    severity: "low" | "medium" | "high" | "extreme"
    message: string
    validUntil: string
  }>
}

export class IMDWeatherService {
  private baseUrl = "https://api.imd.gov.in/v1"
  private apiKey = process.env.IMD_API_KEY

  async getCurrentWeather(district: string, state: string): Promise<IMDWeatherData> {
    try {
      const response = await fetch(`${this.baseUrl}/weather/current?district=${district}&state=${state}`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`IMD API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("IMD Weather API error:", error)
      // Return mock data for development
      return this.getMockWeatherData(district, state)
    }
  }

  async getWeatherForecast(district: string, state: string, days = 7): Promise<IMDWeatherData> {
    try {
      const response = await fetch(
        `${this.baseUrl}/weather/forecast?district=${district}&state=${state}&days=${days}`,
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        },
      )

      return await response.json()
    } catch (error) {
      console.error("IMD Forecast API error:", error)
      return this.getMockWeatherData(district, state)
    }
  }

  private getMockWeatherData(district: string, state: string): IMDWeatherData {
    return {
      location: {
        state,
        district,
        block: "Sample Block",
        coordinates: [77.209, 28.6139], // Delhi coordinates as default
      },
      current: {
        temperature: 28.5,
        humidity: 65,
        rainfall: 2.3,
        windSpeed: 12.5,
        pressure: 1013.2,
        timestamp: new Date().toISOString(),
      },
      forecast: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        minTemp: 22 + Math.random() * 5,
        maxTemp: 30 + Math.random() * 8,
        rainfall: Math.random() * 10,
        humidity: 60 + Math.random() * 20,
        conditions: ["sunny", "cloudy", "rainy", "partly_cloudy"][Math.floor(Math.random() * 4)],
      })),
      alerts: [
        {
          type: "heavy_rain",
          severity: "medium",
          message: "Heavy rainfall expected in the next 48 hours",
          validUntil: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
    }
  }
}
