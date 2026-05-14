import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

// Static reference rates — update manually as needed
const STATIC_RATES = [
  { pair: 'USD/KZT', rate: 454.50, change_pct: 0.12 },
  { pair: 'EUR/KZT', rate: 491.20, change_pct: -0.08 },
  { pair: 'RUB/KZT', rate: 5.02,  change_pct: 0.21 },
  { pair: 'GBP/KZT', rate: 573.80, change_pct: -0.15 },
  { pair: 'USD/EUR', rate: 0.925,  change_pct: -0.05 },
  { pair: 'USD/RUB', rate: 90.45,  change_pct: 0.30 },
  { pair: 'CNY/KZT', rate: 62.70,  change_pct: 0.07 },
  { pair: 'USD/CNY', rate: 7.245,  change_pct: -0.02 },
];

export default function LiveExchangeRates() {
  const displayRates = [...STATIC_RATES, ...STATIC_RATES];

  return (
    <div className="bg-accent border-b border-white/10 py-3 overflow-hidden relative">
      <div className="flex items-center">
        {/* Label */}
        <div className="flex-shrink-0 flex items-center gap-2 bg-primary px-4 py-1 z-10 mr-4">
          <span className="text-primary-foreground text-xs font-bold uppercase tracking-widest whitespace-nowrap">
            Exchange Rates
          </span>
        </div>

        {/* Ticker */}
        <div className="overflow-hidden flex-1 relative">
          <div
            className="flex gap-8 whitespace-nowrap"
            style={{ animation: 'marquee 30s linear infinite' }}
          >
            {displayRates.map((r, i) => (
              <div key={i} className="flex items-center gap-2 flex-shrink-0">
                <span className="text-white font-semibold text-sm">{r.pair}</span>
                <span className="text-white/90 text-sm font-mono">
                  {r.rate.toLocaleString('en-US', { maximumFractionDigits: 4 })}
                </span>
                <span className={`flex items-center gap-0.5 text-xs font-medium ${r.change_pct >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {r.change_pct >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {r.change_pct >= 0 ? '+' : ''}{r.change_pct.toFixed(2)}%
                </span>
                <span className="text-white/20 ml-2">|</span>
              </div>
            ))}
          </div>
        </div>
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