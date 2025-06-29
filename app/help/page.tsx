'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { motion } from 'framer-motion';
import {
  Search, HelpCircle, Book, MessageCircle, Video, FileText,
  Users, Shield, DollarSign, TrendingUp, Zap, Phone, Mail,
  Clock, CheckCircle, ArrowRight, ExternalLink, Download,
  PlayCircle, Star, ThumbsUp, ThumbsDown, Share2, Eye
} from 'lucide-react';
import Link from 'next/link';

const faqCategories = [
  {
    id: 'getting-started',
    title: 'Começar',
    icon: Book,
    faqs: [
      {
        question: 'Como criar uma conta na AIQuira?',
        answer: 'Para criar uma conta, clique em "Registar" no topo da página, escolha se é comprador ou vendedor, preencha os seus dados e confirme o email. O processo demora apenas 2 minutos.',
        helpful: 45,
        notHelpful: 2
      },
      {
        question: 'Qual a diferença entre conta de comprador e vendedor?',
        answer: 'Compradores podem pesquisar e adquirir ativos digitais, enquanto vendedores podem listar os seus ativos para venda. Pode sempre alterar o tipo de conta nas configurações.',
        helpful: 38,
        notHelpful: 1
      },
      {
        question: 'Como verificar a minha conta?',
        answer: 'A verificação inclui confirmação de email, telefone e documentos de identidade. Contas verificadas têm maior credibilidade e acesso a funcionalidades premium.',
        helpful: 52,
        notHelpful: 3
      }
    ]
  },
  {
    id: 'buying',
    title: 'Comprar',
    icon: TrendingUp,
    faqs: [
      {
        question: 'Como funciona o processo de compra?',
        answer: 'Pesquise ativos, analise os detalhes, contacte o vendedor, negocie termos, realize due diligence e finalize através do nosso sistema de escrow seguro.',
        helpful: 67,
        notHelpful: 4
      },
      {
        question: 'O que é due diligence e como fazer?',
        answer: 'Due diligence é a verificação detalhada do ativo antes da compra. Inclui análise financeira, técnica e legal. Oferecemos templates e suporte especializado.',
        helpful: 89,
        notHelpful: 2
      },
      {
        question: 'Como funciona o sistema de escrow?',
        answer: 'O escrow protege ambas as partes. O pagamento fica retido até a transferência completa do ativo. Só é liberado após confirmação de ambas as partes.',
        helpful: 76,
        notHelpful: 1
      }
    ]
  },
  {
    id: 'selling',
    title: 'Vender',
    icon: DollarSign,
    faqs: [
      {
        question: 'Como listar o meu ativo para venda?',
        answer: 'Aceda ao dashboard, clique em "Listar Ativo", preencha os detalhes, adicione documentação e publique. A nossa IA ajuda com a avaliação automática.',
        helpful: 54,
        notHelpful: 3
      },
      {
        question: 'Quanto custa listar um ativo?',
        answer: 'Listar é gratuito. Cobramos apenas uma comissão de 5% sobre vendas bem-sucedidas. Sem custos antecipados ou taxas escondidas.',
        helpful: 92,
        notHelpful: 1
      },
      {
        question: 'Como melhorar a visibilidade do meu ativo?',
        answer: 'Use fotos de qualidade, descrições detalhadas, preços competitivos e mantenha documentação atualizada. Ativos verificados têm prioridade.',
        helpful: 71,
        notHelpful: 2
      }
    ]
  },
  {
    id: 'valuation',
    title: 'Avaliação',
    icon: Zap,
    faqs: [
      {
        question: 'Como funciona a avaliação com IA?',
        answer: 'A nossa IA analisa receitas, tráfego, crescimento, mercado e comparáveis para gerar uma avaliação precisa em segundos. Baseada em milhares de transações reais.',
        helpful: 83,
        notHelpful: 5
      },
      {
        question: 'A avaliação da IA é precisa?',
        answer: 'Sim, com 85% de precisão comparado a avaliações profissionais. Considera múltiplos fatores e é constantemente melhorada com novos dados de mercado.',
        helpful: 78,
        notHelpful: 8
      },
      {
        question: 'Posso contestar uma avaliação?',
        answer: 'Pode solicitar reavaliação fornecendo dados adicionais ou contactar os nossos especialistas para uma avaliação manual detalhada.',
        helpful: 45,
        notHelpful: 3
      }
    ]
  },
  {
    id: 'security',
    title: 'Segurança',
    icon: Shield,
    faqs: [
      {
        question: 'Como protegem os meus dados?',
        answer: 'Usamos encriptação SSL, autenticação de dois fatores, servidores seguros e cumprimos RGPD. Os seus dados nunca são partilhados sem consentimento.',
        helpful: 67,
        notHelpful: 2
      },
      {
        question: 'O que fazer se suspeitar de fraude?',
        answer: 'Contacte-nos imediatamente através do chat ou email. Temos sistemas de deteção de fraude e uma equipa especializada para investigar.',
        helpful: 89,
        notHelpful: 1
      },
      {
        question: 'Como verificam os vendedores?',
        answer: 'Verificamos identidade, histórico, documentos do ativo e realizamos verificações de antecedentes. Vendedores verificados têm selo de confiança.',
        helpful: 94,
        notHelpful: 2
      }
    ]
  }
];

