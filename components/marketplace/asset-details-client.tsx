'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
  Heart, Share2, MessageSquare, TrendingUp, Users, Globe, Calendar,
  DollarSign, Eye, Star, Shield, CheckCircle, AlertTriangle, BarChart3,
  FileText, Download, ExternalLink, ArrowLeft, Bookmark, Flag, Info
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface AssetDetails {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  type: 'website' | 'ecommerce' | 'app' | 'saas' | 'domain' | 'company';
  category: string;
  price: number;
  monthlyRevenue: number;
  monthlyTraffic: number;
  age: number;
  verified: boolean;
  featured: boolean;
  images: string[];
  seller: {
    id: string;
    name: string;
    rating: number;
    verified: boolean;
    avatar?: string;
    joinedAt: string;
    totalSales: number;
  };
  stats: {
    views: number;
    favorites: number;
    inquiries: number;
  };
  tags: string[];
  listedAt: string;
  location?: string;
  growth?: number;
  roi?: number;
  metrics: {
    revenue: { value: number; trend: number };
    traffic: { value: number; trend: number };
    conversion: { value: number; trend: number };
    customers: { value: number; trend: number };
  };
  techStack?: string[];
  financials: {
    revenue: number[];
    expenses: number[];
    profit: number[];
    months: string[];
  };
}

