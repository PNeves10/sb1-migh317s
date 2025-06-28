'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Header } from '@/components/layout/header';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  TrendingUp,
  DollarSign,
  Eye,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  MoreVertical,
  Ban,
  UserCheck,
  Filter,
  Download,
  RefreshCw,
  Calendar,
  Clock,
  Star,
  Globe,
  Activity,
  BarChart3,
  PieChart,
  Zap,
  Target,
  Loader2,
  Mail,
  Phone,
  MapPin,
  Building,
  CreditCard,
  FileText,
  Settings,
  Bell,
  Database,
  Server,
  Wifi,
  HardDrive
} from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  totalAssets: number;
  totalRevenue: number;
  pendingAssets: number;
  activeUsers: number;
  verifiedUsers: number;
  monthlyGrowth: number;
  conversionRate: number;
  avgDealSize: number;
  systemUptime: number;
}

interface PendingAsset {
  id: string;
  title: string;
  type: string;
  price: number;
  seller: {
    name: string;
    email: string;
    verified: boolean;
    avatar?: string;
    joinDate: string;
  };
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  category: string;
  riskScore: number;
}

interface UserManagement {
  id: string;
  name: string;
  email: string;
  userType: string;
  verified: boolean;
  assetsCount: number;
  joinedAt: string;
  lastActive: string;
  status: 'active' | 'suspended' | 'banned';
  avatar?: string;
  location?: string;
  totalSpent: number;
  riskLevel: 'low' | 'medium' | 'high';
  kycStatus: 'pending' | 'approved' | 'rejected';
}

interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkTraffic: number;
  activeConnections: number;
  errorRate: number;
}

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalAssets: 0,
    totalRevenue: 0,
    pendingAssets: 0,
    activeUsers: 0,
    verifiedUsers: 0,
    monthlyGrowth: 0,
    conversionRate: 0,
    avgDealSize: 0,
    systemUptime: 0,
  });

  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    cpuUsage: 0,
    memoryUsage: 0,
    diskUsage: 0,
    networkTraffic: 0,
    activeConnections: 0,
    errorRate: 0,
  });

  const [pendingAssets, setPendingAssets] = useState<PendingAsset[]>([]);
  const [users, setUsers] = useState<UserManagement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Check if user is admin
    if (!user || user.email !== 'admin@aiquira.com') {
      router.push('/');
      return;
    }

    const fetchAdminData = async () => {
      setIsLoading(true);

      // Simulate API calls with realistic delays
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Enhanced mock admin stats
      setStats({
        totalUsers: 1247,
        totalAssets: 89,
        totalRevenue: 2450000,
        pendingAssets: 12,
        activeUsers: 234,
        verifiedUsers: 89,
        monthlyGrowth: 18.5,
        conversionRate: 3.2,
        avgDealSize: 89500,
        systemUptime: 99.9,
      });

      // Mock system metrics
      setSystemMetrics({
        cpuUsage: 45,
        memoryUsage: 67,
        diskUsage: 34,
        networkTraffic: 1250,
        activeConnections: 1847,
        errorRate: 0.02,
      });

      // Enhanced mock pending assets
      setPendingAssets([
        {
          id: '1',
          title: 'E-commerce de Produtos Orgânicos',
          type: 'E-commerce',
          category: 'ecommerce',
          price: 65000,
          priority: 'high',
          riskScore: 2.3,
          seller: {
            name: 'Maria Santos',
            email: 'maria@exemplo.com',
            verified: false,
            avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=50',
            joinDate: '2023-08-15',
          },
          createdAt: '2024-01-20T10:00:00Z',
          status: 'pending',
        },
        {
          id: '2',
          title: 'App de Meditação Premium',
          type: 'Mobile App',
          category: 'app',
          price: 45000,
          priority: 'medium',
          riskScore: 1.8,
          seller: {
            name: 'João Silva',
            email: 'joao@exemplo.com',
            verified: true,
            avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50',
            joinDate: '2023-03-22',
          },
          createdAt: '2024-01-19T15:30:00Z',
          status: 'pending',
        },
        {
          id: '3',
          title: 'SaaS de CRM Empresarial',
          type: 'SaaS',
          category: 'saas',
          price: 150000,
          priority: 'high',
          riskScore: 1.2,
          seller: {
            name: 'Pedro Costa',
            email: 'pedro@exemplo.com',
            verified: true,
            avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=50',
            joinDate: '2022-11-10',
          },
          createdAt: '2024-01-18T09:15:00Z',
          status: 'pending',
        },
      ]);

      // Enhanced mock users
      setUsers([
        {
          id: '1',
          name: 'Ana Silva',
          email: 'ana@exemplo.com',
          userType: 'seller',
          verified: true,
          assetsCount: 5,
          joinedAt: '2023-06-15T10:00:00Z',
          lastActive: '2024-01-20T14:30:00Z',
          status: 'active',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50',
          location: 'Lisboa, Portugal',
          totalSpent: 125000,
          riskLevel: 'low',
          kycStatus: 'approved',
        },
        {
          id: '2',
          name: 'João Santos',
          email: 'joao@exemplo.com',
          userType: 'buyer',
          verified: false,
          assetsCount: 0,
          joinedAt: '2023-08-22T16:45:00Z',
          lastActive: '2024-01-19T11:20:00Z',
          status: 'active',
          avatar: 'https://images.pexels.com/photos/2897883/pexels-photo-2897883.jpeg?auto=compress&cs=tinysrgb&w=50',
          location: 'Porto, Portugal',
          totalSpent: 0,
          riskLevel: 'medium',
          kycStatus: 'pending',
        },
        {
          id: '3',
          name: 'Maria Oliveira',
          email: 'maria@exemplo.com',
          userType: 'both',
          verified: true,
          assetsCount: 3,
          joinedAt: '2023-04-10T08:30:00Z',
          lastActive: '2024-01-18T16:45:00Z',
          status: 'suspended',
          avatar: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=50',
          location: 'Braga, Portugal',
          totalSpent: 89000,
          riskLevel: 'high',
          kycStatus: 'rejected',
        },
      ]);

      setIsLoading(false);
    };

    fetchAdminData();
  }, [user, router]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
    toast.success('Dados atualizados com sucesso');
  };

  const handleAssetAction = async (assetId: string, action: 'approve' | 'reject') => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      setPendingAssets(
        pendingAssets.map((asset) =>
          asset.id === assetId ? { ...asset, status: action === 'approve' ? 'approved' : 'rejected' } : asset,
        ),
      );

      toast.success(
        action === 'approve' ? 'Ativo aprovado com sucesso' : 'Ativo rejeitado',
        {
          description: `O ativo foi ${action === 'approve' ? 'aprovado e está agora visível no marketplace' : 'rejeitado e o vendedor foi notificado'}`,
        }
      );
    } catch (error) {
      toast.error('Erro ao processar ação', {
        description: 'Ocorreu um erro inesperado. Tente novamente.',
      });
    }
  };

  const handleBulkAssetAction = async (action: 'approve' | 'reject') => {
    if (selectedAssets.length === 0) {
      toast.error('Selecione pelo menos um ativo');
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setPendingAssets(
        pendingAssets.map((asset) =>
          selectedAssets.includes(asset.id) 
            ? { ...asset, status: action === 'approve' ? 'approved' : 'rejected' } 
            : asset
        )
      );

      setSelectedAssets([]);
      toast.success(
        `${selectedAssets.length} ativos ${action === 'approve' ? 'aprovados' : 'rejeitados'} com sucesso`
      );
    } catch (error) {
      toast.error('Erro na ação em lote');
    }
  };

  const handleUserAction = async (userId: string, action: 'verify' | 'suspend' | 'activate' | 'ban') => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      setUsers(
        users.map((user) => {
          if (user.id === userId) {
            switch (action) {
              case 'verify':
                return { ...user, verified: true };
              case 'suspend':
                return { ...user, status: 'suspended' };
              case 'activate':
                return { ...user, status: 'active' };
              case 'ban':
                return { ...user, status: 'banned' };
              default:
                return user;
            }
          }
          return user;
        }),
      );

      const actionText = {
        verify: 'verificado',
        suspend: 'suspenso',
        activate: 'ativado',
        ban: 'banido'
      };

      toast.success(`Utilizador ${actionText[action]} com sucesso`, {
        description: 'A ação foi executada e o utilizador foi notificado',
      });
    } catch (error) {
      toast.error('Erro ao processar ação do utilizador');
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredAssets = pendingAssets.filter((asset) => {
    const matchesPriority = priorityFilter === 'all' || asset.priority === priorityFilter;
    return matchesPriority && asset.status === 'pending';
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-slate-600';
    }
  };

  if (!user || user.email !== 'admin@aiquira.com') {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="pt-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Acesso Negado</h1>
            <p className="text-slate-600 mb-6">Não tem permissões para aceder a esta área administrativa</p>
            <Button onClick={() => router.push('/')} className="bg-blue-600 hover:bg-blue-700">
              Voltar ao Início
            </Button>
          </motion.div>
        </div>
      </div>
    );
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  Painel de Administração
                  <Badge className="bg-green-100 text-green-700">
                    Sistema Online
                  </Badge>
                </h1>
                <p className="text-slate-600">
                  Gerir utilizadores, ativos e configurações da plataforma AIQuira
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="flex items-center"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                  {refreshing ? 'A atualizar...' : 'Atualizar'}
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Relatório
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
            <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Utilizadores</CardTitle>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                <div className="flex items-center text-xs text-emerald-600 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{stats.monthlyGrowth}% este mês
                </div>
                <Progress value={stats.monthlyGrowth} className="h-1 mt-2" />
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-emerald-500 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ativos Pendentes</CardTitle>
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Clock className="h-4 w-4 text-emerald-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingAssets}</div>
                <div className="text-xs text-slate-600 mt-1">
                  {stats.totalAssets} total de ativos
                </div>
                <div className="flex space-x-1 mt-2">
                  <div className="h-1 bg-red-500 rounded flex-1"></div>
                  <div className="h-1 bg-yellow-500 rounded flex-1"></div>
                  <div className="h-1 bg-green-500 rounded flex-1"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Volume Total</CardTitle>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <DollarSign className="h-4 w-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€{(stats.totalRevenue / 1000000).toFixed(1)}M</div>
                <div className="text-xs text-slate-600 mt-1">
                  Média: €{stats.avgDealSize.toLocaleString()}
                </div>
                <Progress value={75} className="h-1 mt-2" />
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sistema</CardTitle>
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Activity className="h-4 w-4 text-amber-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.systemUptime}%</div>
                <div className="text-xs text-emerald-600 mt-1">
                  Uptime últimos 30 dias
                </div>
                <Progress value={stats.systemUptime} className="h-1 mt-2" />
              </CardContent>
            </Card>
          </motion.div>

          {/* System Health Alert */}
          <AnimatePresence>
            {systemMetrics.errorRate > 0.05 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <Alert className="border-amber-200 bg-amber-50">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    <strong>Atenção:</strong> Taxa de erro do sistema acima do normal ({(systemMetrics.errorRate * 100).toFixed(2)}%). 
                    Monitorização ativa em curso.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="assets">Ativos</TabsTrigger>
              <TabsTrigger value="users">Utilizadores</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="system">Sistema</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Real-time Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-blue-600" />
                      Atividade em Tempo Real
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Novo utilizador registado</p>
                          <p className="text-xs text-slate-600">João Silva - há 2 minutos</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Ativo aprovado</p>
                          <p className="text-xs text-slate-600">SaaS CRM - há 5 minutos</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Transação completada</p>
                          <p className="text-xs text-slate-600">€89,000 - há 12 minutos</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-amber-600" />
                      Ações Rápidas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="h-20 flex-col">
                        <Users className="h-6 w-6 mb-2" />
                        <span className="text-xs">Verificar Utilizadores</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col">
                        <CheckCircle className="h-6 w-6 mb-2" />
                        <span className="text-xs">Aprovar Ativos</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col">
                        <BarChart3 className="h-6 w-6 mb-2" />
                        <span className="text-xs">Ver Relatórios</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col">
                        <Settings className="h-6 w-6 mb-2" />
                        <span className="text-xs">Configurações</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Platform Health */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-green-600" />
                    Saúde da Plataforma
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-600 mb-2">{stats.conversionRate}%</div>
                      <p className="text-sm text-slate-600 mb-2">Taxa de Conversão</p>
                      <Progress value={stats.conversionRate * 10} className="h-2" />
                      <p className="text-xs text-emerald-600 mt-1">Acima da média</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{stats.systemUptime}%</div>
                      <p className="text-sm text-slate-600 mb-2">Uptime do Sistema</p>
                      <Progress value={stats.systemUptime} className="h-2" />
                      <p className="text-xs text-blue-600 mt-1">Últimos 30 dias</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">4.8/5</div>
                      <p className="text-sm text-slate-600 mb-2">Satisfação</p>
                      <Progress value={96} className="h-2" />
                      <p className="text-xs text-purple-600 mt-1">1,247 avaliações</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-amber-600 mb-2">24h</div>
                      <p className="text-sm text-slate-600 mb-2">Tempo Médio</p>
                      <Progress value={75} className="h-2" />
                      <p className="text-xs text-amber-600 mt-1">Para aprovação</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assets" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                        Ativos Pendentes de Aprovação
                        <Badge variant="secondary">{filteredAssets.length}</Badge>
                      </CardTitle>
                      <CardDescription>
                        Revise e aprove novos ativos listados na plataforma
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Prioridade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas</SelectItem>
                          <SelectItem value="high">Alta</SelectItem>
                          <SelectItem value="medium">Média</SelectItem>
                          <SelectItem value="low">Baixa</SelectItem>
                        </SelectContent>
                      </Select>
                      {selectedAssets.length > 0 && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleBulkAssetAction('approve')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Aprovar ({selectedAssets.length})
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleBulkAssetAction('reject')}
                          >
                            Rejeitar ({selectedAssets.length})
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
                      <p className="text-slate-600">A carregar ativos...</p>
                    </div>
                  ) : filteredAssets.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">
                      <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                      <p className="text-lg font-medium">Todos os ativos foram revisados</p>
                      <p className="text-sm">Não há ativos pendentes de aprovação</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredAssets.map((asset) => (
                        <motion.div
                          key={asset.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <input
                                type="checkbox"
                                checked={selectedAssets.includes(asset.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedAssets([...selectedAssets, asset.id]);
                                  } else {
                                    setSelectedAssets(selectedAssets.filter(id => id !== asset.id));
                                  }
                                }}
                                className="mt-1"
                              />
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={asset.seller.avatar} alt={asset.seller.name} />
                                <AvatarFallback>{asset.seller.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="space-y-3 flex-1">
                                <div>
                                  <h3 className="font-semibold text-lg flex items-center gap-2">
                                    {asset.title}
                                    <Badge className={getPriorityColor(asset.priority)}>
                                      {asset.priority.toUpperCase()}
                                    </Badge>
                                  </h3>
                                  <div className="flex items-center gap-3 mt-2">
                                    <Badge variant="secondary" className="capitalize">
                                      {asset.type}
                                    </Badge>
                                    <span className="text-2xl font-bold text-green-600">
                                      €{asset.price.toLocaleString()}
                                    </span>
                                    <div className="flex items-center text-sm text-slate-600">
                                      <Target className="h-3 w-3 mr-1" />
                                      Risco: {asset.riskScore}/10
                                    </div>
                                  </div>
                                </div>
                                <div className="text-sm text-slate-600 space-y-1">
                                  <div className="flex items-center gap-4">
                                    <span>
                                      <strong>Vendedor:</strong> {asset.seller.name} ({asset.seller.email})
                                    </span>
                                    {asset.seller.verified && (
                                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                                        ✓ Verificado
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <span>
                                      <strong>Submetido:</strong> {new Date(asset.createdAt).toLocaleDateString('pt-PT')}
                                    </span>
                                    <span>
                                      <strong>Membro desde:</strong> {new Date(asset.seller.joinDate).toLocaleDateString('pt-PT')}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleAssetAction(asset.id, 'approve')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Aprovar
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleAssetAction(asset.id, 'reject')}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Rejeitar
                              </Button>
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Gestão de Utilizadores
                        <Badge variant="secondary">{filteredUsers.length}</Badge>
                      </CardTitle>
                      <CardDescription>
                        Gerir contas de utilizadores, verificações e permissões
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Enhanced Search and Filters */}
                  <div className="flex gap-4 mb-6">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          placeholder="Pesquisar por nome ou email..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filtrar por status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os Status</SelectItem>
                        <SelectItem value="active">Ativos</SelectItem>
                        <SelectItem value="suspended">Suspensos</SelectItem>
                        <SelectItem value="banned">Banidos</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Mais Filtros
                    </Button>
                  </div>

                  {/* Enhanced Users Table */}
                  <div className="space-y-4">
                    {filteredUsers.map((user) => (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-3 flex-1">
                              <div>
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-semibold text-lg">{user.name}</h3>
                                  {user.verified && (
                                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                                      ✓ Verificado
                                    </Badge>
                                  )}
                                  <Badge
                                    variant={
                                      user.status === 'active'
                                        ? 'default'
                                        : user.status === 'suspended'
                                        ? 'secondary'
                                        : 'destructive'
                                    }
                                    className="capitalize"
                                  >
                                    {user.status}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className={`text-xs ${getRiskColor(user.riskLevel)}`}
                                  >
                                    Risco: {user.riskLevel}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-600">
                                  <div>
                                    <Mail className="h-3 w-3 inline mr-1" />
                                    {user.email}
                                  </div>
                                  <div>
                                    <Building className="h-3 w-3 inline mr-1" />
                                    {user.userType}
                                  </div>
                                  <div>
                                    <MapPin className="h-3 w-3 inline mr-1" />
                                    {user.location}
                                  </div>
                                  <div>
                                    <CreditCard className="h-3 w-3 inline mr-1" />
                                    €{user.totalSpent.toLocaleString()}
                                  </div>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-600">
                                <div>
                                  <strong>Ativos:</strong> {user.assetsCount}
                                </div>
                                <div>
                                  <strong>Membro desde:</strong> {new Date(user.joinedAt).toLocaleDateString('pt-PT')}
                                </div>
                                <div>
                                  <strong>Última atividade:</strong> {new Date(user.lastActive).toLocaleDateString('pt-PT')}
                                </div>
                                <div>
                                  <strong>KYC:</strong> 
                                  <Badge
                                    variant="outline"
                                    className={`ml-1 text-xs ${
                                      user.kycStatus === 'approved' ? 'text-green-600' :
                                      user.kycStatus === 'pending' ? 'text-yellow-600' :
                                      'text-red-600'
                                    }`}
                                  >
                                    {user.kycStatus}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            {!user.verified && (
                              <Button size="sm" variant="outline" onClick={() => handleUserAction(user.id, 'verify')}>
                                <UserCheck className="h-4 w-4 mr-1" />
                                Verificar
                              </Button>
                            )}

                            {user.status === 'active' && (
                              <Button size="sm" variant="outline" onClick={() => handleUserAction(user.id, 'suspend')}>
                                <Ban className="h-4 w-4 mr-1" />
                                Suspender
                              </Button>
                            )}

                            {user.status === 'suspended' && (
                              <Button size="sm" variant="outline" onClick={() => handleUserAction(user.id, 'activate')}>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Ativar
                              </Button>
                            )}

                            <Button size="sm" variant="destructive" onClick={() => handleUserAction(user.id, 'ban')}>
                              <XCircle className="h-4 w-4 mr-1" />
                              Banir
                            </Button>

                            <Button size="sm" variant="outline">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Crescimento de Utilizadores
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-slate-500 bg-slate-50 rounded-lg">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 mx-auto mb-2 text-slate-400" />
                        <p>Gráfico de crescimento</p>
                        <p className="text-sm">(Implementar com Chart.js)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="h-5 w-5 mr-2" />
                      Volume de Transações
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-slate-500 bg-slate-50 rounded-lg">
                      <div className="text-center">
                        <PieChart className="h-12 w-12 mx-auto mb-2 text-slate-400" />
                        <p>Gráfico de transações</p>
                        <p className="text-sm">(Implementar com Chart.js)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tipos de Ativos Mais Populares</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { type: 'E-commerce', count: 35, percentage: 39, color: 'bg-blue-500' },
                        { type: 'SaaS', count: 28, percentage: 31, color: 'bg-emerald-500' },
                        { type: 'App Mobile', count: 15, percentage: 17, color: 'bg-purple-500' },
                        { type: 'Website', count: 11, percentage: 13, color: 'bg-amber-500' },
                      ].map((item) => (
                        <div key={item.type} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{item.type}</span>
                            <span className="text-slate-600">
                              {item.count} ({item.percentage}%)
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className={`${item.color} h-2 rounded-full transition-all duration-500`}
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Métricas de Engagement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Taxa de Conversão</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">12.5%</span>
                          <Badge className="bg-green-100 text-green-700 text-xs">+2.3%</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Tempo Médio na Plataforma</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">8m 32s</span>
                          <Badge className="bg-blue-100 text-blue-700 text-xs">+45s</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Taxa de Retenção (30 dias)</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">68%</span>
                          <Badge className="bg-emerald-100 text-emerald-700 text-xs">+5%</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">NPS Score</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">+42</span>
                          <Badge className="bg-purple-100 text-purple-700 text-xs">Excelente</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="system" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Server className="h-5 w-5 mr-2" />
                      Métricas do Sistema
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>CPU Usage</span>
                        <span>{systemMetrics.cpuUsage}%</span>
                      </div>
                      <Progress value={systemMetrics.cpuUsage} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Memory Usage</span>
                        <span>{systemMetrics.memoryUsage}%</span>
                      </div>
                      <Progress value={systemMetrics.memoryUsage} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Disk Usage</span>
                        <span>{systemMetrics.diskUsage}%</span>
                      </div>
                      <Progress value={systemMetrics.diskUsage} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Wifi className="h-5 w-5 mr-2" />
                      Tráfego de Rede
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Tráfego Atual</span>
                      <span className="font-medium">{systemMetrics.networkTraffic} MB/s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Conexões Ativas</span>
                      <span className="font-medium">{systemMetrics.activeConnections.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Taxa de Erro</span>
                      <span className={`font-medium ${systemMetrics.errorRate > 0.05 ? 'text-red-600' : 'text-green-600'}`}>
                        {(systemMetrics.errorRate * 100).toFixed(2)}%
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Database className="h-5 w-5 mr-2" />
                      Base de Dados
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Queries/sec</span>
                      <span className="font-medium">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Avg Response Time</span>
                      <span className="font-medium">12ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Connection Pool</span>
                      <span className="font-medium">85/100</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <HardDrive className="h-5 w-5 mr-2" />
                      Armazenamento
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Total Storage</span>
                      <span className="font-medium">2.4 TB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Used</span>
                      <span className="font-medium">816 GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Available</span>
                      <span className="font-medium">1.6 TB</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Configurações da Plataforma
                  </CardTitle>
                  <CardDescription>
                    Gerir configurações globais e parâmetros do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Taxa de Comissão (%)</Label>
                      <Input defaultValue="5" type="number" />
                      <p className="text-xs text-slate-500">Taxa aplicada a todas as transações</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Valor Mínimo de Listagem (€)</Label>
                      <Input defaultValue="1000" type="number" />
                      <p className="text-xs text-slate-500">Valor mínimo para listar um ativo</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Tempo de Aprovação (horas)</Label>
                      <Input defaultValue="48" type="number" />
                      <p className="text-xs text-slate-500">Tempo máximo para aprovação de ativos</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Máximo de Imagens por Ativo</Label>
                      <Input defaultValue="5" type="number" />
                      <p className="text-xs text-slate-500">Limite de imagens por listagem</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Limite de Tentativas de Login</Label>
                      <Input defaultValue="3" type="number" />
                      <p className="text-xs text-slate-500">Tentativas antes de bloquear conta</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Duração do Token (minutos)</Label>
                      <Input defaultValue="60" type="number" />
                      <p className="text-xs text-slate-500">Duração da sessão do utilizador</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Notificações do Sistema</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email de Novos Registos</p>
                          <p className="text-sm text-slate-600">Notificar admins sobre novos utilizadores</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Alertas de Segurança</p>
                          <p className="text-sm text-slate-600">Notificar sobre atividades suspeitas</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Relatórios Semanais</p>
                          <p className="text-sm text-slate-600">Enviar resumo semanal por email</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Settings className="h-4 w-4 mr-2" />
                      Guardar Configurações
                    </Button>
                    <Button variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Restaurar Padrões
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}