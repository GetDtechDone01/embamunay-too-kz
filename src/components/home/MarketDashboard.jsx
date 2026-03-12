import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart3, Globe2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { base44 } from '@/api/base44Client';

export default function MarketDashboard() {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const result = await base44.integrations.Core.InvokeLLM({
          prompt: `Provide current oil and gas market data in JSON format. Include:
          - Brent Crude price (current USD per barrel)
          - WTI Crude price (current USD per barrel)
          - Natural Gas price (current USD per MMBtu)
          - Global oil demand (million barrels per day)
          - OPEC production (million barrels per day)
          - Price change percentage for Brent (last 24h)
          - Price change percentage for WTI (last 24h)
          - Market sentiment (bullish/bearish/neutral)
          
          Use real-time data from the internet to get accurate current prices and market conditions.`,
          add_context_from_internet: true,
          response_json_schema: {
            type: "object",
            properties: {
              brent_crude: { type: "number" },
              wti_crude: { type: "number" },
              natural_gas: { type: "number" },
              global_demand: { type: "number" },
              opec_production: { type: "number" },
              brent_change: { type: "number" },
              wti_change: { type: "number" },
              market_sentiment: { type: "string" }
            }
          }
        });
        setMarketData(result);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch market data:', error);
        setLoading(false);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-accent">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-white/60 mt-4">Loading market data...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!marketData) {
    return null;
  }

  const metrics = [
    {
      title: "Brent Crude",
      value: `$${marketData.brent_crude?.toFixed(2)}`,
      change: marketData.brent_change,
      unit: "per barrel",
      icon: BarChart3,
      color: "text-primary"
    },
    {
      title: "WTI Crude",
      value: `$${marketData.wti_crude?.toFixed(2)}`,
      change: marketData.wti_change,
      unit: "per barrel",
      icon: TrendingUp,
      color: "text-primary"
    },
    {
      title: "Natural Gas",
      value: `$${marketData.natural_gas?.toFixed(2)}`,
      change: null,
      unit: "per MMBtu",
      icon: Globe2,
      color: "text-primary"
    },
    {
      title: "Global Demand",
      value: `${marketData.global_demand?.toFixed(1)}M`,
      change: null,
      unit: "barrels/day",
      icon: Globe2,
      color: "text-primary"
    },
  ];

  const sentimentColor = {
    bullish: "text-green-500",
    bearish: "text-red-500",
    neutral: "text-yellow-500"
  }[marketData.market_sentiment?.toLowerCase()] || "text-white/60";

  return (
    <section className="py-16 bg-accent relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <BarChart3 className="w-6 h-6 text-primary" />
            <span className="text-primary font-medium tracking-widest text-sm uppercase">Live Market Data</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            Global Energy <span className="text-primary">Markets</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Real-time pricing and market indicators updated every 5 minutes
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-white/50 text-sm">Live Feed Active</span>
            <span className="text-white/30 text-sm mx-2">•</span>
            <span className={`text-sm font-medium ${sentimentColor}`}>
              Market Sentiment: {marketData.market_sentiment?.toUpperCase()}
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            const isPositive = metric.change > 0;
            const isNegative = metric.change < 0;
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-primary/50 transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white/80 text-sm font-medium">{metric.title}</CardTitle>
                      <Icon className={`w-5 h-5 ${metric.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-white">{metric.value}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/40 text-xs">{metric.unit}</span>
                        {metric.change !== null && (
                          <div className={`flex items-center gap-1 text-sm font-medium ${
                            isPositive ? 'text-green-500' : isNegative ? 'text-red-500' : 'text-white/60'
                          }`}>
                            {isPositive ? <TrendingUp className="w-4 h-4" /> : isNegative ? <TrendingDown className="w-4 h-4" /> : null}
                            {Math.abs(metric.change).toFixed(2)}%
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* OPEC Production Footer */}
        {marketData.opec_production && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <Globe2 className="w-4 h-4 text-primary" />
              <span className="text-white/60 text-sm">
                OPEC Production: <span className="text-white font-semibold">{marketData.opec_production.toFixed(1)}M</span> barrels/day
              </span>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center text-white/40 text-xs"
        >
          Data sourced from global energy markets • Last updated: {new Date().toLocaleTimeString()}
        </motion.div>
      </div>
    </section>
  );
}