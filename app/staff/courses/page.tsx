"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, Users, Calendar, Clock, BookOpen, CheckSquare } from "lucide-react"

interface Batch {
  id: string
  courseName: string
  batchCode: string
  startDate: string
  endDate: string
  schedule: string
  enrolled: number
  capacity: number
  status: "upcoming" | "ongoing" | "completed"
  classroom: string
}

interface Student {
  id: string
  name: string
  email: string
  phone: string
  batchId: string
}

interface AttendanceRecord {
  studentId: string
  date: string
  present: boolean
}

export default function StaffCoursesPage() {
  const [batches] = useState<Batch[]>([
    {
      id: "1",
      courseName: "Full Stack Web Development",
      batchCode: "FSWD-2024-01",
      startDate: "2024-02-01",
      endDate: "2024-08-01",
      schedule: "Mon-Wed-Fri 10:00-12:00",
      enrolled: 18,
      capacity: 25,
      status: "ongoing",
      classroom: "Room A-101",
    },
    {
      id: "2",
      courseName: "Data Science & Analytics",
      batchCode: "DS-2024-01",
      startDate: "2024-02-15",
      endDate: "2024-10-15",
      schedule: "Tue-Thu-Sat 2:00-4:00",
      enrolled: 15,
      capacity: 20,
      status: "ongoing",
      classroom: "Room B-201",
    },
  ])

  const [students] = useState<Student[]>([
    { id: "1", name: "Priya Sharma", email: "priya@email.com", phone: "+91 98765 43210", batchId: "1" },
    { id: "2", name: "Vikash Kumar", email: "vikash@email.com", phone: "+91 87654 32109", batchId: "1" },
    { id: "3", name: "Anita Singh", email: "anita@email.com", phone: "+91 76543 21098", batchId: "1" },
    { id: "4", name: "Rahul Gupta", email: "rahul@email.com", phone: "+91 65432 10987", batchId: "2" },
    { id: "5", name: "Neha Patel", email: "neha@email.com", phone: "+91 54321 09876", batchId: "2" },
  ])

  const [attendance, setAttendance] = useState<AttendanceRecord[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null)
  const [isAttendanceDialogOpen, setIsAttendanceDialogOpen] = useState(false)
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split("T")[0])
  const [tempAttendance, setTempAttendance] = useState<{ [key: string]: boolean }>({})

  const filteredBatches = batches.filter((batch) => {
    const matchesSearch =
      batch.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.batchCode.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || batch.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getBatchStudents = (batchId: string) => {
    return students.filter((student) => student.batchId === batchId)
  }

  const openAttendanceDialog = (batch: Batch) => {
    setSelectedBatch(batch)
    const batchStudents = getBatchStudents(batch.id)
    const initialAttendance: { [key: string]: boolean } = {}
    batchStudents.forEach((student) => {
      const existingRecord = attendance.find(
        (record) => record.studentId === student.id && record.date === attendanceDate,
      )
      initialAttendance[student.id] = existingRecord?.present || false
    })
    setTempAttendance(initialAttendance)
    setIsAttendanceDialogOpen(true)
  }

  const saveAttendance = () => {
    if (selectedBatch) {
      const batchStudents = getBatchStudents(selectedBatch.id)
      const newAttendanceRecords: AttendanceRecord[] = batchStudents.map((student) => ({
        studentId: student.id,
        date: attendanceDate,
        present: tempAttendance[student.id] || false,
      }))

      // Remove existing records for this date and batch
      const filteredAttendance = attendance.filter(
        (record) =>
          !(record.date === attendanceDate && batchStudents.some((student) => student.id === record.studentId)),
      )

      setAttendance([...filteredAttendance, ...newAttendanceRecords])
      setIsAttendanceDialogOpen(false)
      setSelectedBatch(null)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-space-grotesk text-foreground">My Courses</h1>
          <p className="text-muted-foreground">View course schedules and manage attendance</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold font-space-grotesk">
              {batches.filter((b) => b.status === "ongoing").length}
            </div>
            <p className="text-sm text-muted-foreground">Active Batches</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold font-space-grotesk">
              {batches.reduce((sum, batch) => sum + batch.enrolled, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Total Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold font-space-grotesk">
              {batches.filter((b) => b.status === "upcoming").length}
            </div>
            <p className="text-sm text-muted-foreground">Upcoming Batches</p>
          </CardContent>
        </Card>
      </div>

      {/* Batches Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-space-grotesk">My Assigned Batches</CardTitle>
          <CardDescription>Courses and batches you are responsible for</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search batches..."
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
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batch Code</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBatches.map((batch) => (
                  <TableRow key={batch.id}>
                    <TableCell className="font-medium">{batch.batchCode}</TableCell>
                    <TableCell>{batch.courseName}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Calendar className="w-3 h-3 mr-1" />
                          {batch.startDate} - {batch.endDate}
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="w-3 h-3 mr-1" />
                          {batch.schedule}
                        </div>
                        <div className="flex items-center text-sm">
                          <BookOpen className="w-3 h-3 mr-1" />
                          {batch.classroom}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {batch.enrolled}/{batch.capacity}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(batch.status)} variant="secondary">
                        {batch.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openAttendanceDialog(batch)}
                          disabled={batch.status !== "ongoing"}
                        >
                          <CheckSquare className="w-4 h-4 mr-1" />
                          Attendance
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

      {/* Attendance Dialog */}
      <Dialog open={isAttendanceDialogOpen} onOpenChange={setIsAttendanceDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Mark Attendance</DialogTitle>
            <DialogDescription>
              {selectedBatch?.batchCode} - {selectedBatch?.courseName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label htmlFor="attendance-date" className="text-sm font-medium">
                Date:
              </label>
              <Input
                id="attendance-date"
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="w-48"
              />
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {selectedBatch &&
                getBatchStudents(selectedBatch.id).map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`attendance-${student.id}`}
                        checked={tempAttendance[student.id] || false}
                        onCheckedChange={(checked) =>
                          setTempAttendance((prev) => ({
                            ...prev,
                            [student.id]: checked as boolean,
                          }))
                        }
                      />
                      <label htmlFor={`attendance-${student.id}`} className="text-sm font-medium cursor-pointer">
                        Present
                      </label>
                    </div>
                  </div>
                ))}
            </div>

            <div className="flex gap-2">
              <Button onClick={saveAttendance} className="flex-1">
                Save Attendance
              </Button>
              <Button variant="outline" onClick={() => setIsAttendanceDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
