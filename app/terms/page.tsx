'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { motion } from 'framer-motion';
import {
  FileText, Scale, Shield, Users, CreditCard, AlertTriangle,
  CheckCircle, XCircle, Mail, Phone, Globe, Building
} from 'lucide-react';

const sections = [
  {
    id: 'acceptance',
    title: 'Aceitação dos Termos',
    icon: CheckCircle,
    content: `Ao aceder e usar a plataforma AIQuira, concorda em ficar vinculado a estes Termos de Serviço. Se não concordar com qualquer parte destes termos, não deve usar os nossos serviços.

Estes termos constituem um acordo legal entre si ("Utilizador") e a AIQuira, Lda. ("AIQuira", "nós", "nosso"). O uso continuado da plataforma após alterações aos termos constitui aceitação das mesmas.

A plataforma AIQuira é destinada apenas a utilizadores com 18 anos ou mais. Ao usar os nossos serviços, declara e garante que tem pelo menos 18 anos de idade.`
  },
  {
    id: 'services',
    title: 'Descrição dos Serviços',
    icon: Globe,
    content: `A AIQuira é uma plataforma digital que facilita a compra e venda de ativos digitais, incluindo:

**Serviços Principais:**
• Marketplace para listagem e descoberta de ativos digitais
• Avaliações automáticas usando inteligência artificial
• Ferramentas de due diligence e análise de ativos
• Sistema de comunicação segura entre utilizadores
• Serviços de escrow para transações seguras
• Relatórios e analytics de mercado

**Tipos de Ativos Suportados:**
• Websites e domínios
• Aplicações SaaS (Software as a Service)
• Aplicações móveis
• Negócios de e-commerce
• Canais de redes sociais
• Outros ativos digitais com valor comercial

Reservamo-nos o direito de modificar, suspender ou descontinuar qualquer aspeto dos nossos serviços a qualquer momento, com ou sem aviso prévio.`
  },
  {
    id: 'accounts',
    title: 'Contas de Utilizador',
    icon: Users,
    content: `**Criação de Conta:**
Para usar a plataforma, deve criar uma conta fornecendo informações precisas e completas. É responsável por manter a confidencialidade das suas credenciais de login.

**Tipos de Conta:**
• **Comprador:** Para utilizadores interessados em adquirir ativos digitais
• **Vendedor:** Para utilizadores que desejam listar ativos para venda
• **Ambos:** Conta híbrida para utilizadores que compram e vendem

**Verificação:**
Podemos exigir verificação de identidade para certas funcionalidades. A verificação pode incluir documentos de identificação, comprovativo de morada e verificação telefónica.

**Responsabilidades:**
• Manter informações de conta atualizadas e precisas
• Notificar-nos imediatamente sobre uso não autorizado
• Não partilhar credenciais com terceiros
• Usar a conta apenas para fins legítimos e legais

**Suspensão e Terminação:**
Reservamo-nos o direito de suspender ou terminar contas que violem estes termos, envolvam-se em atividades fraudulentas ou representem riscos para outros utilizadores.`
  },
  {
    id: 'transactions',
    title: 'Transações e Pagamentos',
    icon: CreditCard,
    content: `**Processo de Transação:**
Todas as transações na plataforma seguem um processo estruturado que inclui negociação, due diligence, acordo de termos e transferência segura de ativos.

**Comissões e Taxas:**
• Listagem de ativos: Gratuita para planos básicos
• Comissão de venda: 3-5% do valor da transação (varia por plano)
• Taxas de processamento de pagamento: Aplicadas conforme o método
• Serviços adicionais: Conforme tabela de preços

**Métodos de Pagamento:**
• Cartões de crédito e débito
• Transferências bancárias
• PayPal e outros processadores aprovados
• Criptomoedas (para transações elegíveis)

**Escrow e Proteção:**
• Todos os pagamentos são retidos em escrow até conclusão da transferência
• Proteção contra fraude e disputas
• Processo de resolução de conflitos
• Reembolsos conforme política aplicável

**Responsabilidades Fiscais:**
Os utilizadores são responsáveis por todas as obrigações fiscais relacionadas com as suas transações. A AIQuira pode fornecer documentação para fins fiscais, mas não oferece aconselhamento fiscal.`
  },
  {
    id: 'conduct',
    title: 'Conduta do Utilizador',
    icon: Shield,
    content: `**Uso Aceitável:**
Deve usar a plataforma de forma responsável e em conformidade com todas as leis aplicáveis.

**Atividades Proibidas:**
• Fornecer informações falsas ou enganosas sobre ativos
• Envolver-se em atividades fraudulentas ou ilegais
• Violar direitos de propriedade intelectual
• Assediar, ameaçar ou intimidar outros utilizadores
• Tentar contornar medidas de segurança da plataforma
• Usar bots ou scripts automatizados sem autorização
• Listar ativos que não possui ou não tem direito de vender

**Conteúdo do Utilizador:**
• É responsável por todo o conteúdo que publica na plataforma
• Deve ter todos os direitos necessários para o conteúdo partilhado
• Não deve publicar conteúdo ilegal, ofensivo ou inadequado
• Concede-nos licença para usar o conteúdo conforme necessário para operar a plataforma

**Consequências de Violações:**
Violações destes termos podem resultar em:
• Aviso ou suspensão temporária
• Remoção de listings ou conteúdo
• Terminação permanente da conta
• Ação legal quando apropriado`
  },
  {
    id: 'intellectual-property',
    title: 'Propriedade Intelectual',
    icon: FileText,
    content: `**Propriedade da AIQuira:**
A plataforma AIQuira, incluindo design, código, logos, marcas registadas e conteúdo, é propriedade da AIQuira e está protegida por leis de propriedade intelectual.

**Licença de Uso:**
Concedemos-lhe uma licença limitada, não exclusiva e revogável para usar a plataforma conforme estes termos. Esta licença não inclui:
• Direitos de revenda ou distribuição
• Direitos de modificação ou criação de obras derivadas
• Uso para fins comerciais não autorizados

**Conteúdo do Utilizador:**
• Mantém a propriedade do conteúdo que publica
• Concede-nos licença para usar, exibir e distribuir o conteúdo na plataforma
• Garante que tem todos os direitos necessários sobre o conteúdo

**Violações de Propriedade Intelectual:**
Respeitamos os direitos de propriedade intelectual e esperamos que os utilizadores façam o mesmo. Temos uma política de remoção para conteúdo que viole direitos de terceiros.

**Marcas Registadas:**
AIQuira e logos relacionados são marcas registadas. O uso não autorizado é estritamente proibido.`
  },
  {
    id: 'disclaimers',
    title: 'Isenções de Responsabilidade',
    icon: AlertTriangle,
    content: `**Natureza dos Serviços:**
A AIQuira é uma plataforma de intermediação. Não somos parte das transações entre compradores e vendedores, nem garantimos o sucesso de qualquer transação.

**Avaliações e Informações:**
• As avaliações AI são estimativas baseadas em algoritmos e dados disponíveis
• Não garantimos a precisão absoluta das avaliações
• Recomendamos due diligence independente para todas as transações
• Informações fornecidas por utilizadores podem não ser verificadas

**Disponibilidade do Serviço:**
• A plataforma é fornecida "como está" e "conforme disponível"
• Não garantimos operação ininterrupta ou livre de erros
• Manutenção e atualizações podem causar interrupções temporárias

**Riscos de Investimento:**
• Investimentos em ativos digitais envolvem riscos
• Valores podem flutuar e perdas são possíveis
• Não fornecemos aconselhamento de investimento
• Decisões de investimento são de sua inteira responsabilidade

**Limitação de Garantias:**
Na máxima extensão permitida por lei, renunciamos a todas as garantias, expressas ou implícitas, incluindo garantias de comercialização e adequação para fins específicos.`
  },
  {
    id: 'liability',
    title: 'Limitação de Responsabilidade',
    icon: Scale,
    content: `**Limitações Gerais:**
Na máxima extensão permitida por lei, a AIQuira não será responsável por:

• Danos indiretos, incidentais, especiais ou consequenciais
• Perda de lucros, receitas ou dados
• Interrupção de negócios ou perda de oportunidades
• Danos resultantes de uso ou incapacidade de usar a plataforma

**Valor Máximo:**
Em qualquer caso, a nossa responsabilidade total não excederá o valor das taxas pagas por si nos 12 meses anteriores ao evento que deu origem à reclamação.

**Ações de Terceiros:**
Não somos responsáveis por ações, omissões ou conteúdo de terceiros, incluindo outros utilizadores da plataforma.

**Jurisdições com Limitações:**
Algumas jurisdições não permitem limitações de responsabilidade. Nestas jurisdições, a nossa responsabilidade será limitada na máxima extensão permitida por lei.

**Indemnização:**
Concorda em indemnizar e isentar a AIQuira de qualquer reclamação, dano ou despesa resultante do seu uso da plataforma ou violação destes termos.`
  },
  {
    id: 'termination',
    title: 'Terminação',
    icon: XCircle,
    content: `**Terminação pelo Utilizador:**
Pode terminar a sua conta a qualquer momento através das configurações da conta ou contactando o nosso suporte.

**Terminação pela AIQuira:**
Podemos terminar ou suspender a sua conta imediatamente, sem aviso prévio, por:
• Violação destes termos de serviço
• Atividade fraudulenta ou ilegal
• Risco para outros utilizadores ou para a plataforma
• Inatividade prolongada da conta

**Efeitos da Terminação:**
Após a terminação:
• O acesso à plataforma será revogado
• Dados da conta podem ser eliminados conforme política de retenção
• Transações pendentes serão tratadas conforme apropriado
• Obrigações financeiras permanecem em vigor

**Sobrevivência:**
Certas disposições destes termos sobrevivem à terminação, incluindo:
• Limitações de responsabilidade
• Disposições de propriedade intelectual
• Obrigações de indemnização
• Disposições de resolução de disputas`
  },
  {
    id: 'governing-law',
    title: 'Lei Aplicável e Resolução de Disputas',
    icon: Building,
    content: `**Lei Aplicável:**
Estes termos são regidos pelas leis de Portugal, sem consideração aos princípios de conflito de leis.

**Jurisdição:**
Qualquer disputa relacionada com estes termos ou o uso da plataforma será submetida à jurisdição exclusiva dos tribunais portugueses.

**Resolução de Disputas:**
Encorajamos a resolução amigável de disputas através do nosso sistema de suporte. Para disputas que não possam ser resolvidas amigavelmente:

**Mediação:**
• Primeiro passo: Mediação através de centro de mediação reconhecido
• Processo confidencial e voluntário
• Custos partilhados entre as partes

**Arbitragem:**
• Se a mediação falhar, arbitragem vinculativa
• Tribunal arbitral conforme regulamento da Câmara de Comércio
• Decisão final e vinculativa

**Ações Coletivas:**
Renuncia ao direito de participar em ações coletivas contra a AIQuira, exceto onde tal renúncia seja proibida por lei.

**Limitação Temporal:**
Qualquer reclamação deve ser apresentada no prazo de um ano após o evento que deu origem à disputa.`
  }
];

