import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Search, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { format } from 'date-fns';

const categories = [
  { value: "all", label: "All Articles" },
  { value: "industry_news", label: "Industry News" },
  { value: "technology", label: "Technology" },
  { value: "regulations", label: "Regulations" },
  { value: "market_analysis", label: "Market Analysis" },
  { value: "sustainability", label: "Sustainability" },
  { value: "operations", label: "Operations" },
];

export default function Insights() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: () => base44.entities.Article.filter({ is_published: true }, '-published_date'),
  });

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticle = filteredArticles[0];
  const regularArticles = filteredArticles.slice(1);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[320px] flex items-center bg-gradient-to-br from-accent via-accent/95 to-primary/20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
              <span className="text-primary font-medium tracking-widest text-sm uppercase">Industry Insights</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-display font-bold text-white leading-tight mb-4">
              Knowledge <span className="text-primary">Hub</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Stay informed with the latest developments, analysis, and insights from Kazakhstan's oil and gas sector.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-secondary/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 rounded-full"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-muted-foreground hover:bg-secondary'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-20 text-muted-foreground">Loading articles...</div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-foreground mb-2">No articles found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              {/* Featured Article */}
              {featuredArticle && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-12"
                >
                  <Link to={createPageUrl('ArticleDetail', { id: featuredArticle.id })}>
                    <div className="relative h-[450px] rounded-2xl overflow-hidden group cursor-pointer">
                      <img
                        src={featuredArticle.featured_image || 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1200&q=80'}
                        alt={featuredArticle.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <Badge className="mb-3 bg-primary text-primary-foreground">Featured</Badge>
                        <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors">
                          {featuredArticle.title}
                        </h2>
                        <p className="text-white/80 mb-4 line-clamp-2">{featuredArticle.excerpt}</p>
                        <div className="flex items-center gap-4 text-white/60 text-sm">
                          {featuredArticle.published_date && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {format(new Date(featuredArticle.published_date), 'MMM dd, yyyy')}
                            </div>
                          )}
                          {featuredArticle.read_time && (
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {featuredArticle.read_time} min read
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Article Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularArticles.map((article, i) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link to={createPageUrl('ArticleDetail', { id: article.id })}>
                      <div className="bg-card rounded-2xl border border-border overflow-hidden group cursor-pointer hover:shadow-lg transition-all">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={article.featured_image || 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&q=80'}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <Badge className="absolute top-3 right-3 bg-primary/90 text-primary-foreground">
                            {categories.find(c => c.value === article.category)?.label}
                          </Badge>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                          <div className="flex items-center gap-4 text-muted-foreground text-xs">
                            {article.published_date && (
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {format(new Date(article.published_date), 'MMM dd, yyyy')}
                              </div>
                            )}
                            {article.read_time && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {article.read_time} min
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}