// ICAR (Indian Council of Agricultural Research) Data Integration
export interface ICARResearchData {
  cropVariety: {
    name: string
    scientificName: string
    category: "cereal" | "pulse" | "oilseed" | "vegetable" | "fruit" | "spice"
    developedBy: string
    releaseYear: number
  }
  characteristics: {
    yieldPotential: number // kg/hectare
    maturityDays: number
    resistantTo: string[]
    suitableFor: string[] // agro-climatic zones
    waterRequirement: "low" | "medium" | "high"
    soilType: string[]
  }
  cultivation: {
    sowingTime: string
    harvestTime: string
    spacing: string
    seedRate: string
    fertilizers: Array<{
      type: string
      quantity: string
      timing: string
    }>
  }
  research: {
    trials: number
    locations: string[]
    avgYield: number
    bestPractices: string[]
    publications: Array<{
      title: string
      authors: string[]
      year: number
      doi?: string
    }>
  }
}

export interface KVKExtensionData {
  kvkCenter: {
    name: string
    district: string
    state: string
    established: number
    contact: {
      phone: string
      email: string
      address: string
    }
  }
  programs: Array<{
    id: string
    title: string
    type: "training" | "demonstration" | "advisory" | "technology_transfer"
    crop: string
    startDate: string
    endDate: string
    participants: number
    status: "upcoming" | "ongoing" | "completed"
    description: string
  }>
  advisories: Array<{
    id: string
    title: string
    crop: string
    season: string
    content: string
    publishedDate: string
    validUntil: string
    priority: "low" | "medium" | "high"
  }>
  technologies: Array<{
    name: string
    description: string
    applicableCrops: string[]
    adoptionRate: number
    costBenefit: string
    contactExpert: string
  }>
}

export class ICARResearchService {
  private baseUrl = "https://api.icar.gov.in/v1"
  private kvkUrl = "https://api.kvk.icar.gov.in/v1"

  async getCropVarieties(crop: string): Promise<ICARResearchData[]> {
    try {
      const response = await fetch(`${this.baseUrl}/varieties/${crop}`)

      if (!response.ok) {
        throw new Error(`ICAR API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("ICAR Research API error:", error)
      return this.getMockICARData(crop)
    }
  }

  async getKVKData(district: string, state: string): Promise<KVKExtensionData> {
    try {
      const response = await fetch(`${this.kvkUrl}/centers?district=${district}&state=${state}`)
      return await response.json()
    } catch (error) {
      console.error("KVK API error:", error)
      return this.getMockKVKData(district, state)
    }
  }

  async getResearchPublications(crop: string, year?: number): Promise<any[]> {
    try {
      const params = new URLSearchParams({ crop, ...(year && { year: year.toString() }) })
      const response = await fetch(`${this.baseUrl}/publications?${params}`)
      return await response.json()
    } catch (error) {
      console.error("ICAR Publications API error:", error)
      return []
    }
  }

  private getMockICARData(crop: string): ICARResearchData[] {
    return [
      {
        cropVariety: {
          name: `${crop} Variety 1`,
          scientificName: `${crop} scientificus`,
          category: "cereal",
          developedBy: "ICAR-IARI, New Delhi",
          releaseYear: 2020,
        },
        characteristics: {
          yieldPotential: 4500,
          maturityDays: 120,
          resistantTo: ["Blast", "Brown spot", "Bacterial blight"],
          suitableFor: ["IGP", "Eastern region", "Coastal areas"],
          waterRequirement: "medium",
          soilType: ["Alluvial", "Clay loam", "Sandy loam"],
        },
        cultivation: {
          sowingTime: "June-July",
          harvestTime: "October-November",
          spacing: "20 x 15 cm",
          seedRate: "25-30 kg/ha",
          fertilizers: [
            { type: "Nitrogen", quantity: "120 kg/ha", timing: "Split application" },
            { type: "Phosphorus", quantity: "60 kg/ha", timing: "Basal" },
            { type: "Potassium", quantity: "40 kg/ha", timing: "Basal" },
          ],
        },
        research: {
          trials: 45,
          locations: ["Delhi", "Punjab", "Haryana", "UP", "Bihar"],
          avgYield: 4200,
          bestPractices: ["Direct seeded rice technique", "Integrated nutrient management", "Water-saving irrigation"],
          publications: [
            {
              title: "Performance evaluation of new rice variety",
              authors: ["Dr. A. Kumar", "Dr. B. Singh"],
              year: 2023,
              doi: "10.1000/xyz123",
            },
          ],
        },
      },
    ]
  }

  private getMockKVKData(district: string, state: string): KVKExtensionData {
    return {
      kvkCenter: {
        name: `KVK ${district}`,
        district,
        state,
        established: 1995,
        contact: {
          phone: "+91-11-25842493",
          email: `kvk.${district.toLowerCase()}@icar.gov.in`,
          address: `KVK Campus, ${district}, ${state}`,
        },
      },
      programs: [
        {
          id: "prog-001",
          title: "Integrated Pest Management Training",
          type: "training",
          crop: "Rice",
          startDate: "2024-03-15",
          endDate: "2024-03-17",
          participants: 25,
          status: "upcoming",
          description: "Comprehensive training on IPM practices for rice cultivation",
        },
        {
          id: "prog-002",
          title: "Organic Farming Demonstration",
          type: "demonstration",
          crop: "Wheat",
          startDate: "2024-02-01",
          endDate: "2024-05-30",
          participants: 50,
          status: "ongoing",
          description: "Field demonstration of organic wheat cultivation practices",
        },
      ],
      advisories: [
        {
          id: "adv-001",
          title: "Kharif Season Advisory",
          crop: "Rice",
          season: "Kharif 2024",
          content: "Recommended practices for rice cultivation during kharif season...",
          publishedDate: "2024-06-01",
          validUntil: "2024-11-30",
          priority: "high",
        },
      ],
      technologies: [
        {
          name: "System of Rice Intensification (SRI)",
          description: "Water-saving rice cultivation technique",
          applicableCrops: ["Rice"],
          adoptionRate: 35.5,
          costBenefit: "20-30% increase in yield with 40% less water",
          contactExpert: "Dr. Rice Expert, KVK",
        },
      ],
    }
  }
}
