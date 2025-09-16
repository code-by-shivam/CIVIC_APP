"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  MapPin,
  Clock,
  CheckCircle,
  Camera,
  FileText,
  Menu,
  X,
  Phone,
  Mail,
  LocateOffIcon as LocationIcon,
  Facebook,
  Twitter,
  Instagram,
  Shield,
  Users,
  Award,
  TrendingUp,
  MessageSquare,
  Bell,
  Search,
  Star,
  ArrowRight,
  PlayCircle,
  Download,
  Globe,
  Smartphone,
  Zap,
} from "lucide-react"
import { CitizenApp } from "@/components/citizen-app"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function HomePage() {
  const [userType, setUserType] = useState<"citizen" | "admin" | null>(null)
  const [currentPage, setCurrentPage] = useState<"home" | "about" | "contact" | "faq" | "services">("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  if (userType === "citizen") {
    return <CitizenApp onBack={() => setUserType(null)} />
  }

  if (userType === "admin") {
    return <AdminDashboard onBack={() => setUserType(null)} />
  }

  const renderPage = () => {
    switch (currentPage) {
      case "about":
        return <AboutPage />
      case "contact":
        return <ContactPage />
      case "faq":
        return <FAQPage />
      case "services":
        return <ServicesPage />
      default:
        return <HomePage />
    }
  }

  const AboutPage = () => (
    <div className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">About CivicReport</h1>

        <div className="prose prose-lg mx-auto mb-12">
          <p className="text-xl text-muted-foreground text-center mb-8">
            We're dedicated to bridging the gap between citizens and local government through innovative technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-6">
              To empower communities by providing a seamless platform for reporting civic issues and tracking their
              resolution. We believe that every citizen deserves a voice in improving their neighborhood.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-primary" />
                <span>Secure and private reporting</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-primary" />
                <span>Community-driven solutions</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="h-5 w-5 text-primary" />
                <span>Transparent governance</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Our Impact</h2>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">50+</div>
                  <div className="text-sm text-muted-foreground">Cities Served</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">10K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">25K+</div>
                  <div className="text-sm text-muted-foreground">Issues Resolved</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">4.8★</div>
                  <div className="text-sm text-muted-foreground">User Rating</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const ContactPage = () => (
    <div className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Phone Support</h3>
                  <p className="text-muted-foreground">+91 98765 43210</p>
                  <p className="text-sm text-muted-foreground">Mon-Fri, 9AM-6PM IST</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Email Support</h3>
                  <p className="text-muted-foreground">support@civicreport.com</p>
                  <p className="text-sm text-muted-foreground">Response within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <LocationIcon className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Office Address</h3>
                  <p className="text-muted-foreground">
                    456 Civil Lines Road
                    <br />
                    Kanpur, Uttar Pradesh 208001
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>We'd love to hear from you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">First Name</label>
                  <input className="w-full p-2 border rounded-lg" placeholder="Rahul" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Last Name</label>
                  <input className="w-full p-2 border rounded-lg" placeholder="Gupta" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <input className="w-full p-2 border rounded-lg" placeholder="rahul@example.com" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <input className="w-full p-2 border rounded-lg" placeholder="How can we help?" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <textarea className="w-full p-2 border rounded-lg h-24" placeholder="Your message here..." />
              </div>
              <Button className="w-full">Send Message</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const FAQPage = () => (
    <div className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>

        <div className="space-y-6">
          {[
            {
              q: "How do I report an issue?",
              a: "Simply click the 'Report an Issue' button, describe the problem, and optionally add photos. Your report will be automatically routed to the appropriate department.",
            },
            {
              q: "How long does it take to resolve issues?",
              a: "Resolution times vary by issue type and complexity. On average, most issues are resolved within 3-5 business days. You'll receive updates throughout the process.",
            },
            {
              q: "Can I track the status of my report?",
              a: "Yes! You can track your reports in real-time through our tracking system. You'll receive notifications when status changes occur.",
            },
            {
              q: "Is my personal information secure?",
              a: "Absolutely. We use industry-standard encryption and security measures to protect your data. Your personal information is never shared without your consent.",
            },
            {
              q: "Can I report issues anonymously?",
              a: "Yes, you can choose to report issues anonymously. However, providing contact information helps us follow up if we need additional details.",
            },
            {
              q: "What types of issues can I report?",
              a: "You can report various civic issues including potholes, broken streetlights, graffiti, water leaks, noise complaints, and more.",
            },
          ].map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.q}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const ServicesPage = () => (
    <div className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Services</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Camera,
              title: "Issue Reporting",
              description: "Quick and easy reporting with photo uploads and detailed descriptions.",
            },
            {
              icon: Bell,
              title: "Real-time Notifications",
              description: "Stay updated with instant notifications about your reported issues.",
            },
            {
              icon: Search,
              title: "Issue Tracking",
              description: "Track the progress of your reports from submission to resolution.",
            },
            {
              icon: TrendingUp,
              title: "Analytics Dashboard",
              description: "Comprehensive analytics for administrators to monitor performance.",
            },
            {
              icon: MessageSquare,
              title: "Community Feedback",
              description: "Engage with your community and provide feedback on resolved issues.",
            },
            {
              icon: Globe,
              title: "Multi-platform Access",
              description: "Access our platform from web, mobile, or tablet devices.",
            },
          ].map((service, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  if (currentPage !== "home") {
    return (
      <div className="min-h-screen bg-background">
        <nav className="border-b bg-card/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div
                className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setCurrentPage("home")}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                  <MapPin className="h-6 w-6 text-white drop-shadow-sm" />
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent hidden sm:block">
                  CivicReport
                </span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <button
                  onClick={() => setCurrentPage("home")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => setCurrentPage("services")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Services
                </button>
                <button
                  onClick={() => setCurrentPage("about")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => setCurrentPage("faq")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQ
                </button>
                <button
                  onClick={() => setCurrentPage("contact")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </button>
              </div>

              {/* Desktop Action Buttons */}
              <div className="hidden md:flex items-center space-x-4">
                <Button variant="outline" onClick={() => setUserType("admin")}>
                  Admin Login
                </Button>
                <Button onClick={() => setUserType("citizen")}>Report Issue</Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden border-t bg-card/95 backdrop-blur-sm">
                <div className="px-4 py-4 space-y-4">
                  <button
                    onClick={() => {
                      setCurrentPage("home")
                      setMobileMenuOpen(false)
                    }}
                    className="block text-muted-foreground hover:text-primary transition-colors"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage("services")
                      setMobileMenuOpen(false)
                    }}
                    className="block text-muted-foreground hover:text-primary transition-colors"
                  >
                    Services
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage("about")
                      setMobileMenuOpen(false)
                    }}
                    className="block text-muted-foreground hover:text-primary transition-colors"
                  >
                    About
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage("faq")
                      setMobileMenuOpen(false)
                    }}
                    className="block text-muted-foreground hover:text-primary transition-colors"
                  >
                    FAQ
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage("contact")
                      setMobileMenuOpen(false)
                    }}
                    className="block text-muted-foreground hover:text-primary transition-colors"
                  >
                    Contact
                  </button>
                  <div className="pt-4 border-t space-y-2">
                    <Button variant="outline" className="w-full bg-transparent" onClick={() => setUserType("admin")}>
                      Admin Login
                    </Button>
                    <Button className="w-full text-white" onClick={() => setUserType("citizen")}>
                      Report Issue
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {renderPage()}

        <footer className="bg-card border-t">{/* ... existing footer code ... */}</footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-card/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <MapPin className="h-6 w-6 text-white drop-shadow-sm" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent hidden sm:block">
                CivicReport
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setCurrentPage("home")}
                className="text-foreground hover:text-primary transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => setCurrentPage("services")}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => setCurrentPage("about")}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                About Us
              </button>
              <button
                onClick={() => setCurrentPage("faq")}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                FAQ
              </button>
              <button
                onClick={() => setCurrentPage("contact")}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </button>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" onClick={() => setUserType("admin")}>
                Admin Login
              </Button>
              <Button onClick={() => setUserType("citizen")}>Report Issue</Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t bg-card/95 backdrop-blur-sm">
              <div className="px-4 py-4 space-y-4">
                <button
                  onClick={() => {
                    setCurrentPage("home")
                    setMobileMenuOpen(false)
                  }}
                  className="block text-foreground hover:text-primary transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    setCurrentPage("services")
                    setMobileMenuOpen(false)
                  }}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  Services
                </button>
                <button
                  onClick={() => {
                    setCurrentPage("about")
                    setMobileMenuOpen(false)
                  }}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </button>
                <button
                  onClick={() => {
                    setCurrentPage("faq")
                    setMobileMenuOpen(false)
                  }}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQ
                </button>
                <button
                  onClick={() => {
                    setCurrentPage("contact")
                    setMobileMenuOpen(false)
                  }}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </button>
                <div className="pt-4 border-t space-y-2">
                  <Button variant="outline" className="w-full bg-transparent" onClick={() => setUserType("admin")}>
                    Admin Login
                  </Button>
                  <Button className="w-full text-white" onClick={() => setUserType("citizen")}>
                    Report Issue
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <header className="border-b bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center text-foreground">Smart Civic Issue Reporting</h1>
          <p className="text-center text-muted-foreground mt-2 text-lg">
            Making our community better, one report at a time
          </p>
        </div>
      </header>

      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20" id="home">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Report Issues, Track Progress, Build Better Communities
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto">
              Our platform connects citizens with local authorities to efficiently report and resolve civic issues in
              your neighborhood. Join thousands of citizens making a difference.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-emerald-600 hover:bg-emerald-700 text-white border-0"
                onClick={() => setUserType("citizen")}
              >
                <Camera className="mr-2 h-5 w-5" />
                Report an Issue
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 bg-transparent border-2"
                onClick={() => setUserType("admin")}
              >
                <FileText className="mr-2 h-5 w-5" />
                Admin Dashboard
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <PlayCircle className="h-5 w-5" />
                <span>Watch Demo Video</span>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="h-10">
                  <Smartphone className="mr-2 h-4 w-4" />
                  Download App
                </Button>
                <Button variant="ghost" size="sm" className="h-10">
                  <Download className="mr-2 h-4 w-4" />
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/30" id="features">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Why Choose Our Platform?</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the features that make civic engagement easier and more effective than ever before.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Zap,
                title: "Lightning Fast Reporting",
                description:
                  "Report issues in under 30 seconds with our streamlined interface. Voice recording, photo uploads, and smart categorization make it effortless.",
              },
              {
                icon: Bell,
                title: "Real-time Updates",
                description:
                  "Get instant notifications when your reports are received, assigned, in progress, or completed. Never wonder about the status again.",
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description:
                  "Your data is protected with enterprise-grade security. Report anonymously or with full transparency - your choice.",
              },
              {
                icon: TrendingUp,
                title: "Community Impact",
                description:
                  "See how your reports contribute to community improvement with detailed analytics and progress tracking.",
              },
              {
                icon: Users,
                title: "Collaborative Platform",
                description:
                  "Connect with neighbors, support each other's reports, and work together to improve your community.",
              },
              {
                icon: Award,
                title: "Proven Results",
                description:
                  "Join thousands of satisfied users who have successfully resolved over 25,000 civic issues through our platform.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm"
              >
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-8 w-8 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <h4 className="text-2xl font-bold mb-8">What Our Users Say</h4>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Priya Sharma",
                  role: "Community Leader",
                  content:
                    "This platform has transformed how we handle civic issues in our locality. Response times have improved dramatically!",
                  rating: 5,
                },
                {
                  name: "Arjun Mehta",
                  role: "Local Resident",
                  content:
                    "I love how easy it is to report problems and track their progress. The voice recording feature is a game-changer.",
                  rating: 5,
                },
                {
                  name: "Kavya Nair",
                  role: "Municipal Corporator",
                  content:
                    "The admin dashboard gives us incredible insights into community needs. It's made our job so much more effective.",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <Card key={index} className="p-6 bg-card/70 backdrop-blur-sm">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-emerald-500/5 to-teal-500/5">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Our Impact in Numbers</h3>
            <p className="text-muted-foreground">Real results from real communities</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "1,247", label: "Issues Reported", icon: FileText },
              { number: "892", label: "Issues Resolved", icon: CheckCircle },
              { number: "72%", label: "Resolution Rate", icon: TrendingUp },
              { number: "3.2", label: "Avg. Days to Resolve", icon: Clock },
            ].map((stat, index) => (
              <Card key={index} className="p-6 bg-card/70 backdrop-blur-sm border-0 hover:shadow-lg transition-shadow">
                <div className="mx-auto w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
                  <stat.icon className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">{stat.number}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h3>
          <p className="text-xl mb-8 text-emerald-100 max-w-2xl mx-auto">
            Join thousands of citizens who are already using CivicReport to improve their communities. Start reporting
            issues and tracking progress today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 bg-white text-emerald-600 hover:bg-emerald-50"
              onClick={() => setUserType("citizen")}
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-white text-white hover:bg-white/10 bg-transparent"
              onClick={() => setCurrentPage("contact")}
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* ... existing footer code ... */}
      <footer className="bg-card border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <MapPin className="h-6 w-6 text-white drop-shadow-sm" />
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  CivicReport
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                Connecting citizens with local authorities to build better communities through efficient issue reporting
                and resolution.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Quick Links</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setCurrentPage("home")}
                  className="block text-muted-foreground hover:text-primary transition-colors text-sm text-left"
                >
                  Home
                </button>
                <button
                  onClick={() => setCurrentPage("services")}
                  className="block text-muted-foreground hover:text-primary transition-colors text-sm text-left"
                >
                  Services
                </button>
                <button
                  onClick={() => setCurrentPage("about")}
                  className="block text-muted-foreground hover:text-primary transition-colors text-sm text-left"
                >
                  About Us
                </button>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                  Terms of Service
                </a>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Services</h3>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                  Issue Reporting
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                  Status Tracking
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                  Admin Dashboard
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                  Analytics
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                  API Access
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">support@civicreport.com</span>
                </div>
                <div className="flex items-start space-x-3">
                  <LocationIcon className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span className="text-muted-foreground text-sm">
                    456 Civil Lines Road
                    <br />
                    Kanpur, Uttar Pradesh 208001
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">© 2024 CivicReport. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
