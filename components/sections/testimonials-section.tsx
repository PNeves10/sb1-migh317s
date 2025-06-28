'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'SaaS Founder',
    company: 'TechFlow Solutions',
    avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'AIQuira\'s valuation was spot-on and helped me sell my SaaS for 40% more than I initially expected. The process was seamless and the buyer matching was incredible.',
    rating: 5,
    deal: 'Sold for $2.3M'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Digital Investor',
    company: 'Venture Digital Partners',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'I\'ve used other platforms, but AIQuira\'s AI recommendations are unmatched. Found 3 profitable acquisitions in my first month on the platform.',
    rating: 5,
    deal: 'Acquired 3 assets'
  },
  {
    name: 'Emma Thompson',
    role: 'E-commerce Owner',
    company: 'StyleCraft Boutique',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'The due diligence process was thorough yet simple. AIQuira made selling my e-commerce business feel secure and professional throughout.',
    rating: 5,
    deal: 'Sold for $850K'
  },
  {
    name: 'David Kim',
    role: 'Serial Entrepreneur',
    company: 'Growth Ventures',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'The market insights and analytics helped me price my digital assets perfectly. Sold 2 websites within 30 days of listing.',
    rating: 5,
    deal: 'Portfolio exit'
  },
  {
    name: 'Lisa Wang',
    role: 'App Developer',
    company: 'MobileFirst Studios',
    avatar: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'AIQuira connected me with the perfect buyer for my mobile app. The communication tools and escrow service made everything smooth.',
    rating: 5,
    deal: 'Sold for $1.2M'
  },
  {
    name: 'James Wilson',
    role: 'Investment Manager',
    company: 'Digital Asset Fund',
    avatar: 'https://images.pexels.com/photos/2897883/pexels-photo-2897883.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'As a professional buyer, I appreciate the detailed analytics and verification processes. Quality deals and transparent information.',
    rating: 5,
    deal: '$10M+ invested'
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-4 px-4 py-2">
              <Star className="w-4 h-4 mr-2 fill-amber-400 text-amber-400" />
              Customer Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Trusted by thousands of
              <span className="block text-gradient">digital entrepreneurs</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Join successful buyers and sellers who have completed over $2.4B in transactions on our platform.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full card-hover border-slate-200 relative">
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-blue-200 mb-4" />
                  
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-slate-600 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-slate-900">{testimonial.name}</div>
                        <div className="text-sm text-slate-500">{testimonial.role}</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {testimonial.deal}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}