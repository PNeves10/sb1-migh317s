"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Filter,
  TrendingUp,
  Globe,
  Smartphone,
  ShoppingCart,
  Building,
  Star,
  Heart,
  MessageCircle,
  Eye,
  MoreVertical,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  Zap,
  CheckCircle,
  DollarSign,
  Users,
  Calendar,
  MapPin,
  ArrowUpRight,
  Bookmark,
  Share2,
  ExternalLink
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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
  images: string[]
  seller: {
    name: string
    rating: number
    verified: boolean
    avatar?: string
  }
  stats: {
    views: number
    favorites: number
    inquiries: number
  }
  tags: string[]
  listedAt: string
  category: string
  location?: string
  growth?: number
  roi?: number
}

export default function MarketplacePage() {
  const { toast } = useToast()
  const [assets, setAssets] = useState<Asset[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000])
  const [revenueRange, setRevenueRange] = useState<[number, number]>([0, 50000])
  const [sortBy, setSortBy] = useState("recent")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])

  // Enhanced mock data
  const mockAssets: Asset[] = [
    {
      id: "1",
      title: "E-commerce de Moda Sustentável",
      description: "Loja online especializada em moda sustentável com mais de 5000 produtos e base de clientes fidelizada. Crescimento consistente nos últimos 12 meses.",
      type: "ecommerce",
      category: "Fashion",
      price: 45000,
      monthlyRevenue: 8500,
      monthlyTraffic: 25000,
      age: 24,
      verified: true,
      featured: true,
      images: ["https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=300"],
      seller: {
        name: "Ana Silva",
        rating: 4.8,
        verified: true,
        avatar: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=50"
      },
      stats: {
        views: 234,
        favorites: 45,
        inquiries: 12,
      },
      tags: ["Moda", "Sustentável", "E-commerce", "Dropshipping"],
      listedAt: "2024-01-20T10:00:00Z",
      location: "Portugal",
      growth: 23,
      roi: 18.5
    },
    {
      id: "2",
      title: "SaaS de Gestão de Projetos",
      description: "Plataforma SaaS B2B para gestão de projetos com 500+ empresas clientes e crescimento de 40% YoY.",
      type: "saas",
      category: "Productivity",
      price: 120000,
      monthlyRevenue: 18500,
      monthlyTraffic: 45000,
      age: 36,
      verified: true,
      featured: true,
      images: ["https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300"],
      seller: {
        name: "Pedro Costa",
        rating: 5.0,
        verified: true,
        avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50"
      },
      stats: {
        views: 445,
        favorites: 89,
        inquiries: 23,
      },
      tags: ["SaaS", "B2B", "Gestão", "Produtividade"],
      listedAt: "2024-01-18T14:30:00Z",
      location: "Brasil",
      growth: 40,
      roi: 25.2
    },
    {
      id: "3",
      title: "App de Fitness e Nutrição",
      description: "Aplicação móvel com 10k+ downloads, sistema de treinos personalizados e planos de nutrição com IA.",
      type: "app",
      category: "Health",
      price: 78000,
      monthlyRevenue: 12000,
      monthlyTraffic: 0,
      age: 18,
      verified: true,
      featured: false,
      images: ["https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=300"],
      seller: {
        name: "João Santos",
        rating: 4.9,
        verified: true,
        avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=50"
      },
      stats: {
        views: 156,
        favorites: 32,
        inquiries: 8,
      },
      tags: ["Fitness", "Saúde", "App Mobile", "Freemium"],
      listedAt: "2024-01-15T09:15:00Z",
      location: "Espanha",
      growth: 15,
      roi: 12.8
    },
    {
      id: "4",
      title: "Blog de Tecnologia Premium",
      description: "Blog especializado em tecnologia com 100k+ visitantes mensais e monetização através de afiliados e publicidade.",
      type: "website",
      category: "Content",
      price: 32000,
      monthlyRevenue: 4200,
      monthlyTraffic: 120000,
      age: 48,
      verified: true,
      featured: false,
      images: ["https://images.pexels.com/photos/6772076/pexels-photo-6772076.jpeg?auto=compress&cs=tinysrgb&w=300"],
      seller: {
        name: "Maria Fernandes",
        rating: 4.7,
        verified: true,
        avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50"
      },
      stats: {
        views: 89,
        favorites: 21,
        inquiries: 5,
      },
      tags: ["Blog", "Tecnologia", "Afiliados", "SEO"],
      listedAt: "2024-01-12T16:45:00Z",
      location: "Portugal",
      growth: 8,
      roi: 15.6
    },
    {
      id: "5",
      title: "Marketplace de Artesanato",
      description: "Plataforma de marketplace para artesãos locais com sistema de pagamentos integrado e 2000+ vendedores ativos.",
      type: "ecommerce",
      category: "Marketplace",
      price: 95000,
      monthlyRevenue: 15000,
      monthlyTraffic: 65000,
      age: 30,
      verified: true,
      featured: true,
      images: ["https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=300"],
      seller: {
        name: "Carlos Mendes",
        rating: 4.6,
        verified: true,
        avatar: "https://images.pexels.com/photos/2897883/pexels-photo-2897883.jpeg?auto=compress&cs=tinysrgb&w=50"
      },
      stats: {
        views: 312,
        favorites: 67,
        inquiries: 18,
      },
      tags: ["Marketplace", "Artesanato", "Comissões", "Multi-vendor"],
      listedAt: "2024-01-10T11:20:00Z",
      location: "Brasil",
      growth: 28,
      roi: 19.3
    },
    {
      id: "6",
      title: "SaaS de Email Marketing",
      description: "Ferramenta completa de email marketing com automação, templates e analytics avançados. 5000+ utilizadores ativos.",
      type: "saas",
      category: "Marketing",
      price: 150000,
      monthlyRevenue: 22000,
      monthlyTraffic: 35000,
      age: 42,
      verified: true,
      featured: false,
      images: ["https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=300"],
      seller: {
        name: "Sofia Rodrigues",
        rating: 4.9,
        verified: true,
        avatar: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=50"
      },
      stats: {
        views: 523,
        favorites: 98,
        inquiries: 31,
      },
      tags: ["Email Marketing", "Automação", "SaaS", "B2B"],
      listedAt: "2024-01-08T13:30:00Z",
      location: "Portugal",
      growth: 35,
      roi: 22.1
    }
  ]

  useEffect(() => {
    const fetchAssets = async () => {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setAssets(mockAssets)
      setIsLoading(false)
    }

    fetchAssets()
  }, [])

  // Memoized filtered and sorted assets
  const filteredAssets = useMemo(() => {
    let filtered = assets

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (asset) =>
          asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          asset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          asset.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
          asset.seller.name.toLowerCase().includes(searchTerm.toLowerCase())
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

    // Price range filter
    filtered = filtered.filter(
      (asset) => asset.price >= priceRange[0] && asset.price <= priceRange[1]
    )

    // Revenue range filter
    filtered = filtered.filter(
      (asset) => asset.monthlyRevenue >= revenueRange[0] && asset.monthlyRevenue <= revenueRange[1]
    )

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case "recent":
          comparison = new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime()
          break
        case "price":
          comparison = a.price - b.price
          break
        case "revenue":
          comparison = a.monthlyRevenue - b.monthlyRevenue
          break
        case "alphabetical":
          comparison = a.title.localeCompare(b.title)
          break
        case "rating":
          comparison = a.seller.rating - b.seller.rating
          break
        case "views":
          comparison = a.stats.views - b.stats.views
          break
        case "growth":
          comparison = (a.growth || 0) - (b.growth || 0)
          break
      }

      return sortOrder === "desc" ? -comparison : comparison
    })

    return filtered
  }, [assets, searchTerm, selectedType, selectedCategory, sortBy, sortOrder, priceRange, revenueRange])

  const toggleFavorite = (assetId: string) => {
    setFavorites(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    )
    
    const isFavorited = favorites.includes(assetId)
    toast({
      title: isFavorited ? "Removido dos favoritos" : "Adicionado aos favoritos",
      description: isFavorited ? "O ativo foi removido da sua lista de favoritos" : "O ativo foi adicionado à sua lista de favoritos",
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "website":
        return <Globe className="h-4 w-4" />
      case "ecommerce":
        return <ShoppingCart className="h-4 w-4" />
      case "app":
        return <Smartphone className="h-4 w-4" />
      case "saas":
        return <TrendingUp className="h-4 w-4" />
      case "domain":
        return <Globe className="h-4 w-4" />
      case "company":
        return <Building className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "website":
        return "Website"
      case "ecommerce":
        return "E-commerce"
      case "app":
        return "App Mobile"
      case "saas":
        return "SaaS"
      case "domain":
        return "Domínio"
      case "company":
        return "Empresa"
      default:
        return "Outro"
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Marketplace Digital</h1>
            <p className="text-slate-600">Descubra e adquira ativos digitais verificados</p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Main Search and View Controls */}
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Pesquisar ativos digitais..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center gap-2"
                    >
                      <Filter className="h-4 w-4" />
                      Filtros
                      {showFilters && <Badge variant="secondary" className="ml-1">Ativo</Badge>}
                    </Button>

                    <div className="flex items-center border rounded-lg">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="rounded-r-none"
                      >
                        <Grid3X3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="rounded-l-none"
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
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
                        <Select value={selectedType} onValueChange={setSelectedType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Tipo de ativo" />
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

                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                          <SelectTrigger>
                            <SelectValue placeholder="Categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todas as categorias</SelectItem>
                            <SelectItem value="Fashion">Moda</SelectItem>
                            <SelectItem value="Productivity">Produtividade</SelectItem>
                            <SelectItem value="Health">Saúde</SelectItem>
                            <SelectItem value="Content">Conteúdo</SelectItem>
                            <SelectItem value="Technology">Tecnologia</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Marketplace">Marketplace</SelectItem>
                          </SelectContent>
                        </Select>

                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger>
                            <SelectValue placeholder="Ordenar por" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="recent">Mais recentes</SelectItem>
                            <SelectItem value="alphabetical">Alfabética</SelectItem>
                            <SelectItem value="price">Preço</SelectItem>
                            <SelectItem value="revenue">Receita</SelectItem>
                            <SelectItem value="rating">Avaliação</SelectItem>
                            <SelectItem value="views">Visualizações</SelectItem>
                            <SelectItem value="growth">Crescimento</SelectItem>
                          </SelectContent>
                        </Select>

                        <Button
                          variant="outline"
                          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                          className="flex items-center gap-2"
                        >
                          {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                          {sortOrder === "asc" ? "Crescente" : "Decrescente"}
                        </Button>
                      </div>

                      {/* Price and Revenue Range Filters */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Faixa de Preço: €{priceRange[0].toLocaleString()} - €{priceRange[1].toLocaleString()}</label>
                          <Slider
                            value={priceRange}
                            onValueChange={(value) => setPriceRange(value as [number, number])}
                            max={500000}
                            min={0}
                            step={5000}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Receita Mensal: €{revenueRange[0].toLocaleString()} - €{revenueRange[1].toLocaleString()}</label>
                          <Slider
                            value={revenueRange}
                            onValueChange={(value) => setRevenueRange(value as [number, number])}
                            max={50000}
                            min={0}
                            step={1000}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-slate-600">
              {filteredAssets.length} {filteredAssets.length === 1 ? "ativo encontrado" : "ativos encontrados"}
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="w-full h-48 bg-slate-200 rounded-t-lg"></div>
                  <CardHeader>
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-200 rounded"></div>
                      <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Assets Display */}
          {!isLoading && filteredAssets.length > 0 && (
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
              <AnimatePresence>
                {filteredAssets.map((asset, index) => (
                  <motion.div
                    key={asset.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className={`hover:shadow-xl transition-all duration-300 group relative ${viewMode === "list" ? "flex" : ""}`}>
                      <div className={`relative ${viewMode === "list" ? "w-64 flex-shrink-0" : ""}`}>
                        <Image
                          src={asset.images[0] || "/placeholder.svg"}
                          alt={asset.title}
                          width={300}
                          height={200}
                          className={`object-cover ${viewMode === "list" ? "w-full h-full" : "w-full h-48"} ${viewMode === "grid" ? "rounded-t-lg" : "rounded-l-lg"}`}
                        />

                        {/* Badges */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2">
                          {asset.featured && (
                            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg">
                              ⭐ Destaque
                            </Badge>
                          )}
                          {asset.verified && (
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verificado
                            </Badge>
                          )}
                        </div>

                        {/* Favorite Button */}
                        <Button
                          size="sm"
                          variant="secondary"
                          className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          onClick={(e) => {
                            e.preventDefault()
                            toggleFavorite(asset.id)
                          }}
                        >
                          <Heart className={`h-4 w-4 ${favorites.includes(asset.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        </Button>

                        {/* Growth Indicator */}
                        {asset.growth && (
                          <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            <span className="text-green-400">+{asset.growth}%</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getTypeIcon(asset.type)}
                              <Badge variant="secondary">{getTypeLabel(asset.type)}</Badge>
                              <Badge variant="outline" className="text-xs">{asset.category}</Badge>
                            </div>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem asChild>
                                  <Link href={`/marketplace/${asset.id}`}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    Ver Detalhes
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleFavorite(asset.id)}>
                                  <Heart className="h-4 w-4 mr-2" />
                                  {favorites.includes(asset.id) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share2 className="h-4 w-4 mr-2" />
                                  Partilhar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                            <Link href={`/marketplace/${asset.id}`} className="flex items-center gap-2">
                              {asset.title}
                              <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          </CardTitle>

                          <CardDescription className="line-clamp-2">{asset.description}</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          {/* Price Display */}
                          <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold text-emerald-600">
                              €{asset.price.toLocaleString()}
                            </div>
                            {asset.roi && (
                              <Badge variant="outline" className="text-green-600 border-green-200">
                                ROI: {asset.roi}%
                              </Badge>
                            )}
                          </div>

                          {/* Metrics Grid */}
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            {asset.monthlyRevenue > 0 && (
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-3 w-3 text-green-500" />
                                <div>
                                  <span className="text-slate-500 block text-xs">Receita/mês</span>
                                  <div className="font-semibold">€{asset.monthlyRevenue.toLocaleString()}</div>
                                </div>
                              </div>
                            )}

                            {asset.monthlyTraffic > 0 && (
                              <div className="flex items-center gap-2">
                                <Users className="h-3 w-3 text-blue-500" />
                                <div>
                                  <span className="text-slate-500 block text-xs">Tráfego/mês</span>
                                  <div className="font-semibold">{asset.monthlyTraffic.toLocaleString()}</div>
                                </div>
                              </div>
                            )}

                            <div className="flex items-center gap-2">
                              <Calendar className="h-3 w-3 text-purple-500" />
                              <div>
                                <span className="text-slate-500 block text-xs">Idade</span>
                                <div className="font-semibold">{asset.age} meses</div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Eye className="h-3 w-3 text-orange-500" />
                              <div>
                                <span className="text-slate-500 block text-xs">Visualizações</span>
                                <div className="font-semibold">{asset.stats.views}</div>
                              </div>
                            </div>
                          </div>

                          {/* Seller Info */}
                          <div className="flex items-center justify-between pt-3 border-t">
                            <div className="flex items-center gap-3">
                              {asset.seller.avatar ? (
                                <Image
                                  src={asset.seller.avatar}
                                  alt={asset.seller.name}
                                  width={24}
                                  height={24}
                                  className="rounded-full"
                                />
                              ) : (
                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                  <span className="text-xs font-semibold text-blue-600">
                                    {asset.seller.name.charAt(0)}
                                  </span>
                                </div>
                              )}
                              <div>
                                <span className="text-sm font-medium">{asset.seller.name}</span>
                                {asset.seller.verified && (
                                  <Badge variant="outline" className="text-xs ml-2">
                                    ✓
                                  </Badge>
                                )}
                                {asset.location && (
                                  <div className="text-xs text-slate-500 flex items-center">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {asset.location}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs font-medium">{asset.seller.rating}</span>
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1">
                            {asset.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs hover:bg-slate-100 cursor-pointer">
                                {tag}
                              </Badge>
                            ))}
                            {asset.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{asset.tags.length - 3}
                              </Badge>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 pt-2">
                            <Button className="flex-1" asChild>
                              <Link href={`/marketplace/${asset.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                Ver Detalhes
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => toggleFavorite(asset.id)}>
                              <Heart className={`h-4 w-4 ${favorites.includes(asset.id) ? 'fill-red-500 text-red-500' : ''}`} />
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredAssets.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-16 w-16 text-blue-400" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-3">Nenhum ativo encontrado</h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Não encontramos ativos que correspondam aos seus critérios de pesquisa. Tente ajustar os filtros.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedType("all")
                    setSelectedCategory("all")
                    setPriceRange([0, 500000])
                    setRevenueRange([0, 50000])
                    setShowFilters(false)
                  }}
                  size="lg"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Limpar Filtros
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/valuation">
                    <Zap className="h-5 w-5 mr-2" />
                    Avaliar Ativo
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}