'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Mail, Lock, Github, Linkedin, Eye, EyeOff, Shield, Zap, Users, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeLeft, setBlockTimeLeft] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showDemo, setShowDemo] = useState(false);
  const { login, isLoading: authLoading } = useAuth();
  const router = useRouter();

  // Password strength calculation
  useEffect(() => {
    const calculateStrength = () => {
      let strength = 0;
      if (password.length >= 8) strength += 25;
      if (/[A-Z]/.test(password)) strength += 25;
      if (/[0-9]/.test(password)) strength += 25;
      if (/[^A-Za-z0-9]/.test(password)) strength += 25;
      setPasswordStrength(strength);
    };
    calculateStrength();
  }, [password]);

  // Block timer
  useEffect(() => {
    if (isBlocked && blockTimeLeft > 0) {
      const timer = setTimeout(() => {
        setBlockTimeLeft(blockTimeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (blockTimeLeft === 0) {
      setIsBlocked(false);
      setLoginAttempts(0);
    }
  }, [isBlocked, blockTimeLeft]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBlocked) {
      toast.error(`Conta temporariamente bloqueada. Tente novamente em ${blockTimeLeft} segundos.`);
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      
      // Save remember me preference
      if (rememberMe) {
        localStorage.setItem('aiquira_remember_email', email);
      } else {
        localStorage.removeItem('aiquira_remember_email');
      }
      
      toast.success('Login realizado com sucesso!', {
        description: 'Bem-vindo de volta à AIQuira',
        duration: 3000,
      });
      
      // Reset attempts on successful login
      setLoginAttempts(0);
      router.push('/dashboard');
    } catch (err) {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        setIsBlocked(true);
        setBlockTimeLeft(60); // 1 minute block
        setError('Muitas tentativas falhadas. Conta bloqueada temporariamente.');
        toast.error('Conta bloqueada por 1 minuto devido a múltiplas tentativas falhadas.');
      } else {
        setError(`Email ou password incorretos. Tentativa ${newAttempts}/3`);
        toast.error(`Credenciais inválidas. ${3 - newAttempts} tentativas restantes.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (userType: 'buyer' | 'seller' | 'admin') => {
    const credentials = {
      buyer: { email: 'demo@buyer.com', password: 'demo123' },
      seller: { email: 'demo@seller.com', password: 'demo123' },
      admin: { email: 'admin@aiquira.com', password: 'demo123' }
    };

    setIsLoading(true);
    try {
      await login(credentials[userType].email, credentials[userType].password);
      toast.success(`Logado como demo ${userType}!`, {
        description: 'Explore todas as funcionalidades da plataforma',
      });
      router.push(userType === 'admin' ? '/dashboard' : '/dashboard');
    } catch (err) {
      toast.error('Falha no login demo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    toast.info(`Redirecionando para ${provider}...`, {
      description: 'Esta funcionalidade estará disponível em breve',
    });
  };

  // Load remembered email
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('aiquira_remember_email');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-red-500';
    if (passwordStrength < 50) return 'bg-orange-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Fraca';
    if (passwordStrength < 50) return 'Média';
    if (passwordStrength < 75) return 'Boa';
    return 'Forte';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-100/20 via-transparent to-transparent"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>

      <div className="w-full max-w-md relative z-10">
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
                <Shield className="h-6 w-6 text-blue-600" />
                Entrar na AIQuira
              </CardTitle>
              <CardDescription className="text-base">
                Acesse sua conta para gerenciar ativos digitais
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Error Alert */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert variant="destructive" className="border-red-200 bg-red-50">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="font-medium">{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Block Timer */}
              <AnimatePresence>
                {isBlocked && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center"
                  >
                    <div className="text-amber-800 font-medium mb-2">
                      Conta temporariamente bloqueada
                    </div>
                    <div className="text-2xl font-bold text-amber-600 mb-2">
                      {Math.floor(blockTimeLeft / 60)}:{(blockTimeLeft % 60).toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm text-amber-700">
                      Tente novamente após o tempo expirar
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Demo Access Toggle */}
              <div className="text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDemo(!showDemo)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  {showDemo ? 'Ocultar' : 'Mostrar'} Acesso Demo
                </Button>
              </div>

              {/* Demo Login Buttons */}
              <AnimatePresence>
                {showDemo && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="text-sm font-medium text-blue-800 mb-3 flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Acesso Rápido Demo:
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDemoLogin('buyer')}
                          disabled={isLoading || isBlocked}
                          className="justify-start"
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          Demo Comprador
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDemoLogin('seller')}
                          disabled={isLoading || isBlocked}
                          className="justify-start"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          Demo Vendedor
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDemoLogin('admin')}
                          disabled={isLoading || isBlocked}
                          className="justify-start"
                        >
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                          Demo Admin
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Separator />

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => handleSocialLogin('Google')} 
                  className="w-full hover:bg-red-50 hover:border-red-200 transition-colors"
                  disabled={isLoading || isBlocked}
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
                  disabled={isLoading || isBlocked}
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
                    Ou continue com email
                  </span>
                </div>
              </div>

              {/* Email Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                      disabled={isLoading || isBlocked}
                    />
                    {email && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-12 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                      disabled={isLoading || isBlocked}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading || isBlocked}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-slate-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-400" />
                      )}
                    </Button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {password && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-2"
                    >
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
                      <Progress 
                        value={passwordStrength} 
                        className="h-1"
                      />
                    </motion.div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      disabled={isLoading || isBlocked}
                    />
                    <Label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer">
                      Lembrar-me
                    </Label>
                  </div>
                  <Link 
                    href="/auth/forgot-password" 
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                  >
                    Esqueceu a password?
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium" 
                  disabled={isLoading || authLoading || isBlocked}
                >
                  {isLoading || authLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      A entrar...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Entrar na Plataforma
                    </>
                  )}
                </Button>
              </form>

              {/* Login Attempts Indicator */}
              {loginAttempts > 0 && !isBlocked && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center"
                >
                  <div className="text-sm text-amber-700">
                    Tentativas: {loginAttempts}/3
                  </div>
                  <Progress value={(loginAttempts / 3) * 100} className="h-1 mt-2" />
                </motion.div>
              )}

              <div className="text-center text-sm">
                <span className="text-slate-600">Não tem conta? </span>
                <Link 
                  href="/register" 
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                >
                  Criar conta gratuita
                </Link>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center space-x-2 text-xs text-slate-500 pt-2">
                <Shield className="h-3 w-3" />
                <span>Protegido por encriptação SSL</span>
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
            <div className="font-semibold text-slate-700">2.4B+</div>
            <div>Em transações</div>
          </div>
          <div className="text-xs text-slate-500">
            <div className="font-semibold text-slate-700">15K+</div>
            <div>Utilizadores</div>
          </div>
          <div className="text-xs text-slate-500">
            <div className="font-semibold text-slate-700">99.9%</div>
            <div>Uptime</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}