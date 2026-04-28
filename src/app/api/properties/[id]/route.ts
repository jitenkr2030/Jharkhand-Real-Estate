import { NextResponse } from 'next/server';
import { mockProperties } from '@/lib/data';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const property = mockProperties.find(p => p.id === params.id);
  
  if (!property) {
    return NextResponse.json(
      { success: false, error: 'Property not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: property,
  });
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const params = await context.params;
    
    const updatedProperty = {
      id: params.id,
      ...body,
      updatedAt: new Date(),
    };

    return NextResponse.json({
      success: true,
      data: updatedProperty,
      message: 'Property updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  return NextResponse.json({
    success: true,
    message: 'Property deleted successfully',
  });
}