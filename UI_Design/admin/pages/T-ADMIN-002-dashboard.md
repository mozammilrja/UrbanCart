# T-ADMIN-002: Admin Dashboard

## Page Overview
Main admin dashboard with KPIs, analytics, recent activity, and quick actions.

## Wireframe

### Desktop (1440px+)
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ ☰ URBANCART ADMIN                              🔔 (3)  👤 Admin ▼   [Storefront]│
├────────────────────┬────────────────────────────────────────────────────────────┤
│                    │                                                            │
│  DASHBOARD         │  Good morning, Admin!                    Mar 15, 2024      │
│  ═════════         │                                                            │
│                    │  ────────────────────────────────────────────────────────  │
│  📊 Dashboard      │                                                            │
│  📦 Products       │  KEY METRICS                             [Today ▼] [Export]│
│  🏷️ Collections    │                                                            │
│  📋 Orders         │  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────┐│
│  👥 Customers      │  │ 💰               │ │ 📦               │ │ 🛒           ││
│  💳 Payments       │  │ ₹1,24,500        │ │ 47               │ │ 2.4%         ││
│  📈 Analytics      │  │ Revenue          │ │ Orders           │ │ Conversion   ││
│  🎫 Coupons        │  │ ↑ 12% from       │ │ ↑ 8% from        │ │ ↑ 0.3% from  ││
│  ⚙️ Settings       │  │ yesterday        │ │ yesterday        │ │ yesterday    ││
│                    │  └──────────────────┘ └──────────────────┘ └──────────────┘│
│                    │                                                            │
│                    │  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────┐│
│                    │  │ 👥               │ │ 📊               │ │ ↩️           ││
│                    │  │ 1,234            │ │ ₹2,647           │ │ 3            ││
│                    │  │ Visitors         │ │ Avg Order Value  │ │ Returns      ││
│                    │  │ ↓ 5% from        │ │ ↑ 15% from       │ │ Same as      ││
│                    │  │ yesterday        │ │ yesterday        │ │ yesterday    ││
│                    │  └──────────────────┘ └──────────────────┘ └──────────────┘│
│                    │                                                            │
│                    │  ────────────────────────────────────────────────────────  │
│                    │                                                            │
│                    │  REVENUE OVERVIEW                        [Week ▼]          │
│                    │  ┌────────────────────────────────────────────────────────┐│
│                    │  │                                                        ││
│                    │  │    300K ┤      ╭─────╮                                 ││
│                    │  │         │     ╱      ╲    ╭─                           ││
│                    │  │    200K ┤    ╱        ╲──╯                             ││
│                    │  │         │   ╱                                          ││
│                    │  │    100K ┤  ╱                                           ││
│                    │  │         │─╯                                            ││
│                    │  │      0K ┼────┬────┬────┬────┬────┬────┬────            ││
│                    │  │         Mon  Tue  Wed  Thu  Fri  Sat  Sun              ││
│                    │  │                                                        ││
│                    │  └────────────────────────────────────────────────────────┘│
│                    │                                                            │
│                    │  ────────────────────────────────────────────────────────  │
│                    │                                                            │
│                    │  RECENT ORDERS                                   [View All]│
│                    │  ┌────────────────────────────────────────────────────────┐│
│                    │  │ Order ID    Customer        Items    Total    Status   ││
│                    │  ├────────────────────────────────────────────────────────┤│
│                    │  │ #12350      Priya Sharma    3        ₹5,497   🟡 New   ││
│                    │  │ #12349      Rahul Kumar     2        ₹3,998   🟠 Ship  ││
│                    │  │ #12348      Sneha Patel     1        ₹2,499   🟢 Done  ││
│                    │  │ #12347      Amit Singh      4        ₹8,996   🟢 Done  ││
│                    │  │ #12346      Neha Gupta      2        ₹4,498   🟢 Done  ││
│                    │  └────────────────────────────────────────────────────────┘│
│                    │                                                            │
├────────────────────┼────────────────────────────────────────────────────────────┤
│                    │  TOP PRODUCTS                     LOW STOCK ALERTS         │
│                    │  ┌────────────────────────────┐  ┌────────────────────────┐│
│                    │  │ 1. Supreme Tee    42 sold  │  │ ⚠ Basic Tee (M)    3  ││
│                    │  │ 2. Urban Hoodie   38 sold  │  │ ⚠ Graphic Tee (L)  5  ││
│                    │  │ 3. Graphic Tee    35 sold  │  │ ⚠ Joggers (32)     2  ││
│                    │  │ 4. Premium Basic  28 sold  │  │                        ││
│                    │  │ 5. Joggers        25 sold  │  │ [View Inventory]       ││
│                    │  └────────────────────────────┘  └────────────────────────┘│
│                    │                                                            │
├────────────────────┴────────────────────────────────────────────────────────────┤
│  © 2024 UrbanCart Admin                                              v1.0.0     │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## KPI Cards

### Card Structure
```
┌──────────────────────────┐
│ 💰 Icon                  │
│                          │
│ ₹1,24,500               │  ← Main value (large)
│ Revenue                  │  ← Label
│                          │
│ ↑ 12% from yesterday    │  ← Trend (green/red)
│                          │
│ [────────────]          │  ← Optional mini chart
└──────────────────────────┘
```

### Metric Types
- Revenue (₹)
- Orders (count)
- Conversion Rate (%)
- Visitors (count)
- Average Order Value (₹)
- Returns (count)

## Sidebar Navigation
```
┌────────────────────┐
│ 📊 Dashboard       │ ← Current (highlighted)
│ 📦 Products        │
│    └ All Products  │
│    └ Add Product   │
│    └ Categories    │
│    └ Inventory     │
│ 🏷️ Collections     │
│ 📋 Orders          │
│    └ All Orders    │
│    └ Returns       │
│ 👥 Customers       │
│ 💳 Payments        │
│ 📈 Analytics       │
│ 🎫 Coupons         │
│ ⚙️ Settings        │
└────────────────────┘
```

## Quick Actions
```
┌─────────────────────────────────────────────────────────────┐
│ QUICK ACTIONS                                               │
│                                                             │
│ [+ Add Product]  [+ Create Order]  [+ New Coupon]  [Export]│
└─────────────────────────────────────────────────────────────┘
```

## Notifications Panel
```
┌────────────────────────────────────────────────────────────┐
│ Notifications (3)                          [Mark all read] │
├────────────────────────────────────────────────────────────┤
│ 🔴 New order #12350                           2 min ago    │
│    Priya Sharma - ₹5,497                                   │
├────────────────────────────────────────────────────────────┤
│ 🟡 Low stock alert                            1 hour ago   │
│    Basic Tee (M) - Only 3 left                            │
├────────────────────────────────────────────────────────────┤
│ ⚪ Return requested                           3 hours ago  │
│    Order #12340 - Rahul Kumar                             │
└────────────────────────────────────────────────────────────┘
```

## Data Requirements
```typescript
interface DashboardData {
  metrics: {
    revenue: MetricData;
    orders: MetricData;
    conversion: MetricData;
    visitors: MetricData;
    avgOrderValue: MetricData;
    returns: MetricData;
  };
  revenueChart: ChartData;
  recentOrders: Order[];
  topProducts: TopProduct[];
  lowStockAlerts: StockAlert[];
  notifications: Notification[];
}

interface MetricData {
  value: number;
  label: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
}
```

## Component Dependencies
- MetricCard
- RevenueChart
- OrdersTable
- TopProductsList
- LowStockAlert
- NotificationPanel
- Sidebar
