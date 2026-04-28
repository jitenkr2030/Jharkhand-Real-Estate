import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} L`;
  } else {
    return `₹${price.toLocaleString('en-IN')}`;
  }
}

export function formatPriceRange(min: number, max: number): string {
  return `${formatPrice(min)} - ${formatPrice(max)}`;
}

export function calculateEMI(
  principal: number,
  annualRate: number,
  tenureYears: number
): number {
  const monthlyRate = annualRate / (12 * 100);
  const months = tenureYears * 12;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(emi);
}

export function generateAmortizationSchedule(
  principal: number,
  annualRate: number,
  tenureYears: number
): { month: number; principal: number; interest: number; balance: number }[] {
  const monthlyRate = annualRate / (12 * 100);
  const months = tenureYears * 12;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  const schedule: { month: number; principal: number; interest: number; balance: number }[] = [];
  let balance = principal;

  for (let m = 1; m <= months; m++) {
    const interest = Math.round(balance * monthlyRate);
    const principalPayment = emi - interest;
    balance = Math.max(0, balance - principalPayment);
    schedule.push({
      month: m,
      principal: Math.round(principalPayment),
      interest,
      balance: Math.round(balance),
    });
  }

  return schedule;
}

export function calculateArea(
  length: number,
  breadth: number,
  unit: 'sqft' | 'sqm' | 'bigha' | 'kattha' | 'decimal'
): number {
  const conversions = {
    sqft: 1,
    sqm: 10.764,
    bigha: 0.0023,
    kattha: 0.045,
    decimal: 0.009,
  };
  return length * breadth * conversions[unit];
}

export function convertArea(
  area: number,
  from: 'sqft' | 'sqm' | 'bigha' | 'kattha' | 'decimal',
  to: 'sqft' | 'sqm' | 'bigha' | 'kattha' | 'decimal'
): number {
  const sqftValue = area * {
    sqft: 1,
    sqm: 10.764,
    bigha: 27225,
    kattha: 1361.25,
    decimal: 435.6,
  }[from];

  return sqftValue / {
    sqft: 1,
    sqm: 10.764,
    bigha: 27225,
    kattha: 1361.25,
    decimal: 435.6,
  }[to];
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function timeAgo(date: Date | string): string {
  const now = new Date();
  const d = typeof date === 'string' ? new Date(date) : date;
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
    }
  }

  return 'Just now';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function validatePhone(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(phone);
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function maskPhone(phone: string): string {
  return phone.slice(0, 3) + 'XXXXXXX' + phone.slice(-3);
}

export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  return local.slice(0, 2) + '***@' + domain;
}

export function getPropertyTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    apartment: 'Apartment',
    independent_house: 'Independent House',
    villa: 'Villa',
    plot: 'Plot',
    agricultural_land: 'Agricultural Land',
    commercial: 'Commercial',
    industrial: 'Industrial',
  };
  return labels[type] || type;
}

export function getVerificationBadge(status: string): { label: string; color: string } {
  const badges: Record<string, { label: string; color: string }> = {
    verified: { label: 'Verified', color: 'bg-green-100 text-green-800' },
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    unverified: { label: 'Unverified', color: 'bg-gray-100 text-gray-800' },
  };
  return badges[status] || { label: status, color: 'bg-gray-100 text-gray-800' };
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    sold: 'bg-red-100 text-red-800',
    rented: 'bg-blue-100 text-blue-800',
    off_market: 'bg-gray-100 text-gray-800',
  };
  return colors[status] || colors.off_market;
}