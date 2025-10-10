import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Contact } from '@/models/Contact';

// GET single contact
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Add admin authentication here
    await connectDB();
    
    const { id } = params;
    
    const contact = await Contact.findById(id);

    if (!contact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(contact);
  } catch (error) {
    console.error('Failed to fetch contact:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// UPDATE contact status
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Add admin authentication here
    await connectDB();
    
    const { id } = params;
    const body = await request.json();

    const contact = await Contact.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!contact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(contact);
  } catch (error) {
    console.error('Failed to update contact:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE contact
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Add admin authentication here
    await connectDB();
    
    const { id } = params;

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Failed to delete contact:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}