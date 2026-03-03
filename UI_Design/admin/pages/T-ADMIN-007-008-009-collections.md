# T-ADMIN-007-008-009: Collections Management

## Page Overview
Create and manage product collections with rules-based or manual curation, cover images, and SEO optimization.

## Collections List (T-ADMIN-007)

### Desktop (1440px+)
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ ☰ APOSTLE ADMIN                              🔔 (3)  👤 Admin ▼   [Storefront]│
├────────────────────┬────────────────────────────────────────────────────────────┤
│                    │                                                            │
│  DASHBOARD         │  Collections                                               │
│                    │                                                            │
│  📊 Dashboard      │  COLLECTIONS                                               │
│  📦 Products       │  ═══════════                                               │
│  🏷️ Collections    │                                                            │
│     ═══════════    │  ┌─────────────────────────────────────┐ [+ Create Collection]│
│  📋 Orders         │  │ 🔍 Search collections...            │                   │
│  👥 Customers      │  └─────────────────────────────────────┘                   │
│  💳 Payments       │                                                            │
│  📈 Analytics      │  Showing 8 collections                                     │
│  🎫 Coupons        │                                                            │
│  ⚙️ Settings       │  ┌─────────────────────────────────────────────────────────┐│
│                    │  │ Image │ Collection        │ Products │ Type    │ Status ││
│                    │  ├─────────────────────────────────────────────────────────┤│
│                    │  │[IMG]  │ New Arrivals      │ 24       │ Auto    │ ✓      ││
│                    │  │       │ /collections/new  │ products │ (rules) │ Active ││
│                    │  ├─────────────────────────────────────────────────────────┤│
│                    │  │[IMG]  │ Summer '24        │ 18       │ Manual  │ ✓      ││
│                    │  │       │ /collections/     │          │         │ Active ││
│                    │  │       │ summer-24         │          │         │        ││
│                    │  ├─────────────────────────────────────────────────────────┤│
│                    │  │[IMG]  │ Best Sellers      │ 12       │ Auto    │ ✓      ││
│                    │  │       │ /collections/     │          │ (rules) │ Active ││
│                    │  │       │ best-sellers      │          │         │        ││
│                    │  ├─────────────────────────────────────────────────────────┤│
│                    │  │[IMG]  │ Sale              │ 8        │ Auto    │ ✓      ││
│                    │  │       │ /collections/sale │          │ (rules) │ Active ││
│                    │  ├─────────────────────────────────────────────────────────┤│
│                    │  │[IMG]  │ Streetwear        │ 15       │ Manual  │ ✓      ││
│                    │  │       │ Essentials        │          │         │ Active ││
│                    │  ├─────────────────────────────────────────────────────────┤│
│                    │  │       │ Winter Drop       │ 0        │ Manual  │ ✗      ││
│                    │  │ [No   │ (Coming Soon)     │          │         │ Draft  ││
│                    │  │Image] │                   │          │         │        ││
│                    │  └─────────────────────────────────────────────────────────┘│
│                    │                                                            │
├────────────────────┴────────────────────────────────────────────────────────────┤
│  © 2024 APOSTLE Admin                                                         │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Collection Form (T-ADMIN-008-009)

