# T-ADMIN-012: Orders List

## Page Overview
Order management with filtering, status updates, bulk actions, and quick order preview.

## Wireframe

### Desktop (1440px+)
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ ☰ APOSTLE ADMIN                              🔔 (3)  👤 Admin ▼   [Storefront]│
├────────────────────┬────────────────────────────────────────────────────────────┤
│                    │                                                            │
│  DASHBOARD         │  Orders                                                    │
│                    │                                                            │
│  📊 Dashboard      │  ORDERS                                                    │
│  📦 Products       │  ══════                                                    │
│  🏷️ Collections    │                                                            │
│  📋 Orders         │  ┌─────────────────────────────────────────────────────────┐│
│     ═══════        │  │ 🔍 Search orders, customers...                         ││
│     └ All Orders   │  └─────────────────────────────────────────────────────────┘│
│     └ Returns      │                                                            │
│  👥 Customers      │  ┌─────────────────────────────────────────────────────────┐│
│  💳 Payments       │  │ [All] [Pending (5)] [Processing (3)] [Shipped (8)]     ││
│  📈 Analytics      │  │ [Delivered] [Cancelled] [Returns (2)]                  ││
│  🎫 Coupons        │  │                                                         ││
│  ⚙️ Settings       │  │ Filters: [Date Range ▼] [Payment ▼]     [Clear Filters]││
│                    │  └─────────────────────────────────────────────────────────┘│
│                    │                                                            │
│                    │  Showing 156 orders                          [Export CSV]  │
│                    │                                                            │
│                    │  ┌─────────────────────────────────────────────────────────┐│
│                    │  │ ☐ │ Order      │ Date       │ Customer    │ Total     │S││
│                    │  │───┼────────────┼────────────┼─────────────┼───────────┼─││
│                    │  │ ☐ │ #12350     │ Mar 15     │ Priya       │ ₹5,497    │ ││
│                    │  │   │ 3 items    │ 10:34 AM   │ Sharma      │           │🟡││
│                    │  │   │            │            │             │ Pending   │ ││
│                    │  │───┼────────────┼────────────┼─────────────┼───────────┼─││
│                    │  │ ☐ │ #12349     │ Mar 15     │ Rahul       │ ₹3,998    │ ││
│                    │  │   │ 2 items    │ 9:15 AM    │ Kumar       │           │🟠││
│                    │  │   │            │            │             │Processing │ ││
│                    │  │───┼────────────┼────────────┼─────────────┼───────────┼─││
│                    │  │ ☐ │ #12348     │ Mar 14     │ Sneha       │ ₹2,499    │ ││
│                    │  │   │ 1 item     │ 6:45 PM    │ Patel       │           │🚚││
│                    │  │   │            │            │             │ Shipped   │ ││
│                    │  │───┼────────────┼────────────┼─────────────┼───────────┼─││
│                    │  │ ☐ │ #12347     │ Mar 14     │ Amit        │ ₹8,996    │ ││
│                    │  │   │ 4 items    │ 2:30 PM    │ Singh       │           │🟢││
│                    │  │   │            │            │             │ Delivered │ ││
│                    │  │───┼────────────┼────────────┼─────────────┼───────────┼─││
│                    │  │ ☐ │ #12346     │ Mar 14     │ Neha        │ ₹4,498    │ ││
│                    │  │   │ 2 items    │ 11:20 AM   │ Gupta       │           │🔴││
│                    │  │   │            │            │             │ Cancelled │ ││
│                    │  └─────────────────────────────────────────────────────────┘│
│                    │                                                            │
│                    │  ┌─────────────────────────────────────────────────────────┐│
│                    │  │ [←] Page 1 of 16 [→]     [25 ▼] per page   156 orders  ││
│                    │  └─────────────────────────────────────────────────────────┘│
│                    │                                                            │
├────────────────────┴────────────────────────────────────────────────────────────┤
│  © 2024 APOSTLE Admin                                                         │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Status Badges

### Order Statuses
```
🟡 Pending     - Payment confirmed, awaiting processing
🟠 Processing  - Order being packed
📦 Ready       - Ready for pickup/shipping
🚚 Shipped     - In transit
🟢 Delivered   - Successfully delivered
🔴 Cancelled   - Order cancelled
↩️ Returned    - Return completed
⚠️ Failed      - Payment/delivery failed
```

## Filters

### Status Tabs
```
[All (156)] [Pending (5)] [Processing (3)] [Shipped (8)] [Delivered (120)] [Cancelled (15)] [Returns (5)]

Active tab: underlined/highlighted
Tab with count badge
```

