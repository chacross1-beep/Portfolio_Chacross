-- Chacross Mafuala Portfolio — Schema Supabase
-- Exécuter via Supabase SQL Editor ou CLI

-- Categories enum
CREATE TYPE project_category AS ENUM (
  'branding',
  'motion-design',
  'social-media',
  'posters',
  'packaging',
  'ui-ux'
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category project_category NOT NULL DEFAULT 'branding',
  excerpt TEXT,
  cover_image TEXT,
  hero_image TEXT,
  video_url TEXT,
  overview TEXT,
  problem TEXT,
  solution TEXT,
  process TEXT,
  color_palette JSONB DEFAULT '[]'::jsonb,
  typography TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  before_image TEXT,
  after_image TEXT,
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  content TEXT NOT NULL,
  avatar_url TEXT,
  rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Contact messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Public read for projects & testimonials
CREATE POLICY "Public read projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Public read testimonials" ON testimonials
  FOR SELECT USING (true);

-- Public insert contact
CREATE POLICY "Public insert contact" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Admin policies (authenticated users only)
CREATE POLICY "Admin all projects" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin all testimonials" ON testimonials
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin read contact" ON contact_messages
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin update contact" ON contact_messages
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Storage bucket (run in dashboard or via API)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true);
