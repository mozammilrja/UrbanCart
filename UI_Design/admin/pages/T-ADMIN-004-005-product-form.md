# T-ADMIN-004-005: Product Form (Add/Edit)

## Page Overview
Comprehensive product creation and editing form with variants, pricing, inventory, and media management.

## Wireframe

### Desktop (1440px+)
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ ☰ URBANCART ADMIN                              🔔 (3)  👤 Admin ▼   [Storefront]│
├────────────────────┬────────────────────────────────────────────────────────────┤
│                    │                                                            │
│  DASHBOARD         │  Products / Add New Product                                │
│                    │                                                            │
│  📊 Dashboard      │  ┌──────────────────────────────────────────────────────┐  │
│  📦 Products       │  │ [Discard]                            [Save as Draft]  │  │
│     ═══════        │  │                                      [Publish Product]│  │
│  🏷️ Collections    │  └──────────────────────────────────────────────────────┘  │
│  📋 Orders         │                                                            │
│  👥 Customers      │  ┌───────────────────────────────────────┬────────────────┐│
│  💳 Payments       │  │                                       │                ││
│  📈 Analytics      │  │  BASIC INFORMATION                    │  STATUS        ││
│  🎫 Coupons        │  │  ═════════════════                    │  ────────      ││
│  ⚙️ Settings       │  │                                       │                ││
│                    │  │  Product Name *                       │  [Active ▼]    ││
│                    │  │  ┌─────────────────────────────────┐  │                ││
│                    │  │  │ Supreme Oversized Tee           │  │  VISIBILITY    ││
│                    │  │  └─────────────────────────────────┘  │  ────────────  ││
│                    │  │                                       │                ││
│                    │  │  Description                          │  ☑ Online Store││
│                    │  │  ┌─────────────────────────────────┐  │  ☑ Search      ││
│                    │  │  │ [B] [I] [U] [•] [1.] [🔗] [🖼️] │  │                ││
│                    │  │  ├─────────────────────────────────┤  │  ────────────  ││
│                    │  │  │                                 │  │                ││
│                    │  │  │ Premium quality oversized      │  │  ORGANIZATION  ││
│                    │  │  │ t-shirt crafted from 100%      │  │  ────────────  ││
│                    │  │  │ organic cotton...              │  │                ││
│                    │  │  │                                 │  │  Category *    ││
│                    │  │  │                                 │  │  [T-Shirts ▼]  ││
│                    │  │  │                                 │  │                ││
│                    │  │  └─────────────────────────────────┘  │  Tags          ││
│                    │  │                                       │  [+ Add tags]  ││
│                    │  │  ─────────────────────────────────────│  oversized ✕   ││
│                    │  │                                       │  streetwear ✕  ││
│                    │  │  MEDIA                                │                ││
│                    │  │  ═════                                │  ────────────  ││
│                    │  │                                       │                ││
│                    │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐  │  COLLECTIONS   ││
│                    │  │  │         │ │         │ │    +    │  │  ────────────  ││
│                    │  │  │  IMG 1  │ │  IMG 2  │ │  Add    │  │                ││
│                    │  │  │  ★      │ │         │ │  more   │  │  [+ Add to     ││
│                    │  │  │         │ │         │ │         │  │   collection]  ││
│                    │  │  └─────────┘ └─────────┘ └─────────┘  │                ││
│                    │  │  ★ Featured image                     │  New Arrivals ✕││
│                    │  │  Drag to reorder                      │  Summer '24  ✕ ││
│                    │  │                                       │                ││
│                    │  └───────────────────────────────────────┴────────────────┘│
│                    │                                                            │
│                    │  ┌─────────────────────────────────────────────────────────┐│
│                    │  │  PRICING                                                ││
│                    │  │  ═══════                                                ││
│                    │  │                                                         ││
│                    │  │  Price *                    Compare at Price            ││
│                    │  │  ┌─────────────────────┐   ┌─────────────────────┐      ││
│                    │  │  │ ₹  │ 2499            │   │ ₹  │ 2999            │      ││
│                    │  │  └─────────────────────┘   └─────────────────────┘      ││
│                    │  │                            ↑ Optional, for sales        ││
│                    │  │  Cost per item             Profit     Margin            ││
│                    │  │  ┌─────────────────────┐   ₹1,499     60%               ││
│                    │  │  │ ₹  │ 1000            │                                ││
│                    │  │  └─────────────────────┘                                ││
│                    │  │                                                         ││
│                    │  │  ☐ Charge tax on this product                          ││
│                    │  │                                                         ││
│                    │  └─────────────────────────────────────────────────────────┘│
│                    │                                                            │
│                    │  ┌─────────────────────────────────────────────────────────┐│
│                    │  │  INVENTORY                                              ││
│                    │  │  ═════════                                              ││
│                    │  │                                                         ││
│                    │  │  SKU                        Barcode                     ││
│                    │  │  ┌─────────────────────┐   ┌─────────────────────────┐  ││
│                    │  │  │ UC-TSH-001          │   │ 8901234567890           │  ││
│                    │  │  └─────────────────────┘   └─────────────────────────┘  ││
│                    │  │                                                         ││
│                    │  │  ☑ Track quantity                                       ││
│                    │  │  ☐ Continue selling when out of stock                  ││
│                    │  │                                                         ││
│                    │  │  Quantity                                               ││
│                    │  │  ┌─────────────────────┐                                ││
│                    │  │  │ 0                   │  (managed per variant)         ││
│                    │  │  └─────────────────────┘                                ││
│                    │  │                                                         ││
│                    │  └─────────────────────────────────────────────────────────┘│
│                    │                                                            │
├────────────────────┴────────────────────────────────────────────────────────────┤
│  Continue below for Variants and SEO...                                         │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Variants Section
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  VARIANTS                                                                       │
│  ════════                                                                       │
│                                                                                 │
│  ☑ This product has multiple options (e.g., sizes, colors)                     │
│                                                                                 │
│  OPTION 1                                                 [Remove Option]       │
│  ┌─────────────────────┐   ┌────────────────────────────────────────────┐      │
│  │ Size            ▼   │   │ S, M, L, XL                                │      │
│  └─────────────────────┘   └────────────────────────────────────────────┘      │
│                                                                                 │
│  OPTION 2                                                 [Remove Option]       │
│  ┌─────────────────────┐   ┌────────────────────────────────────────────┐      │
│  │ Color           ▼   │   │ Black, White, Navy                         │      │
│  └─────────────────────┘   └────────────────────────────────────────────┘      │
│                                                                                 │
│  [+ Add another option]                                                         │
│                                                                                 │
│  ─────────────────────────────────────────────────────────────────────────────  │
│                                                                                 │
│  VARIANT LIST (12 variants)                                                     │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │ Variant         │ SKU           │ Price    │ Quantity │ Available │       │ │
│  ├───────────────────────────────────────────────────────────────────────────┤ │
│  │ S / Black       │ UC-001-S-BLK  │ ₹2,499   │ 15       │ ☑         │ [⋮]   │ │
│  │ S / White       │ UC-001-S-WHT  │ ₹2,499   │ 12       │ ☑         │ [⋮]   │ │
│  │ S / Navy        │ UC-001-S-NAV  │ ₹2,499   │ 8        │ ☑         │ [⋮]   │ │
│  │ M / Black       │ UC-001-M-BLK  │ ₹2,499   │ 20       │ ☑         │ [⋮]   │ │
│  │ M / White       │ UC-001-M-WHT  │ ₹2,499   │ 18       │ ☑         │ [⋮]   │ │
│  │ M / Navy        │ UC-001-M-NAV  │ ₹2,499   │ ⚠ 3      │ ☑         │ [⋮]   │ │
│  │ L / Black       │ UC-001-L-BLK  │ ₹2,499   │ 25       │ ☑         │ [⋮]   │ │
│  │ L / White       │ UC-001-L-WHT  │ ₹2,499   │ 22       │ ☑         │ [⋮]   │ │
│  │ ...                                                                       │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  [Edit all variants]                                                            │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### SEO Section
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  SEO                                                                            │
│  ═══                                                                            │
│                                                                                 │
│  Search engine preview                                                          │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ Supreme Oversized Tee - UrbanCart                                           ││
│  │ urbancart.in/products/supreme-oversized-tee                                 ││
│  │ Premium quality oversized t-shirt crafted from 100% organic cotton...       ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
│                                                                                 │
│  Page Title                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ Supreme Oversized Tee - UrbanCart                                           ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
│  55 / 70 characters                                                             │
│                                                                                 │
│  Meta Description                                                               │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ Premium quality oversized t-shirt crafted from 100% organic cotton...       ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
│  120 / 160 characters                                                           │
│                                                                                 │
│  URL Handle                                                                     │
│  urbancart.in/products/                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ supreme-oversized-tee                                                       ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Media Upload

