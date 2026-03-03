# T-ADMIN-013: Order Detail

## Page Overview
Comprehensive order management with status updates, fulfillment, refunds, and customer communication.

## Wireframe

### Desktop (1440px+)
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ ☰ APOSTLE ADMIN                              🔔 (3)  👤 Admin ▼   [Storefront]│
├────────────────────┬────────────────────────────────────────────────────────────┤
│                    │                                                            │
│  DASHBOARD         │  Orders / #12350                                           │
│                    │                                                            │
│  📊 Dashboard      │  ┌──────────────────────────────────────────────────────┐  │
│  📦 Products       │  │ [← Back to Orders]                   [Print Invoice]  │  │
│  🏷️ Collections    │  │                                      [More Actions ▼]│  │
│  📋 Orders         │  └──────────────────────────────────────────────────────┘  │
│     ═══════        │                                                            │
│  👥 Customers      │  ORDER #12350                                              │
│  💳 Payments       │  March 15, 2024 at 10:34 AM                                │
│  📈 Analytics      │                                                            │
│  🎫 Coupons        │  ┌───────────────────────────────────────┬────────────────┐│
│  ⚙️ Settings       │  │                                       │                ││
│                    │  │  ORDER STATUS                         │  CUSTOMER      ││
│                    │  │  ════════════                         │  ────────      ││
│                    │  │                                       │                ││
│                    │  │  🟡 Pending                            │  Priya Sharma  ││
│                    │  │                                       │                ││
│                    │  │  Timeline:                            │  📧 priya@     ││
│                    │  │  ───────────                          │  example.com   ││
│                    │  │                                       │                ││
│                    │  │  ● Order placed                       │  📞 +91 98765  ││
│                    │  │    Mar 15, 10:34 AM                   │     43210      ││
│                    │  │    │                                  │                ││
│                    │  │  ● Payment confirmed                  │  [View Profile]││
│                    │  │    Mar 15, 10:35 AM                   │                ││
│                    │  │    │                                  │  ────────────  ││
│                    │  │  ○ Processing                         │                ││
│                    │  │    │                                  │  SHIPPING      ││
│                    │  │  ○ Shipped                            │  ────────      ││
│                    │  │    │                                  │                ││
│                    │  │  ○ Delivered                          │  Priya Sharma  ││
│                    │  │                                       │  123 MG Road,  ││
│                    │  │  ┌────────────────────────────────┐   │  Koramangala   ││
│                    │  │  │    Mark as Processing          │   │  Bangalore,    ││
│                    │  │  └────────────────────────────────┘   │  Karnataka     ││
│                    │  │                                       │  560001        ││
│                    │  └───────────────────────────────────────┴────────────────┘│
│                    │                                                            │
│                    │  ┌─────────────────────────────────────────────────────────┐│
│                    │  │  ORDER ITEMS                                            ││
│                    │  │  ═══════════                                            ││
│                    │  │                                                         ││
│                    │  │  ┌──────┐ Supreme Oversized Tee                        ││
│                    │  │  │      │ Black • Size M                                ││
│                    │  │  │[IMG] │ SKU: UC-TSH-001-M-BLK                         ││
│                    │  │  │      │                                               ││
│                    │  │  └──────┘ ₹2,499 × 2    =    ₹4,998                    ││
│                    │  │                                                         ││
│                    │  │  ┌──────┐ Premium Basic Tee                            ││
│                    │  │  │      │ White • Size S                                ││
│                    │  │  │[IMG] │ SKU: UC-TSH-003-S-WHT                         ││
│                    │  │  │      │                                               ││
│                    │  │  └──────┘ ₹499 × 1     =    ₹499                       ││
│                    │  │                                                         ││
│                    │  │  ────────────────────────────────────────────────────  ││
│                    │  │                                                         ││
│                    │  │                           Subtotal         ₹5,497      ││
│                    │  │                           Discount        −₹0          ││
│                    │  │                           Shipping         FREE        ││
│                    │  │                           Tax (6%)         ₹330        ││
│                    │  │                           ─────────────────────────    ││
│                    │  │                           Total           ₹5,827       ││
│                    │  │                                                         ││
│                    │  └─────────────────────────────────────────────────────────┘│
│                    │                                                            │
├────────────────────┼────────────────────────────────────────────────────────────┤
│                    │                                                            │
│                    │  ┌─────────────────────────────────────────────────────────┐│
│                    │  │  PAYMENT                                                ││
│                    │  │  ═══════                                                ││
│                    │  │                                                         ││
│                    │  │  Status: ✓ Paid                                         ││
│                    │  │  Method: UPI (Google Pay)                               ││
│                    │  │  Transaction ID: pay_N8x7Y9Z1a2B3c4                     ││
│                    │  │  Paid at: Mar 15, 2024 at 10:35 AM                      ││
│                    │  │                                                         ││
│                    │  │                                         [Issue Refund] ││
│                    │  └─────────────────────────────────────────────────────────┘│
│                    │                                                            │
│                    │  ┌─────────────────────────────────────────────────────────┐│
│                    │  │  NOTES                                                  ││
│                    │  │  ═════                                                  ││
│                    │  │                                                         ││
│                    │  │  ┌─────────────────────────────────────────────────────┐││
│                    │  │  │ Add internal note...                                │││
│                    │  │  └─────────────────────────────────────────────────────┘││
│                    │  │                                                         ││
│                    │  │  Mar 15, 10:40 AM - Admin:                             ││
│                    │  │  Customer requested gift wrapping                       ││
│                    │  │                                                         ││
│                    │  └─────────────────────────────────────────────────────────┘│
│                    │                                                            │
├────────────────────┴────────────────────────────────────────────────────────────┤
│  © 2024 APOSTLE Admin                                                         │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Order Timeline

