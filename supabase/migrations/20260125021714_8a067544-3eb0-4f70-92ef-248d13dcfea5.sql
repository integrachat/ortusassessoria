-- Create storage bucket for site assets
INSERT INTO storage.buckets (id, name, public) VALUES ('site-assets', 'site-assets', true);

-- Create policies for site-assets bucket
CREATE POLICY "Anyone can view site assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-assets');

CREATE POLICY "Admins can upload site assets"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'site-assets' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update site assets"
ON storage.objects FOR UPDATE
USING (bucket_id = 'site-assets' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete site assets"
ON storage.objects FOR DELETE
USING (bucket_id = 'site-assets' AND has_role(auth.uid(), 'admin'::app_role));

-- Add logo_url and meta_description to site_config if not exists
INSERT INTO public.site_config (key, value) VALUES ('logo_url', '') ON CONFLICT (key) DO NOTHING;
INSERT INTO public.site_config (key, value) VALUES ('meta_description', 'Escritório de contabilidade digital com soluções completas para sua empresa.') ON CONFLICT (key) DO NOTHING;