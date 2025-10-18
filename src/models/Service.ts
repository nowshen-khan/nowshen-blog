import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ServiceDocument extends Document {
  title: string;
  slug: string;
  description: string;
  icon: string;
  features: string[];
  price?: number;
  priceType: 'one-time' | 'monthly' | 'yearly' | 'free';
  duration?: string;
  isActive: boolean;
  order: number;
  image?: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<ServiceDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    description: {
      type: String,
      required: true,
      maxlength: 500
    },
    icon: {
      type: String,
      required: true,
      default: '🛠️'
    },
    features: [{
      type: String,
      trim: true
    }],
    price: {
      type: Number,
      min: 0
    },
    priceType: {
      type: String,
      enum: ['one-time', 'monthly', 'yearly', 'free'],
      default: 'one-time'
    },
    duration: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: true
    },
    order: {
      type: Number,
      default: 0
    },
    image: {
      type: String
    },
    seo: {
      metaTitle: {
        type: String,
        maxlength: 60
      },
      metaDescription: {
        type: String,
        maxlength: 160
      },
      keywords: [{
        type: String,
        trim: true
      }]
    }
  },
  {
    timestamps: true
  }
);

// Auto-generate slug
ServiceSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  next();
});

export const Service: Model<ServiceDocument> =
  mongoose.models.Service || mongoose.model<ServiceDocument>('Service', ServiceSchema);