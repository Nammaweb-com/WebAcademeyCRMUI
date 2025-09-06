"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/auth-context"
import { User, Bell, Settings, Building, Save } from "lucide-react"

export default function AdminSettingsPage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+91 98765 43210",
    bio: "Administrator managing the educational institute operations.",
    avatar: "",
  })

  const [instituteSettings, setInstituteSettings] = useState({
    instituteName: "webacademy Institute",
    address: "123 Education Street, Learning City",
    phone: "+91 98765 43210",
    email: "info@webacademy.com",
    website: "www.webacademy.com",
    timezone: "Asia/Kolkata",
    currency: "INR",
  })

  const [systemSettings, setSystemSettings] = useState({
    autoAssignLeads: true,
    emailReminders: true,
    smsNotifications: false,
    backupFrequency: "daily",
    sessionTimeout: "30",
  })

  const handleProfileSave = () => {
    console.log("Profile saved:", profile)
  }

  const handleInstituteSave = () => {
    console.log("Institute settings saved:", instituteSettings)
  }

  const handleSystemSave = () => {
    console.log("System settings saved:", systemSettings)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-space-grotesk text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account and system settings</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="institute">Institute</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-space-grotesk flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal information and profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-lg">
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                  <p className="text-sm text-muted-foreground mt-1">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" value="Administrator" disabled />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows={3}
                />
              </div>

              <Button onClick={handleProfileSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="institute" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-space-grotesk flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Institute Information
              </CardTitle>
              <CardDescription>Update your institute details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="institute-name">Institute Name</Label>
                  <Input
                    id="institute-name"
                    value={instituteSettings.instituteName}
                    onChange={(e) => setInstituteSettings({ ...instituteSettings, instituteName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institute-email">Email</Label>
                  <Input
                    id="institute-email"
                    type="email"
                    value={instituteSettings.email}
                    onChange={(e) => setInstituteSettings({ ...instituteSettings, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institute-phone">Phone</Label>
                  <Input
                    id="institute-phone"
                    value={instituteSettings.phone}
                    onChange={(e) => setInstituteSettings({ ...instituteSettings, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institute-website">Website</Label>
                  <Input
                    id="institute-website"
                    value={instituteSettings.website}
                    onChange={(e) => setInstituteSettings({ ...instituteSettings, website: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={instituteSettings.timezone}
                    onValueChange={(value) => setInstituteSettings({ ...instituteSettings, timezone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                      <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                      <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={instituteSettings.currency}
                    onValueChange={(value) => setInstituteSettings({ ...instituteSettings, currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">INR (₹)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="institute-address">Address</Label>
                <Textarea
                  id="institute-address"
                  value={instituteSettings.address}
                  onChange={(e) => setInstituteSettings({ ...instituteSettings, address: e.target.value })}
                  rows={3}
                />
              </div>

              <Button onClick={handleInstituteSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Institute Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-space-grotesk flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                System Configuration
              </CardTitle>
              <CardDescription>Configure system behavior and automation settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-assign Leads</p>
                    <p className="text-sm text-muted-foreground">Automatically assign new leads to available staff</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={systemSettings.autoAssignLeads}
                    onChange={(e) => setSystemSettings({ ...systemSettings, autoAssignLeads: e.target.checked })}
                    className="w-4 h-4"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Reminders</p>
                    <p className="text-sm text-muted-foreground">Send automated email reminders</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={systemSettings.emailReminders}
                    onChange={(e) => setSystemSettings({ ...systemSettings, emailReminders: e.target.checked })}
                    className="w-4 h-4"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">Enable SMS notifications for important updates</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={systemSettings.smsNotifications}
                    onChange={(e) => setSystemSettings({ ...systemSettings, smsNotifications: e.target.checked })}
                    className="w-4 h-4"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">Backup Frequency</Label>
                  <Select
                    value={systemSettings.backupFrequency}
                    onValueChange={(value) => setSystemSettings({ ...systemSettings, backupFrequency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    value={systemSettings.sessionTimeout}
                    onChange={(e) => setSystemSettings({ ...systemSettings, sessionTimeout: e.target.value })}
                  />
                </div>
              </div>

              <Button onClick={handleSystemSave}>
                <Save className="w-4 h-4 mr-2" />
                Save System Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-space-grotesk flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Configure how you receive system notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Lead Notifications</p>
                    <p className="text-sm text-muted-foreground">Get notified when new leads are added</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Payment Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive alerts for payments and dues</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Staff Activity</p>
                    <p className="text-sm text-muted-foreground">Monitor staff login and activity</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">System Alerts</p>
                    <p className="text-sm text-muted-foreground">Critical system notifications</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </div>
              </div>

              <Button>
                <Save className="w-4 h-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
