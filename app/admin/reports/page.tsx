"use client" // Added client directive to enable client-side rendering for charts

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download, TrendingUp, Users, DollarSign, BookOpen } from "lucide-react"

const leadConversionData = [
  { month: "Jan", leads: 120, conversions: 45, revenue: 180000 },
  { month: "Feb", leads: 135, conversions: 52, revenue: 208000 },
  { month: "Mar", leads: 148, conversions: 61, revenue: 244000 },
  { month: "Apr", leads: 162, conversions: 58, revenue: 232000 },
  { month: "May", leads: 175, conversions: 67, revenue: 268000 },
  { month: "Jun", leads: 189, conversions: 74, revenue: 296000 },
]

const courseEnrollmentData = [
  { course: "Web Development", enrolled: 45, completed: 38, revenue: 450000 },
  { course: "Data Science", enrolled: 32, completed: 28, revenue: 384000 },
  { course: "Mobile App Dev", enrolled: 28, completed: 24, revenue: 336000 },
  { course: "UI/UX Design", enrolled: 35, completed: 31, revenue: 350000 },
  { course: "Digital Marketing", enrolled: 42, completed: 39, revenue: 420000 },
]

const staffPerformanceData = [
  { name: "Sarah Johnson", leads: 45, conversions: 18, revenue: 216000, rating: 4.8 },
  { name: "Mike Chen", leads: 38, conversions: 15, revenue: 180000, rating: 4.6 },
  { name: "Emily Davis", leads: 52, conversions: 21, revenue: 252000, rating: 4.9 },
  { name: "David Wilson", leads: 41, conversions: 16, revenue: 192000, rating: 4.5 },
]

const leadSourceData = [
  { name: "Website", value: 35, color: "#10b981" },
  { name: "Social Media", value: 25, color: "#3b82f6" },
  { name: "Referrals", value: 20, color: "#8b5cf6" },
  { name: "Google Ads", value: 15, color: "#f59e0b" },
  { name: "Others", value: 5, color: "#ef4444" },
]

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="last-6-months">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Download className="w-4 h-4 mr-2" />
            Export Reports
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹19,28,000</div>
            <p className="text-xs text-emerald-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12.5% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,029</div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8.2% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38.5%</div>
            <p className="text-xs text-purple-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +3.1% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-orange-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +2 new courses
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="leads" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="leads">Lead Analytics</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Reports</TabsTrigger>
          <TabsTrigger value="courses">Course Performance</TabsTrigger>
          <TabsTrigger value="staff">Staff Performance</TabsTrigger>
          <TabsTrigger value="attendance">Attendance Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Lead Conversion Trends</CardTitle>
                <CardDescription>Monthly lead generation and conversion rates</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={leadConversionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lead Sources</CardTitle>
                <CardDescription>Distribution of lead sources</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={leadSourceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${((percent?? 0) * 100).toFixed(0)}%`}
                    >
                      {leadSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Lead Status Breakdown</CardTitle>
              <CardDescription>Current status of all leads in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">245</div>
                  <div className="text-sm text-blue-600">New Leads</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">189</div>
                  <div className="text-sm text-yellow-600">Contacted</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">156</div>
                  <div className="text-sm text-purple-600">Demo Scheduled</div>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">315</div>
                  <div className="text-sm text-emerald-600">Enrolled</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">124</div>
                  <div className="text-sm text-red-600">Dropped</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>Monthly revenue generation and growth</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={leadConversionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]} />
                  <Bar dataKey="revenue" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-600">₹19,28,000</div>
                <p className="text-sm text-gray-600 mt-2">Last 6 months</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Deal Size</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">₹12,000</div>
                <p className="text-sm text-gray-600 mt-2">Per enrollment</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Outstanding Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">₹2,45,000</div>
                <p className="text-sm text-gray-600 mt-2">Pending collection</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Performance</CardTitle>
              <CardDescription>Enrollment and completion rates by course</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courseEnrollmentData.map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{course.course}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge variant="outline">{course.enrolled} Enrolled</Badge>
                        <Badge variant="outline" className="text-emerald-600 border-emerald-600">
                          {course.completed} Completed
                        </Badge>
                        <span className="text-sm text-gray-600">
                          {Math.round((course.completed / course.enrolled) * 100)}% completion rate
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-emerald-600">₹{course.revenue.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Revenue</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Staff Performance Metrics</CardTitle>
              <CardDescription>Individual staff member performance and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {staffPerformanceData.map((staff, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{staff.name}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge variant="outline">{staff.leads} Leads</Badge>
                        <Badge variant="outline" className="text-emerald-600 border-emerald-600">
                          {staff.conversions} Conversions
                        </Badge>
                        <span className="text-sm text-gray-600">
                          {Math.round((staff.conversions / staff.leads) * 100)}% conversion rate
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-emerald-600">₹{staff.revenue.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Revenue Generated</div>
                      <div className="flex items-center mt-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm ml-1">{staff.rating}/5.0</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Overall Attendance Rate</CardTitle>
                <CardDescription>Student attendance across all courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">87.5%</div>
                  <p className="text-gray-600">Average attendance rate</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Excellent (90%+)</span>
                      <span className="text-emerald-600">65% of students</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Good (75-89%)</span>
                      <span className="text-blue-600">25% of students</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Needs Improvement (&lt;75%)</span>
                      <span className="text-orange-600">10% of students</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course-wise Attendance</CardTitle>
                <CardDescription>Attendance rates by individual courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {courseEnrollmentData.map((course, index) => {
                    const attendanceRate = Math.floor(Math.random() * 15) + 80 // Mock data
                    return (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{course.course}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-emerald-600 h-2 rounded-full"
                              style={{ width: `${attendanceRate}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium w-12">{attendanceRate}%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Low Attendance Alerts</CardTitle>
              <CardDescription>Students requiring attention due to poor attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Rahul Sharma", course: "Web Development", attendance: "45%", lastSeen: "3 days ago" },
                  { name: "Priya Patel", course: "Data Science", attendance: "52%", lastSeen: "1 week ago" },
                  { name: "Amit Kumar", course: "Mobile App Dev", attendance: "38%", lastSeen: "5 days ago" },
                ].map((student, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium">{student.name}</h4>
                      <p className="text-sm text-gray-600">{student.course}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="destructive">{student.attendance}</Badge>
                      <p className="text-xs text-gray-500 mt-1">Last seen: {student.lastSeen}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
