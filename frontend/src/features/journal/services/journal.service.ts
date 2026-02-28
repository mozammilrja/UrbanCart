// Journal Service
// Static data extracted from journal_editorial_stories/code.html

export interface JournalArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  alt: string;
  slug: string;
}

export interface FeaturedInterview {
  badge: string;
  title: string;
  author: string;
  readTime: string;
  heroImage: string;
  heroAlt: string;
  pullQuote: string;
  paragraphs: string[];
  inlineImage: string;
  inlineImageAlt: string;
  inlineImageCaption: string;
}

export const journalHero = {
  volume: "Volume IV • Issue 02",
  title: "The Art of",
  titleLine2: "Curated Living",
  description:
    "An exploration of the spaces we inhabit and the objects that define our daily rituals. This issue focuses on the intersection of modern minimalism and heritage craftsmanship.",
  ctaText: "Read Featured Story",
  heroImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCfJAEaYX-ySd2KfkTv7JP5tRx_5hhFgBvtt7ybHl5CsefWlKb9NJiVwNrt7d8_d7iwKGQcA1GhJPzvPRAl-gfbb_F7aCJe4uS19dMBXYRNd_DX7-bNF--_pR94pTiY2UUuihHyrOsC2XIoCW9SWoAi3y0tUmx7_yWct_wWfAmnfeRJ_SJdqLXr5vTyN2O3cIKInFkG7z4FV-1DmLujm_FhBQUucHIejl32AurwJ2KYfSplaxIafi1F-k7IOMqxtfOvhbC9Iwig0MdM",
  heroAlt: "Minimalist fashion studio with natural sunlight and neutral tones",
};

export const journalCategories = [
  { label: "All Stories", slug: "all", active: true },
  { label: "Craftsmanship", slug: "craftsmanship", active: false },
  { label: "Interviews", slug: "interviews", active: false },
  { label: "Travel", slug: "travel", active: false },
  { label: "Sustainability", slug: "sustainability", active: false },
];

export const journalArticles: JournalArticle[] = [
  {
    id: "1",
    title: "Tracing the Thread: Our Linen Heritage",
    excerpt:
      "Inside the family-run mills of Normandy where our signature fabric begins its journey from field to final garment.",
    category: "Craftsmanship",
    date: "March 12, 2024",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJXkmA1iEj2aX1vWTv198x8QgzrWJ8PQIgS7nzXxRn5MzucTmM_YRBLafAfDcLh6-EdSqh6X2ZLGlTzmayKWcXhP1E8fayCrAAR2fUWr3yQxd385h953XFdpZCL7igMGxW90muyem8kMc0hhLihNTROBwO7K42MGNLBmKWDkcJkcp42tKhzbqBQv8OE2AlJcOuuTyxMnGUrsGxUtJSevpsx74LC5m6_zi-x75lNpg3Ssn1mc2-iISnTK24TAoOe73WumAZdmILQN1t",
    alt: "Model wearing sustainable linen clothing in an architectural setting",
    slug: "linen-heritage",
  },
  {
    id: "2",
    title: "The Psychology of Space & Light",
    excerpt:
      "How our new flagship store was designed to promote tranquility and mindful discovery for every visitor.",
    category: "Design",
    date: "March 08, 2024",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCIF72MymdBis2TUDl-1mfd8ZpHWjoX7uePVH4mnep7bCrdxDmyWgT6SOeo7DqjUPmMcRHMhWWJL-9ogTIdkc-Ts9olXGXon3kEDBeu6kQJTXAypQ_pU8Y1PJm3UX_-M_5DOvQb_vHqNcj4Ti0iGpd81kKHtvcDEYqDj2HYSXhc_Qp0bXfpalnvgS6C_jUUu5ulwGVaxeXPniMD0uAR-yv5hAGpD2NYBum-Pof-u3Cn_g74EfLzvs7XaqKDXw3ud5StcdYc9Cg_UEJD",
    alt: "A clean, minimalist retail interior with wooden accents",
    slug: "psychology-space-light",
  },
  {
    id: "3",
    title: "Honest Materials, Enduring Forms",
    excerpt:
      "A deep dive into why we choose vegetable-tanned leathers and organic cottons for our core collection.",
    category: "Material",
    date: "February 24, 2024",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCmjMfgj1DdNhYltJx8aJSmx1GWp6DKBiyytLES0AGEG7AHYjFEYTz629JdB9gxQ9AmmbK7n_g5cA4RUedFZqDh_KmM6W50FyTlRaJ-XWv45OTpBHb3T3Y1YtkmwpC-dn-gSfVT4MzkO0KUd6NZbeg9oHw_kQsiUR0T1zDMfm7kZ8TrFEgz70L4tAp12r-bH1RfSzxuvLdvhMizUgDlt1kwzxUEF1Tsvz3RpUUeLWu4HWh5ZfwdcEb1pztYuMCG6dSAps5cJZjn30jT",
    alt: "Close up of high quality leather textures and tools",
    slug: "honest-materials",
  },
];

