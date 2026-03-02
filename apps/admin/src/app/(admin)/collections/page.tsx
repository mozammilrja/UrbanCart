'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Button,
  Input,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@urbancart/ui';
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Copy,
} from 'lucide-react';

const collections = [
  {
    id: '1',
    name: 'Summer Drop 2024',
    slug: 'summer-drop-2024',
    description: 'Fresh summer styles for the urban trendsetter',
    products: 24,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    name: 'Streetwear Essentials',
    slug: 'streetwear-essentials',
    description: 'Core pieces for every streetwear collection',
    products: 45,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    name: 'Limited Edition',
    slug: 'limited-edition',
    description: 'Exclusive drops with limited availability',
    products: 12,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    name: 'Winter Collection',
    slug: 'winter-collection',
    description: 'Stay warm with urban winter styles',
    products: 32,
    status: 'draft',
    image: 'https://images.unsplash.com/photo-1544923246-77307dd628b8?w=400&h=300&fit=crop',
  },
  {
    id: '5',
    name: 'Collab Series',
    slug: 'collab-series',
    description: 'Special collaborations with artists and brands',
    products: 8,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop',
  },
  {
    id: '6',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Complete your look with premium accessories',
    products: 56,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=300&fit=crop',
  },
];

export default function CollectionsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Collections</h1>
          <p className="text-muted-foreground">
            Organize products into themed collections
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Collection
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search collections..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Collections grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => (
          <Card key={collection.id} className="overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover"
              />
              <div className="absolute right-2 top-2">
                <Badge variant={collection.status === 'active' ? 'success' : 'secondary'}>
                  {collection.status === 'active' ? 'Active' : 'Draft'}
                </Badge>
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{collection.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {collection.description}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                {collection.products} products
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
