import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Contact } from '@/models/Contact';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { name, email, phone, subject, message, service } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Name, email, subject, and message are required' },
        { status: 400 }
      );
    }

    // Get client info
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Create contact submission
    const contact = new Contact({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim(),
      subject: subject.trim(),
      message: message.trim(),
      service: service?.trim(),
      ipAddress,
      userAgent,
      status: 'new'
    });

    await contact.save();

    // Here you can add email notification logic
    // await sendEmailNotification(contact);

    return NextResponse.json(
      { 
        success: true,
        message: 'Thank you for your message! We will get back to you soon.',
        contactId: contact._id
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Contact form error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: errors.join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Admin route to fetch contact submissions
export async function GET(request: NextRequest) {
  try {
    // Add admin authentication here
    // const session = await getServerSession();
    // if (!session || session.user.role !== 'admin') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (status && status !== 'all') {
      filter.status = status;
    }

    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Contact.countDocuments(filter);
    const newCount = await Contact.countDocuments({ status: 'new' });

    return NextResponse.json({
      contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      counts: {
        new: newCount,
        total
      }
    });
  } catch (error) {
    console.error('Failed to fetch contacts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}