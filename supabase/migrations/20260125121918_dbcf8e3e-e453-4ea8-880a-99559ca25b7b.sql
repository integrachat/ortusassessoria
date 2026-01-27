-- Fix storage policies: For INSERT, use WITH CHECK instead of USING
-- First drop the existing policies
DROP POLICY IF EXISTS "Admins can upload site assets" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update site assets" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete site assets" ON storage.objects;

-- Recreate with correct syntax
CREATE POLICY "Admins can upload site assets"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update site assets"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete site assets"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'::app_role));