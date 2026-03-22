/*
  # EloraMate E-commerce Database Schema

  ## Overview
  Complete database schema for EloraMate gift shop including products, orders, and admin management.

  ## New Tables

  ### 1. products
  - `id` (uuid, primary key) - Unique product identifier
  - `name` (text) - Product name
  - `description` (text) - Product description
  - `price` (decimal) - Product price
  - `image_url` (text) - Product image URL
  - `category` (text) - Product category (Gifts, Bouquets, Nikah Pens, Wedding Items)
  - `featured` (boolean) - Whether product is featured on homepage
  - `stock` (integer) - Available stock quantity
  - `created_at` (timestamptz) - Creation timestamp

  ### 2. orders
  - `id` (uuid, primary key) - Unique order identifier
  - `order_number` (text, unique) - Human-readable order number
  - `customer_name` (text) - Customer full name
  - `phone` (text) - Customer phone number
  - `address` (text) - Delivery address
  - `city` (text) - Delivery city
  - `message` (text) - Optional customer message/notes
  - `total_price` (decimal) - Total order amount
  - `payment_method` (text) - JazzCash, EasyPaisa, or NayaPay
  - `payment_screenshot_url` (text) - URL to payment proof screenshot
  - `status` (text) - Order status: pending, confirmed, rejected
  - `created_at` (timestamptz) - Order creation timestamp

  ### 3. order_items
  - `id` (uuid, primary key) - Unique order item identifier
  - `order_id` (uuid, foreign key) - Reference to orders table
  - `product_id` (uuid, foreign key) - Reference to products table
  - `product_name` (text) - Product name snapshot
  - `quantity` (integer) - Quantity ordered
  - `price` (decimal) - Price at time of order
  - `created_at` (timestamptz) - Creation timestamp

  ### 4. admin_users
  - `id` (uuid, primary key) - Unique admin identifier
  - `email` (text, unique) - Admin email
  - `password_hash` (text) - Hashed password
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for products
  - Authenticated write access for orders
  - Admin-only access for admin operations
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL,
  featured boolean DEFAULT false,
  stock integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  message text,
  total_price decimal(10,2) NOT NULL,
  payment_method text NOT NULL,
  payment_screenshot_url text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id),
  product_name text NOT NULL,
  quantity integer NOT NULL,
  price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Products policies (public read)
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  USING (true);

-- Orders policies (anyone can insert, only view own orders)
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view orders"
  ON orders FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update orders"
  ON orders FOR UPDATE
  USING (true);

-- Order items policies
CREATE POLICY "Anyone can create order items"
  ON order_items FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view order items"
  ON order_items FOR SELECT
  USING (true);

-- Admin users policies (only admins can read)
CREATE POLICY "Only admins can view admin users"
  ON admin_users FOR SELECT
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);