import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseKey = publicAnonKey;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Database types
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  featured: boolean;
  tags: string[];
  live_url?: string;
  github_url?: string;
  created_at: string;
  updated_at?: string;
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  author: string;
  read_time: string;
  tags: string[];
  created_at: string;
  updated_at?: string;
}

export interface Video {
  id: string;
  title: string;
  youtube_url: string;
  description: string;
  created_at: string;
  updated_at?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  credential_url?: string;
  created_at: string;
  updated_at?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
  achievements: string[];
  current: boolean;
  created_at: string;
  updated_at?: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  review: string;
  rating: number;
  avatar: string;
  created_at: string;
  updated_at?: string;
}

export interface QA {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  created_at: string;
  updated_at?: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  source: string;
  read: boolean;
  created_at: string;
  updated_at?: string;
}

export interface Newsletter {
  id: string;
  email: string;
  subscribed_at: string;
}

export interface Settings {
  id?: string;
  profile_image: string;
  resume_url: string;
  linkedin: string;
  github: string;
  instagram: string;
  email: string;
  phone: string;
  whatsapp: string;
  updated_at?: string;
}
