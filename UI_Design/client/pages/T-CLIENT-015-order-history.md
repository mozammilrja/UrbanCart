# T-CLIENT-015: Order History

## Page Overview
Complete order history with filtering, status tracking, and order management actions.

## Wireframe

### Desktop (1280px+)
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              HEADER (sticky)                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  Home / My Account / Orders                                                     │
│                                                                                 │
├────────────────────────┬────────────────────────────────────────────────────────┤
│                        │                                                        │
│  MY ACCOUNT            │  MY ORDERS                                             │
│  ─────────────         │  ═════════                                             │
│                        │                                                        │
│  📊 Dashboard          │  ┌─────────────────────────────────────────────────────┐│
│  📦 Orders             │  │ [All Orders] [Processing] [Shipped] [Delivered]     ││
│     ═══════            │  │               [Cancelled] [Returns]                 ││
│  ♡  Wishlist (5)       │  └─────────────────────────────────────────────────────┘│
│  📍 Addresses          │                                                        │
│  👤 Profile            │  ┌────────────────────────────────────────────────────┐ │
│  ⚙️ Settings           │  │ Search orders...                               🔍  │ │
│                        │  └────────────────────────────────────────────────────┘ │
│  ─────────────         │                                                        │
│                        │  Showing 12 orders                                     │
│  🚪 Sign Out           │                                                        │
│                        │  ┌─────────────────────────────────────────────────────┐│
│                        │  │ Order #12345                           Mar 12, 2024 ││
│                        │  │ ───────────────────────────────────────────────────││
│                        │  │                                                     ││
│                        │  │ ┌──────┐  Supreme Oversized Tee                    ││
│                        │  │ │      │  Black • Size M • Qty: 2                   ││
│                        │  │ │[IMG] │  ₹4,998                                   ││
│                        │  │ │      │                                           ││
│                        │  │ └──────┘                                           ││
│                        │  │ ┌──────┐  Urban Graphic Hoodie                     ││
│                        │  │ │      │  Navy • Size L • Qty: 1                    ││
│                        │  │ │[IMG] │  ₹3,499                                   ││
│                        │  │ │      │                                           ││
│                        │  │ └──────┘                                           ││
│                        │  │                                                     ││
│                        │  │ ───────────────────────────────────────────────────││
│                        │  │                                                     ││
│                        │  │ Status: 🟢 Delivered on Mar 15, 2024                ││
│                        │  │ Total: ₹8,497                                      ││
│                        │  │                                                     ││
│                        │  │ [View Details] [Download Invoice] [Buy Again]      ││
│                        │  │                                                     ││
│                        │  └─────────────────────────────────────────────────────┘│
│                        │                                                        │
│                        │  ┌─────────────────────────────────────────────────────┐│
│                        │  │ Order #12344                           Mar 8, 2024  ││
│                        │  │ ───────────────────────────────────────────────────││
│                        │  │                                                     ││
│                        │  │ ┌──────┐  Premium Basic Tee                        ││
│                        │  │ │[IMG] │  White • Size M • Qty: 1                   ││
│                        │  │ └──────┘  ₹1,999                                   ││
│                        │  │                                                     ││
│                        │  │ ───────────────────────────────────────────────────││
│                        │  │                                                     ││
│                        │  │ Status: 🚚 In Transit                              ││
│                        │  │ Expected: Mar 18-20, 2024                          ││
│                        │  │ Total: ₹1,999                                      ││
│                        │  │                                                     ││
│                        │  │ [Track Order] [View Details]                       ││
│                        │  │                                                     ││
│                        │  └─────────────────────────────────────────────────────┘│
│                        │                                                        │
│                        │  ┌─────────────────────────────────────────────────────┐│
│                        │  │ Order #12340                           Feb 28, 2024 ││
│                        │  │ ───────────────────────────────────────────────────││
│                        │  │ Status: 🔴 Cancelled                               ││
│                        │  │ Reason: Customer requested cancellation            ││
│                        │  │ Refund: ₹2,499 (Processed)                         ││
│                        │  │                                                     ││
│                        │  │ [View Details] [Buy Again]                         ││
│                        │  └─────────────────────────────────────────────────────┘│
│                        │                                                        │
│                        │  ┌────────────────────────────────────────────────────┐ │
│                        │  │ [←] Page 1 of 3 [→]         Showing 1-5 of 12      │ │
│                        │  └────────────────────────────────────────────────────┘ │
│                        │                                                        │
├────────────────────────┴────────────────────────────────────────────────────────┤
│                              FOOTER                                              │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Mobile (< 768px)
```
┌─────────────────────────────┐
│ ← My Orders                 │
├─────────────────────────────┤
│ 🔍 Search orders...         │
├─────────────────────────────┤
│ [All] [Processing] [Shipped]│
│ ← scroll →                  │
├─────────────────────────────┤
│ 12 orders                   │
├─────────────────────────────┤
│ ┌─────────────────────────┐ │
│ │ #12345 • Mar 12, 2024   │ │
│ │                         │ │
│ │ ┌─────┐ Supreme Tee     │ │
│ │ │[IMG]│ Black • M • x2  │ │
│ │ └─────┘                 │ │
│ │ + 1 more item           │ │
│ │                         │ │
│ │ 🟢 Delivered            │ │
│ │ Total: ₹8,497           │ │
│ │                         │ │
│ │ [Details] [Buy Again]   │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ #12344 • Mar 8, 2024    │ │
│ │                         │ │
│ │ ┌─────┐ Premium Tee     │ │
│ │ │[IMG]│ White • M • x1  │ │
│ │ └─────┘                 │ │
│ │                         │ │
│ │ 🚚 In Transit           │ │
│ │ Expected: Mar 18-20     │ │
│ │                         │ │
│ │ [Track]  [Details]      │ │
│ └─────────────────────────┘ │
│                             │
│ [Load More]                 │
└─────────────────────────────┘
```

