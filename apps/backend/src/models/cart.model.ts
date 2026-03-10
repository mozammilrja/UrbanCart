import mongoose, { Document, Schema } from 'mongoose';

export interface ICartItem {
  product: mongoose.Types.ObjectId;
  variant: {
    sku: string;
    size: string;
    color: string;
  };
  quantity: number;
  price: number;
  addedAt: Date;
}

export interface ICart extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  items: ICartItem[];
  coupon?: {
    code: string;
    discount: number;
    discountType: 'percentage' | 'fixed';
  };
  subtotal: number;
  discount: number;
  shippingCharge: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

const cartItemSchema = new Schema<ICartItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    variant: {
      sku: { type: String, required: true },
      size: { type: String, required: true },
      color: { type: String, required: true },
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const cartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
    coupon: {
      code: String,
      discount: Number,
      discountType: {
        type: String,
        enum: ['percentage', 'fixed'],
      },
    },
    subtotal: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    shippingCharge: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

cartSchema.methods.calculateTotals = function (freeShippingThreshold: number, shippingCharge: number) {
  this.subtotal = this.items.reduce(
    (sum: number, item: ICartItem) => sum + item.price * item.quantity,
    0
  );
  
  if (this.coupon) {
    if (this.coupon.discountType === 'percentage') {
      this.discount = Math.round((this.subtotal * this.coupon.discount) / 100);
    } else {
      this.discount = this.coupon.discount;
    }
  } else {
    this.discount = 0;
  }
  
  const afterDiscount = this.subtotal - this.discount;
  this.shippingCharge = afterDiscount >= freeShippingThreshold ? 0 : shippingCharge;
  this.total = afterDiscount + this.shippingCharge;
};

cartSchema.index({ user: 1 });

export const Cart = mongoose.model<ICart>('Cart', cartSchema);
