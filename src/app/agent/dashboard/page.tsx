'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header, Footer, Button, Card, CardHeader, CardTitle, CardContent } from '@/components';
import { mockProperties, mockAgents, mockCities } from '@/lib/data';
import { formatPrice, timeAgo } from '@/lib/utils';
import { 
  Building2, 
  Plus, 
  Eye, 
  MessageSquare, 
  Calendar, 
  TrendingUp, 
  Users, 
  Home,
  BarChart3,
  Settings,
  Bell,
  DollarSign,
  MapPin,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  PieChart
} from 'lucide-react';

const navItems = [
  { icon: BarChart3, label: 'Dashboard', href: '/agent/dashboard' },
  { icon: Home, label: 'My Listings', href: '/agent/listings' },
  { icon: Users, label: 'Leads', href: '/agent/leads' },
  { icon: Calendar, label: 'Site Visits', href: '/agent/visits' },
  { icon: MessageSquare, label: 'Messages', href: '/agent/messages' },
  { icon: DollarSign, label: 'Payments', href: '/agent/payments' },
  { icon: Bell, label: 'Notifications', href: '/agent/notifications' },
  { icon: Settings, label: 'Settings', href: '/agent/settings' },
];

const stats = [
  { label: 'Total Listings', value: '24', change: '+3', trend: 'up', icon: Home },
  { label: 'Total Views', value: '1,245', change: '+12%', trend: 'up', icon: Eye },
  { label: 'Active Leads', value: '18', change: '-2', trend: 'down', icon: Users },
  { label: 'Site Visits', value: '8', change: '+5', trend: 'up', icon: Calendar },
];

const recentLeads = [
  { id: 1, name: 'Amit Kumar', phone: '9876543210', property: '3BHK in Doranda', status: 'new', time: '5 mins ago' },
  { id: 2, name: 'Priya Singh', phone: '9876543211', property: 'Plot in Kanke Road', status: 'contacted', time: '1 hour ago' },
  { id: 3, name: 'Rahul Sharma', phone: '9876543212', property: 'Villa in Hinoo', status: 'qualified', time: '2 hours ago' },
];

const recentActivity = [
  { type: 'view', message: 'Your listing "3BHK in Doranda" was viewed 15 times', time: '10 mins ago' },
  { type: 'lead', message: 'New inquiry for "Plot in Kanke Road"', time: '30 mins ago' },
  { type: 'visit', message: 'Site visit completed for "Villa in Hinoo"', time: '2 hours ago' },
  { type: 'payment', message: 'Payment received for Featured Listing', time: '5 hours ago' },
];

export default function AgentDashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 ${sidebarOpen ? '' : 'hidden'}`}>
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Agent Panel</p>
                <p className="text-xs text-gray-500">Priya Property Solutions</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.label.toLowerCase()
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab(item.label.toLowerCase())}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-100">
            <div className="bg-primary-50 rounded-lg p-4">
              <p className="text-sm font-medium text-primary-900 mb-1">Subscription Status</p>
              <p className="text-lg font-bold text-primary-600">Professional Plan</p>
              <p className="text-xs text-primary-700 mt-1">12 listings remaining</p>
              <Button variant="secondary" size="sm" className="w-full mt-3">
                Upgrade Plan
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500">Welcome back! Here's what's happening with your listings.</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">3 Notifications</span>
              </Button>
              <Link href="/agent/listings/new">
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add New Listing
                </Button>
              </Link>
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
                    <div className={`flex items-center gap-1 text-sm ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Leads */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Leads</CardTitle>
                  <Link href="/agent/leads" className="text-sm text-primary-600 hover:underline">
                    View All
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentLeads.map((lead) => (
                      <div key={lead.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-primary-600 font-semibold">
                              {lead.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{lead.name}</p>
                            <p className="text-sm text-gray-500">{lead.property}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            lead.status === 'new' ? 'bg-green-100 text-green-700' :
                            lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {lead.status}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">{lead.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'view' ? 'bg-blue-500' :
                          activity.type === 'lead' ? 'bg-green-500' :
                          activity.type === 'visit' ? 'bg-yellow-500' :
                          'bg-purple-500'
                        }`} />
                        <div>
                          <p className="text-sm text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Response Rate</span>
                        <span className="font-medium">94%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-600 rounded-full" style={{ width: '94%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Site Visit Rate</span>
                        <span className="font-medium">67%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '67%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Conversion Rate</span>
                        <span className="font-medium">23%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: '23%' }} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* My Listings Preview */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">My Listings</h2>
              <Link href="/agent/listings" className="text-sm text-primary-600 hover:underline">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockProperties.slice(0, 3).map((property) => (
                <Card key={property.id} hover>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">Listed {timeAgo(property.createdAt)}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        property.isFeatured ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {property.isFeatured ? 'Featured' : 'Standard'}
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-1">{property.title}</h3>
                    <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {property.address.locality}, {property.address.city}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary-600">{formatPrice(property.price)}</span>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" /> {property.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" /> {property.saves}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}