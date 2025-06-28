"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Share2, MessageCircle, TrendingUp, Users, Calendar, Globe, Star, Shield, Eye, BarChart3, DollarSign, ArrowLeft, Download, Bookmark, Flag, ExternalLink, Copy, Phone, Video, Mail, ChevronLeft, ChevronRight, ZoomIn, Play, Pause, Volume2, VolumeX, Fullscreen as FullScreen, AlertTriangle, CheckCircle, Info, HelpCircle, Calculator, FileText, PieChart, Clock, MapPin, Building, Code, Smartphone, ShoppingCart, Briefcase, Database, Cloud, Lock, Wifi, CreditCard, Zap, Target, Award, TrendingDown, Activity, Gauge, Sparkles, ThumbsUp, ThumbsDown, MessageSquare, Send, Plus, Minus, Filter, Search, SortAsc, MoreHorizontal, X, Check, Edit, Save, RefreshCw } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

interface AssetDetail {
  id: string
  title: string
  description: string
  type: string
  price: number
  monthlyRevenue: number
  monthlyTraffic: number
  age: number
  verified: boolean
  featured: boolean
  trending: boolean
  premium: boolean
  images: string[]
  videos?: string[]
  documents?: {
    id: string
    name: string
    type: string
    size: number
    url: string
    protected: boolean
  }[]
  seller: {
    id: string
    name: string
    rating: number
    verified: boolean
    totalSales: number
    memberSince: string
    avatar?: string
    responseTime: string
    location: string
    languages: string[]
    timezone: string
  }
  stats: {
    views: number
    favorites: number
    inquiries: number
    watchers: number
    shares: number
  }
  tags: string[]
  niche: string
  monetization: string
  url?: string
  highlights: string[]
  financials: {
    revenue12Months: number
    profit12Months: number
    growthRate: number
    customerCount: number
    churnRate: number
    ltv: number
    cac: number
    mrr: number
    arr: number
    grossMargin: number
    netMargin: number
    burnRate: number
    runway: number
  }
  traffic: {
    sources: { name: string; percentage: number; color: string }[]
    countries: { name: string; percentage: number; flag: string }[]
    devices: { name: string; percentage: number; icon: string }[]
    demographics: {
      ageGroups: { range: string; percentage: number }[]
      gender: { type: string; percentage: number }[]
    }
  }
  technology: {
    platform: string
    hosting: string
    cms: string
    analytics: string[]
    integrations: string[]
    apis: string[]
    security: {
      ssl: boolean
      backup: boolean
      monitoring: boolean
      compliance: string[]
    }
  }
  seo: {
    domainAuthority: number
    backlinks: number
    organicKeywords: number
    monthlySearchVolume: number
    topKeywords: { keyword: string; position: number; volume: number }[]
  }
  risks: {
    level: 'low' | 'medium' | 'high'
    category: string
    description: string
    impact: string
    mitigation: string
  }[]
  opportunities: {
    category: string
    description: string
    potential: string
    effort: 'low' | 'medium' | 'high'
    timeline: string
  }[]
  valuation: {
    aiScore: number
    method: string
    multiples: {
      revenue: number
      profit: number
      traffic: number
    }
    comparables: {
      name: string
      multiple: number
      similarity: number
    }[]
  }
  dueDiligence: {
    available: boolean
    documents: string[]
    verified: boolean
    lastUpdated: string
  }
  financing: {
    escrowAvailable: boolean
    installmentOptions: boolean
    earnoutAvailable: boolean
    minimumDown: number
  }
  createdAt: string
  updatedAt: string
}

interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  helpful: number
  createdAt: string
  verified: boolean
}

interface Question {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  question: string
  answer?: string
  answeredBy?: string
  answeredAt?: string
  helpful: number
  createdAt: string
}