## Order Status Filters

### Tab States
```
[All Orders (12)]  ← Total count
[Processing (1)]   ← Active orders being prepared
[Shipped (2)]      ← In transit orders
[Delivered (8)]    ← Completed orders
[Cancelled (1)]    ← Cancelled orders
[Returns (0)]      ← Return requests
```

## Order Card States

### Processing
```
┌─────────────────────────────────────────────────────────────┐
│ Order #12346                                   Mar 14, 2024 │
│ Status: 🟡 Processing                                       │
│ Your order is being prepared                                │
│                                                             │
│ [View Details]  [Cancel Order]                              │
└─────────────────────────────────────────────────────────────┘
```

### Shipped / In Transit
```
┌─────────────────────────────────────────────────────────────┐
│ Order #12344                                   Mar 8, 2024  │
│ Status: 🚚 In Transit                                       │
│ Carrier: Delhivery                                          │
│ Tracking: DL1234567890                                      │
│ Expected: Mar 18-20, 2024                                   │
│                                                             │
│ [Track Order] [View Details]                                │
└─────────────────────────────────────────────────────────────┘
```

### Delivered
```
┌─────────────────────────────────────────────────────────────┐
│ Order #12345                                   Mar 12, 2024 │
│ Status: 🟢 Delivered on Mar 15, 2024                        │
│                                                             │
│ [View Details] [Download Invoice] [Buy Again] [Write Review]│
└─────────────────────────────────────────────────────────────┘
```

### Cancelled
```
┌─────────────────────────────────────────────────────────────┐
│ Order #12340                                   Feb 28, 2024 │
│ Status: 🔴 Cancelled                                        │
│ Reason: Customer requested cancellation                     │
│ Refund: ₹2,499 (Processed on Mar 1)                         │
│                                                             │
│ [View Details] [Buy Again]                                  │
└─────────────────────────────────────────────────────────────┘
```

### Return Requested
```
┌─────────────────────────────────────────────────────────────┐
│ Order #12339                                   Feb 25, 2024 │
│ Status: ↩️ Return in Progress                               │
│ Return Reason: Size too small                               │
│ Pickup: Scheduled for Mar 20, 2024                          │
│                                                             │
│ [View Details] [Track Return]                               │
└─────────────────────────────────────────────────────────────┘
```

## Order Actions

### Available Actions by Status
| Status | Actions |
|--------|---------|
| Processing | View, Cancel |
| Shipped | View, Track |
| Delivered | View, Invoice, Buy Again, Review, Return |
| Cancelled | View, Buy Again |
| Returned | View, Track Return |

## Search & Filter

### Search
- Order ID/number
- Product name
- Date range

### Sort Options
- Date (newest first)
- Date (oldest first)
- Order value (high to low)
- Order value (low to high)

## Empty States

### No Orders
```
┌─────────────────────────────────────────────────────────────┐
│                           📦                                │
│                                                             │
│              You haven't placed any orders yet              │
│                                                             │
│         Start shopping to see your orders here              │
│                                                             │
│                    [Start Shopping]                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### No Results for Filter
```
┌─────────────────────────────────────────────────────────────┐
│              No cancelled orders found                      │
│                                                             │
│         You don't have any cancelled orders                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Data Requirements
```typescript
interface OrderHistoryData {
  orders: Order[];
  filters: {
    status: OrderStatus | 'all';
    search: string;
    dateRange?: DateRange;
  };
  pagination: PaginationInfo;
  stats: {
    total: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
    returns: number;
  };
}

interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
  deliveredAt?: Date;
  tracking?: TrackingInfo;
  refund?: RefundInfo;
}
```

## Component Dependencies
- OrderTabs
- OrderCard
- OrderSearch
- Pagination
- EmptyState
- TrackingModal
