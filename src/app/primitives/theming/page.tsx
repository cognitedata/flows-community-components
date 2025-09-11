"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Palette, Download, Copy, RotateCcw, Sun, Moon, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

// Default theme values
const defaultTheme = {
  primary: "222.2 84% 4.9%",
  secondary: "210 40% 96%", 
  accent: "210 40% 96%",
  muted: "210 40% 96%",
  border: "214.3 31.8% 91.4%",
  background: "0 0% 100%",
  foreground: "222.2 84% 4.9%"
}

interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  muted: string
  border: string
  background: string
  foreground: string
}

export default function ThemingPage() {
  const [theme, setTheme] = useState<ThemeColors>(defaultTheme)
  const [isDark, setIsDark] = useState(false)

  const resetTheme = () => {
    setTheme(defaultTheme)
  }

  return (
    <div className="px-3 py-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">Theme configurator</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Customize your design system colors and see live previews across components. 
              Export ready-to-use code for your projects.
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Controls Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <Palette className="h-5 w-5" />
                  </div>
                  Color Settings
                </CardTitle>
                <CardDescription>
                  Adjust your theme colors and see live updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Theme Mode Toggle */}
                  <div className="space-y-2">
                    <Label>Theme Mode</Label>
                    <div className="flex gap-2">
                      <Button
                        variant={!isDark ? "default" : "outline"}
                        size="sm"
                        onClick={() => setIsDark(false)}
                        className="flex-1"
                      >
                        <Sun className="h-4 w-4 mr-2" />
                        Light
                      </Button>
                      <Button
                        variant={isDark ? "default" : "outline"}
                        size="sm"
                        onClick={() => setIsDark(true)}
                        className="flex-1"
                      >
                        <Moon className="h-4 w-4 mr-2" />
                        Dark
                      </Button>
                    </div>
                  </div>

                  {/* Color Inputs */}
                  <div className="space-y-2">
                    <Label htmlFor="primary">Primary</Label>
                    <Input
                      id="primary"
                      value={theme.primary}
                      onChange={(e) => setTheme({ ...theme, primary: e.target.value })}
                      placeholder="222.2 84% 4.9%"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondary">Secondary</Label>
                    <Input
                      id="secondary"
                      value={theme.secondary}
                      onChange={(e) => setTheme({ ...theme, secondary: e.target.value })}
                      placeholder="210 40% 96%"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accent">Accent</Label>
                    <Input
                      id="accent"
                      value={theme.accent}
                      onChange={(e) => setTheme({ ...theme, accent: e.target.value })}
                      placeholder="210 40% 96%"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-6">
                  <Button onClick={resetTheme} variant="outline" className="flex-1">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset to Default
                  </Button>
                  <Button className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Export Theme
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Preview Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <Eye className="h-5 w-5" />
                  </div>
                  Live Preview
                </CardTitle>
                <CardDescription>
                  See how your theme looks across different components and layouts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="primitives" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="primitives">Primitives</TabsTrigger>
                    <TabsTrigger value="cards">Cards</TabsTrigger>
                    <TabsTrigger value="forms">Forms</TabsTrigger>
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="primitives" className="space-y-6 mt-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <h3 className="font-semibold">Buttons</h3>
                        <div className="flex flex-col gap-2">
                          <Button>Primary</Button>
                          <Button variant="secondary">Secondary</Button>
                          <Button variant="outline">Outline</Button>
                          <Button variant="ghost">Ghost</Button>
                          <Button variant="destructive">Destructive</Button>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="font-semibold">Badges & States</h3>
                        <div className="space-y-2">
                          <div className="flex gap-2 flex-wrap">
                            <Badge>Default</Badge>
                            <Badge variant="secondary">Secondary</Badge>
                            <Badge variant="outline">Outline</Badge>
                            <Badge variant="destructive">Error</Badge>
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Success</Badge>
                            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Warning</Badge>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Info</Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="font-semibold">Form Elements</h3>
                        <div className="space-y-2">
                          <Input placeholder="Text input..." />
                          <Input type="password" placeholder="Password..." />
                          <Input disabled placeholder="Disabled input..." />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="cards" className="space-y-4 mt-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <Card>
                        <CardHeader>
                          <CardTitle>Profile Card</CardTitle>
                          <CardDescription>User profile information</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                              JD
                            </div>
                            <div>
                              <p className="font-medium">John Doe</p>
                              <p className="text-sm text-muted-foreground">Product Manager</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Stats Card</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">$12,345</div>
                          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                          <div className="mt-2">
                            <Badge variant="outline" className="text-green-600 border-green-600">+20.1%</Badge>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Product Card</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="w-full h-24 bg-muted rounded-md flex items-center justify-center">
                              <span className="text-muted-foreground">Product Image</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Product Name</h4>
                              <p className="text-sm text-muted-foreground">Short description</p>
                              <p className="text-lg font-bold mt-1">$99.99</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="forms" className="space-y-4 mt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Login Form</CardTitle>
                          <CardDescription>User authentication</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="Enter your email" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="Enter your password" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="remember" className="rounded" />
                            <Label htmlFor="remember" className="text-sm">Remember me</Label>
                          </div>
                          <Button className="w-full">Sign In</Button>
                          <Button variant="outline" className="w-full">Create Account</Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Contact Form</CardTitle>
                          <CardDescription>Get in touch with us</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName">First Name</Label>
                              <Input id="firstName" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName">Last Name</Label>
                              <Input id="lastName" placeholder="Doe" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="contactEmail">Email</Label>
                            <Input id="contactEmail" placeholder="john@example.com" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <textarea 
                              id="message" 
                              className="w-full p-3 border rounded-md bg-background" 
                              rows={3} 
                              placeholder="Your message..."
                            />
                          </div>
                          <Button className="w-full">Send Message</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="dashboard" className="space-y-6 mt-6">
                    {/* KPI Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">$45,231.89</div>
                          <p className="text-xs text-muted-foreground flex items-center">
                            <span className="text-green-600 mr-1">↗ +20.1%</span>
                            from last month
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">+2,350</div>
                          <p className="text-xs text-muted-foreground flex items-center">
                            <span className="text-green-600 mr-1">↗ +180.1%</span>
                            from last month
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Sales</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">+12,234</div>
                          <p className="text-xs text-muted-foreground flex items-center">
                            <span className="text-green-600 mr-1">↗ +19%</span>
                            from last month
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">8,432</div>
                          <p className="text-xs text-muted-foreground flex items-center">
                            <span className="text-red-600 mr-1">↘ -2.1%</span>
                            from last month
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Dashboard Sections */}
                    <div className="grid gap-6 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Recent Activity</CardTitle>
                          <CardDescription>Latest user actions</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs">
                                  JD
                                </div>
                                <div>
                                  <p className="text-sm font-medium">John Doe</p>
                                  <p className="text-xs text-muted-foreground">Created new project</p>
                                </div>
                              </div>
                              <Badge variant="outline">2m ago</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-xs">
                                  AS
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Alice Smith</p>
                                  <p className="text-xs text-muted-foreground">Updated settings</p>
                                </div>
                              </div>
                              <Badge variant="outline">5m ago</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground text-xs">
                                  BJ
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Bob Johnson</p>
                                  <p className="text-xs text-muted-foreground">Completed task</p>
                                </div>
                              </div>
                              <Badge variant="outline">1h ago</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Quick Actions</CardTitle>
                          <CardDescription>Common tasks</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-3">
                            <Button className="h-20 flex-col">
                              <span className="text-lg mb-1">+</span>
                              <span className="text-xs">New Project</span>
                            </Button>
                            <Button variant="outline" className="h-20 flex-col">
                              <span className="text-lg mb-1">📊</span>
                              <span className="text-xs">View Reports</span>
                            </Button>
                            <Button variant="secondary" className="h-20 flex-col">
                              <span className="text-lg mb-1">👥</span>
                              <span className="text-xs">Invite Users</span>
                            </Button>
                            <Button variant="ghost" className="h-20 flex-col">
                              <span className="text-lg mb-1">⚙️</span>
                              <span className="text-xs">Settings</span>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
