'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, TrendingUp, MessageSquare, Bookmark, Eye, DollarSign,
  Globe, ShoppingCart, Smartphone, Code, Building2, ArrowUpRight,
  Star, Clock, Users, Zap, Target
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

// Mock data
const recentActivities = [
  {
    id: '1',
    type: 'view',
    asset: 'TaskFlow SaaS',
    value: '$125,000',
    time: '2 hours ago',
    icon: Eye,
  },
  {
    id: '2',
    type: 'favorite',
    asset: 'E-commerce Store',
    value: '$85,000',
    time: '4 hours ago',
    icon: Bookmark,
  },
  {
    id: '3',
    type: 'message',
    asset: 'Mobile App',
    value: '$45,000',
    time: '1 day ago',
    icon: MessageSquare,
  },
];

const recommendedAssets = [
  {
    id: '1',
    title: 'ProductHunt Clone',
    category: 'SaaS',
    price: 75000,
    revenue: 8500,
    traffic: 15000,
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300',
    score: 8.5,
    growth: 23,
    seller: {
      name: 'Alex Chen',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50',
      rating: 4.9,
    }
  },
  {
    id: '2',
    title: 'Fitness E-commerce',
    category: 'E-commerce',
    price: 120000,
    revenue: 12000,
    traffic: 35000,
    image: 'https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=300',
    score: 9.2,
    growth: 18,
    seller: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=50',
      rating: 4.8,
    }
  },
  {
    id: '3',
    title: 'Crypto News Blog',
    category: 'Content',
    price: 35000,
    revenue: 2800,
    traffic: 85000,
    image: 'https://images.pexels.com/photos/6772076/pexels-photo-6772076.jpeg?auto=compress&cs=tinysrgb&w=300',
    score: 7.8,
    growth: 45,
    seller: {
      name: 'Mike Rodriguez',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=50',
      rating: 4.7,
    }
  },
];

const watchlist = [
  { id: '1', name: 'AI Content Generator', price: 95000, change: 5.2, status: 'active' },
  { id: '2', name: 'Recipe Sharing App', price: 65000, change: -2.1, status: 'negotiating' },
  { id: '3', name: 'Local Services Platform', price: 180000, change: 12.5, status: 'due_diligence' },
];

