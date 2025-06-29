'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { BuyerDashboard } from '@/components/dashboard/buyer-dashboard';
import { SellerDashboard } from '@/components/dashboard/seller-dashboard';
import { AdminDashboard } from '@/components/dashboard/admin-dashboard';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const renderDashboard = () => {
    // Admin dashboard for admin users
    if (user.email === 'admin@aiquira.com') {
      return <AdminDashboard />;
    }
    
    // Seller dashboard for sellers or both
    if (user.userType === 'seller' || user.userType === 'both') {
      return <SellerDashboard />;
    }
    
    // Buyer dashboard for buyers
    return <BuyerDashboard />;
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
}