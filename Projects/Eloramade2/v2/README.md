# EloraMate - Handcrafted Gifts E-commerce

A beautiful, minimalistic e-commerce website for handmade gifts, bouquets, nikah pens, and wedding items. Built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

- Clean, elegant, production-ready design
- Fully responsive mobile-first layout
- Product browsing by category
- Shopping cart with local storage
- Manual payment system (JazzCash, EasyPaisa, NayaPay)
- Payment screenshot upload
- Order management system
- Secure admin dashboard
- Real-time order status updates

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL database + Storage)
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Build Tool**: Vite

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

The database schema and sample products are already set up through migrations. The database includes:

- **products** table - Product catalog
- **orders** table - Customer orders
- **order_items** table - Individual items in each order
- **admin_users** table - Admin authentication
- **order-uploads** storage bucket - Payment screenshots

### 4. Run Development Server

```bash
npm run dev
```

### 5. Build for Production

```bash
npm run build
```

## Admin Access

- **Admin URL**: `/admin/login`
- **Demo Credentials**:
  - Email: `admin@eloramate.com`
  - Password: `admin123`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── ProductCard.tsx
│   ├── Header.tsx
│   └── Footer.tsx
├── pages/              # Page components
│   ├── Home.tsx
│   ├── Shop.tsx
│   ├── ProductDetail.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── OrderConfirmation.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   └── admin/
│       ├── AdminLogin.tsx
│       └── AdminDashboard.tsx
├── context/            # React Context
│   └── CartContext.tsx
├── lib/                # Utilities
│   ├── supabase.ts
│   └── types.ts
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## Key Features Explained

### Customer Flow

1. Browse products by category
2. View product details
3. Add items to cart
4. Proceed to checkout
5. Enter delivery information
6. Select payment method (JazzCash/EasyPaisa/NayaPay)
7. Upload payment screenshot
8. Receive order confirmation
9. Contact via WhatsApp/Instagram to finalize order

### Admin Flow

1. Login to admin dashboard
2. View all orders (All/Pending/Confirmed/Rejected)
3. Review customer details and order items
4. View payment screenshots
5. Confirm or reject orders
6. Orders update in real-time

### Payment Methods

The system supports manual payment confirmation through:
- JazzCash: 0300-1234567
- EasyPaisa: 0321-7654321
- NayaPay: 0345-9876543

Customers upload payment screenshots which admins can review before confirming orders.

## Sample Products

The database includes 12 sample products across 4 categories:
- Gifts
- Bouquets
- Nikah Pens
- Wedding Items

4 products are marked as "featured" and appear on the homepage.

## Database Schema

### Products Table
- Product information (name, description, price, image)
- Category classification
- Featured flag for homepage display
- Stock tracking

### Orders Table
- Customer information (name, phone, address, city)
- Order details (total, payment method, status)
- Payment screenshot URL
- Optional customer message

### Order Items Table
- Links orders to products
- Captures product snapshot at time of order
- Quantity and price tracking

## Security

- Row Level Security (RLS) enabled on all tables
- Public read access for products
- Secure payment screenshot upload
- Admin authentication with local storage session
- Protected admin routes

## Customization

### Update Payment Accounts

Edit the payment accounts in `src/pages/Checkout.tsx`:

```typescript
const paymentAccounts = {
  JazzCash: 'your-jazzcash-number',
  EasyPaisa: 'your-easypaisa-number',
  NayaPay: 'your-nayapay-number',
};
```

### Update Contact Information

Edit WhatsApp and Instagram links in:
- `src/components/Footer.tsx`
- `src/pages/Contact.tsx`
- `src/pages/OrderConfirmation.tsx`

### Update Admin Credentials

Edit credentials in `src/pages/admin/AdminLogin.tsx`:

```typescript
if (credentials.email === 'your-email@domain.com' &&
    credentials.password === 'your-secure-password') {
  // Login logic
}
```

## Deployment

This project can be deployed to:
- Vercel
- Netlify
- Any static hosting service

Remember to set environment variables in your deployment platform.

## Design Philosophy

EloraMate follows a minimalistic, elegant design philosophy inspired by premium e-commerce sites:

- Soft neutral color palette (whites, beiges, grays)
- Clean typography with plenty of white space
- Simple, intuitive navigation
- Fast loading with minimal animations
- Mobile-first responsive design
- Accessible and user-friendly interface

## License

This project is created for EloraMate.
