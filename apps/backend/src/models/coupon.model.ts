import mongoose, { Document, Schema } from 'mongoose';

export interface ICoupon extends Document {
  _id: mongoose.Types.ObjectId;
  code: string;
  description?: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  usedCount: number;
  perUserLimit: number;
  usedBy: {
    user: mongoose.Types.ObjectId;
    usedAt: Date;
    orderId: mongoose.Types.ObjectId;
  }[];
  applicableProducts: mongoose.Types.ObjectId[];
  applicableCategories: mongoose.Types.ObjectId[];
  applicableCollections: mongoose.Types.ObjectId[];
  excludedProducts: mongoose.Types.ObjectId[];
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  isFirstOrderOnly: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const couponSchema = new Schema<ICoupon>(
  {
    code: {
      type: String,
      required: [true, 'Coupon code is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    description: String,
    discountType: {
      type: String,
      enum: ['percentage', 'fixed'],
      required: true,
    },
    discountValue: {
      type: Number,
      required: [true, 'Discount value is required'],
      min: 0,
    },
    minOrderAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    maxDiscountAmount: {
      type: Number,
      min: 0,
    },
    usageLimit: {
      type: Number,
      min: 0,
    },
    usedCount: {
      type: Number,
      default: 0,
    },
    perUserLimit: {
      type: Number,
      default: 1,
      min: 1,
    },
    usedBy: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      usedAt: {
        type: Date,
        default: Date.now,
      },
      orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
    }],
    applicableProducts: [{
      type: Schema.Types.ObjectId,
      ref: 'Product',
    }],
    applicableCategories: [{
      type: Schema.Types.ObjectId,
      ref: 'Category',
    }],
    applicableCollections: [{
      type: Schema.Types.ObjectId,
      ref: 'Collection',
    }],
    excludedProducts: [{
      type: Schema.Types.ObjectId,
      ref: 'Product',
    }],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFirstOrderOnly: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

couponSchema.methods.isValid = function (): boolean {
  const now = new Date();
  return (
    this.isActive &&
    now >= this.startDate &&
    now <= this.endDate &&
    (!this.usageLimit || this.usedCount < this.usageLimit)
  );
};

couponSchema.methods.calculateDiscount = function (amount: number): number {
  if (amount < this.minOrderAmount) return 0;
  
  let discount = 0;
  if (this.discountType === 'percentage') {
    discount = Math.round((amount * this.discountValue) / 100);
  } else {
    discount = this.discountValue;
  }
  
  if (this.maxDiscountAmount && discount > this.maxDiscountAmount) {
    discount = this.maxDiscountAmount;
  }
  
  return Math.min(discount, amount);
};

couponSchema.index({ code: 1 });
couponSchema.index({ isActive: 1, startDate: 1, endDate: 1 });

export const Coupon = mongoose.model<ICoupon>('Coupon', couponSchema);
