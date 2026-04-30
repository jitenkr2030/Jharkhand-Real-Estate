'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { Input, Select } from './Input';
import { X, MapPin, ChevronDown } from 'lucide-react';
import { mockCities, mockLocalities, propertyTypeLabels, landTypeOptions, ownershipOptions } from '@/lib/data';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

export function FilterModal({ isOpen, onClose, onApply }: FilterModalProps) {
  const [filters, setFilters] = useState({
    propertyType: [] as string[],
    priceMin: '',
    priceMax: '',
    bedrooms: [] as string[],
    city: '',
    locality: '',
    verificationStatus: [] as string[],
    landType: [] as string[],
    ownership: [] as string[],
    nearSchool: false,
    nearHospital: false,
    nearRailwayStation: false,
    nearIndustrialArea: false,
  });

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
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
    });
  };

  const toggleArrayFilter = (key: 'propertyType' | 'bedrooms' | 'verificationStatus' | 'landType' | 'ownership', value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-t-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* City & Locality */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Location</h3>
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="City"
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                options={mockCities.map((c) => ({ value: c, label: c }))}
                placeholder="Select city"
              />
              <Select
                label="Locality"
                value={filters.locality}
                onChange={(e) => setFilters({ ...filters, locality: e.target.value })}
                options={(mockLocalities[filters.city] || []).map((l) => ({ value: l, label: l }))}
                placeholder="Select locality"
              />
            </div>
          </div>

          {/* Property Type */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Property Type</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(propertyTypeLabels).map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => toggleArrayFilter('propertyType', value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    filters.propertyType.includes(value)
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Price Range</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Min Price (₹)"
                type="number"
                placeholder="e.g. 1000000"
                value={filters.priceMin}
                onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
              />
              <Input
                label="Max Price (₹)"
                type="number"
                placeholder="e.g. 5000000"
                value={filters.priceMax}
                onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
              />
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Bedrooms</h3>
            <div className="flex flex-wrap gap-2">
              {['1', '2', '3', '4', '5+'].map((num) => (
                <button
                  key={num}
                  onClick={() => toggleArrayFilter('bedrooms', num)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    filters.bedrooms.includes(num)
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary-400'
                  }`}
                >
                  {num} BHK
                </button>
              ))}
            </div>
          </div>

          {/* Land Type (for plots/land) */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Land Type</h3>
            <div className="flex flex-wrap gap-2">
              {landTypeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleArrayFilter('landType', option.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    filters.landType.includes(option.value)
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary-400'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Ownership */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Ownership</h3>
            <div className="flex flex-wrap gap-2">
              {ownershipOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleArrayFilter('ownership', option.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    filters.ownership.includes(option.value)
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary-400'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Locality Features */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Near By</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.nearSchool}
                  onChange={(e) => setFilters({ ...filters, nearSchool: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">Near School</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.nearHospital}
                  onChange={(e) => setFilters({ ...filters, nearHospital: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">Near Hospital</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.nearRailwayStation}
                  onChange={(e) => setFilters({ ...filters, nearRailwayStation: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">Near Railway Station</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.nearIndustrialArea}
                  onChange={(e) => setFilters({ ...filters, nearIndustrialArea: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">Near Industrial Area</span>
              </label>
            </div>
          </div>

          {/* Verification Status */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Verification Status</h3>
            <div className="flex flex-wrap gap-2">
              {['verified', 'pending', 'unverified'].map((status) => (
                <button
                  key={status}
                  onClick={() => toggleArrayFilter('verificationStatus', status)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors capitalize ${
                    filters.verificationStatus.includes(status)
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary-400'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 py-3 flex gap-3">
          <Button variant="outline" onClick={handleReset} className="flex-1">
            Reset
          </Button>
          <Button onClick={handleApply} className="flex-1">
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}

interface FilterChipsProps {
  filters: any;
  onRemove: (key: string, value?: string) => void;
  onClearAll: () => void;
}

export function FilterChips({ filters, onRemove, onClearAll }: FilterChipsProps) {
  const activeFilters: { label: string; key: string; value?: string }[] = [];

  if (filters.city) {
    activeFilters.push({ label: `City: ${filters.city}`, key: 'city' });
  }
  if (filters.locality) {
    activeFilters.push({ label: `Locality: ${filters.locality}`, key: 'locality' });
  }
  if (filters.propertyType.length > 0) {
    filters.propertyType.forEach((type: string) => {
      activeFilters.push({ label: propertyTypeLabels[type] || type, key: 'propertyType', value: type });
    });
  }
  if (filters.priceMin || filters.priceMax) {
    const priceLabel = `₹${(Number(filters.priceMin) / 100000).toFixed(0)}L - ₹${(Number(filters.priceMax) / 100000).toFixed(0)}L`;
    activeFilters.push({ label: priceLabel, key: 'priceRange' });
  }
  if (filters.bedrooms.length > 0) {
    filters.bedrooms.forEach((bhk: string) => {
      activeFilters.push({ label: `${bhk} BHK`, key: 'bedrooms', value: bhk });
    });
  }
  if (filters.nearSchool) activeFilters.push({ label: 'Near School', key: 'nearSchool' });
  if (filters.nearHospital) activeFilters.push({ label: 'Near Hospital', key: 'nearHospital' });
  if (filters.nearRailwayStation) activeFilters.push({ label: 'Near Railway Station', key: 'nearRailwayStation' });
  if (filters.nearIndustrialArea) activeFilters.push({ label: 'Near Industrial Area', key: 'nearIndustrialArea' });
  if (filters.verificationStatus.length > 0) {
    filters.verificationStatus.forEach((status: string) => {
      activeFilters.push({ label: `Verified: ${status}`, key: 'verificationStatus', value: status });
    });
  }

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {activeFilters.map((filter, index) => (
        <span
          key={`${filter.key}-${filter.value || index}`}
          className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
        >
          {filter.label}
          <button
            onClick={() => onRemove(filter.key, filter.value)}
            className="ml-1 hover:text-primary-900"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <button
        onClick={onClearAll}
        className="text-sm text-gray-500 hover:text-primary-600 underline"
      >
        Clear all
      </button>
    </div>
  );
}