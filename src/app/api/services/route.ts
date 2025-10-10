import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Service } from '@/models/Service';

// GET - Public route to fetch all active services
export async function GET() {
  try {
    await connectDB();
    
    const services = await Service.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 });

    return NextResponse.json(services);
  } catch (error) {
    console.error('Failed to fetch services:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Admin route to create new service
export async function POST(request: NextRequest) {
  try {
    // You can add admin authentication here
    // const session = await getServerSession();
    // if (!session || session.user.role !== 'admin') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    await connectDB();
    
    const body = await request.json();
    
    const service = new Service(body);
    await service.save();

    return NextResponse.json(service, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create service:', error);
    
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