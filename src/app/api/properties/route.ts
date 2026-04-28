import { NextResponse } from 'next/server';
import { mockProperties } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const city = searchParams.get('city');
  const type = searchParams.get('type');
  const priceMin = searchParams.get('priceMin');
  const priceMax = searchParams.get('priceMax');
  const locality = searchParams.get('locality');
  const query = searchParams.get('q');
  const featured = searchParams.get('featured');
  const sortBy = searchParams.get('sortBy') || 'relevance';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');

  let filtered = [...mockProperties];

  // Apply filters
  if (city) {
    filtered = filtered.filter(p => p.address.city.toLowerCase() === city.toLowerCase());
  }
  if (type) {
    const types = type.split(',');
    filtered = filtered.filter(p => types.includes(p.type));
  }
  if (priceMin) {
    filtered = filtered.filter(p => p.price >= parseFloat(priceMin));
  }
  if (priceMax) {
    filtered = filtered.filter(p => p.price <= parseFloat(priceMax));
  }
  if (locality) {
    filtered = filtered.filter(p => p.address.locality.toLowerCase().includes(locality.toLowerCase()));
  }
  if (query) {
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.address.locality.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );
  }
  if (featured === 'true') {
    filtered = filtered.filter(p => p.isFeatured);
  }

  // Sort
  switch (sortBy) {
    case 'price_low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price_high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case 'most_viewed':
      filtered.sort((a, b) => b.views - a.views);
      break;
    default:
      filtered.sort((a, b) => b.views - a.views);
  }

  // Pagination
  const total = filtered.length;
  const startIndex = (page - 1) * limit;
  const paginatedData = filtered.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    success: true,
    data: {
      items: paginatedData,
      total,
      page,
      pageSize: limit,
      totalPages: Math.ceil(total / limit),
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const required = ['title', 'description', 'type', 'price', 'city', 'locality', 'ownerId'];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create new property (in real app, save to database)
    const newProperty = {
      id: `prop-${Date.now()}`,
      ...body,
      status: 'active',
      views: 0,
      saves: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return NextResponse.json({
      success: true,
      data: newProperty,
      message: 'Property created successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }
}