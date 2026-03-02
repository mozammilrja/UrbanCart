# T-ADMIN-003: Products List

## Page Overview
Product catalog management with filtering, bulk actions, and inventory overview.

## Wireframe

### Desktop (1440px+)
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ ☰ URBANCART ADMIN                              🔔 (3)  👤 Admin ▼   [Storefront]│
├────────────────────┬────────────────────────────────────────────────────────────┤
│                    │                                                            │
│  DASHBOARD         │  Products / All Products                                   │
│                    │                                                            │
│  📊 Dashboard      │  PRODUCTS                                                  │
│  📦 Products       │  ═════════                                                 │
│     ═══════        │                                                            │
│  🏷️ Collections    │  ┌────────────────────────────────────────┐ [+ Add Product]│
│  📋 Orders         │  │ 🔍 Search products...                  │                │
│  👥 Customers      │  └────────────────────────────────────────┘                │
│  💳 Payments       │                                                            │
│  📈 Analytics      │  ┌─────────────────────────────────────────────────────────┐│
│  🎫 Coupons        │  │ Filters: [Category ▼] [Status ▼] [Stock ▼] [Price ▼]   ││
│  ⚙️ Settings       │  │                                                         ││
│                    │  │ Showing 48 products                      [Clear Filters]││
│                    │  └─────────────────────────────────────────────────────────┘│
│                    │                                                            │
│                    │  ┌─────────────────────────────────────────────────────────┐│
│                    │  │ ☐ Select All           Bulk Actions: [Actions ▼]       ││
│                    │  ├─────────────────────────────────────────────────────────┤│
│                    │  │ ☐ │ Image │ Product      │ SKU      │ Price  │ Stock │S ││
│                    │  │───┼───────┼──────────────┼──────────┼────────┼───────┼──││
│                    │  │ ☐ │[IMG]  │ Supreme      │ UC-001   │ ₹2,499 │ 45    │✓ ││
│                    │  │   │       │ Oversized Tee│          │        │       │  ││
│                    │  │   │       │ 4 variants   │          │        │       │  ││
│                    │  │───┼───────┼──────────────┼──────────┼────────┼───────┼──││
│                    │  │ ☐ │[IMG]  │ Urban        │ UC-002   │ ₹3,499 │ 28    │✓ ││
│                    │  │   │       │ Graphic      │          │        │       │  ││
│                    │  │   │       │ Hoodie       │          │        │       │  ││
│                    │  │   │       │ 6 variants   │          │        │       │  ││
│                    │  │───┼───────┼──────────────┼──────────┼────────┼───────┼──││
│                    │  │ ☐ │[IMG]  │ Premium      │ UC-003   │ ₹1,999 │ ⚠ 3   │✓ ││
│                    │  │   │       │ Basic Tee    │          │        │       │  ││
│                    │  │   │       │ 3 variants   │          │        │ Low   │  ││
│                    │  │───┼───────┼──────────────┼──────────┼────────┼───────┼──││
│                    │  │ ☐ │[IMG]  │ Streetwear   │ UC-004   │ ₹2,999 │ 0     │✗ ││
│                    │  │   │       │ Joggers      │          │        │       │  ││
│                    │  │   │       │ 4 variants   │          │        │ OOS   │  ││
│                    │  │───┼───────┼──────────────┼──────────┼────────┼───────┼──││
│                    │  │ ☐ │[IMG]  │ Limited      │ UC-005   │ ₹4,999 │ 12    │✗ ││
│                    │  │   │       │ Edition      │          │        │       │  ││
│                    │  │   │       │ Jacket       │          │        │ Draft│  ││
│                    │  └─────────────────────────────────────────────────────────┘│
│                    │                                                            │
│                    │  ┌─────────────────────────────────────────────────────────┐│
│                    │  │ [←] Page 1 of 5 [→]      [10 ▼] per page   48 products │││
│                    │  └─────────────────────────────────────────────────────────┘│
│                    │                                                            │
├────────────────────┴────────────────────────────────────────────────────────────┤
│  © 2024 UrbanCart Admin                                              v1.0.0     │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Table Columns

