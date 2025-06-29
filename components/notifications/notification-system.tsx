"use client"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { 
  Bell, Check, CheckCheck, Eye, Heart, MessageSquare, Settings, X, 
  Search, Filter, Archive, Trash2, Star, Clock, AlertTriangle,
  TrendingUp, DollarSign, Users, Shield, Zap, Volume2, VolumeX,
  Pin, PinOff, MoreVertical, RefreshCw, Download, Share2
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { motion, AnimatePresence } from "framer-motion"

interface Notification {
  id: string
  type: "message" | "favorite" | "asset_approved" | "asset_rejected" | "asset_viewed" | "system" | "offer" | "payment" | "security"
  title: string
  message: string
  read: boolean
  pinned: boolean
  archived: boolean
  priority: "low" | "medium" | "high" | "urgent"
  createdAt: string
  actionUrl?: string
  metadata?: {
    assetId?: string
    userId?: string
    assetTitle?: string
    userName?: string
    amount?: number
    userAvatar?: string
  }
}

interface NotificationSystemProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationSystem({ isOpen, onClose }: NotificationSystemProps) {
  const { user, isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "unread" | "pinned" | "archived">("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])
  const [showSettings, setShowSettings] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState(30)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchNotifications()
    }
  }, [isOpen, isAuthenticated])

  // Auto refresh
  useEffect(() => {
    if (autoRefresh && isOpen) {
      const interval = setInterval(fetchNotifications, refreshInterval * 1000)
      return () => clearInterval(interval)
    }
  }, [autoRefresh, refreshInterval, isOpen])

  const fetchNotifications = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Enhanced mock notifications with more variety
      const mockNotifications: Notification[] = [
        {
          id: "1",
          type: "offer",
          title: "Nova oferta recebida",
          message: "João Silva fez uma oferta de €95.000 pelo seu e-commerce",
          read: false,
          pinned: true,
          archived: false,
          priority: "high",
          createdAt: "2024-01-20T14:30:00Z",
          actionUrl: "/dashboard/offers",
          metadata: {
            userId: "user1",
            userName: "João Silva",
            assetId: "asset1",
            assetTitle: "E-commerce de Moda Sustentável",
            amount: 95000,
            userAvatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50",
          },
        },
        {
          id: "2",
          type: "payment",
          title: "Pagamento processado",
          message: "Recebeu €125.000 pela venda do SaaS de Gestão",
          read: false,
          pinned: false,
          archived: false,
          priority: "urgent",
          createdAt: "2024-01-20T13:15:00Z",
          actionUrl: "/dashboard/transactions",
          metadata: {
            assetId: "asset2",
            assetTitle: "SaaS de Gestão de Projetos",
            amount: 125000,
          },
        },
        {
          id: "3",
          type: "message",
          title: "Nova mensagem",
          message: "Maria Santos enviou uma mensagem sobre due diligence",
          read: false,
          pinned: false,
          archived: false,
          priority: "medium",
          createdAt: "2024-01-20T12:45:00Z",
          actionUrl: "/messages",
          metadata: {
            userId: "user2",
            userName: "Maria Santos",
            userAvatar: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=50",
          },
        },
        {
          id: "4",
          type: "security",
          title: "Alerta de segurança",
          message: "Novo login detectado de localização não reconhecida",
          read: false,
          pinned: false,
          archived: false,
          priority: "high",
          createdAt: "2024-01-20T11:20:00Z",
          actionUrl: "/settings/security",
        },
        {
          id: "5",
          type: "favorite",
          title: "Ativo favoritado",
          message: "O seu SaaS foi adicionado aos favoritos por 3 utilizadores",
          read: true,
          pinned: false,
          archived: false,
          priority: "low",
          createdAt: "2024-01-20T10:15:00Z",
          actionUrl: "/marketplace/asset2",
          metadata: {
            assetId: "asset2",
            assetTitle: "SaaS de Gestão de Projetos",
          },
        },
        {
          id: "6",
          type: "asset_approved",
          title: "Ativo aprovado",
          message: "O seu ativo 'App de Fitness' foi aprovado e está visível",
          read: true,
          pinned: false,
          archived: false,
          priority: "medium",
          createdAt: "2024-01-19T16:45:00Z",
          actionUrl: "/marketplace/asset3",
          metadata: {
            assetId: "asset3",
            assetTitle: "App de Fitness e Nutrição",
          },
        },
        {
          id: "7",
          type: "asset_viewed",
          title: "Ativo visualizado",
          message: "O seu e-commerce teve 25 novas visualizações hoje",
          read: true,
          pinned: false,
          archived: false,
          priority: "low",
          createdAt: "2024-01-19T10:20:00Z",
          actionUrl: "/dashboard/analytics",
          metadata: {
            assetId: "asset1",
            assetTitle: "E-commerce de Moda Sustentável",
          },
        },
        {
          id: "8",
          type: "system",
          title: "Atualização da plataforma",
          message: "Nova funcionalidade de valuation com IA disponível",
          read: true,
          pinned: false,
          archived: false,
          priority: "low",
          createdAt: "2024-01-18T09:00:00Z",
          actionUrl: "/valuation",
        },
      ]

      setNotifications(mockNotifications)
      
      // Play sound for new notifications
      const hasUnread = mockNotifications.some(n => !n.read)
      if (hasUnread && soundEnabled && audioRef.current) {
        audioRef.current.play().catch(() => {}) // Ignore autoplay restrictions
      }
    } catch (error) {
      toast.error("Failed to load notifications")
    } finally {
      setIsLoading(false)
    }
  }

  const markAsRead = async (notificationId: string) => {
    try {
      setNotifications(
        notifications.map((notification) =>
          notification.id === notificationId ? { ...notification, read: true } : notification,
        ),
      )
    } catch (error) {
      toast.error("Failed to mark notification as read")
    }
  }

  const markAllAsRead = async () => {
    try {
      setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
      toast.success("All notifications marked as read")
    } catch (error) {
      toast.error("Failed to mark all notifications as read")
    }
  }

  const togglePin = async (notificationId: string) => {
    try {
      setNotifications(
        notifications.map((notification) =>
          notification.id === notificationId 
            ? { ...notification, pinned: !notification.pinned } 
            : notification,
        ),
      )
      const notification = notifications.find(n => n.id === notificationId)
      toast.success(`Notification ${notification?.pinned ? 'unpinned' : 'pinned'}`)
    } catch (error) {
      toast.error("Failed to pin notification")
    }
  }

  const archiveNotification = async (notificationId: string) => {
    try {
      setNotifications(
        notifications.map((notification) =>
          notification.id === notificationId 
            ? { ...notification, archived: true } 
            : notification,
        ),
      )
      toast.success("Notification archived")
    } catch (error) {
      toast.error("Failed to archive notification")
    }
  }

  const deleteNotification = async (notificationId: string) => {
    try {
      setNotifications(notifications.filter((notification) => notification.id !== notificationId))
      toast.success("Notification removed")
    } catch (error) {
      toast.error("Failed to remove notification")
    }
  }

  const bulkAction = async (action: 'read' | 'archive' | 'delete') => {
    try {
      if (action === 'read') {
        setNotifications(
          notifications.map((notification) =>
            selectedNotifications.includes(notification.id) 
              ? { ...notification, read: true } 
              : notification,
          ),
        )
      } else if (action === 'archive') {
        setNotifications(
          notifications.map((notification) =>
            selectedNotifications.includes(notification.id) 
              ? { ...notification, archived: true } 
              : notification,
          ),
        )
      } else if (action === 'delete') {
        setNotifications(
          notifications.filter((notification) => !selectedNotifications.includes(notification.id))
        )
      }
      setSelectedNotifications([])
      toast.success(`${selectedNotifications.length} notifications processed`)
    } catch (error) {
      toast.error("Failed to process notifications")
    }
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4 text-blue-500" />
      case "favorite":
        return <Heart className="h-4 w-4 text-red-500" />
      case "asset_approved":
        return <Check className="h-4 w-4 text-green-500" />
      case "asset_rejected":
        return <X className="h-4 w-4 text-red-500" />
      case "asset_viewed":
        return <Eye className="h-4 w-4 text-purple-500" />
      case "offer":
        return <DollarSign className="h-4 w-4 text-emerald-500" />
      case "payment":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "security":
        return <Shield className="h-4 w-4 text-orange-500" />
      case "system":
        return <Settings className="h-4 w-4 text-gray-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "border-l-red-500 bg-red-50"
      case "high": return "border-l-orange-500 bg-orange-50"
      case "medium": return "border-l-yellow-500 bg-yellow-50"
      case "low": return "border-l-blue-500 bg-blue-50"
      default: return "border-l-gray-500 bg-gray-50"
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent": return <Badge variant="destructive" className="text-xs">URGENTE</Badge>
      case "high": return <Badge className="bg-orange-100 text-orange-700 text-xs">ALTA</Badge>
      case "medium": return <Badge className="bg-yellow-100 text-yellow-700 text-xs">MÉDIA</Badge>
      case "low": return <Badge variant="secondary" className="text-xs">BAIXA</Badge>
      default: return null
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    // Filter by status
    if (filter === "unread" && notification.read) return false
    if (filter === "pinned" && !notification.pinned) return false
    if (filter === "archived" && !notification.archived) return false
    if (filter === "all" && notification.archived) return false

    // Filter by type
    if (typeFilter !== "all" && notification.type !== typeFilter) return false

    // Filter by priority
    if (priorityFilter !== "all" && notification.priority !== priorityFilter) return false

    // Filter by search term
    if (searchTerm && !notification.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !notification.message.toLowerCase().includes(searchTerm.toLowerCase())) return false

    return true
  })

  const unreadCount = notifications.filter((notification) => !notification.read && !notification.archived).length
  const pinnedCount = notifications.filter((notification) => notification.pinned && !notification.archived).length
  const archivedCount = notifications.filter((notification) => notification.archived).length

  if (!isOpen) return null

  return (
    <>
      {/* Audio element for notification sounds */}
      <audio ref={audioRef} preload="auto">
        <source src="/notification-sound.mp3" type="audio/mpeg" />
      </audio>

      <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed right-4 top-16 w-96 max-h-[700px] bg-white rounded-lg shadow-xl border overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell className="h-6 w-6 text-blue-600" />
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">{unreadCount}</span>
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Notificações</h3>
                <p className="text-xs text-slate-500">{unreadCount} não lidas</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="text-slate-500 hover:text-slate-700"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={fetchNotifications}
                disabled={isLoading}
                className="text-slate-500 hover:text-slate-700"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Settings Panel */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-b bg-slate-50 overflow-hidden"
              >
                <div className="p-4 space-y-4">
                  <h4 className="font-medium text-slate-900">Configurações</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sound" className="text-sm">Som</Label>
                      <Switch
                        id="sound"
                        checked={soundEnabled}
                        onCheckedChange={setSoundEnabled}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email" className="text-sm">Email</Label>
                      <Switch
                        id="email"
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push" className="text-sm">Push</Label>
                      <Switch
                        id="push"
                        checked={pushNotifications}
                        onCheckedChange={setPushNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="refresh" className="text-sm">Auto-refresh</Label>
                      <Switch
                        id="refresh"
                        checked={autoRefresh}
                        onCheckedChange={setAutoRefresh}
                      />
                    </div>
                  </div>

                  {autoRefresh && (
                    <div>
                      <Label className="text-sm">Intervalo (segundos)</Label>
                      <Select value={refreshInterval.toString()} onValueChange={(value) => setRefreshInterval(parseInt(value))}>
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15s</SelectItem>
                          <SelectItem value="30">30s</SelectItem>
                          <SelectItem value="60">1min</SelectItem>
                          <SelectItem value="300">5min</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search and Filters */}
          <div className="p-4 border-b space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Pesquisar notificações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-9"
              />
            </div>

            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="flex-1 h-8">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="message">Mensagens</SelectItem>
                  <SelectItem value="offer">Ofertas</SelectItem>
                  <SelectItem value="payment">Pagamentos</SelectItem>
                  <SelectItem value="security">Segurança</SelectItem>
                  <SelectItem value="system">Sistema</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="flex-1 h-8">
                  <SelectValue placeholder="Prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="low">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={filter} onValueChange={(value) => setFilter(value as any)} className="flex-1">
            <div className="border-b">
              <TabsList className="grid w-full grid-cols-4 h-10">
                <TabsTrigger value="all" className="text-xs">
                  Todas ({notifications.filter(n => !n.archived).length})
                </TabsTrigger>
                <TabsTrigger value="unread" className="text-xs">
                  Não lidas ({unreadCount})
                </TabsTrigger>
                <TabsTrigger value="pinned" className="text-xs">
                  Fixadas ({pinnedCount})
                </TabsTrigger>
                <TabsTrigger value="archived" className="text-xs">
                  Arquivo ({archivedCount})
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Bulk Actions */}
            {selectedNotifications.length > 0 && (
              <div className="p-3 bg-blue-50 border-b flex items-center justify-between">
                <span className="text-sm text-blue-700 font-medium">
                  {selectedNotifications.length} selecionadas
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => bulkAction('read')}>
                    <Check className="h-3 w-3 mr-1" />
                    Marcar lidas
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => bulkAction('archive')}>
                    <Archive className="h-3 w-3 mr-1" />
                    Arquivar
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => bulkAction('delete')}>
                    <Trash2 className="h-3 w-3 mr-1" />
                    Remover
                  </Button>
                </div>
              </div>
            )}

            <TabsContent value={filter} className="m-0">
              <ScrollArea className="h-[400px]">
                {isLoading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : filteredNotifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                    <Bell className="h-8 w-8 mb-2" />
                    <p className="text-sm">
                      {filter === "unread" ? "Nenhuma notificação não lida" : 
                       filter === "pinned" ? "Nenhuma notificação fixada" :
                       filter === "archived" ? "Nenhuma notificação arquivada" :
                       searchTerm ? "Nenhum resultado encontrado" : "Nenhuma notificação"}
                    </p>
                  </div>
                ) : (
                  <div className="divide-y">
                    <AnimatePresence>
                      {filteredNotifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className={`group relative p-4 hover:bg-gray-50 cursor-pointer transition-colors border-l-4 ${
                            !notification.read ? getPriorityColor(notification.priority) : "border-l-transparent"
                          }`}
                          onClick={() => {
                            if (!notification.read) {
                              markAsRead(notification.id)
                            }
                            if (notification.actionUrl) {
                              window.location.href = notification.actionUrl
                            }
                          }}
                        >
                          {/* Selection Checkbox */}
                          <div className="absolute top-2 left-2">
                            <input
                              type="checkbox"
                              className="w-3 h-3 rounded border-gray-300"
                              checked={selectedNotifications.includes(notification.id)}
                              onChange={(e) => {
                                e.stopPropagation()
                                if (e.target.checked) {
                                  setSelectedNotifications([...selectedNotifications, notification.id])
                                } else {
                                  setSelectedNotifications(selectedNotifications.filter(id => id !== notification.id))
                                }
                              }}
                            />
                          </div>

                          <div className="flex items-start gap-3 ml-6">
                            {/* Avatar or Icon */}
                            <div className="flex-shrink-0 mt-1">
                              {notification.metadata?.userAvatar ? (
                                <img 
                                  src={notification.metadata.userAvatar} 
                                  alt={notification.metadata.userName}
                                  className="w-8 h-8 rounded-full"
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                                  {getNotificationIcon(notification.type)}
                                </div>
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {notification.title}
                                  </p>
                                  {notification.pinned && (
                                    <Pin className="h-3 w-3 text-blue-500" />
                                  )}
                                  {getPriorityBadge(notification.priority)}
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      togglePin(notification.id)
                                    }}
                                    className="h-6 w-6 p-0"
                                  >
                                    {notification.pinned ? (
                                      <PinOff className="h-3 w-3" />
                                    ) : (
                                      <Pin className="h-3 w-3" />
                                    )}
                                  </Button>
                                  
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      archiveNotification(notification.id)
                                    }}
                                    className="h-6 w-6 p-0"
                                  >
                                    <Archive className="h-3 w-3" />
                                  </Button>
                                  
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      deleteNotification(notification.id)
                                    }}
                                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                              
                              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                {notification.message}
                              </p>
                              
                              {/* Metadata */}
                              {notification.metadata?.amount && (
                                <div className="text-sm font-semibold text-green-600 mb-1">
                                  €{notification.metadata.amount.toLocaleString()}
                                </div>
                              )}
                              
                              <div className="flex items-center justify-between">
                                <p className="text-xs text-gray-400 flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {formatDistanceToNow(new Date(notification.createdAt), {
                                    addSuffix: true,
                                    locale: ptBR,
                                  })}
                                </p>
                                
                                {notification.metadata?.assetTitle && (
                                  <p className="text-xs text-blue-600 truncate max-w-32">
                                    {notification.metadata.assetTitle}
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            {!notification.read && (
                              <div className="flex-shrink-0">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>

          {/* Footer */}
          <div className="p-4 border-t bg-slate-50">
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={markAllAsRead} className="flex-1">
                  <CheckCheck className="h-4 w-4 mr-1" />
                  Marcar todas como lidas
                </Button>
              )}
              
              <Button variant="outline" size="sm" className="flex-1">
                <Download className="h-4 w-4 mr-1" />
                Exportar
              </Button>
              
              <Button variant="outline" size="sm" asChild className="flex-1">
                <a href="/notifications">
                  Ver todas
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}