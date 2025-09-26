import { type NextRequest, NextResponse } from "next/server"
import { dataIntegration } from "@/lib/data-sources/data-integration"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get("role") || "government"
    const state = searchParams.get("state") || "Delhi"
    const district = searchParams.get("district")

    const data = await dataIntegration.getDashboardAnalytics(role, {
      state,
      ...(district && { district }),
    })

    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Integrated data API error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch integrated data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const reportData = await request.json()
    const processedReport = await dataIntegration.processFarmerReport(reportData)

    return NextResponse.json({
      success: true,
      data: processedReport,
      message: "Farmer report processed successfully",
    })
  } catch (error) {
    console.error("Report processing error:", error)
    return NextResponse.json({ success: false, error: "Failed to process farmer report" }, { status: 500 })
  }
}
