import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ContactDocument extends Document {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  service?: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<ContactDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
      type: String,
      trim: true
    },
    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    message: {
      type: String,
      required: true,
      maxlength: 2000
    },
    service: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'closed'],
      default: 'new'
    },
    ipAddress: {
      type: String
    },
    userAgent: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export const Contact: Model<ContactDocument> =
  mongoose.models.Contact || mongoose.model<ContactDocument>('Contact', ContactSchema);