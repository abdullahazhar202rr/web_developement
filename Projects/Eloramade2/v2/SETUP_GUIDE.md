# EloraMate Setup Guide

## Quick Start

### 1. Get Your Supabase Credentials

Your Supabase database is already configured. You need to add your credentials to the `.env` file:

1. Copy `.env.example` to `.env`
2. Add your Supabase URL and Anon Key

```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 2. Install and Run

```bash
npm install
npm run dev
```

Your site will be available at `http://localhost:5173`

## What's Already Set Up

The following are already configured and ready to use:

### Database Tables
- **products** - 12 sample products across 4 categories
- **orders** - Order management
- **order_items** - Order line items
- **admin_users** - Admin authentication

### Storage
- **order-uploads** bucket - For payment screenshots

### Sample Data
12 products are pre-loaded:
- 4 Gifts
- 3 Bouquets
- 3 Nikah Pens
- 2 Wedding Items

4 products are marked as "featured" for the homepage.

## Admin Access

### Login to Admin Panel

1. Navigate to `/admin/login`
2. Use these demo credentials:
   - Email: `admin@eloramate.com`
   - Password: `admin123`

### Admin Features

- View all orders
- Filter by status (Pending/Confirmed/Rejected)
- View customer details and payment screenshots
- Confirm or reject orders

## Customization

### Update Payment Information

Edit `src/pages/Checkout.tsx` (lines 85-89):

```typescript
const paymentAccounts = {
  JazzCash: '0300-YOUR-NUMBER',
  EasyPaisa: '0321-YOUR-NUMBER',
  NayaPay: '0345-YOUR-NUMBER',
};
```

### Update Contact Links

Update WhatsApp and Instagram links in:
- `src/components/Footer.tsx`
- `src/pages/Contact.tsx`
- `src/pages/OrderConfirmation.tsx`

Replace:
- WhatsApp: `https://wa.me/923001234567` with your number
- Instagram: `https://instagram.com/eloramate` with your handle

### Change Admin Password

Edit `src/pages/admin/AdminLogin.tsx` (line 13):

```typescript
if (credentials.email === 'your-admin@email.com' &&
    credentials.password === 'your-secure-password') {
  // Login logic
}
```

## Adding Products

You can add products in two ways:

### Option 1: Via Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to Table Editor
3. Select the `products` table
4. Click "Insert row" and fill in:
   - name
   - description
   - price (in PKR)
   - image_url (Pexels link)
   - category (Gifts, Bouquets, Nikah Pens, or Wedding Items)
   - featured (true/false)
   - stock (quantity)

### Option 2: Via SQL

```sql
INSERT INTO products (name, description, price, image_url, category, featured, stock)
VALUES (
  'Product Name',
  'Product description',
  1500,
  'https://images.pexels.com/...',
  'Gifts',
  false,
  20
);
```

## How the Order Flow Works

1. **Customer places order**
   - Fills delivery information
   - Selects payment method
   - Uploads payment screenshot
   - Order status: `pending`

2. **Admin reviews order**
   - Logs into admin dashboard
   - Views order details and payment proof
   - Confirms or rejects the order

3. **Order confirmed**
   - Status changes to `confirmed`
   - Customer contacts via WhatsApp/Instagram to finalize

## Image Guidelines

For best results, use images from Pexels:
- Aspect ratio: Square (1:1) or 4:5
- Size: At least 800x800px
- Quality: High resolution
- Format: JPG or PNG

Example Pexels URL format:
```
https://images.pexels.com/photos/[ID]/pexels-photo-[ID].jpeg?auto=compress&cs=tinysrgb&w=800
```

## Deployment

### Vercel
```bash
npm run build
# Deploy dist folder to Vercel
```

### Netlify
```bash
npm run build
# Deploy dist folder to Netlify
```

Don't forget to add environment variables in your deployment platform!

## Troubleshooting

### "Missing Supabase environment variables" error
- Make sure `.env` file exists in the root directory
- Check that variable names match exactly: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Restart the dev server after adding environment variables

### Products not showing
- Check your Supabase connection
- Verify the `products` table has data
- Check browser console for errors

### Payment screenshot upload fails
- Verify the `order-uploads` storage bucket exists
- Check bucket policies allow public uploads
- Ensure file is an image (jpg, png, etc.)

### Admin login not working
- Check credentials match exactly (case-sensitive)
- Clear browser local storage
- Try in incognito/private window

## Support

For questions or issues:
- Check the main README.md
- Review Supabase dashboard for errors
- Check browser console for client-side errors

## Next Steps

1. Customize payment account numbers
2. Update contact information (WhatsApp, Instagram)
3. Add your own products
4. Test the complete order flow
5. Deploy to production
6. Share your store link!

Happy selling with EloraMate!
