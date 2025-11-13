-- Portfolio Database Schema for Supabase
-- Run this SQL in your Supabase SQL Editor to set up all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT DEFAULT '',
  category TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  live_url TEXT DEFAULT '',
  github_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Posts/Blog Table
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  thumbnail TEXT DEFAULT '',
  author TEXT DEFAULT 'Aurangzeb Sunny',
  read_time TEXT DEFAULT '5 min read',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Videos Table
CREATE TABLE IF NOT EXISTS videos (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  title TEXT NOT NULL,
  youtube_url TEXT NOT NULL,
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Certificates Table
CREATE TABLE IF NOT EXISTS certificates (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date TEXT NOT NULL,
  image TEXT DEFAULT '',
  credential_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Jobs Table
CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT NOT NULL,
  skills TEXT[] DEFAULT '{}',
  achievements TEXT[] DEFAULT '{}',
  current BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  review TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  avatar TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Q&A Table
CREATE TABLE IF NOT EXISTS qas (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages Table
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  subject TEXT DEFAULT 'Contact Form',
  message TEXT NOT NULL,
  source TEXT DEFAULT 'contact-form',
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter Table
CREATE TABLE IF NOT EXISTS newsletter (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Settings Table (Single Row)
CREATE TABLE IF NOT EXISTS settings (
  id TEXT PRIMARY KEY DEFAULT 'main',
  profile_image TEXT DEFAULT '',
  resume_url TEXT DEFAULT '',
  linkedin TEXT DEFAULT '',
  github TEXT DEFAULT '',
  instagram TEXT DEFAULT '',
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  whatsapp TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_current ON jobs(current);
CREATE INDEX IF NOT EXISTS idx_messages_read ON messages(read);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_qas_order ON qas("order");

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE qas ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Allow public read access
CREATE POLICY "Public read access for projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access for posts" ON posts FOR SELECT USING (true);
CREATE POLICY "Public read access for videos" ON videos FOR SELECT USING (true);
CREATE POLICY "Public read access for certificates" ON certificates FOR SELECT USING (true);
CREATE POLICY "Public read access for jobs" ON jobs FOR SELECT USING (true);
CREATE POLICY "Public read access for reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Public read access for qas" ON qas FOR SELECT USING (true);
CREATE POLICY "Public read access for settings" ON settings FOR SELECT USING (true);

-- Allow public insert for messages and newsletter
CREATE POLICY "Public insert for messages" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert for newsletter" ON newsletter FOR INSERT WITH CHECK (true);

-- Allow authenticated users (admin) full access
CREATE POLICY "Admin full access projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access posts" ON posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access videos" ON videos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access certificates" ON certificates FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access jobs" ON jobs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access reviews" ON reviews FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access qas" ON qas FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access messages" ON messages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access newsletter" ON newsletter FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access settings" ON settings FOR ALL USING (auth.role() = 'authenticated');

-- Enable Realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE projects;
ALTER PUBLICATION supabase_realtime ADD TABLE posts;
ALTER PUBLICATION supabase_realtime ADD TABLE videos;
ALTER PUBLICATION supabase_realtime ADD TABLE certificates;
ALTER PUBLICATION supabase_realtime ADD TABLE jobs;
ALTER PUBLICATION supabase_realtime ADD TABLE reviews;
ALTER PUBLICATION supabase_realtime ADD TABLE qas;
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE newsletter;
ALTER PUBLICATION supabase_realtime ADD TABLE settings;

-- Insert default settings if not exists
INSERT INTO settings (id, profile_image, resume_url, linkedin, github, instagram, email, phone, whatsapp)
VALUES (
  'main',
  '',
  '',
  'https://linkedin.com/in/aurangzebsunny',
  'https://github.com/aurangzebsunny',
  'https://instagram.com/aurangzebsunny',
  'aurangzeb@example.com',
  '+1234567890',
  '+1234567890'
)
ON CONFLICT (id) DO NOTHING;
