'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { motion } from 'framer-motion';
import {
  Cookie, Settings, Shield, BarChart3, Target, Globe,
  CheckCircle, XCircle, Info, AlertTriangle, Save, RefreshCw
} from 'lucide-react';

const cookieCategories = [
  {
    id: 'essential',
    name: 'Cookies Essenciais',
    description: 'Necessários para o funcionamento básico da plataforma',
    icon: Shield,
    required: true,
    enabled: true,
    color: 'text-green-600 bg-green-100',
    cookies: [
      {
        name: 'aiquira_session',
        purpose: 'Manter a sessão do utilizador ativa',
        duration: 'Sessão',
        type: 'HTTP Cookie'
      },
      {
        name: 'aiquira_auth',
        purpose: 'Autenticação e segurança da conta',
        duration: '30 dias',
        type: 'HTTP Cookie'
      },
      {
        name: 'csrf_token',
        purpose: 'Proteção contra ataques CSRF',
        duration: 'Sessão',
        type: 'HTTP Cookie'
      },
      {
        name: 'cookie_consent',
        purpose: 'Armazenar preferências de cookies',
        duration: '1 ano',
        type: 'Local Storage'
      }
    ]
  },
  {
    id: 'functional',
    name: 'Cookies Funcionais',
    description: 'Melhoram a funcionalidade e personalização',
    icon: Settings,
    required: false,
    enabled: true,
    color: 'text-blue-600 bg-blue-100',
    cookies: [
      {
        name: 'user_preferences',
        purpose: 'Guardar preferências de interface',
        duration: '6 meses',
        type: 'Local Storage'
      },
      {
        name: 'language_setting',
        purpose: 'Lembrar idioma selecionado',
        duration: '1 ano',
        type: 'HTTP Cookie'
      },
      {
        name: 'theme_preference',
        purpose: 'Tema claro/escuro selecionado',
        duration: '1 ano',
        type: 'Local Storage'
      },
      {
        name: 'dashboard_layout',
        purpose: 'Layout personalizado do dashboard',
        duration: '3 meses',
        type: 'Local Storage'
      }
    ]
  },
  {
    id: 'analytics',
    name: 'Cookies de Analytics',
    description: 'Ajudam-nos a entender como usa a plataforma',
    icon: BarChart3,
    required: false,
    enabled: false,
    color: 'text-purple-600 bg-purple-100',
    cookies: [
      {
        name: '_ga',
        purpose: 'Google Analytics - identificador único',
        duration: '2 anos',
        type: 'HTTP Cookie'
      },
      {
        name: '_ga_*',
        purpose: 'Google Analytics - dados de sessão',
        duration: '2 anos',
        type: 'HTTP Cookie'
      },
      {
        name: 'aiquira_analytics',
        purpose: 'Analytics interno da plataforma',
        duration: '1 ano',
        type: 'HTTP Cookie'
      },
      {
        name: 'page_views',
        purpose: 'Contagem de visualizações de página',
        duration: '30 dias',
        type: 'Local Storage'
      }
    ]
  },
  {
    id: 'marketing',
    name: 'Cookies de Marketing',
    description: 'Personalizam anúncios e conteúdo',
    icon: Target,
    required: false,
    enabled: false,
    color: 'text-orange-600 bg-orange-100',
    cookies: [
      {
        name: '_fbp',
        purpose: 'Facebook Pixel - tracking',
        duration: '3 meses',
        type: 'HTTP Cookie'
      },
      {
        name: 'linkedin_insight',
        purpose: 'LinkedIn Insight Tag',
        duration: '2 anos',
        type: 'HTTP Cookie'
      },
      {
        name: 'google_ads',
        purpose: 'Google Ads - remarketing',
        duration: '1 ano',
        type: 'HTTP Cookie'
      },
      {
        name: 'utm_tracking',
        purpose: 'Rastreamento de campanhas',
        duration: '30 dias',
        type: 'Local Storage'
      }
    ]
  }
];

