'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Brain, Menu, Home, Search, TrendingUp, MessageSquare, Settings, 
  HelpCircle, LogOut, Bell, DollarSign, Users, BarChart3, Shield,
  Plus, Star, Bookmark, FileText, Zap
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const isAdmin = user?.email === 'admin@aiquira.com';

  const navigation = isAdmin ? [
    { name: 'Visão Geral', href: '/dashboard', icon: Home },
    { name: 'Utilizadores', href: '/admin/users', icon: Users },
    { name: 'Ativos', href: '/admin/assets', icon: TrendingUp },
    { name: 'Transações', href: '/admin/transactions', icon: DollarSign },
    { name: 'Análises', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Deteção de Fraude', href: '/admin/fraud', icon: Shield },
    { name: 'Definições', href: '/admin/settings', icon: Settings },
  ] : [
    { name: 'Painel', href: '/dashboard', icon: Home },
    { name: 'Mercado', href: '/marketplace', icon: Search },
    { name: 'Meus Ativos', href: '/dashboard/assets', icon: TrendingUp },
    { name: 'Favoritos', href: '/dashboard/favorites', icon: Bookmark },
    { name: 'Mensagens', href: '/messages', icon: MessageSquare },
    { name: 'Avaliação', href: '/valuation', icon: DollarSign },
    { name: 'Relatórios', href: '/dashboard/reports', icon: FileText },
    { name: 'Definições', href: '/settings', icon: Settings },
  ];

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between p-6 border-b">
        <Link href="/" className="flex items-center space-x-2">
          <Brain className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gradient">AIQuira</span>
        </Link>
        {mobile && (
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* User Info */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3 mb-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">{user?.name}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Badge variant={user?.verified ? 'default' : 'secondary'} className="text-xs">
            {user?.verified ? 'Verificado' : 'Não verificado'}
          </Badge>
          {user?.rating && (
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="text-xs text-slate-600">{user.rating}</span>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      {!isAdmin && (
        <div className="p-6 border-b">
          <div className="space-y-2">
            <Button asChild size="sm" className="w-full justify-start">
              <Link href="/dashboard/new-asset">
                <Plus className="h-4 w-4 mr-2" />
                Listar Novo Ativo
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="w-full justify-start">
              <Link href="/valuation">
                <Zap className="h-4 w-4 mr-2" />
                Avaliação IA
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-6">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link href={item.href}>
                  <span className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}>
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="p-6 border-t space-y-2">
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <HelpCircle className="h-4 w-4 mr-2" />
          Centro de Ajuda
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Terminar Sessão
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-72 lg:overflow-y-auto lg:bg-white lg:border-r lg:border-slate-200">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-72">
          <Sidebar mobile />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Top Bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-500">3</Badge>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}