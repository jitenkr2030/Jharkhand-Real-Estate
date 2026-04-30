'use client';

import React from 'react';
import Link from 'next/link';
import { Home, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from './Button';

const footerLinks = {
  'Property Types': [
    { label: 'Apartments', href: '/properties?type=apartment' },
    { label: 'Independent Houses', href: '/properties?type=independent_house' },
    { label: 'Villas', href: '/properties?type=villa' },
    { label: 'Plots', href: '/properties?type=plot' },
    { label: 'Agricultural Land', href: '/properties?type=agricultural_land' },
    { label: 'Commercial', href: '/properties?type=commercial' },
  ],
  'Popular Cities': [
    { label: 'Ranchi', href: '/properties?city=Ranchi' },
    { label: 'Jamshedpur', href: '/properties?city=Jamshedpur' },
    { label: 'Dhanbad', href: '/properties?city=Dhanbad' },
    { label: 'Bokaro', href: '/properties?city=Bokaro' },
    { label: 'Deoghar', href: '/properties?city=Deoghar' },
  ],
  'Quick Links': [
    { label: 'Post Free Property', href: '/post-property' },
    { label: 'Agent Registration', href: '/agent/register' },
    { label: 'Verified Properties', href: '/properties?verified=true' },
    { label: 'Price Trends', href: '/price-trends' },
    { label: 'Area Reviews', href: '/area-reviews' },
  ],
  'Help & Support': [
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQs', href: '/faq' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Grievance Redressal', href: '/grievance' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                  <span className="text-xl font-bold text-white">Baraik Brother</span>
                <span className="text-xl font-bold text-primary-400">Property</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Your trusted platform for finding verified properties. Buy, sell, or rent with confidence.
            </p>
            <div className="flex items-center gap-4 mb-6">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Contact bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-800 rounded-lg">
                <Phone className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Call us anytime</p>
                <p className="text-white font-medium">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-800 rounded-lg">
                <Mail className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email us</p>
                <p className="text-white font-medium">support@baraikbrotherproperty.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-800 rounded-lg">
                <MapPin className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Office address</p>
                <p className="text-white font-medium">Ranchi, Jharkhand 834001</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-sm text-gray-500">
            2024 Baraik Brother Property. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-primary-400">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:text-primary-400">
              Terms
            </Link>
            <Link href="/sitemap" className="text-sm text-gray-500 hover:text-primary-400">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}