-- Add delete policy for admins to clean up orders
CREATE POLICY "Admins can delete orders"
ON public.orders
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));