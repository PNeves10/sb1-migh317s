"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import {
  Brain,
  TrendingUp,
  DollarSign,
  Globe,
  Users,
  Calendar,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  BarChart3,
  Zap,
  Target,
  Star,
  Download,
  Share2,
  RefreshCw,
  Eye,
  Heart,
  MessageSquare,
  Shield,
  Rocket,
  Award,
  TrendingDown,
  Info,
  Calculator,
  FileText,
  PieChart,
  LineChart,
  Activity,
  Gauge,
  Sparkles,
  Clock,
  MapPin,
  Building,
  Code,
  Smartphone,
  ShoppingCart,
  Briefcase,
  Database,
  Cloud,
  Lock,
  Wifi,
  CreditCard,
  Mail,
  Phone,
  ExternalLink,
  Copy,
  BookOpen,
  HelpCircle,
  Settings,
  Filter,
  Search,
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  X,
  Check,
  AlertTriangle
} from "lucide-react"

interface ValuationData {
  businessName: string
  industry: string
  revenue: number
  growth: number
  employees: number
  location: string
  businessModel: string
  stage: string
  assets: number
  liabilities: number
  cashFlow: number
  marketSize: number
  competition: number
  uniqueValue: string
  risks: string
  opportunities: string
}

interface ValuationResult {
  estimatedValue: number
  confidence: number
  method: string
  breakdown: {
    assetBased: number
    marketBased: number
    incomeBased: number
  }
  factors: {
    positive: string[]
    negative: string[]
  }
  recommendations: string[]
}

