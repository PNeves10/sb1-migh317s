'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { motion } from 'framer-motion';
import {
  Search, TrendingUp, DollarSign, Users, Shield, MessageSquare, 
  CheckCircle, ArrowRight, PlayCircle, Star, Brain, Zap,
  Globe, ShoppingCart, Smartphone, Building, FileText, Eye,
  Heart, Clock, Target, Award, Lightbulb, BarChart3
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const userTypes = [
  {
    id: 'buyer',
    title: 'Para Compradores',
    description: 'Encontre e adquira ativos digitais de qualidade',
    icon: Search,
    color: 'text-blue-600 bg-blue-100',
    steps: [
      {
        title: 'Criar Conta',
        description: 'Registe-se como comprador e complete o seu perfil',
        details: 'Forneça informações sobre os seus interesses de investimento, orçamento e preferências de categoria para receber recomendações personalizadas.',
        icon: Users
      },
      {
        title: 'Explorar Marketplace',
        description: 'Navegue pelos ativos disponíveis usando filtros avançados',
        details: 'Use os nossos filtros inteligentes para encontrar ativos por categoria, preço, receita, localização e muito mais. A nossa IA aprende com as suas preferências.',
        icon: Search
      },
      {
        title: 'Analisar Ativos',
        description: 'Revise métricas, avaliações AI e documentação',
        details: 'Aceda a relatórios detalhados de due diligence, avaliações automáticas e métricas de performance para tomar decisões informadas.',
        icon: BarChart3
      },
      {
        title: 'Contactar Vendedores',
        description: 'Inicie conversas e negocie termos',
        details: 'Use o nosso sistema de mensagens seguro para fazer perguntas, solicitar informações adicionais e negociar preços e termos.',
        icon: MessageSquare
      },
      {
        title: 'Due Diligence',
        description: 'Conduza verificações detalhadas do ativo',
        details: 'Acesse documentos financeiros, código fonte, contratos e outras informações críticas através da nossa plataforma segura.',
        icon: FileText
      },
      {
        title: 'Finalizar Compra',
        description: 'Complete a transação com segurança',
        details: 'Use o nosso serviço de escrow para proteger o pagamento até a transferência completa do ativo ser confirmada.',
        icon: Shield
      }
    ]
  },
  {
    id: 'seller',
    title: 'Para Vendedores',
    description: 'Venda os seus ativos digitais pelo melhor preço',
    icon: TrendingUp,
    color: 'text-emerald-600 bg-emerald-100',
    steps: [
      {
        title: 'Preparar Ativo',
        description: 'Organize documentação e métricas do seu negócio',
        details: 'Compile relatórios financeiros, métricas de tráfego, documentação técnica e outros materiais que demonstrem o valor do seu ativo.',
        icon: FileText
      },
      {
        title: 'Avaliação AI',
        description: 'Obtenha uma avaliação automática e precisa',
        details: 'A nossa IA analisa receitas, tráfego, crescimento e comparáveis de mercado para fornecer uma avaliação inicial competitiva.',
        icon: Brain
      },
      {
        title: 'Criar Listing',
        description: 'Publique o seu ativo no marketplace',
        details: 'Crie um listing atrativo com fotos, descrições detalhadas, métricas-chave e documentação de suporte para atrair compradores qualificados.',
        icon: Globe
      },
      {
        title: 'Receber Inquéritos',
        description: 'Gerir interesse de compradores potenciais',
        details: 'Responda a perguntas, forneça informações adicionais e qualifique compradores através do nosso sistema de comunicação integrado.',
        icon: MessageSquare
      },
      {
        title: 'Negociar Termos',
        description: 'Discuta preço e condições de venda',
        details: 'Negocie preços, termos de pagamento, períodos de transição e outras condições importantes para ambas as partes.',
        icon: DollarSign
      },
      {
        title: 'Transferir Ativo',
        description: 'Complete a venda de forma segura',
        details: 'Transfira domínios, contas, código fonte e outros ativos através do nosso processo guiado e seguro.',
        icon: CheckCircle
      }
    ]
  }
];

const features = [
  {
    title: 'Avaliação AI Instantânea',
    description: 'Obtenha avaliações precisas em segundos',
    icon: Brain,
    benefits: [
      'Algoritmo treinado em milhares de transações',
      'Análise de múltiplos fatores de valor',
      'Comparação com ativos similares',
      'Atualização em tempo real'
    ]
  },
  {
    title: 'Marketplace Verificado',
    description: 'Todos os ativos são verificados pela nossa equipa',
    icon: Shield,
    benefits: [
      'Verificação de propriedade',
      'Validação de métricas',
      'Screening de vendedores',
      'Proteção contra fraude'
    ]
  },
  {
    title: 'Due Diligence Automatizada',
    description: 'Relatórios completos gerados automaticamente',
    icon: FileText,
    benefits: [
      'Análise financeira detalhada',
      'Verificação técnica',
      'Análise de mercado',
      'Relatórios personalizáveis'
    ]
  },
  {
    title: 'Escrow Seguro',
    description: 'Transações protegidas do início ao fim',
    icon: Shield,
    benefits: [
      'Pagamentos seguros',
      'Transferência verificada',
      'Proteção de ambas as partes',
      'Suporte 24/7'
    ]
  }
];

const faqs = [
  {
    question: 'Quanto tempo demora para vender um ativo?',
    answer: 'O tempo médio de venda na AIQuira é de 30-45 dias, significativamente mais rápido que a média da indústria de 3-6 meses. Isto deve-se ao nosso sistema de matching inteligente e base de compradores qualificados.'
  },
  {
    question: 'Como funciona a avaliação AI?',
    answer: 'A nossa IA analisa receitas, tráfego, crescimento, idade do negócio, mercado e centenas de outros fatores. Compara com transações similares na nossa base de dados para fornecer uma avaliação precisa e atualizada.'
  },
  {
    question: 'Que tipos de ativos posso vender?',
    answer: 'Aceitamos websites, SaaS, aplicações móveis, e-commerce, blogs, canais de YouTube, contas de redes sociais, domínios premium e outros ativos digitais que geram receita ou têm valor comercial.'
  },
  {
    question: 'Como é garantida a segurança das transações?',
    answer: 'Usamos um sistema de escrow que retém o pagamento até a transferência completa ser confirmada. Todos os vendedores são verificados e as transações são monitorizadas pela nossa equipa de segurança.'
  },
  {
    question: 'Qual é a comissão da plataforma?',
    answer: 'Cobramos uma comissão de 5% apenas sobre vendas bem-sucedidas. Não há custos de listagem ou taxas escondidas. Compradores não pagam comissões.'
  }
];

export default function HowToUsePage() {
  const [activeTab, setActiveTab] = useState('buyer');
  const [selectedStep, setSelectedStep] = useState(0);

  const currentUserType = userTypes.find(type => type.id === activeTab);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Badge variant="outline" className="mb-4 px-4 py-2">
                <Lightbulb className="w-4 h-4 mr-2" />
                Guia Completo
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Como Usar a AIQuira
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Aprenda a comprar e vender ativos digitais na nossa plataforma. 
                Guias passo-a-passo para maximizar o seu sucesso.
              </p>
            </motion.div>
          </div>

          {/* User Type Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-16">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="buyer" className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Compradores
              </TabsTrigger>
              <TabsTrigger value="seller" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Vendedores
              </TabsTrigger>
            </TabsList>

            {userTypes.map((userType) => (
              <TabsContent key={userType.id} value={userType.id} className="space-y-8">
                {/* User Type Header */}
                <div className="text-center mb-12">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${userType.color} mb-4`}>
                    <userType.icon className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">{userType.title}</h2>
                  <p className="text-lg text-slate-600">{userType.description}</p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Steps List */}
                  <div className="space-y-4">
                    {userType.steps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setSelectedStep(index)}
                        className={`p-6 rounded-lg border cursor-pointer transition-all ${
                          selectedStep === index 
                            ? 'border-blue-500 bg-blue-50 shadow-md' 
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                            selectedStep === index ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            <span className="font-bold text-sm">{index + 1}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
                            <p className="text-sm text-slate-600">{step.description}</p>
                          </div>
                          <step.icon className={`w-5 h-5 ${
                            selectedStep === index ? 'text-blue-600' : 'text-slate-400'
                          }`} />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Step Details */}
                  <div className="lg:sticky lg:top-8">
                    <Card className="h-fit">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                            <userType.steps[selectedStep].icon className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{userType.steps[selectedStep].title}</CardTitle>
                            <CardDescription>{userType.steps[selectedStep].description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 leading-relaxed mb-6">
                          {userType.steps[selectedStep].details}
                        </p>
                        
                        <div className="flex gap-3">
                          <Button asChild>
                            <Link href="/register">
                              Começar Agora
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                          </Button>
                          <Button variant="outline" asChild>
                            <Link href="/marketplace">
                              Ver Exemplos
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Features Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Funcionalidades Principais
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Ferramentas avançadas que tornam a compra e venda de ativos digitais simples e segura
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <feature.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{feature.title}</CardTitle>
                          <CardDescription>{feature.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Perguntas Frequentes
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Respostas às dúvidas mais comuns sobre como usar a plataforma
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                    <AccordionTrigger className="text-left font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold mb-4">
                  Pronto para Começar?
                </h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Junte-se a milhares de empreendedores que já usam a AIQuira 
                  para comprar e vender ativos digitais com sucesso.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    <Link href="/register">
                      Criar Conta Gratuita
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                    <Link href="/marketplace">
                      Explorar Marketplace
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}