import mongoose, { Document, Schema } from 'mongoose';

export interface ICollection extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  image?: string;
  banner?: string;
  type: 'curated' | 'drop' | 'seasonal' | 'sale';
  dropDate?: Date;
  endDate?: Date;
  isLive: boolean;
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  productCount: number;
  products: mongoose.Types.ObjectId[];
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const collectionSchema = new Schema<ICollection>(
  {
    name: {
      type: String,
      required: [true, 'Collection name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: String,
    shortDescription: String,
    image: String,
    banner: String,
    type: {
      type: String,
      enum: ['curated', 'drop', 'seasonal', 'sale'],
      default: 'curated',
    },
    dropDate: Date,
    endDate: Date,
    isLive: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    products: [{
      type: Schema.Types.ObjectId,
      ref: 'Product',
    }],
    order: {
      type: Number,
      default: 0,
    },
    productCount: {
      type: Number,
      default: 0,
    },
    seo: {
      title: String,
      description: String,
      keywords: [String],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

collectionSchema.index({ slug: 1 });
collectionSchema.index({ type: 1, isActive: 1 });
collectionSchema.index({ dropDate: 1 });
collectionSchema.index({ isActive: 1, order: 1 });

export const Collection = mongoose.model<ICollection>('Collection', collectionSchema);
