/*
  # Create Storage Bucket for Payment Screenshots

  ## Overview
  Creates a public storage bucket for order-related uploads including payment screenshots.

  ## New Storage Bucket
  - `order-uploads` - Public bucket for payment screenshots and order-related files

  ## Security
  - Public read access for viewing uploaded screenshots
  - Public insert access for customers to upload payment proof
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('order-uploads', 'order-uploads', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can upload to order-uploads"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'order-uploads');

CREATE POLICY "Anyone can view order-uploads"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'order-uploads');