import type { Product } from "@/types/product";

export const featuredProduct: Product = {
  id: "featured-1",
  name: "The Signature Oversized Overcoat",
  price: 1250,
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCW-YN9al3YuONp7Xjcgpp3TeNSsTSIJje4PdgpSYRn_2bdRAZYatB3BOxb2hZv-LA6lqbgJJlcwQuQ8g-y2iuF1KOy7VA_kR8ibFvknOrEQ2_NYSCp2QZ_CyHxlvhoBgGE3N-bZ2Akle2Fc-qqqYFVqMsiQoNWlwDAhbSqeObaTI4JNPPsM0KNEbt7X4JAEWY3st0SQlxGfHE7DHdawm3e9zZweEF4frT716cY6cf315FuptPs5Da2WQKzFqmJLAu8GVkQ4OnaBkdB",
  category: "Outerwear",
  description: "Crafted from 100% premium double-faced wool sourced from Italy. This piece is unlined to maintain its fluid silhouette and lightweight feel.",
  sizes: ["XS", "S", "M", "L"],
  images: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCW-YN9al3YuONp7Xjcgpp3TeNSsTSIJje4PdgpSYRn_2bdRAZYatB3BOxb2hZv-LA6lqbgJJlcwQuQ8g-y2iuF1KOy7VA_kR8ibFvknOrEQ2_NYSCp2QZ_CyHxlvhoBgGE3N-bZ2Akle2Fc-qqqYFVqMsiQoNWlwDAhbSqeObaTI4JNPPsM0KNEbt7X4JAEWY3st0SQlxGfHE7DHdawm3e9zZweEF4frT716cY6cf315FuptPs5Da2WQKzFqmJLAu8GVkQ4OnaBkdB",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBMtfJdKdNY4YJprOFEMbmLqQfEpf43nRb3-mtkUggQcGJkAyCH7gUyrx31pt1G9aro68PVDwb17xWijE1uEmMbF19Ss0i4DJmluZvSIAttswoDZr9GtCVeNhVJYEfcA16RLZaiFIVU_Rkml2UJv-Vj-hnI7YvdiuXRt8djfgiFmvPYShyWU3I2uimLq7f39pbMRJwnQPbUU3z8gZnA0J7jIrcX5CVxI3h9DG09aE-OVMd554HiXVq_zSUOKGvH2PBFG_E9d2gHZRQb",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB8yUHztTwtQjNDUDZPSUosj6OCcs3kz4L5wluK3xWgM-sU4phaZwlt9rUTv8mGZ23di93nTqrPpJf3MKn3wbtRl-w_v_Wfi4qYXn1shakjfgzAPsEQhnEgUuIQWdhYLC4tbKvAxfneDBHU-bhx6oGhuknjWtFzpQCn16_8RXbGp7eSqqdceomLrBR9shhrVURfmTan-Sgc5d-9cqf_wg7FnC5SnhjGZaDDqLvd1yREGrTMsK5AQJaLfU6tXqVECrmyndxF60-F_qUw",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAplOZ5_CADLGbIk1gyosWvd1QViHGGyYf6-UenCgVJri-7RSNhlPal0ce3FLPI1T-uMH9WpWRZTmmF5UXXk2VdU3xrXHVPPLi9XvNrbIHkU8FhU8FrLGLim66Jomfo7uP84zXYl4Vh1BfHjgke7-KJclIMsbHQRSJweFZ9XMRFSku--wSbyQRSYL-pAMrCR81yfSA7GY1KZjMdA6mXqYjXkuoCfYOCwGWozsXVziozefPtpKKU3bUPOMTTP3BIuYKLfojhVICtag3a",
  ],
};

export const relatedProducts: Product[] = [
  {
    id: "related-1",
    name: "Pleated Wide Trousers",
    price: 450,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkh-w-Uu0_IO7IsNnHtGDymwJ2sQ2GFEzIInFFIP-gOtbTLv7a7ZTz_RbQwBPZHCfWHqFDdfRWbhphF8TPUULb-qkIeDnXMXPKafGppeLrwhh2qOQiDPgS_Uc35AomV8p2F2lcIlbEKQ4RE84xkbfexslh5KzwqBvztgP1KagKMQWBcevy0IyNh_MkZa38Viv1IofQD0vJ_lookmLYB3S1EFg6XKyX8jPyfj-PHvY6JgT8vFd9R4eLnx7kHAzBgiYOzTRtQ5jEu1o2",
    category: "Bottoms",
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "related-2",
    name: "Essential Cashmere Knit",
    price: 320,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuIvH4KnDGfdCJjNu99qEwg1YE7YIFIY8V0vbaWg4JNkSsqUNIc1AUyGkZLK8-Q_xDZyDvzI5HZyQvmYabjopH4yDxsuHyon-2KxNBaH7q76zybwTx86hxeH-lGm_GHTfJ1C7uoqslrRBNnL8BdbX4_IA56SCN6cbHYGT1qNkaB9g5ayCQCJ7GTi5XkzvN7xpAmdtEKHTc9pCddzNgB3rXSxgAi1W-dab9jd0v90JlX7z5eTIL5DO6nNTQvlIh2F6hDDOLvTHbeP1F",
    category: "Knitwear",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "related-3",
    name: "Pointed Leather Boots",
    price: 590,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuaxib_loaL9ej4AA7H0xsFzfMJwkgytpSlNdDuCxXZSEi98Ve13c-eH1X3mAHS-Myc0ntJT8fh-k7h5Ki6eLpltyO9AQhxDd-u3mURVmk2-YwTDqW634unh4XAsKKfGndL7e2aSLvQ7soH26liDzLjOemiJRm1hsdG_51z3pQjfEGT7fEuGjXz9b-U-L4xQ6Ux5kApTygD6XyToQ5KFQuj-JIOjhLlerNsJllmZcEvxAtNU3zS3YGgUt83foSbdWb6jkrY01IUeUM",
    category: "Accessories",
    sizes: ["38", "39", "40", "41", "42"],
  },
  {
    id: "related-4",
    name: "Structured Day Tote",
    price: 850,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDq2plUSWASL2MEZcio0uMlD0v9qwlurfZtqlRW9238HXIhsfkGLYq9IR6Ipweyw5NBZJgUtrKtIbKh1pSvMLLHqQx-ca0nJs5EVYDyscQ3SgcCoFVnP2-iikMMBu-YlNiQwqxGftA4T9i3JMYZp-v-RDM5ifeIoZ8rVGrPL_v8OfGvl78KemX_q0BzaW2KFOKmk_owTIUXWQegcVAH9-JMSbMDYTpM3X7HfT4ZBuL2u8SViAkSZmo4R_J3qUYj9cTYSd-T8plnGjKV",
    category: "Accessories",
  },
];

export const productDetails = {
  rating: 4.9,
  reviewCount: 42,
  fabricCare: "Crafted from 100% premium double-faced wool sourced from Italy. This piece is unlined to maintain its fluid silhouette and lightweight feel. Dry clean only. Store on a wide-shoulder hanger to maintain shape.",
  stylingSuggestions: [
    "Pair with our Cashmere Turtleneck for a tonal look",
    "Wear open over tailored trousers for business casual",
    "Cinch with the detachable belt for a structured waistline",
  ],
  shippingReturns: "Complimentary carbon-neutral shipping on all orders. Returns accepted within 30 days.",
};
