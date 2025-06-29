'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useAuth } from '@/contexts/auth-context';
import { motion } from 'framer-motion';
import {
  TrendingUp, DollarSign, Users, Globe, BarChart3, PieChart, LineChart,
  Calendar, Download, Share2, Filter, RefreshCw, Target, Zap,
  ArrowUpRight, ArrowDownRight, Eye, Heart, MessageSquare, Star,
  Activity, Clock, MapPin, Building, Smartphone, ShoppingCart
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area } from 'recharts';

// Mock data for analytics
const marketTrends = [
  { month: 'Jan', saas: 45, ecommerce: 30, websites: 15, apps: 10 },
  { month: 'Fev', saas: 48, ecommerce: 28, websites: 14, apps: 10 },
  { month: 'Mar', saas: 52, ecommerce: 25, websites: 13, apps: 10 },
  { month: 'Abr', saas: 55, ecommerce: 23, websites: 12, apps: 10 },
  { month: 'Mai', saas: 58, ecommerce: 22, websites: 11, apps: 9 },
  { month: 'Jun', saas: 60, ecommerce: 20, websites: 11, apps: 9 },
];

const priceEvolution = [
  { month: 'Jan', avgPrice: 85000, volume: 12, deals: 45 },
  { month: 'Fev', avgPrice: 89000, volume: 15, deals: 52 },
  { month: 'Mar', avgPrice: 92000, volume: 18, deals: 61 },
  { month: 'Abr', avgPrice: 95000, volume: 22, deals: 68 },
  { month: 'Mai', avgPrice: 98000, volume: 25, deals: 74 },
  { month: 'Jun', avgPrice: 102000, volume: 28, deals: 82 },
];

const categoryData = [
  { name: 'SaaS', value: 45, color: '#3B82F6', growth: 15.2 },
  { name: 'E-commerce', value: 30, color: '#10B981', growth: 8.7 },
  { name: 'Websites', value: 15, color: '#F59E0B', growth: -2.1 },
  { name: 'Apps', value: 10, color: '#EF4444', growth: 12.3 },
];

const topPerformers = [
  {
    id: '1',
    title: 'SaaS de Email Marketing',
    category: 'SaaS',
    price: 150000,
    growth: 35,
    roi: 22.1,
    views: 523,
    inquiries: 31,
    seller: 'Sofia Rodrigues',
    location: 'Portugal'
  },
  {
    id: '2',
    title: 'SaaS de Gestão de Projetos',
    category: 'SaaS',
    price: 120000,
    growth: 40,
    roi: 25.2,
    views: 445,
    inquiries: 23,
    seller: 'Pedro Costa',
    location: 'Brasil'
  },
  {
    id: '3',
    title: 'Marketplace de Artesanato',
    category: 'E-commerce',
    price: 95000,
    growth: 28,
    roi: 19.3,
    views: 312,
    inquiries: 18,
    seller: 'Carlos Mendes',
    location: 'Brasil'
  }
];

const marketInsights = [
  {
    title: 'SaaS em Alta',
    description: 'Ativos SaaS mostram crescimento de 35% no último trimestre',
    trend: 'up',
    value: '+35%',
    color: 'text-green-600'
  },
  {
    title: 'Preços Médios Sobem',
    description: 'Preço médio dos ativos aumentou 18% comparado ao ano passado',
    trend: 'up',
    value: '+18%',
    color: 'text-blue-600'
  },
  {
    title: 'Tempo de Venda Reduz',
    description: 'Tempo médio para venda diminuiu para 24 dias',
    trend: 'down',
    value: '-12 dias',
    color: 'text-emerald-600'
  },
  {
    title: 'ROI Médio Melhora',
    description: 'ROI médio dos investimentos subiu para 19.8%',
    trend: 'up',
    value: '+19.8%',
    color: 'text-purple-600'
  }
];

