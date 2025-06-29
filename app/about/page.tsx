'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { motion } from 'framer-motion';
import {
  Brain, Users, Globe, TrendingUp, Shield, Zap, Award, Target,
  Heart, Lightbulb, Rocket, Star, CheckCircle, ArrowRight,
  Building, MapPin, Mail, Linkedin, Twitter
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const stats = [
  { value: '€2.4B+', label: 'Volume de Transações', icon: TrendingUp },
  { value: '15,000+', label: 'Utilizadores Ativos', icon: Users },
  { value: '95%', label: 'Taxa de Satisfação', icon: Star },
  { value: '48h', label: 'Tempo Médio de Resposta', icon: Zap },
];

const values = [
  {
    icon: Shield,
    title: 'Transparência',
    description: 'Acreditamos na transparência total em todas as transações. Todos os ativos são verificados e as métricas são validadas pela nossa equipa.',
    color: 'text-blue-600 bg-blue-100'
  },
  {
    icon: Zap,
    title: 'Inovação',
    description: 'Usamos tecnologia de ponta, incluindo IA e machine learning, para revolucionar o mercado de M&A digital.',
    color: 'text-emerald-600 bg-emerald-100'
  },
  {
    icon: Heart,
    title: 'Comunidade',
    description: 'Construímos uma comunidade de empreendedores digitais que se ajudam mutuamente a crescer e ter sucesso.',
    color: 'text-red-600 bg-red-100'
  },
  {
    icon: Target,
    title: 'Excelência',
    description: 'Comprometemo-nos com a excelência em tudo o que fazemos, desde o atendimento ao cliente até à tecnologia.',
    color: 'text-purple-600 bg-purple-100'
  }
];

const team = [
  {
    name: 'Sofia Rodrigues',
    role: 'CEO & Co-Founder',
    bio: 'Ex-Goldman Sachs, especialista em M&A com 15 anos de experiência. Liderou transações de mais de €5B.',
    image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=300',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'Pedro Costa',
    role: 'CTO & Co-Founder',
    bio: 'Ex-Google, especialista em IA e machine learning. PhD em Computer Science pelo MIT.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'Ana Silva',
    role: 'Head of Product',
    bio: 'Ex-Stripe, especialista em produtos fintech. Construiu produtos usados por milhões de utilizadores.',
    image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'João Santos',
    role: 'Head of Security',
    bio: 'Ex-Microsoft, especialista em cibersegurança. Certificado CISSP com 12 anos de experiência.',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300',
    linkedin: '#',
    twitter: '#'
  }
];

const milestones = [
  {
    year: '2023',
    title: 'Fundação da AIQuira',
    description: 'Lançamento da plataforma com foco em avaliações AI para ativos digitais.',
    icon: Rocket
  },
  {
    year: '2023',
    title: 'Primeiras 100 Transações',
    description: 'Alcançámos as primeiras 100 transações bem-sucedidas na plataforma.',
    icon: Target
  },
  {
    year: '2024',
    title: 'Série A - €10M',
    description: 'Levantámos €10M em financiamento Série A liderado por fundos de venture capital.',
    icon: TrendingUp
  },
  {
    year: '2024',
    title: 'Expansão Internacional',
    description: 'Expandimos para mercados europeus e americanos.',
    icon: Globe
  },
  {
    year: '2024',
    title: '€1B em Volume',
    description: 'Ultrapassámos €1B em volume total de transações na plataforma.',
    icon: Award
  },
  {
    year: '2025',
    title: 'AI 2.0 Launch',
    description: 'Lançamento da segunda geração da nossa tecnologia de avaliação AI.',
    icon: Brain
  }
];

const investors = [
  { name: 'Sequoia Capital', logo: '/logos/sequoia.png' },
  { name: 'Andreessen Horowitz', logo: '/logos/a16z.png' },
  { name: 'Index Ventures', logo: '/logos/index.png' },
  { name: 'Accel Partners', logo: '/logos/accel.png' }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Badge variant="outline" className="mb-4 px-4 py-2">
                <Building className="w-4 h-4 mr-2" />
                Sobre a AIQuira
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                Revolucionando o
                <span className="block text-gradient">M&A Digital</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Somos a primeira plataforma do mundo a usar inteligência artificial para 
                democratizar o mercado de fusões e aquisições digitais, tornando-o acessível 
                a todos os empreendedores.
              </p>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Target className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl">Nossa Missão</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    Democratizar o acesso ao mercado de M&A digital, permitindo que qualquer 
                    empreendedor possa comprar ou vender ativos digitais de forma segura, 
                    transparente e eficiente, usando o poder da inteligência artificial.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-emerald-100 rounded-lg">
                      <Lightbulb className="w-6 h-6 text-emerald-600" />
                    </div>
                    <CardTitle className="text-2xl">Nossa Visão</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    Ser a plataforma líder mundial para transações de ativos digitais, 
                    criando um ecossistema onde empreendedores podem facilmente monetizar 
                    o seu trabalho e investidores podem descobrir oportunidades únicas.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Values */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Nossos Valores
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Os princípios que guiam tudo o que fazemos na AIQuira
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${value.color}`}>
                          <value.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-slate-900 mb-3">
                            {value.title}
                          </h3>
                          <p className="text-slate-600 leading-relaxed">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Nossa Jornada
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Os marcos importantes na evolução da AIQuira
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-slate-200"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            {index % 2 === 0 ? (
                              <>
                                <div>
                                  <Badge className="mb-2">{milestone.year}</Badge>
                                  <h3 className="font-semibold text-slate-900">{milestone.title}</h3>
                                </div>
                                <div className="p-2 bg-blue-100 rounded-lg">
                                  <milestone.icon className="w-5 h-5 text-blue-600" />
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="p-2 bg-blue-100 rounded-lg">
                                  <milestone.icon className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                  <Badge className="mb-2">{milestone.year}</Badge>
                                  <h3 className="font-semibold text-slate-900">{milestone.title}</h3>
                                </div>
                              </>
                            )}
                          </div>
                          <p className="text-slate-600 text-sm">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="relative z-10 flex items-center justify-center w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                    
                    <div className="w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Nossa Equipa
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Líderes experientes de empresas tecnológicas de topo mundial
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="relative mb-4">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={120}
                          height={120}
                          className="rounded-full mx-auto"
                        />
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-1">{member.name}</h3>
                      <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                      <p className="text-sm text-slate-600 mb-4">{member.bio}</p>
                      <div className="flex justify-center gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-4 h-4" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                            <Twitter className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Investors */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Apoiado pelos Melhores
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Investidores de renome mundial que acreditam na nossa visão
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {investors.map((investor, index) => (
                <motion.div
                  key={investor.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center p-6 bg-white rounded-lg border border-slate-200 hover:shadow-md transition-shadow"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <Building className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-sm font-medium text-slate-700">{investor.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold mb-4">
                  Quer Saber Mais?
                </h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Entre em contacto connosco para parcerias, investimentos ou 
                  simplesmente para conhecer melhor a nossa missão.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    <Link href="mailto:hello@aiquira.com">
                      <Mail className="w-5 h-5 mr-2" />
                      Contactar Equipa
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                    <Link href="/careers">
                      Carreiras
                      <ArrowRight className="w-5 h-5 ml-2" />
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