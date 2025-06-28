'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/auth-context';
import { Brain, ShoppingCart, TrendingUp, Calculator, Users, Shield, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const onboardingSteps = [
  {
    id: 1,
    title: 'Welcome to AIQuira',
    description: 'Let\'s get you started with the premier digital M&A platform',
  },
  {
    id: 2,
    title: 'Choose Your Role',
    description: 'Are you looking to buy or sell digital assets?',
  },
  {
    id: 3,
    title: 'Platform Features',
    description: 'Discover what makes AIQuira the best choice for digital M&A',
  },
  {
    id: 4,
    title: 'Ready to Start',
    description: 'Your account is set up and ready to go!',
  },
];

const features = [
  {
    icon: Calculator,
    title: 'AI-Powered Valuation',
    description: 'Get instant, accurate asset valuations using machine learning algorithms trained on thousands of successful deals.',
  },
  {
    icon: Users,
    title: 'Smart Matchmaking',
    description: 'Our AI connects the right buyers with sellers based on preferences, budget, and asset type.',
  },
  {
    icon: Shield,
    title: 'Secure Transactions',
    description: 'All deals are protected with escrow services, verification systems, and legal documentation.',
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<'buyer' | 'seller'>('buyer');
  const { user } = useAuth();
  const router = useRouter();

  const progress = (currentStep / onboardingSteps.length) * 100;

  const handleNext = () => {
    if (currentStep < onboardingSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    toast.success('Welcome to AIQuira! Your onboarding is complete. Let\'s explore your dashboard.');
    router.push('/dashboard');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <Brain className="h-24 w-24 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Welcome to AIQuira</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                The world's most advanced platform for digital mergers and acquisitions.
                We use AI to make buying and selling digital assets simple, secure, and profitable.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-blue-600">2,847</div>
                <div className="text-slate-600">Active Listings</div>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-green-600">$47M</div>
                <div className="text-slate-600">Total Volume</div>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-purple-600">1,293</div>
                <div className="text-slate-600">Deals Completed</div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">What brings you to AIQuira?</h2>
              <p className="text-lg text-slate-600">
                Choose your primary role to personalize your experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card 
                className={`cursor-pointer transition-all duration-200 ${
                  selectedRole === 'buyer' 
                    ? 'ring-2 ring-blue-600 bg-blue-50' 
                    : 'hover:shadow-lg'
                }`}
                onClick={() => setSelectedRole('buyer')}
              >
                <CardHeader className="text-center">
                  <ShoppingCart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-xl">I'm a Buyer</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Explore verified digital assets</li>
                    <li>• Get AI-powered recommendations</li>
                    <li>• Access detailed asset analytics</li>
                    <li>• Connect with verified sellers</li>
                  </ul>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all duration-200 ${
                  selectedRole === 'seller' 
                    ? 'ring-2 ring-green-600 bg-green-50' 
                    : 'hover:shadow-lg'
                }`}
                onClick={() => setSelectedRole('seller')}
              >
                <CardHeader className="text-center">
                  <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-xl">I'm a Seller</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• List your digital assets</li>
                    <li>• Get AI valuation estimates</li>
                    <li>• Reach qualified buyers</li>
                    <li>• Manage multiple listings</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Why choose AIQuira?</h2>
              <p className="text-lg text-slate-600">
                We've built the most advanced tools for digital asset transactions
              </p>
            </div>
            
            <div className="space-y-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                
                return (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
                    <div className="bg-blue-600 text-white rounded-full p-2 flex-shrink-0">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="h-24 w-24 text-green-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">All set!</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Welcome to AIQuira, {user?.name}! Your account is ready and you can now start
                {selectedRole === 'buyer' ? ' exploring digital assets' : ' listing your assets'}.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">🎉 Special Welcome Offer</h3>
              <p className="text-blue-100">
                Get 50% off your first transaction fee as a new member!
              </p>
              <Badge className="mt-2 bg-yellow-400 text-yellow-900">
                Use code: WELCOME50
              </Badge>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-600">
              Step {currentStep} of {onboardingSteps.length}
            </span>
            <span className="text-sm text-slate-600">
              {Math.round(progress)}% complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            variant="outline"
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          {currentStep < onboardingSteps.length ? (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleFinish} className="bg-green-600 hover:bg-green-700">
              Get Started
              <CheckCircle className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}