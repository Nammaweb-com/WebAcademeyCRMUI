"use client"

import type React from "react"
import { AuthProvider } from "@/components/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { StaffSidebar } from "@/components/staff-sidebar"

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ProtectedRoute allowedRoles={["staff"]}>
        <div className="flex h-screen bg-background">
          <StaffSidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </ProtectedRoute>
    </AuthProvider>
  )
}
