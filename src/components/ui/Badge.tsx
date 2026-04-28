import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-800',
        primary: 'bg-primary-100 text-primary-800',
        secondary: 'bg-secondary-100 text-secondary-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        danger: 'bg-red-100 text-red-800',
        info: 'bg-blue-100 text-blue-800',
        verified: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-sm',
        pending: 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-sm',
        featured: 'bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-sm',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-2.5 py-1 text-xs',
        lg: 'px-3 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

export function Badge({ className, variant, size, icon, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </div>
  );
}

export function VerificationBadge({ status }: { status: string }) {
  const config = {
    verified: {
      variant: 'verified' as const,
      icon: (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      ),
      label: 'Verified',
    },
    pending: {
      variant: 'pending' as const,
      icon: (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        </svg>
      ),
      label: 'Pending',
    },
    unverified: {
      variant: 'default' as const,
      icon: null,
      label: 'Unverified',
    },
  };

  const { variant, icon, label } = config[status as keyof typeof config] || config.unverified;

  return (
    <Badge variant={variant} size="sm" icon={icon}>
      {label}
    </Badge>
  );
}

export function FeaturedBadge() {
  return (
    <Badge variant="featured" size="sm" icon={
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    }>
      Featured
    </Badge>
  );
}

export function PropertyTypeBadge({ type }: { type: string }) {
  const labels: Record<string, string> = {
    apartment: 'Apartment',
    independent_house: 'House',
    villa: 'Villa',
    plot: 'Plot',
    agricultural_land: 'Farm Land',
    commercial: 'Commercial',
    industrial: 'Industrial',
  };

  return (
    <Badge variant="primary" size="sm">
      {labels[type] || type}
    </Badge>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const config = {
    active: { variant: 'success' as const, label: 'Active' },
    pending: { variant: 'warning' as const, label: 'Pending' },
    sold: { variant: 'danger' as const, label: 'Sold' },
    rented: { variant: 'info' as const, label: 'Rented' },
    off_market: { variant: 'default' as const, label: 'Off Market' },
  };

  const { variant, label } = config[status as keyof typeof config] || config.off_market;

  return <Badge variant={variant} size="sm">{label}</Badge>;
}