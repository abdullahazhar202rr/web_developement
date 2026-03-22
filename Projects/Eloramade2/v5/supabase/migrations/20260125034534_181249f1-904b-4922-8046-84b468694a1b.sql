-- Create storage bucket for payment screenshots
INSERT INTO storage.buckets (id, name, public)
VALUES ('payment-screenshots', 'payment-screenshots', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for payment screenshots
CREATE POLICY "Users can upload their own payment screenshots"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'payment-screenshots' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can view their own payment screenshots"
ON storage.objects
FOR SELECT
USING (bucket_id = 'payment-screenshots' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Admins can view all payment screenshots"
ON storage.objects
FOR SELECT
USING (bucket_id = 'payment-screenshots' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete payment screenshots"
ON storage.objects
FOR DELETE
USING (bucket_id = 'payment-screenshots' AND public.has_role(auth.uid(), 'admin'));