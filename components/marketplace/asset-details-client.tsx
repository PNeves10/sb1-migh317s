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
  FileText, Download, ExternalLink, ArrowLeft, Bookmark, Flag, Info,
  MapPin, Clock, Building, Smartphone, ShoppingCart
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
  highlights: string[];
  risks: string[];
}

// Comprehensive mock asset data
const mockAssets: Record<string, AssetDetails> = {
  '1': {
    id: '1',
    title: 'E-commerce de Moda Sustentável',
    description: 'Loja online especializada em moda sustentável com mais de 5000 produtos e base de clientes fidelizada.',
    longDescription: 'Esta é uma oportunidade única de adquirir um e-commerce estabelecido no nicho de moda sustentável. A empresa foi fundada há 2 anos e tem mostrado crescimento consistente, com uma base de clientes leais e um catálogo diversificado de produtos eco-friendly. O negócio inclui website otimizado, inventário, relacionamentos com fornecedores e uma equipa de 3 pessoas. A marca tem forte presença nas redes sociais e parcerias com influencers do setor.',
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
    tags: ['Moda', 'Sustentável', 'E-commerce', 'Dropshipping', 'Eco-friendly'],
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
    techStack: ['Shopify', 'Google Analytics', 'Mailchimp', 'Stripe', 'Facebook Pixel'],
    financials: {
      revenue: [6500, 7200, 7800, 8100, 8500, 8800],
      expenses: [4200, 4500, 4800, 5000, 5200, 5400],
      profit: [2300, 2700, 3000, 3100, 3300, 3400],
      months: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    },
    highlights: [
      'Crescimento consistente de 23% nos últimos 6 meses',
      'Base de clientes fidelizada com 40% de repeat customers',
      'Inventário de 5000+ produtos eco-friendly',
      'Parcerias estabelecidas com 15 fornecedores sustentáveis',
      'Presença forte nas redes sociais (50k+ seguidores)'
    ],
    risks: [
      'Dependência de fornecedores específicos',
      'Sazonalidade nas vendas',
      'Competição crescente no nicho sustentável'
    ]
  },
  '2': {
    id: '2',
    title: 'SaaS de Gestão de Projetos',
    description: 'Plataforma SaaS B2B para gestão de projetos com 500+ empresas clientes.',
    longDescription: 'Software como Serviço completo para gestão de projetos empresariais. A plataforma serve mais de 500 empresas com funcionalidades avançadas de colaboração, tracking de tempo, relatórios e integrações. Receita recorrente estável com baixo churn rate de 3% mensal. O produto tem roadmap definido e equipa de desenvolvimento dedicada.',
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
      'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800'
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
    tags: ['SaaS', 'B2B', 'Gestão', 'Produtividade', 'Colaboração'],
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
    techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Stripe', 'Redis'],
    financials: {
      revenue: [14500, 15800, 16200, 17100, 17800, 18500],
      expenses: [8200, 8500, 8800, 9100, 9400, 9700],
      profit: [6300, 7300, 7400, 8000, 8400, 8800],
      months: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    },
    highlights: [
      'MRR de €18.500 com crescimento de 40% YoY',
      'Churn rate baixo de apenas 3% mensal',
      '520 empresas clientes ativas',
      'Equipa de desenvolvimento de 8 pessoas',
      'Integrações com 25+ ferramentas populares'
    ],
    risks: [
      'Dependência de poucos clientes grandes',
      'Competição com players estabelecidos',
      'Necessidade de investimento contínuo em desenvolvimento'
    ]
  },
  '3': {
    id: '3',
    title: 'App de Fitness e Nutrição',
    description: 'Aplicação móvel com 10k+ downloads, sistema de treinos personalizados e planos de nutrição com IA.',
    longDescription: 'Aplicação móvel completa para fitness e nutrição com mais de 10.000 downloads e utilizadores ativos. Inclui sistema de treinos personalizados, planos de nutrição com IA, tracking de progresso e comunidade integrada. Monetização através de subscrições premium e parcerias com ginásios.',
    type: 'app',
    category: 'Health',
    price: 78000,
    monthlyRevenue: 12000,
    monthlyTraffic: 0,
    age: 18,
    verified: true,
    featured: false,
    images: [
      'https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    seller: {
      id: 'seller3',
      name: 'João Santos',
      rating: 4.9,
      verified: true,
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
      joinedAt: '2023-06-20',
      totalSales: 2
    },
    stats: {
      views: 156,
      favorites: 32,
      inquiries: 8,
    },
    tags: ['Fitness', 'Saúde', 'App Mobile', 'Freemium', 'IA'],
    listedAt: '2024-01-15T09:15:00Z',
    location: 'Espanha',
    growth: 15,
    roi: 12.8,
    metrics: {
      revenue: { value: 12000, trend: 15 },
      traffic: { value: 0, trend: 0 },
      conversion: { value: 8.5, trend: 12 },
      customers: { value: 2400, trend: 18 }
    },
    techStack: ['React Native', 'Firebase', 'TensorFlow', 'Stripe', 'OneSignal'],
    financials: {
      revenue: [8500, 9200, 10100, 10800, 11400, 12000],
      expenses: [5200, 5500, 5800, 6100, 6400, 6700],
      profit: [3300, 3700, 4300, 4700, 5000, 5300],
      months: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    },
    highlights: [
      '10.000+ downloads com 2.400 utilizadores ativos',
      'Sistema de IA para planos personalizados',
      'Taxa de conversão de 8.5% para premium',
      'Parcerias com 12 ginásios locais',
      'Avaliação de 4.7 estrelas nas app stores'
    ],
    risks: [
      'Mercado competitivo de apps de fitness',
      'Dependência das app stores',
      'Necessidade de atualizações constantes'
    ]
  },
  '4': {
    id: '4',
    title: 'Blog de Tecnologia Premium',
    description: 'Blog especializado em tecnologia com 100k+ visitantes mensais e monetização através de afiliados e publicidade.',
    longDescription: 'Blog estabelecido no nicho de tecnologia com audiência qualificada e múltiplas fontes de receita. Conteúdo de alta qualidade sobre reviews de produtos, tutoriais e notícias tech. Monetização através de marketing de afiliados, publicidade display e conteúdo patrocinado.',
    type: 'website',
    category: 'Content',
    price: 32000,
    monthlyRevenue: 4200,
    monthlyTraffic: 120000,
    age: 48,
    verified: true,
    featured: false,
    images: [
      'https://images.pexels.com/photos/6772076/pexels-photo-6772076.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    seller: {
      id: 'seller4',
      name: 'Maria Fernandes',
      rating: 4.7,
      verified: true,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      joinedAt: '2022-03-12',
      totalSales: 4
    },
    stats: {
      views: 89,
      favorites: 21,
      inquiries: 5,
    },
    tags: ['Blog', 'Tecnologia', 'Afiliados', 'SEO', 'Content Marketing'],
    listedAt: '2024-01-12T16:45:00Z',
    location: 'Portugal',
    growth: 8,
    roi: 15.6,
    metrics: {
      revenue: { value: 4200, trend: 8 },
      traffic: { value: 120000, trend: 12 },
      conversion: { value: 1.2, trend: 5 },
      customers: { value: 0, trend: 0 }
    },
    techStack: ['WordPress', 'Google Analytics', 'AdSense', 'Amazon Associates'],
    financials: {
      revenue: [3200, 3500, 3800, 3900, 4100, 4200],
      expenses: [800, 850, 900, 950, 1000, 1050],
      profit: [2400, 2650, 2900, 2950, 3100, 3150],
      months: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    },
    highlights: [
      '120.000 visitantes únicos mensais',
      'Autoridade de domínio (DA) de 45',
      '500+ artigos de alta qualidade',
      'Newsletter com 15.000 subscritores',
      'Parcerias com 20+ marcas tech'
    ],
    risks: [
      'Dependência do tráfego orgânico do Google',
      'Mudanças nos algoritmos de SEO',
      'Competição crescente no nicho tech'
    ]
  },
  '5': {
    id: '5',
    title: 'Marketplace de Artesanato',
    description: 'Plataforma de marketplace para artesãos locais com sistema de pagamentos integrado e 2000+ vendedores ativos.',
    longDescription: 'Marketplace estabelecido conectando artesãos locais com compradores. Plataforma completa com sistema de pagamentos, avaliações, chat integrado e logística. Mais de 2000 vendedores ativos e crescimento constante na base de utilizadores.',
    type: 'ecommerce',
    category: 'Marketplace',
    price: 95000,
    monthlyRevenue: 15000,
    monthlyTraffic: 65000,
    age: 30,
    verified: true,
    featured: true,
    images: [
      'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    seller: {
      id: 'seller5',
      name: 'Carlos Mendes',
      rating: 4.6,
      verified: true,
      avatar: 'https://images.pexels.com/photos/2897883/pexels-photo-2897883.jpeg?auto=compress&cs=tinysrgb&w=150',
      joinedAt: '2021-11-08',
      totalSales: 6
    },
    stats: {
      views: 312,
      favorites: 67,
      inquiries: 18,
    },
    tags: ['Marketplace', 'Artesanato', 'Comissões', 'Multi-vendor', 'Local'],
    listedAt: '2024-01-10T11:20:00Z',
    location: 'Brasil',
    growth: 28,
    roi: 19.3,
    metrics: {
      revenue: { value: 15000, trend: 28 },
      traffic: { value: 65000, trend: 22 },
      conversion: { value: 2.8, trend: 8 },
      customers: { value: 8500, trend: 25 }
    },
    techStack: ['Laravel', 'MySQL', 'Stripe', 'AWS', 'Vue.js'],
    financials: {
      revenue: [10500, 11800, 12500, 13200, 14100, 15000],
      expenses: [6200, 6800, 7200, 7600, 8000, 8400],
      profit: [4300, 5000, 5300, 5600, 6100, 6600],
      months: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    },
    highlights: [
      '2000+ vendedores ativos na plataforma',
      'Comissão média de 8% por transação',
      '65.000 visitantes únicos mensais',
      'Sistema de avaliações e reviews',
      'Integração com múltiplos métodos de pagamento'
    ],
    risks: [
      'Dependência da qualidade dos vendedores',
      'Competição com marketplaces grandes',
      'Necessidade de moderação constante'
    ]
  },
  '6': {
    id: '6',
    title: 'SaaS de Email Marketing',
    description: 'Ferramenta completa de email marketing com automação, templates e analytics avançados. 5000+ utilizadores ativos.',
    longDescription: 'Plataforma SaaS completa para email marketing com funcionalidades avançadas de automação, segmentação, A/B testing e analytics. Serve mais de 5000 utilizadores ativos com planos freemium e premium. Interface intuitiva e integrações com principais ferramentas do mercado.',
    type: 'saas',
    category: 'Marketing',
    price: 150000,
    monthlyRevenue: 22000,
    monthlyTraffic: 35000,
    age: 42,
    verified: true,
    featured: false,
    images: [
      'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    seller: {
      id: 'seller6',
      name: 'Sofia Rodrigues',
      rating: 4.9,
      verified: true,
      avatar: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=150',
      joinedAt: '2021-05-22',
      totalSales: 7
    },
    stats: {
      views: 523,
      favorites: 98,
      inquiries: 31,
    },
    tags: ['Email Marketing', 'Automação', 'SaaS', 'B2B', 'Analytics'],
    listedAt: '2024-01-08T13:30:00Z',
    location: 'Portugal',
    growth: 35,
    roi: 22.1,
    metrics: {
      revenue: { value: 22000, trend: 35 },
      traffic: { value: 35000, trend: 18 },
      conversion: { value: 4.2, trend: 12 },
      customers: { value: 5200, trend: 28 }
    },
    techStack: ['Django', 'PostgreSQL', 'Redis', 'Celery', 'AWS SES'],
    financials: {
      revenue: [15500, 17200, 18800, 19900, 20800, 22000],
      expenses: [9200, 10100, 11000, 11600, 12200, 12800],
      profit: [6300, 7100, 7800, 8300, 8600, 9200],
      months: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    },
    highlights: [
      '5200 utilizadores ativos com crescimento de 35%',
      'Taxa de entrega de emails de 98.5%',
      'Automações avançadas com triggers personalizados',
      'Integrações com 50+ ferramentas populares',
      'Suporte 24/7 e onboarding dedicado'
    ],
    risks: [
      'Regulamentações de privacidade (GDPR)',
      'Competição com players estabelecidos',
      'Dependência de provedores de email'
    ]
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
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const assetId = params.id as string;
      const foundAsset = mockAssets[assetId];
      
      if (foundAsset) {
        setAsset(foundAsset);
        // Check if favorited (mock)
        setIsFavorited(Math.random() > 0.5);
      }
      
      setIsLoading(false);
    };

    if (params.id) {
      fetchAsset();
    }
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "website":
        return <Globe className="h-5 w-5" />
      case "ecommerce":
        return <ShoppingCart className="h-5 w-5" />
      case "app":
        return <Smartphone className="h-5 w-5" />
      case "saas":
        return <TrendingUp className="h-5 w-5" />
      case "domain":
        return <Globe className="h-5 w-5" />
      case "company":
        return <Building className="h-5 w-5" />
      default:
        return <Globe className="h-5 w-5" />
    }
  };

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
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 rounded w-1/4 mb-4"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-96 bg-slate-200 rounded-lg"></div>
                  <div className="space-y-4">
                    <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    <div className="h-20 bg-slate-200 rounded"></div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="h-64 bg-slate-200 rounded-lg"></div>
                  <div className="h-48 bg-slate-200 rounded-lg"></div>
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

  const chartData = asset.financials.months.map((month, index) => ({
    month,
    receita: asset.financials.revenue[index],
    despesas: asset.financials.expenses[index],
    lucro: asset.financials.profit[index]
  }));

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

          {/* Asset Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  {getTypeIcon(asset.type)}
                  <Badge variant="secondary">{getTypeLabel(asset.type)}</Badge>
                  <Badge variant="outline">{asset.category}</Badge>
                  {asset.featured && (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                      ⭐ Destaque
                    </Badge>
                  )}
                  {asset.verified && (
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verificado
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{asset.title}</h1>
                <p className="text-lg text-slate-600 mb-4">{asset.description}</p>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  {asset.location && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {asset.location}
                    </div>
                  )}
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Listado há {Math.floor((Date.now() - new Date(asset.listedAt).getTime()) / (1000 * 60 * 60 * 24))} dias
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {asset.age} meses de idade
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  €{asset.price.toLocaleString()}
                </div>
                {asset.roi && (
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    ROI: {asset.roi}% anual
                  </Badge>
                )}
              </div>
            </div>
          </div>

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
                      <CardTitle>Descrição Detalhada</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 leading-relaxed mb-6">{asset.longDescription}</p>
                      
                      {/* Highlights */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-slate-900 mb-3">Pontos Fortes</h4>
                        <ul className="space-y-2">
                          {asset.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-700">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Risks */}
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3">Riscos e Considerações</h4>
                        <ul className="space-y-2">
                          {asset.risks.map((risk, index) => (
                            <li key={index} className="flex items-start">
                              <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-700">{risk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
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
                        
                        {asset.monthlyTraffic > 0 && (
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
                        )}
                        
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
                        
                        {asset.metrics.customers.value > 0 && (
                          <div className="text-center p-4 bg-amber-50 rounded-lg">
                            <div className="text-2xl font-bold text-amber-600">
                              {asset.metrics.customers.value.toLocaleString()}
                            </div>
                            <div className="text-sm text-slate-600">
                              {asset.type === 'saas' ? 'Clientes' : asset.type === 'app' ? 'Utilizadores' : 'Clientes'}
                            </div>
                            <div className="text-xs text-green-600 flex items-center justify-center mt-1">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              +{asset.metrics.customers.trend}%
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="financials" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Financeira</CardTitle>
                      <CardDescription>Evolução dos últimos 6 meses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80 mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip 
                              formatter={(value: number) => [`€${value.toLocaleString()}`, '']}
                              labelFormatter={(label) => `Mês: ${label}`}
                            />
                            <Line type="monotone" dataKey="receita" stroke="#10B981" strokeWidth={2} name="Receita" />
                            <Line type="monotone" dataKey="despesas" stroke="#EF4444" strokeWidth={2} name="Despesas" />
                            <Line type="monotone" dataKey="lucro" stroke="#3B82F6" strokeWidth={2} name="Lucro" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

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

                  <Card>
                    <CardHeader>
                      <CardTitle>Resumo Financeiro</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-xl font-bold text-green-600">
                            €{asset.financials.revenue[asset.financials.revenue.length - 1].toLocaleString()}
                          </div>
                          <div className="text-sm text-slate-600">Receita Atual</div>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <div className="text-xl font-bold text-red-600">
                            €{asset.financials.expenses[asset.financials.expenses.length - 1].toLocaleString()}
                          </div>
                          <div className="text-sm text-slate-600">Despesas Atuais</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-xl font-bold text-blue-600">
                            €{asset.financials.profit[asset.financials.profit.length - 1].toLocaleString()}
                          </div>
                          <div className="text-sm text-slate-600">Lucro Atual</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="technical" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Stack Tecnológica</CardTitle>
                      <CardDescription>Tecnologias e ferramentas utilizadas</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {asset.techStack?.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-sm py-1 px-3">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Especificações Técnicas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <div className="font-medium text-slate-900">Tipo de Ativo</div>
                            <div className="text-slate-600">{getTypeLabel(asset.type)}</div>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <div className="font-medium text-slate-900">Categoria</div>
                            <div className="text-slate-600">{asset.category}</div>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <div className="font-medium text-slate-900">Idade do Negócio</div>
                            <div className="text-slate-600">{asset.age} meses</div>
                          </div>
                          {asset.location && (
                            <div className="p-3 bg-slate-50 rounded-lg">
                              <div className="font-medium text-slate-900">Localização</div>
                              <div className="text-slate-600">{asset.location}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="documents" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Documentos Disponíveis</CardTitle>
                      <CardDescription>Documentação e relatórios para due diligence</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <div>
                              <div className="font-medium">Relatório Financeiro</div>
                              <div className="text-sm text-slate-500">Últimos 6 meses de dados financeiros</div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <BarChart3 className="h-5 w-5 text-green-600" />
                            <div>
                              <div className="font-medium">Analytics Report</div>
                              <div className="text-sm text-slate-500">Dados de tráfego e conversão</div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Shield className="h-5 w-5 text-purple-600" />
                            <div>
                              <div className="font-medium">Documentação Legal</div>
                              <div className="text-sm text-slate-500">Contratos e documentos legais</div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            Visualizar
                          </Button>
                        </div>

                        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                          <div className="flex items-start space-x-3">
                            <Info className="h-5 w-5 text-amber-600 mt-0.5" />
                            <div>
                              <div className="font-medium text-amber-800">Acesso Restrito</div>
                              <div className="text-sm text-amber-700">
                                Alguns documentos requerem assinatura de NDA. Contacte o vendedor para mais informações.
                              </div>
                            </div>
                          </div>
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
                      {asset.roi && `ROI estimado: ${asset.roi}% anual`}
                    </div>
                    {asset.growth && (
                      <div className="text-sm text-green-600 flex items-center justify-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Crescimento: +{asset.growth}%
                      </div>
                    )}
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
                      <Button variant="outline">
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Tipo:</span>
                      <Badge variant="secondary">{getTypeLabel(asset.type)}</Badge>
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
                    <div className="flex justify-between">
                      <span className="text-slate-600">Receita Mensal:</span>
                      <span className="font-semibold text-green-600">€{asset.monthlyRevenue.toLocaleString()}</span>
                    </div>
                    {asset.monthlyTraffic > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Tráfego Mensal:</span>
                        <span>{asset.monthlyTraffic.toLocaleString()}</span>
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