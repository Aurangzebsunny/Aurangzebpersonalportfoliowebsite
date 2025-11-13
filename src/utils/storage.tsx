// Supabase-based data storage with real-time capabilities
import { supabase } from './supabase/client';
import type { 
  Project, 
  Post, 
  Video, 
  Certificate, 
  Job, 
  Review, 
  QA, 
  Message, 
  Newsletter,
  Settings 
} from './supabase/client';

// Helper to convert snake_case to camelCase for compatibility
const toCamelCase = (obj: any): any => {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(toCamelCase);
  
  const newObj: any = {};
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    newObj[camelKey] = toCamelCase(obj[key]);
  }
  return newObj;
};

// Helper to convert camelCase to snake_case for Supabase
const toSnakeCase = (obj: any): any => {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(toSnakeCase);
  
  const newObj: any = {};
  for (const key in obj) {
    const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    newObj[snakeKey] = toSnakeCase(obj[key]);
  }
  return newObj;
};

// Initialize Supabase tables with sample data
const initializeSupabase = async () => {
  try {
    // Check if already initialized
    const { data: existingProjects } = await supabase
      .from('projects')
      .select('id')
      .limit(1);

    if (existingProjects && existingProjects.length > 0) {
      console.log('Supabase already initialized');
      return;
    }

    console.log('Initializing Supabase with sample data...');

    // Sample Projects
    const { error: projectsError } = await supabase.from('projects').insert([
      {
        title: 'E-Commerce Platform',
        description: 'A modern e-commerce platform with seamless shopping experience, featuring advanced product filtering, secure payment integration, and real-time inventory management.',
        image: '',
        category: 'Web Development',
        featured: true,
        tags: ['React', 'Node.js', 'Stripe', 'MongoDB'],
        live_url: 'https://example.com',
        github_url: 'https://github.com/example',
      },
      {
        title: 'Mobile Banking App',
        description: 'Intuitive mobile banking interface with enhanced security features, biometric authentication, and instant transaction capabilities.',
        image: '',
        category: 'Mobile App',
        featured: true,
        tags: ['React Native', 'Firebase', 'Security'],
        live_url: '',
        github_url: '',
      },
      {
        title: 'Brand Identity Design',
        description: 'Complete brand identity package including logo design, color palette, typography, and brand guidelines for a luxury fashion brand.',
        image: '',
        category: 'Branding',
        featured: false,
        tags: ['Figma', 'Illustrator', 'Branding'],
        live_url: '',
        github_url: '',
      },
      {
        title: 'Real Estate Dashboard',
        description: 'Comprehensive property management dashboard with analytics, tenant management, and financial reporting.',
        image: '',
        category: 'UI/UX Design',
        featured: true,
        tags: ['UI/UX', 'Dashboard', 'Analytics'],
        live_url: '',
        github_url: '',
      },
    ]);

    // Sample Posts
    const { error: postsError } = await supabase.from('posts').insert([
      {
        title: 'Getting Started with Web Development in 2025',
        excerpt: 'Learn the fundamentals of modern web development and the latest tools you need to succeed.',
        content: 'Web development is an exciting field that continues to evolve. In this comprehensive guide, we explore the essential technologies every aspiring web developer should master...',
        thumbnail: '',
        author: 'Aurangzeb Sunny',
        read_time: '5 min read',
        tags: ['Web Dev', 'Tutorial', 'Beginner'],
      },
      {
        title: 'Design Principles for Better UX',
        excerpt: 'Discover key design principles that will elevate your user experience design skills.',
        content: 'User experience design is more than just making things look pretty. It\'s about creating intuitive, accessible, and delightful experiences...',
        thumbnail: '',
        author: 'Aurangzeb Sunny',
        read_time: '7 min read',
        tags: ['UX', 'Design', 'Best Practices'],
      },
      {
        title: 'The Power of Modern CSS',
        excerpt: 'Explore advanced CSS techniques that can transform your web designs.',
        content: 'Modern CSS has evolved tremendously, offering powerful features like Grid, Flexbox, Custom Properties, and more...',
        thumbnail: '',
        author: 'Aurangzeb Sunny',
        read_time: '6 min read',
        tags: ['CSS', 'Frontend', 'Tutorial'],
      },
    ]);

    // Sample Videos
    const { error: videosError } = await supabase.from('videos').insert([
      {
        title: 'Building Modern Web Apps - Complete Tutorial',
        youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        description: 'Learn how to build modern, responsive web applications using React, TypeScript, and Tailwind CSS. This comprehensive tutorial covers everything from setup to deployment.',
      },
    ]);

    // Sample Certificates
    const { error: certsError } = await supabase.from('certificates').insert([
      {
        title: 'Advanced React Development',
        issuer: 'Meta',
        date: '2024',
        image: '',
        credential_url: '',
      },
      {
        title: 'UI/UX Design Specialization',
        issuer: 'Google',
        date: '2023',
        image: '',
        credential_url: '',
      },
    ]);

    // Sample Jobs
    const { error: jobsError } = await supabase.from('jobs').insert([
      {
        title: 'Senior UI/UX Designer & Full Stack Developer',
        company: 'Freelance',
        period: '2022 - Present',
        description: 'Leading design and development initiatives for various clients, creating user-centered solutions and modern web applications. Specializing in React, Node.js, and responsive design.',
        skills: ['Figma', 'React', 'Node.js', 'UI/UX', 'TypeScript'],
        achievements: ['Delivered 50+ projects', 'Client satisfaction: 98%'],
        current: true,
      },
      {
        title: 'Lead Frontend Developer',
        company: 'Tech Innovations Inc.',
        period: '2020 - 2022',
        description: 'Led frontend development team, architected scalable applications, and implemented best practices for code quality and performance.',
        skills: ['React', 'Redux', 'TypeScript', 'Testing'],
        achievements: ['Reduced load time by 40%', 'Mentored 5 junior developers'],
        current: false,
      },
      {
        title: 'UI/UX Designer',
        company: 'Creative Studio',
        period: '2018 - 2020',
        description: 'Designed user interfaces for web and mobile applications, conducted user research, and created interactive prototypes.',
        skills: ['Figma', 'Sketch', 'Prototyping', 'User Research'],
        achievements: ['Redesigned 3 major products', 'Improved user engagement by 60%'],
        current: false,
      },
    ]);

    // Sample Reviews
    const { error: reviewsError } = await supabase.from('reviews').insert([
      {
        name: 'John Anderson',
        role: 'CEO',
        company: 'Startup Inc',
        review: 'Exceptional work! Aurangzeb delivered beyond our expectations. His attention to detail and creative solutions truly set him apart. Highly recommended for any design or development project.',
        rating: 5,
        avatar: '',
      },
      {
        name: 'Sarah Mitchell',
        role: 'Product Manager',
        company: 'Tech Solutions',
        review: 'Working with Aurangzeb was a fantastic experience. He understood our vision perfectly and brought it to life with elegant design and clean code. Communication was excellent throughout.',
        rating: 5,
        avatar: '',
      },
      {
        name: 'Michael Chen',
        role: 'Marketing Director',
        company: 'Digital Agency',
        review: 'Outstanding professionalism and technical expertise. Aurangzeb transformed our outdated website into a modern, high-performing platform that exceeded all our goals.',
        rating: 5,
        avatar: '',
      },
    ]);

    // Sample Q&As
    const { error: qasError } = await supabase.from('qas').insert([
      {
        question: 'What services do you offer?',
        answer: 'I offer comprehensive UI/UX design, web development (React, Next.js, Node.js), mobile app development, branding and identity design, digital marketing, SEO optimization, and e-commerce solutions.',
        category: 'Services',
        order: 1,
      },
      {
        question: 'How long does a typical project take?',
        answer: 'Project timelines vary based on scope and complexity. A typical landing page takes 1-2 weeks, a full website 3-6 weeks, and larger applications 2-4 months. I provide detailed timelines during consultation.',
        category: 'Timeline',
        order: 2,
      },
      {
        question: 'What is your design process?',
        answer: 'My process includes: 1) Discovery & Research, 2) Wireframing & Prototyping, 3) Visual Design, 4) Development, 5) Testing & QA, 6) Launch & Support. I maintain close collaboration throughout each phase.',
        category: 'Process',
        order: 3,
      },
      {
        question: 'Do you provide ongoing support?',
        answer: 'Yes! I offer various maintenance and support packages including bug fixes, content updates, performance optimization, and feature enhancements. All projects include 30 days of free support.',
        category: 'Support',
        order: 4,
      },
      {
        question: 'What are your rates?',
        answer: 'My rates vary depending on project complexity and requirements. I offer both fixed-price projects and hourly rates. Contact me for a detailed quote tailored to your specific needs.',
        category: 'Pricing',
        order: 5,
      },
    ]);

    console.log('Supabase initialization complete!');
  } catch (error) {
    console.error('Error initializing Supabase:', error);
  }
};

