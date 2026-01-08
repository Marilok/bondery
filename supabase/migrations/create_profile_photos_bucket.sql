-- Create storage bucket for profile photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-photos', 'profile-photos', false);

-- Policy: Allow authenticated users to upload their own profile photo
CREATE POLICY "Users can upload their own profile photo"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-photos' 
  AND (storage.foldername(name))[1] = auth.uid()::text
  AND (storage.extension(name) = 'jpg' OR 
       storage.extension(name) = 'jpeg' OR 
       storage.extension(name) = 'png' OR 
       storage.extension(name) = 'gif' OR 
       storage.extension(name) = 'webp')
);

-- Policy: Allow authenticated users to update their own profile photo
CREATE POLICY "Users can update their own profile photo"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profile-photos' 
  AND (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'profile-photos' 
  AND (storage.foldername(name))[1] = auth.uid()::text
  AND (storage.extension(name) = 'jpg' OR 
       storage.extension(name) = 'jpeg' OR 
       storage.extension(name) = 'png' OR 
       storage.extension(name) = 'gif' OR 
       storage.extension(name) = 'webp')
);

-- Policy: Allow authenticated users to delete their own profile photo
CREATE POLICY "Users can delete their own profile photo"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile-photos' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Allow authenticated users to view their own profile photo
CREATE POLICY "Users can view their own profile photo"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'profile-photos' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);