export default function TermsPage() {
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
                <Scale className="w-4 h-4 mr-2" />
                Termos de Serviço
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Termos e Condições
                <span className="block text-gradient">de Utilização</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Estes termos regem o uso da plataforma AIQuira. 
                Por favor, leia atentamente antes de usar os nossos serviços.
              </p>
              <p className="text-sm text-slate-500 mt-4">
                Última atualização: 1 de Janeiro de 2025
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
                  Resumo dos Pontos Principais
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-800">
                  <div>
                    <h3 className="font-semibold mb-2">Seus Direitos:</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Usar a plataforma conforme os termos</li>
                      <li>• Proteção de dados pessoais</li>
                      <li>• Suporte ao cliente</li>
                      <li>• Resolução justa de disputas</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Suas Responsabilidades:</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Fornecer informações precisas</li>
                      <li>• Cumprir todas as leis aplicáveis</li>
                      <li>• Respeitar outros utilizadores</li>
                      <li>• Pagar taxas e comissões devidas</li>
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
                  Questões sobre os Termos?
                </h2>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  A nossa equipa legal está disponível para esclarecer qualquer 
                  dúvida sobre estes termos de serviço.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:legal@aiquira.com"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    legal@aiquira.com
                  </a>
                  <a 
                    href="tel:+351 900 000 000"
                    className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    +351 900 000 000
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