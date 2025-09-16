"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Filter,
  Calendar,
  Download
} from "lucide-react"

interface MetricData {
  label: string
  value: number
  change: number
  trend: "up" | "down"
  icon: React.ElementType
  color: string
}

interface ChartData {
  label: string
  value: number
  color: string
}

const initialMetrics: MetricData[] = [
  {
    label: "Total Revenue",
    value: 45231,
    change: 12.5,
    trend: "up",
    icon: DollarSign,
    color: "text-green-500"
  },
  {
    label: "Active Users",
    value: 2847,
    change: -2.3,
    trend: "down",
    icon: Users,
    color: "text-blue-500"
  },
  {
    label: "Conversion Rate",
    value: 3.2,
    change: 8.1,
    trend: "up",
    icon: TrendingUp,
    color: "text-purple-500"
  },
  {
    label: "System Health",
    value: 99.8,
    change: 0.1,
    trend: "up",
    icon: Activity,
    color: "text-emerald-500"
  }
]

const chartData: ChartData[] = [
  { label: "Jan", value: 65, color: "bg-primary" },
  { label: "Feb", value: 78, color: "bg-primary" },
  { label: "Mar", value: 90, color: "bg-primary" },
  { label: "Apr", value: 81, color: "bg-primary" },
  { label: "May", value: 95, color: "bg-primary" },
  { label: "Jun", value: 87, color: "bg-primary" },
]

function AnimatedMetricCard({ metric, index }: { metric: MetricData; index: number }) {
  const [displayValue, setDisplayValue] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const increment = metric.value / 30
      const interval = setInterval(() => {
        setDisplayValue(prev => {
          const next = prev + increment
          if (next >= metric.value) {
            clearInterval(interval)
            return metric.value
          }
          return next
        })
      }, 50)
      
      return () => clearInterval(interval)
    }, index * 200)
    
    return () => clearTimeout(timer)
  }, [metric.value, index])

  const formatValue = (value: number) => {
    if (metric.label.includes("Revenue")) {
      return `$${Math.round(value).toLocaleString()}`
    } else if (metric.label.includes("Rate") || metric.label.includes("Health")) {
      return `${value.toFixed(1)}%`
    }
    return Math.round(value).toLocaleString()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {metric.label}
          </CardTitle>
          <metric.icon className={`h-4 w-4 ${metric.color}`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-1">
            {formatValue(displayValue)}
          </div>
          <div className="flex items-center text-xs">
            {metric.trend === "up" ? (
              <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
            ) : (
              <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
            )}
            <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>
              {Math.abs(metric.change)}%
            </span>
            <span className="text-muted-foreground ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function AnimatedChart({ data }: { data: ChartData[] }) {
  const [animatedData, setAnimatedData] = useState(data.map(d => ({ ...d, value: 0 })))
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData(data)
    }, 500)
    return () => clearTimeout(timer)
  }, [data])

  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Revenue Trend</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-3 w-3 mr-1" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-3 w-3 mr-1" />
            6M
          </Button>
        </div>
      </div>
      
      <div className="h-64 flex items-end justify-between gap-4 p-4 bg-muted/30 rounded-lg">
        {animatedData.map((item, index) => (
          <div key={item.label} className="flex flex-col items-center flex-1">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(item.value / maxValue) * 200}px` }}
              transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
              className="w-full bg-primary rounded-t-md min-h-[4px] relative group"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.8 }}
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <div className="bg-foreground text-background text-xs px-2 py-1 rounded">
                  {item.value}%
                </div>
              </motion.div>
            </motion.div>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              className="text-xs text-muted-foreground mt-2"
            >
              {item.label}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  )
}

function RealtimeActivity() {
  const [activities, setActivities] = useState([
    "New user registration",
    "Payment processed",
    "Feature activated",
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivities = [
        "New user registration",
        "Payment processed", 
        "Feature activated",
        "Support ticket created",
        "API call completed",
        "Data backup finished",
        "System health check",
        "User login detected"
      ]
      
      const randomActivity = newActivities[Math.floor(Math.random() * newActivities.length)]
      setActivities(prev => [randomActivity, ...prev.slice(0, 4)])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Live Activity</CardTitle>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <AnimatePresence>
            {activities.map((activity, index) => (
              <motion.div
                key={`${activity}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 p-2 rounded-lg bg-muted/50"
              >
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm flex-1">{activity}</span>
                <span className="text-xs text-muted-foreground">
                  {index === 0 ? "now" : `${index}m ago`}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}

export default function DashboardsBlock() {
  const [metrics, setMetrics] = useState(initialMetrics)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshData = () => {
    setIsRefreshing(true)
    
    setTimeout(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.value * (0.95 + Math.random() * 0.1),
        change: (Math.random() - 0.5) * 20
      })))
      setIsRefreshing(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboards</h1>
            <p className="text-lg text-muted-foreground">
              Interactive data visualization with real-time updates and smooth animations
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="secondary">Real-time data</Badge>
          <Badge variant="secondary">Animated charts</Badge>
          <Badge variant="secondary">Live updates</Badge>
          <Badge variant="secondary">Interactive filters</Badge>
        </div>
      </div>

      {/* Dashboard Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Analytics Overview</h2>
          <Badge variant="outline">Last 30 days</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshData}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <AnimatedMetricCard key={metric.label} metric={metric} index={index} />
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <AnimatedChart data={chartData} />
          </Card>
        </div>
        
        <div className="space-y-4">
          <RealtimeActivity />
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>API Response Time</span>
                  <span>245ms</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Database Performance</span>
                  <span>92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Server Uptime</span>
                  <span>99.9%</span>
                </div>
                <Progress value={99.9} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Interactive Features</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="font-medium">Animated Counters</h4>
              <p className="text-sm text-muted-foreground">
                Numbers animate smoothly when data updates, providing visual feedback for changes.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Real-time Activity</h4>
              <p className="text-sm text-muted-foreground">
                Live activity feed with smooth entry/exit animations and automatic updates.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Interactive Charts</h4>
              <p className="text-sm text-muted-foreground">
                Hover effects, smooth bar animations, and responsive design for all screen sizes.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
