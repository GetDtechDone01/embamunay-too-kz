import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { createPageUrl } from '@/utils';
import { toast } from 'sonner';

export default function ArticleDetail() {
  const { id } = useParams();

  const { data: article, isLoading } = useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      const articles = await base44.entities.Article.filter({ id });
      return articles[0];
    },
  });

  useEffect(() => {
    if (article) {
      document.title = `${article.title} - EMBAMUNAY Insights`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription && article.meta_description) {
        metaDescription.setAttribute('content', article.meta_description);
      }
    }
  }, [article]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Article link copied to clipboard!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Article not found</h2>
          <Link to="/Insights">
            <Button className="mt-4">Back to Insights</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end">
        <div className="absolute inset-0">
          <img
            src={article.featured_image || 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1920&q=80'}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 pb-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/Insights">
              <Button variant="ghost" className="text-white hover:text-primary mb-4 -ml-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Insights
              </Button>
            </Link>
            <Badge className="mb-4 bg-primary text-primary-foreground">
              {article.category.replace('_', ' ').toUpperCase()}
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-white leading-tight mb-4">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              {article.author && (
                <span className="font-medium">By {article.author}</span>
              )}
              {article.published_date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(article.published_date), 'MMMM dd, yyyy')}
                </div>
              )}
              {article.read_time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {article.read_time} min read
                </div>
              )}
              <button
                onClick={handleShare}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg prose-slate max-w-none
              prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ul:text-muted-foreground prose-ol:text-muted-foreground
              prose-img:rounded-xl prose-img:shadow-lg"
          >
            <div className="text-xl text-foreground font-medium mb-8 not-prose">
              {article.excerpt}
            </div>
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </motion.div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Related Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, i) => (
                  <Badge key={i} variant="secondary" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}