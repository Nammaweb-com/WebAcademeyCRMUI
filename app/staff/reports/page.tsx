import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Download, TrendingUp, Users, Target, Calendar } from "lucide-react"

const myLeadsData = [
  { month: "Jan", leads: 15, conversions: 6, followUps: 12 },
  { month: "Feb", leads: 18, conversions: 7, followUps: 15 },
  { month: "Mar", leads: 22, conversions: 9, followUps: 18 },
  { month: "Apr", leads: 19, conversions: 8, followUps: 16 },
  { month: "May", leads: 25, conversions: 11, followUps: 20 },
  { month: "Jun", leads: 28, conversions: 12, followUps: 22 },
]

const myCoursesData = [
  { course: "Web Development Batch A", students: 15, attendance: 92, assignments: 8 },
  { course: "Data Science Batch B", students: 12, attendance: 88, assignments: 6 },
  { course: "UI/UX Design Batch C", students: 18, attendance: 95, assignments: 10 },
]

export default function StaffReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Reports</h1>
          <p className="text-gray-600 mt-1">Your performance metrics and assigned data</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="last-3-months">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Download className="w-4 h-4 mr-2" />
            Export My Data
          </Button>
        </div>
      </div>

      {/* My Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Leads</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +15 this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <Target className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">53</div>
            <p className="text-xs text-emerald-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              41.7% conversion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Follow-ups Due</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-orange-600 flex items-center mt-1">
              <Calendar className="w-3 h-3 mr-1" />3 overdue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Rating</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-purple-600 flex items-center mt-1">⭐ Excellent performance</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="leads" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="leads">My Lead Performance</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="goals">Goals & Targets</TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Lead Performance Trends</CardTitle>
              <CardDescription>Your monthly lead generation and conversion performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={myLeadsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={2} name="Leads Assigned" />
                  <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} name="Conversions" />
                  <Line type="monotone" dataKey="followUps" stroke="#f59e0b" strokeWidth={2} name="Follow-ups" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>My Lead Status</CardTitle>
                <CardDescription>Current status of your assigned leads</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">New Leads</span>
                    <Badge variant="outline" className="text-blue-600 border-blue-600">
                      12
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">In Progress</span>
                    <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                      25
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Demo Scheduled</span>
                    <Badge variant="outline" className="text-purple-600 border-purple-600">
                      8
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Converted</span>
                    <Badge variant="outline" className="text-emerald-600 border-emerald-600">
                      53
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Dropped</span>
                    <Badge variant="outline" className="text-red-600 border-red-600">
                      29
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
                <CardDescription>Your recent milestones and accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Monthly Target Achieved</p>
                      <p className="text-xs text-gray-600">Converted 12 leads this month</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">High Conversion Rate</p>
                      <p className="text-xs text-gray-600">41.7% conversion rate this quarter</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Customer Satisfaction</p>
                      <p className="text-xs text-gray-600">4.8/5 rating from students</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Assigned Courses</CardTitle>
              <CardDescription>Courses and batches you are managing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myCoursesData.map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{course.course}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge variant="outline">{course.students} Students</Badge>
                        <Badge variant="outline" className="text-emerald-600 border-emerald-600">
                          {course.attendance}% Attendance
                        </Badge>
                        <span className="text-sm text-gray-600">{course.assignments} Assignments Given</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Performance</CardTitle>
                <CardDescription>Average performance across your courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Assignment Completion</span>
                    <span className="font-semibold">87%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Grade</span>
                    <span className="font-semibold">B+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Course Completion Rate</span>
                    <span className="font-semibold">92%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Student Satisfaction</span>
                    <span className="font-semibold">4.6/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Classes</CardTitle>
                <CardDescription>Your schedule for the next few days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { course: "Web Development Batch A", time: "Today, 2:00 PM", topic: "React Hooks" },
                    { course: "UI/UX Design Batch C", time: "Tomorrow, 10:00 AM", topic: "Figma Prototyping" },
                    { course: "Data Science Batch B", time: "Wed, 3:00 PM", topic: "Machine Learning" },
                  ].map((class_, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{class_.course}</p>
                        <p className="text-xs text-gray-600">{class_.topic}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600">{class_.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Targets</CardTitle>
                <CardDescription>Your goals for this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Lead Conversions</span>
                      <span className="text-sm font-medium">12/15</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "80%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Follow-up Calls</span>
                      <span className="text-sm font-medium">45/50</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Student Satisfaction</span>
                      <span className="text-sm font-medium">4.8/5.0</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: "96%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quarterly Goals</CardTitle>
                <CardDescription>Long-term objectives and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                    <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Achieve 40% Conversion Rate</p>
                      <p className="text-xs text-gray-600">Current: 41.7% ✓ Achieved</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Complete Advanced Training</p>
                      <p className="text-xs text-gray-600">Progress: 75% completed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Mentor 2 New Staff Members</p>
                      <p className="text-xs text-gray-600">Progress: 1/2 completed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Recognition</CardTitle>
              <CardDescription>Your achievements and recognitions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl mb-2">🏆</div>
                  <div className="font-semibold text-yellow-700">Top Performer</div>
                  <div className="text-xs text-yellow-600">Q2 2024</div>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <div className="text-2xl mb-2">⭐</div>
                  <div className="font-semibold text-emerald-700">Best Conversion Rate</div>
                  <div className="text-xs text-emerald-600">May 2024</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="font-semibold text-blue-700">Target Achiever</div>
                  <div className="text-xs text-blue-600">3 months running</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
