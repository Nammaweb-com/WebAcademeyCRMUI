"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

type TabKey = "overview" | "payments" | "invoices" | "pending" | "settings"

export default function AdminFinancePage() {
  const [tab, setTab] = useState<TabKey>("overview")
  const { toast } = useToast()

  const [payments, setPayments] = useState([
    {
      id: "PMT-0012",
      student: "Aarav Sharma",
      course: "Full-Stack Dev",
      amount: 15000,
      method: "UPI",
      date: "2025-08-28",
      status: "Paid",
    },
    {
      id: "PMT-0013",
      student: "Priya Singh",
      course: "Data Science",
      amount: 12000,
      method: "Card",
      date: "2025-08-29",
      status: "Paid",
    },
    {
      id: "PMT-0014",
      student: "Rahul Verma",
      course: "UI/UX",
      amount: 8000,
      method: "Cash",
      date: "2025-08-30",
      status: "Pending",
    },
  ])

  const [form, setForm] = useState({
    student: "",
    course: "",
    amount: "",
    method: "",
  })

  const [taxPercent, setTaxPercent] = useState<number | "">(18)
  const [receiptPrefix, setReceiptPrefix] = useState("PMT-")

  const pending = [
    { student: "Karan Patel", course: "Frontend", due: 5000, dueDate: "2025-09-05" },
    { student: "Neha Gupta", course: "Python", due: 7000, dueDate: "2025-09-07" },
  ]

  function download(filename: string, content: string, type = "text/plain") {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  function handleExportCSV() {
    const header = ["Receipt,Student,Course,Method,Amount,Date,Status"]
    const rows = payments.map((p) =>
      [p.id, p.student, p.course, p.method, p.amount, p.date, p.status]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(","),
    )
    const csv = [...header, ...rows].join("\n")
    download(`payments-${new Date().toISOString().slice(0, 10)}.csv`, csv, "text/csv")
    toast({ title: "Exported", description: "Payments exported as CSV." })
  }

  function handleRecordPayment() {
    setTab("payments")
  }

  function handleSavePayment() {
    const amountNum = Number(form.amount)
    if (!form.student || !form.course || !form.method || !amountNum) {
      toast({ title: "Missing details", description: "Fill all fields before saving.", variant: "destructive" })
      return
    }
    const nextNumber = (payments.length + 1).toString().padStart(4, "0")
    const id = `${receiptPrefix}${nextNumber}`
    const today = new Date().toISOString().slice(0, 10)
    const newPayment = {
      id,
      student: form.student,
      course: form.course,
      amount: amountNum,
      method: form.method,
      date: today,
      status: "Paid",
    } as (typeof payments)[number]
    setPayments((prev) => [...prev, newPayment])
    toast({ title: "Payment saved", description: `Receipt ${id} created for ₹ ${amountNum.toLocaleString("en-IN")}.` })
    setForm({ student: "", course: "", amount: "", method: "" })
  }

  function handleGenerateReceipt() {
    const amountNum = Number(form.amount)
    if (!form.student || !form.course || !form.method || !amountNum) {
      toast({
        title: "Missing details",
        description: "Fill all fields before generating a receipt.",
        variant: "destructive",
      })
      return
    }
    const nextNumber = (payments.length + 1).toString().padStart(4, "0")
    const id = `${receiptPrefix}${nextNumber}`
    const taxRate = typeof taxPercent === "number" ? taxPercent : Number(taxPercent || 0)
    const tax = Math.round((amountNum * taxRate) / 100)
    const total = amountNum + tax
    const today = new Date().toISOString().slice(0, 10)
    const receipt = [
      `Receipt: ${id}`,
      `Date: ${today}`,
      `Student: ${form.student}`,
      `Course: ${form.course}`,
      `Method: ${form.method}`,
      `Amount: ₹ ${amountNum.toLocaleString("en-IN")}`,
      `Tax (${taxRate}%): ₹ ${tax.toLocaleString("en-IN")}`,
      `Total: ₹ ${total.toLocaleString("en-IN")}`,
      "",
      "Thank you for your payment!",
    ].join("\n")
    download(`${id}.txt`, receipt)
    toast({ title: "Receipt generated", description: `${id} downloaded.` })
  }

  function handleSaveSettings() {
    toast({ title: "Settings saved", description: "Finance settings updated." })
  }

  return (
    <main className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-pretty">Finance & Payments</h1>
          <p className="text-sm text-muted-foreground">Track revenue, record payments, and manage invoices.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" type="button" onClick={handleExportCSV}>
            Export CSV
          </Button>
          <Button type="button" onClick={handleRecordPayment}>
            Record Payment
          </Button>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Revenue (MTD)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">₹ 3,24,000</div>
            <p className="text-xs text-muted-foreground">+12.3% vs last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Pending Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">₹ 67,000</div>
            <p className="text-xs text-muted-foreground">18 students with dues</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Collection Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">86%</div>
            <p className="text-xs text-muted-foreground">Target: 92%</p>
          </CardContent>
        </Card>
      </section>

      <Tabs value={tab} onValueChange={(value) => setTab(value as TabKey)} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="pending">Pending Fees</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Receipt</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.id}</TableCell>
                      <TableCell>{p.student}</TableCell>
                      <TableCell>{p.course}</TableCell>
                      <TableCell>{p.method}</TableCell>
                      <TableCell className="text-right">₹ {p.amount.toLocaleString("en-IN")}</TableCell>
                      <TableCell>{p.date}</TableCell>
                      <TableCell>
                        <span className={p.status === "Paid" ? "text-green-600" : "text-amber-600"}>{p.status}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Record a Payment</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="student">Student</Label>
                <Input
                  id="student"
                  placeholder="Search student name"
                  value={form.student}
                  onChange={(e) => setForm((f) => ({ ...f, student: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="course">Course</Label>
                <Input
                  id="course"
                  placeholder="Course name"
                  value={form.course}
                  onChange={(e) => setForm((f) => ({ ...f, course: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={form.amount}
                  onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="method">Method</Label>
                <Input
                  id="method"
                  placeholder="UPI / Card / Cash"
                  value={form.method}
                  onChange={(e) => setForm((f) => ({ ...f, method: e.target.value }))}
                />
              </div>
              <div className="md:col-span-2 flex gap-2">
                <Button type="button" onClick={handleSavePayment}>
                  Save Payment
                </Button>
                <Button type="button" variant="outline" onClick={handleGenerateReceipt}>
                  Generate Receipt
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              No invoices yet. Use “Generate Receipt” in Payments to create one.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Students with Pending Fees</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Amount Due</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pending.map((d, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{d.student}</TableCell>
                      <TableCell>{d.course}</TableCell>
                      <TableCell>{d.dueDate}</TableCell>
                      <TableCell className="text-right">₹ {d.due.toLocaleString("en-IN")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Finance Settings</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="tax">Tax Percentage</Label>
                <Input
                  id="tax"
                  type="number"
                  placeholder="18"
                  value={taxPercent === "" ? "" : String(taxPercent)}
                  onChange={(e) => {
                    const v = e.target.value
                    setTaxPercent(v === "" ? "" : Number(v))
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="prefix">Receipt Prefix</Label>
                <Input
                  id="prefix"
                  placeholder="PMT-"
                  value={receiptPrefix}
                  onChange={(e) => setReceiptPrefix(e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <Button type="button" onClick={handleSaveSettings}>
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
