
DROP POLICY IF EXISTS "Anyone can submit a signup" ON public.priority_signups;
CREATE POLICY "Anyone can submit a signup"
ON public.priority_signups
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 200
  AND length(btrim(email)) BETWEEN 3 AND 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (phone IS NULL OR length(phone) <= 50)
  AND (notes IS NULL OR length(notes) <= 1000)
  AND (preferred_month IS NULL OR length(preferred_month) <= 50)
  AND (group_size IS NULL OR (group_size BETWEEN 1 AND 100))
);

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;
