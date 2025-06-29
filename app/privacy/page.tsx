'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { motion } from 'framer-motion';
import {
  Shield, Eye, Lock, Users, Globe, FileText, Mail, Phone,
  CheckCircle, AlertTriangle, Settings, Download, Trash2, Clock
} from 'lucide-react';

const sections = [
  {
    id: 'introduction',
    title: 'Introdução',
    icon: FileText,
    content: `Esta Política de Privacidade descreve como a AIQuira ("nós", "nosso" ou "empresa") recolhe, usa, armazena e protege as suas informações pessoais quando utiliza a nossa plataforma de M&A digital.

Comprometemo-nos a proteger a sua privacidade e a ser transparentes sobre como tratamos os seus dados. Esta política aplica-se a todos os utilizadores da plataforma AIQuira, incluindo visitantes, compradores e vendedores.

Última atualização: 1 de Janeiro de 2025`
  },
  {
    id: 'data-collection',
    title: 'Informações que Recolhemos',
    icon: Eye,
    content: `Recolhemos diferentes tipos de informações para fornecer e melhorar os nossos serviços:

**Informações de Conta:**
• Nome completo e informações de contacto
• Endereço de email e número de telefone
• Informações de verificação de identidade
• Preferências de conta e configurações

**Informações de Transação:**
• Detalhes sobre ativos listados ou adquiridos
• Histórico de transações e comunicações
• Informações de pagamento (processadas por terceiros seguros)
• Documentos de due diligence

**Informações Técnicas:**
• Endereço IP e localização geográfica
• Tipo de dispositivo e navegador
• Páginas visitadas e tempo de permanência
• Cookies e tecnologias similares

**Informações de Comunicação:**
• Mensagens trocadas na plataforma
• Suporte ao cliente e feedback
• Participação em pesquisas ou eventos`
  },
  {
    id: 'data-usage',
    title: 'Como Usamos as Suas Informações',
    icon: Settings,
    content: `Utilizamos as suas informações para os seguintes propósitos:

**Prestação de Serviços:**
• Criar e gerir a sua conta
• Facilitar transações entre compradores e vendedores
• Fornecer avaliações AI e relatórios de due diligence
• Processar pagamentos e transferências

**Comunicação:**
• Enviar notificações importantes sobre a conta
• Responder a pedidos de suporte
• Partilhar atualizações sobre novos recursos
• Marketing direto (com o seu consentimento)

**Segurança e Conformidade:**
• Verificar identidade e prevenir fraude
• Monitorizar atividade suspeita
• Cumprir obrigações legais e regulamentares
• Proteger os direitos da empresa e utilizadores

**Melhoria dos Serviços:**
• Analisar padrões de uso da plataforma
• Desenvolver novos recursos e funcionalidades
• Personalizar a experiência do utilizador
• Realizar pesquisa e desenvolvimento`
  },
  {
    id: 'data-sharing',
    title: 'Partilha de Informações',
    icon: Users,
    content: `Não vendemos as suas informações pessoais. Podemos partilhar dados nas seguintes circunstâncias:

**Com o Seu Consentimento:**
• Quando autoriza explicitamente a partilha
• Para facilitar transações entre utilizadores
• Para serviços de terceiros que solicita

**Prestadores de Serviços:**
• Processadores de pagamento (Stripe, PayPal)
• Serviços de verificação de identidade
• Fornecedores de infraestrutura cloud (AWS)
• Ferramentas de analytics e marketing

**Obrigações Legais:**
• Quando exigido por lei ou ordem judicial
• Para proteger direitos legais da empresa
• Em caso de investigações de fraude
• Para cumprir regulamentações financeiras

**Transações Empresariais:**
• Em caso de fusão, aquisição ou venda de ativos
• Durante processos de due diligence empresarial
• Com aprovação prévia dos utilizadores afetados`
  },
  {
    id: 'data-security',
    title: 'Segurança dos Dados',
    icon: Shield,
    content: `Implementamos medidas de segurança robustas para proteger as suas informações:

**Medidas Técnicas:**
• Encriptação SSL/TLS para todas as comunicações
• Encriptação de dados em repouso
• Autenticação de dois fatores obrigatória
• Monitorização contínua de segurança

**Medidas Organizacionais:**
• Acesso limitado aos dados pessoais
• Formação regular em segurança para funcionários
• Políticas rigorosas de gestão de dados
• Auditorias de segurança regulares

**Infraestrutura:**
• Servidores seguros em centros de dados certificados
• Backups regulares e planos de recuperação
• Sistemas de deteção de intrusão
• Atualizações de segurança automáticas

**Resposta a Incidentes:**
• Plano de resposta a violações de dados
• Notificação imediata em caso de incidente
• Investigação completa e medidas corretivas
• Relatórios às autoridades quando necessário`
  },
  {
    id: 'user-rights',
    title: 'Os Seus Direitos',
    icon: CheckCircle,
    content: `Sob o RGPD e outras leis de proteção de dados, tem os seguintes direitos:

**Direito de Acesso:**
• Solicitar cópia dos seus dados pessoais
• Informações sobre como processamos os dados
• Detalhes sobre partilha com terceiros

**Direito de Retificação:**
• Corrigir dados incorretos ou incompletos
• Atualizar informações desatualizadas
• Modificar preferências de conta

**Direito de Eliminação:**
• Solicitar eliminação dos seus dados
• "Direito ao esquecimento" em certas circunstâncias
• Eliminação automática após inatividade prolongada

**Direito de Portabilidade:**
• Receber dados em formato estruturado
• Transferir dados para outro prestador de serviços
• Exportar histórico de transações

**Direito de Oposição:**
• Opor-se ao processamento para marketing direto
• Retirar consentimento a qualquer momento
• Limitar o processamento em certas circunstâncias

Para exercer estes direitos, contacte-nos através de privacy@aiquira.com`
  },
  {
    id: 'cookies',
    title: 'Cookies e Tecnologias Similares',
    icon: Globe,
    content: `Utilizamos cookies e tecnologias similares para melhorar a sua experiência:

**Tipos de Cookies:**
• **Essenciais:** Necessários para o funcionamento da plataforma
• **Funcionais:** Lembram as suas preferências e configurações
• **Analytics:** Ajudam-nos a entender como usa a plataforma
• **Marketing:** Personalizam anúncios e conteúdo

**Gestão de Cookies:**
• Pode gerir preferências nas configurações do navegador
• Alguns cookies são essenciais e não podem ser desativados
• A desativação pode afetar a funcionalidade da plataforma
• Atualizamos as suas preferências regularmente

**Tecnologias Similares:**
• Web beacons para analytics
• Armazenamento local para preferências
• Fingerprinting limitado para segurança
• Pixels de tracking para marketing (com consentimento)`
  },
  {
    id: 'international',
    title: 'Transferências Internacionais',
    icon: Globe,
    content: `Como operamos globalmente, os seus dados podem ser transferidos para outros países:

**Proteções Implementadas:**
• Cláusulas contratuais padrão da UE
• Certificações de adequação de proteção
• Acordos de processamento de dados com terceiros
• Monitorização contínua de conformidade

**Países de Destino:**
• Estados Unidos (servidores AWS)
• União Europeia (processamento principal)
• Reino Unido (suporte e desenvolvimento)
• Outros países apenas com proteções adequadas

**Seus Direitos:**
• Informação sobre todas as transferências
• Direito de oposição a transferências específicas
• Cópia das proteções implementadas
• Recurso em caso de violações`
  },
  {
    id: 'retention',
    title: 'Retenção de Dados',
    icon: Clock,
    content: `Mantemos os seus dados apenas pelo tempo necessário:

**Períodos de Retenção:**
• **Dados de conta:** Enquanto a conta estiver ativa + 7 anos
• **Transações:** 10 anos para conformidade fiscal
• **Comunicações:** 3 anos após a última interação
• **Dados técnicos:** 2 anos para analytics

**Eliminação Automática:**
• Contas inativas por mais de 5 anos
• Dados temporários após 30 dias
• Logs de sistema após 1 ano
• Backups após 7 anos

**Exceções:**
• Obrigações legais podem exigir retenção mais longa
• Disputas legais suspendem eliminação
• Dados anonimizados podem ser mantidos indefinidamente
• Consentimento explícito para retenção adicional`
  },
  {
    id: 'changes',
    title: 'Alterações a Esta Política',
    icon: AlertTriangle,
    content: `Podemos atualizar esta política periodicamente:

**Notificação de Alterações:**
• Email para todos os utilizadores registados
• Notificação na plataforma por 30 dias
• Destaque das alterações principais
• Período de transição quando aplicável

**Tipos de Alterações:**
• **Menores:** Clarificações ou correções
• **Significativas:** Novos usos de dados ou partilha
• **Legais:** Conformidade com novas regulamentações
• **Técnicas:** Novos sistemas ou processos

**Seus Direitos:**
• Revisar alterações antes da implementação
• Retirar consentimento se discordar
• Exportar dados antes de alterações significativas
• Contactar-nos com questões ou preocupações`
  }
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Badge variant="outline" className="mb-4 px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Política de Privacidade
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                A Sua Privacidade
                <span className="block text-gradient">é a Nossa Prioridade</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Transparência total sobre como recolhemos, usamos e protegemos 
                as suas informações pessoais na plataforma AIQuira.
              </p>
            </motion.div>
          </div>

          {/* Quick Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2" />
                  Resumo Rápido
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-800">
                  <div>
                    <h3 className="font-semibold mb-2">✓ O que fazemos:</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Protegemos os seus dados com encriptação</li>
                      <li>• Usamos dados apenas para melhorar o serviço</li>
                      <li>• Respeitamos todos os seus direitos RGPD</li>
                      <li>• Somos transparentes sobre todas as práticas</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">✗ O que NÃO fazemos:</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Nunca vendemos os seus dados</li>
                      <li>• Não partilhamos sem consentimento</li>
                      <li>• Não enviamos spam</li>
                      <li>• Não armazenamos dados desnecessários</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                id={section.id}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <section.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-slate max-w-none">
                      {section.content.split('\n\n').map((paragraph, idx) => {
                        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                          return (
                            <h3 key={idx} className="text-lg font-semibold text-slate-900 mt-6 mb-3">
                              {paragraph.slice(2, -2)}
                            </h3>
                          );
                        }
                        if (paragraph.startsWith('•')) {
                          const items = paragraph.split('\n');
                          return (
                            <ul key={idx} className="list-disc list-inside space-y-1 mb-4">
                              {items.map((item, itemIdx) => (
                                <li key={itemIdx} className="text-slate-600">
                                  {item.replace('• ', '')}
                                </li>
                              ))}
                            </ul>
                          );
                        }
                        return (
                          <p key={idx} className="text-slate-600 leading-relaxed mb-4">
                            {paragraph}
                          </p>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">
                  Tem Questões sobre Privacidade?
                </h2>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  A nossa equipa de proteção de dados está disponível para esclarecer 
                  qualquer dúvida sobre como tratamos as suas informações.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:privacy@aiquira.com"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    privacy@aiquira.com
                  </a>
                  <a 
                    href="tel:+351210000000"
                    className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    +351 21 000 0000
                  </a>
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