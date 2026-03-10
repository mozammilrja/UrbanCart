import mongoose, { Document, Schema } from 'mongoose';

export interface IVariant {
  sku: string;
  size: string;
  color: string;
  colorHex?: string;
  price: number;
  comparePrice?: number;
  stock: number;
  images: string[];
  isActive: boolean;
}

export interface IProduct extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  brand?: string;
  category: mongoose.Types.ObjectId;
  collections: mongoose.Types.ObjectId[];
  tags: string[];
  variants: IVariant[];
  images: string[];
  thumbnail?: string;
  basePrice: number;
  comparePrice?: number;
  totalStock: number;
  soldCount: number;
  avgRating: number;
  reviewCount: number;
  isFeatured: boolean;
  isNewArrival: boolean;
  isActive: boolean;
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const variantSchema = new Schema<IVariant>(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    size: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    colorHex: String,
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    comparePrice: {
      type: Number,
      min: 0,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    images: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { _id: true }
);

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    shortDescription: String,
    brand: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Product category is required'],
    },
    collections: [{
      type: Schema.Types.ObjectId,
      ref: 'Collection',
    }],
    tags: [String],
    variants: [variantSchema],
    images: [String],
    thumbnail: String,
    basePrice: {
      type: Number,
      required: [true, 'Base price is required'],
      min: 0,
    },
    comparePrice: {
      type: Number,
      min: 0,
    },
    totalStock: {
      type: Number,
      default: 0,
      min: 0,
    },
    soldCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    avgRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isNewArrival: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
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

productSchema.pre('save', function (next) {
  if (this.variants && this.variants.length > 0) {
    this.totalStock = this.variants.reduce((sum, v) => sum + v.stock, 0);
    const prices = this.variants.map((v) => v.price);
    this.basePrice = Math.min(...prices);
  }
  next();
});

productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ slug: 1 });
productSchema.index({ category: 1 });
productSchema.index({ collections: 1 });
productSchema.index({ isActive: 1, isFeatured: 1 });
productSchema.index({ basePrice: 1 });
productSchema.index({ createdAt: -1 });

export const Product = mongoose.model<IProduct>('Product', productSchema);
