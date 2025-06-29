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
    "Tecnologia",
    "Saúde",
    "Finanças",
    "Retalho",
    "Indústria Transformadora",
    "Imobiliário",
    "Educação",
    "Alimentação & Bebidas",
    "Transporte",
    "Energia",
    "Media & Entretenimento",
    "Serviços Profissionais",
    "Outro"
  ]

  const businessModels = [
    "B2B SaaS",
    "B2C E-commerce",
    "Marketplace",
    "Subscrição",
    "Freemium",
    "Publicidade",
    "Baseado em Transações",
    "Licenciamento",
    "Consultoria",
    "Vendas de Produto",
    "Outro"
  ]

  const stages = [
    "Fase de Ideia",
    "MVP/Protótipo",
    "Receita Inicial",
    "Fase de Crescimento",
    "Maturidade/Estabelecido",
    "Expansão",
    "Preparação para Saída"
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
      method: "Método Híbrido (Ativo + Mercado + Rendimento)",
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

    toast(
      <>
        <strong>Avaliação Concluída</strong>
        <div>A avaliação da sua empresa foi calculada com êxito.</div>
      </>
    )
  }

  const getIndustryMultiplier = (industry: string): number => {
    const multipliers: { [key: string]: number } = {
      "Tecnologia": 8,
      "Saúde": 6,
      "Finanças": 4,
      "Retalho": 2,
      "Indústria Transformadora": 3,
      "Imobiliário": 5,
      "Educação": 4,
      "Alimentação & Bebidas": 2.5,
      "Transporte": 3,
      "Energia": 4,
      "Media & Entretenimento": 5,
      "Serviços Profissionais": 3.5,
      "Outro": 3
    }
    return multipliers[industry] || 3
  }

  const getStageFactor = (stage: string): number => {
    const factors: { [key: string]: number } = {
      "Fase de Ideia": 0.5,
      "MVP/Protótipo": 0.7,
      "Receita Inicial": 0.9,
      "Fase de Crescimento": 1.2,
      "Maturidade/Estabelecido": 1.0,
      "Expansão": 1.1,
      "Preparação para Saída": 0.95
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
    if (valuationData.growth > 20) factors.push("Elevada taxa de crescimento")
    if (valuationData.revenue > 1000000) factors.push("Forte base de receitas")
    if (valuationData.employees > 50) factors.push("Equipa estabelecida")
    if (valuationData.cashFlow > 0) factors.push("Cash flow positivo")
    if (valuationData.competition < 5) factors.push("Baixa concorrência")
    if (valuationData.uniqueValue.length > 50) factors.push("Proposta de valor clara")
    return factors
  }

  const getNegativeFactors = (): string[] => {
    const factors = []
    if (valuationData.growth < 5) factors.push("Baixa taxa de crescimento")
    if (valuationData.revenue < 100000) factors.push("Receitas limitadas")
    if (valuationData.cashFlow < 0) factors.push("Cash flow negativo")
    if (valuationData.competition > 7) factors.push("Elevada concorrência")
    if (valuationData.liabilities > valuationData.assets) factors.push("Elevado peso da dívida")
    return factors
  }

  const getRecommendations = (): string[] => {
    const recommendations = []
    if (valuationData.growth < 10) {
      recommendations.push("Concentrar-se na aceleração do crescimento através do marketing e do desenvolvimento de produtos")
    }
    if (valuationData.cashFlow < 0) {
      recommendations.push("Melhorar a gestão do fluxo de caixa e reduzir os custos operacionais")
    }
    if (valuationData.competition > 7) {
      recommendations.push("Reforçar o posicionamento competitivo e a proposta de valor único")
    }
    if (valuationData.employees < 10) {
      recommendations.push("Considerar a contratação estratégica para apoiar o crescimento")
    }
    recommendations.push("Auditorias financeiras regulares para manter uma avaliação exacta")
    recommendations.push("Documentar toda a propriedade intelectual e os principais processos empresariais.")
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

    toast(
      <>
        <strong>Exportação completa</strong>
        <div>O relatório de avaliação foi descarregado.</div>
      </>
    )
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
                Avaliação Concluída
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
                    Valor Estimado do Negócio
                  </div>
                  <div className="text-5xl font-bold mb-4">
                    {formatCurrency(valuationResult.estimatedValue)}
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      <Gauge className="w-4 h-4 mr-1" />
                      {valuationResult.confidence.toFixed(0)}% Confiança
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
                    Detalhe da Avaliação
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Baseado em Ativos (20%)</span>
                      <span className="font-bold text-blue-600">
                        {formatCurrency(valuationResult.breakdown.assetBased)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">Baseado no Mercado (50%)</span>
                      <span className="font-bold text-green-600">
                        {formatCurrency(valuationResult.breakdown.marketBased)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">Baseado em Rendimentos (30%)</span>
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
                    Fatores-Chave
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="positive" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="positive">Positivos</TabsTrigger>
                      <TabsTrigger value="negative">Negativos</TabsTrigger>
                    </TabsList>
                    <TabsContent value="positive" className="space-y-2">
                      {valuationResult.factors.positive.map((factor, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm">{factor}</span>
                        </div>
                      ))}
                      {valuationResult.factors.positive.length === 0 && (
                        <p className="text-sm text-gray-500 italic">Nenhum fator positivo significativo identificado</p>
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
                        <p className="text-sm text-gray-500 italic">Nenhum fator negativo significativo identificado</p>
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
                  Recomendações
                </CardTitle>
                <CardDescription>
                  Sugestões estratégicas para melhorar o valor do seu negócio
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
                Exportar Relatório
              </Button>
              <Button variant="outline" onClick={() => window.print()}>
                <FileText className="w-4 h-4 mr-2" />
                Imprimir Relatório
              </Button>
              <Button variant="outline" onClick={resetValuation}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Nova Avaliação
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
              Ferramenta de Avaliação de Negócios
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Obtenha uma estimativa precisa do valor do seu negócio com a nossa análise potenciada por IA
            </p>
            
            {/* Progress Bar */}
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Passo {currentStep} de {totalSteps}</span>
                <span>{Math.round((currentStep / totalSteps) * 100)}% Concluído</span>
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
                        Informação Básica
                      </h2>
                      <p className="text-gray-600">
                        Fale-nos sobre os fundamentos do seu negócio
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Nome do Negócio</Label>
                        <Input
                          id="businessName"
                          placeholder="Insira o nome do seu negócio"
                          value={valuationData.businessName}
                          onChange={(e) => handleInputChange('businessName', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="industry">Setor</Label>
                        <Select
                          value={valuationData.industry}
                          onValueChange={(value) => handleInputChange('industry', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o setor" />
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
                        <Label htmlFor="businessModel">Modelo de Negócio</Label>
                        <Select
                          value={valuationData.businessModel}
                          onValueChange={(value) => handleInputChange('businessModel', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o modelo de negócio" />
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
                        <Label htmlFor="stage">Fase do Negócio</Label>
                        <Select
                          value={valuationData.stage}
                          onValueChange={(value) => handleInputChange('stage', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a fase do negócio" />
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
                        <Label htmlFor="location">Localização</Label>
                        <Input
                          id="location"
                          placeholder="Cidade, País"
                          value={valuationData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="employees">Número de Colaboradores</Label>
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
                        Informação Financeira
                      </h2>
                      <p className="text-gray-600">
                        Indique os principais indicadores financeiros
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="revenue">Receita Anual (€)</Label>
                        <Input
                          id="revenue"
                          type="number"
                          placeholder="0"
                          value={valuationData.revenue || ''}
                          onChange={(e) => handleInputChange('revenue', parseInt(e.target.value) || 0)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="growth">Taxa de Crescimento (%)</Label>
                        <Input
                          id="growth"
                          type="number"
                          placeholder="0"
                          value={valuationData.growth || ''}
                          onChange={(e) => handleInputChange('growth', parseInt(e.target.value) || 0)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cashFlow">Cash Flow Mensal (€)</Label>
                        <Input
                          id="cashFlow"
                          type="number"
                          placeholder="0"
                          value={valuationData.cashFlow || ''}
                          onChange={(e) => handleInputChange('cashFlow', parseInt(e.target.value) || 0)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="assets">Total de Ativos (€)</Label>
                        <Input
                          id="assets"
                          type="number"
                          placeholder="0"
                          value={valuationData.assets || ''}
                          onChange={(e) => handleInputChange('assets', parseInt(e.target.value) || 0)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="liabilities">Total de Passivos (€)</Label>
                        <Input
                          id="liabilities"
                          type="number"
                          placeholder="0"
                          value={valuationData.liabilities || ''}
                          onChange={(e) => handleInputChange('liabilities', parseInt(e.target.value) || 0)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="marketSize">Tamanho do Mercado (€)</Label>
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
                        Análise de Mercado
                      </h2>
                      <p className="text-gray-600">
                        Ajude-nos a perceber o seu contexto competitivo
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label>Nível de Concorrência</Label>
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
                            <span>Pouca Concorrência</span>
                            <span className="font-medium">Nível: {valuationData.competition}</span>
                            <span>Muita Concorrência</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="uniqueValue">Proposta de Valor Única</Label>
                        <Textarea
                          id="uniqueValue"
                          placeholder="Descreva o que torna o seu negócio único e competitivo..."
                          value={valuationData.uniqueValue}
                          onChange={(e) => handleInputChange('uniqueValue', e.target.value)}
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="opportunities">Principais Oportunidades</Label>
                        <Textarea
                          id="opportunities"
                          placeholder="Descreva as principais oportunidades de crescimento e tendências de mercado..."
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
                        Avaliação de Risco
                      </h2>
                      <p className="text-gray-600">
                        Identifique riscos e desafios potenciais
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="risks">Principais Riscos & Desafios</Label>
                        <Textarea
                          id="risks"
                          placeholder="Descreva os principais riscos, dependências e desafios potenciais..."
                          value={valuationData.risks}
                          onChange={(e) => handleInputChange('risks', e.target.value)}
                          rows={6}
                        />
                      </div>

                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          Seja honesto sobre riscos e desafios. Isto ajuda a fornecer uma avaliação mais precisa e melhores recomendações.
                        </AlertDescription>
                      </Alert>

                      <div className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="font-semibold text-blue-900 mb-3">Pronto para Calcular?</h3>
                        <p className="text-blue-800 mb-4">
                          Vamos analisar o seu negócio utilizando vários métodos de avaliação, incluindo abordagens baseadas em ativos, mercado e rendimentos.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-blue-700">
                          <CheckCircle className="w-4 h-4" />
                          <span>Análise potenciada por IA</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-blue-700">
                          <CheckCircle className="w-4 h-4" />
                          <span>Benchmarking do setor</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-blue-700">
                          <CheckCircle className="w-4 h-4" />
                          <span>Recomendações detalhadas</span>
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
                  Anterior
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                  >
                    Seguinte
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
                        A calcular...
                      </>
                    ) : (
                      <>
                        <Calculator className="w-4 h-4" />
                        Calcular Avaliação
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
                  <h3 className="text-xl font-semibold mb-2">A Analisar o Seu Negócio</h3>
                  <p className="text-gray-600 mb-4">
                    A nossa IA está a processar os seus dados e a calcular a avaliação...
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