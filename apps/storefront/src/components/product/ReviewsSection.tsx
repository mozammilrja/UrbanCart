'use client';

import { useState } from 'react';
import { Star, ThumbsUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Review {
  id: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  isVerified: boolean;
  helpful: number;
}

// Placeholder reviews for display before API integration
const placeholderReviews: Review[] = [
  {
    id: '1',
    userName: 'Arjun K.',
    rating: 5,
    title: 'Amazing quality!',
    comment: 'The fabric quality is incredible for this price. Fits perfectly and the print is very clean. Will definitely buy more from APOSTLE.',
    date: '2 weeks ago',
    isVerified: true,
    helpful: 12,
  },
  {
    id: '2',
    userName: 'Priya M.',
    rating: 4,
    title: 'Great fit, runs slightly large',
    comment: 'Love the design and material. I usually wear M but this runs a bit large. Consider sizing down. The quality is top notch though.',
    date: '1 month ago',
    isVerified: true,
    helpful: 8,
  },
  {
    id: '3',
    userName: 'Rohit S.',
    rating: 5,
    title: 'Best streetwear brand in India',
    comment: 'Been buying from APOSTLE since their first drop. Consistent quality and unique designs. This piece is no exception.',
    date: '1 month ago',
    isVerified: true,
    helpful: 15,
  },
];

const ratingBreakdown = { 5: 65, 4: 20, 3: 10, 2: 3, 1: 2 };

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  const starSize = size === 'lg' ? 'w-5 h-5' : 'w-3.5 h-3.5';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            starSize,
            star <= rating ? 'fill-amber-400 text-amber-400' : 'fill-[#e5e5e5] text-[#e5e5e5]'
          )}
        />
      ))}
    </div>
  );
}

export function ReviewsSection({ productId }: { productId: string }) {
  const [showAll, setShowAll] = useState(false);
  const reviews = placeholderReviews;
  const avgRating = 4.5;
  const totalReviews = 100;
  const displayedReviews = showAll ? reviews : reviews.slice(0, 2);

  return (
    <div className="border-t border-[#e5e5e5] pt-8 mt-8">
      <h2 className="text-xl font-bold mb-6">Ratings & Reviews</h2>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
        {/* Rating Summary */}
        <div className="bg-[#fafafa] rounded-2xl p-6">
          <div className="text-center mb-4">
            <p className="text-5xl font-bold">{avgRating}</p>
            <StarRating rating={Math.round(avgRating)} size="lg" />
            <p className="text-sm text-[#777] mt-2">{totalReviews} ratings</p>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const pct = ratingBreakdown[star as keyof typeof ratingBreakdown] || 0;
              return (
                <div key={star} className="flex items-center gap-2 text-sm">
                  <span className="w-3 text-right">{star}</span>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <div className="flex-1 h-2 bg-[#e5e5e5] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-[#999]">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {displayedReviews.map((review) => (
            <div key={review.id} className="border-b border-[#f0f0f0] pb-6 last:border-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <StarRating rating={review.rating} />
                  <h4 className="font-semibold text-sm mt-1">{review.title}</h4>
                </div>
                <span className="text-xs text-[#999] whitespace-nowrap">{review.date}</span>
              </div>

              <p className="text-sm text-[#555] leading-relaxed mb-3">{review.comment}</p>

              <div className="flex items-center gap-4">
                <span className="text-xs text-[#777]">
                  {review.userName}
                  {review.isVerified && (
                    <span className="ml-2 text-green-600 font-medium">✓ Verified Purchase</span>
                  )}
                </span>
                <button className="flex items-center gap-1 text-xs text-[#999] hover:text-[#111] transition-colors">
                  <ThumbsUp className="w-3 h-3" />
                  Helpful ({review.helpful})
                </button>
              </div>
            </div>
          ))}

          {reviews.length > 2 && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="flex items-center gap-2 text-sm font-medium text-[#111] hover:underline"
            >
              View All {reviews.length} Reviews
              <ChevronDown className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
