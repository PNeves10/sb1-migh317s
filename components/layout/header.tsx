'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Brain, Menu, Search, Bell, Settings, LogOut, User, DollarSign, MessageSquare, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200",
        isScrolled && "shadow-sm"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <Brain className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
          <span className="text-xl font-bold text-gradient">AIQuira</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {isAuthenticated ? (
            <>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">Platform</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-6 w-[400px]">
                        <div className="grid grid-cols-2 gap-4">
                          <Link href="/dashboard" className="block p-3 rounded-lg hover:bg-muted transition-colors">
                            <TrendingUp className="h-5 w-5 mb-2 text-blue-600" />
                            <div className="font-medium">Dashboard</div>
                            <div className="text-sm text-muted-foreground">View your analytics</div>
                          </Link>
                          <Link href="/marketplace" className="block p-3 rounded-lg hover:bg-muted transition-colors">
                            <Search className="h-5 w-5 mb-2 text-emerald-600" />
                            <div className="font-medium">Marketplace</div>
                            <div className="text-sm text-muted-foreground">Browse assets</div>
                          </Link>
                          <Link href="/valuation" className="block p-3 rounded-lg hover:bg-muted transition-colors">
                            <DollarSign className="h-5 w-5 mb-2 text-amber-600" />
                            <div className="font-medium">AI Valuation</div>
                            <div className="text-sm text-muted-foreground">Get asset value</div>
                          </Link>
                          <Link href="/messages" className="block p-3 rounded-lg hover:bg-muted transition-colors">
                            <MessageSquare className="h-5 w-5 mb-2 text-purple-600" />
                            <div className="font-medium">Messages</div>
                            <div className="text-sm text-muted-foreground">Chat with users</div>
                          </Link>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              
              <Link href="/how-to-use" className="text-sm font-medium hover:text-blue-600 transition-colors">
                How to use
              </Link>
              <Link href="/valuation" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Valuation
              </Link>
              <Link href="/blog" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Resources
              </Link>
            </>
          ) : (
            <>
              <Link href="/marketplace" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Marketplace
              </Link>
              <Link href="/how-to-use" className="text-sm font-medium hover:text-blue-600 transition-colors">
                How to use
              </Link>
              <Link href="/blog" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Resources
              </Link>
              <Link href="/pricing" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Pricing
              </Link>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-500">3</Badge>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {user?.verified && (
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full border-2 border-background flex items-center justify-center">
                        <div className="h-2 w-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild className="hidden sm:inline-flex">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-6">
                <Link href="/marketplace" className="text-lg font-medium hover:text-blue-600 transition-colors">
                  Marketplace
                </Link>
                <Link href="/valuation" className="text-lg font-medium hover:text-blue-600 transition-colors">
                  AI Valuation
                </Link>
                <Link href="/how-it-works" className="text-lg font-medium hover:text-blue-600 transition-colors">
                  How it Works
                </Link>
                <Link href="/blog" className="text-lg font-medium hover:text-blue-600 transition-colors">
                  Resources
                </Link>
                {!isAuthenticated && (
                  <>
                    <div className="border-t pt-4 mt-4">
                      <Button asChild className="w-full mb-2">
                        <Link href="/register">Get Started</Link>
                      </Button>
                      <Button variant="outline" asChild className="w-full">
                        <Link href="/login">Sign In</Link>
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}