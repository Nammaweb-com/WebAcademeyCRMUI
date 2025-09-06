"use client"

import type React from "react"
import { AuthProvider } from "@/components/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ProtectedRoute allowedRoles={["admin"]}>
        <div className="flex h-screen bg-background">
          <AdminSidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </ProtectedRoute>
    </AuthProvider>
  )
}
