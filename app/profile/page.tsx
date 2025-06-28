"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Slider } from "@/components/ui/slider"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { 
  User, Shield, Bell, CreditCard, Star, TrendingUp, Eye, Heart, MessageCircle, 
  Camera, Edit3, Save, X, Check, AlertTriangle, Info, Settings, Lock, 
  Globe, MapPin, Building, Phone, Mail, Calendar, Award, Target, Zap,
  Download, Upload, RefreshCw, Copy, ExternalLink, BarChart3, Users,
  Briefcase, GraduationCap, Languages, Clock, Activity, Trash2, Plus,
  ChevronRight, ChevronDown, HelpCircle, FileText, Image, Video,
  Linkedin, Twitter, Github, Instagram, Facebook, Link as LinkIcon,
  Verified, Crown, Gem, Sparkles, TrendingDown, DollarSign, Calculator
} from "lucide-react"

interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
  coverImage?: string
  company?: string
  jobTitle?: string
  userType: string
  verified: boolean
  premium: boolean
  bio?: string
  location?: string
  website?: string
  phone?: string
  memberSince: string
  timezone: string
  language: string
  currency: string
  stats: {
    assetsListed: number
    assetsSold: number
    totalRevenue: number
    rating: number
    reviews: number
    profileViews: number
    responseRate: number
    avgResponseTime: number
  }
  preferences: {
    emailNotifications: boolean
    pushNotifications: boolean
    marketingEmails: boolean
    publicProfile: boolean
    showStats: boolean
    showActivity: boolean
    autoSave: boolean
    darkMode: boolean
  }
  socialLinks: {
    linkedin?: string
    twitter?: string
    github?: string
    instagram?: string
    facebook?: string
    website?: string
  }
  skills: string[]
  interests: string[]
  experience: {
    years: number
    industries: string[]
    specializations: string[]
  }
  portfolio: {
    id: string
    title: string
    description: string
    image: string
    url: string
    category: string
  }[]
}

interface ActivityItem {
  id: string
  type: 'view' | 'message' | 'favorite' | 'sale' | 'listing' | 'review'
  title: string
  description: string
  timestamp: string
  metadata?: any
}

