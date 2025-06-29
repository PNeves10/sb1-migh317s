'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Brain, Mail, Lock, User, Building, Eye, EyeOff, Github, Linkedin, 
  Shield, Zap, Users, CheckCircle, AlertCircle, Loader2, TrendingUp, 
  Search, Globe, Star, ArrowRight, Check, X
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

type UserType = 'buyer' | 'seller' | 'both';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: UserType | '';
  company: string;
  acceptTerms: boolean;
  acceptMarketing: boolean;
  acceptPrivacy: boolean;
  referralCode: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    company: '',
    acceptTerms: false,
    acceptMarketing: false,
    acceptPrivacy: false,
    referralCode: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [emailValid, setEmailValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showReferral, setShowReferral] = useState(false);
  
  const router = useRouter();
  const { register, isLoading: authLoading } = useAuth();

  // Password strength calculation
  useEffect(() => {
    const calculateStrength = () => {
      let strength = 0;
      if (formData.password.length >= 8) strength += 25;
      if (/[A-Z]/.test(formData.password)) strength += 25;
      if (/[0-9]/.test(formData.password)) strength += 25;
      if (/[^A-Za-z0-9]/.test(formData.password)) strength += 25;
      setPasswordStrength(strength);
    };
    calculateStrength();
  }, [formData.password]);

  // Email validation
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(formData.email));
  }, [formData.email]);

  // Name validation
  useEffect(() => {
    setNameValid(formData.name.trim().length >= 2);
  }, [formData.name]);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!nameValid) newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
      if (!emailValid) newErrors.email = 'Email inválido';
      if (!formData.userType) newErrors.userType = 'Selecione o tipo de utilizador';
    }

    if (step === 2) {
      if (passwordStrength < 50) newErrors.password = 'Password muito fraca';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords não coincidem';
      }
      if (!formData.acceptTerms) newErrors.terms = 'Deve aceitar os termos';
      if (!formData.acceptPrivacy) newErrors.privacy = 'Deve aceitar a política de privacidade';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(2)) return;

    setIsLoading(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        userType: formData.userType as UserType,
      });

      toast.success('Conta criada com sucesso!', {
        description: 'Bem-vindo à AIQuira! Redirecionando para o onboarding...',
        duration: 3000,
      });

      router.push('/onboarding');
    } catch (err) {
      toast.error('Erro ao criar conta', {
        description: 'Verifique os dados e tente novamente',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    toast.info(`Redirecionando para ${provider}...`, {
      description: 'Esta funcionalidade estará disponível em breve',
    });
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-red-500';
    if (passwordStrength < 50) return 'bg-orange-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Muito Fraca';
    if (passwordStrength < 50) return 'Fraca';
    if (passwordStrength < 75) return 'Boa';
    return 'Forte';
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Personal Information */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">Nome Completo *</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              id="name"
              type="text"
              placeholder="João Silva"
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
              className={`pl-10 h-12 ${errors.name ? 'border-red-500' : nameValid && formData.name ? 'border-green-500' : ''}`}
              required
            />
            {nameValid && formData.name && (
              <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
            )}
          </div>
          {errors.name && (
            <p className="text-sm text-red-600 flex items-center">
              <X className="h-3 w-3 mr-1" />
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              id="email"
              type="email"
              placeholder="joao@exemplo.com"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              className={`pl-10 h-12 ${errors.email ? 'border-red-500' : emailValid && formData.email ? 'border-green-500' : ''}`}
              required
            />
            {emailValid && formData.email && (
              <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
            )}
          </div>
          {errors.email && (
            <p className="text-sm text-red-600 flex items-center">
              <X className="h-3 w-3 mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company" className="text-sm font-medium">Empresa (Opcional)</Label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              id="company"
              type="text"
              placeholder="Nome da empresa"
              value={formData.company}
              onChange={(e) => updateFormData('company', e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>
      </div>

      {/* User Type Selection */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Tipo de Utilizador *</Label>
        <RadioGroup
          value={formData.userType}
          onValueChange={(value) => updateFormData('userType', value as UserType)}
          className="space-y-3"
        >
          <div className={`flex items-center space-x-3 p-4 border rounded-lg hover:bg-slate-50 transition-colors cursor-pointer ${
            formData.userType === 'buyer' ? 'border-blue-500 bg-blue-50' : 'border-slate-200'
          }`}>
            <RadioGroupItem value="buyer" id="buyer" />
            <Label htmlFor="buyer" className="flex items-center space-x-3 cursor-pointer flex-1">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Search className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium">Comprador</div>
                <div className="text-sm text-slate-500">Procuro adquirir ativos digitais</div>
              </div>
            </Label>
          </div>
          
          <div className={`flex items-center space-x-3 p-4 border rounded-lg hover:bg-slate-50 transition-colors cursor-pointer ${
            formData.userType === 'seller' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200'
          }`}>
            <RadioGroupItem value="seller" id="seller" />
            <Label htmlFor="seller" className="flex items-center space-x-3 cursor-pointer flex-1">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="font-medium">Vendedor</div>
                <div className="text-sm text-slate-500">Quero vender os meus ativos digitais</div>
              </div>
            </Label>
          </div>
          
          <div className={`flex items-center space-x-3 p-4 border rounded-lg hover:bg-slate-50 transition-colors cursor-pointer ${
            formData.userType === 'both' ? 'border-purple-500 bg-purple-50' : 'border-slate-200'
          }`}>
            <RadioGroupItem value="both" id="both" />
            <Label htmlFor="both" className="flex items-center space-x-3 cursor-pointer flex-1">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Globe className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="font-medium">Ambos</div>
                <div className="text-sm text-slate-500">Comprar e vender ativos digitais</div>
              </div>
            </Label>
          </div>
        </RadioGroup>
        {errors.userType && (
          <p className="text-sm text-red-600 flex items-center">
            <X className="h-3 w-3 mr-1" />
            {errors.userType}
          </p>
        )}
      </div>

      {/* Referral Code */}
      <div className="text-center">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowReferral(!showReferral)}
          className="text-blue-600 hover:text-blue-700"
        >
          <Star className="h-4 w-4 mr-2" />
          {showReferral ? 'Ocultar' : 'Tenho'} código de referência
        </Button>
      </div>

      <AnimatePresence>
        {showReferral && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <Label htmlFor="referralCode" className="text-sm font-medium">Código de Referência</Label>
            <Input
              id="referralCode"
              type="text"
              placeholder="REF123456"
              value={formData.referralCode}
              onChange={(e) => updateFormData('referralCode', e.target.value.toUpperCase())}
              className="h-12"
            />
            <p className="text-xs text-slate-500">
              Ganhe 10% de desconto na primeira transação
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Password Fields */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">Password *</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => updateFormData('password', e.target.value)}
              className={`pl-10 pr-12 h-12 ${errors.password ? 'border-red-500' : ''}`}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-slate-400" />
              ) : (
                <Eye className="h-4 w-4 text-slate-400" />
              )}
            </Button>
          </div>
          
          {/* Password Strength */}
          {formData.password && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Força da password:</span>
                <Badge variant="outline" className={`text-xs ${
                  passwordStrength < 50 ? 'border-red-200 text-red-700' : 
                  passwordStrength < 75 ? 'border-yellow-200 text-yellow-700' : 
                  'border-green-200 text-green-700'
                }`}>
                  {getPasswordStrengthText()}
                </Badge>
              </div>
              <Progress value={passwordStrength} className="h-2" />
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className={`flex items-center ${formData.password.length >= 8 ? 'text-green-600' : 'text-slate-400'}`}>
                  <Check className="h-3 w-3 mr-1" />
                  8+ caracteres
                </div>
                <div className={`flex items-center ${/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-slate-400'}`}>
                  <Check className="h-3 w-3 mr-1" />
                  Maiúscula
                </div>
                <div className={`flex items-center ${/[0-9]/.test(formData.password) ? 'text-green-600' : 'text-slate-400'}`}>
                  <Check className="h-3 w-3 mr-1" />
                  Número
                </div>
                <div className={`flex items-center ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-600' : 'text-slate-400'}`}>
                  <Check className="h-3 w-3 mr-1" />
                  Símbolo
                </div>
              </div>
            </div>
          )}
          
          {errors.password && (
            <p className="text-sm text-red-600 flex items-center">
              <X className="h-3 w-3 mr-1" />
              {errors.password}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirmar Password *</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => updateFormData('confirmPassword', e.target.value)}
              className={`pl-10 pr-12 h-12 ${
                errors.confirmPassword ? 'border-red-500' : 
                formData.confirmPassword && formData.password === formData.confirmPassword ? 'border-green-500' : ''
              }`}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-slate-400" />
              ) : (
                <Eye className="h-4 w-4 text-slate-400" />
              )}
            </Button>
            {formData.confirmPassword && formData.password === formData.confirmPassword && (
              <CheckCircle className="absolute right-12 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
            )}
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-600 flex items-center">
              <X className="h-3 w-3 mr-1" />
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={formData.acceptTerms}
              onCheckedChange={(checked) => updateFormData('acceptTerms', checked as boolean)}
              className="mt-1"
            />
            <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
              Aceito os{' '}
              <Link href="/terms" className="text-blue-600 hover:underline font-medium">
                Termos e Condições
              </Link>{' '}
              da AIQuira *
            </Label>
          </div>
          {errors.terms && (
            <p className="text-sm text-red-600 flex items-center ml-6">
              <X className="h-3 w-3 mr-1" />
              {errors.terms}
            </p>
          )}

          <div className="flex items-start space-x-3">
            <Checkbox
              id="privacy"
              checked={formData.acceptPrivacy}
              onCheckedChange={(checked) => updateFormData('acceptPrivacy', checked as boolean)}
              className="mt-1"
            />
            <Label htmlFor="privacy" className="text-sm leading-relaxed cursor-pointer">
              Aceito a{' '}
              <Link href="/privacy" className="text-blue-600 hover:underline font-medium">
                Política de Privacidade
              </Link>{' '}
              e tratamento de dados pessoais (RGPD) *
            </Label>
          </div>
          {errors.privacy && (
            <p className="text-sm text-red-600 flex items-center ml-6">
              <X className="h-3 w-3 mr-1" />
              {errors.privacy}
            </p>
          )}

          <div className="flex items-start space-x-3">
            <Checkbox
              id="marketing"
              checked={formData.acceptMarketing}
              onCheckedChange={(checked) => updateFormData('acceptMarketing', checked as boolean)}
              className="mt-1"
            />
            <Label htmlFor="marketing" className="text-sm leading-relaxed cursor-pointer">
              Aceito receber emails de marketing, novidades e ofertas especiais
            </Label>
          </div>
        </div>
      </div>

      {/* Benefits Preview */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
        <div className="text-sm font-medium text-blue-800 mb-3 flex items-center">
          <Star className="h-4 w-4 mr-2" />
          Benefícios da sua conta AIQuira:
        </div>
        <div className="grid grid-cols-1 gap-2 text-sm text-blue-700">
          <div className="flex items-center">
            <Check className="h-3 w-3 mr-2 text-blue-600" />
            Avaliações AI gratuitas ilimitadas
          </div>
          <div className="flex items-center">
            <Check className="h-3 w-3 mr-2 text-blue-600" />
            Acesso ao marketplace premium
          </div>
          <div className="flex items-center">
            <Check className="h-3 w-3 mr-2 text-blue-600" />
            Suporte prioritário 24/7
          </div>
          <div className="flex items-center">
            <Check className="h-3 w-3 mr-2 text-blue-600" />
            Relatórios detalhados de due diligence
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-100/20 via-transparent to-transparent"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>

      <div className="w-full max-w-lg relative z-10">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <Link href="/" className="inline-flex items-center space-x-3 group">
            <div className="relative">
              <Brain className="h-12 w-12 text-blue-600 group-hover:text-blue-700 transition-colors" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className="text-3xl font-bold text-gradient">AIQuira</span>
              <div className="text-xs text-slate-500 -mt-1">Digital M&A Platform</div>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-slate-200 shadow-xl backdrop-blur-sm bg-white/95">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                <Users className="h-6 w-6 text-blue-600" />
                Criar Conta AIQuira
              </CardTitle>
              <CardDescription className="text-base">
                Junte-se à maior plataforma de M&A digital
              </CardDescription>
              
              {/* Progress Indicator */}
              <div className="flex items-center justify-center space-x-2 mt-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  1
                </div>
                <div className={`w-12 h-1 rounded transition-colors ${
                  currentStep >= 2 ? 'bg-blue-600' : 'bg-slate-200'
                }`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  2
                </div>
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-2 px-4">
                <span>Informações</span>
                <span>Segurança</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Social Login - Only on Step 1 */}
              {currentStep === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => handleSocialLogin('Google')} 
                      className="w-full hover:bg-red-50 hover:border-red-200 transition-colors"
                      disabled={isLoading}
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Google
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleSocialLogin('LinkedIn')} 
                      className="w-full hover:bg-blue-50 hover:border-blue-200 transition-colors"
                      disabled={isLoading}
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground font-medium">
                        Ou registe-se com email
                      </span>
                    </div>
                  </div>
                </>
              )}

              {/* Form Steps */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && renderStep1()}
                  {currentStep === 2 && renderStep2()}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex space-x-3">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevious}
                      className="flex-1"
                      disabled={isLoading}
                    >
                      Anterior
                    </Button>
                  )}
                  
                  {currentStep < 2 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      disabled={isLoading}
                    >
                      Continuar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" 
                      disabled={isLoading || authLoading}
                    >
                      {isLoading || authLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          A criar conta...
                        </>
                      ) : (
                        <>
                          <Shield className="mr-2 h-4 w-4" />
                          Criar Conta
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>

              <div className="text-center text-sm">
                <span className="text-slate-600">Já tem conta? </span>
                <Link 
                  href="/login" 
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                >
                  Entrar agora
                </Link>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center space-x-2 text-xs text-slate-500 pt-2">
                <Shield className="h-3 w-3" />
                <span>Dados protegidos por encriptação SSL</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 grid grid-cols-3 gap-4 text-center"
        >
          <div className="text-xs text-slate-500">
            <div className="font-semibold text-slate-700">15K+</div>
            <div>Utilizadores</div>
          </div>
          <div className="text-xs text-slate-500">
            <div className="font-semibold text-slate-700">2.4B+</div>
            <div>Em transações</div>
          </div>
          <div className="text-xs text-slate-500">
            <div className="font-semibold text-slate-700">4.9★</div>
            <div>Avaliação</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}