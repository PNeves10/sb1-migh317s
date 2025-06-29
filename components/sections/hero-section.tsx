'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Search, TrendingUp, Shield, Zap, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export function HeroSection() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Badge variant="outline" className="px-4 py-2 text-sm bg-white/50 backdrop-blur-sm border-blue-200">
              <Zap className="w-4 h-4 mr-2 text-blue-600" />
              Plataforma M&A digital com base em IA
            </Badge>
          </motion.div>

          {/* Headlines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              O Futuro do 
              <span className="block text-gradient">M&A digital</span>
              <span className="block text-slate-600 text-3xl md:text-4xl lg:text-5xl mt-2">
                com Inteligência Artificial
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            A primeira plataforma do mundo potenciada por IA para M&A digitais.
            Obtenha valuations instantâneas, matchmaking inteligente e transações sem complicações para websites,
            produtos SaaS e negócios digitais.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Pesquisa de activos digitais... (por exemplo, SaaS, e-commerce, domínios)"
                  className="pl-12 py-6 text-lg border-slate-200 bg-white/80 backdrop-blur-sm"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              <Button size="lg" className="px-8 py-6 text-lg gradient-primary hover:opacity-90 transition-opacity">
                Explorar Activos
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button asChild size="lg" className="px-8 py-6 text-lg gradient-primary hover:opacity-90 transition-opacity">
              <Link href="/register">
                Começar a Vender Ativos
                <TrendingUp className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white/90">
              <Link href="/demo">
                Ver Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-700 mb-2">Transacções Seguras</h3>
              <p className="text-slate-500 text-sm">Encriptação de End-to-End e Proteção de Escrow</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mx-auto mb-4">
                <Zap className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-700 mb-2">Avaliações com IA</h3>
              <p className="text-slate-500 text-sm">Obtenha Avaliações de Activos Instantâneas e Precisas</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mx-auto mb-4">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-slate-700 mb-2">Matchmaking Inteligente</h3>
              <p className="text-slate-500 text-sm">Conecte-se com os Compradores e Vendedores Certos</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}