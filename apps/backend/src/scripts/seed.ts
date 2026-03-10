import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { config } from '../config/index.js';
import {
  User,
  Product,
  Category,
  Collection,
  Coupon,
} from '../models/index.js';

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(config.mongodb.uri);
    console.log('Connected.');

    // Clear existing data
    console.log('Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      Category.deleteMany({}),
      Collection.deleteMany({}),
      Coupon.deleteMany({}),
    ]);

    // Create categories
    console.log('Creating categories...');
    const tshirts = await Category.create({
      name: 'T-Shirts',
      slug: 't-shirts',
      description: 'Premium streetwear tees with bold graphics and clean cuts',
      image: '/images/categories/tshirts.jpg',
      isActive: true,
      sortOrder: 1,
    });

    const hoodies = await Category.create({
      name: 'Hoodies',
      slug: 'hoodies',
      description: 'Heavyweight hoodies built for style and comfort',
      image: '/images/categories/hoodies.jpg',
      isActive: true,
      sortOrder: 2,
    });

    const joggers = await Category.create({
      name: 'Joggers',
      slug: 'joggers',
      description: 'Streetwear joggers for the modern wardrobe',
      image: '/images/categories/joggers.jpg',
      isActive: true,
      sortOrder: 3,
    });

    const caps = await Category.create({
      name: 'Caps',
      slug: 'caps',
      description: 'Statement headwear for every occasion',
      image: '/images/categories/caps.jpg',
      isActive: true,
      sortOrder: 4,
    });

    const accessories = await Category.create({
      name: 'Accessories',
      slug: 'accessories',
      description: 'Bags, socks, and more to complete the look',
      image: '/images/categories/accessories.jpg',
      isActive: true,
      sortOrder: 5,
    });

    // Create products
    console.log('Creating products...');
    const products = await Product.insertMany([
      {
        name: 'Apostle Classic Logo Tee',
        slug: 'apostle-classic-logo-tee',
        description: 'Our signature logo tee featuring premium 220 GSM cotton with a relaxed fit. The foundation of every APOSTLE wardrobe.',
        shortDescription: 'Signature 220 GSM cotton logo tee',
        category: tshirts._id,
        basePrice: 1299,
        comparePrice: 1599,
        variants: [
          { size: 'S', color: 'Black', sku: 'APT-CLT-BLK-S', stock: 25 },
          { size: 'M', color: 'Black', sku: 'APT-CLT-BLK-M', stock: 40 },
          { size: 'L', color: 'Black', sku: 'APT-CLT-BLK-L', stock: 35 },
          { size: 'XL', color: 'Black', sku: 'APT-CLT-BLK-XL', stock: 20 },
          { size: 'S', color: 'White', sku: 'APT-CLT-WHT-S', stock: 20 },
          { size: 'M', color: 'White', sku: 'APT-CLT-WHT-M', stock: 35 },
          { size: 'L', color: 'White', sku: 'APT-CLT-WHT-L', stock: 30 },
          { size: 'XL', color: 'White', sku: 'APT-CLT-WHT-XL', stock: 15 },
        ],
        images: ['/images/products/classic-logo-tee-1.jpg', '/images/products/classic-logo-tee-2.jpg'],
        thumbnail: '/images/products/classic-logo-tee-thumb.jpg',
        material: '100% Combed Cotton, 220 GSM',
        careInstructions: 'Machine wash cold. Do not bleach. Tumble dry low.',
        isActive: true,
        isFeatured: true,
        tags: ['logo', 'essential', 'cotton', 'unisex'],
      },
      {
        name: 'Street Prophet Oversized Tee',
        slug: 'street-prophet-oversized-tee',
        description: 'Dropped shoulders, boxy fit, and bold back graphic. Made from 240 GSM cotton for that premium heavyweight feel.',
        shortDescription: 'Oversized 240 GSM graphic tee',
        category: tshirts._id,
        basePrice: 1499,
        comparePrice: 1899,
        variants: [
          { size: 'M', color: 'Charcoal', sku: 'APT-SPO-CHR-M', stock: 30 },
          { size: 'L', color: 'Charcoal', sku: 'APT-SPO-CHR-L', stock: 25 },
          { size: 'XL', color: 'Charcoal', sku: 'APT-SPO-CHR-XL', stock: 20 },
          { size: 'M', color: 'Olive', sku: 'APT-SPO-OLV-M', stock: 25 },
          { size: 'L', color: 'Olive', sku: 'APT-SPO-OLV-L', stock: 20 },
          { size: 'XL', color: 'Olive', sku: 'APT-SPO-OLV-XL', stock: 15 },
        ],
        images: ['/images/products/street-prophet-1.jpg', '/images/products/street-prophet-2.jpg'],
        thumbnail: '/images/products/street-prophet-thumb.jpg',
        material: '100% Combed Cotton, 240 GSM',
        careInstructions: 'Machine wash cold. Do not bleach. Hang dry.',
        isActive: true,
        isFeatured: true,
        tags: ['oversized', 'graphic', 'heavyweight', 'unisex'],
      },
      {
        name: 'Nocturnal Heavyweight Hoodie',
        slug: 'nocturnal-heavyweight-hoodie',
        description: 'Our flagship hoodie in 400 GSM fleece. Embroidered logo, kangaroo pocket, and ribbed cuffs. Built for the streets.',
        shortDescription: '400 GSM fleece embroidered hoodie',
        category: hoodies._id,
        basePrice: 2999,
        comparePrice: 3499,
        variants: [
          { size: 'S', color: 'Black', sku: 'APT-NHH-BLK-S', stock: 15 },
          { size: 'M', color: 'Black', sku: 'APT-NHH-BLK-M', stock: 30 },
          { size: 'L', color: 'Black', sku: 'APT-NHH-BLK-L', stock: 25 },
          { size: 'XL', color: 'Black', sku: 'APT-NHH-BLK-XL', stock: 15 },
          { size: 'M', color: 'Navy', sku: 'APT-NHH-NVY-M', stock: 20 },
          { size: 'L', color: 'Navy', sku: 'APT-NHH-NVY-L', stock: 20 },
        ],
        images: ['/images/products/nocturnal-hoodie-1.jpg', '/images/products/nocturnal-hoodie-2.jpg'],
        thumbnail: '/images/products/nocturnal-hoodie-thumb.jpg',
        material: '80% Cotton, 20% Polyester, 400 GSM Fleece',
        careInstructions: 'Machine wash cold inside out. Do not bleach. Tumble dry low.',
        isActive: true,
        isFeatured: true,
        tags: ['hoodie', 'heavyweight', 'embroidered', 'premium'],
      },
      {
        name: 'Cipher Zip-Up Hoodie',
        slug: 'cipher-zip-up-hoodie',
        description: 'Minimal zip-up with hidden pockets and tonal branding. The perfect layering piece.',
        shortDescription: 'Minimal zip-up with hidden pockets',
        category: hoodies._id,
        basePrice: 2799,
        comparePrice: 3299,
        variants: [
          { size: 'M', color: 'Grey Melange', sku: 'APT-CZH-GRY-M', stock: 20 },
          { size: 'L', color: 'Grey Melange', sku: 'APT-CZH-GRY-L', stock: 20 },
          { size: 'XL', color: 'Grey Melange', sku: 'APT-CZH-GRY-XL', stock: 15 },
          { size: 'M', color: 'Black', sku: 'APT-CZH-BLK-M', stock: 20 },
          { size: 'L', color: 'Black', sku: 'APT-CZH-BLK-L', stock: 18 },
        ],
        images: ['/images/products/cipher-zipup-1.jpg'],
        thumbnail: '/images/products/cipher-zipup-thumb.jpg',
        material: '80% Cotton, 20% Polyester, 360 GSM',
        careInstructions: 'Machine wash cold. Do not iron on print. Hang dry.',
        isActive: true,
        isFeatured: false,
        tags: ['zip-up', 'hoodie', 'minimal', 'layering'],
      },
      {
        name: 'Apostle Cargo Joggers',
        slug: 'apostle-cargo-joggers',
        description: 'Six-pocket cargo joggers with elastic waist and tapered fit. Utility meets streetwear.',
        shortDescription: 'Six-pocket tapered cargo joggers',
        category: joggers._id,
        basePrice: 2199,
        comparePrice: 2599,
        variants: [
          { size: 'S', color: 'Black', sku: 'APT-ACJ-BLK-S', stock: 18 },
          { size: 'M', color: 'Black', sku: 'APT-ACJ-BLK-M', stock: 30 },
          { size: 'L', color: 'Black', sku: 'APT-ACJ-BLK-L', stock: 25 },
          { size: 'XL', color: 'Black', sku: 'APT-ACJ-BLK-XL', stock: 12 },
          { size: 'M', color: 'Olive', sku: 'APT-ACJ-OLV-M', stock: 22 },
          { size: 'L', color: 'Olive', sku: 'APT-ACJ-OLV-L', stock: 18 },
        ],
        images: ['/images/products/cargo-joggers-1.jpg', '/images/products/cargo-joggers-2.jpg'],
        thumbnail: '/images/products/cargo-joggers-thumb.jpg',
        material: '98% Cotton, 2% Elastane Twill',
        careInstructions: 'Machine wash cold. Tumble dry low.',
        isActive: true,
        isFeatured: true,
        tags: ['cargo', 'joggers', 'utility', 'tapered'],
      },
      {
        name: 'Realm Relaxed Joggers',
        slug: 'realm-relaxed-joggers',
        description: 'French terry joggers with a relaxed fit. Embroidered logo at hem. Everyday comfort, elevated.',
        shortDescription: 'French terry relaxed-fit joggers',
        category: joggers._id,
        basePrice: 1799,
        comparePrice: 2199,
        variants: [
          { size: 'S', color: 'Grey', sku: 'APT-RRJ-GRY-S', stock: 15 },
          { size: 'M', color: 'Grey', sku: 'APT-RRJ-GRY-M', stock: 25 },
          { size: 'L', color: 'Grey', sku: 'APT-RRJ-GRY-L', stock: 22 },
          { size: 'M', color: 'Black', sku: 'APT-RRJ-BLK-M', stock: 28 },
          { size: 'L', color: 'Black', sku: 'APT-RRJ-BLK-L', stock: 20 },
        ],
        images: ['/images/products/realm-joggers-1.jpg'],
        thumbnail: '/images/products/realm-joggers-thumb.jpg',
        material: '100% Cotton French Terry, 320 GSM',
        careInstructions: 'Machine wash cold inside out. Hang dry.',
        isActive: true,
        isFeatured: false,
        tags: ['joggers', 'relaxed', 'terry', 'essential'],
      },
      {
        name: 'Apostle Dad Cap',
        slug: 'apostle-dad-cap',
        description: 'Unstructured dad cap with embroidered logo. Adjustable brass buckle closure.',
        shortDescription: 'Embroidered unstructured dad cap',
        category: caps._id,
        basePrice: 799,
        comparePrice: 999,
        variants: [
          { size: 'One Size', color: 'Black', sku: 'APT-ADC-BLK', stock: 50 },
          { size: 'One Size', color: 'Beige', sku: 'APT-ADC-BGE', stock: 35 },
          { size: 'One Size', color: 'Navy', sku: 'APT-ADC-NVY', stock: 30 },
        ],
        images: ['/images/products/dad-cap-1.jpg'],
        thumbnail: '/images/products/dad-cap-thumb.jpg',
        material: '100% Cotton Twill',
        careInstructions: 'Spot clean only.',
        isActive: true,
        isFeatured: false,
        tags: ['cap', 'headwear', 'embroidered', 'adjustable'],
      },
      {
        name: 'Snapback Prophet Cap',
        slug: 'snapback-prophet-cap',
        description: 'Structured snapback with flat brim and 3D embroidered lettering. Limited colorways.',
        shortDescription: '3D embroidered structured snapback',
        category: caps._id,
        basePrice: 999,
        comparePrice: 1199,
        variants: [
          { size: 'One Size', color: 'Black/Red', sku: 'APT-SPC-BLKR', stock: 25 },
          { size: 'One Size', color: 'Black/White', sku: 'APT-SPC-BLKW', stock: 30 },
        ],
        images: ['/images/products/snapback-1.jpg'],
        thumbnail: '/images/products/snapback-thumb.jpg',
        material: '80% Acrylic, 20% Wool',
        careInstructions: 'Spot clean only. Do not machine wash.',
        isActive: true,
        isFeatured: false,
        tags: ['snapback', 'headwear', 'limited', 'structured'],
      },
      {
        name: 'Apostle Sling Bag',
        slug: 'apostle-sling-bag',
        description: 'Water-resistant crossbody sling with multiple compartments. Reflective branding for night visibility.',
        shortDescription: 'Water-resistant reflective sling bag',
        category: accessories._id,
        basePrice: 1499,
        comparePrice: 1799,
        variants: [
          { size: 'One Size', color: 'Black', sku: 'APT-ASB-BLK', stock: 40 },
          { size: 'One Size', color: 'Olive', sku: 'APT-ASB-OLV', stock: 25 },
        ],
        images: ['/images/products/sling-bag-1.jpg'],
        thumbnail: '/images/products/sling-bag-thumb.jpg',
        material: 'Nylon with Water-Resistant Coating',
        careInstructions: 'Wipe clean with damp cloth.',
        isActive: true,
        isFeatured: true,
        tags: ['bag', 'sling', 'water-resistant', 'reflective'],
      },
      {
        name: 'Crew Ribbed Socks (3-Pack)',
        slug: 'crew-ribbed-socks-3pack',
        description: 'Premium combed cotton crew socks in a 3-pack. Embroidered logo at cuff. Reinforced heel and toe.',
        shortDescription: 'Premium 3-pack embroidered crew socks',
        category: accessories._id,
        basePrice: 599,
        comparePrice: 799,
        variants: [
          { size: 'Free Size', color: 'Black/White/Grey', sku: 'APT-CRS-MIX', stock: 60 },
          { size: 'Free Size', color: 'All Black', sku: 'APT-CRS-BLK', stock: 45 },
        ],
        images: ['/images/products/crew-socks-1.jpg'],
        thumbnail: '/images/products/crew-socks-thumb.jpg',
        material: '80% Combed Cotton, 17% Polyester, 3% Elastane',
        careInstructions: 'Machine wash warm. Tumble dry low.',
        isActive: true,
        isFeatured: false,
        tags: ['socks', 'essential', '3-pack', 'crew'],
      },
    ]);

    // Create collections
    console.log('Creating collections...');
    await Collection.insertMany([
      {
        name: 'Summer Drop 2024',
        slug: 'summer-drop-2024',
        description: 'Our hottest drop yet. Lightweight essentials designed for Indian summers.',
        type: 'seasonal',
        image: '/images/collections/summer-2024.jpg',
        products: [products[0]._id, products[1]._id, products[6]._id, products[8]._id],
        isFeatured: true,
        isActive: true,
        isLive: true,
      },
      {
        name: 'Street Essentials',
        slug: 'street-essentials',
        description: 'The foundation pieces. Timeless streetwear staples that never go out of rotation.',
        type: 'curated',
        image: '/images/collections/essentials.jpg',
        products: [products[0]._id, products[2]._id, products[4]._id, products[5]._id, products[9]._id],
        isFeatured: true,
        isActive: true,
      },
      {
        name: 'Midnight Collection',
        slug: 'midnight-collection',
        description: 'Dark aesthetics. All-black pieces for the nocturnal wardrobe.',
        type: 'drop',
        image: '/images/collections/midnight.jpg',
        products: [products[2]._id, products[3]._id, products[4]._id, products[7]._id],
        isFeatured: true,
        isActive: true,
        isLive: true,
        dropDate: new Date('2024-06-15'),
      },
    ]);

    // Create users
    console.log('Creating users...');
    const hashedAdminPass = await bcrypt.hash('Admin@123', 12);
    const hashedCustomerPass = await bcrypt.hash('Customer@123', 12);

    await User.create({
      email: 'admin@apostle.in',
      password: hashedAdminPass,
      firstName: 'Admin',
      lastName: 'Apostle',
      role: 'admin',
      isEmailVerified: true,
    });

    await User.create({
      email: 'customer@example.com',
      password: hashedCustomerPass,
      firstName: 'Rahul',
      lastName: 'Sharma',
      phone: '9876543210',
      role: 'customer',
      isEmailVerified: true,
    });

    // Create coupons
    console.log('Creating coupons...');
    await Coupon.insertMany([
      {
        code: 'WELCOME10',
        discountType: 'percentage',
        discountValue: 10,
        minOrderAmount: 999,
        maxDiscountAmount: 500,
        usageLimit: 1000,
        perUserLimit: 1,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2025-12-31'),
        isActive: true,
        description: '10% off on your first order',
      },
      {
        code: 'APOSTLE500',
        discountType: 'fixed',
        discountValue: 500,
        minOrderAmount: 2499,
        usageLimit: 500,
        perUserLimit: 2,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2025-12-31'),
        isActive: true,
        description: 'Flat Rs.500 off on orders above Rs.2499',
      },
      {
        code: 'FREESHIP',
        discountType: 'percentage',
        discountValue: 0,
        minOrderAmount: 0,
        usageLimit: 0,
        perUserLimit: 0,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2025-12-31'),
        isActive: true,
        description: 'Free shipping on any order (applied via logic)',
      },
    ]);

    console.log('\n=== Seed Complete ===');
    console.log(`Categories: ${await Category.countDocuments()}`);
    console.log(`Products: ${await Product.countDocuments()}`);
    console.log(`Collections: ${await Collection.countDocuments()}`);
    console.log(`Users: ${await User.countDocuments()}`);
    console.log(`Coupons: ${await Coupon.countDocuments()}`);
    console.log('\nTest Accounts:');
    console.log('  Admin: admin@apostle.in / Admin@123');
    console.log('  Customer: customer@example.com / Customer@123');
    console.log('\nCoupon Codes: WELCOME10, APOSTLE500, FREESHIP');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seed();
