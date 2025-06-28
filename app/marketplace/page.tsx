"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, Filter, Heart, TrendingUp, Globe, Smartphone, ShoppingCart, Building,
  Star, MessageCircle, Eye, Calendar, DollarSign, Users, BarChart3, Shield,
  Grid3X3, List, SortAsc, SortDesc, Bookmark, Share2, ExternalLink,
  MapPin, Clock, Zap, Target, Award, Verified, AlertTriangle, Info,
  ChevronDown, ChevronUp, X, Plus, Minus, RefreshCw, Download,
  ThumbsUp, ThumbsDown, Flag, Settings, Bell, BellOff, Archive,
  Sparkles, TrendingDown, Activity, PieChart, LineChart, MoreHorizontal
} from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

interface Asset {
  id: string
  title: string
  description: string
  type: "website" | "ecommerce" | "app" | "saas" | "domain" | "company"
  price: number
  monthlyRevenue: number
  monthlyTraffic: number
  age: number
  verified: boolean
  featured: boolean
  trending: boolean
  premium: boolean
  images: string[]
  seller: {
    id: string
    name: string
    rating: number
    verified: boolean
    avatar?: string
    responseTime: string
    totalSales: number
    memberSince: string
    location: string
  }
  stats: {
    views: number
    favorites: number
    inquiries: number
    watchers: number
    shares: number
  }
  metrics: {
    conversionRate?: number
    growthRate: number
    profitMargin?: number
    customerCount?: number
    churnRate?: number
    ltv?: number
  }
  tags: string[]
  category: string
  subcategory?: string
  location: string
  createdAt: string
  updatedAt: string
  expiresAt?: string
  negotiable: boolean
  financing: boolean
  escrow: boolean
  dueDiligence: boolean
  aiScore: number
  riskLevel: "low" | "medium" | "high"
  opportunities: string[]
  challenges: string[]
}

