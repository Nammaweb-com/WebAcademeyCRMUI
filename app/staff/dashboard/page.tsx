"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Phone, Calendar, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { useAuth } from "@/components/auth-context"

export default function StaffDashboard() {
  const { user } = useAuth()

  const myLeads = [
    { name: "Priya Sharma", course: "Web Development", status: "contacted", lastContact: "2 hours ago" },
    { name: "Rahul Kumar", course: "Data Science", status: "demo", lastContact: "1 day ago" },
    { name: "Anita Singh", course: "Digital Marketing", status: "new", lastContact: "Just now" },
  ]

  const todayTasks = [
    { task: "Follow up with Priya Sharma", priority: "high", time: "10:00 AM" },
    { task: "Demo session for Rahul Kumar", priority: "medium", time: "2:00 PM" },
    { task: "Send course brochure to new leads", priority: "low", time: "4:00 PM" },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-space-grotesk text-foreground">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground">Here are your tasks and leads for today.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">My Leads</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-space-grotesk">23</div>
            <p className="text-xs text-muted-foreground">+3 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Calls</CardTitle>
            <Phone className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-space-grotesk">8</div>
            <p className="text-xs text-muted-foreground">Due today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Demos Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-space-grotesk">5</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversions</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-space-grotesk">12</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Leads */}
        <Card>
          <CardHeader>
            <CardTitle className="font-space-grotesk">My Recent Leads</CardTitle>
            <CardDescription>Leads assigned to you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myLeads.map((lead, index) => (
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
                  <div className="text-right">
                    <Badge
                      variant={
                        lead.status === "demo" ? "default" : lead.status === "contacted" ? "secondary" : "outline"
                      }
                    >
                      {lead.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{lead.lastContact}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="font-space-grotesk">Today's Tasks</CardTitle>
            <CardDescription>Your scheduled activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        task.priority === "high"
                          ? "bg-red-500"
                          : task.priority === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                    />
                    <div>
                      <p className="font-medium text-sm">{task.task}</p>
                      <p className="text-xs text-muted-foreground">{task.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {task.priority === "high" && <AlertCircle className="w-4 h-4 text-red-500" />}
                    {task.priority === "medium" && <Clock className="w-4 h-4 text-yellow-500" />}
                    <Button variant="ghost" size="sm">
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
