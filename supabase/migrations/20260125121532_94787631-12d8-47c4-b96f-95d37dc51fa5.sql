-- Fix admin RLS policies: FOR ALL requires WITH CHECK to allow INSERT/UPSERT
DO $$
BEGIN
  -- site_config
  EXECUTE 'DROP POLICY IF EXISTS "Admins can manage site_config" ON public.site_config';
  EXECUTE 'CREATE POLICY "Admins can manage site_config" ON public.site_config FOR ALL TO authenticated USING (public.has_role(auth.uid(), ''admin'')) WITH CHECK (public.has_role(auth.uid(), ''admin''))';

  -- services
  EXECUTE 'DROP POLICY IF EXISTS "Admins can manage services" ON public.services';
  EXECUTE 'CREATE POLICY "Admins can manage services" ON public.services FOR ALL TO authenticated USING (public.has_role(auth.uid(), ''admin'')) WITH CHECK (public.has_role(auth.uid(), ''admin''))';

  -- news
  EXECUTE 'DROP POLICY IF EXISTS "Admins can manage news" ON public.news';
  EXECUTE 'CREATE POLICY "Admins can manage news" ON public.news FOR ALL TO authenticated USING (public.has_role(auth.uid(), ''admin'')) WITH CHECK (public.has_role(auth.uid(), ''admin''))';

  -- faq
  EXECUTE 'DROP POLICY IF EXISTS "Admins can manage faq" ON public.faq';
  EXECUTE 'CREATE POLICY "Admins can manage faq" ON public.faq FOR ALL TO authenticated USING (public.has_role(auth.uid(), ''admin'')) WITH CHECK (public.has_role(auth.uid(), ''admin''))';

  -- pages
  EXECUTE 'DROP POLICY IF EXISTS "Admins can manage pages" ON public.pages';
  EXECUTE 'CREATE POLICY "Admins can manage pages" ON public.pages FOR ALL TO authenticated USING (public.has_role(auth.uid(), ''admin'')) WITH CHECK (public.has_role(auth.uid(), ''admin''))';

  -- user_roles
  EXECUTE 'DROP POLICY IF EXISTS "Admins can manage user_roles" ON public.user_roles';
  EXECUTE 'CREATE POLICY "Admins can manage user_roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), ''admin'')) WITH CHECK (public.has_role(auth.uid(), ''admin''))';
END $$;