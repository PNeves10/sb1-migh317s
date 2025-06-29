'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { motion } from 'framer-motion';
import {
  Check, X, Star, Zap, Crown, Shield, Users, TrendingUp,
  MessageSquare, FileText, BarChart3, Headphones, Globe,
  Brain, Target, Award, ArrowRight, HelpCircle
} from 'lucide-react';
import Link from 'next/link';

const plans = {
  buyer: [
    {
      name: 'Explorador',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfeito para começar a explorar o marketplace',
      badge: 'Gratuito',
      badgeColor: 'bg-green-100 text-green-700',
      features: [
        'Acesso ao marketplace completo',
        'Filtros básicos de pesquisa',
        'Visualização de ativos públicos',
        'Contacto direto com vendedores',
        'Suporte por email',
        'Até 5 favoritos'
      ],
      limitations: [
        'Sem relatórios de due diligence',
        'Sem avaliações AI detalhadas',
        'Sem suporte prioritário'
      ],
      cta: 'Começar Grátis',
      popular: false
    },
    {
      name: 'Profissional',
      price: { monthly: 49, yearly: 39 },
      description: 'Para compradores sérios que querem ferramentas avançadas',
      badge: 'Mais Popular',
      badgeColor: 'bg-blue-100 text-blue-700',
      features: [
        'Tudo do plano Explorador',
        'Relatórios de due diligence completos',
        'Avaliações AI detalhadas',
        'Alertas personalizados',
        'Histórico de transações',
        'Suporte prioritário',
        'Favoritos ilimitados',
        'Análise de mercado'
      ],
      limitations: [],
      cta: 'Começar Teste Grátis',
      popular: true
    },
    {
      name: 'Enterprise',
      price: { monthly: 199, yearly: 159 },
      description: 'Para fundos e compradores institucionais',
      badge: 'Premium',
      badgeColor: 'bg-purple-100 text-purple-700',
      features: [
        'Tudo do plano Profissional',
        'Gestor de conta dedicado',
        'API access',
        'Relatórios personalizados',
        'Integração com sistemas internos',
        'Suporte 24/7',
        'Acesso antecipado a novos ativos',
        'Consultoria especializada'
      ],
      limitations: [],
      cta: 'Contactar Vendas',
      popular: false
    }
  ],
  seller: [
    {
      name: 'Básico',
      price: { monthly: 0, yearly: 0 },
      description: 'Para vendedores ocasionais',
      badge: 'Gratuito',
      badgeColor: 'bg-green-100 text-green-700',
      features: [
        'Até 2 listings ativos',
        'Avaliação AI básica',
        'Ferramentas de comunicação',
        'Suporte por email',
        'Comissão de 5% por venda'
      ],
      limitations: [
        'Sem destaque nos resultados',
        'Sem analytics avançados',
        'Sem suporte prioritário'
      ],
      cta: 'Começar Grátis',
      popular: false
    },
    {
      name: 'Profissional',
      price: { monthly: 79, yearly: 63 },
      description: 'Para vendedores ativos com múltiplos ativos',
      badge: 'Recomendado',
      badgeColor: 'bg-blue-100 text-blue-700',
      features: [
        'Listings ilimitados',
        'Avaliação AI avançada',
        'Destaque nos resultados de pesquisa',
        'Analytics detalhados',
        'Suporte prioritário',
        'Comissão reduzida de 3%',
        'Ferramentas de marketing'
      ],
      limitations: [],
      cta: 'Começar Teste Grátis',
      popular: true
    },
    {
      name: 'Enterprise',
      price: { monthly: 299, yearly: 239 },
      description: 'Para empresas e brokers profissionais',
      badge: 'Premium',
      badgeColor: 'bg-purple-100 text-purple-700',
      features: [
        'Tudo do plano Profissional',
        'Gestor de conta dedicado',
        'White-label solutions',
        'API access',
        'Comissão negociável',
        'Suporte 24/7',
        'Consultoria especializada',
        'Integração personalizada'
      ],
      limitations: [],
      cta: 'Contactar Vendas',
      popular: false
    }
  ]
};

const addOns = [
  {
    name: 'Due Diligence Premium',
    price: 199,
    description: 'Relatório detalhado por especialistas humanos',
    icon: FileText
  },
  {
    name: 'Consultoria Especializada',
    price: 299,
    description: 'Sessão de 2h com especialista em M&A',
    icon: Users
  },
  {
    name: 'Marketing Boost',
    price: 99,
    description: 'Destaque premium por 30 dias',
    icon: TrendingUp
  },
  {
    name: 'Avaliação Profissional',
    price: 149,
    description: 'Avaliação detalhada por especialista',
    icon: Brain
  }
];

