"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/layout/header"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, Send, MoreVertical, MessageCircle, Clock, CheckCheck, 
  Star, Archive, Trash2, Pin, PinOff, Paperclip, Smile, 
  Phone, Video, Info, Filter, SortAsc, Eye, EyeOff,
  ArrowLeft, Plus, Settings, Bell, BellOff, Download,
  Image as ImageIcon, File, Calendar, MapPin, DollarSign,
  TrendingUp, Users, Shield, AlertTriangle, Check, X
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

interface Message {
  id: string
  subject: string
  content: string
  sender: {
    id: string
    name: string
    avatar?: string
    verified: boolean
    status?: 'online' | 'offline' | 'away'
  }
  receiver: {
    id: string
    name: string
    avatar?: string
  }
  asset?: {
    id: string
    title: string
    price: number
    category: string
    image?: string
  }
  read: boolean
  starred: boolean
  pinned: boolean
  archived: boolean
  priority: 'low' | 'medium' | 'high' | 'urgent'
  type: 'text' | 'offer' | 'system' | 'file'
  attachments?: {
    id: string
    name: string
    type: string
    size: number
    url: string
  }[]
  offer?: {
    amount: number
    terms: string
    status: 'pending' | 'accepted' | 'rejected' | 'countered'
  }
  createdAt: string
  updatedAt: string
  reactions?: {
    emoji: string
    users: string[]
  }[]
}

interface Conversation {
  id: string
  participants: {
    id: string
    name: string
    avatar?: string
    verified: boolean
    status?: 'online' | 'offline' | 'away'
    lastSeen?: string
  }[]
  lastMessage: {
    content: string
    createdAt: string
    senderId: string
    type: string
  }
  unreadCount: number
  starred: boolean
  pinned: boolean
  archived: boolean
  muted: boolean
  asset?: {
    id: string
    title: string
    price: number
    category: string
    image?: string
  }
  tags: string[]
  priority: 'low' | 'medium' | 'high' | 'urgent'
}

