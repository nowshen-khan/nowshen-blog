import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  image?: string;
  role: 'admin' | 'author' | 'user';
  bio?: string;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false 
    },
    image: {
      type: String,
      default: '/default-avatar.png'
    },
    role: {
      type: String,
      enum: ['admin', 'author', 'user'],
      default: 'user'
    },
    bio: {
      type: String,
      maxlength: 500
    },
    isActive: {
      type: Boolean,
      default: true
    },
    emailVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Static method to create first admin user
UserSchema.statics.createFirstAdmin = async function () {
  const adminCount = await this.countDocuments({ role: 'admin' });
  if (adminCount === 0) {
    const adminUser = new this({
      name: process.env.ADMIN_NAME, // 'Admin'
      email: process.env.ADMIN_EMAIL, // 'admin@example.com'
      password: process.env.ADMIN_PASSWORD, // 'admin123'
      role: 'admin',
      emailVerified: true
    });
    await adminUser.save();
    console.log('First admin user created:', adminUser.email);
  }
};

export const User: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);