export default function ValuationPage() {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [valuationData, setValuationData] = useState<ValuationData>({
    businessName: "",
    industry: "",
    revenue: 0,
    growth: 0,
    employees: 0,
    location: "",
    businessModel: "",
    stage: "",
    assets: 0,
    liabilities: 0,
    cashFlow: 0,
    marketSize: 0,
    competition: 5,
    uniqueValue: "",
    risks: "",
    opportunities: ""
  })

  const [valuationResult, setValuationResult] = useState<ValuationResult | null>(null)

  const totalSteps = 4

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Retail",
    "Manufacturing",
    "Real Estate",
    "Education",
    "Food & Beverage",
    "Transportation",
    "Energy",
    "Media & Entertainment",
    "Professional Services",
    "Other"
  ]

  const businessModels = [
    "B2B SaaS",
    "B2C E-commerce",
    "Marketplace",
    "Subscription",
    "Freemium",
    "Advertising",
    "Transaction-based",
    "Licensing",
    "Consulting",
    "Product Sales",
    "Other"
  ]

  const stages = [
    "Idea Stage",
    "MVP/Prototype",
    "Early Revenue",
    "Growth Stage",
    "Mature/Established",
    "Expansion",
    "Exit Preparation"
  ]

  const calculateValuation = async () => {
    setIsCalculating(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Complex valuation calculation
    const revenueMultiplier = getIndustryMultiplier(valuationData.industry)
    const growthFactor = Math.max(1, valuationData.growth / 100 + 1)
    const stageFactor = getStageFactor(valuationData.stage)
    const competitionFactor = (11 - valuationData.competition) / 10

    // Asset-based valuation
    const assetBased = Math.max(0, valuationData.assets - valuationData.liabilities)

    // Market-based valuation
    const marketBased = valuationData.revenue * revenueMultiplier * growthFactor * stageFactor

    // Income-based valuation (DCF approximation)
    const incomeBased = valuationData.cashFlow * 10 * competitionFactor

    // Weighted average
    const estimatedValue = (assetBased * 0.2 + marketBased * 0.5 + incomeBased * 0.3)

    // Confidence calculation
    const dataCompleteness = calculateDataCompleteness()
    const confidence = Math.min(95, Math.max(30, dataCompleteness * 0.8 + 20))

    const result: ValuationResult = {
      estimatedValue,
      confidence,
      method: "Hybrid Approach (Asset + Market + Income)",
      breakdown: {
        assetBased,
        marketBased,
        incomeBased
      },
      factors: {
        positive: getPositiveFactors(),
        negative: getNegativeFactors()
      },
      recommendations: getRecommendations()
    }

    setValuationResult(result)
    setIsCalculating(false)
    setShowResults(true)

    toast({
      title: "Valuation Complete",
      description: "Your business valuation has been calculated successfully.",
    })
  }

  const getIndustryMultiplier = (industry: string): number => {
    const multipliers: { [key: string]: number } = {
      "Technology": 8,
      "Healthcare": 6,
      "Finance": 4,
      "Retail": 2,
      "Manufacturing": 3,
      "Real Estate": 5,
      "Education": 4,
      "Food & Beverage": 2.5,
      "Transportation": 3,
      "Energy": 4,
      "Media & Entertainment": 5,
      "Professional Services": 3.5,
      "Other": 3
    }
    return multipliers[industry] || 3
  }

  const getStageFactor = (stage: string): number => {
    const factors: { [key: string]: number } = {
      "Idea Stage": 0.5,
      "MVP/Prototype": 0.7,
      "Early Revenue": 0.9,
      "Growth Stage": 1.2,
      "Mature/Established": 1.0,
      "Expansion": 1.1,
      "Exit Preparation": 0.95
    }
    return factors[stage] || 1
  }

  const calculateDataCompleteness = (): number => {
    const fields = Object.values(valuationData)
    const completedFields = fields.filter(field => 
      field !== "" && field !== 0 && field !== null && field !== undefined
    ).length
    return (completedFields / fields.length) * 100
  }

  const getPositiveFactors = (): string[] => {
    const factors = []
    if (valuationData.growth > 20) factors.push("High growth rate")
    if (valuationData.revenue > 1000000) factors.push("Strong revenue base")
    if (valuationData.employees > 50) factors.push("Established team")
    if (valuationData.cashFlow > 0) factors.push("Positive cash flow")
    if (valuationData.competition < 5) factors.push("Low competition")
    if (valuationData.uniqueValue.length > 50) factors.push("Clear value proposition")
    return factors
  }

  const getNegativeFactors = (): string[] => {
    const factors = []
    if (valuationData.growth < 5) factors.push("Low growth rate")
    if (valuationData.revenue < 100000) factors.push("Limited revenue")
    if (valuationData.cashFlow < 0) factors.push("Negative cash flow")
    if (valuationData.competition > 7) factors.push("High competition")
    if (valuationData.liabilities > valuationData.assets) factors.push("High debt burden")
    return factors
  }

  const getRecommendations = (): string[] => {
    const recommendations = []
    if (valuationData.growth < 10) {
      recommendations.push("Focus on accelerating growth through marketing and product development")
    }
    if (valuationData.cashFlow < 0) {
      recommendations.push("Improve cash flow management and reduce operational costs")
    }
    if (valuationData.competition > 7) {
      recommendations.push("Strengthen competitive positioning and unique value proposition")
    }
    if (valuationData.employees < 10) {
      recommendations.push("Consider strategic hiring to support growth")
    }
    recommendations.push("Regular financial audits to maintain accurate valuation")
    recommendations.push("Document all intellectual property and key business processes")
    return recommendations
  }

  const handleInputChange = (field: keyof ValuationData, value: any) => {
    setValuationData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const resetValuation = () => {
    setCurrentStep(1)
    setShowResults(false)
    setValuationResult(null)
    setValuationData({
      businessName: "",
      industry: "",
      revenue: 0,
      growth: 0,
      employees: 0,
      location: "",
      businessModel: "",
      stage: "",
      assets: 0,
      liabilities: 0,
      cashFlow: 0,
      marketSize: 0,
      competition: 5,
      uniqueValue: "",
      risks: "",
      opportunities: ""
    })
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const exportResults = () => {
    if (!valuationResult) return

    const exportData = {
      businessName: valuationData.businessName,
      valuationDate: new Date().toISOString().split('T')[0],
      estimatedValue: valuationResult.estimatedValue,
      confidence: valuationResult.confidence,
      method: valuationResult.method,
      breakdown: valuationResult.breakdown,
      factors: valuationResult.factors,
      recommendations: valuationResult.recommendations
    }

    const dataStr = JSON.stringify(exportData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `${valuationData.businessName.replace(/\s+/g, '_')}_valuation_${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()

    toast({
      title: "Export Complete",
      description: "Valuation report has been downloaded.",
    })
  }

  if (showResults && valuationResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            {/* Results Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4"
              >
                <CheckCircle className="w-8 h-8 text-green-600" />
              </motion.div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Valuation Complete
              </h1>
              <p className="text-xl text-gray-600">
                {valuationData.businessName}
              </p>
            </div>

            {/* Main Valuation Card */}
            <Card className="mb-8 border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="text-sm font-medium opacity-90 mb-2">
                    Estimated Business Value
                  </div>
                  <div className="text-5xl font-bold mb-4">
                    {formatCurrency(valuationResult.estimatedValue)}
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      <Gauge className="w-4 h-4 mr-1" />
                      {valuationResult.confidence.toFixed(0)}% Confidence
                    </Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      <Calculator className="w-4 h-4 mr-1" />
                      {valuationResult.method}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Valuation Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Valuation Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Asset-Based (20%)</span>
                      <span className="font-bold text-blue-600">
                        {formatCurrency(valuationResult.breakdown.assetBased)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">Market-Based (50%)</span>
                      <span className="font-bold text-green-600">
                        {formatCurrency(valuationResult.breakdown.marketBased)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">Income-Based (30%)</span>
                      <span className="font-bold text-purple-600">
                        {formatCurrency(valuationResult.breakdown.incomeBased)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Factors */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Key Factors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="positive" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="positive">Positive</TabsTrigger>
                      <TabsTrigger value="negative">Negative</TabsTrigger>
                    </TabsList>
                    <TabsContent value="positive" className="space-y-2">
                      {valuationResult.factors.positive.map((factor, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm">{factor}</span>
                        </div>
                      ))}
                      {valuationResult.factors.positive.length === 0 && (
                        <p className="text-sm text-gray-500 italic">No significant positive factors identified</p>
                      )}
                    </TabsContent>
                    <TabsContent value="negative" className="space-y-2">
                      {valuationResult.factors.negative.map((factor, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-red-50 rounded">
                          <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                          <span className="text-sm">{factor}</span>
                        </div>
                      ))}
                      {valuationResult.factors.negative.length === 0 && (
                        <p className="text-sm text-gray-500 italic">No significant negative factors identified</p>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Recommendations
                </CardTitle>
                <CardDescription>
                  Strategic suggestions to improve your business value
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {valuationResult.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <p className="text-sm">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button onClick={exportResults} className="bg-green-600 hover:bg-green-700">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" onClick={() => window.print()}>
                <FileText className="w-4 h-4 mr-2" />
                Print Report
              </Button>
              <Button variant="outline" onClick={resetValuation}>
                <RefreshCw className="w-4 h-4 mr-2" />
                New Valuation
              </Button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4"
            >
              <Calculator className="w-8 h-8 text-blue-600" />
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Business Valuation Tool
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Get an accurate estimate of your business value using our AI-powered analysis
            </p>
            
            {/* Progress Bar */}
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Step {currentStep} of {totalSteps}</span>
                <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
              </div>
              <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
            </div>
          </div>

          {/* Valuation Form */}
          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Basic Information
                      </h2>
                      <p className="text-gray-600">
                        Tell us about your business fundamentals
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input
                          id="businessName"
                          placeholder="Enter your business name"
                          value={valuationData.businessName}
                          onChange={(e) => handleInputChange('businessName', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <Select
                          value={valuationData.industry}
                          onValueChange={(value) => handleInputChange('industry', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            {industries.map((industry) => (
                              <SelectItem key={industry} value={industry}>
                                {industry}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="businessModel">Business Model</Label>
                        <Select
                          value={valuationData.businessModel}
                          onValueChange={(value) => handleInputChange('businessModel', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select business model" />
                          </SelectTrigger>
                          <SelectContent>
                            {businessModels.map((model) => (
                              <SelectItem key={model} value={model}>
                                {model}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="stage">Business Stage</Label>
                        <Select
                          value={valuationData.stage}
                          onValueChange={(value) => handleInputChange('stage', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select business stage" />
                          </SelectTrigger>
                          <SelectContent>
                            {stages.map((stage) => (
                              <SelectItem key={stage} value={stage}>
                                {stage}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          placeholder="City, Country"
                          value={valuationData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="employees">Number of Employees</Label>
                        <Input
                          id="employees"
                          type="number"
                          placeholder="0"
                          value={valuationData.employees || ''}
                          onChange={(e) => handleInputChange('employees', parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Financial Information */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Financial Information
                      </h2>
                      <p className="text-gray-600">
                        Provide your key financial metrics
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="revenue">Annual Revenue ($)</Label>
                        <Input
                          id="revenue"
                          type="number"
                          placeholder="0"
                          value={valuationData.revenue || ''}
                          onChange={(e) => handleInputChange('revenue', parseInt(e.target.value) || 0)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="growth">Growth Rate (%)</Label>
                        <Input
                          id="growth"
                          type="number"
                          placeholder="0"
                          value={valuationData.growth || ''}
                          onChange={(e) => handleInputChange('growth', parseInt(e.target.value) || 0)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cashFlow">Monthly Cash Flow ($)</Label>
                        <Input
                          id="cashFlow"
                          type="number"
                          placeholder="0"
                          value={valuationData.cashFlow || ''}
                          onChange={(e) => handleInputChange('cashFlow', parseInt(e.target.value) || 0)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="assets">Total Assets ($)</Label>
                        <Input
                          id="assets"
                          type="number"
                          placeholder="0"
                          value={valuationData.assets || ''}
                          onChange={(e) => handleInputChange('assets', parseInt(e.target.value) || 0)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="liabilities">Total Liabilities ($)</Label>
                        <Input
                          id="liabilities"
                          type="number"
                          placeholder="0"
                          value={valuationData.liabilities || ''}
                          onChange={(e) => handleInputChange('liabilities', parseInt(e.target.value) || 0)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="marketSize">Market Size ($)</Label>
                        <Input
                          id="marketSize"
                          type="number"
                          placeholder="0"
                          value={valuationData.marketSize || ''}
                          onChange={(e) => handleInputChange('marketSize', parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Market Analysis */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Market Analysis
                      </h2>
                      <p className="text-gray-600">
                        Help us understand your competitive landscape
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label>Competition Level</Label>
                        <div className="px-4">
                          <Slider
                            value={[valuationData.competition]}
                            onValueChange={(value) => handleInputChange('competition', value[0])}
                            max={10}
                            min={1}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-sm text-gray-500 mt-2">
                            <span>Low Competition</span>
                            <span className="font-medium">Level: {valuationData.competition}</span>
                            <span>High Competition</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="uniqueValue">Unique Value Proposition</Label>
                        <Textarea
                          id="uniqueValue"
                          placeholder="Describe what makes your business unique and competitive..."
                          value={valuationData.uniqueValue}
                          onChange={(e) => handleInputChange('uniqueValue', e.target.value)}
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="opportunities">Key Opportunities</Label>
                        <Textarea
                          id="opportunities"
                          placeholder="Describe major growth opportunities and market trends..."
                          value={valuationData.opportunities}
                          onChange={(e) => handleInputChange('opportunities', e.target.value)}
                          rows={4}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Risk Assessment */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Risk Assessment
                      </h2>
                      <p className="text-gray-600">
                        Identify potential risks and challenges
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="risks">Key Risks & Challenges</Label>
                        <Textarea
                          id="risks"
                          placeholder="Describe major risks, dependencies, and potential challenges..."
                          value={valuationData.risks}
                          onChange={(e) => handleInputChange('risks', e.target.value)}
                          rows={6}
                        />
                      </div>

                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          Be honest about risks and challenges. This helps provide a more accurate valuation and better recommendations.
                        </AlertDescription>
                      </Alert>

                      <div className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="font-semibold text-blue-900 mb-3">Ready to Calculate?</h3>
                        <p className="text-blue-800 mb-4">
                          We'll analyze your business using multiple valuation methods including asset-based, market-based, and income-based approaches.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-blue-700">
                          <CheckCircle className="w-4 h-4" />
                          <span>AI-powered analysis</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-blue-700">
                          <CheckCircle className="w-4 h-4" />
                          <span>Industry benchmarking</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-blue-700">
                          <CheckCircle className="w-4 h-4" />
                          <span>Detailed recommendations</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={calculateValuation}
                    disabled={isCalculating}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                  >
                    {isCalculating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Calculator className="w-4 h-4" />
                        Calculate Valuation
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Loading State */}
          {isCalculating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <Card className="p-8 max-w-md mx-4">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4"
                  >
                    <Brain className="w-8 h-8 text-blue-600" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">Analyzing Your Business</h3>
                  <p className="text-gray-600 mb-4">
                    Our AI is processing your data and calculating the valuation...
                  </p>
                  <Progress value={66} className="h-2" />
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}