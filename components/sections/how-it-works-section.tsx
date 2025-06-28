'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Search, MessageSquare, Handshake, TrendingUp, Shield } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Create Your Profile',
    description: 'Sign up and complete your profile as a buyer or seller. Get verified for increased trust and better matches.',
    color: 'text-blue-600 bg-blue-100',
    step: '01'
  },
  {
    icon: TrendingUp,
    title: 'List or Search Assets',
    description: 'Sellers list their digital assets with AI valuations. Buyers search and filter based on their criteria.',
    color: 'text-emerald-600 bg-emerald-100',
    step: '02'
  },
  {
    icon: Search,
    title: 'Get AI Recommendations',
    description: 'Our smart matching algorithm connects you with the most relevant opportunities based on your preferences.',
    color: 'text-indigo-600 bg-indigo-100',
    step: '03'
  },
  {
    icon: MessageSquare,
    title: 'Negotiate & Due Diligence',
    description: 'Use our secure messaging system to negotiate terms and share due diligence documents safely.',
    color: 'text-purple-600 bg-purple-100',
    step: '04'
  },
  {
    icon: Shield,
    title: 'Secure Transaction',
    description: 'Complete the deal with our escrow service that protects both parties throughout the transaction.',
    color: 'text-amber-600 bg-amber-100',
    step: '05'
  },
  {
    icon: Handshake,
    title: 'Close the Deal',
    description: 'Finalize the transaction with all legal documents and transfer of ownership handled seamlessly.',
    color: 'text-red-600 bg-red-100',
    step: '06'
  }
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-4 px-4 py-2">
              Simple Process
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              How AIQuira Works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our streamlined process makes digital M&A accessible to everyone. 
              From listing to closing, we guide you through every step.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="h-full card-hover border-slate-200 relative overflow-hidden">
                <div className="absolute top-4 right-4 text-6xl font-bold text-slate-100 select-none">
                  {step.step}
                </div>
                <CardContent className="p-6 relative z-10">
                  <div className={`p-4 rounded-xl ${step.color} w-fit mb-6`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
              
              {/* Connection Line */}
              {index < steps.length - 1 && index % 3 !== 2 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-slate-300 to-transparent z-0" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}