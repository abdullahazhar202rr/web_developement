import { Product, Category } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Personalized Wedding Certificate Frame',
    price: 2490,
    images: [
      'https://theframers.pk/wp-content/uploads/2024/10/Nikkah-Gift-for-Muslim-Couple-Personalized-Wedding-Certificate-Frame-Gold.jpg',
    ],
    description: 'Beautiful custom photo frame for weddings with the couple\'s names and wedding date engraved.',
    category: 'weddings',
    colors: ['Silver', 'Gold', 'Rose Gold'],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: [
      {
        id: 'r1',
        userId: 'u1',
        userName: 'Emily Johnson',
        rating: 5,
        comment: 'Absolutely beautiful! The engraving was perfect and it arrived earlier than expected.',
        date: '2023-05-15'
      }
    ]
  },
  {
    id: '2',
    name: 'Deluxe Birthday Gift Box',
    price: 6000,
    images: [
      'https://pkgiftshop.com/user_files/product_images/1715176333-DWSnMF.webp',
    ],
    description: 'Complete birthday surprise package with customizable contents including chocolates, scented candles, and a greeting card.',
    category: 'birthdays',
    inStock: true,
    trending: true,
    rating: 4.5,
    reviews: []
  },
  {
    id: '3',
    name: 'Anniversary gift box',
    price: 7999,
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuADsfoVeuhO4HUxi_aAG3eCzlZ_E2pCFARA&s',
    ],
    description: '3D laser engraved crystal heart with custom message for your loved one. Perfect anniversary gift.',
    category: 'anniversaries',
    inStock: true,
    featured: true,
    rating: 4.9,
    reviews: []
  },
  {
    id: '4',
    name: 'Eid gift basket',
    price: 8999,
    images: [
      'https://onlinegiftshop.pk/wp-content/uploads/2022/06/IMG-20220624-WA0008.jpg',
    ],
    description: 'Luxury festive gift hamper filled with gourmet treats, chocolates, and festive decorations.',
    category: 'festivals',
    inStock: true,
    trending: true,
    rating: 4.7,
    reviews: []
  },
  {
    id: '5',
    name: 'Personalized Name Necklace',
    price: 499,
    images: [
      'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg',
    ],
    description: 'Custom name necklace available in sterling silver, gold, and rose gold finishes.',
    category: 'personalized',
    colors: ['Silver', 'Gold', 'Rose Gold'],
    inStock: true,
    featured: true,
    rating: 4.6,
    reviews: []
  },
  {
    id: '6',
    name: 'Executive Pen Set',
    price: 3999,
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFpzat4XaQe7wh-ZalPQcnIFrf8z1SCPXrjg&s',
    ],
    description: 'Premium quality pen set that can be engraved with company logo or recipient\'s name.',
    category: 'corporate',
    colors: ['Black', 'Blue', 'Silver'],
    inStock: true,
    rating: 4.4,
    reviews: []
  },
  {
    id: '7',
    name: 'Wedding Essentials Basket',
    price: 14000,
    images: [
      'https://www.lalschocolates.com/cdn/shop/files/WeddingEssentialsBasket1_900x.png?v=1729233886',
    ],
    description: 'Set of two elegant champagne flutes with "Mr & Mrs" engraving and wedding date.',
    category: 'weddings',
    inStock: true,
    rating: 4.3,
    reviews: []
  },
  {
    id: '8',
    name: 'Birthday Explosion Box',
    price: 2999,
    images: [
      'https://i.ytimg.com/vi/INz0Ezp3zC8/maxresdefault.jpg',
    ],
    description: 'Surprise explosion box that opens to reveal photos, messages, and small gifts.',
    category: 'birthdays',
    colors: ['Pink', 'Blue', 'Black'],
    inStock: true,
    trending: true,
    rating: 4.8,
    reviews: []
  },
  {
    id: '9',
    name: 'Custom Star frame',
    price: 4999,
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs4FROdrUMjHnswVo6ng--A5tAu7csBwK1zQ&s',
    ],
    description: 'Personalized star map showing the night sky at a specific date and location. Perfect for anniversaries.',
    category: 'anniversaries',
    sizes: ['8x10', '11x14', '16x20'],
    inStock: true,
    featured: true,
    rating: 4.7,
    reviews: []
  },
  {
    id: '10',
    name: 'Eid Gift Box',
    price: 5999,
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY-Ljs2y0HRzp_xIw17rq1rgx9SVI40mbUcw&s',
    ],
    description: 'Eid gift box.',
    category: 'festivals',
    inStock: true,
    trending: true,
    rating: 4.9,
    reviews: []
  },
  {
    id: '11',
    name: 'Polaroids',
    price: 69.99,
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSprJsiGznOW_Oo9pACOy63Hk4nCZFJDun66g&s',
    ],
    description: 'Personalized digital portrait illustration from your photo, delivered as a high-quality print.',
    category: 'personalized',
    sizes: ['8x10', '11x14', '16x20'],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: []
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: Category): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getTrendingProducts = (): Product[] => {
  return products.filter(product => product.trending);
};

export const filterProducts = (filters: Record<string, any>): Product[] => {
  return products.filter(product => {
    // Category filter
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    
    // Price range filter
    if (filters.minPrice && product.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && product.price > filters.maxPrice) {
      return false;
    }
    
    // Color filter
    if (filters.color && product.colors && !product.colors.includes(filters.color)) {
      return false;
    }
    
    // Size filter
    if (filters.size && product.sizes && !product.sizes.includes(filters.size)) {
      return false;
    }
    
    // In stock filter
    if (filters.inStock && !product.inStock) {
      return false;
    }
    
    return true;
  });
};