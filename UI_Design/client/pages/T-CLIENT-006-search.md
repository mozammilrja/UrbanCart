# T-CLIENT-006: Search Results Page

## Page Overview
Search results display with instant suggestions, filtering capabilities, and alternative recommendations.

## Wireframe

### Desktop (1280px+)
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              HEADER (sticky)                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │ 🔍  oversized tee                                                    ✕  │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│  Showing 45 results for "oversized tee"                                         │
│                                                                                 │
├────────────────────┬────────────────────────────────────────────────────────────┤
│                    │                                                            │
│  FILTERS           │  ┌──────────────────────────────────────────────────────┐  │
│  ──────────────    │  │ Sort by: [Relevance ▼]           Grid: [▦] [≡]       │  │
│                    │  └──────────────────────────────────────────────────────┘  │
│  Category          │                                                            │
│  ○ All (45)        │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  ○ T-Shirts (28)   │  │          │ │          │ │          │ │          │      │
│  ○ Hoodies (12)    │  │  [IMAGE] │ │  [IMAGE] │ │  [IMAGE] │ │  [IMAGE] │      │
│  ○ Accessories (5) │  │          │ │          │ │          │ │          │      │
│                    │  │      ♡   │ │      ♡   │ │      ♡   │ │      ♡   │      │
│  ────────────      │  ├──────────┤ ├──────────┤ ├──────────┤ ├──────────┤      │
│                    │  │ Brand    │ │ Brand    │ │ Brand    │ │ Brand    │      │
│  Price Range       │  │ Oversized│ │ Oversized│ │ Oversized│ │ Oversized│      │
│  ₹Min ──●── ₹Max   │  │ Tee      │ │ Graphic  │ │ Basic    │ │ Premium  │      │
│                    │  │ ₹1,999   │ │ ₹2,499   │ │ ₹1,499   │ │ ₹2,999   │      │
│  ────────────      │  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│                    │                                                            │
│  Size              │  ... more results ...                                      │
│  [S] [M] [L] [XL]  │                                                            │
│                    │  ┌────────────────────────────────────────────────────┐    │
│  ────────────      │  │ [←] [1] [2] [3] ... [5] [→]       45 results       │    │
│                    │  └────────────────────────────────────────────────────┘    │
│  [Clear Filters]   │                                                            │
│                    │                                                            │
├────────────────────┴────────────────────────────────────────────────────────────┤
│                              FOOTER                                              │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Search Overlay (Desktop)
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ┌─────────────────────────────────────────────────────────────────────────────┐ │
│ │ 🔍  oversi|                                                            ✕   │ │
│ ├─────────────────────────────────────────────────────────────────────────────┤ │
│ │                                                                             │ │
│ │  SUGGESTIONS                                                                │ │
│ │  oversized tee                                                              │ │
│ │  oversized hoodie                                                           │ │
│ │  oversized fit                                                              │ │
│ │                                                                             │ │
│ │  ─────────────────────────────────────────────────────────────────────────  │ │
│ │                                                                             │ │
│ │  PRODUCTS                                                                   │ │
│ │  ┌──────────────────────────────────────────────────────────────────────┐  │ │
│ │  │ [IMG]  Supreme Oversized Tee                              ₹2,499     │  │ │
│ │  └──────────────────────────────────────────────────────────────────────┘  │ │
│ │  ┌──────────────────────────────────────────────────────────────────────┐  │ │
│ │  │ [IMG]  Basic Oversized T-Shirt                            ₹1,499     │  │ │
│ │  └──────────────────────────────────────────────────────────────────────┘  │ │
│ │  ┌──────────────────────────────────────────────────────────────────────┐  │ │
│ │  │ [IMG]  Oversized Graphic Tee                              ₹1,999     │  │ │
│ │  └──────────────────────────────────────────────────────────────────────┘  │ │
│ │                                                                             │ │
│ │  ─────────────────────────────────────────────────────────────────────────  │ │
│ │                                                                             │ │
│ │  COLLECTIONS                                                                │ │
│ │  [Oversized Essentials]  [Summer Basics]                                   │ │
│ │                                                                             │ │
│ │  ─────────────────────────────────────────────────────────────────────────  │ │
│ │                                                                             │ │
│ │  CATEGORIES                                                                 │ │
│ │  [T-Shirts]  [Hoodies]  [Tops]                                             │ │
│ │                                                                             │ │
│ └─────────────────────────────────────────────────────────────────────────────┘ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Mobile Search Results
```
┌─────────────────────────────┐
│ ← Search                    │
├─────────────────────────────┤
│ 🔍 oversized tee         ✕  │
├─────────────────────────────┤
│ 45 results                  │
├─────────────────────────────┤
│ [Filter]   [Sort ▼]         │
├─────────────────────────────┤
│ ┌───────────┐ ┌───────────┐ │
│ │           │ │           │ │
│ │ [IMAGE] ♡ │ │ [IMAGE] ♡ │ │
│ │           │ │           │ │
│ │ Oversized │ │ Oversized │ │
│ │ Tee       │ │ Graphic   │ │
│ │ ₹1,999    │ │ ₹2,499    │ │
│ └───────────┘ └───────────┘ │
│                             │
│ ... more results ...        │
│                             │
│ [Load More]                 │
└─────────────────────────────┘
```