export default function CookiesPage() {
  const [cookieSettings, setCookieSettings] = useState(
    cookieCategories.reduce((acc, category) => {
      acc[category.id] = category.enabled;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const handleCategoryToggle = (categoryId: string, enabled: boolean) => {
    setCookieSettings(prev => ({
      ...prev,
      [categoryId]: enabled
    }));
  };

  const saveSettings = () => {
    // Save to localStorage or send to server
    localStorage.setItem('aiquira_cookie_preferences', JSON.stringify(cookieSettings));
    
    // Show success message
    const event = new CustomEvent('cookieSettingsUpdated', { detail: cookieSettings });
    window.dispatchEvent(event);
  };

  const acceptAll = () => {
    const allEnabled = cookieCategories.reduce((acc, category) => {
      acc[category.id] = true;
      return acc;
    }, {} as Record<string, boolean>);
    
    setCookieSettings(allEnabled);
    localStorage.setItem('aiquira_cookie_preferences', JSON.stringify(allEnabled));
  };

  const rejectAll = () => {
    const essentialOnly = cookieCategories.reduce((acc, category) => {
      acc[category.id] = category.required;
      return acc;
    }, {} as Record<string, boolean>);
    
    setCookieSettings(essentialOnly);
    localStorage.setItem('aiquira_cookie_preferences', JSON.stringify(essentialOnly));
  };

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
                <Cookie className="w-4 h-4 mr-2" />
                Política de Cookies
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Gestão de
                <span className="block text-gradient">Cookies</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Controle como usamos cookies e tecnologias similares para 
                melhorar a sua experiência na plataforma AIQuira.
              </p>
            </motion.div>
          </div>

          {/* What are Cookies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Info className="w-6 h-6 text-blue-600" />
                  </div>
                  O que são Cookies?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Cookies são pequenos ficheiros de texto que são armazenados no seu dispositivo 
                  quando visita um website. Eles ajudam-nos a fornecer uma melhor experiência, 
                  lembrar as suas preferências e entender como usa a nossa plataforma.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Usamos diferentes tipos de cookies para diferentes propósitos. Pode controlar 
                  quais cookies aceita através das configurações abaixo.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Cookie Settings */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Configurações de Cookies
              </h2>
              <div className="flex gap-3">
                <Button variant="outline" onClick={rejectAll}>
                  Rejeitar Opcionais
                </Button>
                <Button onClick={acceptAll}>
                  Aceitar Todos
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {cookieCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${category.color}`}>
                            <category.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{category.name}</CardTitle>
                            <CardDescription>{category.description}</CardDescription>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {category.required && (
                            <Badge variant="secondary">Obrigatório</Badge>
                          )}
                          <Switch
                            checked={cookieSettings[category.id]}
                            onCheckedChange={(checked) => handleCategoryToggle(category.id, checked)}
                            disabled={category.required}
                          />
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-slate-900">
                              {category.cookies.length}
                            </div>
                            <div className="text-sm text-slate-600">Cookies</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-slate-900">
                              {category.required ? (
                                <CheckCircle className="w-8 h-8 text-green-500 mx-auto" />
                              ) : cookieSettings[category.id] ? (
                                <CheckCircle className="w-8 h-8 text-green-500 mx-auto" />
                              ) : (
                                <XCircle className="w-8 h-8 text-red-500 mx-auto" />
                              )}
                            </div>
                            <div className="text-sm text-slate-600">
                              {category.required ? 'Sempre Ativo' : cookieSettings[category.id] ? 'Ativo' : 'Inativo'}
                            </div>
                          </div>
                        </div>

                        {/* Cookie Details */}
                        <details className="group">
                          <summary className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700">
                            Ver detalhes dos cookies
                          </summary>
                          <div className="mt-4 space-y-3">
                            {category.cookies.map((cookie, idx) => (
                              <div key={idx} className="p-3 bg-slate-50 rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm">
                                  <div>
                                    <span className="font-medium text-slate-900">Nome:</span>
                                    <div className="text-slate-600">{cookie.name}</div>
                                  </div>
                                  <div>
                                    <span className="font-medium text-slate-900">Duração:</span>
                                    <div className="text-slate-600">{cookie.duration}</div>
                                  </div>
                                  <div>
                                    <span className="font-medium text-slate-900">Tipo:</span>
                                    <div className="text-slate-600">{cookie.type}</div>
                                  </div>
                                  <div>
                                    <span className="font-medium text-slate-900">Propósito:</span>
                                    <div className="text-slate-600">{cookie.purpose}</div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </details>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Save Settings */}
            <div className="flex justify-center mt-8">
              <Button onClick={saveSettings} size="lg" className="px-8">
                <Save className="w-5 h-5 mr-2" />
                Guardar Preferências
              </Button>
            </div>
          </div>

          {/* Browser Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Globe className="w-6 h-6 text-amber-600" />
                  </div>
                  Configurações do Navegador
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Também pode gerir cookies diretamente nas configurações do seu navegador. 
                  Aqui estão as instruções para os navegadores mais populares:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900">Chrome</h3>
                    <ol className="text-sm text-slate-600 space-y-1 list-decimal list-inside">
                      <li>Clique nos três pontos no canto superior direito</li>
                      <li>Selecione "Configurações"</li>
                      <li>Clique em "Privacidade e segurança"</li>
                      <li>Selecione "Cookies e outros dados de sites"</li>
                    </ol>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900">Firefox</h3>
                    <ol className="text-sm text-slate-600 space-y-1 list-decimal list-inside">
                      <li>Clique no menu (três linhas)</li>
                      <li>Selecione "Configurações"</li>
                      <li>Clique em "Privacidade e Segurança"</li>
                      <li>Encontre a secção "Cookies e Dados de Sites"</li>
                    </ol>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900">Safari</h3>
                    <ol className="text-sm text-slate-600 space-y-1 list-decimal list-inside">
                      <li>Clique em "Safari" na barra de menu</li>
                      <li>Selecione "Preferências"</li>
                      <li>Clique no separador "Privacidade"</li>
                      <li>Gerir configurações de cookies</li>
                    </ol>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900">Edge</h3>
                    <ol className="text-sm text-slate-600 space-y-1 list-decimal list-inside">
                      <li>Clique nos três pontos no canto superior direito</li>
                      <li>Selecione "Configurações"</li>
                      <li>Clique em "Privacidade, pesquisa e serviços"</li>
                      <li>Encontre "Cookies e permissões de site"</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">
                  Questões sobre Cookies?
                </h2>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  Se tiver dúvidas sobre como usamos cookies ou quiser mais informações 
                  sobre as nossas práticas de privacidade, não hesite em contactar-nos.
                </p>
                <Button asChild className="bg-white text-blue-600 hover:bg-blue-50">
                  <a href="mailto:privacy@aiquira.com">
                    Contactar Equipa de Privacidade
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}