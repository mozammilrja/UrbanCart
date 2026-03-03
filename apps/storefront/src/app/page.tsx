import {
  HeroSection,
  LatestDropSection,
  CategorySection,
  BannerSection,
  ProductGridSection,
  StoreLocationsSection,
} from '@/components/sections';
import {
  products,
  getCapsProducts,
  getLatestProducts,
  banners,
  storeLocations,
} from '@/data/mock';

export default function HomePage() {
  const latestProducts = getLatestProducts(8);
  const capsProducts = getCapsProducts();
  const featuredProducts = products.slice(0, 8);

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        image="https://bluorng.com/cdn/shop/files/htfyjh.jpg?v=1772344996"
      />

      {/* Latest Drop Section */}
      <LatestDropSection
        title="Latest drop"
        products={latestProducts}
        viewAllHref="/collections/new"
        viewAllText="Discover more"
      />

      {/* Caps Category Section */}
      <CategorySection
        title="Caps"
        description="Premium headwear collection"
        products={capsProducts}
        viewAllHref="/caps"
        viewAllText="Shop All Caps"
        bgColor="gray"
      />

      {/* Banner Section with Swiper */}
      <BannerSection banners={banners} />

      {/* Featured Products Grid */}
      <ProductGridSection
        title="Featured Pieces"
        subtitle="Curated selection of our best sellers"
        products={featuredProducts}
        columns={4}
        viewAllHref="/collections"
        viewAllText="View All Products"
      />

      {/* Store Locations */}
      <StoreLocationsSection
        title="Our Stores"
        subtitle="Visit us in person"
        stores={storeLocations}
      />
    </>
  );
}
