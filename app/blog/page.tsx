"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { motion } from 'framer-motion';
import {
  Search, Calendar, User, Clock, ArrowRight, TrendingUp,
  BookOpen, Star, Eye, MessageSquare, Share2, Filter,
  Tag, ChevronRight, Bookmark, ThumbsUp
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const blogPosts = [
  {
    id: '1',
    title: 'O Futuro dos Ativos Digitais: Tendências para 2025',
    excerpt: 'Análise completa das principais tendências que moldarão o mercado de ativos digitais nos próximos anos, incluindo IA, Web3 e sustentabilidade.',
    content: 'Lorem ipsum dolor sit amet...',
    author: {
      name: 'Sofia Rodrigues',
      avatar: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=50',
      role: 'Head of Research'
    },
    category: 'Tendências',
    tags: ['IA', 'Web3', 'Futuro', 'Mercado'],
    publishedAt: '2025-01-20T10:00:00Z',
    readTime: 8,
    views: 2340,
    likes: 89,
    comments: 23,
    featured: true,
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '2',
    title: 'Como Avaliar um SaaS: Guia Completo para Investidores',
    excerpt: 'Metodologia detalhada para avaliar empresas SaaS, incluindo métricas-chave, múltiplos de mercado e fatores de risco a considerar.',
    content: 'Lorem ipsum dolor sit amet...',
    author: {
      name: 'Pedro Costa',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50',
      role: 'Senior Analyst'
    },
    category: 'Avaliação',
    tags: ['SaaS', 'Avaliação', 'Investimento', 'Métricas'],
    publishedAt: '2025-01-18T14:30:00Z',
    readTime: 12,
    views: 1890,
    likes: 67,
    comments: 18,
    featured: true,
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '3',
    title: 'Due Diligence em E-commerce: O Que Verificar',
    excerpt: 'Checklist essencial para due diligence em negócios de e-commerce, desde análise financeira até verificação de fornecedores.',
    content: 'Lorem ipsum dolor sit amet...',
    author: {
      name: 'Ana Silva',
      avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=50',
      role: 'M&A Specialist'
    },
    category: 'Due Diligence',
    tags: ['E-commerce', 'Due Diligence', 'Checklist', 'Compra'],
    publishedAt: '2025-01-15T09:15:00Z',
    readTime: 10,
    views: 1567,
    likes: 45,
    comments: 12,
    featured: false,
    image: 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '4',
    title: 'Estratégias de Exit: Quando e Como Vender',
    excerpt: 'Timing perfeito para venda de ativos digitais, estratégias de maximização de valor e preparação para exit bem-sucedido.',
    content: 'Lorem ipsum dolor sit amet...',
    author: {
      name: 'João Santos',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=50',
      role: 'Exit Strategist'
    },
    category: 'Estratégia',
    tags: ['Exit', 'Venda', 'Estratégia', 'Timing'],
    publishedAt: '2025-01-12T16:45:00Z',
    readTime: 15,
    views: 2100,
    likes: 78,
    comments: 31,
    featured: false,
    image: 'https://images.pexels.com/photos/6772076/pexels-photo-6772076.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '5',
    title: 'IA na Avaliação de Ativos: Revolução ou Hype?',
    excerpt: 'Análise profunda sobre o papel da inteligência artificial na avaliação de ativos digitais e suas limitações atuais.',
    content: 'Lorem ipsum dolor sit amet...',
    author: {
      name: 'Maria Fernandes',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50',
      role: 'AI Research Lead'
    },
    category: 'Tecnologia',
    tags: ['IA', 'Avaliação', 'Tecnologia', 'Inovação'],
    publishedAt: '2025-01-10T11:20:00Z',
    readTime: 7,
    views: 1234,
    likes: 56,
    comments: 19,
    featured: false,
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '6',
    title: 'Marketplace vs. Venda Direta: Prós e Contras',
    excerpt: 'Comparação detalhada entre vender através de marketplaces ou diretamente, incluindo custos, alcance e controlo.',
    content: 'Lorem ipsum dolor sit amet...',
    author: {
      name: 'Carlos Mendes',
      avatar: 'https://images.pexels.com/photos/2897883/pexels-photo-2897883.jpeg?auto=compress&cs=tinysrgb&w=50',
      role: 'Business Development'
    },
    category: 'Estratégia',
    tags: ['Marketplace', 'Venda', 'Estratégia', 'Comparação'],
    publishedAt: '2025-01-08T13:30:00Z',
    readTime: 9,
    views: 987,
    likes: 34,
    comments: 8,
    featured: false,
    image: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

const categories = [
  'Todas',
  'Tendências',
  'Avaliação',
  'Due Diligence',
  'Estratégia',
  'Tecnologia',
  'Mercado',
  'Legal'
];

const popularTags = [
  'SaaS', 'E-commerce', 'IA', 'Avaliação', 'Due Diligence',
  'Investimento', 'Exit', 'Mercado', 'Tendências', 'Web3'
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [sortBy, setSortBy] = useState('recent');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'Todas' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      case 'popular':
        return b.views - a.views;
      case 'liked':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                Blog AIQuira
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Insights, análises e tendências do mercado de ativos digitais
              </p>
            </motion.div>
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <Star className="w-6 h-6 text-yellow-500 mr-2" />
                Posts em Destaque
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
                      <div className="relative">
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={600}
                          height={300}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-4 left-4 bg-yellow-500 text-yellow-900">
                          <Star className="w-3 h-3 mr-1" />
                          Destaque
                        </Badge>
                        <Badge variant="secondary" className="absolute top-4 right-4">
                          {post.category}
                        </Badge>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(post.publishedAt).toLocaleDateString('pt-PT')}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {post.readTime} min
                          </div>
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {post.views}
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                          <Link href={`/blog/${post.id}`}>
                            {post.title}
                          </Link>
                        </h3>
                        
                        <p className="text-slate-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Image
                              src={post.author.avatar}
                              alt={post.author.name}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                            <div>
                              <div className="text-sm font-medium text-slate-900">
                                {post.author.name}
                              </div>
                              <div className="text-xs text-slate-500">
                                {post.author.role}
                              </div>
                            </div>
                          </div>
                          
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/blog/${post.id}`}>
                              Ler mais
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Search */}
              <Card>
                <CardContent className="p-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Pesquisar posts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categorias</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'hover:bg-slate-100 text-slate-600'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tags Populares</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="cursor-pointer hover:bg-slate-100"
                        onClick={() => setSearchTerm(tag)}
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-6">
                  <h3 className="font-bold text-slate-900 mb-2">Newsletter</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Receba os melhores insights diretamente no seu email
                  </p>
                  <div className="space-y-3">
                    <Input placeholder="Seu email" />
                    <Button className="w-full">
                      Subscrever
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Filters */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-slate-600">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'post encontrado' : 'posts encontrados'}
                </p>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Mais recentes</SelectItem>
                    <SelectItem value="popular">Mais populares</SelectItem>
                    <SelectItem value="liked">Mais curtidos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow group h-full">
                      <div className="relative">
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge variant="secondary" className="absolute top-3 right-3">
                          {post.category}
                        </Badge>
                      </div>
                      
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(post.publishedAt).toLocaleDateString('pt-PT')}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {post.readTime} min
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                          <Link href={`/blog/${post.id}`}>
                            {post.title}
                          </Link>
                        </h3>
                        
                        <p className="text-slate-600 mb-4 line-clamp-3 flex-grow">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center gap-3">
                            <Image
                              src={post.author.avatar}
                              alt={post.author.name}
                              width={24}
                              height={24}
                              className="rounded-full"
                            />
                            <span className="text-sm font-medium text-slate-900">
                              {post.author.name}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {post.views}
                            </div>
                            <div className="flex items-center">
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              {post.likes}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Load More */}
              {filteredPosts.length > 6 && (
                <div className="text-center mt-12">
                  <Button variant="outline" size="lg">
                    Carregar mais posts
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}