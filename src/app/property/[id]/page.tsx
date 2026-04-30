'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Header, Footer, Button, Badge, VerificationBadge, FeaturedBadge, PropertyTypeBadge, EMICalculator, Input, Textarea } from '@/components';
import { mockProperties, amenityLabels } from '@/lib/data';
import { formatPrice, formatDate, timeAgo, calculateEMI } from '@/lib/utils';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  Share2, 
  Heart, 
  Eye, 
  Phone, 
  MessageSquare, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle,
  X,
  Building2,
  Home,
  Clock,
  TrendingUp,
  FileText,
  ArrowLeft,
  Star,
  Video,
  Maximize2
} from 'lucide-react';
import { Property } from '@/types';

export default function PropertyDetailPage() {
  const params = useParams();
  const property = mockProperties.find((p) => p.id === params.id) || mockProperties[0];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'amenities' | 'location' | 'emi'>('overview');
  const [showContactForm, setShowContactForm] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.media.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.media.length) % property.media.length);
  };

  const shareProperty = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title}`,
        url: window.location.href,
      });
    }
  };

  const similarProperties = mockProperties
    .filter((p) => p.id !== property.id && p.type === property.type)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-primary-600">Home</Link>
              <span className="text-gray-400">/</span>
              <Link href="/properties" className="text-gray-500 hover:text-primary-600">Properties</Link>
              <span className="text-gray-400">/</span>
              <Link href={`/properties?city=${property.address.city}`} className="text-gray-500 hover:text-primary-600">
                {property.address.city}
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 truncate">{property.title}</span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="bg-white py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="relative">
              <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden relative">
                <Image
                  src={property.media[currentImageIndex]?.url || '/images/property-placeholder.jpg'}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {property.isFeatured && <FeaturedBadge />}
                  <PropertyTypeBadge type={property.type} />
                  <VerificationBadge status={property.verificationStatus} />
                </div>

                {/* Image nav */}
                {property.media.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full hover:bg-white shadow-lg"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full hover:bg-white shadow-lg"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 text-white text-sm rounded-full">
                  {currentImageIndex + 1} / {property.media.length}
                </div>
              </div>

              {/* Thumbnails */}
              {property.media.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {property.media.map((media, index) => (
                    <button
                      key={media.id}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex ? 'border-primary-500' : 'border-transparent'
                      }`}
                    >
                      <Image
                        src={media.url}
                        alt={`View ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Property Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h1>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{property.address.locality}, {property.address.city}</span>
                      {property.address.landmark && (
                        <>
                          <span className="mx-2">•</span>
                          <span>Near {property.address.landmark}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={shareProperty}
                      className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <Share2 className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => setIsSaved(!isSaved)}
                      className={`p-2 border rounded-lg ${isSaved ? 'bg-red-50 border-red-200' : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                      <Heart className={`w-5 h-5 ${isSaved ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                    </button>
                  </div>
                </div>

                {/* Key Stats */}
                <div className="flex flex-wrap gap-4 mb-4 text-sm">
                  <span className="flex items-center gap-1 text-gray-600">
                    <Eye className="w-4 h-4" /> {property.views} views
                  </span>
                  <span className="flex items-center gap-1 text-gray-600">
                    <Heart className="w-4 h-4" /> {property.saves} saves
                  </span>
                  <span className="flex items-center gap-1 text-gray-600">
                    <Clock className="w-4 h-4" /> Posted {timeAgo(property.createdAt)}
                  </span>
                </div>

                {/* Price */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-primary-600">
                      {formatPrice(property.price)}
                    </span>
                    {property.pricePerUnit && (
                      <span className="text-gray-500">
                        ₹{property.pricePerUnit.toLocaleString()}/sq.ft
                      </span>
                    )}
                  </div>
                  {property.expectedRent && (
                    <p className="text-sm text-gray-500 mt-1">
                      Expected Rent: ₹{property.expectedRent.toLocaleString()}/month
                    </p>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-xl overflow-hidden">
                <div className="border-b border-gray-100">
                  <div className="flex">
                    {(['overview', 'amenities', 'location', 'emi'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                          activeTab === tab
                            ? 'border-primary-600 text-primary-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      {/* Property Details */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {property.bedrooms && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <Bed className="w-5 h-5 text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">Bedrooms</p>
                                <p className="font-medium">{property.bedrooms}</p>
                              </div>
                            </div>
                          )}
                          {property.bathrooms && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <Bath className="w-5 h-5 text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">Bathrooms</p>
                                <p className="font-medium">{property.bathrooms}</p>
                              </div>
                            </div>
                          )}
                          {property.carpetArea && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <Square className="w-5 h-5 text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">Carpet Area</p>
                                <p className="font-medium">{property.carpetArea} sq.ft</p>
                              </div>
                            </div>
                          )}
                          {property.plotArea && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <Square className="w-5 h-5 text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">Plot Area</p>
                                <p className="font-medium">{property.plotArea} sq.ft</p>
                              </div>
                            </div>
                          )}
                          {property.floor && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <Building2 className="w-5 h-5 text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">Floor</p>
                                <p className="font-medium">{property.floor} of {property.totalFloors}</p>
                              </div>
                            </div>
                          )}
                          {property.propertyAge !== undefined && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <Home className="w-5 h-5 text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">Age of Property</p>
                                <p className="font-medium">{property.propertyAge} years</p>
                              </div>
                            </div>
                          )}
                          {property.facing && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <TrendingUp className="w-5 h-5 text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">Facing</p>
                                <p className="font-medium">{property.facing}</p>
                              </div>
                            </div>
                          )}
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <FileText className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-500">Ownership</p>
                              <p className="font-medium capitalize">{property.ownership}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                        <p className="text-gray-600 leading-relaxed">{property.description}</p>
                      </div>

                      {/* Property Features */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Features</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {property.nearSchool && (
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>Near School ({property.distanceToSchool} km)</span>
                            </div>
                          )}
                          {property.nearHospital && (
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>Near Hospital ({property.distanceToHospital} km)</span>
                            </div>
                          )}
                          {property.nearRailwayStation && (
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>Near Railway Station ({property.distanceToRailway} km)</span>
                            </div>
                          )}
                          {property.nearIndustrialArea && (
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>Near Industrial Area</span>
                            </div>
                          )}
                          {property.landType && (
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="capitalize">Land Type: {property.landType}</span>
                            </div>
                          )}
                          {property.roadAccess && (
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="capitalize">Road Access: {property.roadAccess}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Documents */}
                      {property.documents.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents</h3>
                          <div className="space-y-2">
                            {property.documents.map((doc) => (
                              <div
                                key={doc.id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                              >
                                <div className="flex items-center gap-3">
                                  <FileText className="w-5 h-5 text-gray-400" />
                                  <span className="text-sm">{doc.name}</span>
                                </div>
                                {doc.verified ? (
                                  <Badge variant="verified" size="sm">Verified</Badge>
                                ) : (
                                  <Badge variant="warning" size="sm">Pending</Badge>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'amenities' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {property.amenities.map((amenity) => (
                          <div key={amenity} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-sm">{amenityLabels[amenity] || amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'location' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Address</h3>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-gray-900">{property.address.locality}</p>
                          <p className="text-gray-500">{property.address.landmark}</p>
                          <p className="text-gray-500">{property.address.city}, {property.address.pincode}</p>
                        </div>
                      </div>
                      <div className="map-container h-64 rounded-lg">
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                          <MapPin className="w-12 h-12 text-gray-400" />
                          <span className="ml-2 text-gray-500">Map View</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'emi' && (
                    <EMICalculator />
                  )}
                </div>
              </div>

              {/* Similar Properties */}
              {similarProperties.length > 0 && (
                <div className="bg-white rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Properties</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {similarProperties.map((prop) => (
                      <Link key={prop.id} href={`/property/${prop.id}`}>
                        <div className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={prop.media[0]?.url || '/images/property-placeholder.jpg'}
                              alt={prop.title}
                              width={96}
                              height={96}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 line-clamp-1">{prop.title}</h4>
                            <p className="text-sm text-gray-500">{prop.address.locality}</p>
                            <p className="text-primary-600 font-semibold mt-1">{formatPrice(prop.price)}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Contact & Actions */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-white rounded-xl p-6 sticky top-20">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Owner</h3>
                
                {!showContactForm ? (
                  <>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-semibold">RS</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Rajan Sharma</p>
                        <p className="text-sm text-gray-500">Property Owner</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button className="w-full flex items-center justify-center gap-2" size="lg">
                        <Phone className="w-5 h-5" />
                        Show Phone Number
                      </Button>
                      <Button variant="secondary" className="w-full flex items-center justify-center gap-2" size="lg">
                        <MessageSquare className="w-5 h-5" />
                        Send Message
                      </Button>
                      <Button variant="outline" className="w-full flex items-center justify-center gap-2" size="lg">
                        <Calendar className="w-5 h-5" />
                        Schedule Visit
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <Input label="Your Name" placeholder="Enter your name" />
                    <Input label="Phone Number" type="tel" placeholder="Enter phone number" />
                    <Textarea label="Message" placeholder="I'm interested in this property..." rows={3} />
                    <Button className="w-full">Send Enquiry</Button>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 text-center">
                    Safety tip: Don't share personal info outside the platform
                  </p>
                </div>
              </div>

              {/* Actions Card */}
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Heart className="w-5 h-5 text-gray-400" />
                    <span>Add to Wishlist</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 className="w-5 h-5 text-gray-400" />
                    <span>Share Property</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <span>Download Brochure</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <ReportIcon className="w-5 h-5 text-gray-400" />
                    <span>Report Property</span>
                  </button>
                </div>
              </div>

              {/* Loan Calculator Quick View */}
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Home Loan Calculator</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Loan Amount</span>
                    <span className="font-medium">₹{((property.price * 0.8) / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interest Rate</span>
                    <span className="font-medium">8.5% p.a.</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tenure</span>
                    <span className="font-medium">20 years</span>
                  </div>
                  <div className="border-t border-primary-200 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span>Monthly EMI</span>
                      <span className="font-bold text-primary-600">
                        ₹{calculateEMI(property.price * 0.8, 8.5, 20).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="secondary" className="w-full mt-4">
                  Get Pre-Approval
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Report icon component
function ReportIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
      <line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
  );
}