### Column Headers (sortable)
```
┌───┬───────┬──────────────┬──────────┬────────┬───────┬────────┬─────────┐
│ ☐ │ Image │ Product   ↕  │ SKU   ↕  │ Price↕ │ Stock↕│ Status │ Actions │
└───┴───────┴──────────────┴──────────┴────────┴───────┴────────┴─────────┘
```

### Product Row
```
┌───┬───────┬──────────────────────┬──────────┬────────┬───────┬────────┬─────────┐
│ ☐ │       │ Supreme Oversized    │ UC-001   │ ₹2,499 │ 45    │   ✓    │   ⋮     │
│   │[IMG]  │ Tee                  │          │        │       │ Active │         │
│   │       │ 4 variants           │          │        │       │        │         │
└───┴───────┴──────────────────────┴──────────┴────────┴───────┴────────┴─────────┘
```

### Stock States
```
Normal:    45     (black text)
Low:       ⚠ 3    (orange warning)
Out:       0 OOS  (red text)
```

### Status Badges
```
✓ Active   (green)
✗ Draft    (gray)
⏸ Archived (orange)
```

## Filters

### Filter Bar
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Filters:                                                                        │
│                                                                                 │
│ [Category ▼]     [Status ▼]      [Stock ▼]       [Price Range ▼]               │
│                                                                                 │
│ Active filters: T-Shirts ✕  In Stock ✕               [Clear All Filters]       │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Category Dropdown
```
┌─────────────────────────┐
│ All Categories          │
├─────────────────────────┤
│ ☐ T-Shirts (24)         │
│ ☐ Hoodies (12)          │
│ ☐ Bottoms (8)           │
│ ☐ Jackets (4)           │
│ ☐ Accessories (10)      │
└─────────────────────────┘
```

### Status Dropdown
```
┌─────────────────────────┐
│ All Statuses            │
├─────────────────────────┤
│ ○ Active (42)           │
│ ○ Draft (4)             │
│ ○ Archived (2)          │
└─────────────────────────┘
```

### Stock Dropdown
```
┌─────────────────────────┐
│ All Stock Levels        │
├─────────────────────────┤
│ ○ In Stock (40)         │
│ ○ Low Stock (5)         │
│ ○ Out of Stock (3)      │
└─────────────────────────┘
```

## Bulk Actions

### Actions Menu
```
┌─────────────────────────┐
│ Bulk Actions            │
├─────────────────────────┤
│ Set as Active           │
│ Set as Draft            │
│ Archive                 │
│ Delete                  │
│ ─────────────────────   │
│ Update Prices           │
│ Add to Collection       │
│ Export Selected         │
└─────────────────────────┘
```

### Bulk Selection
```
☑ 3 selected    [Actions ▼]  [Clear Selection]
```

## Row Actions

### Actions Menu (⋮)
```
┌─────────────────────────┐
│ Edit                    │
│ Duplicate               │
│ Preview                 │
│ ─────────────────────   │
│ Set as Draft            │
│ Archive                 │
│ Delete                  │
└─────────────────────────┘
```

## Quick Edit (Inline)
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Quick Edit: Supreme Oversized Tee                                          ✕   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  Price: ┌──────────┐   Stock: ┌──────────┐   Status: [Active ▼]                │
│         │ ₹2,499   │          │ 45       │                                     │
│         └──────────┘          └──────────┘                                     │
│                                                                                 │
│                                               [Cancel]  [Save Changes]          │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Empty State
```
┌─────────────────────────────────────────────────────────────┐
│                           📦                                │
│                                                             │
│                   No products found                         │
│                                                             │
│       Add your first product to start selling               │
│                                                             │
│                    [+ Add Product]                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Data Requirements
```typescript
interface ProductsListData {
  products: ProductListItem[];
  filters: {
    search: string;
    category: string[];
    status: ProductStatus[];
    stockLevel: StockLevel[];
    priceRange: [number, number];
  };
  pagination: PaginationInfo;
  sortBy: SortConfig;
  selectedIds: string[];
}

interface ProductListItem {
  id: string;
  name: string;
  image: string;
  sku: string;
  price: number;
  stock: number;
  status: 'active' | 'draft' | 'archived';
  variantCount: number;
  category: string;
}
```

## Component Dependencies
- DataTable
- SearchInput
- FilterDropdown
- BulkActions
- Pagination
- QuickEditModal
- ProductRow
