'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'sonner';
import { 
  Heart,
  Share2,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Eye,
  Calendar,
  Globe,
  Users,
  BarChart3,
  Shield,
  Star,
  ArrowLeft,
  Send,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';
import Link from 'next/link';

interface AssetDetailsClientProps {
  asset: any;
}

export function AssetDetailsClient({ asset }: AssetDetailsClientProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSaved, setIsSaved] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [message, setMessage] = useState('');
  const [offerAmount, setOfferAmount] = useState('');
  const [offerMessage, setOfferMessage] = useState('');

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? 'Removed from saved' : 'Added to saved');
  };

  const handleContact = () => {
    if (!user) {
      toast.error('Please login to contact the seller');
      return;
    }
    setShowContactForm(true);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    toast.success('Message sent to the seller');
    setMessage('');
    setShowContactForm(false);
  };

  const handleMakeOffer = () => {
    if (!user) {
      toast.error('Please login to make an offer');
      return;
    }
    setShowOfferForm(true);
  };

  const handleSubmitOffer = () => {
    if (!offerAmount || !offerMessage.trim()) return;
    
    toast.success('Offer submitted to the seller for review');
    setOfferAmount('');
    setOfferMessage('');
    setShowOfferForm(false);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'high': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Marketplace
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleSave}>
                <Heart className={`h-4 w-4 mr-2 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                {isSaved ? 'Saved' : 'Save'}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Asset Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="outline">{asset.type}</Badge>
                      <Badge variant="secondary">{asset.category}</Badge>
                      {asset.verified && (
                        <Badge className="bg-green-100 text-green-700">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">{asset.title}</h1>
                    <p className="text-slate-600 text-lg">{asset.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      ${asset.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-500">Listed Price</div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-600 mx-auto mb-1" />
                    <div className="font-semibold">${asset.revenue.toLocaleString()}</div>
                    <div className="text-xs text-slate-500">Monthly Revenue</div>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                    <div className="font-semibold">{asset.traffic.toLocaleString()}</div>
                    <div className="text-xs text-slate-500">Monthly Visitors</div>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                    <div className="font-semibold">+{asset.growth}%</div>
                    <div className="text-xs text-slate-500">Growth YoY</div>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <Star className="h-5 w-5 text-yellow-600 mx-auto mb-1" />
                    <div className="font-semibold">{asset.score}/10</div>
                    <div className="text-xs text-slate-500">AIQuira Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Image Gallery */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Asset Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {asset.images.map((image: string, index: number) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${asset.title} screenshot ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detailed Information Tabs */}
            <Card>
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="financials">Financials</TabsTrigger>
                    <TabsTrigger value="technology">Technology</TabsTrigger>
                    <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
                    <TabsTrigger value="opportunities">Growth</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3">Key Metrics</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <div className="text-sm text-slate-500">Conversion Rate</div>
                            <div className="font-semibold">{asset.metrics.conversionRate}%</div>
                          </div>
                          <div>
                            <div className="text-sm text-slate-500">Average Order Value</div>
                            <div className="font-semibold">${asset.metrics.averageOrderValue}</div>
                          </div>
                          <div>
                            <div className="text-sm text-slate-500">Customer Retention</div>
                            <div className="font-semibold">{asset.metrics.customerRetention}%</div>
                          </div>
                          <div>
                            <div className="text-sm text-slate-500">Email Subscribers</div>
                            <div className="font-semibold">{asset.metrics.emailSubscribers.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3">Social Presence</h4>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-blue-600 mr-2" />
                            <span>{asset.metrics.socialFollowers.toLocaleString()} followers</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="financials" className="mt-6">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-3">Revenue & Margins</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-slate-600">Monthly Revenue</span>
                              <span className="font-semibold">${asset.revenue.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Gross Margin</span>
                              <span className="font-semibold">{asset.financials.grossMargin}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Net Margin</span>
                              <span className="font-semibold">{asset.financials.netMargin}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">YoY Growth</span>
                              <span className="font-semibold text-green-600">+{asset.financials.yearlyGrowth}%</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-slate-900 mb-3">Expenses</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-slate-600">Operating Expenses</span>
                              <span className="font-semibold">${asset.financials.operatingExpenses.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Ad Spend</span>
                              <span className="font-semibold">${asset.financials.adSpend.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Break Even</span>
                              <span className="font-semibold text-green-600">{asset.financials.breakEven}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="technology" className="mt-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3">Platform & Infrastructure</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-slate-500">Platform</div>
                            <div className="font-semibold">{asset.technology.platform}</div>
                          </div>
                          <div>
                            <div className="text-sm text-slate-500">Hosting</div>
                            <div className="font-semibold">{asset.technology.hosting}</div>
                          </div>
                          <div>
                            <div className="text-sm text-slate-500">SSL Certificate</div>
                            <div className="font-semibold text-green-600">
                              {asset.technology.ssl ? 'Active' : 'Inactive'}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-slate-500">Mobile Optimized</div>
                            <div className="font-semibold text-green-600">
                              {asset.technology.mobileOptimized ? 'Yes' : 'No'}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3">Payment Methods</h4>
                        <div className="flex flex-wrap gap-2">
                          {asset.technology.paymentGateways.map((gateway: string, index: number) => (
                            <Badge key={index} variant="outline">{gateway}</Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3">Integrations</h4>
                        <div className="flex flex-wrap gap-2">
                          {asset.technology.integrations.map((integration: string, index: number) => (
                            <Badge key={index} variant="secondary">{integration}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="risks" className="mt-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-900">Risk Assessment</h4>
                      {asset.risks.map((risk: any, index: number) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                          <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                            risk.level === 'low' ? 'text-green-500' :
                            risk.level === 'medium' ? 'text-yellow-500' :
                            'text-red-500'
                          }`} />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <Badge className={getRiskColor(risk.level)}>
                                {risk.level.toUpperCase()} RISK
                              </Badge>
                            </div>
                            <p className="text-slate-700">{risk.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="opportunities" className="mt-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-900">Growth Opportunities</h4>
                      {asset.opportunities.map((opportunity: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                          <Target className="h-5 w-5 text-green-600 mt-0.5" />
                          <p className="text-slate-700">{opportunity}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Seller Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Seller Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {asset.seller.avatar}
                  </div>
                  <div>
                    <div className="font-semibold flex items-center">
                      {asset.seller.name}
                      {asset.seller.verified && (
                        <CheckCircle className="h-4 w-4 text-green-500 ml-1" />
                      )}
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <Star className="h-3 w-3 text-yellow-500 mr-1" />
                      {asset.seller.rating} ({asset.seller.totalSales} sales)
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Response time:</span>
                    <span className="font-medium">{asset.seller.responseTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total sales:</span>
                    <span className="font-medium">{asset.seller.totalSales}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardContent className="p-6 space-y-3">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700" 
                  size="lg"
                  onClick={handleMakeOffer}
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Make Offer
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="lg"
                  onClick={handleContact}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Seller
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </CardContent>
            </Card>

            {/* Asset Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Asset Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      Views
                    </span>
                    <span className="font-medium">{asset.views}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Listed
                    </span>
                    <span className="font-medium">{asset.listedDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      Saved by
                    </span>
                    <span className="font-medium">23 users</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AIQuira Score Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>AIQuira Score Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">{asset.score}/10</div>
                    <div className="text-sm text-slate-600">Overall Score</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Revenue Stability</span>
                        <span>9.2/10</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Growth Potential</span>
                        <span>8.5/10</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Market Position</span>
                        <span>7.8/10</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Technical Quality</span>
                        <span>8.9/10</span>
                      </div>
                      <Progress value={89} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Contact Seller</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="message">Your message</Label>
                <Textarea
                  id="message"
                  placeholder="Hi, I'm interested in your asset..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowContactForm(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1"
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Offer Form Modal */}
      {showOfferForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Make Offer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="offerAmount">Offer Amount ($)</Label>
                <Input
                  id="offerAmount"
                  type="number"
                  placeholder="100000"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                />
                <p className="text-sm text-slate-500 mt-1">
                  Listed price: ${asset.price.toLocaleString()}
                </p>
              </div>
              <div>
                <Label htmlFor="offerMessage">Message to Seller</Label>
                <Textarea
                  id="offerMessage"
                  placeholder="Explain your offer..."
                  value={offerMessage}
                  onChange={(e) => setOfferMessage(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowOfferForm(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={handleSubmitOffer}
                  disabled={!offerAmount || !offerMessage.trim()}
                >
                  Submit Offer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}