### Filter Dropdowns
```
Date Range:
┌─────────────────────────┐
│ All time                │
├─────────────────────────┤
│ Today                   │
│ Yesterday               │
│ Last 7 days             │
│ Last 30 days            │
│ This month              │
│ Last month              │
│ Custom range...         │
└─────────────────────────┘

Payment Status:
┌─────────────────────────┐
│ All                     │
├─────────────────────────┤
│ Paid                    │
│ Pending                 │
│ Refunded                │
│ Partially refunded      │
│ Failed                  │
└─────────────────────────┘

Fulfillment:
┌─────────────────────────┐
│ All                     │
├─────────────────────────┤
│ Unfulfilled             │
│ Partially fulfilled     │
│ Fulfilled               │
└─────────────────────────┘
```

## Order Row

### Expanded View (on click)
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ #12350                                                           Mar 15, 10:34 AM│
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│ CUSTOMER                          ITEMS                                         │
│ Priya Sharma                      ┌────────────────────────────────────────────┐│
│ priya@example.com                 │ [IMG] Supreme Oversized Tee x2    ₹4,998  ││
│ +91 98765 43210                   │       Black • Size M                       ││
│                                   ├────────────────────────────────────────────┤│
│ SHIPPING ADDRESS                  │ [IMG] Premium Basic Tee x1        ₹499    ││
│ 123 MG Road, Koramangala          │       White • Size S                       ││
│ Bangalore, Karnataka 560001       └────────────────────────────────────────────┘│
│                                                                                 │
│ ───────────────────────────────────────────────────────────────────────────────│
│                                                                                 │
│ Subtotal: ₹5,497   │   Shipping: FREE   │   Tax: ₹330   │   Total: ₹5,827     │
│                                                                                 │
│ ───────────────────────────────────────────────────────────────────────────────│
│                                                                                 │
│ Payment: 💳 Paid via Razorpay (UPI)                                            │
│ Status:  🟡 Pending - Awaiting fulfillment                                     │
│                                                                                 │
│ [View Full Details]  [Print Invoice]  [Mark as Processing]  [Cancel Order]     │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Bulk Actions

### Selection Actions
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ ☑ 3 orders selected                                                            │
│                                                                                 │
│ [Mark as Processing]  [Mark as Shipped]  [Print Invoices]  [Export]  [Cancel]  │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Bulk Ship Modal
```
┌────────────────────────────────────────────────────────────────────────────┐
│  Mark Orders as Shipped                                                ✕   │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  Shipping 3 orders                                                         │
│                                                                            │
│  Carrier *                                                                 │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ Delhivery                                                        ▼   │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  ☐ Use same tracking number for all                                        │
│                                                                            │
│  Order #12350:  ┌──────────────────────────────────────────────────────┐  │
│                 │ Tracking number                                       │  │
│                 └──────────────────────────────────────────────────────┘  │
│  Order #12349:  ┌──────────────────────────────────────────────────────┐  │
│                 │ Tracking number                                       │  │
│                 └──────────────────────────────────────────────────────┘  │
│  Order #12348:  ┌──────────────────────────────────────────────────────┐  │
│                 │ Tracking number                                       │  │
│                 └──────────────────────────────────────────────────────┘  │
│                                                                            │
│  ☑ Send shipping notification to customers                                │
│                                                                            │
├────────────────────────────────────────────────────────────────────────────┤
│                                           [Cancel]    [Mark as Shipped]    │
└────────────────────────────────────────────────────────────────────────────┘
```

## Quick Stats

### Order Summary
```
┌────────────────┐ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐
│ Today's Orders │ │ Pending        │ │ To Ship        │ │ Returns        │
│     12         │ │     5          │ │     3          │ │     2          │
│  ₹35,470       │ │  ₹15,994       │ │  ₹8,497        │ │  ₹4,998        │
└────────────────┘ └────────────────┘ └────────────────┘ └────────────────┘
```

## Empty States

### No Orders
```
┌─────────────────────────────────────────────────────────────┐
│                           📋                                │
│                                                             │
│                   No orders yet                             │
│                                                             │
│       Orders will appear here when customers make           │
│                     purchases                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### No Results
```
┌─────────────────────────────────────────────────────────────┐
│              No orders match your filters                   │
│                                                             │
│       Try adjusting your search or filter criteria          │
│                                                             │
│                    [Clear Filters]                          │
└─────────────────────────────────────────────────────────────┘
```

## Data Requirements
```typescript
interface OrdersListData {
  orders: OrderListItem[];
  filters: {
    status: OrderStatus | 'all';
    dateRange: DateRange;
    paymentStatus: PaymentStatus | 'all';
    fulfillment: FulfillmentStatus | 'all';
    search: string;
  };
  pagination: PaginationInfo;
  stats: {
    today: { count: number; total: number };
    pending: { count: number; total: number };
    toShip: { count: number; total: number };
    returns: { count: number; total: number };
  };
}

interface OrderListItem {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
  };
  itemCount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: Date;
}
```

## Component Dependencies
- DataTable
- OrderRow
- StatusTabs
- FilterBar
- OrderQuickView
- BulkActionsBar
- ShipModal
- Pagination
