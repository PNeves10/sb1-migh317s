'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { motion } from 'framer-motion';
import {
  Shield, Eye, Download, Trash2, Edit, Share2, Lock, Globe,
  CheckCircle, FileText, Mail, Phone, AlertTriangle, Users,
  Settings, Clock, Database, Key, UserCheck, Scale
} from 'lucide-react';
import Link from 'next/link';

const rights = [
  {
    id: 'access',
    title: 'Direito de Acesso',
    description: 'Solicitar uma cópia de todos os dados pessoais que temos sobre si',
    icon: Eye,
    color: 'text-blue-600 bg-blue-100',
    details: [
      'Cópia completa dos seus dados pessoais',
      'Informação sobre como processamos os dados',
      'Detalhes sobre partilha com terceiros',
      'Histórico de processamento'
    ],
    howTo: 'Envie um email para privacy@aiquira.com com o assunto "Pedido de Acesso aos Dados"',
    timeframe: '30 dias'
  },
  {
    id: 'rectification',
    title: 'Direito de Retificação',
    description: 'Corrigir dados incorretos ou incompletos',
    icon: Edit,
    color: 'text-emerald-600 bg-emerald-100',
    details: [
      'Corrigir informações incorretas',
      'Completar dados incompletos',
      'Atualizar informações desatualizadas',
      'Modificar preferências de conta'
    ],
    howTo: 'Aceda às configurações da conta ou contacte-nos para correções',
    timeframe: '30 dias'
  },
  {
    id: 'erasure',
    title: 'Direito ao Esquecimento',
    description: 'Solicitar a eliminação dos seus dados pessoais',
    icon: Trash2,
    color: 'text-red-600 bg-red-100',
    details: [
      'Eliminação completa dos dados',
      'Remoção de backups (quando tecnicamente possível)',
      'Notificação a terceiros quando aplicável',
      'Confirmação da eliminação'
    ],
    howTo: 'Contacte privacy@aiquira.com com justificação para eliminação',
    timeframe: '30 dias'
  },
  {
    id: 'portability',
    title: 'Direito à Portabilidade',
    description: 'Receber os seus dados em formato estruturado e legível',
    icon: Download,
    color: 'text-purple-600 bg-purple-100',
    details: [
      'Dados em formato JSON ou CSV',
      'Estrutura legível por máquina',
      'Possibilidade de transferir para outro serviço',
      'Inclui todos os dados fornecidos'
    ],
    howTo: 'Solicite através do email privacy@aiquira.com',
    timeframe: '30 dias'
  },
  {
    id: 'restriction',
    title: 'Direito de Limitação',
    description: 'Limitar o processamento dos seus dados em certas circunstâncias',
    icon: Lock,
    color: 'text-amber-600 bg-amber-100',
    details: [
      'Suspender processamento temporariamente',
      'Manter dados mas não processar',
      'Aplicável durante disputas',
      'Notificação antes de retomar processamento'
    ],
    howTo: 'Contacte-nos explicando as circunstâncias para limitação',
    timeframe: '30 dias'
  },
  {
    id: 'objection',
    title: 'Direito de Oposição',
    description: 'Opor-se ao processamento dos seus dados para fins específicos',
    icon: Shield,
    color: 'text-indigo-600 bg-indigo-100',
    details: [
      'Oposição a marketing direto',
      'Oposição a processamento para interesses legítimos',
      'Oposição a decisões automatizadas',
      'Retirada de consentimento'
    ],
    howTo: 'Use as configurações de conta ou contacte-nos diretamente',
    timeframe: 'Imediato para marketing'
  }
];

const principles = [
  {
    title: 'Legalidade,  Lealdade e Transparência',
    description: 'Processamos dados de forma legal, justa e transparente',
    icon: Scale
  },
  {
    title: 'Limitação da Finalidade',
    description: 'Dados são recolhidos para fins específicos e legítimos',
    icon: Target
  },
  {
    title: 'Minimização dos Dados',
    description: 'Recolhemos apenas os dados necessários',
    icon: Database
  },
  {
    title: 'Exatidão',
    description: 'Mantemos os dados precisos e atualizados',
    icon: CheckCircle
  },
  {
    title: 'Limitação da Conservação',
    description: 'Dados são mantidos apenas pelo tempo necessário',
    icon: Clock
  },
  {
    title: 'Integridade e Confidencialidade',
    description: 'Protegemos os dados com medidas de segurança adequadas',
    icon: Shield
  }
];

const dataTypes = [
  {
    category: 'Dados de Identificação',
    examples: ['Nome completo', 'Endereço de email', 'Número de telefone', 'Endereço postal'],
    purpose: 'Criação e gestão de conta',
    retention: '7 anos após encerramento da conta'
  },
  {
    category: 'Dados de Transação',
    examples: ['Histórico de compras/vendas', 'Valores transacionados', 'Métodos de pagamento', 'Documentos de due diligence'],
    purpose: 'Facilitar transações e conformidade legal',
    retention: '10 anos para conformidade fiscal'
  },
  {
    category: 'Dados Técnicos',
    examples: ['Endereço IP', 'Tipo de navegador', 'Páginas visitadas', 'Tempo de permanência'],
    purpose: 'Melhorar a experiência e segurança',
    retention: '2 anos para analytics'
  },
  {
    category: 'Dados de Comunicação',
    examples: ['Mensagens na plataforma', 'Emails de suporte', 'Feedback', 'Avaliações'],
    purpose: 'Suporte ao cliente e melhoria do serviço',
    retention: '3 anos após última interação'
  }
];

