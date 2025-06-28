'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, TrendingUp, DollarSign, Shield, AlertTriangle, CheckCircle,
  Eye, MessageSquare, Globe, BarChart3, Activity, Clock, Star,
  ArrowUpRight, Zap, Target, UserCheck, UserX, Flag
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Mock data
const platformStats = {
  totalUsers: 15420,
  activeListings: 1247,
  totalTransactions: 892,
  totalVolume: 24500000,
  monthlyGrowth: 18.5,
  conversionRate: 3.2,
};

const recentTransactions = [
  {
    id: '1',
    buyer: 'John Martinez',
    seller: 'Sarah Chen',
    asset: 'TaskFlow SaaS',
    amount: 125000,
    status: 'completed',
    date: '2024-01-20',
  },
  {
    id: '2',
    buyer: 'Lisa Wang',
    seller: 'Mike Rodriguez',
    asset: 'E-commerce Store',
    amount: 89000,
    status: 'escrow',
    date: '2024-01-19',
  },
  {
    id: '3',
    buyer: 'David Kim',
    seller: 'Emma Thompson',
    asset: 'Mobile App',
    amount: 67000,
    status: 'pending',
    date: '2024-01-18',
  },
];

const fraudAlerts = [
  {
    id: '1',
    type: 'suspicious_listing',
    user: 'fake.seller@email.com',
    description: 'Multiple listings with identical descriptions',
    severity: 'high',
    time: '2 hours ago',
  },
  {
    id: '2',
    type: 'payment_anomaly',
    user: 'buyer123@email.com',
    description: 'Unusual payment pattern detected',
    severity: 'medium',
    time: '4 hours ago',
  },
  {
    id: '3',
    type: 'fake_metrics',
    user: 'scammer@fake.com',
    description: 'Inflated traffic and revenue claims',
    severity: 'high',
    time: '6 hours ago',
  },
];

const userGrowthData = [
  { month: 'Jan', users: 12000, transactions: 45 },
  { month: 'Feb', users: 12800, transactions: 52 },
  { month: 'Mar', users: 13500, transactions: 61 },
  { month: 'Apr', users: 14200, transactions: 68 },
  { month: 'May', users: 14800, transactions: 74 },
  { month: 'Jun', users: 15420, transactions: 82 },
];

const categoryData = [
  { name: 'SaaS', value: 45, color: '#3B82F6' },
  { name: 'E-commerce', value: 30, color: '#10B981' },
  { name: 'Content', value: 15, color: '#F59E0B' },
  { name: 'Mobile Apps', value: 10, color: '#EF4444' },
];