### Create/Edit Collection
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ ☰ APOSTLE ADMIN                              🔔 (3)  👤 Admin ▼   [Storefront]│
├────────────────────┬────────────────────────────────────────────────────────────┤
│                    │                                                            │
│  DASHBOARD         │  Collections / Create Collection                           │
│                    │                                                            │
│  📊 Dashboard      │  ┌──────────────────────────────────────────────────────┐  │
│  📦 Products       │  │ [Discard]                            [Save as Draft]  │  │
│  🏷️ Collections    │  │                                      [Save Collection]│  │
│     ═══════════    │  └──────────────────────────────────────────────────────┘  │
│  📋 Orders         │                                                            │
│                    │  ┌───────────────────────────────────────┬────────────────┐│
│                    │  │                                       │                ││
│                    │  │  COLLECTION DETAILS                   │  STATUS        ││
│                    │  │  ══════════════════                   │  ────────      ││
│                    │  │                                       │                ││
│                    │  │  Title *                              │  [Active ▼]    ││
│                    │  │  ┌─────────────────────────────────┐  │                ││
│                    │  │  │ Summer '24 Collection           │  │  ────────────  ││
│                    │  │  └─────────────────────────────────┘  │                ││
│                    │  │                                       │  SCHEDULE      ││
│                    │  │  Description                          │  ────────────  ││
│                    │  │  ┌─────────────────────────────────┐  │                ││
│                    │  │  │ [B] [I] [U] [•] [1.] [🔗]       │  │  ☐ Schedule    ││
│                    │  │  ├─────────────────────────────────┤  │    publish     ││
│                    │  │  │                                 │  │                ││
│                    │  │  │ Hot new styles for the         │  │  Start date    ││
│                    │  │  │ summer season...                │  │  [Jun 1, 2024] ││
│                    │  │  │                                 │  │                ││
│                    │  │  └─────────────────────────────────┘  │  End date      ││
│                    │  │                                       │  [Aug 31, 2024]││
│                    │  │  ─────────────────────────────────────│                ││
│                    │  │                                       │                ││
│                    │  │  COLLECTION IMAGE                     │                ││
│                    │  │  ═════════════════                    │                ││
│                    │  │                                       │                ││
│                    │  │  ┌─────────────────────────────────┐  │                ││
│                    │  │  │                                 │  │                ││
│                    │  │  │         [COVER IMAGE]           │  │                ││
│                    │  │  │                                 │  │                ││
│                    │  │  │     📁 Upload image             │  │                ││
│                    │  │  │                                 │  │                ││
│                    │  │  └─────────────────────────────────┘  │                ││
│                    │  │                                       │                ││
│                    │  └───────────────────────────────────────┴────────────────┘│
│                    │                                                            │
```

### Collection Type Selection
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  COLLECTION TYPE                                                                │
│  ═══════════════                                                                │
│                                                                                 │
│  ◉ Manual                                                                       │
│     Add products to this collection one by one                                  │
│                                                                                 │
│  ○ Automated                                                                    │
│     Products that match conditions will be added automatically                  │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Manual Collection - Product Picker
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  PRODUCTS (8 selected)                                                          │
│  ══════════════════════                                                         │
│                                                                                 │
│  ┌─────────────────────────────────────────┐  [+ Add Products]                  │
│  │ 🔍 Search products in collection...     │                                    │
│  └─────────────────────────────────────────┘                                    │
│                                                                                 │
│  Drag to reorder products                                                       │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ ≡ │[IMG]│ Supreme Oversized Tee     │ ₹2,499  │ In Stock    │    ✕         ││
│  │ ≡ │[IMG]│ Urban Graphic Hoodie      │ ₹3,499  │ In Stock    │    ✕         ││
│  │ ≡ │[IMG]│ Premium Basic Tee         │ ₹1,999  │ Low Stock   │    ✕         ││
│  │ ≡ │[IMG]│ Streetwear Joggers        │ ₹2,999  │ In Stock    │    ✕         ││
│  │ ≡ │[IMG]│ Graphic Tee Summer        │ ₹1,499  │ In Stock    │    ✕         ││
│  │ ≡ │[IMG]│ Limited Edition Hoodie    │ ₹4,999  │ In Stock    │    ✕         ││
│  │ ≡ │[IMG]│ Basic Shorts              │ ₹1,799  │ In Stock    │    ✕         ││
│  │ ≡ │[IMG]│ Mesh Tank Top             │ ₹1,299  │ In Stock    │    ✕         ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Add Products Modal
```
┌────────────────────────────────────────────────────────────────────────────┐
│  Add Products to Collection                                            ✕   │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ 🔍 Search products...                                                │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  ☑ Select All (showing 12)                                                 │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ ☑ │[IMG]│ Canvas Sneakers         │ ₹3,499  │ Footwear              │  │
│  │ ☐ │[IMG]│ Leather Belt            │ ₹1,499  │ Accessories           │  │
│  │ ☑ │[IMG]│ Baseball Cap            │ ₹799    │ Accessories           │  │
│  │ ☐ │[IMG]│ Denim Jacket            │ ₹5,999  │ Jackets               │  │
│  │ ☑ │[IMG]│ Cargo Pants             │ ₹3,299  │ Bottoms               │  │
│  │ ...                                                                  │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
├────────────────────────────────────────────────────────────────────────────┤
│  3 products selected                    [Cancel]    [Add Selected]         │
└────────────────────────────────────────────────────────────────────────────┘
```

### Automated Collection - Rules Builder
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  CONDITIONS                                                                     │
│  ══════════                                                                     │
│                                                                                 │
│  Products must match:  ◉ all conditions   ○ any condition                       │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ [Product tag ▼]  [is equal to ▼]  [new-arrival        ]        [✕]         ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ [Price       ▼]  [is less than▼]  [₹3,000             ]        [✕]         ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ [Category    ▼]  [is equal to ▼]  [T-Shirts           ]        [✕]         ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
│                                                                                 │
│  [+ Add another condition]                                                      │
│                                                                                 │
│  ─────────────────────────────────────────────────────────────────────────────  │
│                                                                                 │
│  Preview: 24 products match these conditions               [View Products]      │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Condition Options
```
Field Options:
┌─────────────────────────┐
│ Product title           │
│ Product type            │
│ Product vendor          │
│ Product tag             │
│ Price                   │
│ Compare at price        │
│ Weight                  │
│ Inventory stock         │
└─────────────────────────┘

Operator Options:
┌─────────────────────────┐
│ is equal to             │
│ is not equal to         │
│ is greater than         │
│ is less than            │
│ starts with             │
│ ends with               │
│ contains                │
│ does not contain        │
└─────────────────────────┘
```

### Collection SEO
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  SEO                                                                            │
│  ═══                                                                            │
│                                                                                 │
│  Search engine preview                                                          │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ Summer '24 Collection - APOSTLE                                           ││
│  │ apostle.in/collections/summer-24                                          ││
│  │ Hot new styles for the summer season. Shop the latest trends...             ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
│                                                                                 │
│  Page Title                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ Summer '24 Collection - APOSTLE                                           ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
│                                                                                 │
│  URL Handle                                                                     │
│  apostle.in/collections/                                                      │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ summer-24                                                                   ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Data Requirements
```typescript
interface CollectionFormData {
  title: string;
  description: string;
  image?: string;
  status: 'active' | 'draft';
  
  // Schedule
  publishDate?: Date;
  endDate?: Date;
  
  // Type
  type: 'manual' | 'automated';
  
  // Manual: ordered product IDs
  products?: string[];
  
  // Automated: conditions
  conditionMatch?: 'all' | 'any';
  conditions?: CollectionCondition[];
  
  // SEO
  seo: {
    title: string;
    description: string;
    urlHandle: string;
  };
}

interface CollectionCondition {
  field: string;
  operator: string;
  value: string;
}
```

## Component Dependencies
- CollectionForm
- ImageUploader
- ProductPicker
- RulesBuilder
- ConditionRow
- SEOPreview
- DraggableList
