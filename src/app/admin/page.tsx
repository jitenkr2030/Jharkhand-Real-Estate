'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header, Footer, Button, Card, CardHeader, CardTitle, CardContent } from '@/components';
import { mockProperties, mockUsers } from '@/lib/data';
import { formatPrice, timeAgo } from '@/lib/utils';
import { 
  Shield, 
  Users, 
  Home, 
  AlertTriangle, 
  FileCheck, 
  BarChart3, 
  Settings,
  Bell,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  DollarSign,
  Building2,
  MapPin,
  ArrowUpRight,
  PieChart,
  Activity
} from 'lucide-react';

const stats = [
  { label: 'Total Users', value: '3,245', change: '+12%', icon: Users },
  { label: 'Total Properties', value: '8,542', change: '+8%', icon: Home },
  { label: 'Pending Verifications', value: '47', change: '-5', icon: FileCheck },
  { label: 'Reports Filed', value: '12', change: '+2', icon: AlertTriangle },
];

const recentVerifications = [
  { id: 1, property: '3BHK Apartment in Doranda', owner: 'Rajan Sharma', type: 'registry', status: 'pending', time: '2 hours ago' },
  { id: 2, property: 'Plot in Kanke Road', owner: 'Anand Verma', type: 'khata', status: 'pending', time: '4 hours ago' },
  { id: 3, property: 'Villa in Hinoo', owner: 'Suresh Patel', type: 'rera', status: 'verified', time: '1 day ago' },
];

const flaggedProperties = [
  { id: 1, title: 'Farm Land in Namkom', reason: 'Suspicious pricing', reported: '2 days ago' },
  { id: 2, title: 'Commercial Plot', reason: 'Invalid documents', reported: '3 days ago' },
];

const cityStats = [
  { city: 'Ranchi', listings: 1250, users: 890, revenue: '₹12.5L' },
  { city: 'Jamshedpur', listings: 890, users: 650, revenue: '₹8.9L' },
  { city: 'Dhanbad', listings: 650, users: 420, revenue: '₹6.5L' },
  { city: 'Bokaro', listings: 320, users: 180, revenue: '₹3.2L' },
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-gray-900 text-white">
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold">Admin Panel</p>
                <p className="text-xs text-gray-400">Baraik Brother Property</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {[
              { icon: BarChart3, label: 'Dashboard', id: 'dashboard' },
              { icon: Users, label: 'Users', id: 'users' },
              { icon: Home, label: 'Properties', id: 'properties' },
              { icon: FileCheck, label: 'Verifications', id: 'verifications' },
              { icon: AlertTriangle, label: 'Reports', id: 'reports' },
              { icon: DollarSign, label: 'Payments', id: 'payments' },
              { icon: PieChart, label: 'Analytics', id: 'analytics' },
              { icon: Settings, label: 'Settings', id: 'settings' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-800">
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-400">Platform Health</p>
              <p className="text-lg font-bold text-green-400 mt-1">All Systems Operational</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-500">Overview of platform activity and management</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">Notifications (5)</span>
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-primary-100 rounded-lg">
                      <stat.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Pending Verifications */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-yellow-500" />
                    Pending Verifications
                  </CardTitle>
                  <Link href="/admin/verifications" className="text-sm text-primary-600 hover:underline">
                    View All
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentVerifications.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            item.status === 'verified' ? 'bg-green-100' : 'bg-yellow-100'
                          }`}>
                            {item.status === 'verified' ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <Clock className="w-5 h-5 text-yellow-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{item.property}</p>
                            <p className="text-sm text-gray-500">
                              Owner: {item.owner} • Document: {item.type}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.status === 'pending' && (
                            <>
                              <Button size="sm" variant="outline" className="text-green-600 border-green-600">
                                Approve
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                                Reject
                              </Button>
                            </>
                          )}
                          {item.status === 'verified' && (
                            <span className="text-sm text-gray-500">{item.time}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Flagged Properties */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    Flagged Properties
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {flaggedProperties.map((item) => (
                      <div key={item.id} className="p-3 bg-red-50 rounded-lg border border-red-100">
                        <p className="font-medium text-gray-900">{item.title}</p>
                        <p className="text-sm text-red-600 mt-1">{item.reason}</p>
                        <p className="text-xs text-gray-500 mt-2">Reported: {item.reported}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* City Stats */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>City-wise Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cityStats.map((city) => (
                      <div key={city.city} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{city.city}</p>
                          <p className="text-sm text-gray-500">{city.listings} listings</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary-600">{city.revenue}</p>
                          <p className="text-sm text-gray-500">{city.users} users</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Revenue & Activity */}
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Total Revenue (MTD)</p>
                    <p className="text-3xl font-bold text-gray-900">₹32.5L</p>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>+18% vs last month</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Featured Listings</p>
                    <p className="text-xl font-bold">₹12.5L</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Subscriptions</p>
                    <p className="text-xl font-bold">₹8.9L</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Lead Sales</p>
                    <p className="text-xl font-bold">₹6.2L</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Verification Fees</p>
                    <p className="text-xl font-bold">₹4.9L</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent User Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: 'New user registered', user: 'Amit Kumar', time: '5 mins ago' },
                    { action: 'Property listed', user: 'Priya Real Estate', time: '15 mins ago' },
                    { action: 'Document verified', user: 'Admin Team', time: '30 mins ago' },
                    { action: 'Payment received', user: 'Jamshedpur Homes', time: '1 hour ago' },
                    { action: 'Report filed', user: 'System', time: '2 hours ago' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <Activity className="w-4 h-4 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">by {activity.user}</p>
                      </div>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}