const faqs = [
  {
    question: 'Posso cancelar a qualquer momento?',
    answer: 'Sim, pode cancelar a sua subscrição a qualquer momento. Não há contratos de longo prazo ou taxas de cancelamento.'
  },
  {
    question: 'Existe um período de teste gratuito?',
    answer: 'Sim, oferecemos 14 dias de teste gratuito para todos os planos pagos. Não é necessário cartão de crédito.'
  },
  {
    question: 'Como funciona a comissão de vendas?',
    answer: 'A comissão é cobrada apenas quando uma venda é concluída com sucesso. Varia entre 3-5% dependendo do seu plano.'
  },
  {
    question: 'Posso mudar de plano a qualquer momento?',
    answer: 'Sim, pode fazer upgrade ou downgrade do seu plano a qualquer momento. As alterações são aplicadas no próximo ciclo de faturação.'
  },
  {
    question: 'Que métodos de pagamento aceitam?',
    answer: 'Aceitamos cartões de crédito/débito, PayPal, transferência bancária e criptomoedas para planos Enterprise.'
  },
  {
    question: 'Há descontos para ONGs ou startups?',
    answer: 'Sim, oferecemos descontos especiais para organizações sem fins lucrativos e startups em fase inicial. Contacte-nos para mais detalhes.'
  }
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [userType, setUserType] = useState<'buyer' | 'seller'>('buyer');

  const currentPlans = plans[userType];

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
                <Star className="w-4 h-4 mr-2" />
                Preços Transparentes
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Planos para Todos
                <span className="block text-gradient">os Tipos de Utilizador</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Escolha o plano perfeito para as suas necessidades. 
                Sem taxas escondidas, sem contratos longos.
              </p>
            </motion.div>

            {/* User Type Toggle */}
            <Tabs value={userType} onValueChange={(value) => setUserType(value as 'buyer' | 'seller')} className="mb-8">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                <TabsTrigger value="buyer">Compradores</TabsTrigger>
                <TabsTrigger value="seller">Vendedores</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <Label htmlFor="billing-toggle" className={!isYearly ? 'font-medium' : 'text-slate-500'}>
                Mensal
              </Label>
              <Switch
                id="billing-toggle"
                checked={isYearly}
                onCheckedChange={setIsYearly}
              />
              <Label htmlFor="billing-toggle" className={isYearly ? 'font-medium' : 'text-slate-500'}>
                Anual
                <Badge className="ml-2 bg-green-100 text-green-700">-20%</Badge>
              </Label>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {currentPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <Card className={`h-full ${plan.popular ? 'ring-2 ring-blue-500 shadow-xl' : 'shadow-lg'} hover:shadow-xl transition-shadow`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white px-4 py-1">
                        <Crown className="w-3 h-3 mr-1" />
                        Mais Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-8">
                    <div className="flex justify-center mb-4">
                      <Badge className={plan.badgeColor}>
                        {plan.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="text-base">{plan.description}</CardDescription>
                    
                    <div className="mt-6">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-slate-900">
                          €{isYearly ? plan.price.yearly : plan.price.monthly}
                        </span>
                        {plan.price.monthly > 0 && (
                          <span className="text-slate-500 ml-2">
                            /{isYearly ? 'ano' : 'mês'}
                          </span>
                        )}
                      </div>
                      {isYearly && plan.price.monthly > 0 && (
                        <p className="text-sm text-green-600 mt-2">
                          Poupe €{(plan.price.monthly * 12 - plan.price.yearly * 12).toFixed(0)}/ano
                        </p>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <Button 
                      className={`w-full mb-6 ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                      asChild
                    >
                      <Link href={plan.name === 'Enterprise' ? '/contact' : '/register'}>
                        {plan.cta}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-slate-900 mb-3">Incluído:</h4>
                        <ul className="space-y-2">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {plan.limitations.length > 0 && (
                        <div>
                          <h4 className="font-medium text-slate-900 mb-3">Limitações:</h4>
                          <ul className="space-y-2">
                            {plan.limitations.map((limitation, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-500">{limitation}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Add-ons */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Serviços Adicionais
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Melhore a sua experiência com serviços especializados
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {addOns.map((addon, index) => (
                <motion.div
                  key={addon.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
                        <addon.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-2">{addon.name}</h3>
                      <p className="text-sm text-slate-600 mb-4">{addon.description}</p>
                      <div className="text-2xl font-bold text-slate-900 mb-4">
                        €{addon.price}
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Adicionar
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Perguntas Frequentes
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Respostas às dúvidas mais comuns sobre os nossos preços
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                          <HelpCircle className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                          <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold mb-4">
                  Pronto para Começar?
                </h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Junte-se a milhares de utilizadores que já confiam na AIQuira 
                  para as suas transações de ativos digitais.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    <Link href="/register">
                      Começar Teste Grátis
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-white/30 text-blue-600 hover:bg-white/10">
                    <Link href="/contact">
                      Falar com Vendas
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