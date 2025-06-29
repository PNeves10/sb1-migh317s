'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
  User, Mail, Phone, MapPin, Building, Globe, Camera, Save,
  Shield, Bell, Eye, Lock, CreditCard, Download, Upload,
  Star, TrendingUp, DollarSign, Users, Calendar, Settings,
  CheckCircle, AlertTriangle, Edit, Trash2
} from 'lucide-react';

export default function ProfilePage() {
  const { user, isAuthenticated, updateUser } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    company: '',
    website: '',
    bio: '',
    avatar: '',
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    weeklyDigest: true,
    language: 'pt',
    currency: 'EUR',
    timezone: 'Europe/Lisbon',
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    showStats: true,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: '',
        location: '',
        company: '',
        website: '',
        bio: '',
        avatar: user.avatar || '',
      });
    }
  }, [isAuthenticated, user, router]);

  const handleProfileUpdate = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateUser({
        name: profileData.name,
        avatar: profileData.avatar,
      });
      
      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar perfil');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = () => {
    // Simulate avatar upload
    const avatars = [
      'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150',
      'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
    ];
    
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    setProfileData(prev => ({ ...prev, avatar: randomAvatar }));
    toast.success('Avatar atualizado!');
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Meu Perfil</h1>
            <p className="text-slate-600">Gerir as suas informações pessoais e preferências</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Profile Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="relative inline-block mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profileData.avatar} alt={profileData.name} />
                      <AvatarFallback className="text-2xl">{profileData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                      onClick={handleAvatarUpload}
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <h3 className="font-semibold text-lg text-slate-900 mb-1">{profileData.name}</h3>
                  <p className="text-slate-600 text-sm mb-3">{profileData.email}</p>
                  
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Badge variant={user.verified ? 'default' : 'secondary'}>
                      {user.verified ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verificado
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Não Verificado
                        </>
                      )}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Tipo:</span>
                      <Badge variant="outline">{user.userType}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Avaliação:</span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{user.rating || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Membro desde:</span>
                      <span>{new Date(user.joinedAt).getFullYear()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Estatísticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Ativos Vendidos</span>
                    </div>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Volume Total</span>
                    </div>
                    <span className="font-semibold">€254K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Conexões</span>
                    </div>
                    <span className="font-semibold">47</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="profile">Perfil</TabsTrigger>
                  <TabsTrigger value="preferences">Preferências</TabsTrigger>
                  <TabsTrigger value="privacy">Privacidade</TabsTrigger>
                  <TabsTrigger value="security">Segurança</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Informações Pessoais</CardTitle>
                      <CardDescription>
                        Atualize as suas informações pessoais e de contacto
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome Completo</Label>
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefone</Label>
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="+351 912 345 678"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Localização</Label>
                          <Input
                            id="location"
                            value={profileData.location}
                            onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                            placeholder="Lisboa, Portugal"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Empresa</Label>
                          <Input
                            id="company"
                            value={profileData.company}
                            onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                            placeholder="Nome da empresa"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            value={profileData.website}
                            onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                            placeholder="https://exemplo.com"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Biografia</Label>
                        <Textarea
                          id="bio"
                          value={profileData.bio}
                          onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                          placeholder="Conte-nos um pouco sobre si..."
                          rows={4}
                        />
                      </div>

                      <Button onClick={handleProfileUpdate} disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            A guardar...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Guardar Alterações
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preferences" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notificações</CardTitle>
                      <CardDescription>
                        Configure como quer receber notificações
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Notificações por Email</Label>
                          <p className="text-sm text-slate-600">Receber notificações importantes por email</p>
                        </div>
                        <Switch
                          checked={preferences.emailNotifications}
                          onCheckedChange={(checked) => 
                            setPreferences(prev => ({ ...prev, emailNotifications: checked }))
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Notificações Push</Label>
                          <p className="text-sm text-slate-600">Receber notificações no browser</p>
                        </div>
                        <Switch
                          checked={preferences.pushNotifications}
                          onCheckedChange={(checked) => 
                            setPreferences(prev => ({ ...prev, pushNotifications: checked }))
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Emails de Marketing</Label>
                          <p className="text-sm text-slate-600">Receber ofertas e novidades</p>
                        </div>
                        <Switch
                          checked={preferences.marketingEmails}
                          onCheckedChange={(checked) => 
                            setPreferences(prev => ({ ...prev, marketingEmails: checked }))
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Resumo Semanal</Label>
                          <p className="text-sm text-slate-600">Receber resumo semanal de atividade</p>
                        </div>
                        <Switch
                          checked={preferences.weeklyDigest}
                          onCheckedChange={(checked) => 
                            setPreferences(prev => ({ ...prev, weeklyDigest: checked }))
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Preferências Regionais</CardTitle>
                      <CardDescription>
                        Configure idioma, moeda e fuso horário
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Idioma</Label>
                          <Select value={preferences.language} onValueChange={(value) => 
                            setPreferences(prev => ({ ...prev, language: value }))
                          }>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pt">Português</SelectItem>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Español</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Moeda</Label>
                          <Select value={preferences.currency} onValueChange={(value) => 
                            setPreferences(prev => ({ ...prev, currency: value }))
                          }>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="EUR">EUR (€)</SelectItem>
                              <SelectItem value="USD">USD ($)</SelectItem>
                              <SelectItem value="GBP">GBP (£)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Fuso Horário</Label>
                          <Select value={preferences.timezone} onValueChange={(value) => 
                            setPreferences(prev => ({ ...prev, timezone: value }))
                          }>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Europe/Lisbon">Lisboa</SelectItem>
                              <SelectItem value="Europe/Madrid">Madrid</SelectItem>
                              <SelectItem value="Europe/London">Londres</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="privacy" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Visibilidade do Perfil</CardTitle>
                      <CardDescription>
                        Controle quem pode ver as suas informações
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Visibilidade do Perfil</Label>
                        <Select value={privacy.profileVisibility} onValueChange={(value) => 
                          setPrivacy(prev => ({ ...prev, profileVisibility: value }))
                        }>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Público</SelectItem>
                            <SelectItem value="verified">Apenas utilizadores verificados</SelectItem>
                            <SelectItem value="private">Privado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Mostrar Email</Label>
                          <p className="text-sm text-slate-600">Permitir que outros vejam o seu email</p>
                        </div>
                        <Switch
                          checked={privacy.showEmail}
                          onCheckedChange={(checked) => 
                            setPrivacy(prev => ({ ...prev, showEmail: checked }))
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Mostrar Telefone</Label>
                          <p className="text-sm text-slate-600">Permitir que outros vejam o seu telefone</p>
                        </div>
                        <Switch
                          checked={privacy.showPhone}
                          onCheckedChange={(checked) => 
                            setPrivacy(prev => ({ ...prev, showPhone: checked }))
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Mostrar Estatísticas</Label>
                          <p className="text-sm text-slate-600">Mostrar estatísticas de vendas no perfil</p>
                        </div>
                        <Switch
                          checked={privacy.showStats}
                          onCheckedChange={(checked) => 
                            setPrivacy(prev => ({ ...prev, showStats: checked }))
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Segurança da Conta</CardTitle>
                      <CardDescription>
                        Gerir a segurança e autenticação da sua conta
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Alterar Password</h4>
                          <p className="text-sm text-slate-600">Última alteração há 3 meses</p>
                        </div>
                        <Button variant="outline">
                          <Lock className="h-4 w-4 mr-2" />
                          Alterar
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Autenticação de Dois Fatores</h4>
                          <p className="text-sm text-slate-600">Adicione uma camada extra de segurança</p>
                        </div>
                        <Button variant="outline">
                          <Shield className="h-4 w-4 mr-2" />
                          Configurar
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Sessões Ativas</h4>
                          <p className="text-sm text-slate-600">Gerir dispositivos conectados</p>
                        </div>
                        <Button variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Sessões
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Exportar Dados</h4>
                          <p className="text-sm text-slate-600">Baixar uma cópia dos seus dados</p>
                        </div>
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Exportar
                        </Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                        <div>
                          <h4 className="font-medium text-red-900">Eliminar Conta</h4>
                          <p className="text-sm text-red-700">Esta ação é permanente e irreversível</p>
                        </div>
                        <Button variant="destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}