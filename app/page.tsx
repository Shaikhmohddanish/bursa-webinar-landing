"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, Clock, Users, Calendar, MapPin, Globe, X } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import JsonLd from "@/components/json-ld"
import { registerServiceWorker } from "@/lib/register-sw"
import { PwaInstallPrompt } from "@/components/pwa-install-prompt"

export default function BursaWebinarLanding() {
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    registerServiceWorker();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName || !formData.mobile || !formData.email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // First, show a success toast
      toast({
        title: "Registration successful!",
        description: "Redirecting to payment page...",
        variant: "default",
      })
      
      // Immediately open the payment page to avoid delays
      const paymentWindow = window.open("https://rzp.io/rzp/TndqbwNI", "_blank")
      
      // Close the modal right away
      setShowModal(false)
      
      // If payment window didn't open (was blocked), redirect directly
      if (!paymentWindow || paymentWindow.closed || typeof paymentWindow.closed === 'undefined') {
        window.location.href = "https://rzp.io/rzp/TndqbwNI"
      }
      
      // Then submit the form data in the background (non-blocking)
      fetch('/api/contact-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          mobile: formData.mobile,
          email: formData.email
        }),
      }).catch(error => {
        console.error('Background form submission error:', error)
        // We don't show an error toast here since the user is already redirected
      })
    } catch (error) {
      console.error('Error in form submission process:', error)
      toast({
        title: "Something went wrong",
        description: "There was a problem with your registration. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const openRegistrationModal = () => {
    setShowModal(true)
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden w-full">
      <JsonLd />
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 text-center shadow-lg">
        <p className="text-sm font-bold animate-pulse">
          🔥 <span className="bg-yellow-400 text-black px-2 py-1 rounded-full text-xs">URGENT</span> Almost Full! Only 2
          Seats Left - Registrations End on 30th August
        </p>
      </div>

      <header className="py-6 px-4 bg-white border-b-2 border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="Bursa Trading Academy Logo"
                width={56}
                height={56}
                className="rounded-xl shadow-md"
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-xl sm:text-[1.2rem] md:text-[1.35rem] font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
                Bursa Trading Academy
              </h1>
              <p className="text-sm text-gray-600 font-medium">#1 Trading Education Platform</p>
            </div>
          </div>
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <Badge className="mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce">
            🎯 2 Hours Live Trading Masterclass
          </Badge>

          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            Turn Your Trading Around in{" "}
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent animate-pulse">
              2 Hours
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
            Master the Markets: Learn proven trading systems that work – not random signals. Join our live webinar for
            only <span className="font-black text-3xl text-red-600 bg-yellow-200 px-2 py-1 rounded-lg">RM49</span>
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 max-w-5xl mx-auto px-2">
            <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <p className="font-bold text-lg">Date</p>
              <p className="text-gray-600 font-medium">31st August</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <Clock className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <p className="font-bold text-lg">Time</p>
              <p className="text-gray-600 font-medium">11:00 AM - 1:00 PM</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <p className="font-bold text-lg">Venue</p>
              <p className="text-gray-600 font-medium">Zoom</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <Globe className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <p className="font-bold text-lg">Language</p>
              <p className="text-gray-600 font-medium">English</p>
            </div>
          </div>

          <div className="flex justify-center w-full">
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 animate-pulse max-w-full"
              onClick={openRegistrationModal}
            >
              Book My Seat for RM49 Now
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4 text-gray-900">Are You Tired Of...</h2>
          <p className="text-xl text-gray-600 mb-12">Stop these frustrating trading mistakes today!</p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-2 border-red-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0">
                <p className="text-left text-lg font-medium">❌ Chasing Telegram groups for "hot tips"</p>
              </CardContent>
            </Card>
            <Card className="p-8 border-2 border-red-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0">
                <p className="text-left text-lg font-medium">❌ Losing money on inconsistent strategies</p>
              </CardContent>
            </Card>
            <Card className="p-8 border-2 border-red-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0">
                <p className="text-left text-lg font-medium">❌ Feeling confused about market movements</p>
              </CardContent>
            </Card>
            <Card className="p-8 border-2 border-red-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0">
                <p className="text-left text-lg font-medium">❌ Depending on others for trading decisions</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What You'll Learn In the Workshop</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">50 EMA & 200 EMA Trading Strategy</h3>
                  <p className="text-muted-foreground">
                    Master the proven moving average system used by professional traders
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Top 5 Trading Mistakes to Avoid</h3>
                  <p className="text-muted-foreground">Learn from common pitfalls that destroy trading accounts</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Beginner-to-Pro System</h3>
                  <p className="text-muted-foreground">Complete roadmap from novice to profitable trader</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Risk Management & Growth</h3>
                  <p className="text-muted-foreground">How to protect your capital and grow steadily</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Trade with Confidence</h3>
                  <p className="text-muted-foreground">Build independent trading skills without relying on tips</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Live Market Analysis</h3>
                  <p className="text-muted-foreground">Real-time demonstration of trading strategies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Trainer Section */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-32 h-32 bg-accent rounded-full mx-auto mb-6 flex items-center justify-center">
            <Users className="w-16 h-16 text-accent-foreground" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Meet Your Trainer</h2>
          <h3 className="text-xl font-semibold text-primary mb-4">Founder of Bursa Trading Academy</h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            From struggling trader to profitable success story. Our founder built a systematic approach to trading and
            has now trained over <span className="font-bold text-primary">3,000+ students</span> to achieve consistent
            trading results.
          </p>
          <div className="flex justify-center items-center gap-8 text-sm opacity-75">
            <div className="text-center">
              <p className="font-bold text-2xl text-primary">3,000+</p>
              <p className="text-muted-foreground">Students Trained</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-2xl text-primary">12+ Years</p>
              <p className="text-muted-foreground">Trading Experience</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-2xl text-primary">Proven</p>
              <p className="text-muted-foreground">Track Record</p>
            </div>
          </div>
        </div>
      </section>

      {/* This Workshop Is For You Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">This Workshop Is For You If You</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-green-50 border-green-200">
              <CardContent className="p-0">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <p>Are looking for a consistent and high paying source of income.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="p-6 bg-green-50 border-green-200">
              <CardContent className="p-0">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <p>Want to have a first-mover advantage in the trading economy.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="p-6 bg-green-50 border-green-200">
              <CardContent className="p-0">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <p>Are searching for a fail-proof method to launch your trading career.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="p-6 bg-green-50 border-green-200">
              <CardContent className="p-0">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <p>Already have trading knowledge but need help to become profitable.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="p-6 bg-green-50 border-green-200">
              <CardContent className="p-0">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <p>Want to know the secrets of successful traders in the industry.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="p-6 bg-green-50 border-green-200">
              <CardContent className="p-0">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <p>Want to know how to trade profitably without any prior experience.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Card className="p-8 bg-green-50 border-green-200 max-w-2xl mx-auto">
              <CardContent className="p-0">
                <div className="flex items-start gap-3 justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-lg font-semibold">
                    Want our "Trade Smart, Not Hard" system to get your first profitable trades.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Price Section */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Special Launch Offer</h2>
          <div className="bg-background p-8 rounded-lg border mb-8">
            <p className="text-lg text-muted-foreground mb-4">Complete Trading Masterclass Worth</p>
            <p className="text-4xl font-bold text-muted-foreground line-through mb-4">RM499</p>
            <p className="text-lg text-muted-foreground mb-4">Special Today Only:</p>
            <p className="text-6xl font-bold text-primary mb-6">RM49</p>
            <p className="text-sm text-muted-foreground">One-time payment • Lifetime access to recording</p>
          </div>

          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-4 text-xl font-bold rounded-full mb-4"
            onClick={openRegistrationModal}
          >
            Reserve My Spot for RM49
          </Button>

          <p className="text-sm text-muted-foreground">💳 Secure payment • 💯 Money-back guarantee</p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-3 sm:px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Trained over 3000+ peoples with live sessions
            </h2>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 mb-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                  A
                </div>
                <div>
                  <h4 className="font-bold text-base sm:text-lg">Ahmad Rahman</h4>
                  <p className="text-xs sm:text-sm text-gray-600">5 reviews • MY</p>
                </div>
              </div>

              <div className="flex gap-1 mb-2 sm:mb-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs">★</span>
                  </div>
                ))}
              </div>

              <p className="text-sm sm:text-base text-gray-800 mb-3 sm:mb-4 leading-relaxed">
                It was great as always learning so many new trading strategies with clarity. I got the 9x value for the
                price paid. Thanks for delivering such amazing knowledge and energy with your experience. Forever
                Grateful! 🙏 🔥 ❤️ ✨
              </p>

              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                <strong>Date of experience:</strong> June 15, 2024
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <button className="flex items-center gap-1 hover:text-blue-600">👍 Useful</button>
                <button className="flex items-center gap-1 hover:text-blue-600">📤 Share</button>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                  S
                </div>
                <div>
                  <h4 className="font-bold text-base sm:text-lg">Siti Nurhaliza</h4>
                  <p className="text-xs sm:text-sm text-gray-600">1 review • MY</p>
                </div>
              </div>

              <div className="flex gap-1 mb-2 sm:mb-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs">★</span>
                  </div>
                ))}
              </div>

              <p className="text-sm sm:text-base text-gray-800 mb-3 sm:mb-4 leading-relaxed">
                Bursa Trading Academy is a genuine trading education platform with lots of knowledge and energy. I got
                9x value for the price paid. I am now going to learn their advanced trading program.
              </p>

              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                <strong>Date of experience:</strong> May 28, 2024
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <button className="flex items-center gap-1 hover:text-blue-600">👍 Useful</button>
                <button className="flex items-center gap-1 hover:text-blue-600">📤 Share</button>
              </div>
            </div>
          </div>

          {/* Additional testimonials */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 mb-8">
            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                  L
                </div>
                <div>
                  <h4 className="font-bold text-base sm:text-lg">Lee Wei Ling</h4>
                  <p className="text-xs sm:text-sm text-gray-600">3 reviews • MY</p>
                </div>
              </div>

              <div className="flex gap-1 mb-2 sm:mb-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs">★</span>
                  </div>
                ))}
              </div>

              <p className="text-sm sm:text-base text-gray-800 mb-3 sm:mb-4 leading-relaxed">
                This workshop changed my whole approach to trading! I've tried many courses before but none of them provided such clear, actionable strategies. The 50/200 EMA system alone was worth the price. Now I can confidently make my own trading decisions.
              </p>

              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                <strong>Date of experience:</strong> July 2, 2024
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <button className="flex items-center gap-1 hover:text-blue-600">👍 Useful</button>
                <button className="flex items-center gap-1 hover:text-blue-600">📤 Share</button>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                  R
                </div>
                <div>
                  <h4 className="font-bold text-base sm:text-lg">Raj Kumar</h4>
                  <p className="text-xs sm:text-sm text-gray-600">7 reviews • MY</p>
                </div>
              </div>

              <div className="flex gap-1 mb-2 sm:mb-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs">★</span>
                  </div>
                ))}
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-200 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs">★</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-gray-800 mb-3 sm:mb-4 leading-relaxed">
                Great introduction to trading strategies. I was a complete beginner and was able to understand everything. The risk management section was particularly helpful - now I know how to protect my capital while still growing my account steadily.
              </p>

              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                <strong>Date of experience:</strong> April 18, 2024
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <button className="flex items-center gap-1 hover:text-blue-600">👍 Useful</button>
                <button className="flex items-center gap-1 hover:text-blue-600">📤 Share</button>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button
              size="lg"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 mb-4 whitespace-normal"
              onClick={openRegistrationModal}
            >
              See More Inside the Workshop
            </Button>

            <p className="text-sm text-gray-600 italic">
              <span className="text-red-500 font-bold">Registrations End on 30th August</span>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">FAQ's</h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="bg-yellow-400 text-black px-6 py-4 rounded-lg hover:bg-yellow-300 text-left font-semibold text-lg">
                What If I Am Unable to Attend the Masterclass Live?
              </AccordionTrigger>
              <AccordionContent className="bg-white text-black p-6 rounded-b-lg mt-1">
                If for any reason you are not able to attend the masterclass, drop us an email at
                "coach@bursawebinar.online" up to 15 minutes before the masterclass starts & we will reserve your seat
                for the next masterclass but the reason should be genuine and please note that I can do it only once.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-none">
              <AccordionTrigger className="bg-yellow-400 text-black px-6 py-4 rounded-lg hover:bg-yellow-300 text-left font-semibold text-lg">
                How Can I Join the Masterclass?
              </AccordionTrigger>
              <AccordionContent className="bg-white text-black p-6 rounded-b-lg mt-1">
                Once you book the ticket for the masterclass, you can join the exclusive WhatsApp Group. You'll get the
                reminders and link to join the masterclass. You can also check your email for the link.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-none">
              <AccordionTrigger className="bg-yellow-400 text-black px-6 py-4 rounded-lg hover:bg-yellow-300 text-left font-semibold text-lg">
                Can I Ask Questions During the Masterclass?
              </AccordionTrigger>
              <AccordionContent className="bg-white text-black p-6 rounded-b-lg mt-1">
                Yes! You can ask your questions during the masterclass and as a bonus for booking a ticket, you will get
                a CHANCE to have a direct conversation with me at the end.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-none">
              <AccordionTrigger className="bg-yellow-400 text-black px-6 py-4 rounded-lg hover:bg-yellow-300 text-left font-semibold text-lg">
                Where Will I be Getting My Bonuses?
              </AccordionTrigger>
              <AccordionContent className="bg-white text-black p-6 rounded-b-lg mt-1">
                You'll also receive all the bonuses on the next page. Additionally, I'll send bonuses to your email
                address. You can check your email inbox. In case it is not in the inbox, you can check your spam/junk
                folder.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-none">
              <AccordionTrigger className="bg-yellow-400 text-black px-6 py-4 rounded-lg hover:bg-yellow-300 text-left font-semibold text-lg">
                What Should I Do If I Have Any Additional Queries?
              </AccordionTrigger>
              <AccordionContent className="bg-white text-black p-6 rounded-b-lg mt-1">
                Simply send an email to "coach@bursawebinar.online" and you will get the response in the next 24
                hours.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Urgency Banner and CTA */}
          <div className="mt-12 text-center">
            <div className="mb-6">
              <p className="text-red-400 text-2xl font-bold mb-2">Almost Full Only 2 Seats Left</p>
              <p className="text-white/80 italic">Registrations End on 30th August</p>
            </div>

            <Button
              size="lg"
              className="shake-button bg-yellow-400 hover:bg-yellow-300 text-black px-12 py-4 text-xl font-bold rounded-full"
              onClick={openRegistrationModal}
            >
              Join Now for RM49!
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Stop Trading Blind. Start Trading with Confidence.
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                For just RM49, you'll gain access to professional trading strategies that have helped thousands of
                Malaysian traders break the cycle of losses and dependency on signals.
              </p>

              <p className="text-lg leading-relaxed">
                This small investment could be the turning point in your trading journey – the difference between
                continued frustration and consistent results.
              </p>

              <Button
                size="lg"
                className="bg-white hover:bg-gray-100 text-purple-800 px-8 py-4 text-lg font-bold rounded-lg"
                onClick={openRegistrationModal}
              >
                Yes! I'm In For RM49
              </Button>
            </div>

            <div className="bg-teal-800 p-8 rounded-lg">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">i</span>
                </div>
                <h3 className="text-xl font-bold">Webinar Details:</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="font-semibold">Date:</span> 31st August 2025
                </div>
                <div>
                  <span className="font-semibold">Time:</span> 11:00 AM - 1:00 PM (Malaysia Time)
                </div>
                <div>
                  <span className="font-semibold">Platform:</span> Zoom (details sent after registration)
                </div>
                <div>
                  <span className="font-semibold">Investment:</span> RM49 only
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-xl font-medium">Book your seat today and trade smart, not blind.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-muted text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-muted-foreground mb-2">© 2024 Bursa Trading Academy. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Bursawebinar.online • Professional Trading Education</p>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-red-500 shadow-2xl z-50 px-2 sm:px-4 py-3 sm:py-4 w-full">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-4 pb-1">
          <div className="text-center md:text-left">
            <p className="text-red-600 font-black text-lg md:text-2xl flex flex-wrap justify-center md:justify-start items-center gap-2">
              Almost Full <span className="flash-text bg-yellow-300 px-2 py-1 rounded-lg text-black">Only 2 Seats Left</span>
            </p>
            <p className="text-sm text-gray-600 italic font-medium"> Registrations End on 30th August</p>
          </div>

          <Button
            size="lg"
            className="shake-button bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 md:px-8 md:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-base md:text-xl whitespace-nowrap"
            onClick={openRegistrationModal}
          >
            <span className="relative z-10">Join Now for RM49!</span>
          </Button>
        </div>
      </div>

      <div className="h-28 md:h-24"></div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60] p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full relative shadow-2xl border-4 border-yellow-400 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-all duration-200 z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 pt-12">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-black mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Register Now
                </h2>
                <p className="text-gray-600 font-medium text-sm">Secure your spot in just 30 seconds!</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-3 py-3 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:outline-none transition-all duration-200"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">
                    Mobile Number (10 Digits Only) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="Prefer WhatsApp Number"
                    className="w-full px-3 py-3 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:outline-none transition-all duration-200"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    pattern="[0-9]{10}"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email ID"
                    className="w-full px-3 py-3 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:outline-none transition-all duration-200"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-red-500 text-black font-black py-4 text-lg rounded-lg mt-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-yellow-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Register Now'}
                </Button>
              </form>

              <p className="text-center text-xs text-gray-600 mt-4 bg-gray-50 p-2 rounded-lg">
                <span className="italic"> Registrations End on</span>{" "}
                <span className="text-red-500 font-bold">30th August</span>
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes flash {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0.3; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
          20%, 40%, 60%, 80% { transform: translateX(3px); }
        }
        
        .flash-text {
          animation: flash 2s infinite;
        }
        
        .shake-button {
          animation: shake 1.5s infinite;
        }
        
        .bg-grid-pattern {
          background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        @media (max-width: 768px) {
          .shake-button {
            animation: shake 2s infinite;
          }
          
          /* Fix for mobile horizontal scrolling */
          img {
            max-width: 100%;
            height: auto;
          }
          
          table {
            display: block;
            width: 100%;
            overflow-x: auto;
          }
          
          /* Prevent content from overflowing */
          p, h1, h2, h3, h4, h5, h6, div, span {
            word-wrap: break-word;
            max-width: 100%;
          }
          
          /* Ensure proper spacing for fixed bottom bar */
          .fixed.bottom-0 {
            padding-bottom: env(safe-area-inset-bottom, 10px);
          }
        }
      `}</style>
      <PwaInstallPrompt />
    </div>
  )
}
