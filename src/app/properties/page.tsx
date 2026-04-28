'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header, Footer, PropertyCard, PropertyCardSkeleton, FilterModal, FilterChips, Button } from '@/components';
import { mockProperties, mockCities, mockLocalities, propertyTypeLabels } from '@/lib/data';
import { Search, SlidersHorizontal, Grid, List, ChevronDown, MapPin, X } from 'lucide-react';
import { Property } from '@/types';

function PropertiesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  const [filters, setFilters] = useState({
    propertyType: searchParams.get('type')?.split(',') || [],
    priceMin: searchParams.get('priceMin') || '',
    priceMax: searchParams.get('priceMax') || '',
    bedrooms: [] as string[],
    city: searchParams.get('city') || '',
    locality: '',
    verificationStatus: [] as string[],
    landType: [] as string[],
    ownership: [] as string[],
    nearSchool: false,
    nearHospital: false,
    nearRailwayStation: false,
    nearIndustrialArea: false,
    featured: searchParams.get('featured') === 'true',
    query: searchParams.get('q') || '',
  });

  // Filter properties based on current filters
  const filteredProperties = mockProperties.filter((property) => {
    if (filters.city && property.address.city !== filters.city) return false;
    if (filters.locality && property.address.locality !== filters.locality) return false;
    if (filters.propertyType.length > 0 && !filters.propertyType.includes(property.type)) return false;
    if (filters.priceMin && property.price < parseFloat(filters.priceMin)) return false;
    if (filters.priceMax && property.price > parseFloat(filters.priceMax)) return false;
    if (filters.bedrooms.length > 0 && property.bedrooms && !filters.bedrooms.includes(String(property.bedrooms))) return false;
    if (filters.verificationStatus.length > 0 && !filters.verificationStatus.includes(property.verificationStatus)) return false;
    if (filters.landType.length > 0 && property.landType && !filters.landType.includes(property.landType)) return false;
    if (filters.ownership.length > 0 && !filters.ownership.includes(property.ownership)) return false;
    if (filters.nearSchool && !property.nearSchool) return false;
    if (filters.nearHospital && !property.nearHospital) return false;
    if (filters.nearRailwayStation && !property.nearRailwayStation) return false;
    if (filters.nearIndustrialArea && !property.nearIndustrialArea) return false;
    if (filters.featured && !property.isFeatured) return false;
    if (filters.query && !property.title.toLowerCase().includes(filters.query.toLowerCase()) &&
        !property.address.locality.toLowerCase().includes(filters.query.toLowerCase())) return false;
    return true;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'most_viewed':
        return b.views - a.views;
      default:
        return b.views - a.views; // relevance
    }
  });

  const handleFilterApply = (newFilters: any) => {
    setFilters(newFilters);
    // Update URL params
    const params = new URLSearchParams();
    if (newFilters.city) params.set('city', newFilters.city);
    if (newFilters.propertyType.length > 0) params.set('type', newFilters.propertyType.join(','));
    if (newFilters.priceMin) params.set('priceMin', newFilters.priceMin);
    if (newFilters.priceMax) params.set('priceMax', newFilters.priceMax);
    if (newFilters.featured) params.set('featured', 'true');
    if (newFilters.query) params.set('q', newFilters.query);
    router.push(`/properties?${params.toString()}`);
  };

  const handleFilterRemove = (key: string, value?: string) => {
    if (value && Array.isArray(filters[key as keyof typeof filters])) {
      setFilters({ ...filters, [key]: (filters[key as keyof typeof filters] as string[]).filter((v) => v !== value) });
    } else if (key === 'priceRange') {
      setFilters({ ...filters, priceMin: '', priceMax: '' });
    } else if (key === 'city' || key === 'locality' || key === 'query') {
      setFilters({ ...filters, [key]: '' });
    } else {
      setFilters({ ...filters, [key]: false });
    }
  };

  const handleClearAll = () => {
    setFilters({
      propertyType: [],
      priceMin: '',
      priceMax: '',
      bedrooms: [],
      city: '',
      locality: '',
      verificationStatus: [],
      landType: [],
      ownership: [],
      nearSchool: false,
      nearHospital: false,
      nearRailwayStation: false,
      nearIndustrialArea: false,
      featured: false,
      query: '',
    });
    router.push('/properties');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Search header */}
      <div className="bg-white border-b border-gray-100 sticky top-[Header height] z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search input */}
            <div className="flex-1 flex items-center gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by locality, landmark, or property name..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={filters.query}
                  onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                />
              </div>
              <select
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              >
                <option value="">All Cities</option>
                {mockCities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>

              <select
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="relevance">Most Relevant</option>
                <option value="newest">Newest First</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="most_viewed">Most Viewed</option>
              </select>

              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'text-gray-400 hover:bg-gray-50'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'text-gray-400 hover:bg-gray-50'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active filters */}
          <FilterChips filters={filters} onRemove={handleFilterRemove} onClearAll={handleClearAll} />
        </div>
      </div>

      {/* Results */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 w-full">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{sortedProperties.length}</span> properties found
            {filters.city && ` in ${filters.city}`}
            {filters.query && ` for "${filters.query}"`}
          </p>
        </div>

        {isLoading ? (
          <div className={viewMode === 'grid'
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
          }>
            {[...Array(8)].map((_, i) => (
              <PropertyCardSkeleton key={i} variant={viewMode === 'list' ? 'horizontal' : 'default'} />
            ))}
          </div>
        ) : sortedProperties.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters or search criteria</p>
            <Button variant="outline" onClick={handleClearAll}>
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className={viewMode === 'grid'
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
          }>
            {sortedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                variant={viewMode === 'list' ? 'horizontal' : 'default'}
              />
            ))}
          </div>
        )}
      </main>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleFilterApply}
      />

      <Footer />
    </div>
  );
}

function PropertiesLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <PropertyCardSkeleton key={i} variant="default" />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<PropertiesLoading />}>
      <PropertiesContent />
    </Suspense>
  );
}
