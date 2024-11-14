'use client'

import { useState, useEffect } from 'react'
import { MapPin, Clock, Car, BarChart, Zap, Leaf, BellRing, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import axios from 'axios'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Image from 'next/image'

// Fix for Leaflet marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

interface Intersection {
  id: string;
  name: string;
  lat: number;
  lon: number;
  trafficLevel: number;
}

interface TrafficDataPoint {
  time: string;
  vehicleCount: number;
  averageSpeed: number;
}

interface Alert {
  title: string;
  description: string;
}

export default function SmartTraffic() {
  const [selectedIntersection, setSelectedIntersection] = useState('')
  const [intersections, setIntersections] = useState<Intersection[]>([])
  const [trafficData, setTrafficData] = useState<TrafficDataPoint[]>([])
  const [prediction, setPrediction] = useState('')
  const [optimizationStatus, setOptimizationStatus] = useState('')
  const [environmentalImpact, setEnvironmentalImpact] = useState({ fuelSaved: 0, emissionsReduced: 0 })
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [aiConfidence, setAiConfidence] = useState(0)
  const [mapCenter, setMapCenter] = useState<[number, number]>([-1.9441, 30.0619]) // Kigali coordinates

  useEffect(() => {
    // Get user's location or use default Kigali location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMapCenter([latitude, longitude]);
        fetchIntersections(latitude, longitude);
      },
      () => {
        fetchIntersections(-1.9441, 30.0619); // Default to Kigali if geolocation fails
      }
    );

    // Start the traffic simulation
    const simulationInterval = setInterval(simulateTraffic, 5000);

    return () => clearInterval(simulationInterval);
  }, []);

  useEffect(() => {
    if (selectedIntersection) {
      fetchTrafficData()
      fetchPrediction()
      fetchEnvironmentalImpact()
      fetchAlerts()
      fetchAiConfidence()
    }
  }, [selectedIntersection])

  const fetchIntersections = async (lat: number, lon: number) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/intersections?lat=${lat}&lon=${lon}&radius=1000`);
      setIntersections(response.data);
    } catch (error) {
      console.error('Error fetching intersections:', error);
    }
  }

  const fetchTrafficData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/traffic-data/${selectedIntersection}`)
      setTrafficData(response.data)
    } catch (error) {
      console.error('Error fetching traffic data:', error)
    }
  }

  const fetchPrediction = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/predict/${selectedIntersection}`)
      setPrediction(response.data.prediction)
    } catch (error) {
      console.error('Error fetching prediction:', error)
    }
  }

  const fetchEnvironmentalImpact = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/environmental-impact/${selectedIntersection}`)
      setEnvironmentalImpact(response.data)
    } catch (error) {
      console.error('Error fetching environmental impact:', error)
    }
  }

  const fetchAlerts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/alerts/${selectedIntersection}`)
      setAlerts(response.data)
    } catch (error) {
      console.error('Error fetching alerts:', error)
    }
  }

  const fetchAiConfidence = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/ai-confidence/${selectedIntersection}`)
      setAiConfidence(response.data.confidence)
    } catch (error) {
      console.error('Error fetching AI confidence:', error)
    }
  }

  const handleOptimize = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/optimize/${selectedIntersection}`)
      setOptimizationStatus(response.data.message)
      fetchTrafficData()
      fetchPrediction()
      fetchEnvironmentalImpact()
      fetchAiConfidence()
    } catch (error) {
      console.error('Error optimizing traffic signals:', error)
    }
  }

  const simulateTraffic = () => {
    setIntersections(prevIntersections => 
      prevIntersections.map(intersection => ({
        ...intersection,
        trafficLevel: Math.random()
      }))
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <header className="mb-8 flex items-center justify-center space-x-4">
        <Image src="/logo.svg" alt="SmartTraffic KGL Logo" width={50} height={50} />
        <div>
          <h1 className="text-4xl font-bold text-center text-green-600">SmartTraffic KGL</h1>
          <p className="text-center text-blue-600">AI-powered traffic optimization for a greener Kigali</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto">
        <Card className="mb-8 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-green-700">SmartTraffic KGL Control Center</CardTitle>
            <CardDescription className="text-blue-600">Monitor and optimize traffic flow in real-time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <MapPin className="text-green-500" />
              <Select onValueChange={setSelectedIntersection}>
                <SelectTrigger className="w-[300px] border-green-300 focus:ring-green-500">
                  <SelectValue placeholder="Select intersection" />
                </SelectTrigger>
                <SelectContent>
                  {intersections.map((intersection) => (
                    <SelectItem key={intersection.id} value={intersection.id}>
                      {intersection.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleOptimize} className="bg-green-500 hover:bg-green-600 text-white">
                <Zap className="mr-2 h-4 w-4" />
                Optimize Traffic Signals
              </Button>
            </div>
            {optimizationStatus && (
              <Alert className="bg-blue-100 border-blue-300 text-blue-800">
                <AlertTitle>Optimization Status</AlertTitle>
                <AlertDescription>{optimizationStatus}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <div className="mb-8 h-[400px]">
          <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {intersections.map((intersection) => (
              <CircleMarker 
                key={intersection.id} 
                center={[intersection.lat, intersection.lon]} 
                radius={10}
                fillColor={intersection.trafficLevel < 0.3 ? "green" : intersection.trafficLevel < 0.7 ? "yellow" : "red"}
                color="black"
                weight={1}
                fillOpacity={0.8}
              >
                <Popup>{intersection.name}</Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        {selectedIntersection && (
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="bg-green-100">
              <TabsTrigger value="overview" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Overview</TabsTrigger>
              <TabsTrigger value="analysis" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Analysis</TabsTrigger>
              <TabsTrigger value="environmental" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Environmental Impact</TabsTrigger>
              <TabsTrigger value="alerts" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Alerts</TabsTrigger>
              <TabsTrigger value="ai" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">AI Insights</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-green-700">Current Traffic</CardTitle>
                    <Car className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      {trafficData.length > 0 ? trafficData[trafficData.length - 1].vehicleCount : 'N/A'}
                    </div>
                    <p className="text-xs text-green-600">Vehicles per hour</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-blue-700">Average Speed</CardTitle>
                    <BarChart className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">
                      {trafficData.length > 0 ? `${trafficData[trafficData.length - 1].averageSpeed} km/h` : 'N/A'}
                    </div>
                    <p className="text-xs text-blue-600">Current average speed</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-green-700">AI Prediction</CardTitle>
                    <Clock className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold text-green-600">{prediction}</div>
                    <p className="text-xs text-green-600">Next hour traffic forecast</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-blue-700">Optimization Status</CardTitle>
                    <Zap className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">Active</div>
                    <p className="text-xs text-blue-600">AI-driven signal timing</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="analysis">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-700">Traffic Flow Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trafficData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="vehicleCount" stroke="#059669" name="Vehicle Count" />
                      <Line yAxisId="right" type="monotone" dataKey="averageSpeed" stroke="#3b82f6" name="Avg Speed (km/h)" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="environmental">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-700">Environmental Impact</CardTitle>
                  <CardDescription className="text-blue-600">Reduction in fuel consumption and emissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center space-x-4">
                      <Leaf className="h-10 w-10 text-green-500" />
                      <div>
                        <p className="text-2xl font-bold text-green-600">{environmentalImpact.fuelSaved.toFixed(2)} L</p>
                        <p className="text-sm  text-green-600">Fuel Saved</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Leaf className="h-10 w-10 text-blue-500" />
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{environmentalImpact.emissionsReduced.toFixed(2)} kg</p>
                        <p className="text-sm text-blue-600">CO2 Emissions Reduced</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="alerts">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-700">Real-time Alerts</CardTitle>
                  <CardDescription className="text-blue-600">Important notifications and warnings</CardDescription>
                </CardHeader>
                <CardContent>
                  {alerts.map((alert, index) => (
                    <Alert key={index} className="mb-4 bg-blue-100 border-blue-300 text-blue-800">
                      <BellRing className="h-4 w-4 text-blue-500" />
                      <AlertTitle>{alert.title}</AlertTitle>
                      <AlertDescription>{alert.description}</AlertDescription>
                    </Alert>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="ai">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-700">AI System Insights</CardTitle>
                  <CardDescription className="text-blue-600">Performance metrics of our AI-driven traffic management</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold text-green-600">AI Confidence Level</p>
                      <p className="text-3xl font-bold text-green-700">{aiConfidence.toFixed(2)}%</p>
                    </div>
                    <Activity className="h-16 w-16 text-green-500" />
                  </div>
                  <p className="mt-4 text-sm text-blue-600">
                    Our AI system continuously learns and adapts to Kigali's unique traffic patterns, 
                    improving its prediction accuracy and optimization strategies over time.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}