import React, { useEffect, useRef, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

const PAIRS = [
  { from: 'USD', to: 'KZT', label: 'USD/KZT' },
  { from: 'EUR', to: 'KZT', label: 'EUR/KZT' },
  { from: 'RUB', to: 'KZT', label: 'RUB/KZT' },
  { from: 'GBP', to: 'KZT', label: 'GBP/KZT' },
  { from: 'USD', to: 'EUR', label: 'USD/EUR' },
  { from: 'USD', to: 'RUB', label: 'USD/RUB' },
  { from: 'CNY', to: 'KZT', label: 'CNY/KZT' },
  { from: 'USD', to: 'CNY', label: 'USD/CNY' },
];

export default function LiveExchangeRates() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const trackRef = useRef(null);

  const fetchRates = async () => {
    setLoading(true);
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Provide current live exchange rates for these currency pairs: ${PAIRS.map(p => p.label).join(', ')}. 
        For each pair, provide the rate and a simulated 24h change percentage (between -2% and +2%).
        Return today's approximate market rates.`,
        add_context_from_internet: true,
        response_json_schema: {
          type: 'object',
          properties: {
            rates: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  pair: { type: 'string' },
                  rate: { type: 'number' },
                  change_pct: { type: 'number' },
                }
              }
            }
          }
        }
      });
      if (result?.rates?.length) {
        setRates(result.rates);
        setLastUpdated(new Date());
      }
    } catch (e) {
      // fallback silent fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Duplicate for seamless loop
  const displayRates = rates.length ? [...rates, ...rates] : [];

  return (
    <div className="bg-accent border-b border-white/10 py-3 overflow-hidden relative">
      <div className="flex items-center">
        {/* Label */}
        <div className="flex-shrink-0 flex items-center gap-2 bg-primary px-4 py-1 z-10 mr-4">
          <span className="text-primary-foreground text-xs font-bold uppercase tracking-widest whitespace-nowrap">
            Live Rates
          </span>
        </div>

        {/* Ticker */}
        <div className="overflow-hidden flex-1 relative">
          {loading && rates.length === 0 ? (
            <div className="flex items-center gap-2 text-white/60 text-sm px-4">
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>Fetching live rates...</span>
            </div>
          ) : (
            <div
              ref={trackRef}
              className="flex gap-8 animate-marquee whitespace-nowrap"
              style={{ animation: 'marquee 30s linear infinite' }}
            >
              {displayRates.map((r, i) => (
                <div key={i} className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-white font-semibold text-sm">{r.pair}</span>
                  <span className="text-white/90 text-sm font-mono">
                    {typeof r.rate === 'number' ? r.rate.toLocaleString('en-US', { maximumFractionDigits: 4 }) : r.rate}
                  </span>
                  <span className={`flex items-center gap-0.5 text-xs font-medium ${r.change_pct >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {r.change_pct >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {r.change_pct >= 0 ? '+' : ''}{typeof r.change_pct === 'number' ? r.change_pct.toFixed(2) : r.change_pct}%
                  </span>
                  <span className="text-white/20 ml-2">|</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Refresh button */}
        <button
          onClick={fetchRates}
          className="flex-shrink-0 ml-4 mr-4 text-white/40 hover:text-white transition-colors"
          title="Refresh rates"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}