const recentUsers = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    type: 'seller',
    verified: true,
    joinDate: '2024-01-20',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50',
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria@example.com',
    type: 'buyer',
    verified: false,
    joinDate: '2024-01-19',
    avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=50',
  },
  {
    id: '3',
    name: 'Robert Chen',
    email: 'robert@example.com',
    type: 'both',
    verified: true,
    joinDate: '2024-01-18',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=50',
  },
];

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Admin Dashboard 🛡️
          </h1>
          <p className="text-slate-600 mt-1">
            Platform overview and management tools
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Shield className="h-4 w-4 mr-2" />
            Security Center
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Users</p>
                <p className="text-2xl font-bold text-slate-900">{platformStats.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-emerald-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{platformStats.monthlyGrowth}% this month
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active Listings</p>
                <p className="text-2xl font-bold text-slate-900">{platformStats.activeListings.toLocaleString()}</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <Globe className="h-3 w-3 mr-1" />
                  Live on platform
                </p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-full">
                <Globe className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Volume</p>
                <p className="text-2xl font-bold text-slate-900">${(platformStats.totalVolume / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <DollarSign className="h-3 w-3 mr-1" />
                  All time
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Fraud Alerts</p>
                <p className="text-2xl font-bold text-slate-900">{fraudAlerts.length}</p>
                <p className="text-xs text-red-600 flex items-center mt-1">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Requires attention
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="fraud">Fraud Detection</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Growth</CardTitle>
                <CardDescription>
                  User registrations and transaction volume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="transactions" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest platform events and alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Transaction completed</p>
                    <p className="text-xs text-slate-600">TaskFlow SaaS - $125,000</p>
                  </div>
                  <span className="text-xs text-slate-500">2h ago</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <UserCheck className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">New verified seller</p>
                    <p className="text-xs text-slate-600">Alex Johnson joined</p>
                  </div>
                  <span className="text-xs text-slate-500">4h ago</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Fraud alert triggered</p>
                    <p className="text-xs text-slate-600">Suspicious listing detected</p>
                  </div>
                  <span className="text-xs text-slate-500">6h ago</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Platform Health */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Health</CardTitle>
              <CardDescription>
                Key performance indicators and system status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">{platformStats.conversionRate}%</div>
                  <p className="text-sm text-slate-600 mb-2">Conversion Rate</p>
                  <Progress value={platformStats.conversionRate * 10} className="h-2" />
                  <p className="text-xs text-slate-500 mt-1">Above industry average</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">98.9%</div>
                  <p className="text-sm text-slate-600 mb-2">System Uptime</p>
                  <Progress value={98.9} className="h-2" />
                  <p className="text-xs text-slate-500 mt-1">Last 30 days</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">4.8/5</div>
                  <p className="text-sm text-slate-600 mb-2">User Satisfaction</p>
                  <Progress value={96} className="h-2" />
                  <p className="text-xs text-slate-500 mt-1">Based on 1,247 reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>User Statistics</CardTitle>
                <CardDescription>
                  Breakdown of user types and verification status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Verified Users</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={78} className="w-20 h-2" />
                      <span className="text-sm text-slate-600">78%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Active Sellers</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={45} className="w-20 h-2" />
                      <span className="text-sm text-slate-600">45%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Active Buyers</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={65} className="w-20 h-2" />
                      <span className="text-sm text-slate-600">65%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Premium Users</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={23} className="w-20 h-2" />
                      <span className="text-sm text-slate-600">23%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Users */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Registrations</CardTitle>
                <CardDescription>
                  Latest users who joined the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-slate-600">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={user.verified ? 'default' : 'secondary'}>
                        {user.verified ? 'Verified' : 'Pending'}
                      </Badge>
                      <Badge variant="outline">
                        {user.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                Latest deals and their current status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <h4 className="font-medium">{transaction.asset}</h4>
                        <Badge variant={
                          transaction.status === 'completed' ? 'default' :
                          transaction.status === 'escrow' ? 'secondary' : 'outline'
                        }>
                          {transaction.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-slate-600">
                        <span>{transaction.buyer}</span> ← <span>{transaction.seller}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {new Date(transaction.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">
                        ${transaction.amount.toLocaleString()}
                      </div>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fraud" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-red-600" />
                Fraud Detection Alerts
              </CardTitle>
              <CardDescription>
                Suspicious activities requiring immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fraudAlerts.map((alert) => (
                  <div key={alert.id} className={`p-4 border rounded-lg ${
                    alert.severity === 'high' ? 'border-red-200 bg-red-50' : 'border-amber-200 bg-amber-50'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Flag className={`h-4 w-4 ${
                          alert.severity === 'high' ? 'text-red-600' : 'text-amber-600'
                        }`} />
                        <span className="font-medium capitalize">{alert.type.replace('_', ' ')}</span>
                      </div>
                      <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'}>
                        {alert.severity} priority
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-700 mb-2">{alert.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-600">User: {alert.user}</span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Investigate
                        </Button>
                        <Button size="sm" variant={alert.severity === 'high' ? 'destructive' : 'default'}>
                          Take Action
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Asset Categories</CardTitle>
                <CardDescription>
                  Distribution of listed assets by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Revenue Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>
                  Monthly transaction volume and commission
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="transactions" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}