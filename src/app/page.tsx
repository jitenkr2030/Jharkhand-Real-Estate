import Link from 'next/link';
import Image from 'next/image';
import { 
  Home, 
  Search, 
  Shield, 
  TrendingUp, 
  MapPin, 
  Building2, 
  Users, 
  CheckCircle,
  Star,
  ArrowRight,
  Mic,
  FileCheck,
  LandPlot,
  Building,
  Warehouse,
  TreePine
} from 'lucide-react';
import { Header, Footer, PropertyCard, Button } from '@/components';
import { mockProperties, mockCities, propertyTypeLabels } from '@/lib/data';

const stats = [
  { value: '10,000+', label: 'Properties Listed', icon: Building2 },
  { value: '5,000+', label: 'Happy Customers', icon: Users },
  { value: '2,500+', label: 'Verified Listings', icon: CheckCircle },
  { value: '98%', label: 'Customer Satisfaction', icon: Star },
];

const features = [
  {
    icon: Shield,
    title: 'Verified Properties',
    description: 'All properties are verified by our team to ensure genuine listings and prevent fraud.',
  },
  {
    icon: FileCheck,
    title: 'Document Verification',
    description: 'We verify registry documents, khata certificates, and other legal documents.',
  },
  {
    icon: LandPlot,
    title: 'Plot & Land Focus',
    description: 'Specialized in plots and agricultural land, common in Jharkhand market.',
  },
  {
    icon: MapPin,
    title: 'Hyperlocal Search',
    description: 'Find properties within 1-5 km radius near schools, hospitals, and railway stations.',
  },
  {
    icon: TrendingUp,
    title: 'Price Intelligence',
    description: 'Access area price trends and comparable sales data to make informed decisions.',
  },
  {
    icon: Mic,
    title: 'Voice Search',
    description: 'Search properties using voice commands in Hindi or English for easy access.',
  },
];

const propertyTypes = [
  { type: 'apartment', label: 'Apartments', icon: Building, count: 1250 },
  { type: 'independent_house', label: 'Houses', icon: Home, count: 890 },
  { type: 'plot', label: 'Plots', icon: LandPlot, count: 650 },
  { type: 'villa', label: 'Villas', icon: Building2, count: 320 },
  { type: 'agricultural_land', label: 'Farm Land', icon: TreePine, count: 180 },
  { type: 'commercial', label: 'Commercial', icon: Warehouse, count: 150 },
];

export default function HomePage() {
  const featuredProperties = mockProperties.filter((p) => p.isFeatured).slice(0, 4);
  const recentProperties = mockProperties.slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-16 lg:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/pattern-grid.svg')] bg-repeat" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
                Find Your Perfect
                <span className="block text-yellow-300">Property with Baraik Brothers</span>
              </h1>
              <p className="text-lg lg:text-xl text-primary-100 mb-8 max-w-xl">
                Discover verified plots, apartments, villas, and agricultural land in Ranchi, Jamshedpur, Dhanbad, and more. Direct owner listings, RERA verified.
              </p>
              
              {/* Quick search */}
              <div className="bg-white rounded-xl p-4 shadow-xl">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option value="">Select City</option>
                      {mockCities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option value="">Property Type</option>
                      {Object.entries(propertyTypeLabels).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Search locality..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <Link href="/properties">
                    <Button size="lg" className="whitespace-nowrap">
                      <Search className="w-5 h-5 mr-2" />
                      Search
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Quick filters */}
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="text-sm text-primary-200">Popular:</span>
                {['Plots in Ranchi', '2BHK in Jamshedpur', 'Farm Land', 'Commercial'].map((tag) => (
                  <Link
                    key={tag}
                    href={`/properties?q=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-sm transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Stats card */}
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold mb-4">Why Choose Us?</h3>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center p-4 bg-white/10 rounded-xl">
                      <stat.icon className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-primary-200">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Browse by Property Type</h2>
              <p className="text-gray-500 mt-1">Find exactly what you are looking for</p>
            </div>
            <Link href="/properties" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {propertyTypes.map((item) => (
              <Link
                key={item.type}
                href={`/properties?type=${item.type}`}
                className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-600 transition-colors">
                  <item.icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-medium text-gray-900">{item.label}</h3>
                <p className="text-sm text-gray-500">{item.count}+ listings</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                Featured
              </span>
              <h2 className="text-2xl font-bold text-gray-900 mt-2">Premium Properties</h2>
            </div>
            <Link href="/properties?featured=true" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Explore Popular Cities</h2>
            <p className="text-gray-500 mt-1">Find properties in the most sought-after locations</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCities.slice(0, 6).map((city, index) => (
              <Link
                key={city}
                href={`/properties?city=${city}`}
                className="relative bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl p-6 text-white overflow-hidden group hover:shadow-xl transition-all"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12" />
                <div className="relative">
                  <h3 className="text-xl font-bold mb-1">{city}</h3>
                  <p className="text-primary-100 text-sm">
                    {Math.floor(Math.random() * 500 + 100)}+ Properties
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Why Jharkhand Property?
            </h2>
            <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
              We understand the local market better than anyone. Here is what makes us different.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Properties */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Recently Added</h2>
              <p className="text-gray-500 mt-1">Fresh listings from sellers and agents</p>
            </div>
            <Link href="/properties?sort=newest" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect property through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 w-full sm:w-auto">
                Browse Properties
              </Button>
            </Link>
            <Link href="/post-property">
              <Button size="lg" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                Post Your Property
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}