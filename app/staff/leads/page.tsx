"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Filter, Phone, Mail, MessageSquare, Clock } from "lucide-react"
import { useAuth } from "@/components/auth-context"

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  course: string
  status: "new" | "contacted" | "demo" | "enrolled" | "dropped"
  source: string
  createdAt: string
  lastContact: string
  notes: string
  nextFollowUp: string
}

export default function StaffLeadsPage() {
  const { user } = useAuth()
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "1",
      name: "Priya Sharma",
      email: "priya@email.com",
      phone: "+91 98765 43210",
      course: "Web Development",
      status: "contacted",
      source: "Website",
      createdAt: "2024-01-15",
      lastContact: "2024-01-16",
      notes: "Interested in full-stack development",
      nextFollowUp: "2024-01-18",
    },
    {
      id: "2",
      name: "Vikash Kumar",
      email: "vikash@email.com",
      phone: "+91 87654 32109",
      course: "Data Science",
      status: "demo",
      source: "Referral",
      createdAt: "2024-01-14",
      lastContact: "2024-01-15",
      notes: "Has programming background",
      nextFollowUp: "2024-01-17",
    },
    {
      id: "3",
      name: "Anita Singh",
      email: "anita@email.com",
      phone: "+91 76543 21098",
      course: "Digital Marketing",
      status: "new",
      source: "Social Media",
      createdAt: "2024-01-16",
      lastContact: "Never",
      notes: "",
      nextFollowUp: "2024-01-17",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isFollowUpDialogOpen, setIsFollowUpDialogOpen] = useState(false)
  const [followUpNote, setFollowUpNote] = useState("")

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "contacted":
        return "bg-yellow-100 text-yellow-800"
      case "demo":
        return "bg-purple-100 text-purple-800"
      case "enrolled":
        return "bg-green-100 text-green-800"
      case "dropped":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const updateLeadStatus = (leadId: string, newStatus: Lead["status"]) => {
    setLeads(
      leads.map((lead) =>
        lead.id === leadId ? { ...lead, status: newStatus, lastContact: new Date().toISOString().split("T")[0] } : lead,
      ),
    )
  }

  const handleFollowUp = () => {
    if (selectedLead) {
      setLeads(
        leads.map((lead) =>
          lead.id === selectedLead.id
            ? {
                ...lead,
                notes: lead.notes + `\n[${new Date().toLocaleDateString()}] ${followUpNote}`,
                lastContact: new Date().toISOString().split("T")[0],
              }
            : lead,
        ),
      )
      setFollowUpNote("")
      setIsFollowUpDialogOpen(false)
      setSelectedLead(null)
    }
  }

  const getPriorityLeads = () => {
    const today = new Date().toISOString().split("T")[0]
    return leads.filter((lead) => lead.nextFollowUp <= today && lead.status !== "enrolled" && lead.status !== "dropped")
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-space-grotesk text-foreground">My Leads</h1>
          <p className="text-muted-foreground">Manage your assigned leads and follow-ups</p>
        </div>
      </div>

      {/* Priority Follow-ups */}
      {getPriorityLeads().length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="font-space-grotesk text-orange-800 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Priority Follow-ups ({getPriorityLeads().length})
            </CardTitle>
            <CardDescription className="text-orange-700">These leads need immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {getPriorityLeads().map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {lead.course} • Due: {lead.nextFollowUp}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedLead(lead)
                        setIsFollowUpDialogOpen(true)
                      }}
                    >
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Follow Up
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold font-space-grotesk">{leads.length}</div>
            <p className="text-sm text-muted-foreground">Total Assigned</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold font-space-grotesk">
              {leads.filter((l) => l.status === "new" || l.status === "contacted").length}
            </div>
            <p className="text-sm text-muted-foreground">Active Leads</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold font-space-grotesk">
              {leads.filter((l) => l.status === "demo").length}
            </div>
            <p className="text-sm text-muted-foreground">Demo Scheduled</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold font-space-grotesk">
              {leads.filter((l) => l.status === "enrolled").length}
            </div>
            <p className="text-sm text-muted-foreground">Converted</p>
          </CardContent>
        </Card>
      </div>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-space-grotesk">All My Leads</CardTitle>
          <CardDescription>Track and manage your assigned leads</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="demo">Demo</SelectItem>
                <SelectItem value="enrolled">Enrolled</SelectItem>
                <SelectItem value="dropped">Dropped</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Next Follow-up</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="w-3 h-3 mr-1" />
                          {lead.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="w-3 h-3 mr-1" />
                          {lead.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{lead.course}</TableCell>
                    <TableCell>
                      <Select
                        value={lead.status}
                        onValueChange={(value) => updateLeadStatus(lead.id, value as Lead["status"])}
                      >
                        <SelectTrigger className="w-32">
                          <Badge className={getStatusColor(lead.status)} variant="secondary">
                            {lead.status}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="demo">Demo</SelectItem>
                          <SelectItem value="enrolled">Enrolled</SelectItem>
                          <SelectItem value="dropped">Dropped</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          lead.nextFollowUp <= new Date().toISOString().split("T")[0] ? "text-red-600 font-medium" : ""
                        }
                      >
                        {lead.nextFollowUp}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedLead(lead)
                            setIsFollowUpDialogOpen(true)
                          }}
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Follow-up Dialog */}
      <Dialog open={isFollowUpDialogOpen} onOpenChange={setIsFollowUpDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Follow-up Note</DialogTitle>
            <DialogDescription>Record your interaction with {selectedLead?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="followup-note">Follow-up Note</Label>
              <Textarea
                id="followup-note"
                value={followUpNote}
                onChange={(e) => setFollowUpNote(e.target.value)}
                placeholder="What did you discuss? What are the next steps?"
                rows={4}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleFollowUp} className="flex-1">
                Save Note
              </Button>
              <Button variant="outline" onClick={() => setIsFollowUpDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
