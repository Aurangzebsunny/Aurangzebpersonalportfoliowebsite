import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, Star } from 'lucide-react';
import { storage, subscribeToTable } from '../utils/storage';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Load initial data
    loadProjects();

    // Subscribe to real-time updates
    const subscription = subscribeToTable('projects', (payload) => {
      loadProjects(); // Reload projects on any change
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadProjects = async () => {
    const data = await storage.getProjects();
    setProjects(data);
  };

  const categories = ['All', 'UI/UX Design', 'Web Development', 'Mobile App', 'Branding'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">
            Recent <span className="gradient-text">Works</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Explore my latest projects across design, development, and marketing
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-6 py-2 rounded-full transition-all uppercase tracking-wider text-xs sm:text-sm ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-card border border-border hover-glow'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group cursor-pointer"
              >
                <div className="bg-card rounded-2xl overflow-hidden hover-glow transition-all border border-border">
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <ImageWithFallback
                      src={project.thumbnail || 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=800'}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {project.featured && (
                      <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full flex items-center gap-1 text-xs sm:text-sm">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs uppercase tracking-wider text-primary">
                        {project.category || 'Project'}
                      </span>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="text-lg sm:text-xl mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}