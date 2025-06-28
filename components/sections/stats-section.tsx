'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

const stats: Stat[] = [
  { value: '2.4', suffix: 'B+', label: 'In Digital Assets Traded' },
  { value: '15', suffix: 'K+', label: 'Successful Transactions' },
  { value: '95', suffix: '%', label: 'Customer Satisfaction' },
  { value: '48', suffix: 'H', label: 'Average Deal Closure' },
];

export function StatsSection() {
  return (
    <section className="py-16 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-slate-300 text-sm md:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const numericValue = parseFloat(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (count < numericValue) {
        setCount(prev => Math.min(prev + numericValue / 50, numericValue));
      }
    }, 20);

    return () => clearTimeout(timer);
  }, [count, numericValue]);

  return (
    <span>
      {numericValue > 1 ? Math.floor(count * 10) / 10 : count.toFixed(1)}
      {suffix}
    </span>
  );
}