### Timeline States
```
Active (current step):
● Processing                   ← Filled circle
  Mar 15, 11:00 AM
  │

Completed:
● Order placed                 ← Filled circle + checkmark
  Mar 15, 10:34 AM
  │

Pending:
○ Shipped                      ← Empty circle
  │
○ Delivered
```

### Timeline with Details
```
● Order placed
  Mar 15, 10:34 AM
  │
● Payment confirmed
  Mar 15, 10:35 AM
  Paid ₹5,827 via UPI
  │
● Processing
  Mar 15, 11:00 AM
  Marked by Admin
  │
● Shipped
  Mar 15, 4:30 PM
  Tracking: DL1234567890
  Carrier: Delhivery
  │
○ Out for delivery
  │
○ Delivered
```

## Status Actions

### Action Buttons by Status
```
Pending:
[Mark as Processing] [Cancel Order]

Processing:
[Mark as Ready] [Cancel Order]

Ready:
[Ship Order] [Cancel Order]

Shipped:
[Mark as Delivered] [Track Shipment]

Delivered:
[Order Complete]

Cancelled:
[Reorder]
```

## Ship Order Modal
```
┌────────────────────────────────────────────────────────────────────────────┐
│  Ship Order #12350                                                     ✕   │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  Carrier *                                                                 │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ Delhivery                                                        ▼   │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  Tracking Number *                                                         │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ DL1234567890                                                         │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  Tracking URL (auto-generated)                                             │
│  https://www.delhivery.com/track/DL1234567890                             │
│                                                                            │
│  ☑ Send shipping notification to customer                                 │
│  ☑ Include tracking link in notification                                  │
│                                                                            │
├────────────────────────────────────────────────────────────────────────────┤
│                                             [Cancel]    [Ship Order]       │
└────────────────────────────────────────────────────────────────────────────┘
```

## Refund Modal
```
┌────────────────────────────────────────────────────────────────────────────┐
│  Issue Refund                                                          ✕   │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  Select items to refund:                                                   │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ ☑ Supreme Oversized Tee (Black/M) × 2              ₹4,998           │  │
│  │   Refund quantity: [−] 2 [+]                                         │  │
│  ├──────────────────────────────────────────────────────────────────────┤  │
│  │ ☐ Premium Basic Tee (White/S) × 1                   ₹499            │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  Refund shipping                                                           │
│  ☐ ₹0 (Free shipping was applied)                                         │
│                                                                            │
│  ─────────────────────────────────────────────────────────────────────     │
│                                                                            │
│  Refund amount:                                           ₹4,998           │
│                                                                            │
│  Reason for refund *                                                       │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ Customer requested cancellation                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  ☑ Notify customer                                                         │
│  ☑ Restock items                                                           │
│                                                                            │
├────────────────────────────────────────────────────────────────────────────┤
│  Refund will be processed to original payment method (UPI)                 │
│                                                                            │
│                                             [Cancel]    [Issue Refund]     │
└────────────────────────────────────────────────────────────────────────────┘
```

## Cancel Order Modal
```
┌────────────────────────────────────────────────────────────────────────────┐
│  Cancel Order #12350                                                   ✕   │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ⚠ Are you sure you want to cancel this order?                            │
│                                                                            │
│  This action cannot be undone.                                             │
│                                                                            │
│  Cancellation reason *                                                     │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ Select reason                                                    ▼   │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  Options:                                                                  │
│  - Customer requested                                                      │
│  - Out of stock                                                            │
│  - Fraudulent order                                                        │
│  - Duplicate order                                                         │
│  - Other (specify)                                                         │
│                                                                            │
│  ☑ Issue full refund (₹5,827)                                             │
│  ☑ Notify customer                                                         │
│  ☑ Restock items                                                           │
│                                                                            │
├────────────────────────────────────────────────────────────────────────────┤
│                                      [Keep Order]    [Cancel Order]        │
└────────────────────────────────────────────────────────────────────────────┘
```

## More Actions Menu
```
┌─────────────────────────┐
│ Edit order              │
│ Duplicate order         │
│ ─────────────────────   │
│ Print invoice           │
│ Print packing slip      │
│ ─────────────────────   │
│ Contact customer        │
│ ─────────────────────   │
│ Archive order           │
└─────────────────────────┘
```

## Data Requirements
```typescript
interface OrderDetailData {
  order: Order;
  timeline: TimelineEvent[];
  customer: Customer;
  shippingAddress: Address;
  billingAddress: Address;
  items: OrderItem[];
  totals: OrderTotals;
  payment: PaymentInfo;
  tracking?: TrackingInfo;
  notes: OrderNote[];
  refunds: Refund[];
}

interface TimelineEvent {
  event: string;
  timestamp: Date;
  details?: string;
  actor?: string;
}
```

## Component Dependencies
- OrderHeader
- OrderTimeline
- OrderItems
- OrderTotals
- PaymentCard
- CustomerCard
- ShippingCard
- NotesSection
- ShipModal
- RefundModal
- CancelModal
