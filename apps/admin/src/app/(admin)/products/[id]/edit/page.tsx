'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import {
  Button,
  Input,
  Textarea,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
  Checkbox,
  Badge,
  Skeleton,
} from '@apostle/ui';
import { ArrowLeft, Plus, Upload, X, GripVertical, Trash2, Save } from 'lucide-react';

const categories = [
  { value: 'tshirts', label: 'T-Shirts' },
  { value: 'hoodies', label: 'Hoodies' },
  { value: 'pants', label: 'Pants' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'footwear', label: 'Footwear' },
];

const collections = [
  { value: 'summer-2024', label: 'Summer Drop 2024' },
  { value: 'essentials', label: 'Streetwear Essentials' },
  { value: 'limited', label: 'Limited Edition' },
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

interface Variant {
  id: string;
  size: string;
  color: string;
  sku: string;
  stock: number;
  price: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  costPrice?: number;
  category: string;
  collection: string;
  tags: string;
  status: 'draft' | 'active' | 'archived';
  featured: boolean;
  limitedEdition: boolean;
  preOrder: boolean;
  images: string[];
  variants: Variant[];
}

// Mock product data - in production this would come from API
const mockProduct: Product = {
  id: '1',
  name: 'Urban Oversized Tee - Black',
  description: 'Premium cotton oversized t-shirt with minimalist APOSTLE branding. Features dropped shoulders, ribbed crew neck, and a relaxed fit perfect for layering or wearing solo.',
  price: 1999,
  comparePrice: 2499,
  costPrice: 800,
  category: 'tshirts',
  collection: 'summer-2024',
  tags: 'summer, streetwear, oversized, cotton',
  status: 'active',
  featured: true,
  limitedEdition: false,
  preOrder: false,
  images: [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop',
  ],
  variants: [
    { id: '1', size: 'S', color: 'Black', sku: 'TEE-BLK-S', stock: 25, price: 1999 },
    { id: '2', size: 'M', color: 'Black', sku: 'TEE-BLK-M', stock: 50, price: 1999 },
    { id: '3', size: 'L', color: 'Black', sku: 'TEE-BLK-L', stock: 45, price: 1999 },
    { id: '4', size: 'XL', color: 'Black', sku: 'TEE-BLK-XL', stock: 30, price: 1999 },
  ],
};

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);

  useEffect(() => {
    // Simulate API fetch
    const fetchProduct = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setProduct(mockProduct);
      setImages(mockProduct.images);
      setVariants(mockProduct.variants);
      setIsLoading(false);
    };
    fetchProduct();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    router.push('/products');
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsDeleting(false);
    router.push('/products');
  };

  const addVariant = () => {
    const newVariant: Variant = {
      id: Date.now().toString(),
      size: 'M',
      color: '',
      sku: '',
      stock: 0,
      price: product?.price || 0,
    };
    setVariants([...variants, newVariant]);
  };

  const removeVariant = (id: string) => {
    setVariants(variants.filter((v) => v.id !== id));
  };

  const updateVariant = (id: string, field: keyof Variant, value: string | number) => {
    setVariants(
      variants.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Skeleton className="h-64" />
            <Skeleton className="h-48" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-32" />
            <Skeleton className="h-48" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold">Product not found</h2>
        <Link href="/products">
          <Button className="mt-4">Back to Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/products">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
              <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                {product.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">{product.name}</p>
          </div>
        </div>
        <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isDeleting}>
          <Trash2 className="mr-2 h-4 w-4" />
          {isDeleting ? 'Deleting...' : 'Delete Product'}
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Basic info */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Product name and description</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" defaultValue={product.name} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    defaultValue={product.description}
                    className="min-h-[120px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Media */}
            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
                <CardDescription>Product images and videos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-4">
                  {images.map((image, index) => (
                    <div key={index} className="group relative aspect-square rounded-lg border bg-muted">
                      <Image
                        src={image}
                        alt={`Product ${index + 1}`}
                        fill
                        className="rounded-lg object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setImages(images.filter((_, i) => i !== index))}
                        className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      <div className="absolute left-1 top-1 cursor-grab rounded bg-background/80 p-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <GripVertical className="h-4 w-4" />
                      </div>
                      {index === 0 && (
                        <div className="absolute bottom-1 left-1 rounded bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                          Primary
                        </div>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border border-dashed text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <Upload className="h-6 w-6" />
                    <span className="text-xs">Add Image</span>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
                <CardDescription>Set your product pricing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input id="price" type="number" defaultValue={product.price} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comparePrice">Compare at Price (₹)</Label>
                    <Input id="comparePrice" type="number" defaultValue={product.comparePrice} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="costPrice">Cost Price (₹)</Label>
                    <Input id="costPrice" type="number" defaultValue={product.costPrice} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Variants */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Variants</CardTitle>
                  <CardDescription>Manage size and color variations</CardDescription>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={addVariant}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Variant
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {variants.map((variant) => (
                    <div key={variant.id} className="grid gap-4 rounded-lg border p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                      <div className="space-y-2">
                        <Label>Size</Label>
                        <Select
                          value={variant.size}
                          onValueChange={(value) => updateVariant(variant.id, 'size', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {sizes.map((size) => (
                              <SelectItem key={size} value={size}>
                                {size}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Color</Label>
                        <Input
                          value={variant.color}
                          onChange={(e) => updateVariant(variant.id, 'color', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>SKU</Label>
                        <Input
                          value={variant.sku}
                          onChange={(e) => updateVariant(variant.id, 'sku', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Stock</Label>
                        <Input
                          type="number"
                          value={variant.stock}
                          onChange={(e) => updateVariant(variant.id, 'stock', parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Price (₹)</Label>
                        <Input
                          type="number"
                          value={variant.price}
                          onChange={(e) => updateVariant(variant.id, 'price', parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div className="flex items-end">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeVariant(variant.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {variants.length === 0 && (
                    <p className="py-4 text-center text-sm text-muted-foreground">
                      No variants defined. Click &quot;Add Variant&quot; to create one.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select defaultValue={product.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-xs text-muted-foreground">
                  Last updated: {new Date().toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Organization */}
            <Card>
              <CardHeader>
                <CardTitle>Organization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select defaultValue={product.category}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Collections</Label>
                  <Select defaultValue={product.collection}>
                    <SelectTrigger>
                      <SelectValue placeholder="Add to collection" />
                    </SelectTrigger>
                    <SelectContent>
                      {collections.map((collection) => (
                        <SelectItem key={collection.value} value={collection.value}>
                          {collection.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input id="tags" defaultValue={product.tags} />
                </div>
              </CardContent>
            </Card>

            {/* Options */}
            <Card>
              <CardHeader>
                <CardTitle>Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Checkbox id="featured" defaultChecked={product.featured} />
                  <Label htmlFor="featured" className="font-normal">
                    Featured product
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="limitedEdition" defaultChecked={product.limitedEdition} />
                  <Label htmlFor="limitedEdition" className="font-normal">
                    Limited edition
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="preOrder" defaultChecked={product.preOrder} />
                  <Label htmlFor="preOrder" className="font-normal">
                    Available for pre-order
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Inventory Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Inventory Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Total Stock</p>
                    <p className="text-2xl font-bold">
                      {variants.reduce((acc, v) => acc + v.stock, 0)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Variants</p>
                    <p className="text-2xl font-bold">{variants.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-end gap-4 border-t pt-6">
          <Link href="/products">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