export const featuredInterview: FeaturedInterview = {
  badge: "In-Depth Interview",
  title: "Conversations on Slow Fashion with Elara Vance",
  author: "Julian Thorne",
  readTime: "12 Min Read",
  heroImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAzZdZ93LcxKG_egXUBqvm75ekw-kiYBtyJHIbRadnwRUY-AccAPx_7Fkt5uF0GJWn5zB3Sbq5135EaCPXnDuKuUCP8N-XuaUs1Tgy_aTEgmc8JD1ojC1_4gDl6IFOK3imeNa53D5_lYfeoxl0ZN_s-DX83IU0Y68Ye3qIAmfg4-jVaxYn4ZO8N1pPKf5cm6zvXtLkvr2iRwXddU8OC7YXeWVFj71SsoEOgCtIHPntxZDUtjQssvX1j-jwoM1EBjAsewvob7Qac1Dyz",
  heroAlt: "Portrait of a designer in a sunlit creative studio space",
  pullQuote:
    '"I believe that clothes should be like good friends—reliable, comforting, and they should only get better as you spend more time with them."',
  paragraphs: [
    "Elara Vance sits in her East London studio, surrounded by bolts of undyed wool and sketches that feel more like architectural blueprints than fashion drawings. Her approach to design is notoriously patient, often spending years perfecting a single silhouette before it reaches the production floor.",
    'In a world obsessed with the next trend, Vance represents a growing movement of designers who are deliberately stepping back. "The industry\'s current pace is unsustainable, not just for the planet, but for our creative spirits," she explains, pouring a cup of herbal tea. "We need time to breathe, to reflect, and to actually live in the clothes we make."',
    "The conversation shifts to the concept of 'emotional durability'—the idea that our attachment to an object can prevent it from ever reaching a landfill. This philosophy is baked into every seam of her latest collection, which features adjustable elements that allow garments to evolve with the wearer's changing body and lifestyle.",
  ],
  inlineImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD8830R57xCWiM_87oojoduY-yyU8UISIboYC8B6JlK3JFM6eI-rb4XKnh8nP2kSgd0tSDTFkqf_IDDwPlFqLqY3p6EsE_zIIPLt-eCAk1snehdDkQx6z8lybD91xxJmL_Sx940YJgoBTH81qqbEXZFjPi8EqMgi3MjTVhgfSTBZRtl4-8RXYt2hDiW4RN5xxtQoXNDAsODlYBE86uWgDQBinHZOsM-7lc_yeldL3vaulx6Gqw1bCRKDs71DChkv0_SEPNwGQdGvH5Q",
  inlineImageAlt: "Still life of neutral toned clothing and artistic books",
  inlineImageCaption:
    "Above: Selected pieces from the Spring Archive collection.",
};

export const newsletterSection = {
  title: "Join the Conversation",
  description:
    "Receive our monthly editorial digest, featuring exclusive interviews, design insights, and cultural recommendations.",
  placeholder: "Your email address",
  buttonText: "Subscribe",
};
