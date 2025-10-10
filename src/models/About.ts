import mongoose, { Schema, Document, Model } from 'mongoose';

export interface AboutDocument extends Document {
  title: string;
  subtitle: string;
  content: string;
  image: string;
  imageAlt: string;
  experience: number;
  projects: number;
  clients: number;
  skills: string[];
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
    website?: string;
  };
  seo?: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage: string;
  };
  isActive: boolean;
  updatedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AboutSchema = new Schema<AboutDocument>(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
      default: 'About Me'
    },
    subtitle: {
      type: String,
      required: true,
      maxlength: 200,
      default: 'Learn more about my journey, skills, and experience'
    },
    content: {
      type: String,
      required: true,
      default: 'I am a passionate professional with expertise in various technologies. I love creating meaningful solutions and sharing knowledge through my work.'
    },
    image: {
      type: String,
      required: true,
      default: '/default-about.jpg'
    },
    imageAlt: {
      type: String,
      default: 'Professional portrait'
    },
    experience: {
      type: Number,
      default: 0,
      min: 0
    },
    projects: {
      type: Number,
      default: 0,
      min: 0
    },
    clients: {
      type: Number,
      default: 0,
      min: 0
    },
    skills: [{
      type: String,
      trim: true
    }],
    socialLinks: {
      github: { type: String },
      linkedin: { type: String },
      twitter: { type: String },
      email: { type: String },
      website: { type: String }
    },
    seo: {
      metaTitle: {
        type: String,
        maxlength: 60,
        default: 'About Me - Professional Profile & Experience'
      },
      metaDescription: {
        type: String,
        maxlength: 160,
        default: 'Learn about my professional journey, skills, and experience in technology and development.'
      },
      keywords: [{
        type: String,
        trim: true
      }],
      ogImage: {
        type: String,
        default: '/og-about.jpg'
      }
    },
    isActive: {
      type: Boolean,
      default: true
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Create a single document
AboutSchema.statics.getAboutPage = async function() {
  try {
    let about = await this.findOneAndUpdate(  { isActive: true },
      { new: true, upsert: true });
    if (!about) {
      // Create default about page
      about = new this({
        title: 'About Me',
        subtitle: 'Professional Developer & Technology Enthusiast',
        content: `I'm a passionate developer with expertise in modern web technologies. I enjoy creating innovative solutions and sharing knowledge with the community.

With years of experience in full-stack development, I've worked on various projects ranging from small startups to enterprise applications. My approach combines technical excellence with user-centered design.

When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my insights through blog posts and tutorials.`,
        image: '/default-about.jpg',
        experience: 5,
        projects: 50,
        clients: 25,
        skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
        socialLinks: {
          github: 'https://github.com/username',
          linkedin: 'https://linkedin.com/in/username',
          email: 'hello@example.com'
        },
        seo: {
          metaTitle: 'About Me - Professional Developer Profile',
          metaDescription: 'Learn about my professional journey as a full-stack developer, my skills in modern technologies, and my experience building scalable web applications.',
          keywords: ['developer', 'full-stack', 'web development', 'programming', 'technology'],
          ogImage: '/og-about.jpg'
        },
        updatedBy: new mongoose.Types.ObjectId()
      });
      await about.save();
    }
    
    // Ensure SEO field exists
    if (!about.seo) {
      about.seo = {
        metaTitle: about.title + ' - Professional Profile',
        metaDescription: about.subtitle,
        keywords: ['developer', 'professional', 'about'],
        ogImage: about.image
      };
      await about.save();
    }
    
    return about;
  } catch (error) {
    console.error('Error in getAboutPage:', error);
    throw error;
  }
};


export const About: Model<AboutDocument> =
  mongoose.models.About || mongoose.model<AboutDocument>('About', AboutSchema);