export function BuyerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Bem-vindo de volta, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-slate-600 mt-1">
            Descubra a sua próxima oportunidade de aquisição digital
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button asChild>
            <Link href="/marketplace">
              <Search className="h-4 w-4 mr-2" />
              Explorar Ativos
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

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Ativos Visualizados</p>
                <p className="text-2xl font-bold text-slate-900">127</p>
                <p className="text-xs text-emerald-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +23% este mês
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Ativos Guardados</p>
                <p className="text-2xl font-bold text-slate-900">15</p>
                <p className="text-xs text-slate-600 flex items-center mt-1">
                  <Bookmark className="h-3 w-3 mr-1" />
                  Na lista de favoritos
                </p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-full">
                <Bookmark className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Negócios Ativos</p>
                <p className="text-2xl font-bold text-slate-900">3</p>
                <p className="text-xs text-amber-600 flex items-center mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  Em progresso
                </p>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                <MessageSquare className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Intervalo Orçamental</p>
                <p className="text-2xl font-bold text-slate-900">€50K-150K</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <Target className="h-3 w-3 mr-1" />
                  Foco em SaaS
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="recommendations">Recomendações IA</TabsTrigger>
          <TabsTrigger value="watchlist">Favoritos</TabsTrigger>
          <TabsTrigger value="activity">Atividade</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Recommendations Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-blue-600" />
                  Recomendações IA
                </CardTitle>
                <CardDescription>
                  Ativos sugeridos para o seu perfil
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendedAssets.slice(0, 2).map((asset) => (
                  <div key={asset.id} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                    <img 
                      src={asset.image} 
                      alt={asset.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-slate-900 truncate">{asset.title}</h4>
                      <p className="text-sm text-slate-600">{asset.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900">€{asset.price.toLocaleString()}</p>
                      <Badge variant="secondary" className="text-xs">
                        Score: {asset.score}/10
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button asChild variant="outline" className="w-full">
                  <Link href="/dashboard?tab=recommendations">
                    Ver Todas as Recomendações
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>
                  As suas últimas ações na plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div className="p-2 bg-slate-100 rounded-full">
                      <activity.icon className="h-4 w-4 text-slate-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">
                        {activity.asset}
                      </p>
                      <p className="text-xs text-slate-500">{activity.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-900">{activity.value.replace('$', '€')}</p>
                    </div>
                  </div>
                ))}
                <Button asChild variant="outline" className="w-full">
                  <Link href="/dashboard?tab=activity">
                    Ver Toda a Atividade
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Market Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Insights de Mercado</CardTitle>
              <CardDescription>
                Tendências atuais em aquisições de ativos digitais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">SaaS</div>
                  <p className="text-sm text-slate-600 mb-2">Categoria Mais Popular</p>
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-slate-500 mt-1">85% dos compradores interessados</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">€89K</div>
                  <p className="text-sm text-slate-600 mb-2">Valor Médio dos Negócios</p>
                  <Progress value={65} className="h-2" />
                  <p className="text-xs text-slate-500 mt-1">+12% face ao mês anterior</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-2">18 dias</div>
                  <p className="text-sm text-slate-600 mb-2">Tempo Médio de Fecho</p>
                  <Progress value={45} className="h-2" />
                  <p className="text-xs text-slate-500 mt-1">Mais rápido que o setor</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedAssets.map((asset) => (
              <Card key={asset.id} className="overflow-hidden card-hover">
                <div className="aspect-video relative">
                  <img 
                    src={asset.image} 
                    alt={asset.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-white/90 text-slate-900">
                    {asset.category}
                  </Badge>
                  <Badge 
                    className="absolute top-3 right-3"
                    variant={asset.score >= 9 ? 'default' : asset.score >= 7 ? 'secondary' : 'outline'}
                  >
                    Score: {asset.score}/10
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg text-slate-900 mb-2">{asset.title}</h3>
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>€{asset.revenue.toLocaleString()}/mês receita</span>
                      <span>{(asset.traffic / 1000).toFixed(0)}K visitantes/mês</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-slate-900">
                      €{asset.price.toLocaleString()}
                    </div>
                    <div className="flex items-center text-emerald-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">+{asset.growth}%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={asset.seller.avatar} alt={asset.seller.name} />
                        <AvatarFallback>{asset.seller.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-slate-600">{asset.seller.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm text-slate-600">{asset.seller.rating}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button asChild className="flex-1">
                      <Link href={`/assets/${asset.id}`}>
                        Ver Detalhes
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="watchlist" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Favoritos</CardTitle>
              <CardDescription>
                Ativos que está a acompanhar e respetivo estado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {watchlist.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900">{item.name}</h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-lg font-semibold text-slate-900">
                          €{item.price.toLocaleString()}
                        </span>
                        <span className={`text-sm flex items-center ${
                          item.change > 0 ? 'text-emerald-600' : 'text-red-600'
                        }`}>
                          <TrendingUp className={`h-3 w-3 mr-1 ${item.change < 0 ? 'rotate-180' : ''}`} />
                          {Math.abs(item.change)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={
                        item.status === 'active' ? 'secondary' :
                        item.status === 'negotiating' ? 'default' : 'outline'
                      }>
                        {item.status === 'active' ? 'Ativo' : item.status === 'negotiating' ? 'Em Negociação' : 'Due Diligence'}
                      </Badge>
                      <Button size="sm">
                        Ver
                        <ArrowUpRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Linha Temporal de Atividade</CardTitle>
              <CardDescription>
                Histórico completo das suas interações na plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentActivities.concat([
                  {
                    id: '4',
                    type: 'inquiry',
                    asset: 'Newsletter Platform',
                    value: '€92,000',
                    time: 'há 2 dias',
                    icon: MessageSquare,
                  },
                  {
                    id: '5',
                    type: 'valuation',
                    asset: 'Avaliação Próprio Ativo',
                    value: '€156,000',
                    time: 'há 3 dias',
                    icon: DollarSign,
                  },
                ]).map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4">
                    <div className="p-2 bg-slate-100 rounded-full">
                      <activity.icon className="h-4 w-4 text-slate-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">
                        {activity.asset}
                      </p>
                      <p className="text-xs text-slate-500">{activity.time.replace('ago', 'atrás')}</p>
                      <p className="text-sm text-slate-600 mt-1">
                        {activity.type === 'view' && 'Visualizou detalhes do ativo'}
                        {activity.type === 'favorite' && 'Adicionado aos favoritos'}
                        {activity.type === 'message' && 'Enviou mensagem ao vendedor'}
                        {activity.type === 'inquiry' && 'Pediu mais informações'}
                        {activity.type === 'valuation' && 'Gerou avaliação por IA'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-900">{activity.value.replace('$', '€')}</p>
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