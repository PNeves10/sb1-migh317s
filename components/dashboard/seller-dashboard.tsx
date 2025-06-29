'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, MessageSquare, DollarSign, Eye, Plus, Users,
  Globe, ShoppingCart, Smartphone, Code, BarChart3, Clock,
  Star, ArrowUpRight, Zap, Target, AlertCircle, CheckCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Mock data
const myAssets = [
  {
    id: '1',
    title: 'TaskFlow SaaS',
    category: 'SaaS',
    status: 'active',
    price: 125000,
    revenue: 8500,
    views: 432,
    inquiries: 12,
    score: 8.7,
    listed: '2024-01-15',
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: '2',
    title: 'Recipe Blog Network',
    category: 'Content',
    status: 'pending',
    price: 65000,
    revenue: 3200,
    views: 156,
    inquiries: 4,
    score: 7.2,
    listed: '2024-01-20',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: '3',
    title: 'Fitness E-commerce',
    category: 'E-commerce',
    status: 'sold',
    price: 89000,
    revenue: 5200,
    views: 678,
    inquiries: 23,
    score: 9.1,
    listed: '2023-12-01',
    image: 'https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
];

const performanceData = [
  { month: 'Jan', views: 120, inquiries: 8, revenue: 0 },
  { month: 'Feb', views: 180, revenue: 0, inquiries: 12 },
  { month: 'Mar', views: 240, revenue: 89000, inquiries: 18 },
  { month: 'Apr', views: 320, revenue: 0, inquiries: 15 },
  { month: 'May', views: 380, revenue: 0, inquiries: 22 },
  { month: 'Jun', views: 420, revenue: 0, inquiries: 28 },
];

const categoryData = [
  { name: 'SaaS', value: 45, color: '#3B82F6' },
  { name: 'E-commerce', value: 30, color: '#10B981' },
  { name: 'Content', value: 15, color: '#F59E0B' },
  { name: 'Mobile Apps', value: 10, color: '#EF4444' },
];

const recentInquiries = [
  {
    id: '1',
    buyer: 'John Martinez',
    asset: 'TaskFlow SaaS',
    message: 'Very interested in the SaaS. Can we schedule a call to discuss?',
    time: '2 hours ago',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50',
    status: 'new'
  },
  {
    id: '2',
    buyer: 'Lisa Chen',
    asset: 'Recipe Blog Network',
    message: 'What is the current traffic breakdown by geography?',
    time: '5 hours ago',
    avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=50',
    status: 'replied'
  },
  {
    id: '3',
    buyer: 'David Kim',
    asset: 'TaskFlow SaaS',
    message: 'Could you provide more details about the tech stack?',
    time: '1 day ago',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=50',
    status: 'pending'
  },
];

export function SellerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const totalRevenue = myAssets.reduce((sum, asset) => sum + (asset.status === 'sold' ? asset.price : 0), 0);
  const totalViews = myAssets.reduce((sum, asset) => sum + asset.views, 0);
  const totalInquiries = myAssets.reduce((sum, asset) => sum + asset.inquiries, 0);
  const activeAssets = myAssets.filter(asset => asset.status === 'active').length;

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Painel de Vendedor 📈
          </h1>
          <p className="text-slate-600 mt-1">
            Gere os seus ativos digitais e acompanhe o desempenho
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button asChild>
            <Link href="/dashboard/new-asset">
              <Plus className="h-4 w-4 mr-2" />
              Listar Novo Ativo
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/valuation">
              <Zap className="h-4 w-4 mr-2" />
              Avaliação IA
            </Link>
          </Button>
        </div>
      </div>

      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Receita Total</p>
                <p className="text-2xl font-bold text-slate-900">€{totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-emerald-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15% este trimestre
                </p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-full">
                <DollarSign className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Listagens Ativas</p>
                <p className="text-2xl font-bold text-slate-900">{activeAssets}</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <Globe className="h-3 w-3 mr-1" />
                  Online no marketplace
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Visualizações Totais</p>
                <p className="text-2xl font-bold text-slate-900">{totalViews.toLocaleString()}</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <Eye className="h-3 w-3 mr-1" />
                  Este mês
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Contactos</p>
                <p className="text-2xl font-bold text-slate-900">{totalInquiries}</p>
                <p className="text-xs text-amber-600 flex items-center mt-1">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  3 novos hoje
                </p>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                <MessageSquare className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Resumo</TabsTrigger>
          <TabsTrigger value="assets">Meus Ativos</TabsTrigger>
          <TabsTrigger value="analytics">Análise</TabsTrigger>
          <TabsTrigger value="inquiries">Contactos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de Desempenho */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo de Desempenho</CardTitle>
                <CardDescription>
                  Visualizações e contactos ao longo do tempo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="views" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="inquiries" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Pré-visualização de Contactos Recentes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-amber-600" />
                  Contactos Recentes
                </CardTitle>
                <CardDescription>
                  Último interesse de compradores nos seus ativos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentInquiries.slice(0, 3).map((inquiry) => (
                  <div key={inquiry.id} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                    <img 
                      src={inquiry.avatar} 
                      alt={inquiry.buyer}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-slate-900">{inquiry.buyer}</p>
                        <Badge variant={inquiry.status === 'new' ? 'default' : 'secondary'} className="text-xs">
                          {inquiry.status === 'new' ? 'novo' : inquiry.status === 'replied' ? 'respondido' : 'pendente'}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600 mb-1">{inquiry.asset}</p>
                      <p className="text-sm text-slate-700 line-clamp-2">{inquiry.message}</p>
                      <p className="text-xs text-slate-500 mt-1">{inquiry.time}</p>
                    </div>
                  </div>
                ))}
                <Button asChild variant="outline" className="w-full">
                  <Link href="/dashboard?tab=inquiries">
                    Ver Todos os Contactos
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Desempenho dos Ativos */}
          <Card>
            <CardHeader>
              <CardTitle>Desempenho dos Ativos</CardTitle>
              <CardDescription>
                Como estão a correr as suas listagens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">8.2/10</div>
                  <p className="text-sm text-slate-600 mb-2">Média IA</p>
                  <Progress value={82} className="h-2" />
                  <p className="text-xs text-slate-500 mt-1">Acima da média do mercado</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">2.8%</div>
                  <p className="text-sm text-slate-600 mb-2">Taxa de Contacto</p>
                  <Progress value={65} className="h-2" />
                  <p className="text-xs text-slate-500 mt-1">Referência do setor: 2.1%</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-2">24 dias</div>
                  <p className="text-sm text-slate-600 mb-2">Tempo Médio até Venda</p>
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-slate-500 mt-1">Mais rápido que a média</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assets" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myAssets.map((asset) => (
              <Card key={asset.id} className="overflow-hidden card-hover">
                <div className="aspect-video relative">
                  <img 
                    src={asset.image} 
                    alt={asset.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge 
                    className="absolute top-3 left-3"
                    variant={
                      asset.status === 'active' ? 'default' :
                      asset.status === 'pending' ? 'secondary' : 'outline'
                    }
                  >
                    {asset.status === 'active' ? 'ativo' : asset.status === 'pending' ? 'pendente' : 'vendido'}
                  </Badge>
                  <Badge className="absolute top-3 right-3 bg-white/90 text-slate-900">
                    Pontuação: {asset.score}/10
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg text-slate-900 mb-2">{asset.title}</h3>
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>{asset.category}</span>
                      <span>Listado {new Date(asset.listed).toLocaleDateString('pt-PT')}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Preço</span>
                      <span className="font-semibold">€{asset.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Receita Mensal</span>
                      <span className="font-semibold">€{asset.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Visualizações</span>
                      <span className="font-semibold">{asset.views}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Contactos</span>
                      <span className="font-semibold">{asset.inquiries}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button asChild className="flex-1" size="sm">
                      <Link href={`/dashboard/assets/${asset.id}`}>
                        Gerir
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de Visualizações */}
            <Card>
              <CardHeader>
                <CardTitle>Análise de Visualizações</CardTitle>
                <CardDescription>
                  Visualizações mensais de todos os ativos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="views" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Desempenho por Categoria */}
            <Card>
              <CardHeader>
                <CardTitle>Desempenho por Categoria</CardTitle>
                <CardDescription>
                  Desempenho por categoria de ativo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryData.map((category) => (
                    <div key={category.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Progress value={category.value} className="w-20 h-2" />
                        <span className="text-sm text-slate-600 w-8">{category.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Métricas Detalhadas */}
          <Card>
            <CardHeader>
              <CardTitle>Métricas Detalhadas</CardTitle>
              <CardDescription>
                Análise de desempenho abrangente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-900 mb-1">3.2%</div>
                  <div className="text-sm text-slate-600">Taxa de Conversão</div>
                  <div className="text-xs text-emerald-600 mt-1">+0.8% vs mês passado</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-900 mb-1">€89K</div>
                  <div className="text-sm text-slate-600">Preço Médio de Venda</div>
                  <div className="text-xs text-blue-600 mt-1">Acima da média do mercado</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-900 mb-1">18</div>
                  <div className="text-sm text-slate-600">Dias até ao Primeiro Contacto</div>
                  <div className="text-xs text-amber-600 mt-1">Setor: 24 dias</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-900 mb-1">4.8</div>
                  <div className="text-sm text-slate-600">Avaliação do Vendedor</div>
                  <div className="text-xs text-purple-600 mt-1">Com base em 12 avaliações</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inquiries" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Todos os Contactos</CardTitle>
              <CardDescription>
                Gere contactos e comunicações com compradores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentInquiries.concat([
                  {
                    id: '4',
                    buyer: 'Emma Wilson',
                    asset: 'Recipe Blog Network',
                    message: 'A equipa de criação de conteúdo está incluída na venda?',
                    time: 'há 2 dias',
                    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50',
                    status: 'replied'
                  },
                  {
                    id: '5',
                    buyer: 'Michael Brown',
                    asset: 'TaskFlow SaaS',
                    message: 'Qual é a taxa de churn e retenção de clientes?',
                    time: 'há 3 dias',
                    avatar: 'https://images.pexels.com/photos/2897883/pexels-photo-2897883.jpeg?auto=compress&cs=tinysrgb&w=50',
                    status: 'pending'
                  },
                ]).map((inquiry) => (
                  <div key={inquiry.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                    <img 
                      src={inquiry.avatar} 
                      alt={inquiry.buyer}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium text-slate-900">{inquiry.buyer}</p>
                          <p className="text-sm text-slate-600">{inquiry.asset}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={
                            inquiry.status === 'new' ? 'default' :
                            inquiry.status === 'replied' ? 'secondary' : 'outline'
                          }>
                            {inquiry.status === 'new' ? 'novo' : inquiry.status === 'replied' ? 'respondido' : 'pendente'}
                          </Badge>
                          <span className="text-xs text-slate-500">{inquiry.time}</span>
                        </div>
                      </div>
                      <p className="text-slate-700 mb-3">{inquiry.message}</p>
                      <div className="flex space-x-2">
                        <Button size="sm">
                          Responder
                        </Button>
                        <Button variant="outline" size="sm">
                          Ver Ativo
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}