// Collection Service
// Static data extracted from collection_seasonal_lookbook/code.html

export interface CollectionProduct {
  id: string;
  name: string;
  color: string;
  price: string;
  image: string;
  alt: string;
  offset?: boolean;
}

export const collectionHero = {
  season: "Autumn / Winter 2024",
  title: "The Ethereal Collection",
  description:
    "A curated seasonal lookbook inspired by the shifting gradients of warm light and the quiet elegance of minimal forms.",
  ctaText: "View Editorial",
  heroImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDWgl3u4L3DXG_WchnBXN8b7EimPC3HcrHjwVIHwB02t3z2Iz9i5AV9H_oiwbMMErW5LzTvRHflSNnivPKuL4w3i50BPAOZn_BX93bYL24spODgfZ3UnGkZ0e3R9YgRZB20at3n_oDvqGd_NahJo03WgWZPfg6yxFmEWLaUPMZukGTU_VO2W1EWb5lTU1NlXUn8Yucqs_KUwi2FRjZqPbQyadt1eKXP4lZmg5PqFsievkRujv88HVi9m1ybFP6q-IrvbiIR-9BB6T1i",
  heroAlt: "Editorial fashion model posing in warm sunset lighting",
};

export const collectionFilters = [
  { label: "All Pieces", slug: "all", active: true },
  { label: "Outerwear", slug: "outerwear", active: false },
  { label: "Knitwear", slug: "knitwear", active: false },
  { label: "Accessories", slug: "accessories", active: false },
];

export const collectionSortOptions = [
  { label: "Curated", value: "curated" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low-High", value: "price-asc" },
];

export const collectionProducts: CollectionProduct[] = [
  {
    id: "1",
    name: "Structured Wool Topcoat",
    color: "Sandstone Melange",
    price: "$850.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCKbrvEnl9U5TLPIkHd1IugBHIQT_TxnSA5kOmSeNT56_WRcTTt0jDCEdPJw6z1J9i52PxK-m0I7vhetx40XNXPhX3scTOiIc5yU_G8Y-BBHFzK166z5ydqgSAx6Pt6qliBsou-zxHqYwuzJ3ljjubZ-avYfWsDPZVz9XW70HiomOQnmELVG0Vxj_wgklvXVDcL4Gi9kpihulQsfcmdjrBGp3PIXVPmSJMurNYo-R9usa2NnbnYbDdTcJaLLU5zSZI3Db2Lt98ZIATp",
    alt: "Minimalist long wool coat in beige",
    offset: false,
  },
  {
    id: "2",
    name: "Liquid Silk Bias Dress",
    color: "Aura Bronze",
    price: "$420.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfHvJLU5eQShTPt1JgmVxcJ6O4DSXWFPopSQAGXn2Fj0LihEJU-9aKPrycvWeZtnIcGlZ8sH9MMS7cirErBboPrnSMyVMAWJW84GnzbUJNlyIuh0cTifsPfuGIVXS3oO-_nx75h_kWM38Wx4hGhYTg5eU3YA2fOX5WHQWoZO7k01JgRMQxEp6TFdAqKHd-wP7h4-iIvKNoDebzL8fi-3qqtzSIyMQm7wWqASWMjvJfTbBXk4ztjWtlbcL_g-Z6Y6npl0gcOkQ-bihb",
    alt: "Heavy silk slip dress in deep copper",
    offset: true,
  },
  {
    id: "3",
    name: "Hand-Knit Cashmere Pullover",
    color: "Bone Ivory",
    price: "$595.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDJ4_TLBVnz5OZhYA0DzZ7QWZWLA_vPi43rWD0TalLKlJi6a1Dp4HLVEqbJM9BaqirGnONCKnZHkcSMYfGppwqldg2_MKbeLjCv1g9GeUEegrg_koOZFOPyUhG3CXvMQ4CCsQmvq0ruDJuaOJQ8uRjEA_ItUvmBANqrznvieo-IjKVwWIFCFdFpGzK-wEAS_JHr2tH4QhGwm1O8NbNjQh9y9Z7tOx83oWsRscb6w8ALJGflA4sSQTL-nBjsLKaowelIFO6MH7EhJp9i",
    alt: "Oversized chunky knit cashmere sweater",
    offset: false,
  },
  {
    id: "4",
    name: "Pleated Merino Trousers",
    color: "Espresso",
    price: "$340.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-XftkbnuC2H8Bd2eHXhxZwg1qjqzkEcwCb0BskW_7MnxTAOeca0c-4kner_ALrv1OGGNa1B7uifjRcZUg-aJ2g3oOHZI5aVrGWkT77Mzt5kzpONGGeeeyo4mr7aljsiVcYjspIggNJHmQB4FoFTDtOqqn1AZdV1F0Q9n9HLDrngSe7ehy3yyLv0atVIm8iJz1JeWQbr_ZpMZPxEexBtrtE7XHWD32ECbXd7Vsuu_sjjNwRz_pIEv4Z7Iy4PcNStjPaFfRlkdukuIz",
    alt: "High waisted tailored trousers in chocolate wool",
    offset: true,
  },
];

export const editorialCta = {
  icon: "auto_stories",
  title: "Experience the Lookbook",
  description:
    "Our seasonal editorial is available in a limited print run. Each edition features exclusive photography and a deeper look into our creative process.",
  buttonText: "Request Limited Print Edition",
};