const mockAssets: Asset[] = [
  {
    id: "1",
    title: "E-commerce de Moda Sustentável",
    description: "Loja online especializada em moda sustentável com mais de 5000 produtos, base de clientes fidelizada e crescimento consistente nos últimos 24 meses.",
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
      "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    seller: {
      id: "seller1",
      name: "Ana Silva",
      rating: 4.8,
      verified: true,
      avatar: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=100",
      responseTime: "< 2 horas",
      totalSales: 12,
      memberSince: "2022-03-15",
      location: "Lisboa, Portugal"
    },
    stats: {
      views: 234,
      favorites: 45,
      inquiries: 12,
      watchers: 28,
      shares: 8
    },
    metrics: {
      conversionRate: 3.2,
      growthRate: 23,
      profitMargin: 35,
      customerCount: 2400,
      churnRate: 5.2,
      ltv: 180
    },
    tags: ["Moda", "Sustentável", "E-commerce", "Dropshipping", "B2C"],
    category: "E-commerce",
    subcategory: "Moda e Acessórios",
    location: "Portugal",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T14:30:00Z",
    negotiable: true,
    financing: true,
    escrow: true,
    dueDiligence: true,
    aiScore: 8.5,
    riskLevel: "low",
    opportunities: [
      "Expansão para mercados internacionais",
      "Desenvolvimento de marca própria",
      "Implementação de programa de fidelização"
    ],
    challenges: [
      "Dependência de fornecedores externos",
      "Sazonalidade das vendas"
    ]
  },
  {
    id: "2",
    title: "App de Fitness e Nutrição",
    description: "Aplicação móvel com 10k+ downloads, sistema de treinos personalizados, acompanhamento nutricional e comunidade ativa de utilizadores.",
    type: "app",
    price: 78000,
    monthlyRevenue: 12000,
    monthlyTraffic: 0,
    age: 18,
    verified: true,
    featured: false,
    trending: false,
    premium: true,
    images: [
      "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    seller: {
      id: "seller2",
      name: "João Santos",
      rating: 4.9,
      verified: true,
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100",
      responseTime: "< 1 hora",
      totalSales: 8,
      memberSince: "2021-08-20",
      location: "Porto, Portugal"
    },
    stats: {
      views: 156,
      favorites: 32,
      inquiries: 8,
      watchers: 19,
      shares: 5
    },
    metrics: {
      growthRate: 45,
      customerCount: 8500,
      churnRate: 8.1,
      ltv: 95
    },
    tags: ["Fitness", "Saúde", "App Mobile", "Freemium", "B2C"],
    category: "Mobile App",
    subcategory: "Saúde e Fitness",
    location: "Portugal",
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-01-18T16:20:00Z",
    negotiable: false,
    financing: false,
    escrow: true,
    dueDiligence: true,
    aiScore: 7.8,
    riskLevel: "medium",
    opportunities: [
      "Monetização através de parcerias com ginásios",
      "Expansão para wearables",
      "Desenvolvimento de planos premium"
    ],
    challenges: [
      "Alta concorrência no mercado",
      "Necessidade de atualizações constantes"
    ]
  },
  {
    id: "3",
    title: "SaaS de Gestão de Projetos",
    description: "Plataforma SaaS B2B para gestão de projetos com 500+ empresas clientes, crescimento de 15% MoM e forte retenção de clientes.",
    type: "saas",
    price: 120000,
    monthlyRevenue: 18500,
    monthlyTraffic: 45000,
    age: 36,
    verified: true,
    featured: true,
    trending: true,
    premium: true,
    images: [
      "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    seller: {
      id: "seller3",
      name: "Pedro Costa",
      rating: 5.0,
      verified: true,
      avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100",
      responseTime: "< 30 min",
      totalSales: 15,
      memberSince: "2020-05-10",
      location: "Braga, Portugal"
    },
    stats: {
      views: 445,
      favorites: 89,
      inquiries: 23,
      watchers: 67,
      shares: 15
    },
    metrics: {
      conversionRate: 12.5,
      growthRate: 15,
      profitMargin: 68,
      customerCount: 520,
      churnRate: 3.2,
      ltv: 2400
    },
    tags: ["SaaS", "B2B", "Gestão", "Produtividade", "Enterprise"],
    category: "SaaS",
    subcategory: "Produtividade",
    location: "Portugal",
    createdAt: "2024-01-05T11:30:00Z",
    updatedAt: "2024-01-19T10:15:00Z",
    negotiable: true,
    financing: true,
    escrow: true,
    dueDiligence: true,
    aiScore: 9.2,
    riskLevel: "low",
    opportunities: [
      "Integração com ferramentas populares",
      "Expansão para mercado internacional",
      "Desenvolvimento de IA para automação"
    ],
    challenges: [
      "Competição com players estabelecidos",
      "Necessidade de investimento em R&D"
    ]
  },
  {
    id: "4",
    title: "Portal de Notícias Tech",
    description: "Website de notícias sobre tecnologia com 100k visitantes mensais, receita publicitária estável e audiência engajada.",
    type: "website",
    price: 35000,
    monthlyRevenue: 4200,
    monthlyTraffic: 100000,
    age: 48,
    verified: false,
    featured: false,
    trending: false,
    premium: false,
    images: [
      "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    seller: {
      id: "seller4",
      name: "Maria Oliveira",
      rating: 4.6,
      verified: false,
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
      responseTime: "< 4 horas",
      totalSales: 3,
      memberSince: "2023-02-28",
      location: "Coimbra, Portugal"
    },
    stats: {
      views: 189,
      favorites: 28,
      inquiries: 6,
      watchers: 15,
      shares: 3
    },
    metrics: {
      growthRate: 8,
      customerCount: 0
    },
    tags: ["Notícias", "Tecnologia", "Blog", "Publicidade", "Content"],
    category: "Website",
    subcategory: "Media e Conteúdo",
    location: "Portugal",
    createdAt: "2024-01-12T14:00:00Z",
    updatedAt: "2024-01-17T09:45:00Z",
    negotiable: true,
    financing: false,
    escrow: true,
    dueDiligence: false,
    aiScore: 6.9,
    riskLevel: "medium",
    opportunities: [
      "Diversificação de fontes de receita",
      "Criação de newsletter premium",
      "Parcerias com empresas tech"
    ],
    challenges: [
      "Dependência de tráfego orgânico",
      "Volatilidade da receita publicitária"
    ]
  },
  {
    id: "5",
    title: "Domínio Premium - TechStartup.pt",
    description: "Domínio premium .pt ideal para startups de tecnologia. Curto, memorável e com excelente potencial SEO para o mercado português.",
    type: "domain",
    price: 8500,
    monthlyRevenue: 0,
    monthlyTraffic: 0,
    age: 60,
    verified: true,
    featured: false,
    trending: false,
    premium: false,
    images: [
      "https://images.pexels.com/photos/6772076/pexels-photo-6772076.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    seller: {
      id: "seller5",
      name: "Carlos Ferreira",
      rating: 4.7,
      verified: true,
      avatar: "https://images.pexels.com/photos/2897883/pexels-photo-2897883.jpeg?auto=compress&cs=tinysrgb&w=100",
      responseTime: "< 6 horas",
      totalSales: 25,
      memberSince: "2019-11-05",
      location: "Aveiro, Portugal"
    },
    stats: {
      views: 67,
      favorites: 15,
      inquiries: 3,
      watchers: 8,
      shares: 2
    },
    metrics: {
      growthRate: 0
    },
    tags: ["Domínio", "Premium", ".pt", "Tech", "SEO"],
    category: "Domínio",
    subcategory: "Premium",
    location: "Portugal",
    createdAt: "2024-01-18T16:00:00Z",
    updatedAt: "2024-01-18T16:00:00Z",
    negotiable: false,
    financing: false,
    escrow: true,
    dueDiligence: false,
    aiScore: 7.5,
    riskLevel: "low",
    opportunities: [
      "Ideal para startup tech",
      "Forte potencial de branding",
      "Excelente para SEO local"
    ],
    challenges: [
      "Mercado limitado",
      "Valor subjetivo"
    ]
  },
  {
    id: "6",
    title: "Empresa de Marketing Digital",
    description: "Agência de marketing digital estabelecida com 25 clientes ativos, equipa de 8 pessoas, contratos anuais e forte reputação no mercado.",
    type: "company",
    price: 250000,
    monthlyRevenue: 35000,
    monthlyTraffic: 15000,
    age: 72,
    verified: true,
    featured: true,
    trending: false,
    premium: true,
    images: [
      "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    seller: {
      id: "seller6",
      name: "Luís Rodrigues",
      rating: 4.9,
      verified: true,
      avatar: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=100",
      responseTime: "< 1 hora",
      totalSales: 6,
      memberSince: "2018-07-12",
      location: "Lisboa, Portugal"
    },
    stats: {
      views: 312,
      favorites: 67,
      inquiries: 18,
      watchers: 45,
      shares: 12
    },
    metrics: {
      growthRate: 18,
      profitMargin: 42,
      customerCount: 25
    },
    tags: ["Marketing", "Agência", "B2B", "Serviços", "Digital"],
    category: "Empresa",
    subcategory: "Serviços",
    location: "Portugal",
    createdAt: "2024-01-08T13:20:00Z",
    updatedAt: "2024-01-20T11:30:00Z",
    negotiable: true,
    financing: true,
    escrow: true,
    dueDiligence: true,
    aiScore: 8.8,
    riskLevel: "low",
    opportunities: [
      "Expansão de serviços",
      "Automatização de processos",
      "Crescimento da equipa"
    ],
    challenges: [
      "Dependência de clientes chave",
      "Competição crescente"
    ]
  },
]