### Upload Area
```
┌───────────────────────────────────────────────────────────────────┐
│                                                                   │
│                           📁                                      │
│                                                                   │
│              Drag and drop files here, or click to browse         │
│                                                                   │
│              Accepts: JPG, PNG, WEBP, GIF (max 5MB)              │
│                                                                   │
│              [Browse files]                                       │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

### Image Thumbnail
```
┌─────────┐
│         │
│  [IMG]  │
│    ★    │  ← Star = featured image
│    ✕    │  ← Remove button
│         │
└─────────┘
╰─────────╯
↕ Drag handle
```

## Form Validation

### Required Fields
```
Product Name *
┌────────────────────────────────┐
│                                │  ← Empty (red border)
└────────────────────────────────┘
⚠ Product name is required
```

### Price Validation
```
Price *
┌────────────────────────────────┐
│ ₹  │ -100                      │  ← Invalid
└────────────────────────────────┘
⚠ Price must be a positive number
```

## Save States

### Saving
```
┌──────────────────────────────────────────────────────────────────┐
│ [Discard]                              [Saving...] [Publish ◠]  │
└──────────────────────────────────────────────────────────────────┘
```

### Unsaved Changes
```
┌──────────────────────────────────────────────────────────────────┐
│ ⚠ You have unsaved changes                                     │
│                                                                  │
│                        [Discard]  [Save Changes]                 │
└──────────────────────────────────────────────────────────────────┘
```

## Data Requirements
```typescript
interface ProductFormData {
  // Basic
  name: string;
  description: string;
  status: 'active' | 'draft' | 'archived';
  
  // Organization
  category: string;
  tags: string[];
  collections: string[];
  
  // Pricing
  price: number;
  compareAtPrice?: number;
  costPerItem?: number;
  taxable: boolean;
  
  // Inventory
  sku: string;
  barcode?: string;
  trackQuantity: boolean;
  continueSellingWhenOut: boolean;
  quantity: number;
  
  // Media
  images: ProductImage[];
  featuredImage: string;
  
  // Variants
  hasVariants: boolean;
  options: VariantOption[];
  variants: ProductVariant[];
  
  // SEO
  seo: {
    title: string;
    description: string;
    urlHandle: string;
  };
}
```

## Component Dependencies
- ProductForm
- RichTextEditor
- MediaUploader
- ImageGallery
- VariantManager
- VariantTable
- PriceInput
- SelectInput
- TagInput
- SEOPreview
