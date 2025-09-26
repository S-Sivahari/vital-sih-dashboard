"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Layers, ZoomIn, ZoomOut } from "lucide-react"

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

interface FarmerReport {
  id: string
  farmer: string
  location: string
  crop: string
  issue: string
  severity: "High" | "Medium" | "Low"
  confidence: number
  timestamp: string
  status: "pending" | "verified" | "field_visit"
  coordinates: string
  phone: string
  lat: number
  lng: number
}

interface FarmerLocationMapProps {
  reports: FarmerReport[]
  selectedReport?: string | null
  onReportSelect?: (reportId: string) => void
  onMarkerClick?: (report: FarmerReport) => void
}

// Convert coordinate strings to lat/lng numbers
const parseCoordinates = (coordString: string): { lat: number; lng: number } => {
  // Parse "18.4386° N, 73.6956° E" format
  const parts = coordString.split(', ')
  const latPart = parts[0].replace('°', '').replace(' N', '').replace(' S', '')
  const lngPart = parts[1].replace('°', '').replace(' E', '').replace(' W', '')
  
  let lat = parseFloat(latPart)
  let lng = parseFloat(lngPart)
  
  // Handle S and W directions
  if (coordString.includes(' S')) lat = -lat
  if (coordString.includes(' W')) lng = -lng
  
  return { lat, lng }
}

// Enhanced farmer reports with parsed coordinates
const enhancedReports: FarmerReport[] = [
  {
    id: "FR001",
    farmer: "Ramesh Patil",
    location: "Khed, Pune",
    crop: "Cotton",
    issue: "Bollworm infestation",
    severity: "High",
    confidence: 92,
    timestamp: "2 hours ago",
    status: "pending",
    coordinates: "18.4386° N, 73.6956° E",
    phone: "+91 98765 43210",
    ...parseCoordinates("18.4386° N, 73.6956° E")
  },
  {
    id: "FR002",
    farmer: "Sunita Sharma",
    location: "Baramati, Pune",
    crop: "Sugarcane",
    issue: "Red rot disease",
    severity: "Medium",
    confidence: 87,
    timestamp: "4 hours ago",
    status: "pending",
    coordinates: "18.1516° N, 74.5815° E",
    phone: "+91 98765 43211",
    ...parseCoordinates("18.1516° N, 74.5815° E")
  },
  {
    id: "FR003",
    farmer: "Vijay Kumar",
    location: "Shirur, Pune",
    crop: "Tomato",
    issue: "Leaf curl virus",
    severity: "High",
    confidence: 94,
    timestamp: "6 hours ago",
    status: "verified",
    coordinates: "18.8286° N, 74.3732° E",
    phone: "+91 98765 43212",
    ...parseCoordinates("18.8286° N, 74.3732° E")
  },
  {
    id: "FR004",
    farmer: "Meera Devi",
    location: "Junnar, Pune",
    crop: "Grapes",
    issue: "Powdery mildew",
    severity: "Low",
    confidence: 78,
    timestamp: "8 hours ago",
    status: "pending",
    coordinates: "19.2073° N, 73.8757° E",
    phone: "+91 98765 43213",
    ...parseCoordinates("19.2073° N, 73.8757° E")
  },
  {
    id: "FR005",
    farmer: "Anil Jadhav",
    location: "Maval, Pune",
    crop: "Rice",
    issue: "Brown plant hopper",
    severity: "Medium",
    confidence: 89,
    timestamp: "1 day ago",
    status: "field_visit",
    coordinates: "18.7644° N, 73.4394° E",
    phone: "+91 98765 43214",
    ...parseCoordinates("18.7644° N, 73.4394° E")
  },
]

export function FarmerLocationMap({ 
  reports = enhancedReports, 
  selectedReport, 
  onReportSelect,
  onMarkerClick 
}: FarmerLocationMapProps) {
  const [mapReady, setMapReady] = useState(false)
  const [mapInstance, setMapInstance] = useState<any>(null)

  useEffect(() => {
    setMapReady(true)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High": return "#ef4444" // red
      case "Medium": return "#f59e0b" // orange
      case "Low": return "#10b981" // green
      default: return "#6b7280" // gray
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "#f59e0b" // orange
      case "verified": return "#10b981" // green
      case "field_visit": return "#3b82f6" // blue
      default: return "#6b7280" // gray
    }
  }

  const createCustomIcon = (report: FarmerReport) => {
    if (typeof window === 'undefined') return null
    
    const L = require('leaflet')
    const color = getSeverityColor(report.severity)
    const isSelected = selectedReport === report.id
    
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          width: ${isSelected ? '24px' : '20px'}; 
          height: ${isSelected ? '24px' : '20px'}; 
          background-color: ${color}; 
          border: 3px solid white; 
          border-radius: 50%; 
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          color: white;
          font-weight: bold;
          transform: translate(-50%, -50%);
          ${isSelected ? 'animation: pulse 2s infinite;' : ''}
        ">
          ${report.severity.charAt(0)}
        </div>
        <style>
          @keyframes pulse {
            0% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.2); }
            100% { transform: translate(-50%, -50%) scale(1); }
          }
        </style>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      popupAnchor: [0, -10]
    })
  }

  const handleMarkerClick = (report: FarmerReport) => {
    onReportSelect?.(report.id)
    onMarkerClick?.(report)
  }

  const centerLat = 18.5204 // Pune center
  const centerLng = 73.8567

  if (!mapReady) {
    return (
      <Card className="h-96">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground animate-pulse" />
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-96">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Farmer Locations
            </CardTitle>
            <CardDescription>
              Real-time field report locations across Pune district
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-red-600 border-red-200">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
              High Risk
            </Badge>
            <Badge variant="outline" className="text-orange-600 border-orange-200">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-1"></div>
              Medium Risk
            </Badge>
            <Badge variant="outline" className="text-green-600 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
              Low Risk
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-80 relative">
            <MapContainer
              center={[centerLat, centerLng]}
              zoom={10}
              style={{ height: '100%', width: '100%' }}
              className="rounded-b-lg"
              whenReady={() => {
                // Map is ready
              }}
            >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {reports.map((report) => (
              <Marker
                key={report.id}
                position={[report.lat, report.lng]}
                icon={createCustomIcon(report)}
                eventHandlers={{
                  click: () => handleMarkerClick(report)
                }}
              >
                <Popup>
                  <div className="p-2 min-w-48">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm">{report.farmer}</h4>
                      <Badge 
                        variant={report.severity === 'High' ? 'destructive' : 
                               report.severity === 'Medium' ? 'secondary' : 'default'}
                        className="text-xs"
                      >
                        {report.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">📍 {report.location}</p>
                    <p className="text-xs text-gray-600 mb-1">🌾 {report.crop}</p>
                    <p className="text-xs text-gray-800 font-medium mb-2">⚠️ {report.issue}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">{report.timestamp}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          report.status === 'verified' ? 'text-green-600 border-green-200' :
                          report.status === 'field_visit' ? 'text-blue-600 border-blue-200' :
                          'text-orange-600 border-orange-200'
                        }`}
                      >
                        {report.status === 'field_visit' ? 'Field Visit' : 
                         report.status === 'verified' ? 'Verified' : 'Pending'}
                      </Badge>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-500">
                        AI Confidence: <span className="font-medium">{report.confidence}%</span>
                      </p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default FarmerLocationMap
