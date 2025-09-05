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
import { Plus, Search, Filter, Users, Calendar, Clock, BookOpen, Edit, Eye, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Course {
  id: string
  name: string
  description: string
  duration: string
  fees: number
  category: string
  status: "active" | "inactive" | "draft"
  trainer: string
  syllabus: string
  createdAt: string
}

interface Batch {
  id: string
  courseId: string
  courseName: string
  batchCode: string
  startDate: string
  endDate: string
  schedule: string
  trainer: string
  capacity: number
  enrolled: number
  status: "upcoming" | "ongoing" | "completed"
  classroom: string
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      name: "Full Stack Web Development",
      description: "Complete web development course covering frontend and backend technologies",
      duration: "6 months",
      fees: 45000,
      category: "Programming",
      status: "active",
      trainer: "Rahul Singh",
      syllabus: "HTML, CSS, JavaScript, React, Node.js, MongoDB",
      createdAt: "2024-01-01",
    },
    {
      id: "2",
      name: "Data Science & Analytics",
      description: "Comprehensive data science course with Python and machine learning",
      duration: "8 months",
      fees: 55000,
      category: "Data Science",
      status: "active",
      trainer: "Priya Gupta",
      syllabus: "Python, Pandas, NumPy, Scikit-learn, TensorFlow",
      createdAt: "2024-01-01",
    },
    {
      id: "3",
      name: "Digital Marketing Mastery",
      description: "Complete digital marketing course covering all major platforms",
      duration: "4 months",
      fees: 25000,
      category: "Marketing",
      status: "active",
      trainer: "Amit Kumar",
      syllabus: "SEO, SEM, Social Media, Content Marketing, Analytics",
      createdAt: "2024-01-01",
    },
  ])

  const [batches, setBatches] = useState<Batch[]>([
    {
      id: "1",
      courseId: "1",
      courseName: "Full Stack Web Development",
      batchCode: "FSWD-2024-01",
      startDate: "2024-02-01",
      endDate: "2024-08-01",
      schedule: "Mon-Wed-Fri 10:00-12:00",
      trainer: "Rahul Singh",
      capacity: 25,
      enrolled: 18,
      status: "ongoing",
      classroom: "Room A-101",
    },
    {
      id: "2",
      courseId: "2",
      courseName: "Data Science & Analytics",
      batchCode: "DS-2024-01",
      startDate: "2024-02-15",
      endDate: "2024-10-15",
      schedule: "Tue-Thu-Sat 2:00-4:00",
      trainer: "Priya Gupta",
      capacity: 20,
      enrolled: 15,
      status: "ongoing",
      classroom: "Room B-201",
    },
    {
      id: "3",
      courseId: "1",
      courseName: "Full Stack Web Development",
      batchCode: "FSWD-2024-02",
      startDate: "2024-03-01",
      endDate: "2024-09-01",
      schedule: "Mon-Wed-Fri 2:00-4:00",
      trainer: "Rahul Singh",
      capacity: 25,
      enrolled: 22,
      status: "upcoming",
      classroom: "Room A-102",
    },
  ])

  const [activeTab, setActiveTab] = useState("courses")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddCourseDialogOpen, setIsAddCourseDialogOpen] = useState(false)
  const [isAddBatchDialogOpen, setIsAddBatchDialogOpen] = useState(false)
  const [newCourse, setNewCourse] = useState({
    name: "",
    description: "",
    duration: "",
    fees: "",
    category: "",
    trainer: "",
    syllabus: "",
  })
  const [newBatch, setNewBatch] = useState({
    courseId: "",
    batchCode: "",
    startDate: "",
    endDate: "",
    schedule: "",
    trainer: "",
    capacity: "",
    classroom: "",
  })

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || course.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredBatches = batches.filter((batch) => {
    const matchesSearch =
      batch.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.batchCode.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || batch.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "ongoing":
        return "bg-green-100 text-green-800"
      case "inactive":
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "draft":
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleAddCourse = () => {
    const course: Course = {
      id: Date.now().toString(),
      ...newCourse,
      fees: Number.parseInt(newCourse.fees),
      status: "draft",
      createdAt: new Date().toISOString().split("T")[0],
    }
    setCourses([...courses, course])
    setNewCourse({ name: "", description: "", duration: "", fees: "", category: "", trainer: "", syllabus: "" })
    setIsAddCourseDialogOpen(false)
  }

  const handleAddBatch = () => {
    const selectedCourse = courses.find((c) => c.id === newBatch.courseId)
    if (selectedCourse) {
      const batch: Batch = {
        id: Date.now().toString(),
        ...newBatch,
        courseName: selectedCourse.name,
        capacity: Number.parseInt(newBatch.capacity),
        enrolled: 0,
        status: "upcoming",
      }
      setBatches([...batches, batch])
      setNewBatch({
        courseId: "",
        batchCode: "",
        startDate: "",
        endDate: "",
        schedule: "",
        trainer: "",
        capacity: "",
        classroom: "",
      })
      setIsAddBatchDialogOpen(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-space-grotesk text-foreground">Course Management</h1>
          <p className="text-muted-foreground">Manage courses, batches, and schedules</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddCourseDialogOpen} onOpenChange={setIsAddCourseDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Course</DialogTitle>
                <DialogDescription>Create a new course for your institute</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course-name">Course Name</Label>
                  <Input
                    id="course-name"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                    placeholder="Enter course name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course-category">Category</Label>
                  <Select
                    value={newCourse.category}
                    onValueChange={(value) => setNewCourse({ ...newCourse, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Programming">Programming</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course-duration">Duration</Label>
                  <Input
                    id="course-duration"
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                    placeholder="e.g., 6 months"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course-fees">Fees (₹)</Label>
                  <Input
                    id="course-fees"
                    type="number"
                    value={newCourse.fees}
                    onChange={(e) => setNewCourse({ ...newCourse, fees: e.target.value })}
                    placeholder="Enter course fees"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course-trainer">Trainer</Label>
                  <Select
                    value={newCourse.trainer}
                    onValueChange={(value) => setNewCourse({ ...newCourse, trainer: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select trainer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rahul Singh">Rahul Singh</SelectItem>
                      <SelectItem value="Priya Gupta">Priya Gupta</SelectItem>
                      <SelectItem value="Amit Kumar">Amit Kumar</SelectItem>
                      <SelectItem value="Neha Sharma">Neha Sharma</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="course-description">Description</Label>
                  <Textarea
                    id="course-description"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    placeholder="Course description..."
                    rows={3}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="course-syllabus">Syllabus</Label>
                  <Textarea
                    id="course-syllabus"
                    value={newCourse.syllabus}
                    onChange={(e) => setNewCourse({ ...newCourse, syllabus: e.target.value })}
                    placeholder="Course syllabus and topics..."
                    rows={3}
                  />
                </div>
                <div className="col-span-2">
                  <Button onClick={handleAddCourse} className="w-full">
                    Create Course
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddBatchDialogOpen} onOpenChange={setIsAddBatchDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Batch
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Batch</DialogTitle>
                <DialogDescription>Schedule a new batch for a course</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="batch-course">Course</Label>
                  <Select
                    value={newBatch.courseId}
                    onValueChange={(value) => setNewBatch({ ...newBatch, courseId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="batch-code">Batch Code</Label>
                  <Input
                    id="batch-code"
                    value={newBatch.batchCode}
                    onChange={(e) => setNewBatch({ ...newBatch, batchCode: e.target.value })}
                    placeholder="e.g., FSWD-2024-03"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="batch-start">Start Date</Label>
                  <Input
                    id="batch-start"
                    type="date"
                    value={newBatch.startDate}
                    onChange={(e) => setNewBatch({ ...newBatch, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="batch-end">End Date</Label>
                  <Input
                    id="batch-end"
                    type="date"
                    value={newBatch.endDate}
                    onChange={(e) => setNewBatch({ ...newBatch, endDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="batch-schedule">Schedule</Label>
                  <Input
                    id="batch-schedule"
                    value={newBatch.schedule}
                    onChange={(e) => setNewBatch({ ...newBatch, schedule: e.target.value })}
                    placeholder="e.g., Mon-Wed-Fri 10:00-12:00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="batch-trainer">Trainer</Label>
                  <Select
                    value={newBatch.trainer}
                    onValueChange={(value) => setNewBatch({ ...newBatch, trainer: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select trainer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rahul Singh">Rahul Singh</SelectItem>
                      <SelectItem value="Priya Gupta">Priya Gupta</SelectItem>
                      <SelectItem value="Amit Kumar">Amit Kumar</SelectItem>
                      <SelectItem value="Neha Sharma">Neha Sharma</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="batch-capacity">Capacity</Label>
                  <Input
                    id="batch-capacity"
                    type="number"
                    value={newBatch.capacity}
                    onChange={(e) => setNewBatch({ ...newBatch, capacity: e.target.value })}
                    placeholder="Maximum students"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="batch-classroom">Classroom</Label>
                  <Input
                    id="batch-classroom"
                    value={newBatch.classroom}
                    onChange={(e) => setNewBatch({ ...newBatch, classroom: e.target.value })}
                    placeholder="e.g., Room A-101"
                  />
                </div>
                <div className="col-span-2">
                  <Button onClick={handleAddBatch} className="w-full">
                    Create Batch
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold font-space-grotesk">
              {courses.filter((c) => c.status === "active").length}
            </div>
            <p className="text-sm text-muted-foreground">Active Courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold font-space-grotesk">
              {batches.filter((b) => b.status === "ongoing").length}
            </div>
            <p className="text-sm text-muted-foreground">Ongoing Batches</p>
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

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="batches">Batches</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-space-grotesk">All Courses</CardTitle>
              <CardDescription>Manage your course catalog</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search courses..."
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Fees</TableHead>
                      <TableHead>Trainer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCourses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.name}</TableCell>
                        <TableCell>{course.category}</TableCell>
                        <TableCell>{course.duration}</TableCell>
                        <TableCell>₹{course.fees.toLocaleString()}</TableCell>
                        <TableCell>{course.trainer}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(course.status)} variant="secondary">
                            {course.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Course
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Users className="w-4 h-4 mr-2" />
                                View Batches
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="batches" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-space-grotesk">All Batches</CardTitle>
              <CardDescription>Manage course batches and schedules</CardDescription>
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
                      <TableHead>Trainer</TableHead>
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
                          </div>
                        </TableCell>
                        <TableCell>{batch.trainer}</TableCell>
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
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                View Students
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Batch
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <BookOpen className="w-4 h-4 mr-2" />
                                Attendance
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
