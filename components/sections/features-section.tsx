'use client';

import { Brain, TrendingUp, Users, Shield, Zap, MessageSquare, Search, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Valuations',
    description: 'Get instant, accurate valuations using our proprietary AI algorithm that analyzes revenue, traffic, and market trends.',
    badge: 'Core Feature',
    color: 'text-blue-600 bg-blue-100',
  },
  {
    icon: Search,
    title: 'Smart Matchmaking',
    description: 'Our AI connects the right buyers with sellers based on preferences, budget, and asset compatibility.',
    badge: 'Popular',
    color: 'text-emerald-600 bg-emerald-100',
  },
  {
    icon: TrendingUp,
    title: 'Market Analytics',
    description: 'Access comprehensive market data, trends, and benchmarks to make informed investment decisions.',
    badge: 'Pro',
    color: 'text-indigo-600 bg-indigo-100',
  },
  {
    icon: Shield,
    title: 'Secure Escrow',
    description: 'Protected transactions with built-in escrow service and fraud detection for peace of mind.',
    badge: 'Security',
    color: 'text-red-600 bg-red-100',
  },
  {
    icon: MessageSquare,
    title: 'Direct Messaging',
    description: 'Built-in communication system to negotiate deals and share due diligence documents securely.',
    badge: 'Communication',
    color: 'text-purple-600 bg-purple-100',
  },
  {
    icon: FileText,
    title: 'Due Diligence Reports',
    description: 'Automated generation of comprehensive due diligence reports with financial and technical analysis.',
    badge: 'Automation',
    color: 'text-amber-600 bg-amber-100',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-4 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Platform Features
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Everything you need for
              <span className="block text-gradient">successful digital M&A</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our comprehensive platform combines AI intelligence with proven M&A processes 
              to deliver the best experience for both buyers and sellers.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full card-hover border-slate-200 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${feature.color}`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}