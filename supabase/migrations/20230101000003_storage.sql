-- Create Storage Buckets
insert into storage.buckets (id, name, public) values ('profile-images', 'profile-images', true);
insert into storage.buckets (id, name, public) values ('brand-assets', 'brand-assets', true);
insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true);
insert into storage.buckets (id, name, public) values ('documents', 'documents', false);

-- Enable RLS on storage.objects
-- Note: Supabase applies policies on the storage.objects table

create policy "Public Access to Profile Images"
  on storage.objects for select
  using ( bucket_id = 'profile-images' );

create policy "Users can upload their own profile image"
  on storage.objects for insert
  with check ( bucket_id = 'profile-images' and auth.uid()::text = (storage.foldername(name))[1] );

create policy "Public Access to Brand Assets"
  on storage.objects for select
  using ( bucket_id = 'brand-assets' );

create policy "Public Access to Product Images"
  on storage.objects for select
  using ( bucket_id = 'product-images' );

create policy "Authenticated users can read documents"
  on storage.objects for select
  using ( bucket_id = 'documents' and auth.role() = 'authenticated' );
