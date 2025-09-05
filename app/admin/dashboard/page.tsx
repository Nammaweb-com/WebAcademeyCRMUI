"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  GraduationCap,
  DollarSign,
  TrendingUp,
  Calendar,
  Phone,
  Mail,
  AlertCircle,
  Plus,
  Eye,
} from "lucide-react"
import { useAuth } from "@/components/auth-context"

export default function AdminDashboard() {
  const { user } = useAuth()

  const stats = [
    {
      title: "Total Students",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Courses",
      value: "24",
      change: "+3",
      trend: "up",
      icon: GraduationCap,
      color: "text-green-600",
    },
    {
      title: "Monthly Revenue",
      value: "₹4,85,000",
      change: "+18%",
      trend: "up",
      icon: DollarSign,
      color: "text-emerald-600",
    },
    {
      title: "Pending Fees",
      value: "₹1,25,000",
      change: "-5%",
      trend: "down",
      icon: AlertCircle,
      color: "text-orange-600",
    },
  ]

  const recentLeads = [
    { name: "Priya Sharma", course: "Web Development", status: "contacted", phone: "+91 98765 43210" },
    { name: "Rahul Kumar", course: "Data Science", status: "demo", phone: "+91 87654 32109" },
    { name: "Anita Singh", course: "Digital Marketing", status: "new", phone: "+91 76543 21098" },
    { name: "Vikash Gupta", course: "UI/UX Design", status: "enrolled", phone: "+91 65432 10987" },
  ]

  const upcomingClasses = [
    { course: "React Fundamentals", batch: "WD-101", time: "10:00 AM", students: 25 },
    { course: "Python Basics", batch: "DS-201", time: "2:00 PM", students: 18 },
    { course: "SEO Strategies", batch: "DM-301", time: "4:00 PM", students: 22 },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-space-grotesk text-foreground">Welcome back, {user?.name}</h1>
          <p className="text-muted-foreground">Here's what's happening at your institute today.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Today
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-space-grotesk">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className={`h-3 w-3 mr-1 ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`} />
                {stat.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-space-grotesk">Recent Leads</CardTitle>
                <CardDescription>Latest inquiries and their status</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.map((lead, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-sm text-muted-foreground">{lead.course}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge
                      variant={
                        lead.status === "enrolled"
                          ? "default"
                          : lead.status === "demo"
                            ? "secondary"
                            : lead.status === "contacted"
                              ? "outline"
                              : "destructive"
                      }
                    >
                      {lead.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Classes */}
        <Card>
          <CardHeader>
            <CardTitle className="font-space-grotesk">Today's Classes</CardTitle>
            <CardDescription>Scheduled sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((class_, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{class_.course}</p>
                      <p className="text-xs text-muted-foreground">{class_.batch}</p>
                    </div>
                    <Badge variant="outline">{class_.time}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{class_.students} students</span>
                    <Progress value={(class_.students / 30) * 100} className="w-16 h-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="font-space-grotesk">Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <Users className="w-6 h-6" />
              <span className="text-sm">Add Lead</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <GraduationCap className="w-6 h-6" />
              <span className="text-sm">New Course</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <DollarSign className="w-6 h-6" />
              <span className="text-sm">Record Payment</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <Mail className="w-6 h-6" />
              <span className="text-sm">Send Message</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
