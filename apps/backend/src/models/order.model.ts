import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  variant: {
    sku: string;
    size: string;
    color: string;
  };
  name: string;
  image: string;
  price: number;
  quantity: number;
  total: number;
}

export interface IOrderAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export interface ITimelineEvent {
  status: string;
  message: string;
  timestamp: Date;
}

export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId;
  orderNumber: string;
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  shippingAddress: IOrderAddress;
  billingAddress: IOrderAddress;
  subtotal: number;
  shippingCharge: number;
  discount: number;
  tax: number;
  total: number;
  coupon?: {
    code: string;
    discount: number;
  };
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'razorpay' | 'cod';
  razorpay?: {
    orderId: string;
    paymentId?: string;
    signature?: string;
  };
  timeline: ITimelineEvent[];
  trackingNumber?: string;
  carrier?: string;
  notes?: string;
  cancelReason?: string;
  returnReason?: string;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>(
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
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    total: { type: Number, required: true },
  },
  { _id: false }
);

const addressSchema = new Schema<IOrderAddress>(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    landmark: String,
  },
  { _id: false }
);

const timelineSchema = new Schema<ITimelineEvent>(
  {
    status: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [orderItemSchema],
    shippingAddress: {
      type: addressSchema,
      required: true,
    },
    billingAddress: {
      type: addressSchema,
      required: true,
    },
    subtotal: { type: Number, required: true },
    shippingCharge: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, required: true },
    coupon: {
      code: String,
      discount: Number,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['razorpay', 'cod'],
      required: true,
    },
    razorpay: {
      orderId: String,
      paymentId: String,
      signature: String,
    },
    timeline: [timelineSchema],
    trackingNumber: String,
    carrier: String,
    notes: String,
    cancelReason: String,
    returnReason: String,
    deliveredAt: Date,
  },
  {
    timestamps: true,
  }
);

orderSchema.pre('save', function (next) {
  if (this.isNew) {
    this.timeline.push({
      status: 'pending',
      message: 'Order placed successfully',
      timestamp: new Date(),
    });
  }
  next();
});

orderSchema.index({ orderNumber: 1 });
orderSchema.index({ user: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

export const Order = mongoose.model<IOrder>('Order', orderSchema);
