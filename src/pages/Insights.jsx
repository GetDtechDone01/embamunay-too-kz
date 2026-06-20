import React, { useState } from 'react';
import LiveExchangeRates from '../components/insights/LiveExchangeRates';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Search, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { value: "all", label: "All Articles" },
  { value: "industry_news", label: "Industry News" },
  { value: "technology", label: "Technology" },
  { value: "regulations", label: "Regulations" },
  { value: "market_analysis", label: "Market Analysis" },
  { value: "sustainability", label: "Sustainability" },
  { value: "operations", label: "Operations" },
];

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

export default function Insights() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredArticles = STATIC_ARTICLES.filter(article => {
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

      <LiveExchangeRates />

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
          {filteredArticles.length === 0 ? (
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
                  <Link to={`/ArticleDetail/${featuredArticle.id}`}>
                    <div className="relative h-[450px] rounded-2xl overflow-hidden group cursor-pointer">
                      <img
                        src={featuredArticle.featured_image}
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
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {featuredArticle.published_date}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {featuredArticle.read_time} min read
                          </div>
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
                    <Link to={`/ArticleDetail/${article.id}`}>
                      <div className="bg-card rounded-2xl border border-border overflow-hidden group cursor-pointer hover:shadow-lg transition-all">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={article.featured_image}
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
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {article.published_date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {article.read_time} min
                            </div>
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