export default function GDPRPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Badge variant="outline" className="mb-4 px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                RGPD / GDPR
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Os Seus Direitos
                <span className="block text-gradient">sob o RGPD</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                O Regulamento Geral sobre a Proteção de Dados (RGPD) garante-lhe 
                direitos importantes sobre os seus dados pessoais. Saiba como exercê-los.
              </p>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16"
          >
            <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-center">
                  Exercer os Seus Direitos
                </h2>
                <p className="text-blue-100 mb-6 text-center max-w-2xl mx-auto">
                  Pode exercer qualquer um dos seus direitos RGPD contactando-nos. 
                  Responderemos no prazo de 30 dias.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="bg-white text-blue-600 hover:bg-blue-50">
                    <a href="mailto:privacy@aiquira.com">
                      <Mail className="w-5 h-5 mr-2" />
                      privacy@aiquira.com
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    <Link href="/privacy">
                      <FileText className="w-5 h-5 mr-2" />
                      Política de Privacidade
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Your Rights */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Os Seus Direitos RGPD
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                O RGPD concede-lhe direitos específicos sobre como os seus dados pessoais são processados
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rights.map((right, index) => (
                <motion.div
                  key={right.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-3 rounded-lg ${right.color}`}>
                          <right.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{right.title}</CardTitle>
                          <Badge variant="outline" className="text-xs mt-1">
                            {right.timeframe}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription>{right.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-slate-900 mb-2">Inclui:</h4>
                          <ul className="text-sm text-slate-600 space-y-1">
                            {right.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-slate-900 mb-2">Como exercer:</h4>
                          <p className="text-sm text-slate-600">{right.howTo}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* GDPR Principles */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Princípios do RGPD
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Como cumprimos os princípios fundamentais do RGPD no tratamento dos seus dados
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
                        <principle.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-2">{principle.title}</h3>
                      <p className="text-sm text-slate-600">{principle.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Data We Process */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Dados que Processamos
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Transparência total sobre que dados recolhemos, porquê e por quanto tempo
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {dataTypes.map((dataType, index) => (
                <motion.div
                  key={dataType.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Database className="w-5 h-5 text-purple-600" />
                        </div>
                        {dataType.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-slate-900 mb-2">Exemplos:</h4>
                          <div className="flex flex-wrap gap-2">
                            {dataType.examples.map((example, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {example}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-slate-900 mb-1">Finalidade:</h4>
                          <p className="text-sm text-slate-600">{dataType.purpose}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-slate-900 mb-1">Retenção:</h4>
                          <p className="text-sm text-slate-600">{dataType.retention}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Legal Basis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Scale className="w-6 h-6 text-green-600" />
                  </div>
                  Base Legal para Processamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Consentimento</h3>
                    <p className="text-sm text-blue-800">
                      Para marketing direto e cookies não essenciais
                    </p>
                  </div>
                  
                  <div className="p-4 bg-emerald-50 rounded-lg">
                    <h3 className="font-semibold text-emerald-900 mb-2">Execução de Contrato</h3>
                    <p className="text-sm text-emerald-800">
                      Para fornecer os serviços da plataforma
                    </p>
                  </div>
                  
                  <div className="p-4 bg-amber-50 rounded-lg">
                    <h3 className="font-semibold text-amber-900 mb-2">Obrigação Legal</h3>
                    <p className="text-sm text-amber-800">
                      Para conformidade fiscal e regulamentar
                    </p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-semibold text-purple-900 mb-2">Interesses Legítimos</h3>
                    <p className="text-sm text-purple-800">
                      Para segurança e prevenção de fraude
                    </p>
                  </div>
                  
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h3 className="font-semibold text-red-900 mb-2">Interesses Vitais</h3>
                    <p className="text-sm text-red-800">
                      Para proteger vidas em situações de emergência
                    </p>
                  </div>
                  
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <h3 className="font-semibold text-indigo-900 mb-2">Interesse Público</h3>
                    <p className="text-sm text-indigo-800">
                      Para cooperação com autoridades
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact DPO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-slate-900 text-white border-0">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mx-auto mb-6">
                    <UserCheck className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">
                    Encarregado de Proteção de Dados
                  </h2>
                  <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                    O nosso Encarregado de Proteção de Dados (DPO) está disponível para 
                    esclarecer questões sobre o tratamento dos seus dados pessoais.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href="mailto:dpo@aiquira.com"
                      className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      dpo@aiquira.com
                    </a>
                    <a 
                      href="tel:+351210000000"
                      className="inline-flex items-center justify-center px-6 py-3 border border-slate-600 text-slate-300 rounded-lg font-medium hover:bg-slate-800 transition-colors"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      +351 21 000 0000
                    </a>
                  </div>
                  
                  <div className="mt-8 p-4 bg-slate-800 rounded-lg">
                    <h3 className="font-semibold mb-2">Autoridade de Controlo</h3>
                    <p className="text-sm text-slate-300">
                      Se não estiver satisfeito com a nossa resposta, pode apresentar queixa à 
                      Comissão Nacional de Proteção de Dados (CNPD) em{' '}
                      <a href="https://www.cnpd.pt" className="text-blue-400 hover:underline">
                        www.cnpd.pt
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}