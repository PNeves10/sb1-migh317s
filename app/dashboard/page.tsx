"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { motion, AnimatePresence } from "framer-motion"
import { 
  TrendingUp, Eye, Plus, MessageSquare, Heart, BarChart3, Globe, Zap, 
  Calendar, DollarSign, Users, Star, ArrowUpRight, ArrowDownRight,
  Target, Clock, Award, Briefcase, Activity, Bell, Settings,
  RefreshCw, Download, Share2, Filter, Search, MoreVertical,
  CheckCircle2, AlertTriangle, Info, Sparkles, Rocket, Shield,
  LineChart as LineChartIcon, PieChart, TrendingDown, Bookmark, Mail, Phone,
  MapPin, Building, Code, Smartphone, ShoppingCart, FileText,
  ExternalLink, Copy, Edit, Trash2, Archive, Send
} from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts'

interface DashboardStats {
  totalAssets: number
  totalViews: number
  totalMessages: number
  totalFavorites: number
  monthlyRevenue: number
  conversionRate: number
  totalInquiries: number
  activeDeals: number
  completedDeals: number
  avgResponseTime: number
  profileViews: number
  successRate: number
}

interface Asset {
  id: string
  title: string
  type: string
  category: string
  price: number
  monthlyRevenue: number
  views: number
  inquiries: number
  favorites: number
  status: "active" | "pending" | "sold" | "draft"
  createdAt: string
  lastUpdated: string
  growth?: number
  roi?: number
  image?: string
  featured: boolean
  verified: boolean
}

interface RecentActivity {
  id: string
  type: "view" | "inquiry" | "favorite" | "message" | "offer" | "sale"
  title: string
  description: string
  time: string
  user?: {
    name: string
    avatar?: string
  }
  asset?: {
    id: string
    title: string
  }
  amount?: number
}

