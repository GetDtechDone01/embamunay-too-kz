import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner';

// Must match the STATIC_ARTICLES array in pages/Insights.jsx
const STATIC_ARTICLES = [
  {
    id: "1",
    title: "Kazakhstan's Oil and Gas Sector: Growth and Investment Outlook 2024",
    excerpt: "Kazakhstan continues to attract major international investment in its vast hydrocarbon reserves, with new developments in the Kashagan and Tengiz fields driving record output projections.",
    featured_image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80",
    category: "industry_news",
    published_date: "2024-03-15",
    read_time: 7,
    author: "EMBAMUNAY Editorial",
    content: `Kazakhstan's oil and gas sector is experiencing a period of significant growth, driven by continued investment in major fields such as Kashagan, Tengiz, and Karachaganak. The country's strategic location and vast reserves position it as a key player in global energy markets.\n\nThe Tengizchevroil Future Growth Project, nearing completion, is expected to add 260,000 barrels per day to Kazakhstan's output, bringing total production from the Tengiz field to approximately 850,000 barrels per day.\n\nForeign direct investment remains robust, with international oil companies committed to long-term partnerships with KazMunayGas, the state energy company. These partnerships are critical for transferring technology and expertise to Kazakhstan's growing domestic workforce.\n\nThe government's ambitious energy strategy aims to increase oil production to 100 million tonnes per year by 2025, while simultaneously expanding refining capacity to meet both domestic demand and export targets.`
  },
  {
    id: "2",
    title: "Advanced Refinery Technologies Reshaping Central Asian Energy",
    excerpt: "Modern refining processes and digitalization are transforming how Central Asian refineries operate, boosting efficiency and reducing environmental impact across the region.",
    featured_image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=80",
    category: "technology",
    published_date: "2024-02-28",
    read_time: 5,
    author: "EMBAMUNAY Editorial",
    content: `The adoption of advanced refinery technologies is rapidly transforming operations across Central Asia. From predictive maintenance systems powered by artificial intelligence to advanced catalytic cracking units, refineries in the region are modernizing at an unprecedented pace.\n\nDigital twin technology, which creates virtual replicas of physical refinery processes, allows operators to simulate and optimize operations without risking actual production. This technology alone has demonstrated efficiency gains of up to 15% in pilot programs.\n\nEnvironmental compliance is also driving technological investment. New hydrotreating units reduce sulfur content in refined products, enabling refineries to meet increasingly stringent international fuel quality standards and access premium export markets.`
  },
  {
    id: "3",
    title: "New Environmental Regulations Impacting Oil Operations in Kazakhstan",
    excerpt: "Kazakhstan's updated environmental framework introduces stricter emissions standards and flaring reduction targets, requiring operators to adapt their practices and invest in cleaner technologies.",
    featured_image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
    category: "regulations",
    published_date: "2024-02-10",
    read_time: 6,
    author: "EMBAMUNAY Editorial",
    content: `Kazakhstan has introduced a comprehensive update to its environmental regulatory framework governing hydrocarbon extraction and refining. The new regulations, set to be fully enforced by 2025, represent the most significant overhaul of environmental standards in the country's post-independence history.\n\nKey provisions include a 30% reduction in associated gas flaring by 2025, mandatory carbon emissions reporting for all oil and gas operations, stricter wastewater treatment standards, and enhanced requirements for environmental impact assessments.\n\nCompanies operating in Kazakhstan are investing heavily in compliance infrastructure. Gas utilization projects, which capture and process previously flared gas, are attracting significant capital as operators seek to meet the new targets while also monetizing a previously wasted resource.`
  },
  {
    id: "4",
    title: "Global Crude Oil Market Analysis: Trends Affecting Central Asian Exports",
    excerpt: "An in-depth look at how shifting global demand patterns, OPEC+ decisions, and geopolitical developments are influencing crude oil pricing and export volumes from Kazakhstan.",
    featured_image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80",
    category: "market_analysis",
    published_date: "2024-01-20",
    read_time: 8,
    author: "EMBAMUNAY Editorial",
    content: `Global crude oil markets continue to navigate a complex landscape of competing forces. For Central Asian exporters like Kazakhstan, understanding these dynamics is critical for planning production, logistics, and commercial strategy.\n\nKazakhstan exports the majority of its crude through the Caspian Pipeline Consortium (CPC) route to the Black Sea port of Novorossiysk. This route has faced periodic disruptions, underscoring the importance of export route diversification, including the Trans-Caspian route and Chinese pipeline connections.\n\nOPEC+ production management policies directly influence the price environment in which Kazakhstan's crude is sold. As a non-OPEC member that cooperates with the agreement, Kazakhstan must balance its production targets with its domestic industry's development needs.\n\nDemand forecasts from major energy agencies suggest continued strong demand for Kazakh crude grades in European and Asian markets through 2030, providing a favorable backdrop for investment in production capacity.`
  },
  {
    id: "5",
    title: "EMBAMUNAY's Commitment to Sustainable Oil Field Operations",
    excerpt: "How EMBAMUNAY TOO is implementing environmental best practices and sustainability initiatives across its operations in the Atyrau region of Kazakhstan.",
    featured_image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
    category: "sustainability",
    published_date: "2024-01-05",
    read_time: 4,
    author: "EMBAMUNAY Editorial",
    content: `At EMBAMUNAY TOO, sustainability is not an afterthought but a core operational principle. Our commitment to responsible resource extraction guides every decision, from field development planning to day-to-day production management.\n\nOur environmental management system, certified to ISO 14001 standards, provides the framework for identifying, managing, and minimizing our environmental footprint. Regular audits ensure that our practices meet both regulatory requirements and our own internal standards.\n\nWater management is a particular focus in the arid Atyrau region. We have implemented closed-loop water recycling systems that significantly reduce freshwater consumption and minimize produced water disposal challenges.\n\nCommunity engagement is also central to our sustainability approach. We work closely with local communities in the areas where we operate, ensuring that our presence brings tangible economic and social benefits beyond direct employment.`
  },
  {
    id: "6",
    title: "Pipeline Infrastructure Development: Connecting Caspian Resources to World Markets",
    excerpt: "An overview of the pipeline networks that connect Kazakhstan's prolific oil fields to global markets, and the ongoing projects to expand and diversify export capacity.",
    featured_image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    category: "operations",
    published_date: "2023-12-15",
    read_time: 6,
    author: "EMBAMUNAY Editorial",
    content: `Kazakhstan's landlocked geography makes pipeline infrastructure a strategic national priority. The country's ability to monetize its vast hydrocarbon resources depends critically on reliable, diverse, and high-capacity export routes.\n\nThe Caspian Pipeline Consortium (CPC) remains the primary export artery, with a capacity of approximately 80 million tonnes per year. Recent expansion works have added pumping stations that increase throughput capacity and improve operational reliability.\n\nThe Kazakhstan-China pipeline system provides an important alternative route, with capacity to transport approximately 20 million tonnes of crude per year to refineries in western China. This route's strategic value has grown in recent years as Chinese demand for Central Asian crude has increased.\n\nFuture infrastructure development is focused on the Trans-Caspian route, which would connect Kazakh production to the Baku-Tbilisi-Ceyhan pipeline and access Mediterranean markets. Significant regulatory and technical work is underway to advance this strategically important project.`
  },
];

export default function ArticleDetail() {
  const { id } = useParams();
  const article = STATIC_ARTICLES.find(a => a.id === id);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} - EMBAMUNAY Insights`;
    }
  }, [article]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Article link copied to clipboard!');
  };

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
            src={article.featured_image}
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
              {article.category.replace(/_/g, ' ').toUpperCase()}
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-white leading-tight mb-4">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              {article.author && (
                <span className="font-medium">By {article.author}</span>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {article.published_date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {article.read_time} min read
              </div>
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
        </div>
      </section>
    </div>
  );
}