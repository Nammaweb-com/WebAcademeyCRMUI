"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Filter, Mail, MessageSquare, Phone, Send, BookTemplate as Template } from "lucide-react"
import { useAuth } from "@/components/auth-context"

interface Message {
  id: string
  recipient: string
  type: "email" | "sms" | "whatsapp"
  subject?: string
  content: string
  status: "sent" | "delivered" | "failed" | "pending"
  sentAt: string
  sentBy: string
}

interface Template {
  id: string
  name: string
  type: "email" | "sms" | "whatsapp"
  subject?: string
  content: string
  category: string
}

export default function StaffCommunicationPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      recipient: "+91 98765 43210",
      type: "sms",
      content: "Reminder: Your demo session is scheduled for tomorrow at 2 PM.",
      status: "sent",
      sentAt: "2024-01-16 09:15",
      sentBy: user?.name || "Staff",
    },
    {
      id: "2",
      recipient: "vikash@email.com",
      type: "email",
      subject: "Course Materials Available",
      content: "Hi Vikash! Your course materials are ready for download.",
      status: "delivered",
      sentAt: "2024-01-15 16:45",
      sentBy: user?.name || "Staff",
    },
  ])

  const [templates] = useState<Template[]>([
    {
      id: "1",
      name: "Demo Reminder",
      type: "sms",
      content:
        "Hi {LEAD_NAME}, this is a reminder about your demo session for {COURSE_NAME} scheduled for {DATE} at {TIME}.",
      category: "demo",
    },
    {
      id: "2",
      name: "Follow-up Email",
      type: "email",
      subject: "Following up on your interest in {COURSE_NAME}",
      content:
        "Dear {LEAD_NAME}, I wanted to follow up on your interest in our {COURSE_NAME} course. Do you have any questions?",
      category: "follow-up",
    },
    {
      id: "3",
      name: "Course Update",
      type: "whatsapp",
      content: "Hi {STUDENT_NAME}! Just wanted to update you about {COURSE_NAME}. {UPDATE_MESSAGE}",
      category: "update",
    },
  ])

  const [activeTab, setActiveTab] = useState("compose")
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isComposeDialogOpen, setIsComposeDialogOpen] = useState(false)
  const [newMessage, setNewMessage] = useState({
    type: "email",
    recipient: "",
    subject: "",
    content: "",
    template: "",
  })

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || message.type === typeFilter
    return matchesSearch && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "sent":
        return "bg-blue-100 text-blue-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="w-4 h-4" />
      case "sms":
        return <MessageSquare className="w-4 h-4" />
      case "whatsapp":
        return <Phone className="w-4 h-4" />
      default:
        return <Mail className="w-4 h-4" />
    }
  }

  const handleSendMessage = () => {
    const message: Message = {
      id: Date.now().toString(),
      recipient: newMessage.recipient,
      type: newMessage.type as Message["type"],
      subject: newMessage.subject,
      content: newMessage.content,
      status: "sent",
      sentAt: new Date().toLocaleString(),
      sentBy: user?.name || "Staff",
    }
    setMessages([message, ...messages])
    setNewMessage({ type: "email", recipient: "", subject: "", content: "", template: "" })
    setIsComposeDialogOpen(false)
  }

  const loadTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId)
    if (template) {
      setNewMessage({
        ...newMessage,
        type: template.type,
        subject: template.subject || "",
        content: template.content,
      })
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-space-grotesk text-foreground">Communication</h1>
          <p className="text-muted-foreground">Send messages to leads and students</p>
        </div>
        <Dialog open={isComposeDialogOpen} onOpenChange={setIsComposeDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Send Message</DialogTitle>
              <DialogDescription>Send email, SMS, or WhatsApp message</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="message-type">Message Type</Label>
                  <Select
                    value={newMessage.type}
                    onValueChange={(value) => setNewMessage({ ...newMessage, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message-template">Use Template</Label>
                  <Select
                    value={newMessage.template}
                    onValueChange={(value) => {
                      setNewMessage({ ...newMessage, template: value })
                      if (value) loadTemplate(value)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates
                        .filter((t) => t.type === newMessage.type)
                        .map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message-recipient">Recipient</Label>
                <Input
                  id="message-recipient"
                  value={newMessage.recipient}
                  onChange={(e) => setNewMessage({ ...newMessage, recipient: e.target.value })}
                  placeholder={newMessage.type === "email" ? "Enter email address" : "Enter phone number"}
                />
              </div>
              {newMessage.type === "email" && (
                <div className="space-y-2">
                  <Label htmlFor="message-subject">Subject</Label>
                  <Input
                    id="message-subject"
                    value={newMessage.subject}
                    onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                    placeholder="Email subject"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="message-content">Message Content</Label>
                <Textarea
                  id="message-content"
                  value={newMessage.content}
                  onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                  placeholder="Type your message here..."
                  rows={6}
                />
              </div>
              <Button onClick={handleSendMessage} className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold font-space-grotesk">{messages.length}</div>
                <p className="text-sm text-muted-foreground">Messages Sent</p>
              </div>
              <Send className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold font-space-grotesk">
                  {messages.filter((m) => m.status === "delivered").length}
                </div>
                <p className="text-sm text-muted-foreground">Delivered</p>
              </div>
              <Mail className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold font-space-grotesk">{templates.length}</div>
                <p className="text-sm text-muted-foreground">Templates Available</p>
              </div>
              <Template className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="compose">Quick Send</TabsTrigger>
          <TabsTrigger value="history">Message History</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-space-grotesk">Quick Message</CardTitle>
              <CardDescription>Send a quick message to leads or students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Message Type</Label>
                  <Select
                    value={newMessage.type}
                    onValueChange={(value) => setNewMessage({ ...newMessage, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Template</Label>
                  <Select
                    value={newMessage.template}
                    onValueChange={(value) => {
                      setNewMessage({ ...newMessage, template: value })
                      if (value) loadTemplate(value)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates
                        .filter((t) => t.type === newMessage.type)
                        .map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Recipient</Label>
                <Input
                  value={newMessage.recipient}
                  onChange={(e) => setNewMessage({ ...newMessage, recipient: e.target.value })}
                  placeholder={newMessage.type === "email" ? "Enter email address" : "Enter phone number"}
                />
              </div>
              {newMessage.type === "email" && (
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input
                    value={newMessage.subject}
                    onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                    placeholder="Email subject"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label>Message Content</Label>
                <Textarea
                  value={newMessage.content}
                  onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                  placeholder="Type your message here..."
                  rows={6}
                />
              </div>
              <Button onClick={handleSendMessage} className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-space-grotesk">My Message History</CardTitle>
              <CardDescription>View messages you have sent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Subject/Content</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Sent At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMessages.map((message) => (
                      <TableRow key={message.id}>
                        <TableCell>
                          <div className="flex items-center">
                            {getTypeIcon(message.type)}
                            <span className="ml-2 capitalize">{message.type}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{message.recipient}</TableCell>
                        <TableCell>
                          <div>
                            {message.subject && <p className="font-medium text-sm">{message.subject}</p>}
                            <p className="text-sm text-muted-foreground truncate max-w-xs">{message.content}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(message.status)} variant="secondary">
                            {message.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{message.sentAt}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-space-grotesk">Available Templates</CardTitle>
              <CardDescription>Pre-made templates for common messages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <Card key={template.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <div className="flex items-center space-x-1">
                          {getTypeIcon(template.type)}
                          <Badge variant="outline" className="text-xs">
                            {template.category}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {template.subject && <p className="font-medium text-sm mb-2">{template.subject}</p>}
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{template.content}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setNewMessage({
                            ...newMessage,
                            type: template.type,
                            subject: template.subject || "",
                            content: template.content,
                            template: template.id,
                          })
                          setActiveTab("compose")
                        }}
                      >
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