export default function ProfilePage() {
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [profileCompletion, setProfileCompletion] = useState(0)
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [newInterest, setNewInterest] = useState("")
  const [portfolioForm, setPortfolioForm] = useState({
    title: "",
    description: "",
    url: "",
    category: ""
  })

  useEffect(() => {
    if (!session) {
      router.push("/auth/login")
      return
    }

    const fetchProfile = async () => {
      setIsLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Enhanced mock profile data
      const mockProfile: UserProfile = {
        id: session.user?.id || "1",
        name: session.user?.name || "Utilizador",
        email: session.user?.email || "user@example.com",
        avatar: session.user?.image || "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
        coverImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
        company: "Tech Solutions Lda",
        jobTitle: "CEO & Founder",
        userType: "both",
        verified: true,
        premium: true,
        bio: "Empreendedor digital com 10+ anos de experiência em M&A de ativos digitais. Especializado em e-commerce e SaaS. Apaixonado por inovação e tecnologia.",
        location: "Lisboa, Portugal",
        website: "https://exemplo.com",
        phone: "+351 912 345 678",
        memberSince: "2022-03-15",
        timezone: "Europe/Lisbon",
        language: "pt-PT",
        currency: "EUR",
        stats: {
          assetsListed: 12,
          assetsSold: 8,
          totalRevenue: 485000,
          rating: 4.9,
          reviews: 34,
          profileViews: 1247,
          responseRate: 98,
          avgResponseTime: 2.5,
        },
        preferences: {
          emailNotifications: true,
          pushNotifications: true,
          marketingEmails: false,
          publicProfile: true,
          showStats: true,
          showActivity: true,
          autoSave: true,
          darkMode: false,
        },
        socialLinks: {
          linkedin: "https://linkedin.com/in/exemplo",
          twitter: "https://twitter.com/exemplo",
          github: "https://github.com/exemplo",
          website: "https://exemplo.com"
        },
        skills: ["M&A", "Due Diligence", "SaaS", "E-commerce", "Valuation", "Negotiation"],
        interests: ["Technology", "Startups", "Investment", "Digital Marketing", "AI"],
        experience: {
          years: 10,
          industries: ["Technology", "E-commerce", "SaaS", "Fintech"],
          specializations: ["Digital M&A", "Asset Valuation", "Business Development"]
        },
        portfolio: [
          {
            id: "1",
            title: "SaaS Productivity Suite",
            description: "Sold for €280K - 45% growth YoY",
            image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300",
            url: "/marketplace/1",
            category: "SaaS"
          },
          {
            id: "2",
            title: "E-commerce Fashion Store",
            description: "Sold for €125K - 50K+ customers",
            image: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=300",
            url: "/marketplace/2",
            category: "E-commerce"
          }
        ]
      }

      setProfile(mockProfile)
      calculateProfileCompletion(mockProfile)
      fetchRecentActivity()
      setIsLoading(false)
    }

    fetchProfile()
  }, [session, router])

  const fetchRecentActivity = async () => {
    // Mock recent activity
    const mockActivity: ActivityItem[] = [
      {
        id: "1",
        type: "sale",
        title: "Asset Sold",
        description: "SaaS Productivity Suite sold for €280,000",
        timestamp: "2024-01-20T14:30:00Z"
      },
      {
        id: "2",
        type: "listing",
        title: "New Listing",
        description: "Listed Mobile App for €95,000",
        timestamp: "2024-01-19T10:15:00Z"
      },
      {
        id: "3",
        type: "review",
        title: "New Review",
        description: "Received 5-star review from buyer",
        timestamp: "2024-01-18T16:45:00Z"
      },
      {
        id: "4",
        type: "message",
        title: "New Message",
        description: "Inquiry about E-commerce store",
        timestamp: "2024-01-17T09:20:00Z"
      }
    ]
    setRecentActivity(mockActivity)
  }

  const calculateProfileCompletion = (profile: UserProfile) => {
    const fields = [
      profile.name,
      profile.bio,
      profile.location,
      profile.company,
      profile.jobTitle,
      profile.website,
      profile.phone,
      profile.avatar,
      profile.coverImage,
      profile.skills.length > 0,
      profile.interests.length > 0,
      Object.values(profile.socialLinks).some(link => link),
      profile.portfolio.length > 0
    ]
    
    const completedFields = fields.filter(Boolean).length
    const completion = Math.round((completedFields / fields.length) * 100)
    setProfileCompletion(completion)
  }

  const handleSaveProfile = async () => {
    if (!profile) return

    setIsSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      calculateProfileCompletion(profile)
      setHasChanges(false)
      setIsEditing(false)

      toast({
        title: "Perfil atualizado",
        description: "As suas informações foram guardadas com sucesso",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao guardar o perfil",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Erro",
          description: "A imagem deve ter menos de 5MB",
          variant: "destructive",
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        if (profile) {
          setProfile({
            ...profile,
            avatar: e.target?.result as string,
          })
          setHasChanges(true)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Erro",
          description: "A imagem de capa deve ter menos de 10MB",
          variant: "destructive",
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        if (profile) {
          setProfile({
            ...profile,
            coverImage: e.target?.result as string,
          })
          setHasChanges(true)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const updateProfile = (field: string, value: any) => {
    if (!profile) return
    
    setProfile({
      ...profile,
      [field]: value
    })
    setHasChanges(true)
  }

  const updatePreferences = (field: string, value: any) => {
    if (!profile) return
    
    setProfile({
      ...profile,
      preferences: {
        ...profile.preferences,
        [field]: value
      }
    })
    setHasChanges(true)
  }

  const updateSocialLinks = (platform: string, url: string) => {
    if (!profile) return
    
    setProfile({
      ...profile,
      socialLinks: {
        ...profile.socialLinks,
        [platform]: url
      }
    })
    setHasChanges(true)
  }

  const addSkill = () => {
    if (!profile || !newSkill.trim()) return
    
    if (profile.skills.includes(newSkill.trim())) {
      toast({
        title: "Aviso",
        description: "Esta competência já existe",
        variant: "destructive",
      })
      return
    }

    setProfile({
      ...profile,
      skills: [...profile.skills, newSkill.trim()]
    })
    setNewSkill("")
    setHasChanges(true)
  }

  const removeSkill = (skill: string) => {
    if (!profile) return
    
    setProfile({
      ...profile,
      skills: profile.skills.filter(s => s !== skill)
    })
    setHasChanges(true)
  }

  const addInterest = () => {
    if (!profile || !newInterest.trim()) return
    
    if (profile.interests.includes(newInterest.trim())) {
      toast({
        title: "Aviso",
        description: "Este interesse já existe",
        variant: "destructive",
      })
      return
    }

    setProfile({
      ...profile,
      interests: [...profile.interests, newInterest.trim()]
    })
    setNewInterest("")
    setHasChanges(true)
  }

  const removeInterest = (interest: string) => {
    if (!profile) return
    
    setProfile({
      ...profile,
      interests: profile.interests.filter(i => i !== interest)
    })
    setHasChanges(true)
  }

  const copyProfileUrl = () => {
    const url = `${window.location.origin}/profile/${profile?.id}`
    navigator.clipboard.writeText(url)
    toast({
      title: "Sucesso",
      description: "URL do perfil copiado para a área de transferência",
    })
  }

  const exportProfile = () => {
    if (!profile) return

    const exportData = {
      ...profile,
      exportDate: new Date().toISOString()
    }

    const dataStr = JSON.stringify(exportData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `perfil_${profile.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()

    toast({
      title: "Exportação concluída",
      description: "Dados do perfil exportados com sucesso",
    })
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'sale': return <DollarSign className="h-4 w-4 text-green-600" />
      case 'listing': return <Plus className="h-4 w-4 text-blue-600" />
      case 'review': return <Star className="h-4 w-4 text-yellow-600" />
      case 'message': return <MessageCircle className="h-4 w-4 text-purple-600" />
      case 'view': return <Eye className="h-4 w-4 text-slate-600" />
      case 'favorite': return <Heart className="h-4 w-4 text-red-600" />
      default: return <Activity className="h-4 w-4 text-slate-600" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: profile?.currency || 'EUR'
    }).format(amount)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">A carregar perfil...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <Header />
        <div className="pt-20 text-center min-h-[60vh] flex items-center justify-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8">
              <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Perfil não encontrado</h1>
              <p className="text-slate-600 mb-6">Não foi possível carregar as informações do perfil.</p>
              <Button onClick={() => router.back()}>Voltar</Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleAvatarUpload}
        className="hidden"
      />
      <input
        ref={coverInputRef}
        type="file"
        accept="image/*"
        onChange={handleCoverUpload}
        className="hidden"
      />

      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cover Image & Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-8"
          >
            <Card className="overflow-hidden border-0 shadow-xl">
              {/* Cover Image */}
              <div className="relative h-48 md:h-64 bg-gradient-to-r from-blue-600 to-purple-600">
                {profile.coverImage && (
                  <img
                    src={profile.coverImage}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Edit Cover Button */}
                {isEditing && (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute top-4 right-4"
                    onClick={() => coverInputRef.current?.click()}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Alterar Capa
                  </Button>
                )}

                {/* Profile Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-end space-x-6">
                    {/* Avatar */}
                    <div className="relative">
                      <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white shadow-lg">
                        <AvatarImage src={profile.avatar} alt={profile.name} />
                        <AvatarFallback className="text-2xl bg-blue-600 text-white">
                          {profile.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      {isEditing && (
                        <Button
                          variant="secondary"
                          size="sm"
                          className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h1 className="text-2xl md:text-3xl font-bold truncate">
                          {profile.name}
                        </h1>
                        <div className="flex items-center space-x-2">
                          {profile.verified && (
                            <Badge className="bg-green-500 text-white">
                              <Verified className="h-3 w-3 mr-1" />
                              Verificado
                            </Badge>
                          )}
                          {profile.premium && (
                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                              <Crown className="h-3 w-3 mr-1" />
                              Premium
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm opacity-90">
                        {profile.jobTitle && profile.company && (
                          <span className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-1" />
                            {profile.jobTitle} @ {profile.company}
                          </span>
                        )}
                        {profile.location && (
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {profile.location}
                          </span>
                        )}
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Membro desde {new Date(profile.memberSince).getFullYear()}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3">
                      {!isEditing ? (
                        <>
                          <Button
                            variant="secondary"
                            onClick={() => setIsEditing(true)}
                            className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                          >
                            <Edit3 className="h-4 w-4 mr-2" />
                            Editar
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={copyProfileUrl}
                            className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Partilhar
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="secondary"
                            onClick={() => {
                              setIsEditing(false)
                              setHasChanges(false)
                            }}
                            className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancelar
                          </Button>
                          <Button
                            onClick={handleSaveProfile}
                            disabled={isSaving || !hasChanges}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            {isSaving ? (
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <Save className="h-4 w-4 mr-2" />
                            )}
                            {isSaving ? "A guardar..." : "Guardar"}
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Profile Completion Alert */}
          <AnimatePresence>
            {profileCompletion < 80 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <Alert className="border-amber-200 bg-amber-50">
                  <Sparkles className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <strong>Complete o seu perfil ({profileCompletion}%)</strong>
                        <p className="text-sm mt-1">
                          Um perfil completo aumenta a confiança e melhora as suas oportunidades de negócio.
                        </p>
                      </div>
                      <Progress value={profileCompletion} className="w-24 h-2" />
                    </div>
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar - Stats & Quick Info */}
            <div className="space-y-6">
              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Estatísticas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{profile.stats.assetsListed}</div>
                        <div className="text-xs text-slate-600">Ativos Listados</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{profile.stats.assetsSold}</div>
                        <div className="text-xs text-slate-600">Vendidos</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-lg font-bold text-purple-600">{formatCurrency(profile.stats.totalRevenue)}</div>
                        <div className="text-xs text-slate-600">Receita Total</div>
                      </div>
                      <div className="text-center p-3 bg-amber-50 rounded-lg">
                        <div className="text-2xl font-bold text-amber-600 flex items-center justify-center">
                          {profile.stats.rating}
                          <Star className="h-4 w-4 ml-1 fill-current" />
                        </div>
                        <div className="text-xs text-slate-600">{profile.stats.reviews} Avaliações</div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Taxa de Resposta</span>
                        <span className="font-medium">{profile.stats.responseRate}%</span>
                      </div>
                      <Progress value={profile.stats.responseRate} className="h-2" />
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Tempo Médio de Resposta</span>
                        <span className="font-medium">{profile.stats.avgResponseTime}h</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Visualizações do Perfil</span>
                        <span className="font-medium">{profile.stats.profileViews.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Skills & Interests */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2" />
                      Competências & Interesses
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-sm font-medium">Competências</Label>
                        {isEditing && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowAdvanced(!showAdvanced)}
                          >
                            {showAdvanced ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                          </Button>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-2">
                        {profile.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                            {isEditing && (
                              <button
                                onClick={() => removeSkill(skill)}
                                className="ml-1 hover:text-red-600"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            )}
                          </Badge>
                        ))}
                      </div>

                      {isEditing && showAdvanced && (
                        <div className="flex gap-2">
                          <Input
                            placeholder="Nova competência"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                            className="text-sm"
                          />
                          <Button size="sm" onClick={addSkill}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div>
                      <Label className="text-sm font-medium mb-2 block">Interesses</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {profile.interests.map((interest, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {interest}
                            {isEditing && (
                              <button
                                onClick={() => removeInterest(interest)}
                                className="ml-1 hover:text-red-600"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            )}
                          </Badge>
                        ))}
                      </div>

                      {isEditing && showAdvanced && (
                        <div className="flex gap-2">
                          <Input
                            placeholder="Novo interesse"
                            value={newInterest}
                            onChange={(e) => setNewInterest(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                            className="text-sm"
                          />
                          <Button size="sm" onClick={addInterest}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="h-5 w-5 mr-2" />
                      Atividade Recente
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentActivity.slice(0, 4).map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900">{activity.title}</p>
                            <p className="text-xs text-slate-600">{activity.description}</p>
                            <p className="text-xs text-slate-400 mt-1">
                              {new Date(activity.timestamp).toLocaleDateString('pt-PT')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="profile">Perfil</TabsTrigger>
                    <TabsTrigger value="portfolio">Portfólio</TabsTrigger>
                    <TabsTrigger value="preferences">Preferências</TabsTrigger>
                    <TabsTrigger value="security">Segurança</TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <User className="h-5 w-5 mr-2" />
                          Informações Pessoais
                        </CardTitle>
                        <CardDescription>
                          Atualize as suas informações de perfil e dados de contacto
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">Nome Completo *</Label>
                            <Input
                              id="name"
                              value={profile.name}
                              onChange={(e) => updateProfile('name', e.target.value)}
                              disabled={!isEditing}
                              className={!isEditing ? "bg-slate-50" : ""}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              value={profile.email}
                              disabled
                              className="bg-slate-50"
                            />
                            <p className="text-xs text-slate-500">
                              O email não pode ser alterado por motivos de segurança
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="jobTitle">Cargo</Label>
                            <Input
                              id="jobTitle"
                              value={profile.jobTitle || ""}
                              onChange={(e) => updateProfile('jobTitle', e.target.value)}
                              placeholder="CEO, Founder, Investor..."
                              disabled={!isEditing}
                              className={!isEditing ? "bg-slate-50" : ""}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="company">Empresa</Label>
                            <Input
                              id="company"
                              value={profile.company || ""}
                              onChange={(e) => updateProfile('company', e.target.value)}
                              placeholder="Nome da empresa"
                              disabled={!isEditing}
                              className={!isEditing ? "bg-slate-50" : ""}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone">Telefone</Label>
                            <Input
                              id="phone"
                              value={profile.phone || ""}
                              onChange={(e) => updateProfile('phone', e.target.value)}
                              placeholder="+351 912 345 678"
                              disabled={!isEditing}
                              className={!isEditing ? "bg-slate-50" : ""}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="location">Localização</Label>
                            <Input
                              id="location"
                              value={profile.location || ""}
                              onChange={(e) => updateProfile('location', e.target.value)}
                              placeholder="Cidade, País"
                              disabled={!isEditing}
                              className={!isEditing ? "bg-slate-50" : ""}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="website">Website</Label>
                            <Input
                              id="website"
                              value={profile.website || ""}
                              onChange={(e) => updateProfile('website', e.target.value)}
                              placeholder="https://exemplo.com"
                              disabled={!isEditing}
                              className={!isEditing ? "bg-slate-50" : ""}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="userType">Tipo de Utilizador</Label>
                            <Select
                              value={profile.userType}
                              onValueChange={(value) => updateProfile('userType', value)}
                              disabled={!isEditing}
                            >
                              <SelectTrigger className={!isEditing ? "bg-slate-50" : ""}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="buyer">Comprador</SelectItem>
                                <SelectItem value="seller">Vendedor</SelectItem>
                                <SelectItem value="both">Ambos</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio">Biografia</Label>
                          <Textarea
                            id="bio"
                            value={profile.bio || ""}
                            onChange={(e) => updateProfile('bio', e.target.value)}
                            placeholder="Conte-nos sobre si, a sua experiência e objetivos..."
                            rows={4}
                            disabled={!isEditing}
                            className={!isEditing ? "bg-slate-50" : ""}
                          />
                          <p className="text-xs text-slate-500">
                            {profile.bio?.length || 0}/500 caracteres
                          </p>
                        </div>

                        {/* Social Links */}
                        <div className="space-y-4">
                          <Label className="text-base font-medium">Redes Sociais</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="linkedin" className="flex items-center">
                                <Linkedin className="h-4 w-4 mr-2 text-blue-600" />
                                LinkedIn
                              </Label>
                              <Input
                                id="linkedin"
                                value={profile.socialLinks.linkedin || ""}
                                onChange={(e) => updateSocialLinks('linkedin', e.target.value)}
                                placeholder="https://linkedin.com/in/..."
                                disabled={!isEditing}
                                className={!isEditing ? "bg-slate-50" : ""}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="twitter" className="flex items-center">
                                <Twitter className="h-4 w-4 mr-2 text-blue-400" />
                                Twitter
                              </Label>
                              <Input
                                id="twitter"
                                value={profile.socialLinks.twitter || ""}
                                onChange={(e) => updateSocialLinks('twitter', e.target.value)}
                                placeholder="https://twitter.com/..."
                                disabled={!isEditing}
                                className={!isEditing ? "bg-slate-50" : ""}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="github" className="flex items-center">
                                <Github className="h-4 w-4 mr-2 text-slate-800" />
                                GitHub
                              </Label>
                              <Input
                                id="github"
                                value={profile.socialLinks.github || ""}
                                onChange={(e) => updateSocialLinks('github', e.target.value)}
                                placeholder="https://github.com/..."
                                disabled={!isEditing}
                                className={!isEditing ? "bg-slate-50" : ""}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="socialWebsite" className="flex items-center">
                                <LinkIcon className="h-4 w-4 mr-2 text-slate-600" />
                                Website Pessoal
                              </Label>
                              <Input
                                id="socialWebsite"
                                value={profile.socialLinks.website || ""}
                                onChange={(e) => updateSocialLinks('website', e.target.value)}
                                placeholder="https://..."
                                disabled={!isEditing}
                                className={!isEditing ? "bg-slate-50" : ""}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="portfolio" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Award className="h-5 w-5 mr-2" />
                          Portfólio de Ativos
                        </CardTitle>
                        <CardDescription>
                          Mostre os seus sucessos e ativos vendidos
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {profile.portfolio.map((item) => (
                            <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-32 object-cover rounded-lg mb-3"
                              />
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">{item.title}</h4>
                                  <Badge variant="outline">{item.category}</Badge>
                                </div>
                                <p className="text-sm text-slate-600">{item.description}</p>
                                <Button variant="outline" size="sm" asChild>
                                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    Ver Detalhes
                                  </a>
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {isEditing && (
                          <div className="mt-6 p-4 border-2 border-dashed border-slate-300 rounded-lg">
                            <div className="text-center">
                              <Plus className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                              <p className="text-sm text-slate-600 mb-4">
                                Adicione um novo projeto ao seu portfólio
                              </p>
                              <Button variant="outline">
                                <Plus className="h-4 w-4 mr-2" />
                                Adicionar Projeto
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="preferences" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Settings className="h-5 w-5 mr-2" />
                          Preferências da Conta
                        </CardTitle>
                        <CardDescription>
                          Configure as suas preferências de notificações e privacidade
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Notifications */}
                        <div className="space-y-4">
                          <h4 className="font-medium flex items-center">
                            <Bell className="h-4 w-4 mr-2" />
                            Notificações
                          </h4>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Notificações por Email</Label>
                                <p className="text-sm text-slate-600">
                                  Receber notificações importantes por email
                                </p>
                              </div>
                              <Switch
                                checked={profile.preferences.emailNotifications}
                                onCheckedChange={(checked) => updatePreferences('emailNotifications', checked)}
                                disabled={!isEditing}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Notificações Push</Label>
                                <p className="text-sm text-slate-600">
                                  Receber notificações no browser
                                </p>
                              </div>
                              <Switch
                                checked={profile.preferences.pushNotifications}
                                onCheckedChange={(checked) => updatePreferences('pushNotifications', checked)}
                                disabled={!isEditing}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Emails de Marketing</Label>
                                <p className="text-sm text-slate-600">
                                  Receber novidades, dicas e ofertas especiais
                                </p>
                              </div>
                              <Switch
                                checked={profile.preferences.marketingEmails}
                                onCheckedChange={(checked) => updatePreferences('marketingEmails', checked)}
                                disabled={!isEditing}
                              />
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Privacy */}
                        <div className="space-y-4">
                          <h4 className="font-medium flex items-center">
                            <Shield className="h-4 w-4 mr-2" />
                            Privacidade
                          </h4>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Perfil Público</Label>
                                <p className="text-sm text-slate-600">
                                  Permitir que outros utilizadores vejam o seu perfil
                                </p>
                              </div>
                              <Switch
                                checked={profile.preferences.publicProfile}
                                onCheckedChange={(checked) => updatePreferences('publicProfile', checked)}
                                disabled={!isEditing}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Mostrar Estatísticas</Label>
                                <p className="text-sm text-slate-600">
                                  Exibir estatísticas de vendas no perfil público
                                </p>
                              </div>
                              <Switch
                                checked={profile.preferences.showStats}
                                onCheckedChange={(checked) => updatePreferences('showStats', checked)}
                                disabled={!isEditing}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Mostrar Atividade</Label>
                                <p className="text-sm text-slate-600">
                                  Exibir atividade recente no perfil público
                                </p>
                              </div>
                              <Switch
                                checked={profile.preferences.showActivity}
                                onCheckedChange={(checked) => updatePreferences('showActivity', checked)}
                                disabled={!isEditing}
                              />
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* System Preferences */}
                        <div className="space-y-4">
                          <h4 className="font-medium flex items-center">
                            <Settings className="h-4 w-4 mr-2" />
                            Sistema
                          </h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Fuso Horário</Label>
                              <Select
                                value={profile.timezone}
                                onValueChange={(value) => updateProfile('timezone', value)}
                                disabled={!isEditing}
                              >
                                <SelectTrigger className={!isEditing ? "bg-slate-50" : ""}>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Europe/Lisbon">Lisboa (GMT+0)</SelectItem>
                                  <SelectItem value="Europe/London">Londres (GMT+0)</SelectItem>
                                  <SelectItem value="Europe/Paris">Paris (GMT+1)</SelectItem>
                                  <SelectItem value="America/New_York">Nova York (GMT-5)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Idioma</Label>
                              <Select
                                value={profile.language}
                                onValueChange={(value) => updateProfile('language', value)}
                                disabled={!isEditing}
                              >
                                <SelectTrigger className={!isEditing ? "bg-slate-50" : ""}>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pt-PT">Português (Portugal)</SelectItem>
                                  <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                                  <SelectItem value="en-US">English (US)</SelectItem>
                                  <SelectItem value="es-ES">Español</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Moeda</Label>
                              <Select
                                value={profile.currency}
                                onValueChange={(value) => updateProfile('currency', value)}
                                disabled={!isEditing}
                              >
                                <SelectTrigger className={!isEditing ? "bg-slate-50" : ""}>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="EUR">Euro (€)</SelectItem>
                                  <SelectItem value="USD">US Dollar ($)</SelectItem>
                                  <SelectItem value="GBP">British Pound (£)</SelectItem>
                                  <SelectItem value="BRL">Real Brasileiro (R$)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Gravação Automática</Label>
                              <p className="text-sm text-slate-600">
                                Guardar alterações automaticamente
                              </p>
                            </div>
                            <Switch
                              checked={profile.preferences.autoSave}
                              onCheckedChange={(checked) => updatePreferences('autoSave', checked)}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="security" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Lock className="h-5 w-5 mr-2" />
                          Segurança da Conta
                        </CardTitle>
                        <CardDescription>
                          Gerir a segurança e privacidade da sua conta
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <Lock className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-medium">Alterar Password</h4>
                                <p className="text-sm text-slate-600">
                                  Última alteração há 3 meses
                                </p>
                              </div>
                            </div>
                            <Button variant="outline">Alterar</Button>
                          </div>

                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <Shield className="h-5 w-5 text-green-600" />
                              </div>
                              <div>
                                <h4 className="font-medium">Autenticação de Dois Fatores</h4>
                                <p className="text-sm text-slate-600">
                                  {profile.verified ? "Ativada" : "Adicione uma camada extra de segurança"}
                                </p>
                              </div>
                            </div>
                            <Button variant="outline">
                              {profile.verified ? "Gerir" : "Configurar"}
                            </Button>
                          </div>

                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                <Users className="h-5 w-5 text-purple-600" />
                              </div>
                              <div>
                                <h4 className="font-medium">Sessões Ativas</h4>
                                <p className="text-sm text-slate-600">
                                  Gerir dispositivos com acesso à conta
                                </p>
                              </div>
                            </div>
                            <Button variant="outline">Ver Sessões</Button>
                          </div>

                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                profile.verified ? "bg-green-100" : "bg-amber-100"
                              }`}>
                                <Verified className={`h-5 w-5 ${
                                  profile.verified ? "text-green-600" : "text-amber-600"
                                }`} />
                              </div>
                              <div>
                                <h4 className="font-medium">Verificação de Identidade</h4>
                                <p className="text-sm text-slate-600">
                                  {profile.verified ? "Conta verificada ✓" : "Verificar a sua identidade"}
                                </p>
                              </div>
                            </div>
                            <Button variant="outline" disabled={profile.verified}>
                              {profile.verified ? "Verificado" : "Verificar"}
                            </Button>
                          </div>

                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                                <Download className="h-5 w-5 text-slate-600" />
                              </div>
                              <div>
                                <h4 className="font-medium">Exportar Dados</h4>
                                <p className="text-sm text-slate-600">
                                  Descarregar uma cópia dos seus dados
                                </p>
                              </div>
                            </div>
                            <Button variant="outline" onClick={exportProfile}>
                              <Download className="h-4 w-4 mr-2" />
                              Exportar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Danger Zone */}
                    <Card className="border-red-200">
                      <CardHeader>
                        <CardTitle className="text-red-600 flex items-center">
                          <AlertTriangle className="h-5 w-5 mr-2" />
                          Zona de Perigo
                        </CardTitle>
                        <CardDescription>
                          Ações irreversíveis para a sua conta
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                          <div>
                            <h4 className="font-medium text-red-600">Desativar Conta</h4>
                            <p className="text-sm text-red-700">
                              Desativar temporariamente a sua conta
                            </p>
                          </div>
                          <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                            Desativar
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                          <div>
                            <h4 className="font-medium text-red-600">Eliminar Conta</h4>
                            <p className="text-sm text-red-700">
                              Eliminar permanentemente a sua conta e todos os dados
                            </p>
                          </div>
                          <Button variant="destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
          </div>

          {/* Floating Save Button */}
          <AnimatePresence>
            {hasChanges && isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                className="fixed bottom-6 right-6 z-50"
              >
                <Card className="shadow-lg border-0">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-sm">
                        <p className="font-medium">Alterações não guardadas</p>
                        <p className="text-slate-600">Tem alterações por guardar</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setIsEditing(false)
                            setHasChanges(false)
                            // Reset to original data
                            window.location.reload()
                          }}
                        >
                          Cancelar
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleSaveProfile}
                          disabled={isSaving}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {isSaving ? (
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4 mr-2" />
                          )}
                          Guardar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  )
}