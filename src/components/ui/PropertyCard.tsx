'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Heart, 
  Share2, 
  Eye, 
  Calendar,
  TrendingUp,
  Building2
} from 'lucide-react';
import { Property } from '@/types';
import { formatPrice, formatDate, timeAgo } from '@/lib/utils';
import { VerificationBadge, FeaturedBadge, PropertyTypeBadge } from './Badge';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  variant?: 'default' | 'compact' | 'horizontal';
  onSave?: (id: string) => void;
  onShare?: (id: string) => void;
}

export function PropertyCard({ property, variant = 'default', onSave, onShare }: PropertyCardProps) {
  const [isSaved, setIsSaved] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
    onSave?.(property.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onShare?.(property.id);
  };

  if (variant === 'horizontal') {
    return (
      <Link href={`/property/${property.id}`}>
        <div className="flex gap-4 bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
          {/* Image */}
          <div className="relative w-48 h-48 flex-shrink-0">
            <Image
              src={property.media[0]?.url || '/placeholder-property.jpg'}
              alt={property.title}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
            {property.isFeatured && (
              <div className="absolute top-2 left-2">
                <FeaturedBadge />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <PropertyTypeBadge type={property.type} />
                <h3 className="font-semibold text-gray-900 mt-1 line-clamp-1">{property.title}</h3>
              </div>
              <VerificationBadge status={property.verificationStatus} />
            </div>

            <div className="flex items-center text-gray-500 text-sm mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              {property.address.locality}, {property.address.city}
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              {property.bedrooms && (
                <span className="flex items-center gap-1">
                  <Bed className="w-4 h-4" /> {property.bedrooms} Beds
                </span>
              )}
              {property.bathrooms && (
                <span className="flex items-center gap-1">
                  <Bath className="w-4 h-4" /> {property.bathrooms} Baths
                </span>
              )}
              {property.carpetArea && (
                <span className="flex items-center gap-1">
                  <Square className="w-4 h-4" /> {property.carpetArea} sq.ft
                </span>
              )}
              {property.plotArea && (
                <span className="flex items-center gap-1">
                  <Square className="w-4 h-4" /> {property.plotArea} sq.ft
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-primary-600">
                {formatPrice(property.price)}
                {property.pricePerUnit && (
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    ₹{property.pricePerUnit.toLocaleString()}/sq.ft
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  className={cn(
                    "p-2 rounded-full transition-colors",
                    isSaved ? "bg-red-50 text-red-500" : "bg-gray-50 text-gray-400 hover:text-red-500"
                  )}
                >
                  <Heart className={cn("w-4 h-4", isSaved && "fill-current")} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link href={`/property/${property.id}`}>
        <div className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-all">
          <div className="relative h-32">
            <Image
              src={property.media[0]?.url || '/placeholder-property.jpg'}
              alt={property.title}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
            <button
              onClick={handleSave}
              className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white"
            >
              <Heart className={cn("w-4 h-4", isSaved && "fill-red-500 text-red-500")} />
            </button>
          </div>
          <div className="p-3">
            <h3 className="font-medium text-gray-900 text-sm line-clamp-1">{property.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{property.address.locality}</p>
            <p className="text-primary-600 font-semibold mt-1">{formatPrice(property.price)}</p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/property/${property.id}`}>
      <div className="property-card">
        {/* Image section */}
        <div className="property-card-image">
          {imageError ? (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <Building2 className="w-12 h-12 text-gray-400" />
            </div>
          ) : (
            <Image
              src={property.media[0]?.url || '/images/property-placeholder.jpg'}
              alt={property.title}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {property.isFeatured && <FeaturedBadge />}
            <PropertyTypeBadge type={property.type} />
          </div>

          {/* Actions */}
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={handleShare}
              className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
            >
              <Share2 className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={handleSave}
              className={cn(
                "p-2 rounded-full transition-colors",
                isSaved ? "bg-red-500 text-white" : "bg-white/90 text-gray-600 hover:bg-white"
              )}
            >
              <Heart className={cn("w-4 h-4", isSaved && "fill-current")} />
            </button>
          </div>

          {/* Image counter */}
          {property.media.length > 1 && (
            <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 text-white text-xs rounded">
              +{property.media.length - 1} photos
            </div>
          )}
        </div>

        {/* Content section */}
        <div className="p-4">
          {/* Verification & Time */}
          <div className="flex items-center justify-between mb-2">
            <VerificationBadge status={property.verificationStatus} />
            <span className="text-xs text-gray-500">{timeAgo(property.createdAt)}</span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-primary-600 transition-colors mb-2">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{property.address.locality}, {property.address.city}</span>
          </div>

          {/* Property specs */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            {property.bedrooms && (
              <span className="flex items-center gap-1">
                <Bed className="w-4 h-4" />
                <span>{property.bedrooms}</span>
              </span>
            )}
            {property.bathrooms && (
              <span className="flex items-center gap-1">
                <Bath className="w-4 h-4" />
                <span>{property.bathrooms}</span>
              </span>
            )}
            {property.carpetArea && (
              <span className="flex items-center gap-1">
                <Square className="w-4 h-4" />
                <span>{property.carpetArea} sq.ft</span>
              </span>
            )}
            {property.plotArea && (
              <span className="flex items-center gap-1">
                <Square className="w-4 h-4" />
                <span>{property.plotArea} sq.ft</span>
              </span>
            )}
          </div>

          {/* Price & Stats */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div>
              <span className="text-xl font-bold text-primary-600">
                {formatPrice(property.price)}
              </span>
              {property.pricePerUnit && (
                <span className="text-xs text-gray-500 ml-1 block">
                  ₹{property.pricePerUnit.toLocaleString()}/sq.ft
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {property.views}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                {property.saves}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface PropertyCardSkeletonProps {
  variant?: 'default' | 'compact' | 'horizontal';
}

export function PropertyCardSkeleton({ variant = 'default' }: PropertyCardSkeletonProps) {
  if (variant === 'horizontal') {
    return (
      <div className="flex gap-4 bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="w-48 h-48 skeleton" />
        <div className="flex-1 p-4">
          <div className="skeleton h-4 w-24 mb-2" />
          <div className="skeleton h-6 w-3/4 mb-2" />
          <div className="skeleton h-4 w-1/2 mb-3" />
          <div className="flex gap-4 mb-3">
            <div className="skeleton h-4 w-16" />
            <div className="skeleton h-4 w-16" />
            <div className="skeleton h-4 w-20" />
          </div>
          <div className="skeleton h-8 w-32" />
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
        <div className="h-32 skeleton" />
        <div className="p-3">
          <div className="skeleton h-4 w-full mb-1" />
          <div className="skeleton h-3 w-2/3 mb-2" />
          <div className="skeleton h-5 w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
      <div className="h-48 skeleton" />
      <div className="p-4">
        <div className="flex justify-between mb-2">
          <div className="skeleton h-5 w-20" />
          <div className="skeleton h-5 w-16" />
        </div>
        <div className="skeleton h-6 w-full mb-2" />
        <div className="skeleton h-4 w-2/3 mb-3" />
        <div className="flex gap-4 mb-4">
          <div className="skeleton h-4 w-16" />
          <div className="skeleton h-4 w-16" />
          <div className="skeleton h-4 w-20" />
        </div>
        <div className="flex justify-between pt-3 border-t border-gray-100">
          <div className="skeleton h-8 w-28" />
          <div className="flex gap-2">
            <div className="skeleton h-6 w-12" />
            <div className="skeleton h-6 w-12" />
          </div>
        </div>
      </div>
    </div>
  );
}