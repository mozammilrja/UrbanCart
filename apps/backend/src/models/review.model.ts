import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  order?: mongoose.Types.ObjectId;
  rating: number;
  title?: string;
  comment: string;
  images: string[];
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  helpfulVotes: mongoose.Types.ObjectId[];
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, 'Review comment is required'],
      trim: true,
      maxlength: 2000,
    },
    images: [String],
    isVerifiedPurchase: {
      type: Boolean,
      default: false,
    },
    helpfulCount: {
      type: Number,
      default: 0,
    },
    helpfulVotes: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    isApproved: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.post('save', async function () {
  await updateProductRating(this.product);
});

reviewSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await updateProductRating(doc.product);
  }
});

async function updateProductRating(productId: mongoose.Types.ObjectId) {
  const Review = mongoose.model('Review');
  const Product = mongoose.model('Product');
  
  const stats = await Review.aggregate([
    { $match: { product: productId, isApproved: true } },
    {
      $group: {
        _id: '$product',
        avgRating: { $avg: '$rating' },
        count: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      avgRating: Math.round(stats[0].avgRating * 10) / 10,
      reviewCount: stats[0].count,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      avgRating: 0,
      reviewCount: 0,
    });
  }
}

reviewSchema.index({ product: 1, user: 1 }, { unique: true });
reviewSchema.index({ product: 1, isApproved: 1 });
reviewSchema.index({ user: 1 });

export const Review = mongoose.model<IReview>('Review', reviewSchema);