export default function AnalyticsPage() {
  const { user, isAuthenticated } = useAuth();
  const [timeRange, setTimeRange] = useState('6m');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-xl">
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                  Analytics de Mercado
                </h1>
                <p className="text-slate-600">Insights e tendências do mercado de ativos digitais</p>
              </div>
              
              <div className="flex items-center gap-3">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1m">1 Mês</SelectItem>
                    <SelectItem value="3m">3 Meses</SelectItem>
                    <SelectItem value="6m">6 Meses</SelectItem>
                    <SelectItem value="1y">1 Ano</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Atualizar
                </Button>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Volume Total</p>
                      <p className="text-2xl font-bold text-slate-900">€2.4M</p>
                      <p className="text-xs text-emerald-600 flex items-center mt-1">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        +23% vs mês anterior
                      </p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <DollarSign className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Transações</p>
                      <p className="text-2xl font-bold text-slate-900">82</p>
                      <p className="text-xs text-emerald-600 flex items-center mt-1">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        +11% vs mês anterior
                      </p>
                    </div>
                    <div className="p-3 bg-emerald-100 rounded-full">
                      <TrendingUp className="h-6 w-6 text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Preço Médio</p>
                      <p className="text-2xl font-bold text-slate-900">€102K</p>
                      <p className="text-xs text-emerald-600 flex items-center mt-1">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        +18% vs ano anterior
                      </p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                      <Target className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Tempo Médio</p>
                      <p className="text-2xl font-bold text-slate-900">24 dias</p>
                      <p className="text-xs text-emerald-600 flex items-center mt-1">
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                        -12 dias vs trimestre
                      </p>
                    </div>
                    <div className="p-3 bg-amber-100 rounded-full">
                      <Clock className="h-6 w-6 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="trends">Tendências</TabsTrigger>
              <TabsTrigger value="categories">Categorias</TabsTrigger>
              <TabsTrigger value="performers">Top Performers</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Price Evolution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Evolução de Preços</CardTitle>
                    <CardDescription>
                      Preço médio e volume de transações
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={priceEvolution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value, name) => [
                          name === 'avgPrice' ? `€${value.toLocaleString()}` : value,
                          name === 'avgPrice' ? 'Preço Médio' : 'Volume (M)'
                        ]} />
                        <Area type="monotone" dataKey="avgPrice" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
                        <Area type="monotone" dataKey="volume" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Category Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Distribuição por Categoria</CardTitle>
                    <CardDescription>
                      Percentagem de ativos por categoria
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsPieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Market Insights Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {marketInsights.map((insight, index) => (
                  <motion.div
                    key={insight.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-slate-900">{insight.title}</h3>
                          <div className={`text-lg font-bold ${insight.color}`}>
                            {insight.value}
                          </div>
                        </div>
                        <p className="text-sm text-slate-600">{insight.description}</p>
                        <div className="mt-3 flex items-center">
                          {insight.trend === 'up' ? (
                            <ArrowUpRight className={`h-4 w-4 ${insight.color}`} />
                          ) : (
                            <ArrowDownRight className={`h-4 w-4 ${insight.color}`} />
                          )}
                          <span className={`text-xs ml-1 ${insight.color}`}>
                            Tendência {insight.trend === 'up' ? 'positiva' : 'de melhoria'}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tendências de Mercado</CardTitle>
                  <CardDescription>
                    Evolução das categorias de ativos ao longo do tempo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <RechartsLineChart data={marketTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="saas" stroke="#3B82F6" strokeWidth={3} name="SaaS" />
                      <Line type="monotone" dataKey="ecommerce" stroke="#10B981" strokeWidth={3} name="E-commerce" />
                      <Line type="monotone" dataKey="websites" stroke="#F59E0B" strokeWidth={3} name="Websites" />
                      <Line type="monotone" dataKey="apps" stroke="#EF4444" strokeWidth={3} name="Apps" />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categoryData.map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: category.color }}
                            />
                            <h3 className="font-semibold text-slate-900">{category.name}</h3>
                          </div>
                          <Badge variant={category.growth > 0 ? 'default' : 'secondary'}>
                            {category.growth > 0 ? '+' : ''}{category.growth}%
                          </Badge>
                        </div>
                        
                        <div className="text-3xl font-bold text-slate-900 mb-2">
                          {category.value}%
                        </div>
                        
                        <p className="text-sm text-slate-600 mb-4">
                          do mercado total
                        </p>
                        
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-500"
                            style={{ 
                              width: `${category.value}%`,
                              backgroundColor: category.color 
                            }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="performers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performers</CardTitle>
                  <CardDescription>
                    Ativos com melhor performance no mercado
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPerformers.map((asset, index) => (
                      <motion.div
                        key={asset.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                            <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-slate-900">{asset.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-slate-600">
                              <span>{asset.category}</span>
                              <span className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {asset.location}
                              </span>
                              <span>por {asset.seller}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <div className="text-lg font-bold text-slate-900">
                              €{asset.price.toLocaleString()}
                            </div>
                            <div className="text-sm text-slate-600">
                              ROI: {asset.roi}%
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center text-green-600">
                              <TrendingUp className="h-4 w-4 mr-1" />
                              +{asset.growth}%
                            </div>
                            <div className="flex items-center text-blue-600">
                              <Eye className="h-4 w-4 mr-1" />
                              {asset.views}
                            </div>
                            <div className="flex items-center text-purple-600">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              {asset.inquiries}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-blue-600" />
                      Insights de IA
                    </CardTitle>
                    <CardDescription>
                      Análises automáticas baseadas em dados de mercado
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2">Oportunidade de Investimento</h4>
                      <p className="text-sm text-blue-800">
                        Ativos SaaS B2B mostram ROI 35% superior à média do mercado. 
                        Recomendamos focar nesta categoria para os próximos 3 meses.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                      <h4 className="font-semibold text-emerald-900 mb-2">Tendência de Preços</h4>
                      <p className="text-sm text-emerald-800">
                        Preços de e-commerce estão 15% abaixo da média histórica. 
                        Momento ideal para aquisições nesta categoria.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <h4 className="font-semibold text-amber-900 mb-2">Alerta de Mercado</h4>
                      <p className="text-sm text-amber-800">
                        Aumento de 40% na procura por apps mobile. 
                        Vendedores devem considerar aumentar preços em 10-15%.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Previsões de Mercado</CardTitle>
                    <CardDescription>
                      Projeções para os próximos 6 meses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Volume de Transações</span>
                          <span className="text-sm text-emerald-600 font-semibold">+28%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-emerald-500 h-2 rounded-full w-[75%]"></div>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">Crescimento esperado até Dezembro</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Preço Médio</span>
                          <span className="text-sm text-blue-600 font-semibold">+12%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full w-[60%]"></div>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">Aumento gradual esperado</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Tempo de Venda</span>
                          <span className="text-sm text-purple-600 font-semibold">-8 dias</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full w-[45%]"></div>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">Redução no tempo médio</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
}