export default function AssetDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [asset, setAsset] = useState<AssetDetail | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFavorited, setIsFavorited] = useState(false)
  const [isWatching, setIsWatching] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [newQuestion, setNewQuestion] = useState("")
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" })
  const [offerAmount, setOfferAmount] = useState("")
  const [offerTerms, setOfferTerms] = useState("")
  const [contactMessage, setContactMessage] = useState("")
  const [reportReason, setReportReason] = useState("")
  const [reportDetails, setReportDetails] = useState("")
  const [viewMode, setViewMode] = useState<'gallery' | 'slideshow'>('gallery')
  const [autoPlay, setAutoPlay] = useState(false)
  const [showComparables, setShowComparables] = useState(false)
  const [comparisonAssets, setComparisonAssets] = useState<string[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)

  // Performance data for charts
  const performanceData = [
    { month: 'Jan', revenue: 6500, traffic: 18000, customers: 120 },
    { month: 'Feb', revenue: 7200, traffic: 21000, customers: 135 },
    { month: 'Mar', revenue: 7800, traffic: 23000, customers: 148 },
    { month: 'Apr', revenue: 8100, traffic: 24500, customers: 156 },
    { month: 'May', revenue: 8500, traffic: 25000, customers: 162 },
    { month: 'Jun', revenue: 8500, traffic: 25000, customers: 165 },
  ]

  useEffect(() => {
    const fetchAsset = async () => {
      setIsLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Enhanced mock data
      const mockAsset: AssetDetail = {
        id: params.id as string,
        title: "E-commerce de Moda Sustentável",
        description: `Esta é uma loja online estabelecida especializada em moda sustentável e ética com um forte posicionamento no mercado português e crescimento internacional.

        🌱 **Sobre o Negócio**
        O negócio foi construído ao longo de 2 anos com foco em produtos de alta qualidade de marcas sustentáveis verificadas. A loja tem uma base de clientes fidelizada e um forte posicionamento no mercado português.

        📦 **O que está incluído:**
        • Website completo com sistema de e-commerce otimizado
        • Base de dados de 15.000+ clientes verificados
        • Inventário de 500+ produtos com fornecedores estabelecidos
        • Relacionamentos comerciais com 25+ marcas sustentáveis
        • Equipa de 3 pessoas especializadas (pode ser mantida)
        • Sistemas e processos documentados
        • Certificações de sustentabilidade e qualidade
        • Presença forte nas redes sociais (50k+ seguidores)

        💰 **Desempenho Financeiro**
        • Receita mensal consistente de €8.500
        • Crescimento de 25% nos últimos 6 meses
        • Margem de lucro saudável de 35%
        • Taxa de retenção de clientes de 68%
        • LTV/CAC ratio de 4.2x

        🎯 **Oportunidades de Crescimento**
        • Expansão para mercados internacionais (Brasil, Espanha)
        • Desenvolvimento de linha própria de produtos
        • Implementação de programa de subscrição
        • Parcerias com influencers e embaixadores`,
        type: "ecommerce",
        price: 45000,
        monthlyRevenue: 8500,
        monthlyTraffic: 25000,
        age: 24,
        verified: true,
        featured: true,
        trending: true,
        premium: false,
        images: [
          "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
        videos: [
          "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        ],
        documents: [
          { id: "1", name: "Financial_Report_2024.pdf", type: "pdf", size: 2048000, url: "#", protected: true },
          { id: "2", name: "Traffic_Analytics.pdf", type: "pdf", size: 1024000, url: "#", protected: false },
          { id: "3", name: "Customer_Database.xlsx", type: "excel", size: 512000, url: "#", protected: true },
          { id: "4", name: "Supplier_Contracts.pdf", type: "pdf", size: 3072000, url: "#", protected: true },
        ],
        seller: {
          id: "seller1",
          name: "Ana Silva",
          rating: 4.8,
          verified: true,
          totalSales: 12,
          memberSince: "2022-03-15",
          avatar: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=100",
          responseTime: "< 2 horas",
          location: "Lisboa, Portugal",
          languages: ["Português", "Inglês", "Espanhol"],
          timezone: "GMT+0",
        },
        stats: {
          views: 1247,
          favorites: 89,
          inquiries: 23,
          watchers: 156,
          shares: 34,
        },
        tags: ["Moda", "Sustentável", "E-commerce", "Dropshipping", "B2C", "Internacional"],
        niche: "fashion",
        monetization: "ecommerce",
        url: "https://exemplo-moda-sustentavel.com",
        highlights: [
          "🚀 Crescimento de 25% nos últimos 6 meses",
          "💎 Taxa de retenção de clientes de 68%",
          "💰 Margem de lucro saudável de 35%",
          "📱 Presença forte nas redes sociais (50k seguidores)",
          "🌱 Certificações de sustentabilidade reconhecidas",
          "🌍 Potencial de expansão internacional comprovado",
          "👥 Equipa especializada e experiente",
          "📈 Tendência de mercado em crescimento (+40% anual)",
        ],
        financials: {
          revenue12Months: 102000,
          profit12Months: 35700,
          growthRate: 25,
          customerCount: 15000,
          churnRate: 15,
          ltv: 180,
          cac: 42,
          mrr: 8500,
          arr: 102000,
          grossMargin: 65,
          netMargin: 35,
          burnRate: 2800,
          runway: 18,
        },
        traffic: {
          sources: [
            { name: "Orgânico", percentage: 45, color: "#10B981" },
            { name: "Redes Sociais", percentage: 30, color: "#3B82F6" },
            { name: "Direto", percentage: 15, color: "#8B5CF6" },
            { name: "Pago", percentage: 10, color: "#F59E0B" },
          ],
          countries: [
            { name: "Portugal", percentage: 70, flag: "🇵🇹" },
            { name: "Brasil", percentage: 20, flag: "🇧🇷" },
            { name: "Espanha", percentage: 10, flag: "🇪🇸" },
          ],
          devices: [
            { name: "Mobile", percentage: 65, icon: "📱" },
            { name: "Desktop", percentage: 30, icon: "💻" },
            { name: "Tablet", percentage: 5, icon: "📱" },
          ],
          demographics: {
            ageGroups: [
              { range: "18-24", percentage: 25 },
              { range: "25-34", percentage: 40 },
              { range: "35-44", percentage: 25 },
              { range: "45+", percentage: 10 },
            ],
            gender: [
              { type: "Feminino", percentage: 75 },
              { type: "Masculino", percentage: 25 },
            ],
          },
        },
        technology: {
          platform: "Shopify Plus",
          hosting: "Shopify Cloud",
          cms: "Shopify",
          analytics: ["Google Analytics", "Hotjar", "Klaviyo"],
          integrations: ["Stripe", "PayPal", "Mailchimp", "Zendesk"],
          apis: ["Instagram API", "Facebook API", "Google Shopping API"],
          security: {
            ssl: true,
            backup: true,
            monitoring: true,
            compliance: ["GDPR", "PCI DSS"],
          },
        },
        seo: {
          domainAuthority: 45,
          backlinks: 1250,
          organicKeywords: 2800,
          monthlySearchVolume: 45000,
          topKeywords: [
            { keyword: "moda sustentável", position: 3, volume: 2400 },
            { keyword: "roupa ecológica", position: 5, volume: 1800 },
            { keyword: "fashion sustentável", position: 7, volume: 1200 },
          ],
        },
        risks: [
          {
            level: 'low',
            category: 'Mercado',
            description: 'Flutuações sazonais na procura por moda',
            impact: 'Variação de 10-15% na receita durante períodos específicos',
            mitigation: 'Diversificação de produtos e campanhas sazonais'
          },
          {
            level: 'medium',
            category: 'Dependência',
            description: 'Dependência de plataformas de redes sociais para marketing',
            impact: 'Redução potencial de 30% no tráfego se algoritmos mudarem',
            mitigation: 'Diversificação de canais de marketing e email marketing'
          },
          {
            level: 'low',
            category: 'Competição',
            description: 'Entrada de novos concorrentes no nicho sustentável',
            impact: 'Pressão nos preços e margem de lucro',
            mitigation: 'Foco na qualidade e relacionamento com clientes'
          },
        ],
        opportunities: [
          {
            category: 'Expansão Geográfica',
            description: 'Expansão para mercados internacionais com alta procura',
            potential: 'Aumento de 50-100% na receita',
            effort: 'medium',
            timeline: '6-12 meses'
          },
          {
            category: 'Produto',
            description: 'Desenvolvimento de linha própria de produtos sustentáveis',
            potential: 'Aumento de 25% na margem de lucro',
            effort: 'high',
            timeline: '12-18 meses'
          },
          {
            category: 'Modelo de Negócio',
            description: 'Implementação de modelo de subscrição mensal',
            potential: 'Receita recorrente de €2.000-5.000/mês',
            effort: 'low',
            timeline: '3-6 meses'
          },
          {
            category: 'Tecnologia',
            description: 'Implementação de AR/VR para experiência de compra',
            potential: 'Aumento de 15% na conversão',
            effort: 'high',
            timeline: '9-12 meses'
          },
        ],
        valuation: {
          aiScore: 8.7,
          method: "Múltiplos de Mercado + DCF",
          multiples: {
            revenue: 5.3,
            profit: 1.26,
            traffic: 1.8,
          },
          comparables: [
            { name: "EcoFashion Store", multiple: 5.8, similarity: 92 },
            { name: "Sustainable Clothing Co", multiple: 4.9, similarity: 87 },
            { name: "Green Fashion Hub", multiple: 6.2, similarity: 84 },
          ],
        },
        dueDiligence: {
          available: true,
          documents: ["Financials", "Legal", "Technical", "Commercial"],
          verified: true,
          lastUpdated: "2024-01-15",
        },
        financing: {
          escrowAvailable: true,
          installmentOptions: true,
          earnoutAvailable: true,
          minimumDown: 20,
        },
        createdAt: "2024-01-15",
        updatedAt: "2024-01-20",
      }

      // Mock reviews
      const mockReviews: Review[] = [
        {
          id: "1",
          userId: "user1",
          userName: "João Santos",
          userAvatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50",
          rating: 5,
          comment: "Excelente oportunidade de investimento. A documentação está completa e o vendedor foi muito transparente durante todo o processo.",
          helpful: 12,
          createdAt: "2024-01-18",
          verified: true,
        },
        {
          id: "2",
          userId: "user2",
          userName: "Maria Costa",
          userAvatar: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=50",
          rating: 4,
          comment: "Negócio sólido com bom potencial de crescimento. Recomendo para quem procura entrar no setor da moda sustentável.",
          helpful: 8,
          createdAt: "2024-01-16",
          verified: false,
        },
      ]

      // Mock questions
      const mockQuestions: Question[] = [
        {
          id: "1",
          userId: "user3",
          userName: "Pedro Silva",
          userAvatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=50",
          question: "Qual é a taxa de conversão atual do website?",
          answer: "A taxa de conversão média é de 3.2%, que está acima da média do setor (2.8%). Temos picos de 4.5% durante campanhas promocionais.",
          answeredBy: "Ana Silva",
          answeredAt: "2024-01-19",
          helpful: 15,
          createdAt: "2024-01-18",
        },
        {
          id: "2",
          userId: "user4",
          userName: "Carla Mendes",
          userAvatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50",
          question: "Os contratos com fornecedores são transferíveis?",
          answer: "Sim, todos os contratos principais são transferíveis. Temos acordos estabelecidos com 25 fornecedores, sendo 15 contratos anuais e 10 sem prazo fixo.",
          answeredBy: "Ana Silva",
          answeredAt: "2024-01-19",
          helpful: 9,
          createdAt: "2024-01-17",
        },
        {
          id: "3",
          userId: "user5",
          userName: "Rui Oliveira",
          question: "Existe dependência de algum canal de marketing específico?",
          helpful: 3,
          createdAt: "2024-01-20",
        },
      ]

      setAsset(mockAsset)
      setReviews(mockReviews)
      setQuestions(mockQuestions)
      setIsLoading(false)
    }

    if (params.id) {
      fetchAsset()
    }
  }, [params.id])

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
    toast.success(isFavorited ? "Removido dos favoritos" : "Adicionado aos favoritos")
  }

  const handleWatch = () => {
    setIsWatching(!isWatching)
    toast.success(isWatching ? "Deixou de seguir" : "A seguir ativo - receberá notificações")
  }

  const handleContact = () => {
    if (!isAuthenticated) {
      toast.error("Precisa de fazer login para contactar o vendedor")
      return
    }
    setShowContactModal(true)
  }

  const handleMakeOffer = () => {
    if (!isAuthenticated) {
      toast.error("Precisa de fazer login para fazer uma oferta")
      return
    }
    setShowOfferModal(true)
  }

  const handleSendMessage = () => {
    if (!contactMessage.trim()) return
    toast.success("Mensagem enviada ao vendedor")
    setContactMessage("")
    setShowContactModal(false)
  }

  const handleSubmitOffer = () => {
    if (!offerAmount || !offerTerms.trim()) return
    toast.success("Oferta submetida para análise do vendedor")
    setOfferAmount("")
    setOfferTerms("")
    setShowOfferModal(false)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: asset?.title,
          text: asset?.description,
          url: window.location.href,
        })
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href)
        toast.success("Link copiado para a área de transferência")
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copiado para a área de transferência")
    }
  }

  const handleReport = () => {
    if (!reportReason || !reportDetails.trim()) return
    toast.success("Relatório enviado. Obrigado pelo feedback.")
    setReportReason("")
    setReportDetails("")
    setShowReportModal(false)
  }

  const handleAddQuestion = () => {
    if (!newQuestion.trim()) return
    const question: Question = {
      id: Date.now().toString(),
      userId: user?.id || "current",
      userName: user?.name || "Utilizador",
      userAvatar: user?.avatar,
      question: newQuestion,
      helpful: 0,
      createdAt: new Date().toISOString(),
    }
    setQuestions([question, ...questions])
    setNewQuestion("")
    toast.success("Pergunta submetida")
  }

  const handleAddReview = () => {
    if (!newReview.comment.trim()) return
    const review: Review = {
      id: Date.now().toString(),
      userId: user?.id || "current",
      userName: user?.name || "Utilizador",
      userAvatar: user?.avatar,
      rating: newReview.rating,
      comment: newReview.comment,
      helpful: 0,
      createdAt: new Date().toISOString(),
      verified: false,
    }
    setReviews([review, ...reviews])
    setNewReview({ rating: 5, comment: "" })
    toast.success("Avaliação submetida")
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-700 border-green-200'
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'high': return 'bg-red-100 text-red-700 border-red-200'
      default: return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'low': return 'bg-green-100 text-green-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'high': return 'bg-red-100 text-red-700'
      default: return 'bg-slate-100 text-slate-700'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-600'
    if (score >= 7) return 'text-blue-600'
    if (score >= 5) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">A carregar detalhes do ativo...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!asset) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="pt-20 text-center">
          <div className="max-w-md mx-auto">
            <AlertTriangle className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Ativo não encontrado</h1>
            <p className="text-slate-600 mb-6">O ativo que procura não existe ou foi removido.</p>
            <Button asChild>
              <Link href="/marketplace">Voltar ao Marketplace</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <ol className="flex items-center space-x-2">
              <li><Link href="/marketplace" className="text-blue-600 hover:underline">Marketplace</Link></li>
              <li className="text-slate-400">/</li>
              <li><span className="text-slate-600">{asset.type}</span></li>
              <li className="text-slate-400">/</li>
              <li className="text-slate-900 font-medium truncate max-w-xs">{asset.title}</li>
            </ol>
          </nav>

          {/* Back Button */}
          <div className="mb-6">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary" className="capitalize">{asset.type}</Badge>
                        {asset.verified && (
                          <Badge className="bg-green-500 hover:bg-green-600">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verificado
                          </Badge>
                        )}
                        {asset.featured && (
                          <Badge className="bg-yellow-500 hover:bg-yellow-600">
                            <Star className="h-3 w-3 mr-1" />
                            Destaque
                          </Badge>
                        )}
                        {asset.trending && (
                          <Badge className="bg-purple-500 hover:bg-purple-600">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                        {asset.premium && (
                          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500">
                            <Award className="h-3 w-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                      </div>
                      
                      <CardTitle className="text-2xl lg:text-3xl">{asset.title}</CardTitle>
                      
                      <div className="flex items-center gap-6 text-sm text-slate-600 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {asset.stats.views.toLocaleString()} visualizações
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {asset.stats.favorites} favoritos
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {asset.stats.inquiries} consultas
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {asset.stats.watchers} a seguir
                        </div>
                        <div className="flex items-center gap-1">
                          <Share2 className="h-4 w-4" />
                          {asset.stats.shares} partilhas
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className={`text-2xl font-bold ${getScoreColor(asset.valuation.aiScore)}`}>
                          {asset.valuation.aiScore}/10
                        </div>
                        <div className="text-sm text-slate-600">AIQuira Score</div>
                        <Button variant="ghost" size="sm">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                      <Button variant="outline" size="sm" onClick={handleShare}>
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleFavorite}
                        className={isFavorited ? "text-red-600 border-red-200" : ""}
                      >
                        <Heart className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleWatch}
                        className={isWatching ? "text-blue-600 border-blue-200" : ""}
                      >
                        <Eye className={`h-4 w-4 ${isWatching ? "fill-current" : ""}`} />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setShowReportModal(true)}>
                            <Flag className="h-4 w-4 mr-2" />
                            Reportar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setShowComparables(true)}>
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Comparar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Exportar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Media Gallery */}
              <Card>
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="aspect-video relative bg-slate-100 rounded-t-lg overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={selectedImage}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={asset.images[selectedImage] || "/placeholder.svg"}
                            alt={`${asset.title} - Imagem ${selectedImage + 1}`}
                            fill
                            className="object-cover cursor-pointer"
                            onClick={() => setShowImageModal(true)}
                          />
                        </motion.div>
                      </AnimatePresence>
                      
                      {/* Navigation arrows */}
                      {asset.images.length > 1 && (
                        <>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-80 hover:opacity-100"
                            onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : asset.images.length - 1)}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-80 hover:opacity-100"
                            onClick={() => setSelectedImage(selectedImage < asset.images.length - 1 ? selectedImage + 1 : 0)}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </>
                      )}

                      {/* Image counter */}
                      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                        {selectedImage + 1} / {asset.images.length}
                      </div>

                      {/* Zoom button */}
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute top-4 right-4 opacity-80 hover:opacity-100"
                        onClick={() => setShowImageModal(true)}
                      >
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Thumbnail gallery */}
                    {asset.images.length > 1 && (
                      <div className="p-4">
                        <div className="flex gap-2 overflow-x-auto">
                          {asset.images.map((image, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedImage(index)}
                              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                                selectedImage === index ? "border-blue-500" : "border-slate-200 hover:border-slate-300"
                              }`}
                            >
                              <Image
                                src={image || "/placeholder.svg"}
                                alt={`${asset.title} thumbnail ${index + 1}`}
                                width={80}
                                height={80}
                                className="object-cover w-full h-full"
                              />
                            </button>
                          ))}
                          
                          {/* Video thumbnails */}
                          {asset.videos && asset.videos.map((video, index) => (
                            <button
                              key={`video-${index}`}
                              className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 border-slate-200 hover:border-slate-300 bg-slate-100 flex items-center justify-center"
                            >
                              <Play className="h-6 w-6 text-slate-600" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                  <TabsTrigger value="financials">Financeiros</TabsTrigger>
                  <TabsTrigger value="traffic">Tráfego</TabsTrigger>
                  <TabsTrigger value="technology">Tecnologia</TabsTrigger>
                  <TabsTrigger value="analysis">Análise</TabsTrigger>
                  <TabsTrigger value="qa">Q&A</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Description */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Descrição do Negócio</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        <div className={`whitespace-pre-line ${!showFullDescription ? 'line-clamp-6' : ''}`}>
                          {asset.description}
                        </div>
                        {asset.description.length > 500 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowFullDescription(!showFullDescription)}
                            className="mt-2"
                          >
                            {showFullDescription ? 'Ver menos' : 'Ver mais'}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Highlights */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-yellow-500" />
                        Destaques do Negócio
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {asset.highlights.map((highlight, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100"
                          >
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm">{highlight}</span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Performance Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Desempenho dos Últimos 6 Meses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} name="Receita (€)" />
                          <Line type="monotone" dataKey="traffic" stroke="#10B981" strokeWidth={2} name="Tráfego" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="financials" className="space-y-6">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <DollarSign className="h-5 w-5 text-green-600" />
                          ARR
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                          €{asset.financials.arr.toLocaleString()}
                        </div>
                        <p className="text-sm text-slate-600">Receita Anual Recorrente</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <TrendingUp className="h-5 w-5 text-blue-600" />
                          MRR
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                          €{asset.financials.mrr.toLocaleString()}
                        </div>
                        <p className="text-sm text-slate-600">Receita Mensal Recorrente</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <BarChart3 className="h-5 w-5 text-purple-600" />
                          Margem Bruta
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-purple-600">
                          {asset.financials.grossMargin}%
                        </div>
                        <p className="text-sm text-slate-600">Margem de Lucro Bruto</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Users className="h-5 w-5 text-orange-600" />
                          LTV/CAC
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-orange-600">
                          {(asset.financials.ltv / asset.financials.cac).toFixed(1)}x
                        </div>
                        <p className="text-sm text-slate-600">Ratio Lifetime Value</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Detailed Financials */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Métricas de Receita</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Receita Anual (12M)</span>
                          <span className="font-semibold">€{asset.financials.revenue12Months.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Lucro Anual (12M)</span>
                          <span className="font-semibold">€{asset.financials.profit12Months.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Taxa de Crescimento</span>
                          <span className="font-semibold text-green-600">+{asset.financials.growthRate}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Margem Líquida</span>
                          <span className="font-semibold">{asset.financials.netMargin}%</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Métricas de Clientes</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Total de Clientes</span>
                          <span className="font-semibold">{asset.financials.customerCount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Taxa de Churn</span>
                          <span className="font-semibold">{asset.financials.churnRate}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">LTV (Lifetime Value)</span>
                          <span className="font-semibold">€{asset.financials.ltv}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">CAC (Customer Acquisition Cost)</span>
                          <span className="font-semibold">€{asset.financials.cac}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Financial Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Evolução Financeira</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="revenue" fill="#3B82F6" name="Receita (€)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="traffic" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Traffic Sources */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Fontes de Tráfego</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                          <PieChart>
                            <Pie
                              data={asset.traffic.sources}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="percentage"
                              label={({ name, percentage }) => `${name}: ${percentage}%`}
                            >
                              {asset.traffic.sources.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    {/* Geographic Distribution */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Distribuição Geográfica</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {asset.traffic.countries.map((country) => (
                          <div key={country.name} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="flex items-center gap-2">
                                <span className="text-lg">{country.flag}</span>
                                {country.name}
                              </span>
                              <span>{country.percentage}%</span>
                            </div>
                            <Progress value={country.percentage} className="h-2" />
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Device Breakdown */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Dispositivos</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {asset.traffic.devices.map((device) => (
                          <div key={device.name} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="flex items-center gap-2">
                                <span className="text-lg">{device.icon}</span>
                                {device.name}
                              </span>
                              <span>{device.percentage}%</span>
                            </div>
                            <Progress value={device.percentage} className="h-2" />
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Demographics */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Faixas Etárias</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {asset.traffic.demographics.ageGroups.map((group) => (
                          <div key={group.range} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{group.range} anos</span>
                              <span>{group.percentage}%</span>
                            </div>
                            <Progress value={group.percentage} className="h-2" />
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Distribuição por Género</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {asset.traffic.demographics.gender.map((gender) => (
                          <div key={gender.type} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{gender.type}</span>
                              <span>{gender.percentage}%</span>
                            </div>
                            <Progress value={gender.percentage} className="h-2" />
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  {/* SEO Metrics */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Métricas SEO</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-1">{asset.seo.domainAuthority}</div>
                          <div className="text-sm text-slate-600">Domain Authority</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600 mb-1">{asset.seo.backlinks.toLocaleString()}</div>
                          <div className="text-sm text-slate-600">Backlinks</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600 mb-1">{asset.seo.organicKeywords.toLocaleString()}</div>
                          <div className="text-sm text-slate-600">Keywords Orgânicas</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600 mb-1">{(asset.seo.monthlySearchVolume / 1000).toFixed(0)}K</div>
                          <div className="text-sm text-slate-600">Volume de Pesquisa</div>
                        </div>
                      </div>

                      <Separator className="my-6" />

                      <div>
                        <h4 className="font-semibold mb-3">Top Keywords</h4>
                        <div className="space-y-2">
                          {asset.seo.topKeywords.map((keyword, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                              <span className="font-medium">{keyword.keyword}</span>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="text-slate-600">Posição: #{keyword.position}</span>
                                <span className="text-slate-600">Volume: {keyword.volume.toLocaleString()}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="technology" className="space-y-6">
                  {/* Tech Stack */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Stack Tecnológico</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">Plataforma & Hosting</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-slate-600">Plataforma</span>
                              <span className="font-medium">{asset.technology.platform}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Hosting</span>
                              <span className="font-medium">{asset.technology.hosting}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">CMS</span>
                              <span className="font-medium">{asset.technology.cms}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Segurança</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-slate-600">SSL Certificate</span>
                              <Badge variant={asset.technology.security.ssl ? "default" : "secondary"}>
                                {asset.technology.security.ssl ? "Ativo" : "Inativo"}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Backup Automático</span>
                              <Badge variant={asset.technology.security.backup ? "default" : "secondary"}>
                                {asset.technology.security.backup ? "Ativo" : "Inativo"}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Monitorização</span>
                              <Badge variant={asset.technology.security.monitoring ? "default" : "secondary"}>
                                {asset.technology.security.monitoring ? "Ativo" : "Inativo"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator className="my-6" />

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-3">Analytics & Ferramentas</h4>
                          <div className="flex flex-wrap gap-2">
                            {asset.technology.analytics.map((tool) => (
                              <Badge key={tool} variant="outline">{tool}</Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Integrações</h4>
                          <div className="flex flex-wrap gap-2">
                            {asset.technology.integrations.map((integration) => (
                              <Badge key={integration} variant="secondary">{integration}</Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">APIs</h4>
                          <div className="flex flex-wrap gap-2">
                            {asset.technology.apis.map((api) => (
                              <Badge key={api} variant="outline">{api}</Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Compliance</h4>
                          <div className="flex flex-wrap gap-2">
                            {asset.technology.security.compliance.map((comp) => (
                              <Badge key={comp} className="bg-green-100 text-green-700">{comp}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Technical Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Detalhes Técnicos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-slate-600">URL do Website</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Globe className="h-4 w-4 text-slate-400" />
                            <a
                              href={asset.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline flex items-center gap-1"
                            >
                              {asset.url}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-slate-600">Idade do Negócio</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            <span>{asset.age} meses</span>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-slate-600">Nicho</Label>
                          <div className="capitalize mt-1">{asset.niche}</div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-slate-600">Modelo de Monetização</Label>
                          <div className="capitalize mt-1">{asset.monetization}</div>
                        </div>
                      </div>

                      <Separator className="my-6" />

                      <div>
                        <Label className="text-sm font-medium text-slate-600 mb-2 block">Tags</Label>
                        <div className="flex flex-wrap gap-2">
                          {asset.tags.map((tag) => (
                            <Badge key={tag} variant="outline">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="analysis" className="space-y-6">
                  {/* Valuation */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calculator className="h-5 w-5" />
                        Análise de Valuation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">Múltiplos de Avaliação</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-slate-600">Múltiplo de Receita</span>
                              <span className="font-semibold">{asset.valuation.multiples.revenue}x</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-slate-600">Múltiplo de Lucro</span>
                              <span className="font-semibold">{asset.valuation.multiples.profit}x</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-slate-600">Múltiplo de Tráfego</span>
                              <span className="font-semibold">{asset.valuation.multiples.traffic}x</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Ativos Comparáveis</h4>
                          <div className="space-y-2">
                            {asset.valuation.comparables.map((comp, index) => (
                              <div key={index} className="flex justify-between items-center p-2 bg-slate-50 rounded">
                                <div>
                                  <div className="font-medium text-sm">{comp.name}</div>
                                  <div className="text-xs text-slate-600">{comp.similarity}% similaridade</div>
                                </div>
                                <div className="font-semibold">{comp.multiple}x</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Separator className="my-6" />

                      <div className="text-center">
                        <div className="text-sm text-slate-600 mb-2">Método de Avaliação</div>
                        <div className="font-semibold">{asset.valuation.method}</div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Risk Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                        Análise de Riscos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {asset.risks.map((risk, index) => (
                          <div key={index} className={`p-4 rounded-lg border ${getRiskColor(risk.level)}`}>
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-semibold">{risk.category}</div>
                              <Badge className={getRiskColor(risk.level)}>
                                {risk.level.toUpperCase()} RISCO
                              </Badge>
                            </div>
                            <p className="text-sm mb-2">{risk.description}</p>
                            <div className="text-xs space-y-1">
                              <div><strong>Impacto:</strong> {risk.impact}</div>
                              <div><strong>Mitigação:</strong> {risk.mitigation}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Opportunities */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-green-500" />
                        Oportunidades de Crescimento
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {asset.opportunities.map((opportunity, index) => (
                          <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-semibold text-green-800">{opportunity.category}</div>
                              <div className="flex gap-2">
                                <Badge className={getEffortColor(opportunity.effort)}>
                                  {opportunity.effort.toUpperCase()} ESFORÇO
                                </Badge>
                                <Badge variant="outline">{opportunity.timeline}</Badge>
                              </div>
                            </div>
                            <p className="text-sm text-green-700 mb-2">{opportunity.description}</p>
                            <div className="text-xs text-green-600">
                              <strong>Potencial:</strong> {opportunity.potential}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="qa" className="space-y-6">
                  {/* Add Question */}
                  {isAuthenticated && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Fazer uma Pergunta</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <Textarea
                            placeholder="Escreva a sua pergunta sobre este ativo..."
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                            rows={3}
                          />
                          <Button onClick={handleAddQuestion} disabled={!newQuestion.trim()}>
                            <Send className="h-4 w-4 mr-2" />
                            Enviar Pergunta
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Questions List */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Perguntas & Respostas</CardTitle>
                      <CardDescription>
                        {questions.length} pergunta{questions.length !== 1 ? 's' : ''}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {questions.map((question) => (
                          <div key={question.id} className="border-b border-slate-200 pb-6 last:border-b-0">
                            <div className="flex items-start gap-3 mb-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={question.userAvatar} />
                                <AvatarFallback>{question.userName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-sm">{question.userName}</span>
                                  <span className="text-xs text-slate-500">
                                    {new Date(question.createdAt).toLocaleDateString('pt-PT')}
                                  </span>
                                </div>
                                <p className="text-slate-700">{question.question}</p>
                              </div>
                            </div>

                            {question.answer && (
                              <div className="ml-11 p-3 bg-blue-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="outline" className="text-xs">
                                    <Shield className="h-3 w-3 mr-1" />
                                    Vendedor
                                  </Badge>
                                  <span className="text-xs text-slate-500">
                                    {question.answeredAt && new Date(question.answeredAt).toLocaleDateString('pt-PT')}
                                  </span>
                                </div>
                                <p className="text-sm text-slate-700">{question.answer}</p>
                              </div>
                            )}

                            <div className="flex items-center gap-4 mt-3 ml-11">
                              <Button variant="ghost" size="sm">
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                Útil ({question.helpful})
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Responder
                              </Button>
                            </div>
                          </div>
                        ))}

                        {questions.length === 0 && (
                          <div className="text-center py-8 text-slate-500">
                            <MessageSquare className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                            <p>Ainda não há perguntas sobre este ativo.</p>
                            <p className="text-sm">Seja o primeiro a fazer uma pergunta!</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Reviews */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Avaliações</CardTitle>
                      <CardDescription>
                        {reviews.length} avaliação{reviews.length !== 1 ? 'ões' : ''}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {reviews.map((review) => (
                          <div key={review.id} className="border-b border-slate-200 pb-6 last:border-b-0">
                            <div className="flex items-start gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={review.userAvatar} />
                                <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-medium text-sm">{review.userName}</span>
                                  {review.verified && (
                                    <Badge variant="outline" className="text-xs">
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      Verificado
                                    </Badge>
                                  )}
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-3 w-3 ${
                                          i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-slate-500">
                                    {new Date(review.createdAt).toLocaleDateString('pt-PT')}
                                  </span>
                                </div>
                                <p className="text-slate-700 mb-3">{review.comment}</p>
                                <Button variant="ghost" size="sm">
                                  <ThumbsUp className="h-4 w-4 mr-1" />
                                  Útil ({review.helpful})
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}

                        {reviews.length === 0 && (
                          <div className="text-center py-8 text-slate-500">
                            <Star className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                            <p>Ainda não há avaliações para este ativo.</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Price & Actions */}
              <Card className="sticky top-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-3xl text-green-600">
                        €{asset.price.toLocaleString()}
                      </CardTitle>
                      <CardDescription>Preço de venda</CardDescription>
                    </div>
                    <div className={`text-2xl font-bold ${getScoreColor(asset.valuation.aiScore)}`}>
                      {asset.valuation.aiScore}/10
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Receita/mês</span>
                      <div className="font-semibold">€{asset.monthlyRevenue.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Múltiplo</span>
                      <div className="font-semibold">{asset.valuation.multiples.revenue}x</div>
                    </div>
                    <div>
                      <span className="text-slate-500">ROI Anual</span>
                      <div className="font-semibold text-green-600">
                        {((asset.financials.profit12Months / asset.price) * 100).toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-500">Payback</span>
                      <div className="font-semibold">
                        {(asset.price / asset.financials.profit12Months).toFixed(1)} anos
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700" 
                      size="lg"
                      onClick={handleMakeOffer}
                    >
                      <DollarSign className="mr-2 h-4 w-4" />
                      Fazer Oferta
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      size="lg"
                      onClick={handleContact}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Contactar Vendedor
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        onClick={handleFavorite}
                        className={isFavorited ? "text-red-600 border-red-200" : ""}
                      >
                        <Heart className={`mr-2 h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
                        {isFavorited ? 'Guardado' : 'Guardar'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleWatch}
                        className={isWatching ? "text-blue-600 border-blue-200" : ""}
                      >
                        <Eye className={`mr-2 h-4 w-4 ${isWatching ? "fill-current" : ""}`} />
                        {isWatching ? 'A seguir' : 'Seguir'}
                      </Button>
                    </div>
                  </div>

                  {/* Financing Options */}
                  {asset.financing.escrowAvailable && (
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-sm font-medium text-blue-800 mb-2">
                        💳 Opções de Financiamento
                      </div>
                      <div className="text-xs text-blue-700 space-y-1">
                        {asset.financing.escrowAvailable && <div>✓ Escrow disponível</div>}
                        {asset.financing.installmentOptions && <div>✓ Pagamento em prestações</div>}
                        {asset.financing.earnoutAvailable && <div>✓ Earnout disponível</div>}
                        <div>✓ Entrada mínima: {asset.financing.minimumDown}%</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Seller Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Informações do Vendedor
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={asset.seller.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{asset.seller.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{asset.seller.name}</span>
                        {asset.seller.verified && (
                          <Badge variant="outline" className="text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            ✓
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{asset.seller.rating}</span>
                        <span className="text-slate-400">•</span>
                        <span>{asset.seller.totalSales} vendas</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Tempo de resposta</span>
                      <span className="font-medium">{asset.seller.responseTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Localização</span>
                      <span className="font-medium">{asset.seller.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Membro desde</span>
                      <span className="font-medium">
                        {new Date(asset.seller.memberSince).toLocaleDateString("pt-PT")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Fuso horário</span>
                      <span className="font-medium">{asset.seller.timezone}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-slate-600 mb-2">Idiomas</div>
                    <div className="flex flex-wrap gap-1">
                      {asset.seller.languages.map((lang) => (
                        <Badge key={lang} variant="secondary" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Ver Perfil Completo
                  </Button>
                </CardContent>
              </Card>

              {/* Due Diligence */}
              {asset.dueDiligence.available && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Due Diligence
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Documentação verificada</span>
                    </div>
                    
                    <div className="text-sm">
                      <div className="font-medium mb-2">Documentos disponíveis:</div>
                      <div className="space-y-1">
                        {asset.dueDiligence.documents.map((doc) => (
                          <div key={doc} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-slate-500">
                      Última atualização: {new Date(asset.dueDiligence.lastUpdated).toLocaleDateString('pt-PT')}
                    </div>

                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Solicitar Acesso
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Documents */}
              {asset.documents && asset.documents.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Documentos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {asset.documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-slate-600" />
                            <div>
                              <div className="text-sm font-medium">{doc.name}</div>
                              <div className="text-xs text-slate-500">
                                {(doc.size / 1024 / 1024).toFixed(1)} MB
                              </div>
                            </div>
                          </div>
                          {doc.protected ? (
                            <Lock className="h-4 w-4 text-slate-400" />
                          ) : (
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Tráfego mensal</span>
                    <span className="font-medium">{asset.monthlyTraffic.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Receita mensal</span>
                    <span className="font-medium">€{asset.monthlyRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Idade</span>
                    <span className="font-medium">{asset.age} meses</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Categoria</span>
                    <span className="font-medium capitalize">{asset.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Última atualização</span>
                    <span className="font-medium">
                      {new Date(asset.updatedAt).toLocaleDateString('pt-PT')}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Modals */}
      
      {/* Image Modal */}
      <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{asset.title} - Galeria</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <Image
              src={asset.images[selectedImage] || "/placeholder.svg"}
              alt={`${asset.title} - Imagem ${selectedImage + 1}`}
              width={800}
              height={600}
              className="w-full h-auto rounded-lg"
            />
            <div className="flex justify-center gap-2 mt-4">
              {asset.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-3 h-3 rounded-full ${
                    selectedImage === index ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Modal */}
      <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contactar Vendedor</DialogTitle>
            <DialogDescription>
              Envie uma mensagem para {asset.seller.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="message">Sua mensagem</Label>
              <Textarea
                id="message"
                placeholder="Olá, tenho interesse no seu ativo..."
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowContactModal(false)}
              >
                Cancelar
              </Button>
              <Button 
                className="flex-1"
                onClick={handleSendMessage}
                disabled={!contactMessage.trim()}
              >
                <Send className="h-4 w-4 mr-2" />
                Enviar Mensagem
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Offer Modal */}
      <Dialog open={showOfferModal} onOpenChange={setShowOfferModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Fazer Oferta</DialogTitle>
            <DialogDescription>
              Faça uma oferta formal para {asset.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="offerAmount">Valor da Oferta (€)</Label>
              <Input
                id="offerAmount"
                type="number"
                placeholder="40000"
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
              />
              <p className="text-sm text-slate-500 mt-1">
                Preço pedido: €{asset.price.toLocaleString()}
              </p>
            </div>
            <div>
              <Label htmlFor="offerTerms">Termos da Oferta</Label>
              <Textarea
                id="offerTerms"
                placeholder="Descreva os termos da sua oferta..."
                value={offerTerms}
                onChange={(e) => setOfferTerms(e.target.value)}
                rows={3}
              />
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowOfferModal(false)}
              >
                Cancelar
              </Button>
              <Button 
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={handleSubmitOffer}
                disabled={!offerAmount || !offerTerms.trim()}
              >
                Submeter Oferta
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Report Modal */}
      <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reportar Ativo</DialogTitle>
            <DialogDescription>
              Ajude-nos a manter a qualidade da plataforma
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reportReason">Motivo</Label>
              <Select value={reportReason} onValueChange={setReportReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o motivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fake">Informações falsas</SelectItem>
                  <SelectItem value="spam">Spam</SelectItem>
                  <SelectItem value="inappropriate">Conteúdo inapropriado</SelectItem>
                  <SelectItem value="scam">Possível fraude</SelectItem>
                  <SelectItem value="other">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="reportDetails">Detalhes</Label>
              <Textarea
                id="reportDetails"
                placeholder="Descreva o problema..."
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
                rows={3}
              />
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowReportModal(false)}
              >
                Cancelar
              </Button>
              <Button 
                className="flex-1"
                onClick={handleReport}
                disabled={!reportReason || !reportDetails.trim()}
              >
                Enviar Relatório
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}