### No Results State
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│  🔍  xyz123abc                                                             ✕   │
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│                              🔍                                                 │
│                                                                                 │
│                  No results found for "xyz123abc"                               │
│                                                                                 │
│                       Try these suggestions:                                    │
│                                                                                 │
│                  • Check for typos                                              │
│                  • Use more general terms                                       │
│                  • Search for a similar item                                    │
│                                                                                 │
│  ─────────────────────────────────────────────────────────────────────────────  │
│                                                                                 │
│                           POPULAR SEARCHES                                      │
│                                                                                 │
│               [tees]  [hoodies]  [jackets]  [oversized]                        │
│                                                                                 │
│  ─────────────────────────────────────────────────────────────────────────────  │
│                                                                                 │
│                          TRENDING PRODUCTS                                       │
│                                                                                 │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐   │
│  │   [PRODUCT]    │ │   [PRODUCT]    │ │   [PRODUCT]    │ │   [PRODUCT]    │   │
│  │   Trending 1   │ │   Trending 2   │ │   Trending 3   │ │   Trending 4   │   │
│  └────────────────┘ └────────────────┘ └────────────────┘ └────────────────┘   │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Search Features

### Instant Search (Autocomplete)
- **Trigger**: On typing (debounced 200ms)
- **Min characters**: 2
- **Results shown**: 
  - Suggestions (4 max)
  - Products (6 max)
  - Collections (3 max)
  - Categories (3 max)

### Search Suggestions
```
SUGGESTIONS              ← Header
oversized tee            ← Highlighted matching text
oversized hoodie
oversized fit
```

### Recent Searches
```
RECENT                   ← Header
🕐 black hoodie          ← With clock icon
🕐 summer tee
🕐 joggers

[Clear All]
```

### Popular Searches
```
POPULAR                  ← Header
🔥 streetwear           ← With fire icon
🔥 vintage
🔥 limited edition
```

## URL Structure
```
/search                       # Empty search
/search?q=oversized+tee       # With query
/search?q=tee&category=shirts # With filter
/search?q=tee&sort=price-asc  # With sort
```

## Search Analytics
Track:
- Search queries
- Zero-result searches
- Click-through rates
- Search refinements

## Data Requirements
```typescript
interface SearchPageData {
  query: string;
  results: {
    products: Product[];
    totalCount: number;
    facets: SearchFacets;
  };
  suggestions: string[];
  pagination: PaginationInfo;
  didYouMean?: string;  // Spell correction
}

interface SearchSuggestionsData {
  suggestions: string[];
  products: ProductPreview[];
  collections: CollectionPreview[];
  categories: Category[];
  recentSearches: string[];
  popularSearches: string[];
}
```

## Performance
- Debounce search input (200ms)
- Cache recent searches locally
- Preload first results page
- Use search index (Algolia/Elasticsearch)

## Accessibility
- `role="search"` on container
- `aria-label="Search products"`
- `aria-autocomplete="list"` on input
- `aria-expanded` for dropdown
- Keyboard navigation (↑↓ Enter Escape)
- Announce results count

## Component Dependencies
- SearchInput
- SearchOverlay
- SearchSuggestions
- SearchResults
- FilterSidebar
- ProductCard
- Pagination
- NoResults
