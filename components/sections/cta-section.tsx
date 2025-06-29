'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Users } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-400/20 via-transparent to-transparent"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Pronto para transformar a sua
              <span className="block">estratégia de ativos digitais?</span>
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Junte-se a milhares de empreendedores de sucesso que confiam na AIQuira
              para as suas necessidades de M&A digital. Comece hoje mesmo com a nossa plataforma potenciada por IA.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button asChild size="lg" className="px-8 py-6 text-lg bg-white text-blue-600 hover:bg-blue-50 transition-colors">
              <Link href="/register">
                <TrendingUp className="mr-2 w-5 h-5" />
                Comece a vender agora
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg border-white/30 text-blue-600 hover:bg-white/10 transition-colors">
              <Link href="/marketplace">
                <Users className="mr-2 w-5 h-5" />
                Explorar Marketplace
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-200 mb-2">Grátis</div>
              <div className="text-blue-100">para começar</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-200 mb-2">24/7</div>
              <div className="text-blue-100">suporte disponível</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-200 mb-2">5 estrelas</div>
              <div className="text-blue-100">classificação dos clientes</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}