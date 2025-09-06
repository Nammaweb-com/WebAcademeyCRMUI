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
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, Mail, MessageSquare, Phone } from "lucide-react"

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

interface CommunicationTemplate {
  id: string
  name: string
  type: "email" | "sms" | "whatsapp"
  subject?: string
  content: string
  category: string
  createdAt: string
}

interface Contact {
  id: string
  name: string
  email: string
  phone: string
  type: "lead" | "student" | "staff"
  status: string
}

export default function AdminCommunicationPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      recipient: "priya@email.com",
      type: "email",
      subject: "Welcome to Web Development Course",
      content: "Dear Priya, Welcome to our Full Stack Web Development course...",
      status: "delivered",
      sentAt: "2024-01-16 10:30",
      sentBy: "Admin",
    },
    {
      id: "2",
      recipient: "+91 98765 43210",
      type: "sms",
      content: "Reminder: Your demo session is scheduled for tomorrow at 2 PM.",
      status: "sent",
      sentAt: "2024-01-16 09:15",
      sentBy: "Priya Gupta",
    },
    {
      id: "3",
      recipient: "+91 87654 32109",
      type: "whatsapp",
      content: "Hi Vikash! Your course materials are ready for download.",
      status: "delivered",
      sentAt: "2024-01-15 16:45",
      sentBy: "Rahul Singh",
    },
  ])

  const [templates, setTemplates] = useState<CommunicationTemplate[]>([
    {
      id: "1",
      name: "Welcome Email",
      type: "email",
      subject: "Welcome to {COURSE_NAME}",
      content: "Dear {STUDENT_NAME}, Welcome to our {COURSE_NAME} course. We're excited to have you join us!",
      category: "enrollment",
      createdAt: "2024-01-01",
    },
    {
      id: "2",
      name: "Payment Reminder",
      type: "sms",
      content: "Hi {STUDENT_NAME}, this is a reminder that your payment of ₹{AMOUNT} is due on {DUE_DATE}.",
      category: "payment",
      createdAt: "2024-01-01",
    },
    {
      id: "3",
      name: "Demo Confirmation",
      type: "whatsapp",
      content: "Hi {LEAD_NAME}! Your demo session for {COURSE_NAME} is confirmed for {DATE} at {TIME}.",
      category: "demo",
      createdAt: "2024-01-01",
    },
  ])

  const [contacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Priya Sharma",
      email: "priya@email.com",
      phone: "+91 98765 43210",
      type: "lead",
      status: "contacted",
    },
    {
      id: "2",
      name: "Vikash Kumar",
      email: "vikash@email.com",
      phone: "+91 87654 32109",
      type: "student",
      status: "enrolled",
    },
    { id: "3", name: "Anita Singh", email: "anita@email.com", phone: "+91 76543 21098", type: "lead", status: "new" },
  ])

  const [activeTab, setActiveTab] = useState("compose")
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isComposeDialogOpen, setIsComposeDialogOpen] = useState(false)
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false)
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [newMessage, setNewMessage] = useState({
    type: "email",
    recipients: "",
    subject: "",
    content: "",
    template: "",
  })
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    type: "email",
    subject: "",
    content: "",
    category: "",
  })

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || message.type === typeFilter
    return matchesSearch && matchesType
  })

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || template.type === typeFilter
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
      recipient: newMessage.recipients,
      type: newMessage.type as Message["type"],
      subject: newMessage.subject,
      content: newMessage.content,
      status: "sent",
      sentAt: new Date().toLocaleString(),
      sentBy: "Admin",
    }
    setMessages([message, ...messages])
    setNewMessage({ type: "email", recipients: "", subject: "", content: "", template: "" })
    setIsComposeDialogOpen(false)
  }

  const handleCreateTemplate = () => {
    const template: CommunicationTemplate = {
      id: Date.now().toString(),
      ...newTemplate,
      type: newTemplate.type as CommunicationTemplate["type"],
      createdAt: new Date().toISOString().split("T")[0],
    }
    setTemplates([...templates, template])
    setNewTemplate({ name: "", type: "email", subject: "", content: "", category: "" })
    setIsTemplateDialogOpen(false)
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

  const handleContactSelection = (contactId: string, checked: boolean) => {
    if (checked) {
      setSelectedContacts([...selectedContacts, contactId])
    } else {
      setSelectedContacts(selectedContacts.filter((id) => id !== contactId))
    }
  }

  const sendBulkMessage = () => {
    const selectedContactsData = contacts.filter((c) => selectedContacts.includes(c.id))
    const bulkMessages: Message[] = selectedContactsData.map((contact) => ({
      id: Date.now().toString() + Math.random(),
      recipient: newMessage.type === "email" ? contact.email : contact.phone,
      type: newMessage.type as Message["type"],
      subject: newMessage.subject,
      content: newMessage.content,
      status: "sent",
      sentAt: new Date().toLocaleString(),
      sentBy: "Admin",
    }))
    setMessages([...bulkMessages, ...messages])
    setSelectedContacts([])
    setNewMessage({ type: "email", recipients: "", subject: "", content: "", template: "" })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-space-grotesk text-foreground">Communication Center</h1>
          <p className="text-muted-foreground">Send messages and manage communication templates</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                New Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Message Template</DialogTitle>
                <DialogDescription>Create a reusable template for common messages</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="template-name">Template Name</Label>
                    <Input
                      id="template-name"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                      placeholder="Enter template name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="template-type">Type</Label>
                    <Select
                      value={newTemplate.type}
                      onValueChange={(value) => setNewTemplate({ ...newTemplate, type: value })}
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
                    <Label htmlFor="template-category">Category</Label>
                    <Select
                      value={newTemplate.category}
                      onValueChange={(value) => setNewTemplate({ ...newTemplate, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enrollment">Enrollment</SelectItem>
                        <SelectItem value="payment">Payment</SelectItem>
                        <SelectItem value="demo">Demo</SelectItem>
                        <SelectItem value="reminder">Reminder</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {newTemplate.type === "email" && (
                    <div className="space-y-2">
                      <Label htmlFor="template-subject">Subject</Label>
                      <Input
                        id="template-subject"
                        value={newTemplate.subject}
                        onChange={(e) => setNewTemplate({ ...newTemplate, subject: e.target.value })}
                        placeholder="Email subject"
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="template-content">Content</Label>
                  <Textarea
                    id="template-content"
                    value={newTemplate.content}
                    onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                    placeholder="Message content... Use {STUDENT_NAME}, {COURSE_NAME}, etc. for variables"
                    rows={6}
                  />
                </div>
                <Button onClick={handleCreateTemplate} className="w-full">
                  Create Template
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isComposeDialogOpen} onOpenChange={setIsComposeDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Mail className="w-4 h-4 mr-2" />
                Compose Message
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Compose New Message</DialogTitle>
                <DialogDescription>Send email, SMS, or WhatsApp messages</DialogDescription>
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
                  <Label htmlFor="message-recipients">Recipients</Label>
                  <Input
                    id="message-recipients"
                    value={newMessage.recipients}
                    onChange={(e) => setNewMessage({ ...newMessage, recipients: e.target.value })}
                    placeholder={newMessage.type === "email" ? "Enter email addresses" : "Enter phone numbers"}
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
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold font-space-grotesk">
                  {messages.filter((m) => m.status === "delivered").length}
                </div>
                <p className="text-sm text-muted-foreground">Messages Delivered</p>
              </div>
              <Mail className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold font-space-grotesk">
                  {messages.filter((m) => m.type === "email").length}
                </div>
                <p className="text-sm text-muted-foreground">Emails Sent</p>
              </div>
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold font-space-grotesk">
                  {messages.filter((m) => m.type === "sms").length}
                </div>
                <p className="text-sm text-muted-foreground">SMS Sent</p>
              </div>
              <MessageSquare className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold font-space-grotesk">{templates.length}</div>
                <p className="text-sm text-muted-foreground">Templates</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="compose">Bulk Messaging</TabsTrigger>
          <TabsTrigger value="history">Message History</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contact Selection */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="font-space-grotesk">Select Recipients</CardTitle>
                <CardDescription>Choose contacts to send bulk messages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="flex items-center space-x-3 p-2 rounded border">
                      <Checkbox
                        checked={selectedContacts.includes(contact.id)}
                        onCheckedChange={(checked) => handleContactSelection(contact.id, checked as boolean)}
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{contact.name}</p>
                        <p className="text-xs text-muted-foreground">{contact.email}</p>
                        <Badge variant="outline" className="text-xs">
                          {contact.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                {selectedContacts.length > 0 && (
                  <div className="mt-4 p-3 bg-primary/10 rounded">
                    <p className="text-sm font-medium">{selectedContacts.length} contacts selected</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Message Composer */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="font-space-grotesk">Compose Bulk Message</CardTitle>
                <CardDescription>Send messages to selected contacts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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
                    rows={8}
                  />
                </div>
                <Button
                  onClick={sendBulkMessage}
                  className="w-full"
                  disabled={selectedContacts.length === 0 || !newMessage.content}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send to {selectedContacts.length} Recipients
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-space-grotesk">Message History</CardTitle>
              <CardDescription>View all sent messages and their delivery status</CardDescription>
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
                      <TableHead>Sent By</TableHead>
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
                        <TableCell>{message.sentBy}</TableCell>
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
              <CardTitle className="font-space-grotesk">Message Templates</CardTitle>
              <CardDescription>Manage reusable message templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search templates..."
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTemplates.map((template) => (
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
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Created {template.createdAt}</span>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Mail className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
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
