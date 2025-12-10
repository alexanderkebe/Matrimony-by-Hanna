"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, User, Church, ChevronRight, Check, Phone, Play, ChevronDown, CreditCard, Shield, Wallet, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { CountryFlag } from "@/components/ui/country-flag"

type Step = "personal" | "couple" | "payment"

const countryCodes = [
  { code: "+251", country: "Ethiopia", iso: "ET" },
  { code: "+1", country: "USA", iso: "US" },
  { code: "+1", country: "Canada", iso: "CA" },
  { code: "+44", country: "UK", iso: "GB" },
  { code: "+49", country: "Germany", iso: "DE" },
  { code: "+33", country: "France", iso: "FR" },
  { code: "+39", country: "Italy", iso: "IT" },
  { code: "+31", country: "Netherlands", iso: "NL" },
  { code: "+46", country: "Sweden", iso: "SE" },
  { code: "+47", country: "Norway", iso: "NO" },
  { code: "+971", country: "UAE", iso: "AE" },
  { code: "+966", country: "Saudi Arabia", iso: "SA" },
  { code: "+254", country: "Kenya", iso: "KE" },
  { code: "+234", country: "Nigeria", iso: "NG" },
  { code: "+27", country: "South Africa", iso: "ZA" },
  { code: "+20", country: "Egypt", iso: "EG" },
  { code: "+91", country: "India", iso: "IN" },
  { code: "+86", country: "China", iso: "CN" },
  { code: "+81", country: "Japan", iso: "JP" },
  { code: "+82", country: "South Korea", iso: "KR" },
  { code: "+61", country: "Australia", iso: "AU" },
  { code: "+64", country: "New Zealand", iso: "NZ" },
  { code: "+55", country: "Brazil", iso: "BR" },
  { code: "+52", country: "Mexico", iso: "MX" },
]

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>("personal")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0])
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"card" | "chapa" | "prepaid">("card")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    churchAffiliation: "",
    partnerEmail: "",
    relationshipStage: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    prepaidReference: "",
  })

  const handlePersonalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("couple")
  }

  const handleCoupleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("payment")
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (paymentMethod === "prepaid") {
      // Validate reference number
      if (!formData.prepaidReference.trim()) {
        alert("Please enter your payment reference number")
        setIsLoading(false)
        return
      }
      
      // Save payment info and redirect to pending approval page
      // TODO: Save to backend with user info and reference number
      const paymentData = {
        email: formData.email,
        name: formData.name,
        referenceNumber: formData.prepaidReference,
        paymentMethod: "prepaid",
        status: "pending",
      }
      
      // Store in localStorage temporarily (replace with API call)
      localStorage.setItem("pendingPayment", JSON.stringify(paymentData))
      
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push(`/register/pending-approval?ref=${encodeURIComponent(formData.prepaidReference)}`)
      return
    }

    if (paymentMethod === "chapa") {
      // Initialize Chapa payment
      try {
        const response = await fetch("/api/payments/chapa/initialize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: 29,
            currency: "ETB",
            email: formData.email,
            first_name: formData.name.split(" ")[0],
            last_name: formData.name.split(" ").slice(1).join(" ") || "",
            phone_number: `${selectedCountry.code}${formData.phone}`,
            tx_ref: `matrimony-${Date.now()}`,
            callback_url: `${window.location.origin}/register/payment-callback`,
            return_url: `${window.location.origin}/register/payment-success`,
          }),
        })

        const data = await response.json()
        if (data.status === "success" && data.data.checkout_url) {
          window.location.href = data.data.checkout_url
        } else {
          alert("Payment initialization failed. Please try again.")
          setIsLoading(false)
        }
      } catch (error) {
        console.error("Chapa payment error:", error)
        alert("Payment initialization failed. Please try again.")
        setIsLoading(false)
      }
      return
    }

    // Card payment (existing flow)
    // TODO: Process card payment with payment gateway
    await new Promise((resolve) => setTimeout(resolve, 2000))
    router.push("/dashboard")
  }

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const relationshipStages = [
    { id: "engaged", label: "Engaged", icon: "💍" },
    { id: "newly-married", label: "Newly Married", icon: "💒" },
    { id: "married-years", label: "Married (Years)", icon: "❤️" },
  ]

  return (
    <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
      {/* Progress Indicator */}
      <div className="flex items-center gap-2 mb-8 animate-fade-in">
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all",
            step === "personal" ? "bg-primary text-primary-foreground" : "bg-primary/20 text-primary",
          )}
        >
          {(step === "couple" || step === "payment") ? <Check className="w-4 h-4" /> : <span>1</span>}
          <span className="font-medium">Personal</span>
        </div>
        <div className="h-px flex-1 bg-border" />
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all",
            step === "couple" ? "bg-primary text-primary-foreground" : step === "payment" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground",
          )}
        >
          {step === "payment" ? <Check className="w-4 h-4" /> : <span>2</span>}
          <span className="font-medium">Couple</span>
        </div>
        <div className="h-px flex-1 bg-border" />
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all",
            step === "payment" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
          )}
        >
          <span>3</span>
          <span className="font-medium">Payment</span>
        </div>
      </div>

      {step === "personal" ? (
        <>
          <div className="mb-6 animate-fade-in rounded-2xl overflow-hidden shadow-lg">
            <div className="relative aspect-video bg-muted">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster="/images/intro-video-thumbnail.png"
                playsInline
                onEnded={() => setIsPlaying(false)}
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                controls={isPlaying}
              >
                <source src="/videos/intro.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {!isPlaying && (
                <button
                  onClick={handlePlayVideo}
                  className="absolute inset-0 flex items-center justify-center group"
                  aria-label="Play introduction video"
                >
                  <div className="w-20 h-20 rounded-full bg-white/30 backdrop-blur-sm border-2 border-white/50 group-hover:bg-white/40 group-hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-xl">
                    <Play className="w-10 h-10 text-white fill-white ml-1 drop-shadow-lg" />
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8 animate-fade-in-up">
            <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">Create Your Account</h1>
            <p className="text-muted-foreground">Begin your faith journey together</p>
          </div>

          {/* Personal Info Form */}
          <form onSubmit={handlePersonalSubmit} className="space-y-5 animate-fade-in-up delay-100">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-12 h-14 rounded-2xl glass border-border/50"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-12 h-14 rounded-2xl glass border-border/50"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative flex gap-2">
                {/* Country Code Selector */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    className="h-14 px-3 rounded-2xl glass border-border/50 flex items-center gap-2 hover:bg-muted/50 transition-colors min-w-[100px]"
                  >
                    <CountryFlag iso={selectedCountry.iso} />
                    <span className="text-sm font-medium">{selectedCountry.code}</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </button>

                  {/* Dropdown */}
                  {showCountryDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-64 max-h-60 overflow-y-auto rounded-2xl glass border border-border/50 shadow-xl z-50 bg-background/95 backdrop-blur-md">
                      {countryCodes.map((country, index) => (
                        <button
                          key={`${country.code}-${country.country}-${index}`}
                          type="button"
                          onClick={() => {
                            setSelectedCountry(country)
                            setShowCountryDropdown(false)
                          }}
                          className={cn(
                            "w-full px-4 py-3 flex items-center gap-3 hover:bg-primary/10 transition-colors text-left",
                            selectedCountry.country === country.country && "bg-primary/10",
                          )}
                        >
                          <CountryFlag iso={country.iso} />
                          <span className="flex-1 text-sm">{country.country}</span>
                          <span className="text-sm text-muted-foreground">{country.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Phone Input */}
                <div className="relative flex-1">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9XX XXX XXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-12 h-14 rounded-2xl glass border-border/50"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-12 pr-12 h-14 rounded-2xl glass border-border/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="church">Church Affiliation (Optional)</Label>
              <div className="relative">
                <Church className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="church"
                  type="text"
                  placeholder="Your church name"
                  value={formData.churchAffiliation}
                  onChange={(e) => setFormData({ ...formData, churchAffiliation: e.target.value })}
                  className="pl-12 h-14 rounded-2xl glass border-border/50"
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-14 rounded-2xl text-base font-medium shadow-lg mt-6">
              Continue
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </form>
        </>
      ) : step === "couple" ? (
        <>
          {/* Couple Setup Heading */}
          <div className="text-center mb-8 animate-fade-in-up">
            <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">Couple Profile</h1>
            <p className="text-muted-foreground">Connect with your partner</p>
          </div>

          {/* Couple Setup Form */}
          <form onSubmit={handleCoupleSubmit} className="space-y-6 animate-fade-in-up delay-100">
            <div className="space-y-2">
              <Label htmlFor="partnerEmail">Partner&apos;s Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="partnerEmail"
                  type="email"
                  placeholder="partner@email.com"
                  value={formData.partnerEmail}
                  onChange={(e) => setFormData({ ...formData, partnerEmail: e.target.value })}
                  className="pl-12 h-14 rounded-2xl glass border-border/50"
                  required
                />
              </div>
              <p className="text-sm text-muted-foreground">We&apos;ll send them an invitation to join you.</p>
            </div>

            <div className="space-y-3">
              <Label>Relationship Stage</Label>
              <div className="grid gap-3">
                {relationshipStages.map((stage) => (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, relationshipStage: stage.id })}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 text-left",
                      formData.relationshipStage === stage.id
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "glass hover:bg-primary/10",
                    )}
                  >
                    <span className="text-2xl">{stage.icon}</span>
                    <span className="font-medium">{stage.label}</span>
                    {formData.relationshipStage === stage.id && <Check className="w-5 h-5 ml-auto" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep("personal")}
                className="flex-1 h-14 rounded-2xl"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 h-14 rounded-2xl shadow-lg"
                disabled={!formData.relationshipStage}
              >
                Continue
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </form>
        </>
      ) : (
        <>
          {/* Payment Step Heading */}
          <div className="text-center mb-8 animate-fade-in-up">
            <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">Complete Your Subscription</h1>
            <p className="text-muted-foreground">Secure payment to unlock all features</p>
          </div>

          {/* Pricing Card */}
          <div className="glass rounded-2xl p-6 mb-6 animate-fade-in-up delay-100">
            <div className="text-center">
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-4xl font-bold text-foreground">$29</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Full access to all courses and features</p>
              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-foreground">Unlimited course access</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-foreground">Couple activities & exercises</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-foreground">Community access</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-foreground">Priority support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-4 mb-6 animate-fade-in-up delay-200">
            <Label>Payment Method</Label>
            <div className="grid gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 text-left",
                  paymentMethod === "card"
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "glass hover:bg-primary/10",
                )}
              >
                <CreditCard className="w-6 h-6" />
                <div className="flex-1">
                  <p className="font-medium">Credit/Debit Card</p>
                  <p className="text-xs opacity-80">International cards accepted</p>
                </div>
                {paymentMethod === "card" && <Check className="w-5 h-5" />}
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("chapa")}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 text-left",
                  paymentMethod === "chapa"
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "glass hover:bg-primary/10",
                )}
              >
                <Wallet className="w-6 h-6" />
                <div className="flex-1">
                  <p className="font-medium">Chapa Payment</p>
                  <p className="text-xs opacity-80">Mobile money, bank transfer & local cards</p>
                </div>
                {paymentMethod === "chapa" && <Check className="w-5 h-5" />}
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("prepaid")}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 text-left",
                  paymentMethod === "prepaid"
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "glass hover:bg-primary/10",
                )}
              >
                <Clock className="w-6 h-6" />
                <div className="flex-1">
                  <p className="font-medium">Already Paid (Manual Payment)</p>
                  <p className="text-xs opacity-80">Waiting for admin approval</p>
                </div>
                {paymentMethod === "prepaid" && <Check className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handlePaymentSubmit} className="space-y-5 animate-fade-in-up delay-300">
            {paymentMethod === "prepaid" ? (
              <div className="space-y-4">
                <div className="glass rounded-2xl p-5 bg-primary/5 border border-primary/20">
                  <p className="text-sm text-foreground mb-2">
                    If you have already made payment through other means (bank transfer, cash, etc.), please provide your payment reference number below.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Our team will verify your payment and activate your account within 24-48 hours. You will receive an email notification once your account is approved.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prepaidReference">Payment Reference Number</Label>
                  <Input
                    id="prepaidReference"
                    type="text"
                    placeholder="Enter transaction ID or reference number"
                    value={formData.prepaidReference}
                    onChange={(e) => setFormData({ ...formData, prepaidReference: e.target.value })}
                    className="h-14 rounded-2xl glass border-border/50"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Please enter the reference number from your bank transfer, receipt, or payment confirmation.
                  </p>
                </div>
              </div>
            ) : paymentMethod === "chapa" ? (
              <div className="glass rounded-2xl p-5 bg-primary/5 border border-primary/20">
                <p className="text-sm text-foreground mb-2">
                  You will be redirected to Chapa's secure payment page to complete your payment.
                </p>
                <p className="text-xs text-muted-foreground">
                  Chapa supports mobile money (Telebirr, M-Pesa, CBE Birr), bank transfers, and local cards.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="cardName"
                      type="text"
                      placeholder="John Doe"
                      value={formData.cardName}
                      onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                      className="pl-12 h-14 rounded-2xl glass border-border/50"
                      required={paymentMethod === "card"}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim()
                        setFormData({ ...formData, cardNumber: value })
                      }}
                      maxLength={19}
                      className="pl-12 h-14 rounded-2xl glass border-border/50"
                      required={paymentMethod === "card"}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      type="text"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, "")
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + "/" + value.slice(2, 4)
                        }
                        setFormData({ ...formData, expiryDate: value })
                      }}
                      maxLength={5}
                      className="h-14 rounded-2xl glass border-border/50"
                      required={paymentMethod === "card"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      type="text"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 3)
                        setFormData({ ...formData, cvv: value })
                      }}
                      maxLength={3}
                      className="h-14 rounded-2xl glass border-border/50"
                      required={paymentMethod === "card"}
                    />
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center pt-2">
                  <Shield className="w-4 h-4" />
                  <span>Your payment is secure and encrypted</span>
                </div>
              </>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep("couple")}
                className="flex-1 h-14 rounded-2xl"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 h-14 rounded-2xl shadow-lg"
                disabled={
                  isLoading ||
                  (paymentMethod === "card" &&
                    (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardName)) ||
                  (paymentMethod === "prepaid" && !formData.prepaidReference.trim())
                }
              >
                {isLoading
                  ? "Processing..."
                  : paymentMethod === "prepaid"
                    ? "Submit for Approval"
                    : paymentMethod === "chapa"
                      ? "Continue to Chapa"
                      : "Complete Payment"}
              </Button>
            </div>
          </form>
        </>
      )}

      {/* Login Link */}
      <p className="text-center mt-8 text-muted-foreground animate-fade-in-up delay-200">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-medium hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  )
}
