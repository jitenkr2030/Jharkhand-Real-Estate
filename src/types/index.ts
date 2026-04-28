export type PropertyType = 
  | 'apartment' 
  | 'independent_house' 
  | 'villa' 
  | 'plot' 
  | 'agricultural_land' 
  | 'commercial' 
  | 'industrial';

export type ListingStatus = 'active' | 'pending' | 'sold' | 'rented' | 'off_market';

export type VerificationStatus = 'verified' | 'pending' | 'unverified';

export type UserRole = 'buyer' | 'seller' | 'agent' | 'admin';

export type PropertyAmenity = 
  | 'parking' 
  | 'lift' 
  | 'security' 
  | 'water_supply' 
  | 'power_backup' 
  | 'garden' 
  | 'gym' 
  | 'clubhouse' 
  | 'swimming_pool' 
  | 'children_play_area' 
  | 'wifi' 
  | 'air_conditioning';

export type FacingDirection = 'north' | 'south' | 'east' | 'west' | 'northeast' | 'northwest' | 'southeast' | 'southwest';

export type LandType = 'agricultural' | 'residential' | 'commercial' | 'industrial';

export type RoadAccess = 'paved' | 'kutcha' | 'seasonal';

export interface User {
  id: string;
  email: string;
  phone: string;
  name: string;
  role: UserRole;
  avatar?: string;
  aadhaarVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id: string;
  city: string;
  locality: string;
  landmark?: string;
  pincode: string;
  latitude: number;
  longitude: number;
}

export interface PropertyMedia {
  id: string;
  type: 'image' | 'video' | 'virtual_tour';
  url: string;
  order: number;
}

export interface PropertyDocument {
  id: string;
  name: string;
  type: 'registry' | 'khata' | 'plot_map' | 'tax_receipt' | 'mutation' | 'rera' | 'other';
  url: string;
  verified: boolean;
  verifiedAt?: Date;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  status: ListingStatus;
  
  // Pricing
  price: number;
  pricePerUnit?: number;
  expectedRent?: number;
  
  // Configuration
  bedrooms?: number;
  bathrooms?: number;
  kitchens?: number;
  balconies?: number;
  carpetArea?: number;
  superArea?: number;
  plotArea?: number;
  length?: number;
  breadth?: number;
  
  // Location
  address: Address;
  localityRating?: number;
  
  // Property Specific
  floor?: number;
  totalFloors?: number;
  propertyAge?: number;
  facing?: FacingDirection;
  possessionDate?: Date;
  
  // Land/Plot Specific
  landType?: LandType;
  roadAccess?: RoadAccess;
  irrigationAvailable?: boolean;
  boundaryWall?: boolean;
  
  // Ownership
  ownership: 'freehold' | 'leasehold' | 'cooperative';
  
  // Media & Documents
  media: PropertyMedia[];
  documents: PropertyDocument[];
  
  // Verification
  verificationStatus: VerificationStatus;
  
  // Metadata
  ownerId: string;
  agentId?: string;
  amenities: PropertyAmenity[];
  isFeatured: boolean;
  views: number;
  saves: number;
  
  // Jharkhand Specific
  nearSchool: boolean;
  nearHospital: boolean;
  nearRailwayStation: boolean;
  nearIndustrialArea: boolean;
  distanceToSchool?: number;
  distanceToHospital?: number;
  distanceToRailway?: number;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export interface SiteVisit {
  id: string;
  propertyId: string;
  userId: string;
  agentId?: string;
  scheduledDate: Date;
  scheduledTime: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  notes?: string;
  feedback?: string;
  rating?: number;
  createdAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'document';
  read: boolean;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  participants: string[];
  propertyId?: string;
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  userId: string;
  propertyId?: string;
  locality?: string;
  rating: number;
  comment: string;
  waterRating?: number;
  electricityRating?: number;
  safetyRating?: number;
  createdAt: Date;
}

export interface Agent {
  id: string;
  userId: string;
  agencyName?: string;
  experience: number;
  specialization: PropertyType[];
  areas: string[];
  totalListings: number;
  totalDeals: number;
  rating: number;
  responseTime: number;
  verified: boolean;
  subscriptionTier: 'free' | 'basic' | 'professional' | 'enterprise';
  subscriptionExpiresAt?: Date;
}

export interface Lead {
  id: string;
  propertyId: string;
  userId: string;
  agentId: string;
  status: 'new' | 'contacted' | 'qualified' | 'site_visit' | 'negotiating' | 'closed' | 'lost';
  source: 'search' | 'featured' | 'referral' | 'advertisement';
  notes?: string;
  followUpDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  userId: string;
  type: 'listing_featured' | 'subscription' | 'verification' | 'lead_purchase';
  amount: number;
  currency: 'INR';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  orderId: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'new_listing' | 'price_drop' | 'site_visit_reminder' | 'message' | 'verification' | 'alert';
  title: string;
  body: string;
  data?: Record<string, any>;
  read: boolean;
  createdAt: Date;
}

export interface AreaReview {
  id: string;
  locality: string;
  city: string;
  waterRating: number;
  electricityRating: number;
  safetyRating: number;
  overallRating: number;
  comment: string;
  authorId: string;
  helpfulCount: number;
  createdAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface SearchFilters {
  query?: string;
  city?: string;
  locality?: string;
  propertyType?: PropertyType[];
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number[];
  areaMin?: number;
  areaMax?: number;
  amenities?: PropertyAmenity[];
  verificationStatus?: VerificationStatus[];
  nearSchool?: boolean;
  nearHospital?: boolean;
  nearRailwayStation?: boolean;
  landType?: LandType[];
  facing?: FacingDirection[];
  ownership?: ('freehold' | 'leasehold' | 'cooperative')[];
  sortBy?: 'price' | 'date' | 'views' | 'relevance';
  sortOrder?: 'asc' | 'desc';
  radius?: number;
  latitude?: number;
  longitude?: number;
}

// EMI Calculator
export interface EMIInput {
  principal: number;
  interestRate: number;
  tenureYears: number;
}

export interface EMIResult {
  emi: number;
  totalInterest: number;
  totalPayment: number;
  amortizationSchedule: {
    month: number;
    principal: number;
    interest: number;
    balance: number;
  }[];
}

// Price Intelligence
export interface PriceTrend {
  locality: string;
  propertyType: PropertyType;
  data: {
    date: string;
    avgPrice: number;
    count: number;
  }[];
}

export interface ComparableProperty {
  propertyId: string;
  location: string;
  saleDate: Date;
  price: number;
  propertyType: PropertyType;
  area: number;
  pricePerSqFt: number;
}

// Area Insight
export interface AreaInsight {
  id: string;
  locality: string;
  city: string;
  propertyType: PropertyType;
  avgPrice: number;
  pricePerSqFt: number;
  trend: 'up' | 'down' | 'stable';
  totalListings: number;
  updatedAt: Date;
}