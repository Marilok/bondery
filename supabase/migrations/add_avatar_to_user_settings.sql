-- Add avatar_url column to user_settings table
ALTER TABLE user_settings 
ADD COLUMN IF NOT EXISTS avatar_url text;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_settings_avatar_url ON user_settings(avatar_url);

-- Drop the trigger that was causing conflicts
DROP TRIGGER IF EXISTS preserve_user_settings_trigger ON auth.users;
DROP FUNCTION IF EXISTS preserve_user_settings();
