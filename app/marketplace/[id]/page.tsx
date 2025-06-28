import { AssetDetailsClient } from '@/components/marketplace/asset-details-client';
import { AssetNotFoundClient } from '@/components/marketplace/asset-not-found-client';
import { motion } from 'framer-motion';

// Mock asset data
const mockAssetData = {
  '1': {
    id: '1',
    title: 'E-commerce Fashion Store',
    description: 'Profitable Shopify store in the fashion niche with 50K+ customers and growing revenue',
    price: 125000,
    revenue: 15000,
    traffic: 25000,
    type: 'E-commerce',
    category: 'ecommerce',
    verified: true,
    growth: 23,
    score: 8.5,
    views: 247,
    listedDate: '2024-01-15',
    images: [
      'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    metrics: {
      conversionRate: 3.2,
      averageOrderValue: 85,
      customerRetention: 68,
      emailSubscribers: 12500,
      socialFollowers: 45000
    },
    financials: {
      grossMargin: 65,
      netMargin: 28,
      operatingExpenses: 8500,
      adSpend: 3200,
      yearlyGrowth: 23,
      breakEven: 'Achieved'
    },
    technology: {
      platform: 'Shopify Plus',
      hosting: 'Shopify Cloud',
      ssl: true,
      mobileOptimized: true,
      paymentGateways: ['Stripe', 'PayPal', 'Apple Pay'],
      integrations: ['Klaviyo', 'Google Analytics', 'Facebook Pixel', 'Zendesk']
    },
    seller: {
      name: 'Sarah Johnson',
      avatar: 'SJ',
      verified: true,
      rating: 4.9,
      totalSales: 12,
      responseTime: '< 2 hours'
    },
    risks: [
      {
        level: 'low',
        description: 'Seasonal fluctuations in fashion trends may affect sales during certain periods'
      },
      {
        level: 'medium',
        description: 'Dependency on Facebook and Instagram advertising for customer acquisition'
      },
      {
        level: 'low',
        description: 'Competition from larger fashion retailers in the same niche'
      }
    ],
    opportunities: [
      'Expand to international markets with high demand for fashion',
      'Develop private label products to increase margins',
      'Implement subscription box model for recurring revenue',
      'Add AR/VR try-on features to improve conversion rates'
    ]
  },
  '2': {
    id: '2',
    title: 'SaaS Productivity App',
    description: 'B2B productivity tool with subscription model and growing user base in enterprise market',
    price: 280000,
    revenue: 28000,
    traffic: 45000,
    type: 'SaaS',
    category: 'saas',
    verified: true,
    growth: 45,
    score: 9.2,
    views: 389,
    listedDate: '2024-01-10',
    images: [
      'https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    metrics: {
      conversionRate: 12.5,
      averageOrderValue: 89,
      customerRetention: 92,
      emailSubscribers: 8500,
      socialFollowers: 15000
    },
    financials: {
      grossMargin: 85,
      netMargin: 45,
      operatingExpenses: 12000,
      adSpend: 4500,
      yearlyGrowth: 45,
      breakEven: 'Achieved'
    },
    technology: {
      platform: 'Custom React/Node.js',
      hosting: 'AWS',
      ssl: true,
      mobileOptimized: true,
      paymentGateways: ['Stripe', 'PayPal'],
      integrations: ['Slack', 'Microsoft Teams', 'Google Workspace', 'Zapier']
    },
    seller: {
      name: 'Michael Chen',
      avatar: 'MC',
      verified: true,
      rating: 4.8,
      totalSales: 8,
      responseTime: '< 1 hour'
    },
    risks: [
      {
        level: 'low',
        description: 'Market competition from established players like Microsoft and Google'
      },
      {
        level: 'medium',
        description: 'Dependency on key enterprise clients for significant portion of revenue'
      }
    ],
    opportunities: [
      'Expand API integrations with more enterprise tools',
      'Develop mobile app for iOS and Android',
      'Add AI-powered features for enhanced productivity',
      'Target small and medium businesses for growth'
    ]
  }
};

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' }
  ];
}

export default function AssetDetailsPage({ params }: { params: { id: string } }) {
  const asset = mockAssetData[params.id as keyof typeof mockAssetData];

  if (!asset) {
    return <AssetNotFoundClient />;
  }

  return <AssetDetailsClient asset={asset} />;
}