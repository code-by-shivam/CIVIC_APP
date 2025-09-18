"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeft,
  Camera,
  MapPin,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  Mic,
  MicOff,
  Play,
  Pause,
  Trash2,
  User,
} from "lucide-react"
import { mockIssues, categoryIcons, categoryColors, statusColors } from "@/lib/data"

interface CitizenAppProps {
  onBack: () => void
}

export function CitizenApp({ onBack }: CitizenAppProps) {
  const [currentPage, setCurrentPage] = useState<"home" | "report" | "track">("home")

  const renderPage = () => {
    switch (currentPage) {
      case "report":
        return <ReportIssuePage onBack={() => setCurrentPage("home")} />
      case "track":
        return <TrackIssuePage onBack={() => setCurrentPage("home")} />
      default:
        return <CitizenHomePage onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="bg-transparent">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-semibold">Smart Civic Reporting</h1>
        </div>
      </header>
      {renderPage()}
    </div>
  )
}

function CitizenHomePage({ onNavigate }: { onNavigate: (page: "report" | "track") => void }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Report & Track Issues</h2>
        <p className="text-muted-foreground text-lg">Help make your community better</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate("report")}>
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Camera className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-xl">Report New Issue</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              Quickly report civic issues in your area with photos and detailed descriptions.
            </CardDescription>
            <Button className="w-full mt-4" onClick={() => onNavigate("report")}>
              Start Reporting
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate("track")}>
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-8 w-8 text-secondary" />
            </div>
            <CardTitle className="text-xl">Track Your Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              Monitor the progress of your reported issues and see when they're resolved.
            </CardDescription>
            <Button variant="secondary" className="w-full mt-4" onClick={() => onNavigate("track")}>
              View Status
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="mt-12 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-6">Recent Community Reports</h3>
        <div className="grid gap-4">
          {mockIssues.slice(0, 3).map((issue) => {
            const IconComponent = categoryIcons[issue.category]
            return (
              <Card key={issue.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-sm">{issue.title}</h4>
                        <Badge variant="secondary" className={statusColors[issue.status]}>
                          {issue.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{issue.location}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Reported {issue.reportedAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function ReportIssuePage({ onBack }: { onBack: () => void }) {
  const [formData, setFormData] = useState({
    description: "",
    photo: null as File | null,
    voiceRecording: null as Blob | null,
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isRecording])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setFormData({ description: "", photo: null, voiceRecording: null })
      setAudioUrl(null)
      setRecordingTime(0)
    }, 3000)
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, photo: file })
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const chunks: BlobPart[] = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" })
        setFormData((prev) => ({ ...prev, voiceRecording: blob }))

        if (audioUrl) {
          URL.revokeObjectURL(audioUrl)
        }
        const newAudioUrl = URL.createObjectURL(blob)
        setAudioUrl(newAudioUrl)

        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert("Unable to access microphone. Please check your permissions.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const playRecording = () => {
    if (audioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const deleteRecording = () => {
    setFormData((prev) => ({ ...prev, voiceRecording: null }))
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
      setAudioUrl(null)
    }
    setRecordingTime(0)
    setIsPlaying(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="bg-transparent">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold">Report an Issue</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center hover:from-emerald-200 hover:to-emerald-300 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md">
              <User className="h-4 w-4 md:h-5 md:w-5 text-emerald-700" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-sm font-medium text-foreground">John Doe</span>
            <span className="text-xs text-muted-foreground">Citizen</span>
          </div>
        </div>
      </div>

      {showSuccess && (
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Issue submitted successfully! You'll receive updates on the progress.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Issue Details</CardTitle>
          <CardDescription>Provide as much detail as possible to help us resolve the issue quickly.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="photo">Photo (Optional)</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <input id="photo" type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                <Label htmlFor="photo" className="cursor-pointer">
                  <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {formData.photo ? formData.photo.name : "Click a photo"}
                  </p>
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Voice Recording (Optional)</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6">
                {!formData.voiceRecording ? (
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <Button
                        type="button"
                        variant={isRecording ? "destructive" : "outline"}
                        size="lg"
                        onClick={isRecording ? stopRecording : startRecording}
                        className="rounded-full w-16 h-16"
                      >
                        {isRecording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {isRecording ? (
                        <span className="text-red-600 font-medium">Recording... {formatTime(recordingTime)}</span>
                      ) : (
                        "Click to start voice recording"
                      )}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={playRecording}
                        className="rounded-full bg-transparent"
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <span className="text-sm font-medium">Voice recording ({formatTime(recordingTime)})</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={deleteRecording}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              {audioUrl && (
                <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} className="hidden" />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description * </Label>
              <Textarea
                id="description"
                placeholder="Describe the issue in detail..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={!formData.description}>
              Submit Report
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

function TrackIssuePage({ onBack }: { onBack: () => void }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredIssues = mockIssues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || issue.category === filterCategory
    const matchesStatus = filterStatus === "all" || issue.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="bg-transparent">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold">Track Issues</h2>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="garbage">Garbage</SelectItem>
                <SelectItem value="pothole">Pothole</SelectItem>
                <SelectItem value="waterlogging">Waterlogging</SelectItem>
                <SelectItem value="streetlight">Street Light</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredIssues.map((issue) => {
          const IconComponent = categoryIcons[issue.category]
          const StatusIcon =
            issue.status === "resolved" ? CheckCircle : issue.status === "in-progress" ? Clock : AlertCircle

          return (
            <Card key={issue.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {issue.imageUrl && (
                    <img
                      src={issue.imageUrl || "/placeholder.svg"}
                      alt={issue.title}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-semibold text-lg">{issue.title}</h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge variant="outline" className={categoryColors[issue.category]}>
                          <IconComponent className="h-3 w-3 mr-1" />
                          {issue.category}
                        </Badge>
                        <Badge variant="secondary" className={statusColors[issue.status]}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {issue.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-3">{issue.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {issue.location}
                      </div>
                      <div>Reported: {issue.reportedAt.toLocaleDateString()}</div>
                      {issue.resolvedAt && <div>Resolved: {issue.resolvedAt.toLocaleDateString()}</div>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredIssues.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No issues found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