export default function MessagesPage() {
  const { user, isAuthenticated } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [filterBy, setFilterBy] = useState("all")
  const [showMessageDetails, setShowMessageDetails] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [selectedMessages, setSelectedMessages] = useState<string[]>([])
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    const fetchConversations = async () => {
      setIsLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Enhanced mock data with more features
      const mockConversations: Conversation[] = [
        {
          id: "1",
          participants: [
            {
              id: "user1",
              name: "João Silva",
              avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50",
              verified: true,
              status: 'online',
              lastSeen: new Date().toISOString(),
            },
            {
              id: user?.id || "current",
              name: user?.name || "Você",
              avatar: user?.avatar,
              verified: false,
              status: 'online',
            },
          ],
          lastMessage: {
            content: "Olá! Tenho interesse no seu e-commerce de moda sustentável. Pode fornecer mais detalhes sobre as métricas de vendas?",
            createdAt: "2024-01-20T14:30:00Z",
            senderId: "user1",
            type: "text",
          },
          unreadCount: 2,
          starred: false,
          pinned: true,
          archived: false,
          muted: false,
          asset: {
            id: "asset1",
            title: "E-commerce de Moda Sustentável",
            price: 45000,
            category: "E-commerce",
            image: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=100",
          },
          tags: ["negociação", "urgente"],
          priority: "high",
        },
        {
          id: "2",
          participants: [
            {
              id: "user2",
              name: "Maria Santos",
              avatar: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=50",
              verified: true,
              status: 'away',
              lastSeen: "2024-01-20T13:00:00Z",
            },
            {
              id: user?.id || "current",
              name: user?.name || "Você",
              avatar: user?.avatar,
              verified: false,
              status: 'online',
            },
          ],
          lastMessage: {
            content: "Perfeito! Vou preparar a documentação e envio ainda hoje.",
            createdAt: "2024-01-19T16:45:00Z",
            senderId: user?.id || "current",
            type: "text",
          },
          unreadCount: 0,
          starred: true,
          pinned: false,
          archived: false,
          muted: false,
          asset: {
            id: "asset2",
            title: "App de Delivery Local",
            price: 78000,
            category: "Mobile App",
            image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=100",
          },
          tags: ["due-diligence"],
          priority: "medium",
        },
        {
          id: "3",
          participants: [
            {
              id: "user3",
              name: "Pedro Costa",
              avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=50",
              verified: false,
              status: 'offline',
              lastSeen: "2024-01-18T08:00:00Z",
            },
            {
              id: user?.id || "current",
              name: user?.name || "Você",
              avatar: user?.avatar,
              verified: false,
              status: 'online',
            },
          ],
          lastMessage: {
            content: "Obrigado pelas informações. Vou analisar e volto com feedback.",
            createdAt: "2024-01-18T10:20:00Z",
            senderId: "user3",
            type: "text",
          },
          unreadCount: 0,
          starred: false,
          pinned: false,
          archived: false,
          muted: false,
          tags: ["follow-up"],
          priority: "low",
        },
      ]

      setConversations(mockConversations)
      setIsLoading(false)
    }

    if (isAuthenticated) {
      fetchConversations()
    }
  }, [isAuthenticated, user])

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConversation) return

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Enhanced mock messages
      const mockMessages: Message[] = [
        {
          id: "1",
          subject: "Interesse no E-commerce de Moda",
          content: "Olá! Vi o seu anúncio do e-commerce de moda sustentável e tenho muito interesse. Pode fornecer mais detalhes sobre as métricas de vendas dos últimos 6 meses?",
          sender: {
            id: "user1",
            name: "João Silva",
            avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50",
            verified: true,
            status: 'online',
          },
          receiver: {
            id: user?.id || "current",
            name: user?.name || "Você",
            avatar: user?.avatar,
          },
          asset: {
            id: "asset1",
            title: "E-commerce de Moda Sustentável",
            price: 45000,
            category: "E-commerce",
            image: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=100",
          },
          read: true,
          starred: false,
          pinned: false,
          archived: false,
          priority: "medium",
          type: "text",
          createdAt: "2024-01-20T14:00:00Z",
          updatedAt: "2024-01-20T14:00:00Z",
          reactions: [
            { emoji: "👍", users: ["current"] }
          ]
        },
        {
          id: "2",
          subject: "Re: Interesse no E-commerce de Moda",
          content: "Olá João! Obrigado pelo interesse. Claro, posso partilhar essas informações. Nos últimos 6 meses tivemos um crescimento médio de 25% MoM. Posso enviar um relatório detalhado se estiver seriamente interessado.",
          sender: {
            id: user?.id || "current",
            name: user?.name || "Você",
            avatar: user?.avatar,
            verified: false,
            status: 'online',
          },
          receiver: {
            id: "user1",
            name: "João Silva",
            avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50",
          },
          asset: {
            id: "asset1",
            title: "E-commerce de Moda Sustentável",
            price: 45000,
            category: "E-commerce",
          },
          read: true,
          starred: false,
          pinned: false,
          archived: false,
          priority: "medium",
          type: "text",
          attachments: [
            {
              id: "att1",
              name: "relatorio-vendas-q4.pdf",
              type: "application/pdf",
              size: 2048000,
              url: "#"
            }
          ],
          createdAt: "2024-01-20T14:15:00Z",
          updatedAt: "2024-01-20T14:15:00Z",
        },
        {
          id: "3",
          subject: "Oferta Formal",
          content: "Após analisar toda a documentação, gostaria de fazer uma oferta formal pelo negócio.",
          sender: {
            id: "user1",
            name: "João Silva",
            avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50",
            verified: true,
            status: 'online',
          },
          receiver: {
            id: user?.id || "current",
            name: user?.name || "Você",
            avatar: user?.avatar,
          },
          asset: {
            id: "asset1",
            title: "E-commerce de Moda Sustentável",
            price: 45000,
            category: "E-commerce",
          },
          read: false,
          starred: false,
          pinned: false,
          archived: false,
          priority: "high",
          type: "offer",
          offer: {
            amount: 42000,
            terms: "Pagamento em 30 dias após due diligence completa",
            status: "pending"
          },
          createdAt: "2024-01-20T14:30:00Z",
          updatedAt: "2024-01-20T14:30:00Z",
        },
      ]

      setMessages(mockMessages)
    }

    fetchMessages()
  }, [selectedConversation, user])

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return

    const message: Message = {
      id: Date.now().toString(),
      subject: "Nova mensagem",
      content: newMessage,
      sender: {
        id: user?.id || "current",
        name: user?.name || "Você",
        avatar: user?.avatar,
        verified: false,
        status: 'online',
      },
      receiver: {
        id: "user1",
        name: "João Silva",
        avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50",
      },
      read: false,
      starred: false,
      pinned: false,
      archived: false,
      priority: "medium",
      type: "text",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setMessages([...messages, message])
    setNewMessage("")

    toast.success("Mensagem enviada com sucesso!")
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleMarkAsRead = (messageId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    ))
  }

  const handleStarMessage = (messageId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, starred: !msg.starred } : msg
    ))
  }

  const handlePinConversation = (conversationId: string) => {
    setConversations(conversations.map(conv => 
      conv.id === conversationId ? { ...conv, pinned: !conv.pinned } : conv
    ))
  }

  const handleMuteConversation = (conversationId: string) => {
    setConversations(conversations.map(conv => 
      conv.id === conversationId ? { ...conv, muted: !conv.muted } : conv
    ))
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'offline': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-red-500'
      case 'high': return 'border-l-orange-500'
      case 'medium': return 'border-l-yellow-500'
      case 'low': return 'border-l-blue-500'
      default: return 'border-l-gray-300'
    }
  }

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.participants.some(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || conv.asset?.title.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTab = activeTab === "all" || 
      (activeTab === "unread" && conv.unreadCount > 0) ||
      (activeTab === "starred" && conv.starred) ||
      (activeTab === "archived" && conv.archived)

    const matchesFilter = filterBy === "all" ||
      (filterBy === "priority" && conv.priority === "high") ||
      (filterBy === "asset" && conv.asset)

    return matchesSearch && matchesTab && matchesFilter
  })

  const selectedConv = conversations.find(c => c.id === selectedConversation)
  const otherParticipant = selectedConv?.participants.find(p => p.id !== user?.id)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="pt-20 text-center">
          <div className="max-w-md mx-auto">
            <MessageCircle className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Acesso Restrito</h1>
            <p className="text-slate-600 mb-6">Precisa de fazer login para ver as mensagens</p>
            <Button asChild>
              <a href="/login">Fazer Login</a>
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
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Mensagens</h1>
              <p className="text-slate-600">Gerir conversas com compradores e vendedores</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nova Conversa
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
            {/* Conversations List */}
            <Card className="lg:col-span-1">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-4">
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Conversas
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSortBy("recent")}>
                        <Clock className="h-4 w-4 mr-2" />
                        Mais recentes
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("unread")}>
                        <Eye className="h-4 w-4 mr-2" />
                        Não lidas
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("priority")}>
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Prioridade
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Pesquisar conversas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all" className="text-xs">Todas</TabsTrigger>
                    <TabsTrigger value="unread" className="text-xs">
                      Não lidas
                      {conversations.filter(c => c.unreadCount > 0).length > 0 && (
                        <Badge className="ml-1 h-4 w-4 p-0 text-xs">
                          {conversations.filter(c => c.unreadCount > 0).length}
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="starred" className="text-xs">
                      <Star className="h-3 w-3" />
                    </TabsTrigger>
                    <TabsTrigger value="archived" className="text-xs">
                      <Archive className="h-3 w-3" />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>

              <CardContent className="p-0">
                <div className="max-h-[500px] overflow-y-auto">
                  {isLoading ? (
                    <div className="p-4 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    </div>
                  ) : filteredConversations.length === 0 ? (
                    <div className="p-4 text-center text-slate-500">
                      <MessageCircle className="h-12 w-12 mx-auto mb-2 text-slate-300" />
                      <p>Nenhuma conversa encontrada</p>
                    </div>
                  ) : (
                    <AnimatePresence>
                      {filteredConversations.map((conversation) => {
                        const otherUser = conversation.participants.find(p => p.id !== user?.id)
                        const isSelected = selectedConversation === conversation.id

                        return (
                          <motion.div
                            key={conversation.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            onClick={() => setSelectedConversation(conversation.id)}
                            className={`p-4 border-b border-l-4 cursor-pointer hover:bg-slate-50 transition-colors relative ${
                              isSelected ? "bg-blue-50 border-blue-200" : ""
                            } ${getPriorityColor(conversation.priority)}`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="relative">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={otherUser?.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>{otherUser?.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(otherUser?.status)}`} />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-sm truncate">{otherUser?.name}</span>
                                    {otherUser?.verified && (
                                      <Badge variant="outline" className="text-xs h-4">
                                        <Check className="h-2 w-2 mr-1" />
                                        ✓
                                      </Badge>
                                    )}
                                    {conversation.pinned && <Pin className="h-3 w-3 text-blue-600" />}
                                    {conversation.muted && <BellOff className="h-3 w-3 text-slate-400" />}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    {conversation.unreadCount > 0 && (
                                      <Badge className="bg-blue-600 text-xs h-4 min-w-4 px-1">
                                        {conversation.unreadCount}
                                      </Badge>
                                    )}
                                    <span className="text-xs text-slate-500">
                                      {formatDistanceToNow(new Date(conversation.lastMessage.createdAt), {
                                        addSuffix: true,
                                        locale: ptBR
                                      })}
                                    </span>
                                  </div>
                                </div>

                                {conversation.asset && (
                                  <div className="flex items-center gap-2 mb-1">
                                    {conversation.asset.image && (
                                      <img 
                                        src={conversation.asset.image} 
                                        alt={conversation.asset.title}
                                        className="w-4 h-4 rounded object-cover"
                                      />
                                    )}
                                    <div className="text-xs text-blue-600 truncate">
                                      {conversation.asset.title} - €{conversation.asset.price.toLocaleString()}
                                    </div>
                                  </div>
                                )}

                                <p className="text-sm text-slate-600 truncate mb-1">
                                  {conversation.lastMessage.content}
                                </p>

                                {conversation.tags.length > 0 && (
                                  <div className="flex gap-1 flex-wrap">
                                    {conversation.tags.slice(0, 2).map(tag => (
                                      <Badge key={tag} variant="secondary" className="text-xs h-4 px-1">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>

                              {conversation.starred && (
                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              )}
                            </div>
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Messages */}
            <Card className="lg:col-span-3">
              {selectedConversation ? (
                <>
                  <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="lg:hidden"
                          onClick={() => setSelectedConversation(null)}
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={otherParticipant?.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{otherParticipant?.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(otherParticipant?.status)}`} />
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">{otherParticipant?.name}</CardTitle>
                            {otherParticipant?.verified && (
                              <Badge variant="outline" className="text-xs">
                                <Shield className="h-3 w-3 mr-1" />
                                Verificado
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            {otherParticipant?.status === 'online' ? (
                              <span className="text-green-600">Online agora</span>
                            ) : (
                              <span>
                                Visto {formatDistanceToNow(new Date(otherParticipant?.lastSeen || ''), {
                                  addSuffix: true,
                                  locale: ptBR
                                })}
                              </span>
                            )}
                            {isTyping && (
                              <span className="text-blue-600 animate-pulse">está a escrever...</span>
                            )}
                          </div>
                          {selectedConv?.asset && (
                            <CardDescription className="flex items-center gap-2">
                              <DollarSign className="h-3 w-3" />
                              {selectedConv.asset.title} - €{selectedConv.asset.price.toLocaleString()}
                            </CardDescription>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setShowMessageDetails(!showMessageDetails)}
                        >
                          <Info className="h-4 w-4" />
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handlePinConversation(selectedConversation)}>
                              {selectedConv?.pinned ? <PinOff className="h-4 w-4 mr-2" /> : <Pin className="h-4 w-4 mr-2" />}
                              {selectedConv?.pinned ? 'Desafixar' : 'Fixar'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleMuteConversation(selectedConversation)}>
                              {selectedConv?.muted ? <Bell className="h-4 w-4 mr-2" /> : <BellOff className="h-4 w-4 mr-2" />}
                              {selectedConv?.muted ? 'Ativar notificações' : 'Silenciar'}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Exportar conversa
                            </DropdownMenuItem>
                            <Separator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Eliminar conversa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0 flex">
                    {/* Messages List */}
                    <div className="flex-1">
                      <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                        <AnimatePresence>
                          {messages.map((message) => {
                            const isOwn = message.sender.id === user?.id

                            return (
                              <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className={`flex ${isOwn ? "justify-end" : "justify-start"} group`}
                              >
                                <div className={`max-w-[70%] ${isOwn ? "order-2" : "order-1"}`}>
                                  {/* Special message types */}
                                  {message.type === 'offer' && message.offer && (
                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-2">
                                      <div className="flex items-center gap-2 mb-2">
                                        <DollarSign className="h-4 w-4 text-green-600" />
                                        <span className="font-semibold text-green-800">Oferta Formal</span>
                                        <Badge className={`text-xs ${
                                          message.offer.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                          message.offer.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                          'bg-red-100 text-red-800'
                                        }`}>
                                          {message.offer.status}
                                        </Badge>
                                      </div>
                                      <div className="text-2xl font-bold text-green-700 mb-2">
                                        €{message.offer.amount.toLocaleString()}
                                      </div>
                                      <p className="text-sm text-green-700">{message.offer.terms}</p>
                                      {!isOwn && message.offer.status === 'pending' && (
                                        <div className="flex gap-2 mt-3">
                                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                            <Check className="h-3 w-3 mr-1" />
                                            Aceitar
                                          </Button>
                                          <Button size="sm" variant="outline">
                                            Contra-oferta
                                          </Button>
                                          <Button size="sm" variant="outline" className="text-red-600">
                                            <X className="h-3 w-3 mr-1" />
                                            Rejeitar
                                          </Button>
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  <div
                                    className={`rounded-lg p-3 relative ${
                                      isOwn ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-900"
                                    }`}
                                  >
                                    <p className="text-sm">{message.content}</p>
                                    
                                    {/* Attachments */}
                                    {message.attachments && message.attachments.length > 0 && (
                                      <div className="mt-2 space-y-2">
                                        {message.attachments.map(attachment => (
                                          <div key={attachment.id} className="flex items-center gap-2 p-2 bg-white/10 rounded">
                                            <File className="h-4 w-4" />
                                            <span className="text-xs">{attachment.name}</span>
                                            <span className="text-xs opacity-70">
                                              ({(attachment.size / 1024 / 1024).toFixed(1)} MB)
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    )}

                                    {/* Reactions */}
                                    {message.reactions && message.reactions.length > 0 && (
                                      <div className="flex gap-1 mt-2">
                                        {message.reactions.map((reaction, idx) => (
                                          <div key={idx} className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-1">
                                            <span className="text-xs">{reaction.emoji}</span>
                                            <span className="text-xs">{reaction.users.length}</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}

                                    {/* Message actions */}
                                    <div className={`absolute top-0 ${isOwn ? '-left-20' : '-right-20'} opacity-0 group-hover:opacity-100 transition-opacity flex gap-1`}>
                                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                        <Smile className="h-3 w-3" />
                                      </Button>
                                      <Button 
                                        size="sm" 
                                        variant="ghost" 
                                        className="h-6 w-6 p-0"
                                        onClick={() => handleStarMessage(message.id)}
                                      >
                                        <Star className={`h-3 w-3 ${message.starred ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                                      </Button>
                                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                        <MoreVertical className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>
                                  
                                  <div
                                    className={`flex items-center gap-1 mt-1 text-xs text-slate-500 ${
                                      isOwn ? "justify-end" : "justify-start"
                                    }`}
                                  >
                                    <span>
                                      {new Date(message.createdAt).toLocaleTimeString("pt-PT", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </span>
                                    {isOwn && (
                                      <>
                                        {message.read ? (
                                          <CheckCheck className="h-3 w-3 text-blue-600" />
                                        ) : (
                                          <Check className="h-3 w-3 text-slate-400" />
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>

                                {!isOwn && (
                                  <Avatar className="h-8 w-8 order-1 mr-2">
                                    <AvatarImage src={message.sender.avatar || "/placeholder.svg"} />
                                    <AvatarFallback className="text-xs">{message.sender.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                )}
                              </motion.div>
                            )
                          })}
                        </AnimatePresence>
                        <div ref={messagesEndRef} />
                      </div>

                      {/* Message Input */}
                      <div className="border-t p-4">
                        <div className="flex gap-2 items-end">
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={handleFileUpload}
                            >
                              <Paperclip className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <ImageIcon className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            >
                              <Smile className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <Textarea
                            placeholder="Escreva a sua mensagem..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault()
                                handleSendMessage()
                              }
                            }}
                            rows={2}
                            className="flex-1 resize-none"
                          />
                          
                          <Button 
                            onClick={handleSendMessage} 
                            disabled={!newMessage.trim()}
                            className="px-6"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Message Details Sidebar */}
                    <AnimatePresence>
                      {showMessageDetails && (
                        <motion.div
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: 300, opacity: 1 }}
                          exit={{ width: 0, opacity: 0 }}
                          className="border-l bg-slate-50 overflow-hidden"
                        >
                          <div className="p-4">
                            <h3 className="font-semibold mb-4">Detalhes da Conversa</h3>
                            
                            {selectedConv?.asset && (
                              <div className="mb-4">
                                <h4 className="text-sm font-medium mb-2">Ativo em Discussão</h4>
                                <div className="bg-white p-3 rounded-lg border">
                                  {selectedConv.asset.image && (
                                    <img 
                                      src={selectedConv.asset.image} 
                                      alt={selectedConv.asset.title}
                                      className="w-full h-20 object-cover rounded mb-2"
                                    />
                                  )}
                                  <div className="text-sm font-medium">{selectedConv.asset.title}</div>
                                  <div className="text-sm text-slate-600">{selectedConv.asset.category}</div>
                                  <div className="text-lg font-bold text-green-600 mt-1">
                                    €{selectedConv.asset.price.toLocaleString()}
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="mb-4">
                              <h4 className="text-sm font-medium mb-2">Participantes</h4>
                              <div className="space-y-2">
                                {selectedConv?.participants.map(participant => (
                                  <div key={participant.id} className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage src={participant.avatar} />
                                      <AvatarFallback className="text-xs">{participant.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm">{participant.name}</span>
                                    {participant.verified && (
                                      <Badge variant="outline" className="text-xs h-4">✓</Badge>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {selectedConv?.tags && selectedConv.tags.length > 0 && (
                              <div className="mb-4">
                                <h4 className="text-sm font-medium mb-2">Tags</h4>
                                <div className="flex flex-wrap gap-1">
                                  {selectedConv.tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="space-y-2">
                              <Button variant="outline" size="sm" className="w-full justify-start">
                                <Calendar className="h-4 w-4 mr-2" />
                                Agendar reunião
                              </Button>
                              <Button variant="outline" size="sm" className="w-full justify-start">
                                <Download className="h-4 w-4 mr-2" />
                                Exportar conversa
                              </Button>
                              <Button variant="outline" size="sm" className="w-full justify-start text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Eliminar conversa
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </>
              ) : (
                <CardContent className="flex items-center justify-center h-full">
                  <div className="text-center text-slate-500">
                    <MessageCircle className="h-16 w-16 mx-auto mb-4 text-slate-300" />
                    <h3 className="text-lg font-medium mb-2">Selecione uma conversa</h3>
                    <p>Escolha uma conversa da lista para começar a trocar mensagens</p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) {
            toast.success(`${e.target.files.length} ficheiro(s) selecionado(s)`)
          }
        }}
      />
    </div>
  )
}