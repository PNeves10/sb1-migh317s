'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search,
  Filter,
  Heart,
  Globe,
  Smartphone,
  ShoppingCart,
  Building,
  TrendingUp,
  Eye
} from 'lucide-react';
import Link from 'next/link';

const mockAssets = [
  {
    id: 1,
    title: 'E-commerce Fashion Store',
    description: 'Profitable Shopify store in the fashion niche with 50K+ customers and growing revenue',
    price: '$125,000',
    revenue: '$15K/month',
    traffic: '25K visitors/month',
    type: 'E-commerce',
    category: 'ecommerce',
    icon: ShoppingCart,
    verified: true,
    growth: '+23%',
    score: 8.5,
    views: 247,
    saved: false,
    images: ['https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=300'],
  },
  {
    id: 2,
    title: 'SaaS Productivity App',
    description: 'B2B productivity tool with subscription model and growing user base in enterprise market',
    price: '$280,000',
    revenue: '$28K/month',
    traffic: '45K MAU',
    type: 'SaaS',
    category: 'saas',
    icon: Smartphone,
    verified: true,
    growth: '+45%',
    score: 9.2,
    views: 389,
    saved: true,
    images: ['https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg?auto=compress&cs=tinysrgb&w=300'],
  },
  {
    id: 3,
    title: 'Content & Media Website',
    description: 'High-traffic blog with affiliate marketing and ad revenue in the technology niche',
    price: '$85,000',
    revenue: '$8K/month',
    traffic: '150K visitors/month',
    type: 'Website',
    category: 'website',
    icon: Globe,
    verified: false,
    growth: '+12%',
    score: 7.3,
    views: 156,
    saved: false,
    images: ['https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=300'],
  },
  {
    id: 4,
    title: 'Local Service Business',
    description: 'Digital marketing agency with established client base and recurring revenue model',
    price: '$450,000',
    revenue: '$42K/month',
    traffic: 'Service-based',
    type: 'Business',
    category: 'business',
    icon: Building,
    verified: true,
    growth: '+18%',
    score: 8.8,
    views: 203,
    saved: false,
    images: ['https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300'],
  },
  {
    id: 5,
    title: 'Mobile Gaming App',
    description: 'Popular mobile game with in-app purchases and strong user engagement metrics',
    price: '$195,000',
    revenue: '$18K/month',
    traffic: '100K downloads',
    type: 'Mobile App',
    category: 'mobile',
    icon: Smartphone,
    verified: true,
    growth: '+67%',
    score: 8.1,
    views: 298,
    saved: false,
    images: ['https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=300'],
  },
  {
    id: 6,
    title: 'Affiliate Marketing Site',
    description: 'Established affiliate site in health and wellness niche with consistent traffic',
    price: '$65,000',
    revenue: '$6K/month',
    traffic: '80K visitors/month',
    type: 'Website',
    category: 'website',
    icon: Globe,
    verified: false,
    growth: '+8%',
    score: 6.9,
    views: 134,
    saved: false,
    images: ['https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300'],
  },
];

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
    
    let matchesPrice = true;
    if (priceRange !== 'all') {
      const price = parseInt(asset.price.replace(/[$,]/g, ''));
      switch (priceRange) {
        case 'under-100k':
          matchesPrice = price < 100000;
          break;
        case '100k-300k':
          matchesPrice = price >= 100000 && price <= 300000;
          break;
        case 'over-300k':
          matchesPrice = price > 300000;
          break;
      }
    }
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Digital Asset Marketplace
          </h1>
          <p className="text-slate-600">
            Discover verified digital assets ready for acquisition
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search digital assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="saas">SaaS</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="mobile">Mobile App</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-100k">Under $100K</SelectItem>
                  <SelectItem value="100k-300k">$100K - $300K</SelectItem>
                  <SelectItem value="over-300k">Over $300K</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="score">AIQuira Score</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Verification Status
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="verified">Verified Only</SelectItem>
                      <SelectItem value="unverified">Unverified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Growth Rate
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="high">High Growth (+20%)</SelectItem>
                      <SelectItem value="medium">Medium Growth (10-20%)</SelectItem>
                      <SelectItem value="stable">Stable (0-10%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    AIQuira Score
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Score</SelectItem>
                      <SelectItem value="excellent">Excellent (9+)</SelectItem>
                      <SelectItem value="good">Good (7-9)</SelectItem>
                      <SelectItem value="fair">Fair (5-7)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Revenue Range
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Revenue</SelectItem>
                      <SelectItem value="high">Over $20K/month</SelectItem>
                      <SelectItem value="medium">$10K-$20K/month</SelectItem>
                      <SelectItem value="low">Under $10K/month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-slate-600">
            Showing {filteredAssets.length} of {mockAssets.length} assets
          </p>
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <Eye className="h-4 w-4" />
            <span>View counts updated hourly</span>
          </div>
        </div>

        {/* Asset Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => {
            const IconComponent = asset.icon;
            return (
              <Card key={asset.id} className="hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
                <div className="relative">
                  <img 
                    src={asset.images[0]} 
                    alt={asset.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    {asset.verified && (
                      <Badge className="bg-green-500 text-white">
                        Verified
                      </Badge>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="bg-white/80 hover:bg-white"
                    >
                      <Heart className={`h-4 w-4 ${asset.saved ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary">{asset.type}</Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <IconComponent className="h-5 w-5 text-blue-600" />
                    <div className="flex items-center text-sm text-slate-500">
                      <Eye className="h-3 w-3 mr-1" />
                      {asset.views}
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-1">{asset.title}</CardTitle>
                  <p className="text-sm text-slate-600 line-clamp-2">{asset.description}</p>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Price:</span>
                      <span className="font-semibold text-green-600">{asset.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Revenue:</span>
                      <span className="font-medium">{asset.revenue}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Traffic:</span>
                      <span className="font-medium">{asset.traffic}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Growth:</span>
                      <span className="font-medium text-green-600 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {asset.growth}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">AIQuira Score:</span>
                      <Badge 
                        className={
                          asset.score >= 8.5 ? 'bg-green-100 text-green-700' :
                          asset.score >= 7 ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }
                      >
                        {asset.score}/10
                      </Badge>
                    </div>
                  </div>
                  
                  <Button asChild className="w-full group-hover:bg-blue-700 transition-colors" size="sm">
                    <Link href={`/marketplace/${asset.id}`}>
                      View Details
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Load More */}
        {filteredAssets.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Assets
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredAssets.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No assets found</h3>
            <p className="text-slate-600 mb-4">
              Try adjusting your search criteria or explore all categories
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setPriceRange('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}