interface Message {
  id: string
  sender: {
    name: string
    avatar?: string
    verified: boolean
  }
  subject: string
  preview: string
  time: string
  unread: boolean
  priority: "low" | "medium" | "high"
  assetId?: string
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalAssets: 0,
    totalViews: 0,
    totalMessages: 0,
    totalFavorites: 0,
    monthlyRevenue: 0,
    conversionRate: 0,
    totalInquiries: 0,
    activeDeals: 0,
    completedDeals: 0,
    avgResponseTime: 0,
    profileViews: 0,
    successRate: 0,
  })
  const [assets, setAssets] = useState<Asset[]>([])
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [activeTab, setActiveTab] = useState("overview")

  // Performance data for charts
  const performanceData = [
    { month: 'Jan', views: 1200, inquiries: 45, revenue: 8500 },
    { month: 'Fev', views: 1800, inquiries: 52, revenue: 12300 },
    { month: 'Mar', views: 2400, inquiries: 68, revenue: 15600 },
    { month: 'Abr', views: 2100, inquiries: 61, revenue: 18900 },
    { month: 'Mai', views: 2847, inquiries: 74, revenue: 22400 },
    { month: 'Jun', views: 3200, inquiries: 89, revenue: 28700 },
  ]

  const assetTypeData = [
    { name: 'SaaS', value: 35, color: '#3B82F6' },
    { name: 'E-commerce', value: 28, color: '#10B981' },
    { name: 'App Mobile', value: 22, color: '#F59E0B' },
    { name: 'Website', value: 15, color: '#EF4444' },
  ]

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Enhanced mock data
      setStats({
        totalAssets: 12,
        totalViews: 2847,
        totalMessages: 34,
        totalFavorites: 89,
        monthlyRevenue: 28700,
        conversionRate: 12.5,
        totalInquiries: 156,
        activeDeals: 8,
        completedDeals: 3,
        avgResponseTime: 2.4,
        profileViews: 445,
        successRate: 87.5,
      })

      setAssets([
        {
          id: "1",
          title: "E-commerce de Moda Sustentável",
          type: "E-commerce",
          category: "Fashion",
          price: 45000,
          monthlyRevenue: 8500,
          views: 234,
          inquiries: 12,
          favorites: 45,
          status: "active",
          createdAt: "2024-01-15",
          lastUpdated: "2024-01-20",
          growth: 23,
          roi: 18.5,
          image: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=300",
          featured: true,
          verified: true,
        },
        {
          id: "2",
          title: "App de Delivery Local",
          type: "App Mobile",
          category: "Food",
          price: 78000,
          monthlyRevenue: 12000,
          views: 156,
          inquiries: 8,
          favorites: 32,
          status: "pending",
          createdAt: "2024-01-10",
          lastUpdated: "2024-01-18",
          growth: 15,
          roi: 22.3,
          image: "https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=300",
          featured: false,
          verified: true,
        },
        {
          id: "3",
          title: "SaaS de Gestão de Projetos",
          type: "SaaS",
          category: "Productivity",
          price: 120000,
          monthlyRevenue: 18500,
          views: 445,
          inquiries: 23,
          favorites: 89,
          status: "active",
          createdAt: "2024-01-05",
          lastUpdated: "2024-01-19",
          growth: 35,
          roi: 28.7,
          image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300",
          featured: true,
          verified: true,
        },
        {
          id: "4",
          title: "Blog de Tecnologia",
          type: "Website",
          category: "Content",
          price: 32000,
          monthlyRevenue: 4200,
          views: 89,
          inquiries: 5,
          favorites: 21,
          status: "draft",
          createdAt: "2024-01-20",
          lastUpdated: "2024-01-20",
          growth: 8,
          roi: 12.1,
          featured: false,
          verified: false,
        },
      ])

      setRecentActivity([
        {
          id: "1",
          type: "inquiry",
          title: "Nova consulta recebida",
          description: "João Silva interessado no E-commerce de Moda",
          time: "2h",
          user: { name: "João Silva", avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50" },
          asset: { id: "1", title: "E-commerce de Moda Sustentável" }
        },
        {
          id: "2",
          type: "offer",
          title: "Oferta recebida",
          description: "Proposta de €42.000 pelo SaaS",
          time: "4h",
          user: { name: "Maria Santos", avatar: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=50" },
          asset: { id: "3", title: "SaaS de Gestão de Projetos" },
          amount: 42000
        },
        {
          id: "3",
          type: "sale",
          title: "Venda concluída",
          description: "App de Delivery vendido com sucesso",
          time: "1d",
          asset: { id: "2", title: "App de Delivery Local" },
          amount: 78000
        },
        {
          id: "4",
          type: "favorite",
          title: "Novo favorito",
          description: "Seu ativo foi favoritado por 3 utilizadores",
          time: "2d",
          asset: { id: "1", title: "E-commerce de Moda Sustentável" }
        },
      ])

      setMessages([
        {
          id: "1",
          sender: { name: "João Silva", avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50", verified: true },
          subject: "Interesse no E-commerce de Moda",
          preview: "Olá! Tenho muito interesse no seu e-commerce de moda sustentável. Pode fornecer mais detalhes sobre...",
          time: "2h",
          unread: true,
          priority: "high",
          assetId: "1"
        },
        {
          id: "2",
          sender: { name: "Maria Santos", avatar: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=50", verified: true },
          subject: "Proposta para SaaS",
          preview: "Após analisar a documentação, gostaria de fazer uma proposta formal pelo seu SaaS...",
          time: "5h",
          unread: true,
          priority: "high",
          assetId: "3"
        },
        {
          id: "3",
          sender: { name: "Pedro Costa", avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=50", verified: false },
          subject: "Dúvidas sobre App",
          preview: "Pode fornecer mais detalhes sobre as métricas de utilizadores do app de delivery...",
          time: "1d",
          unread: false,
          priority: "medium",
          assetId: "2"
        },
      ])

      setIsLoading(false)
    }

    if (session) {
      fetchDashboardData()
    }
  }, [session])

  // Memoized calculations
  const totalPortfolioValue = useMemo(() => 
    assets.reduce((sum, asset) => sum + asset.price, 0), [assets]
  )

  const totalMonthlyRevenue = useMemo(() => 
    assets.reduce((sum, asset) => sum + asset.monthlyRevenue, 0), [assets]
  )

  const averageROI = useMemo(() => 
    assets.reduce((sum, asset) => sum + (asset.roi || 0), 0) / assets.length, [assets]
  )

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-slate-600">Carregando dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "sold":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo"
      case "pending":
        return "Pendente"
      case "sold":
        return "Vendido"
      case "draft":
        return "Rascunho"
      default:
        return "Desconhecido"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "view":
        return <Eye className="h-4 w-4 text-blue-500" />
      case "inquiry":
        return <MessageSquare className="h-4 w-4 text-green-500" />
      case "favorite":
        return <Heart className="h-4 w-4 text-red-500" />
      case "message":
        return <Mail className="h-4 w-4 text-purple-500" />
      case "offer":
        return <DollarSign className="h-4 w-4 text-emerald-500" />
      case "sale":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50"
      case "medium":
        return "border-l-yellow-500 bg-yellow-50"
      case "low":
        return "border-l-blue-500 bg-blue-50"
      default:
        return "border-l-gray-500 bg-gray-50"
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  Olá, {session.user?.name?.split(" ")[0]}! 👋
                </h1>
                <p className="text-slate-600">
                  Aqui está um resumo da sua atividade na AIQuira
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Último acesso: hoje
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    {stats.totalAssets} ativos ativos
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">7 dias</SelectItem>
                    <SelectItem value="30d">30 dias</SelectItem>
                    <SelectItem value="90d">90 dias</SelectItem>
                    <SelectItem value="1y">1 ano</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Atualizar
                </Button>
                <Button asChild>
                  <Link href="/dashboard/new-asset">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Ativo
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-full -mr-10 -mt-10" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ativos Listados</CardTitle>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Globe className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalAssets}</div>
                <div className="flex items-center text-xs text-emerald-600 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2 desde o mês passado
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-full -mr-10 -mt-10" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Eye className="h-4 w-4 text-emerald-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
                <div className="flex items-center text-xs text-emerald-600 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% desde a semana passada
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-full -mr-10 -mt-10" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mensagens</CardTitle>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MessageSquare className="h-4 w-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalMessages}</div>
                <div className="flex items-center text-xs text-amber-600 mt-1">
                  <Bell className="h-3 w-3 mr-1" />
                  5 não lidas
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-full -mr-10 -mt-10" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
                <div className="p-2 bg-red-100 rounded-lg">
                  <DollarSign className="h-4 w-4 text-red-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€{stats.monthlyRevenue.toLocaleString()}</div>
                <div className="flex items-center text-xs text-emerald-600 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +28% este mês
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="assets">Meus Ativos</TabsTrigger>
                <TabsTrigger value="messages">Mensagens</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="activity">Atividade</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Performance Overview */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <BarChart3 className="h-5 w-5 text-blue-600" />
                          Performance dos Últimos 6 Meses
                        </CardTitle>
                        <Badge variant="outline">Crescimento: +45%</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="views" stroke="#3B82F6" strokeWidth={2} name="Visualizações" />
                          <Line type="monotone" dataKey="inquiries" stroke="#10B981" strokeWidth={2} name="Consultas" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-yellow-600" />
                        Ações Rápidas
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full justify-start" asChild>
                        <Link href="/dashboard/new-asset">
                          <Plus className="mr-2 h-4 w-4" />
                          Listar Novo Ativo
                        </Link>
                      </Button>

                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link href="/valuation">
                          <TrendingUp className="mr-2 h-4 w-4" />
                          Avaliar Ativo com IA
                        </Link>
                      </Button>

                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link href="/marketplace">
                          <Search className="mr-2 h-4 w-4" />
                          Explorar Marketplace
                        </Link>
                      </Button>

                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link href="/messages">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Ver Mensagens
                          {messages.filter(m => m.unread).length > 0 && (
                            <Badge className="ml-auto bg-red-500">
                              {messages.filter(m => m.unread).length}
                            </Badge>
                          )}
                        </Link>
                      </Button>

                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link href="/dashboard/analytics">
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Analytics Detalhados
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Portfolio Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-indigo-600" />
                        Valor do Portfolio
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-indigo-600 mb-2">
                        €{totalPortfolioValue.toLocaleString()}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Receita Mensal Total</span>
                          <span className="font-medium">€{totalMonthlyRevenue.toLocaleString()}</span>
                        </div>
                        <Progress value={75} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <span>ROI Médio</span>
                          <span className="font-medium text-green-600">{averageROI.toFixed(1)}%</span>
                        </div>
                        <Progress value={averageROI} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-green-600" />
                        Métricas de Conversão
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Taxa de Conversão</span>
                            <span className="font-medium">{stats.conversionRate}%</span>
                          </div>
                          <Progress value={stats.conversionRate} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Taxa de Sucesso</span>
                            <span className="font-medium">{stats.successRate}%</span>
                          </div>
                          <Progress value={stats.successRate} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Tempo Médio de Resposta</span>
                            <span className="font-medium">{stats.avgResponseTime}h</span>
                          </div>
                          <Progress value={100 - (stats.avgResponseTime * 10)} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-yellow-600" />
                        Conquistas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-yellow-100 rounded-lg">
                            <Star className="h-4 w-4 text-yellow-600" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">Vendedor Verificado</div>
                            <div className="text-xs text-slate-500">Perfil 100% completo</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">Top Performer</div>
                            <div className="text-xs text-slate-500">Acima da média do mercado</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Shield className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">Transações Seguras</div>
                            <div className="text-xs text-slate-500">100% de segurança</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity Preview */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-purple-600" />
                        Atividade Recente
                      </CardTitle>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard?tab=activity">
                          Ver Todas
                          <ArrowUpRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.slice(0, 4).map((activity) => (
                        <div key={activity.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{activity.title}</div>
                            <div className="text-xs text-slate-600">{activity.description}</div>
                            {activity.amount && (
                              <div className="text-sm font-semibold text-green-600 mt-1">
                                €{activity.amount.toLocaleString()}
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-slate-500">{activity.time}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="assets" className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">Meus Ativos</h2>
                    <p className="text-slate-600">Gerir e acompanhar os seus ativos digitais</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtros
                    </Button>
                    <Button asChild>
                      <Link href="/dashboard/new-asset">
                        <Plus className="mr-2 h-4 w-4" />
                        Novo Ativo
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="grid gap-6">
                  <AnimatePresence>
                    {assets.map((asset, index) => (
                      <motion.div
                        key={asset.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="hover:shadow-lg transition-all duration-300 group">
                          <CardContent className="p-6">
                            <div className="flex flex-col lg:flex-row gap-6">
                              {/* Asset Image */}
                              {asset.image && (
                                <div className="w-full lg:w-48 h-32 lg:h-24 rounded-lg overflow-hidden bg-slate-100">
                                  <img 
                                    src={asset.image} 
                                    alt={asset.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}

                              {/* Asset Info */}
                              <div className="flex-1 space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                                        {asset.title}
                                      </h3>
                                      {asset.featured && (
                                        <Badge className="bg-yellow-100 text-yellow-800">
                                          <Star className="h-3 w-3 mr-1" />
                                          Destaque
                                        </Badge>
                                      )}
                                      {asset.verified && (
                                        <Badge className="bg-green-100 text-green-800">
                                          <CheckCircle2 className="h-3 w-3 mr-1" />
                                          Verificado
                                        </Badge>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <Badge variant="secondary">{asset.type}</Badge>
                                      <Badge variant="outline">{asset.category}</Badge>
                                      <Badge className={getStatusColor(asset.status)}>
                                        {getStatusText(asset.status)}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-slate-600">
                                      <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        Criado em {new Date(asset.createdAt).toLocaleDateString("pt-PT")}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        Atualizado {new Date(asset.lastUpdated).toLocaleDateString("pt-PT")}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="text-right space-y-2">
                                    <div className="text-2xl font-bold text-emerald-600">
                                      €{asset.price.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-slate-600">
                                      €{asset.monthlyRevenue.toLocaleString()}/mês
                                    </div>
                                    {asset.roi && (
                                      <Badge variant="outline" className="text-green-600">
                                        ROI: {asset.roi}%
                                      </Badge>
                                    )}
                                  </div>
                                </div>

                                {/* Metrics */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  <div className="flex items-center gap-2">
                                    <Eye className="h-4 w-4 text-blue-500" />
                                    <div>
                                      <div className="text-sm font-medium">{asset.views}</div>
                                      <div className="text-xs text-slate-500">Visualizações</div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4 text-green-500" />
                                    <div>
                                      <div className="text-sm font-medium">{asset.inquiries}</div>
                                      <div className="text-xs text-slate-500">Consultas</div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Heart className="h-4 w-4 text-red-500" />
                                    <div>
                                      <div className="text-sm font-medium">{asset.favorites}</div>
                                      <div className="text-xs text-slate-500">Favoritos</div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-purple-500" />
                                    <div>
                                      <div className="text-sm font-medium text-green-600">
                                        +{asset.growth}%
                                      </div>
                                      <div className="text-xs text-slate-500">Crescimento</div>
                                    </div>
                                  </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap gap-2">
                                  <Button size="sm" variant="outline" asChild>
                                    <Link href={`/dashboard/assets/${asset.id}`}>
                                      <Edit className="h-4 w-4 mr-1" />
                                      Editar
                                    </Link>
                                  </Button>
                                  <Button size="sm" variant="outline" asChild>
                                    <Link href={`/marketplace/${asset.id}`}>
                                      <Eye className="h-4 w-4 mr-1" />
                                      Ver Público
                                    </Link>
                                  </Button>
                                  <Button size="sm" variant="outline" asChild>
                                    <Link href={`/dashboard/analytics/${asset.id}`}>
                                      <BarChart3 className="h-4 w-4 mr-1" />
                                      Analytics
                                    </Link>
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Share2 className="h-4 w-4 mr-1" />
                                    Partilhar
                                  </Button>
                                  {asset.status === "draft" && (
                                    <Button size="sm">
                                      <Send className="h-4 w-4 mr-1" />
                                      Publicar
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </TabsContent>

              <TabsContent value="messages" className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Mensagens</h2>
                    <p className="text-slate-600">Gerir comunicações com compradores e vendedores</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {messages.filter(m => m.unread).length} não lidas
                    </Badge>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/messages">
                        Ver Todas
                        <ArrowUpRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <AnimatePresence>
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className={`hover:shadow-md transition-all duration-300 border-l-4 ${
                          message.unread ? getPriorityColor(message.priority) : "border-l-transparent"
                        }`}>
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={message.sender.avatar} />
                                <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-semibold">{message.sender.name}</h4>
                                    {message.sender.verified && (
                                      <Badge variant="outline" className="text-xs">
                                        <CheckCircle2 className="h-3 w-3 mr-1" />
                                        Verificado
                                      </Badge>
                                    )}
                                    {message.unread && (
                                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-xs">
                                      {message.priority}
                                    </Badge>
                                    <span className="text-xs text-slate-500">{message.time}</span>
                                  </div>
                                </div>
                                
                                <h5 className="text-sm font-medium">{message.subject}</h5>
                                <p className="text-sm text-slate-600 line-clamp-2">{message.preview}</p>
                                
                                {message.assetId && (
                                  <Badge variant="secondary" className="text-xs">
                                    Sobre: {assets.find(a => a.id === message.assetId)?.title}
                                  </Badge>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="outline">
                                  Responder
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Analytics Detalhados</h2>
                    <p className="text-slate-600">Análise aprofundada do desempenho dos seus ativos</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar Relatório
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Revenue Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Receita por Mês</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="revenue" fill="#10B981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Asset Types Distribution */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Distribuição por Tipo de Ativo</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <RechartsPieChart>
                          <Pie
                            data={assetTypeData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}%`}
                          >
                            {assetTypeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Detailed Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Métricas Detalhadas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {stats.conversionRate}%
                        </div>
                        <div className="text-sm text-slate-600">Taxa de Conversão</div>
                        <div className="text-xs text-emerald-600 mt-1">+2.3% vs mês anterior</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          €{(totalPortfolioValue / 1000).toFixed(0)}K
                        </div>
                        <div className="text-sm text-slate-600">Valor Médio por Ativo</div>
                        <div className="text-xs text-blue-600 mt-1">Acima da média do mercado</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600 mb-1">
                          {stats.avgResponseTime}h
                        </div>
                        <div className="text-sm text-slate-600">Tempo Médio de Resposta</div>
                        <div className="text-xs text-amber-600 mt-1">Excelente performance</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600 mb-1">
                          {stats.successRate}%
                        </div>
                        <div className="text-sm text-slate-600">Taxa de Sucesso</div>
                        <div className="text-xs text-green-600 mt-1">Top 10% da plataforma</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Atividade Recente</h2>
                    <p className="text-slate-600">Histórico completo das suas ações na plataforma</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrar
                  </Button>
                </div>

                <div className="space-y-4">
                  <AnimatePresence>
                    {recentActivity.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="hover:shadow-md transition-all duration-300">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                              <div className="p-3 bg-slate-100 rounded-full">
                                {getActivityIcon(activity.type)}
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-medium">{activity.title}</h4>
                                  <span className="text-xs text-slate-500">{activity.time}</span>
                                </div>
                                <p className="text-sm text-slate-600 mb-2">{activity.description}</p>
                                
                                <div className="flex items-center gap-4">
                                  {activity.user && (
                                    <div className="flex items-center gap-2">
                                      <Avatar className="h-6 w-6">
                                        <AvatarImage src={activity.user.avatar} />
                                        <AvatarFallback className="text-xs">
                                          {activity.user.name.charAt(0)}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span className="text-xs text-slate-600">{activity.user.name}</span>
                                    </div>
                                  )}
                                  
                                  {activity.asset && (
                                    <Badge variant="outline" className="text-xs">
                                      {activity.asset.title}
                                    </Badge>
                                  )}
                                  
                                  {activity.amount && (
                                    <Badge className="text-xs bg-green-100 text-green-800">
                                      €{activity.amount.toLocaleString()}
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              <Button size="sm" variant="ghost">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}