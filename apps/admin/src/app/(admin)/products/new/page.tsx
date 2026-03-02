'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
} from '@urbancart/ui';
import { ArrowLeft, Plus, Upload, X, GripVertical } from 'lucide-react';

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

export default function NewProductPage() {
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop',
  ]);
  const [variants, setVariants] = useState([
    { id: '1', size: 'M', color: 'Black', sku: 'TEE-BLK-M', stock: 50, price: 1999 },
    { id: '2', size: 'L', color: 'Black', sku: 'TEE-BLK-L', stock: 45, price: 1999 },
    { id: '3', size: 'M', color: 'White', sku: 'TEE-WHT-M', stock: 30, price: 1999 },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/products">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Product</h1>
          <p className="text-muted-foreground">Create a new product listing</p>
        </div>
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
                  <Input id="name" placeholder="e.g., Urban Oversized Tee" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your product..."
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
                    <Input id="price" type="number" placeholder="1999" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comparePrice">Compare at Price (₹)</Label>
                    <Input id="comparePrice" type="number" placeholder="2499" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="costPrice">Cost Price (₹)</Label>
                    <Input id="costPrice" type="number" placeholder="800" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Variants */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Variants</CardTitle>
                  <CardDescription>Add size and color variations</CardDescription>
                </div>
                <Button type="button" variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Variant
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {variants.map((variant) => (
                    <div key={variant.id} className="grid gap-4 rounded-lg border p-4 sm:grid-cols-5">
                      <div className="space-y-2">
                        <Label>Size</Label>
                        <Select defaultValue={variant.size}>
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
                        <Input defaultValue={variant.color} />
                      </div>
                      <div className="space-y-2">
                        <Label>SKU</Label>
                        <Input defaultValue={variant.sku} />
                      </div>
                      <div className="space-y-2">
                        <Label>Stock</Label>
                        <Input type="number" defaultValue={variant.stock} />
                      </div>
                      <div className="flex items-end">
                        <Button type="button" variant="ghost" size="icon" className="text-destructive">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
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
                <Select defaultValue="draft">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
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
                  <Select>
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
                  <Select>
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
                  <Input id="tags" placeholder="summer, streetwear, oversized" />
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
                  <Checkbox id="featured" />
                  <Label htmlFor="featured" className="font-normal">
                    Featured product
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="limitedEdition" />
                  <Label htmlFor="limitedEdition" className="font-normal">
                    Limited edition
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="preOrder" />
                  <Label htmlFor="preOrder" className="font-normal">
                    Available for pre-order
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-end gap-4">
          <Link href="/products">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" isLoading={isLoading}>
            Create Product
          </Button>
        </div>
      </form>
    </div>
  );
}
