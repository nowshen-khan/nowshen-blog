import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Service } from '@/models/Service';

// GET - Public route to fetch single service by ID or slug
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const { id } = params;
    
    // Check if it's a valid ObjectId or slug
    const service = await Service.findOne({
      $or: [
        { _id: id },
        { slug: id }
      ],
      isActive: true
    });

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error('Failed to fetch service:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Admin route to update service
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Add admin authentication here
    await connectDB();
    
    const { id } = params;
    const body = await request.json();

    const service = await Service.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(service);
  } catch (error: any) {
    console.error('Failed to update service:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Service with this slug already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Admin route to delete service
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Add admin authentication here
    await connectDB();
    
    const { id } = params;

    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Failed to delete service:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}