// Call initialization on first load
initializeSupabase();

// Generic CRUD operations
const getItems = async (table: string) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return toCamelCase(data || []);
  } catch (error) {
    console.error(`Error getting ${table}:`, error);
    return [];
  }
};

const addItem = async (table: string, item: any) => {
  try {
    const snakeItem = toSnakeCase(item);
    delete snakeItem.id; // Let Supabase generate the ID
    
    const { data, error } = await supabase
      .from(table)
      .insert([snakeItem])
      .select()
      .single();

    if (error) throw error;
    return toCamelCase(data);
  } catch (error) {
    console.error(`Error adding to ${table}:`, error);
    throw error;
  }
};

const updateItem = async (table: string, id: string, updates: any) => {
  try {
    const snakeUpdates = toSnakeCase(updates);
    delete snakeUpdates.id;
    snakeUpdates.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from(table)
      .update(snakeUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return toCamelCase(data);
  } catch (error) {
    console.error(`Error updating ${table}:`, error);
    throw error;
  }
};

const deleteItem = async (table: string, id: string) => {
  try {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error(`Error deleting from ${table}:`, error);
    throw error;
  }
};

// Export storage API with Supabase backend
export const storage = {
  // Projects
  getProjects: () => getItems('projects'),
  addProject: (project: any) => addItem('projects', project),
  updateProject: (id: string, updates: any) => updateItem('projects', id, updates),
  deleteProject: (id: string) => deleteItem('projects', id),

  // Posts
  getPosts: () => getItems('posts'),
  addPost: (post: any) => addItem('posts', post),
  updatePost: (id: string, updates: any) => updateItem('posts', id, updates),
  deletePost: (id: string) => deleteItem('posts', id),

  // Videos
  getVideos: () => getItems('videos'),
  addVideo: (video: any) => addItem('videos', video),
  updateVideo: (id: string, updates: any) => updateItem('videos', id, updates),
  deleteVideo: (id: string) => deleteItem('videos', id),

  // Certificates
  getCertificates: () => getItems('certificates'),
  addCertificate: (cert: any) => addItem('certificates', cert),
  deleteCertificate: (id: string) => deleteItem('certificates', id),

  // Jobs
  getJobs: () => getItems('jobs'),
  addJob: (job: any) => addItem('jobs', job),
  updateJob: (id: string, updates: any) => updateItem('jobs', id, updates),
  deleteJob: (id: string) => deleteItem('jobs', id),

  // Reviews
  getReviews: () => getItems('reviews'),
  addReview: (review: any) => addItem('reviews', review),
  deleteReview: (id: string) => deleteItem('reviews', id),

  // Q&A
  getQAs: () => getItems('qas'),
  addQA: (qa: any) => addItem('qas', qa),
  updateQA: (id: string, updates: any) => updateItem('qas', id, updates),
  deleteQA: (id: string) => deleteItem('qas', id),

  // Messages
  getMessages: () => getItems('messages'),
  addMessage: (message: any) => addItem('messages', message),
  updateMessage: (id: string, updates: any) => updateItem('messages', id, updates),
  deleteMessage: (id: string) => deleteItem('messages', id),

  // Settings
  getSettings: async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .eq('id', 'main')
        .single();

      if (error) {
        // If no settings exist, return defaults
        if (error.code === 'PGRST116') {
          return {
            profileImage: '',
            resumeUrl: '',
            linkedin: 'https://linkedin.com/in/aurangzebsunny',
            github: 'https://github.com/aurangzebsunny',
            instagram: 'https://instagram.com/aurangzebsunny',
            email: 'aurangzeb@example.com',
            phone: '+1234567890',
            whatsapp: '+1234567890',
          };
        }
        throw error;
      }
      return toCamelCase(data);
    } catch (error) {
      console.error('Error getting settings:', error);
      return {};
    }
  },

  updateSettings: async (settings: any) => {
    try {
      const snakeSettings = toSnakeCase(settings);
      snakeSettings.updated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('settings')
        .upsert({ ...snakeSettings, id: 'main' })
        .select()
        .single();

      if (error) throw error;
      return toCamelCase(data);
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  },

  // Analytics
  getAnalytics: async () => {
    try {
      const [projects, posts, messages, videos, certificates, jobs, reviews] = await Promise.all([
        getItems('projects'),
        getItems('posts'),
        getItems('messages'),
        getItems('videos'),
        getItems('certificates'),
        getItems('jobs'),
        getItems('reviews'),
      ]);

      const unreadMessages = messages.filter((m: any) => !m.read).length;

      return {
        totalProjects: projects.length,
        totalPosts: posts.length,
        totalMessages: messages.length,
        unreadMessages,
        totalVideos: videos.length,
        totalCertificates: certificates.length,
        totalJobs: jobs.length,
        totalReviews: reviews.length,
      };
    } catch (error) {
      console.error('Error getting analytics:', error);
      return {
        totalProjects: 0,
        totalPosts: 0,
        totalMessages: 0,
        unreadMessages: 0,
        totalVideos: 0,
        totalCertificates: 0,
        totalJobs: 0,
        totalReviews: 0,
      };
    }
  },

  // Contact Form Submission
  submitContact: async (contactData: any) => {
    const message = {
      name: contactData.name,
      email: contactData.email,
      phone: contactData.phone || '',
      subject: contactData.subject || 'Contact Form',
      message: contactData.message,
      source: contactData.source || 'contact-form',
      read: false,
    };
    return addItem('messages', message);
  },

  // Aura Assistant - Save lead info
  auraSubmitInfo: async (info: any) => {
    const message = {
      name: info.name,
      email: info.email,
      phone: info.phone || '',
      subject: 'Aura Assistant Lead',
      message: info.message || 'Lead captured from Aura Assistant',
      source: 'aura-assistant',
      read: false,
    };
    return addItem('messages', message);
  },

  // Newsletter Subscriptions
  getNewsletterSubscriptions: async () => {
    try {
      const { data, error } = await supabase
        .from('newsletter')
        .select('*')
        .order('subscribed_at', { ascending: false });

      if (error) throw error;
      return toCamelCase(data || []);
    } catch (error) {
      console.error('Error getting newsletter subscriptions:', error);
      return [];
    }
  },

  addNewsletterSubscription: async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('newsletter')
        .insert([{ email }])
        .select()
        .single();

      if (error) {
        // Handle duplicate email
        if (error.code === '23505') {
          throw new Error('Email already subscribed');
        }
        throw error;
      }
      return toCamelCase(data);
    } catch (error) {
      console.error('Error adding newsletter subscription:', error);
      throw error;
    }
  },

  deleteNewsletterSubscription: (id: string) => deleteItem('newsletter', id),
};

// Real-time subscriptions helper
export const subscribeToTable = (
  table: string,
  callback: (payload: any) => void
) => {
  const subscription = supabase
    .channel(`${table}_changes`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: table,
      },
      (payload) => {
        console.log(`Real-time update for ${table}:`, payload);
        callback(payload);
      }
    )
    .subscribe();

  return subscription;
};
