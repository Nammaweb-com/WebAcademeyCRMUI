"use client"
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "./auth-context"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  DollarSign,
  UserCheck,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    current: true,
  },
  {
    name: "Lead Management",
    href: "/admin/leads",
    icon: Users,
    badge: "12",
  },
  {
    name: "Course Management",
    href: "/admin/courses",
    icon: GraduationCap,
  },
  {
    name: "Finance & Payments",
    href: "/admin/finance",
    icon: DollarSign,
    badge: "3",
  },
  {
    name: "Staff Management",
    href: "/admin/staff",
    icon: UserCheck,
  },
  {
    name: "Communication",
    href: "/admin/communication",
    icon: MessageSquare,
  },
  {
    name: "Reports & Analytics",
    href: "/admin/reports",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div
      className={`bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } flex flex-col`}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-sidebar-primary-foreground" />
              </div>
              <span className="font-bold font-space-grotesk text-sidebar-foreground">EduCRM</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* User Info */}
      {!collapsed && (
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-sidebar-primary rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-sidebar-primary-foreground">{user?.name?.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">Administrator</p>
            </div>
            <Button variant="ghost" size="sm" className="text-sidebar-foreground hover:bg-sidebar-accent">
              <Bell className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Button
              key={item.name}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start ${collapsed ? "px-2" : "px-3"} ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
              onClick={() => router.push(item.href)}
            >
              <item.icon className={`w-5 h-5 ${collapsed ? "" : "mr-3"}`} />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className={`w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
            collapsed ? "px-2" : "px-3"
          }`}
          onClick={handleLogout}
        >
          <LogOut className={`w-5 h-5 ${collapsed ? "" : "mr-3"}`} />
          {!collapsed && "Sign Out"}
        </Button>
      </div>
    </div>
  )
}