// Mock asset data
const mockAssets: Record<string, AssetDetails> = {
  '1': {
    id: '1',
    title: 'E-commerce de Moda Sustentável',
    description: 'Loja online especializada em moda sustentável com mais de 5000 produtos e base de clientes fidelizada.',
    longDescription: 'Esta é uma oportunidade única de adquirir um e-commerce estabelecido no nicho de moda sustentável. A empresa foi fundada há 2 anos e tem mostrado crescimento consistente, com uma base de clientes leais e um catálogo diversificado de produtos eco-friendly. O negócio inclui website otimizado, inventário, relacionamentos com fornecedores e uma equipa de 3 pessoas.',
    type: 'ecommerce',
    category: 'Fashion',
    price: 45000,
    monthlyRevenue: 8500,
    monthlyTraffic: 25000,
    age: 24,
    verified: true,
    featured: true,
    images: [
      'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    seller: {
      id: 'seller1',
      name: 'Ana Silva',
      rating: 4.8,
      verified: true,
      avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150',
      joinedAt: '2023-01-15',
      totalSales: 3
    },
    stats: {
      views: 234,
      favorites: 45,
      inquiries: 12,
    },
    tags: ['Moda', 'Sustentável', 'E-commerce', 'Dropshipping'],
    listedAt: '2024-01-15T10:00:00Z',
    location: 'Portugal',
    growth: 23,
    roi: 18.5,
    metrics: {
      revenue: { value: 8500, trend: 12 },
      traffic: { value: 25000, trend: 8 },
      conversion: { value: 3.4, trend: 5 },
      customers: { value: 1250, trend: 15 }
    },
    techStack: ['Shopify', 'Google Analytics', 'Mailchimp', 'Stripe'],
    financials: {
      revenue: [6500, 7200, 7800, 8100, 8500, 8800],
      expenses: [4200, 4500, 4800, 5000, 5200, 5400],
      profit: [2300, 2700, 3000, 3100, 3300, 3400],
      months: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  },
  '2': {
    id: '2',
    title: 'SaaS de Gestão de Projetos',
    description: 'Plataforma SaaS B2B para gestão de projetos com 500+ empresas clientes.',
    longDescription: 'Software como Serviço completo para gestão de projetos empresariais. A plataforma serve mais de 500 empresas com funcionalidades avançadas de colaboração, tracking de tempo, relatórios e integrações. Receita recorrente estável com baixo churn rate.',
    type: 'saas',
    category: 'Productivity',
    price: 120000,
    monthlyRevenue: 18500,
    monthlyTraffic: 45000,
    age: 36,
    verified: true,
    featured: true,
    images: [
      'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    seller: {
      id: 'seller2',
      name: 'Pedro Costa',
      rating: 5.0,
      verified: true,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      joinedAt: '2022-08-10',
      totalSales: 5
    },
    stats: {
      views: 445,
      favorites: 89,
      inquiries: 23,
    },
    tags: ['SaaS', 'B2B', 'Gestão', 'Produtividade'],
    listedAt: '2024-01-10T14:30:00Z',
    location: 'Brasil',
    growth: 40,
    roi: 25.2,
    metrics: {
      revenue: { value: 18500, trend: 18 },
      traffic: { value: 45000, trend: 12 },
      conversion: { value: 2.1, trend: 3 },
      customers: { value: 520, trend: 22 }
    },
    techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    financials: {
      revenue: [14500, 15800, 16200, 17100, 17800, 18500],
      expenses: [8200, 8500, 8800, 9100, 9400, 9700],
      profit: [6300, 7300, 7400, 8000, 8400, 8800],
      months: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  }
};

export function AssetDetailsClient() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [asset, setAsset] = useState<AssetDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchAsset = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const assetId = params.id as string;
      const foundAsset = mockAssets[assetId];
      
      if (foundAsset) {
        setAsset(foundAsset);
        // Check if favorited (mock)
        setIsFavorited(Math.random() > 0.5);
      }
      
      setIsLoading(false);
    };

    fetchAsset();
  }, [params.id]);

  const handleFavorite = () => {
    if (!isAuthenticated) {
      toast.error('Precisa de fazer login para adicionar aos favoritos');
      return;
    }
    
    setIsFavorited(!isFavorited);
    toast.success(isFavorited ? 'Removido dos favoritos' : 'Adicionado aos favoritos');
  };

  const handleContact = () => {
    if (!isAuthenticated) {
      toast.error('Precisa de fazer login para contactar o vendedor');
      return;
    }
    
    router.push(`/messages?seller=${asset?.seller.id}&asset=${asset?.id}`);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copiado para a área de transferência');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 rounded w-1/4 mb-4"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-96 bg-slate-200 rounded-lg"></div>
                <div className="space-y-4">
                  <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  <div className="h-20 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Ativo não encontrado</h2>
              <p className="text-slate-600 mb-6">O ativo que procura não existe ou foi removido.</p>
              <Button asChild>
                <Link href="/marketplace">Voltar ao Marketplace</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-6">
            <Link href="/marketplace" className="hover:text-blue-600">Marketplace</Link>
            <span>/</span>
            <span className="text-slate-900">{asset.title}</span>
          </nav>

          {/* Back Button */}
          <Button variant="ghost" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <Card>
                <CardContent className="p-0">
                  <div className="relative aspect-video">
                    <Image
                      src={asset.images[currentImageIndex]}
                      alt={asset.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    {asset.images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {asset.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-3 h-3 rounded-full ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  {asset.images.length > 1 && (
                    <div className="p-4 flex space-x-2 overflow-x-auto">
                      {asset.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                            index === currentImageIndex ? 'border-blue-500' : 'border-slate-200'
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`${asset.title} ${index + 1}`}
                            width={80}
                            height={80}
                            className="object-cover w-full h-full"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Asset Details Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                  <TabsTrigger value="financials">Financeiros</TabsTrigger>
                  <TabsTrigger value="technical">Técnico</TabsTrigger>
                  <TabsTrigger value="documents">Documentos</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Descrição</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 leading-relaxed">{asset.longDescription}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Métricas Principais</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            €{asset.metrics.revenue.value.toLocaleString()}
                          </div>
                          <div className="text-sm text-slate-600">Receita Mensal</div>
                          <div className="text-xs text-green-600 flex items-center justify-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +{asset.metrics.revenue.trend}%
                          </div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            {asset.metrics.traffic.value.toLocaleString()}
                          </div>
                          <div className="text-sm text-slate-600">Tráfego Mensal</div>
                          <div className="text-xs text-green-600 flex items-center justify-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +{asset.metrics.traffic.trend}%
                          </div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">
                            {asset.metrics.conversion.value}%
                          </div>
                          <div className="text-sm text-slate-600">Taxa Conversão</div>
                          <div className="text-xs text-green-600 flex items-center justify-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +{asset.metrics.conversion.trend}%
                          </div>
                        </div>
                        <div className="text-center p-4 bg-amber-50 rounded-lg">
                          <div className="text-2xl font-bold text-amber-600">
                            {asset.metrics.customers.value.toLocaleString()}
                          </div>
                          <div className="text-sm text-slate-600">Clientes</div>
                          <div className="text-xs text-green-600 flex items-center justify-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +{asset.metrics.customers.trend}%
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="financials" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Financeira</CardTitle>
                      <CardDescription>Últimos 6 meses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {asset.financials.months.map((month, index) => (
                          <div key={month} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <span className="font-medium">{month}</span>
                            <div className="flex space-x-4 text-sm">
                              <span className="text-green-600">
                                Receita: €{asset.financials.revenue[index].toLocaleString()}
                              </span>
                              <span className="text-red-600">
                                Despesas: €{asset.financials.expenses[index].toLocaleString()}
                              </span>
                              <span className="text-blue-600 font-semibold">
                                Lucro: €{asset.financials.profit[index].toLocaleString()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="technical" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Stack Tecnológica</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {asset.techStack?.map((tech) => (
                          <Badge key={tech} variant="secondary">{tech}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="documents" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Documentos Disponíveis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <span>Relatório Financeiro (6 meses)</span>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <BarChart3 className="h-5 w-5 text-green-600" />
                            <span>Analytics Report</span>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Price and Actions */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-slate-900 mb-2">
                      €{asset.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-600">
                      {asset.roi && `ROI: ${asset.roi}% anual`}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button onClick={handleContact} className="w-full" size="lg">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contactar Vendedor
                    </Button>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        onClick={handleFavorite}
                        className="flex-1"
                      >
                        <Heart className={`h-4 w-4 mr-2 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                        {isFavorited ? 'Favoritado' : 'Favoritar'}
                      </Button>
                      <Button variant="outline" onClick={handleShare}>
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Tipo:</span>
                      <Badge variant="secondary">{asset.type}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Categoria:</span>
                      <span>{asset.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Idade:</span>
                      <span>{asset.age} meses</span>
                    </div>
                    {asset.location && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Localização:</span>
                        <span>{asset.location}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Seller Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Vendedor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={asset.seller.avatar} alt={asset.seller.name} />
                      <AvatarFallback>{asset.seller.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{asset.seller.name}</div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm ml-1">{asset.seller.rating}</span>
                        </div>
                        {asset.seller.verified && (
                          <Badge variant="outline" className="text-xs">
                            <Shield className="h-3 w-3 mr-1" />
                            Verificado
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Membro desde:</span>
                      <span>{new Date(asset.seller.joinedAt).getFullYear()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Vendas totais:</span>
                      <span>{asset.seller.totalSales}</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-4">
                    Ver Perfil do Vendedor
                  </Button>
                </CardContent>
              </Card>

              {/* Asset Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Estatísticas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 w-4 text-slate-400" />
                        <span className="text-sm">Visualizações</span>
                      </div>
                      <span className="font-semibold">{asset.stats.views}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Heart className="h-4 w-4 text-slate-400" />
                        <span className="text-sm">Favoritos</span>
                      </div>
                      <span className="font-semibold">{asset.stats.favorites}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4 text-slate-400" />
                        <span className="text-sm">Consultas</span>
                      </div>
                      <span className="font-semibold">{asset.stats.inquiries}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {asset.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}