export default function MarketplacePage() {
  const { user, isAuthenticated } = useAuth()
  const [assets, setAssets] = useState<Asset[]>(mockAssets)
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>(mockAssets)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [priceRange, setPriceRange] = useState([0, 300000])
  const [revenueRange, setRevenueRange] = useState([0, 50000])
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [savedAssets, setSavedAssets] = useState<string[]>([])
  const [watchedAssets, setWatchedAssets] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({
    verified: false,
    featured: false,
    trending: false,
    premium: false,
    negotiable: false,
    financing: false,
    escrow: false,
    dueDiligence: false,
    riskLevel: "all",
    aiScoreMin: 0,
    ageRange: [0, 120],
    location: "all"
  })
  const [compareList, setCompareList] = useState<string[]>([])
  const [showCompare, setShowCompare] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let filtered = assets

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (asset) =>
          asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          asset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          asset.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
          asset.seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          asset.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Type filter
    if (selectedType !== "all") {
      filtered = filtered.filter((asset) => asset.type === selectedType)
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((asset) => asset.category === selectedCategory)
    }

    // Price filter
    filtered = filtered.filter((asset) => asset.price >= priceRange[0] && asset.price <= priceRange[1])

    // Revenue filter
    filtered = filtered.filter((asset) => asset.monthlyRevenue >= revenueRange[0] && asset.monthlyRevenue <= revenueRange[1])

    // Advanced filters
    if (selectedFilters.verified) {
      filtered = filtered.filter((asset) => asset.verified)
    }
    if (selectedFilters.featured) {
      filtered = filtered.filter((asset) => asset.featured)
    }
    if (selectedFilters.trending) {
      filtered = filtered.filter((asset) => asset.trending)
    }
    if (selectedFilters.premium) {
      filtered = filtered.filter((asset) => asset.premium)
    }
    if (selectedFilters.negotiable) {
      filtered = filtered.filter((asset) => asset.negotiable)
    }
    if (selectedFilters.financing) {
      filtered = filtered.filter((asset) => asset.financing)
    }
    if (selectedFilters.escrow) {
      filtered = filtered.filter((asset) => asset.escrow)
    }
    if (selectedFilters.dueDiligence) {
      filtered = filtered.filter((asset) => asset.dueDiligence)
    }
    if (selectedFilters.riskLevel !== "all") {
      filtered = filtered.filter((asset) => asset.riskLevel === selectedFilters.riskLevel)
    }
    if (selectedFilters.aiScoreMin > 0) {
      filtered = filtered.filter((asset) => asset.aiScore >= selectedFilters.aiScoreMin)
    }
    if (selectedFilters.location !== "all") {
      filtered = filtered.filter((asset) => asset.location === selectedFilters.location)
    }

    // Age filter
    filtered = filtered.filter((asset) => 
      asset.age >= selectedFilters.ageRange[0] && asset.age <= selectedFilters.ageRange[1]
    )

    // Tab filter
    if (activeTab === "saved") {
      filtered = filtered.filter((asset) => savedAssets.includes(asset.id))
    } else if (activeTab === "watched") {
      filtered = filtered.filter((asset) => watchedAssets.includes(asset.id))
    } else if (activeTab === "trending") {
      filtered = filtered.filter((asset) => asset.trending)
    } else if (activeTab === "premium") {
      filtered = filtered.filter((asset) => asset.premium)
    }

    // Sort
    switch (sortBy) {
      case "featured":
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          if (a.trending && !b.trending) return -1
          if (!a.trending && b.trending) return 1
          return b.stats.views - a.stats.views
        })
        break
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "revenue-high":
        filtered.sort((a, b) => b.monthlyRevenue - a.monthlyRevenue)
        break
      case "revenue-low":
        filtered.sort((a, b) => a.monthlyRevenue - b.monthlyRevenue)
        break
      case "traffic":
        filtered.sort((a, b) => b.monthlyTraffic - a.monthlyTraffic)
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      case "ai-score":
        filtered.sort((a, b) => b.aiScore - a.aiScore)
        break
      case "popularity":
        filtered.sort((a, b) => (b.stats.views + b.stats.favorites + b.stats.inquiries) - (a.stats.views + a.stats.favorites + a.stats.inquiries))
        break
    }

    setFilteredAssets(filtered)
  }, [assets, searchTerm, selectedType, selectedCategory, priceRange, revenueRange, sortBy, selectedFilters, activeTab, savedAssets, watchedAssets])

  const handleSaveAsset = (assetId: string) => {
    if (!isAuthenticated) {
      toast.error("Faça login para guardar ativos")
      return
    }

    setSavedAssets(prev => {
      const newSaved = prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
      
      toast.success(
        prev.includes(assetId) ? "Ativo removido dos guardados" : "Ativo guardado com sucesso"
      )
      
      return newSaved
    })
  }

  const handleWatchAsset = (assetId: string) => {
    if (!isAuthenticated) {
      toast.error("Faça login para seguir ativos")
      return
    }

    setWatchedAssets(prev => {
      const newWatched = prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
      
      toast.success(
        prev.includes(assetId) ? "Deixou de seguir o ativo" : "A seguir ativo - receberá notificações"
      )
      
      return newWatched
    })
  }

  const handleCompareToggle = (assetId: string) => {
    setCompareList(prev => {
      if (prev.includes(assetId)) {
        return prev.filter(id => id !== assetId)
      } else if (prev.length < 3) {
        return [...prev, assetId]
      } else {
        toast.error("Máximo de 3 ativos para comparação")
        return prev
      }
    })
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedType("all")
    setSelectedCategory("all")
    setPriceRange([0, 300000])
    setRevenueRange([0, 50000])
    setSelectedFilters({
      verified: false,
      featured: false,
      trending: false,
      premium: false,
      negotiable: false,
      financing: false,
      escrow: false,
      dueDiligence: false,
      riskLevel: "all",
      aiScoreMin: 0,
      ageRange: [0, 120],
      location: "all"
    })
    setActiveTab("all")
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "website": return <Globe className="h-4 w-4" />
      case "ecommerce": return <ShoppingCart className="h-4 w-4" />
      case "app": return <Smartphone className="h-4 w-4" />
      case "saas": return <TrendingUp className="h-4 w-4" />
      case "domain": return <Globe className="h-4 w-4" />
      case "company": return <Building className="h-4 w-4" />
      default: return <Globe className="h-4 w-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "website": return "Website"
      case "ecommerce": return "E-commerce"
      case "app": return "App Mobile"
      case "saas": return "SaaS"
      case "domain": return "Domínio"
      case "company": return "Empresa"
      default: return "Outro"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "text-green-600 bg-green-100"
      case "medium": return "text-yellow-600 bg-yellow-100"
      case "high": return "text-red-600 bg-red-100"
      default: return "text-slate-600 bg-slate-100"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const AssetCard = ({ asset, index }: { asset: Asset; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group"
    >
      <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group-hover:-translate-y-1 relative overflow-hidden">
        {/* Premium Badge */}
        {asset.premium && (
          <div className="absolute top-2 left-2 z-10">
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <Sparkles className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          </div>
        )}

        {/* Image Gallery */}
        <div className="relative">
          <div className="aspect-video overflow-hidden">
            <img
              src={asset.images[0] || "/placeholder.svg"}
              alt={asset.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Overlay Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {asset.featured && (
              <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">
                <Star className="h-3 w-3 mr-1" />
                Destaque
              </Badge>
            )}
            {asset.trending && (
              <Badge className="bg-red-500 hover:bg-red-600 text-white">
                <TrendingUp className="h-3 w-3 mr-1" />
                Trending
              </Badge>
            )}
            {asset.verified && (
              <Badge className="bg-green-500 hover:bg-green-600 text-white">
                <Verified className="h-3 w-3 mr-1" />
                Verificado
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white"
              onClick={(e) => {
                e.preventDefault()
                handleSaveAsset(asset.id)
              }}
            >
              <Heart className={`h-4 w-4 ${savedAssets.includes(asset.id) ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white"
              onClick={(e) => {
                e.preventDefault()
                handleWatchAsset(asset.id)
              }}
            >
              <Eye className={`h-4 w-4 ${watchedAssets.includes(asset.id) ? 'text-blue-500' : ''}`} />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white"
              onClick={(e) => {
                e.preventDefault()
                navigator.share?.({
                  title: asset.title,
                  text: asset.description,
                  url: window.location.href + '/' + asset.id
                }) || toast.success("Link copiado!")
              }}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* AI Score */}
          <div className="absolute bottom-3 left-3">
            <Badge className={`${
              asset.aiScore >= 8.5 ? 'bg-green-600' :
              asset.aiScore >= 7 ? 'bg-blue-600' :
              asset.aiScore >= 5 ? 'bg-yellow-600' : 'bg-red-600'
            } text-white`}>
              <Zap className="h-3 w-3 mr-1" />
              AI {asset.aiScore}/10
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 mb-2">
            {getTypeIcon(asset.type)}
            <Badge variant="secondary">{getTypeLabel(asset.type)}</Badge>
            <Badge variant="outline" className={getRiskColor(asset.riskLevel)}>
              {asset.riskLevel === 'low' ? 'Baixo Risco' : 
               asset.riskLevel === 'medium' ? 'Risco Médio' : 'Alto Risco'}
            </Badge>
          </div>

          <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
            {asset.title}
          </CardTitle>

          <CardDescription className="line-clamp-2">{asset.description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Price and Revenue */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(asset.price)}</div>
              {asset.negotiable && (
                <div className="text-xs text-slate-500">Negociável</div>
              )}
            </div>
            {asset.monthlyRevenue > 0 && (
              <div className="text-right">
                <div className="text-sm font-semibold">{formatCurrency(asset.monthlyRevenue)}/mês</div>
                <div className="text-xs text-slate-500">Receita</div>
              </div>
            )}
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {asset.monthlyTraffic > 0 && (
              <div>
                <span className="text-slate-500">Tráfego/mês</span>
                <div className="font-semibold">{formatNumber(asset.monthlyTraffic)}</div>
              </div>
            )}
            
            {asset.metrics.growthRate > 0 && (
              <div>
                <span className="text-slate-500">Crescimento</span>
                <div className="font-semibold text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{asset.metrics.growthRate}%
                </div>
              </div>
            )}

            <div>
              <span className="text-slate-500">Idade</span>
              <div className="font-semibold">{asset.age} meses</div>
            </div>

            <div>
              <span className="text-slate-500">Visualizações</span>
              <div className="font-semibold">{asset.stats.views}</div>
            </div>
          </div>

          {/* Additional Metrics */}
          {(asset.metrics.conversionRate || asset.metrics.customerCount) && (
            <div className="grid grid-cols-2 gap-4 text-sm pt-2 border-t">
              {asset.metrics.conversionRate && (
                <div>
                  <span className="text-slate-500">Conversão</span>
                  <div className="font-semibold">{asset.metrics.conversionRate}%</div>
                </div>
              )}
              {asset.metrics.customerCount && (
                <div>
                  <span className="text-slate-500">Clientes</span>
                  <div className="font-semibold">{formatNumber(asset.metrics.customerCount)}</div>
                </div>
              )}
            </div>
          )}

          {/* Seller Info */}
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={asset.seller.avatar} />
                <AvatarFallback className="text-xs">{asset.seller.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{asset.seller.name}</span>
              {asset.seller.verified && (
                <Badge variant="outline" className="text-xs h-4">
                  <Verified className="h-2 w-2 mr-1" />
                  ✓
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">{asset.seller.rating}</span>
              <span className="text-xs text-slate-500">({asset.seller.totalSales})</span>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-1">
            {asset.financing && (
              <Badge variant="outline" className="text-xs">
                <DollarSign className="h-2 w-2 mr-1" />
                Financiamento
              </Badge>
            )}
            {asset.escrow && (
              <Badge variant="outline" className="text-xs">
                <Shield className="h-2 w-2 mr-1" />
                Escrow
              </Badge>
            )}
            {asset.dueDiligence && (
              <Badge variant="outline" className="text-xs">
                <BarChart3 className="h-2 w-2 mr-1" />
                Due Diligence
              </Badge>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {asset.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {asset.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{asset.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {asset.stats.views}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                {asset.stats.favorites}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="h-3 w-3" />
                {asset.stats.inquiries}
              </span>
            </div>
            <span>
              {formatDistanceToNow(new Date(asset.createdAt), {
                addSuffix: true,
                locale: ptBR
              })}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button className="flex-1" asChild>
              <Link href={`/marketplace/${asset.id}`}>Ver Detalhes</Link>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => {
                e.preventDefault()
                handleCompareToggle(asset.id)
              }}
              className={compareList.includes(asset.id) ? 'bg-blue-50 border-blue-200' : ''}
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/messages?asset=${asset.id}`}>
                <MessageCircle className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Marketplace de Ativos Digitais</h1>
                <p className="text-slate-600">
                  Descubra oportunidades únicas de investimento em ativos digitais verificados
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Alertas
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-2xl font-bold text-blue-600">{assets.length}</div>
                <div className="text-sm text-slate-600">Ativos Disponíveis</div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(assets.reduce((sum, asset) => sum + asset.monthlyRevenue, 0))}
                </div>
                <div className="text-sm text-slate-600">Receita Total/Mês</div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-2xl font-bold text-purple-600">
                  {assets.filter(a => a.verified).length}
                </div>
                <div className="text-sm text-slate-600">Ativos Verificados</div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-2xl font-bold text-amber-600">
                  {(assets.reduce((sum, asset) => sum + asset.aiScore, 0) / assets.length).toFixed(1)}
                </div>
                <div className="text-sm text-slate-600">Score AI Médio</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-none lg:flex">
              <TabsTrigger value="all">
                Todos ({assets.length})
              </TabsTrigger>
              <TabsTrigger value="trending">
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending ({assets.filter(a => a.trending).length})
              </TabsTrigger>
              <TabsTrigger value="premium">
                <Sparkles className="h-4 w-4 mr-2" />
                Premium ({assets.filter(a => a.premium).length})
              </TabsTrigger>
              {isAuthenticated && (
                <>
                  <TabsTrigger value="saved">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Guardados ({savedAssets.length})
                  </TabsTrigger>
                  <TabsTrigger value="watched">
                    <Eye className="h-4 w-4 mr-2" />
                    A Seguir ({watchedAssets.length})
                  </TabsTrigger>
                </>
              )}
            </TabsList>
          </Tabs>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    ref={searchInputRef}
                    placeholder="Pesquisar ativos, categorias, vendedores..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  {searchTerm && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1 h-8 w-8 p-0"
                      onClick={() => setSearchTerm("")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Quick Filters */}
              <div className="flex gap-2 flex-wrap">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="app">App Mobile</SelectItem>
                    <SelectItem value="saas">SaaS</SelectItem>
                    <SelectItem value="domain">Domínio</SelectItem>
                    <SelectItem value="company">Empresa</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Em destaque</SelectItem>
                    <SelectItem value="newest">Mais recentes</SelectItem>
                    <SelectItem value="oldest">Mais antigos</SelectItem>
                    <SelectItem value="price-low">Preço: menor</SelectItem>
                    <SelectItem value="price-high">Preço: maior</SelectItem>
                    <SelectItem value="revenue-high">Receita: maior</SelectItem>
                    <SelectItem value="revenue-low">Receita: menor</SelectItem>
                    <SelectItem value="traffic">Tráfego</SelectItem>
                    <SelectItem value="ai-score">Score AI</SelectItem>
                    <SelectItem value="popularity">Popularidade</SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                  className={showFilters ? 'bg-blue-50 border-blue-200' : ''}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                  {Object.values(selectedFilters).some(v => v !== false && v !== "all" && v !== 0 && !Array.isArray(v)) && (
                    <Badge className="ml-2 h-4 w-4 p-0 text-xs">!</Badge>
                  )}
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? 'bg-slate-100' : ''}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? 'bg-slate-100' : ''}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Advanced Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t space-y-6">
                    {/* Price and Revenue Ranges */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          Faixa de Preço: {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                        </Label>
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          max={300000}
                          step={5000}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          Receita Mensal: {formatCurrency(revenueRange[0])} - {formatCurrency(revenueRange[1])}
                        </Label>
                        <Slider
                          value={revenueRange}
                          onValueChange={setRevenueRange}
                          max={50000}
                          step={1000}
                          className="w-full"
                        />
                      </div>
                    </div>

                    {/* Boolean Filters */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="verified"
                          checked={selectedFilters.verified}
                          onCheckedChange={(checked) => 
                            setSelectedFilters(prev => ({ ...prev, verified: checked as boolean }))
                          }
                        />
                        <Label htmlFor="verified" className="text-sm">Verificados</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="featured"
                          checked={selectedFilters.featured}
                          onCheckedChange={(checked) => 
                            setSelectedFilters(prev => ({ ...prev, featured: checked as boolean }))
                          }
                        />
                        <Label htmlFor="featured" className="text-sm">Em Destaque</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="trending"
                          checked={selectedFilters.trending}
                          onCheckedChange={(checked) => 
                            setSelectedFilters(prev => ({ ...prev, trending: checked as boolean }))
                          }
                        />
                        <Label htmlFor="trending" className="text-sm">Trending</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="premium"
                          checked={selectedFilters.premium}
                          onCheckedChange={(checked) => 
                            setSelectedFilters(prev => ({ ...prev, premium: checked as boolean }))
                          }
                        />
                        <Label htmlFor="premium" className="text-sm">Premium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="negotiable"
                          checked={selectedFilters.negotiable}
                          onCheckedChange={(checked) => 
                            setSelectedFilters(prev => ({ ...prev, negotiable: checked as boolean }))
                          }
                        />
                        <Label htmlFor="negotiable" className="text-sm">Negociável</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="financing"
                          checked={selectedFilters.financing}
                          onCheckedChange={(checked) => 
                            setSelectedFilters(prev => ({ ...prev, financing: checked as boolean }))
                          }
                        />
                        <Label htmlFor="financing" className="text-sm">Financiamento</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="escrow"
                          checked={selectedFilters.escrow}
                          onCheckedChange={(checked) => 
                            setSelectedFilters(prev => ({ ...prev, escrow: checked as boolean }))
                          }
                        />
                        <Label htmlFor="escrow" className="text-sm">Escrow</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="dueDiligence"
                          checked={selectedFilters.dueDiligence}
                          onCheckedChange={(checked) => 
                            setSelectedFilters(prev => ({ ...prev, dueDiligence: checked as boolean }))
                          }
                        />
                        <Label htmlFor="dueDiligence" className="text-sm">Due Diligence</Label>
                      </div>
                    </div>

                    {/* Advanced Options */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                      className="flex items-center gap-2"
                    >
                      {showAdvancedFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      Filtros Avançados
                    </Button>

                    <AnimatePresence>
                      {showAdvancedFilters && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden"
                        >
                          <div>
                            <Label className="text-sm font-medium mb-2 block">Nível de Risco</Label>
                            <Select 
                              value={selectedFilters.riskLevel} 
                              onValueChange={(value) => 
                                setSelectedFilters(prev => ({ ...prev, riskLevel: value }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="low">Baixo Risco</SelectItem>
                                <SelectItem value="medium">Risco Médio</SelectItem>
                                <SelectItem value="high">Alto Risco</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label className="text-sm font-medium mb-2 block">
                              Score AI Mínimo: {selectedFilters.aiScoreMin}/10
                            </Label>
                            <Slider
                              value={[selectedFilters.aiScoreMin]}
                              onValueChange={(value) => 
                                setSelectedFilters(prev => ({ ...prev, aiScoreMin: value[0] }))
                              }
                              max={10}
                              step={0.5}
                              className="w-full"
                            />
                          </div>

                          <div>
                            <Label className="text-sm font-medium mb-2 block">
                              Idade: {selectedFilters.ageRange[0]} - {selectedFilters.ageRange[1]} meses
                            </Label>
                            <Slider
                              value={selectedFilters.ageRange}
                              onValueChange={(value) => 
                                setSelectedFilters(prev => ({ ...prev, ageRange: value }))
                              }
                              max={120}
                              step={6}
                              className="w-full"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Clear Filters */}
                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="text-sm text-slate-600">
                        {filteredAssets.length} {filteredAssets.length === 1 ? 'ativo encontrado' : 'ativos encontrados'}
                      </div>
                      <Button variant="outline" size="sm" onClick={clearAllFilters}>
                        <X className="h-4 w-4 mr-2" />
                        Limpar Filtros
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Compare Bar */}
          <AnimatePresence>
            {compareList.length > 0 && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-4 left-4 right-4 z-50"
              >
                <div className="max-w-7xl mx-auto">
                  <Card className="bg-blue-600 text-white border-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <BarChart3 className="h-5 w-5" />
                          <span className="font-medium">
                            {compareList.length} ativo{compareList.length > 1 ? 's' : ''} selecionado{compareList.length > 1 ? 's' : ''} para comparação
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="secondary" 
                            size="sm"
                            disabled={compareList.length < 2}
                          >
                            Comparar
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setCompareList([])}
                            className="text-white hover:bg-white/20"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-video bg-slate-200 rounded-t-lg" />
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="h-4 bg-slate-200 rounded w-3/4" />
                      <div className="h-3 bg-slate-200 rounded w-full" />
                      <div className="h-3 bg-slate-200 rounded w-2/3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredAssets.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Nenhum ativo encontrado</h3>
              <p className="text-slate-600 mb-6">Tente ajustar os filtros ou termos de pesquisa</p>
              <Button onClick={clearAllFilters}>
                Limpar Filtros
              </Button>
            </div>
          ) : (
            <>
              {/* Assets Grid/List */}
              <div className={viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                : "space-y-4"
              }>
                {filteredAssets.map((asset, index) => (
                  <AssetCard key={asset.id} asset={asset} index={index} />
                ))}
              </div>

              {/* Load More */}
              {filteredAssets.length > 0 && filteredAssets.length >= 12 && (
                <div className="text-center mt-12">
                  <Button variant="outline" size="lg" onClick={() => setIsLoading(true)}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Carregar Mais Ativos
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}