const tutorials = [
  {
    title: 'Como Comprar o Seu Primeiro Ativo Digital',
    description: 'Guia completo desde a pesquisa até à finalização da compra',
    duration: '12 min',
    views: '2.3K',
    thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Comprar'
  },
  {
    title: 'Vender com Sucesso na AIQuira',
    description: 'Estratégias para maximizar o valor e acelerar a venda',
    duration: '15 min',
    views: '1.8K',
    thumbnail: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Vender'
  },
  {
    title: 'Entender Avaliações de IA',
    description: 'Como interpretar e usar as avaliações automáticas',
    duration: '8 min',
    views: '3.1K',
    thumbnail: 'https://images.pexels.com/photos/6772076/pexels-photo-6772076.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Avaliação'
  },
  {
    title: 'Due Diligence Essencial',
    description: 'Checklist completo para verificar ativos antes da compra',
    duration: '20 min',
    views: '1.5K',
    thumbnail: 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Comprar'
  }
];

const contactOptions = [
  {
    title: 'Chat ao Vivo',
    description: 'Resposta imediata durante horário comercial',
    icon: MessageCircle,
    action: 'Iniciar Chat',
    available: true,
    responseTime: 'Imediato'
  },
  {
    title: 'Email de Suporte',
    description: 'Para questões detalhadas e não urgentes',
    icon: Mail,
    action: 'Enviar Email',
    available: true,
    responseTime: '2-4 horas'
  },
  {
    title: 'Telefone',
    description: 'Suporte telefónico para casos urgentes',
    icon: Phone,
    action: 'Ligar Agora',
    available: false,
    responseTime: 'Seg-Sex 9h-18h'
  },
  {
    title: 'Agendar Reunião',
    description: 'Consultoria personalizada com especialistas',
    icon: Video,
    action: 'Agendar',
    available: true,
    responseTime: '24-48 horas'
  }
];

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredFAQs = faqCategories.filter(category => {
    if (selectedCategory !== 'all' && category.id !== selectedCategory) return false;
    
    if (searchTerm) {
      return category.faqs.some(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return true;
  });

  const handleFeedback = (faqIndex: number, categoryIndex: number, helpful: boolean) => {
    // Handle feedback logic here
    console.log('Feedback:', { faqIndex, categoryIndex, helpful });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <HelpCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                Como podemos ajudar?
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Encontre respostas rápidas ou contacte a nossa equipa de suporte especializada
              </p>
            </motion.div>

            {/* Search */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Pesquisar na base de conhecimento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-6 text-lg border-slate-200 bg-white shadow-sm"
                />
              </div>
            </div>
          </div>

          <Tabs defaultValue="faq" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="tutorials">Tutoriais</TabsTrigger>
              <TabsTrigger value="guides">Guias</TabsTrigger>
              <TabsTrigger value="contact">Contacto</TabsTrigger>
            </TabsList>

            <TabsContent value="faq" className="space-y-8">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                >
                  Todas as Categorias
                </Button>
                {faqCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    <category.icon className="w-4 h-4" />
                    {category.title}
                  </Button>
                ))}
              </div>

              {/* FAQ Sections */}
              <div className="space-y-8">
                {filteredFAQs.map((category, categoryIndex) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: categoryIndex * 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <category.icon className="w-5 h-5 text-blue-600" />
                          </div>
                          {category.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                          {category.faqs.map((faq, faqIndex) => (
                            <AccordionItem key={faqIndex} value={`${category.id}-${faqIndex}`}>
                              <AccordionTrigger className="text-left">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="space-y-4">
                                  <p className="text-slate-600 leading-relaxed">
                                    {faq.answer}
                                  </p>
                                  
                                  <div className="flex items-center justify-between pt-4 border-t">
                                    <div className="flex items-center gap-4">
                                      <span className="text-sm text-slate-500">Esta resposta foi útil?</span>
                                      <div className="flex items-center gap-2">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => handleFeedback(faqIndex, categoryIndex, true)}
                                          className="flex items-center gap-1"
                                        >
                                          <ThumbsUp className="w-3 h-3" />
                                          {faq.helpful}
                                        </Button>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => handleFeedback(faqIndex, categoryIndex, false)}
                                          className="flex items-center gap-1"
                                        >
                                          <ThumbsDown className="w-3 h-3" />
                                          {faq.notHelpful}
                                        </Button>
                                      </div>
                                    </div>
                                    
                                    <Button variant="ghost" size="sm">
                                      <Share2 className="w-4 h-4 mr-2" />
                                      Partilhar
                                    </Button>
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tutorials" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tutorials.map((tutorial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                      <div className="relative">
                        <img
                          src={tutorial.thumbnail}
                          alt={tutorial.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <PlayCircle className="w-12 h-12 text-white" />
                        </div>
                        <Badge className="absolute top-3 left-3">
                          {tutorial.category}
                        </Badge>
                        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {tutorial.duration}
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {tutorial.title}
                        </h3>
                        <p className="text-slate-600 text-sm mb-4">
                          {tutorial.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-slate-500">
                            <Eye className="w-4 h-4 mr-1" />
                            {tutorial.views} visualizações
                          </div>
                          <Button size="sm">
                            Ver Tutorial
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="guides" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Guia Completo do Comprador',
                    description: 'Tudo o que precisa saber para comprar ativos digitais com segurança',
                    pages: 24,
                    downloads: '1.2K',
                    category: 'Comprar'
                  },
                  {
                    title: 'Manual do Vendedor Profissional',
                    description: 'Estratégias avançadas para maximizar o valor dos seus ativos',
                    pages: 32,
                    downloads: '890',
                    category: 'Vender'
                  },
                  {
                    title: 'Due Diligence Checklist',
                    description: 'Lista completa de verificações antes de qualquer aquisição',
                    pages: 12,
                    downloads: '2.1K',
                    category: 'Comprar'
                  },
                  {
                    title: 'Avaliação de Ativos Digitais',
                    description: 'Métodos e ferramentas para avaliar corretamente ativos digitais',
                    pages: 28,
                    downloads: '756',
                    category: 'Avaliação'
                  },
                  {
                    title: 'Segurança em Transações',
                    description: 'Boas práticas para transações seguras e protegidas',
                    pages: 16,
                    downloads: '1.5K',
                    category: 'Segurança'
                  },
                  {
                    title: 'Otimização de Listings',
                    description: 'Como criar listings atrativos que vendem mais rápido',
                    pages: 20,
                    downloads: '634',
                    category: 'Vender'
                  }
                ].map((guide, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <FileText className="w-8 h-8 text-blue-600" />
                          <Badge variant="outline">{guide.category}</Badge>
                        </div>
                        
                        <h3 className="font-semibold text-lg text-slate-900 mb-2">
                          {guide.title}
                        </h3>
                        <p className="text-slate-600 text-sm mb-4">
                          {guide.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                          <span>{guide.pages} páginas</span>
                          <span>{guide.downloads} downloads</span>
                        </div>
                        
                        <Button className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactOptions.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`hover:shadow-lg transition-shadow ${!option.available ? 'opacity-60' : ''}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${option.available ? 'bg-blue-100' : 'bg-slate-100'}`}>
                            <option.icon className={`w-6 h-6 ${option.available ? 'text-blue-600' : 'text-slate-400'}`} />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg text-slate-900">
                                {option.title}
                              </h3>
                              {option.available && (
                                <Badge variant="outline" className="text-green-600 border-green-200">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Disponível
                                </Badge>
                              )}
                            </div>
                            
                            <p className="text-slate-600 mb-4">
                              {option.description}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-sm text-slate-500">
                                <Clock className="w-4 h-4 mr-1" />
                                {option.responseTime}
                              </div>
                              
                              <Button 
                                disabled={!option.available}
                                variant={option.available ? 'default' : 'outline'}
                              >
                                {option.action}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Enviar Mensagem</CardTitle>
                  <CardDescription>
                    Não encontrou a resposta? Envie-nos uma mensagem detalhada
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Nome</label>
                      <Input placeholder="O seu nome" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input type="email" placeholder="seu@email.com" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Assunto</label>
                    <Input placeholder="Resumo da sua questão" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Mensagem</label>
                    <textarea
                      className="w-full p-3 border border-slate-200 rounded-lg resize-none"
                      rows={6}
                      placeholder="Descreva a sua questão em detalhe..."
                    />
                  </div>
                  
                  <Button className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
}