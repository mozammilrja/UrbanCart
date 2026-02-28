// About Service
// Static data extracted from about_brand_philosophy/code.html

export interface PhilosophyPillar {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
}

export const aboutHero = {
  title: "CRAFTING",
  titleAccent: "Permanence",
  description:
    "A modern perspective on heritage. We believe in the quiet power of exceptional materials and the hands that shape them.",
};

export const editorialPortrait = {
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDeYJKkXUMiEE25HWGHeH5dat4amsWKQjNsP2cFqd4Ddx6-fApyUlin1Aas3qzatQbkQ0_ZwiRlhGebQ25ul3dPZrsOeVEpamtuSvoWIlCUmVJtvO5EK9HJvGw8YQM7JEk2e7H1lhk3ZurJFr0Rlt8UJZAciHMDRX1BB7bI4ilWJBEGLZYTBzSp3xxvXCNsHnY5WP7OoR8Of9qOMGuFwX8e_o0QAeHIA2VljEDTtwb9Hu3KOXewTRPTk8zWmwA2B7Ow7HisrtqlZNfz",
  established: "Est. 1994",
  caption:
    "Our atelier in Florence, where every silhouette begins its journey through time.",
};

export const philosophyPillars: PhilosophyPillar[] = [
  {
    id: "materials",
    number: "01",
    title: "Noble Fibers",
    description:
      "We partner exclusively with heritage mills in Biella and Kyoto. Our cashmere is ethically sourced, and our linens are woven using techniques unchanged for centuries. Every thread is selected for its longevity and tactile narrative.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDBOdfpTdtWW1chfyUItSjr3_o8EcvQIh8P38jtRhIouZn3F4T30f9XNCGJ_fCjbOQMZV3cYIxKq_wJDFZl06c6F0zf_I-yngWNoYSt0cf_dHja3F5JXKyZecuVRT79Bnc6Y8M2Rhf2x9zLIw8Ek3g9SZhk5KcDKSYU6-CJuaIB8pPCqU91f0UccT6eVtVseYDWl21dguZ1X9Cxj-521zizu9gXRYdUJPw8YeoegFOYr_Ujz4xcZHDUHCz7FSvFHoql_9O7kRHEt-wA",
  },
  {
    id: "process",
    number: "02",
    title: "Master Tailoring",
    description:
      "Design is a dialogue between form and function. Each piece undergoes twenty-eight distinct quality checks, from the initial hand-drawn sketch to the final hand-stitched hem. Perfection is not our goal; character is.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAnAvmc-08akd6Hc2IJjjBnrALd1rmWH8sUs_IOoB2lRyfuxqYgeUo2RzmPw3xQUgOinUUej0ndGjxiZLS3uEFgzbra4hkk68Q0hmbt44vKRHK_QSRPXpXY24VKNqli5xkAf6DmXcLVcMAl3zyt2UAhW3AUvObpU7yUkPFWjvsDwOwGACuT9U9fiIvDBaPzTTQvzipbO1z1ONMB2ibjF5Y9htZrXwvhIuAH1aP-r5g8Gqywpb1kVpKmzZVc3zdujZRYV937V3knhYtl",
  },
  {
    id: "legacy",
    number: "03",
    title: "Slow Living",
    description:
      "We reject the cycles of fast fashion. Our collections are released in small, curated editions meant to be lived in, repaired, and passed down. To own an ELÉGANCE piece is to invest in a future of conscious consumption.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDo7FyHeIn5g1KDnzo5ZXQTJ7kI-h0XeWBohloHYPzUJxopbThORF-Z-Nr3aBcWA7JxVH6q7CDW--SxflIKxomARB5sOcpyXU0mcH7lvFyBf2Z2pqid6OE4ltSYUcvuky7ZPZTa49ys7eG4M6OVLqItH5ztLmBBHkV5auTVru1E0M4wykgzV5xZdFjaBz3oxWNf5-atjduifHVFXfXRI915O7hxwWQ2x-NlXjvCAHY9xNt8DNIJeW60xCN1NdAdRym6hm8pORHrflKt",
  },
];

export const studioSpotlight = {
  title: "The Sanctuary",
  titleAccent: "of Creation",
  quote:
    '"The studio is not just a workplace; it\'s a living archive. Light, shadow, and silence are as much a part of our tools as the shears and needles."',
  description:
    "Located in the heart of a restored 19th-century industrial space, our design headquarters serves as both a laboratory for textile innovation and a gallery for our finished works.",
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDkyCrVlykT0Y85y-rreB9Rzb34a0qN9l4ZFSD6JHjvqQzJ9GkaRwlSIjgpVrnmjjJUxRqCGEPSdgKYQVyw3LWUu60aFfMXBZclsbjkO7y4z1p4PUF-e1ZBRIvecNpZpeA618HbFtw3eY79l6M-mxU2Eb2aVZISgaU4EseJSC1sZiZmkrEkUonfBW2_2VoWqiG9LkvBWGzEujzusWPJzX7JhF7vztaNGa5YHlh3n298SEhePae3Nty6i0DG9-QsDW-9uyuiYvancnRa",
};

export const signatureQuote = {
  text: "Fashion is temporary, but",
  highlight: "intent",
  textContinued:
    "is everlasting. We design for the person you are becoming.",
  author: "Margot de L'Égance, Creative Director",
};
