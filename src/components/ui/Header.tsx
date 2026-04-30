'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Menu, 
  X, 
  Home, 
  Building2, 
  User, 
  Bell, 
  MessageSquare, 
  Heart,
  Plus,
  ChevronDown,
  MapPin,
  Phone,
  LogOut,
  Settings,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

const navItems = [
  { label: 'Buy', href: '/properties?type=sale' },
  { label: 'Rent', href: '/properties?type=rent' },
  { label: 'Plots & Land', href: '/properties?type=plot' },
  { label: 'Commercial', href: '/properties?type=commercial' },
];

const cities = [
  { name: 'Ranchi', count: 1250 },
  { name: 'Jamshedpur', count: 890 },
  { name: 'Dhanbad', count: 650 },
  { name: 'Bokaro', count: 320 },
  { name: 'Deoghar', count: 180 },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Ranchi');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto">
        {/* Top bar */}
        <div className="hidden md:flex items-center justify-between px-4 py-2 bg-primary-600 text-white text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              +91 98765 43210
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Jharkhand, India
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:underline">Help</Link>
            <Link href="#" className="hover:underline">Post Property Free</Link>
            <Link href="#" className="hover:underline">For Agents</Link>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-900">Baraik Brother</span>
              <span className="text-xl font-bold text-primary-600">Property</span>
            </div>
          </Link>

          {/* Search bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className={cn(
              "flex items-center w-full bg-gray-50 rounded-lg border-2 transition-all",
              isSearchFocused ? "border-primary-500 bg-white" : "border-transparent"
            )}>
              {/* City selector */}
              <div className="relative">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="appearance-none px-4 py-3 bg-transparent border-r border-gray-200 text-sm font-medium text-gray-700 cursor-pointer focus:outline-none"
                >
                  {cities.map((city) => (
                    <option key={city.name} value={city.name}>{city.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Search input */}
              <div className="flex-1 flex items-center px-3">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by locality, landmark, or property name..."
                  className="w-full px-3 py-3 bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </div>

              {/* Search button */}
              <Button size="md" className="rounded-r-lg rounded-l-none mr-1">
                Search
              </Button>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Wishlist */}
            <button className="hidden sm:flex items-center gap-1 p-2 text-gray-600 hover:text-primary-600 transition-colors">
              <Heart className="w-5 h-5" />
              <span className="text-sm">Saved</span>
            </button>

            {/* Messages */}
            <button className="hidden sm:flex items-center gap-1 p-2 text-gray-600 hover:text-primary-600 transition-colors">
              <MessageSquare className="w-5 h-5" />
              <span className="text-sm">Messages</span>
            </button>

            {/* Post Property */}
            <Link href="/post-property">
              <Button variant="secondary" size="sm" className="hidden md:flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Post Property
              </Button>
            </Link>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-600" />
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
              </button>

              {/* Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-fade-in">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-medium text-gray-900">Welcome</p>
                    <p className="text-sm text-gray-500">Sign in to access your account</p>
                  </div>
                  <div className="py-1">
                    <Link href="/auth/login" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">Sign In</span>
                    </Link>
                    <Link href="/auth/register" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
                      <Plus className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">Create Account</span>
                    </Link>
                  </div>
                  <div className="border-t border-gray-100 py-1">
                    <Link href="/agent/dashboard" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">Agent Dashboard</span>
                    </Link>
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
                      <Shield className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">Admin Panel</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="lg:hidden px-4 pb-3">
          <div className="flex items-center bg-gray-50 rounded-lg border-2 border-transparent focus-within:border-primary-500">
            <Search className="w-5 h-5 text-gray-400 ml-3" />
            <input
              type="text"
              placeholder="Search properties..."
              className="w-full px-3 py-3 bg-transparent outline-none"
            />
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white py-4 animate-fade-in">
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-gray-100 mt-2 pt-2">
                <Link href="/auth/login" className="px-4 py-3 text-gray-700">
                  Sign In
                </Link>
                <Link href="/auth/register" className="px-4 py-3 text-gray-700">
                  Create Account
                </Link>
                <Link href="/post-property" className="px-4 py-3 text-primary-600 font-medium">
                  Post Property Free
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}