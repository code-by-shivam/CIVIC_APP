export interface Issue {
  id: string
  title: string
  description: string
  category: "garbage" | "pothole" | "waterlogging" | "streetlight"
  status: "pending" | "in-progress" | "resolved"
  location: string
  reportedAt: Date
  resolvedAt?: Date
  imageUrl?: string
  reportedBy: string
}

export const mockIssues: Issue[] = [
  {
    id: "1",
    title: "Overflowing garbage bin",
    description: "The garbage bin at the corner of MG Road and Brigade Road has been overflowing for 3 days.",
    category: "garbage",
    status: "pending",
    location: "MG Road & Brigade Road",
    reportedAt: new Date("2024-01-15"),
    reportedBy: "Rajesh Kumar",
    imageUrl: "/overflowing-garbage-bin.png",
  },
  {
    id: "2",
    title: "Large pothole on Commercial Street",
    description: "Deep pothole causing damage to vehicles. Located near house number 123.",
    category: "pothole",
    status: "in-progress",
    location: "123 Commercial Street",
    reportedAt: new Date("2024-01-12"),
    reportedBy: "Priya Sharma",
    imageUrl: "/large-street-pothole.png",
  },
  {
    id: "3",
    title: "Street light not working",
    description: "Street light has been out for over a week, making the area unsafe at night.",
    category: "streetlight",
    status: "resolved",
    location: "Koramangala near Jyoti Nivas College",
    reportedAt: new Date("2024-01-08"),
    resolvedAt: new Date("2024-01-14"),
    reportedBy: "Amit Patel",
    imageUrl: "/broken-street-light.png",
  },
  {
    id: "4",
    title: "Waterlogging after monsoon",
    description: "Water accumulates and doesn't drain properly during monsoon, causing flooding.",
    category: "waterlogging",
    status: "pending",
    location: "Residency Road & Church Street",
    reportedAt: new Date("2024-01-14"),
    reportedBy: "Sneha Reddy",
    imageUrl: "/street-flooding-waterlogging.jpg",
  },
  {
    id: "5",
    title: "Broken street light",
    description: "Light fixture is damaged and hanging dangerously.",
    category: "streetlight",
    status: "in-progress",
    location: "Indiranagar 100 Feet Road",
    reportedAt: new Date("2024-01-13"),
    reportedBy: "Vikram Singh",
    imageUrl: "/damaged-hanging-street-light.jpg",
  },
]

export const categoryIcons = {
  garbage: Trash2,
  pothole: AlertCircle,
  waterlogging: MapPin,
  streetlight: Lightbulb,
}

export const categoryColors = {
  garbage: "bg-orange-100 text-orange-800",
  pothole: "bg-red-100 text-red-800",
  waterlogging: "bg-blue-100 text-blue-800",
  streetlight: "bg-yellow-100 text-yellow-800",
}

export const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800",
}

// Chart data for admin dashboard
export const issuesByCategory = [
  { name: "Garbage", value: 35, fill: "hsl(var(--chart-1))" },
  { name: "Pothole", value: 28, fill: "hsl(var(--chart-2))" },
  { name: "Waterlogging", value: 22, fill: "hsl(var(--chart-3))" },
  { name: "Streetlight", value: 15, fill: "hsl(var(--chart-4))" },
]

export const issuesByMonth = [
  { month: "Jan", issues: 45 },
  { month: "Feb", issues: 52 },
  { month: "Mar", issues: 38 },
  { month: "Apr", issues: 61 },
  { month: "May", issues: 55 },
  { month: "Jun", issues: 48 },
]

import { Trash2, AlertCircle, MapPin, Lightbulb } from "lucide-react"
