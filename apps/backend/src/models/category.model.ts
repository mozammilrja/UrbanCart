import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent?: mongoose.Types.ObjectId;
  ancestors: mongoose.Types.ObjectId[];
  level: number;
  order: number;
  isActive: boolean;
  productCount: number;
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: String,
    image: String,
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
    },
    ancestors: [{
      type: Schema.Types.ObjectId,
      ref: 'Category',
    }],
    level: {
      type: Number,
      default: 0,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
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

categorySchema.virtual('children', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parent',
});

categorySchema.pre('save', async function (next) {
  if (this.isModified('parent')) {
    if (this.parent) {
      const parentCategory = await mongoose.model('Category').findById(this.parent);
      if (parentCategory) {
        this.ancestors = [...parentCategory.ancestors, parentCategory._id];
        this.level = parentCategory.level + 1;
      }
    } else {
      this.ancestors = [];
      this.level = 0;
    }
  }
  next();
});

categorySchema.index({ slug: 1 });
categorySchema.index({ parent: 1 });
categorySchema.index({ isActive: 1, order: 1 });

export const Category = mongoose.model<ICategory>('Category', categorySchema);
