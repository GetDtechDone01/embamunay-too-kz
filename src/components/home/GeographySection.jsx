import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe2 } from 'lucide-react';

const regions = [
  {
    name: "Western Asia",
    countries: ["Kazakhstan", "Uzbekistan", "Turkmenistan"],
    description: "Our headquarters and largest operations hub, serving the heart of Central Asian energy resources.",
    image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=600&q=80",
    stats: "4,200+ employees"
  },
  {
    name: "Europe",
    countries: ["Germany", "Poland", "Romania"],
    description: "Strategic European operations providing refinery and pipeline services across the continent.",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80",
    stats: "3,800+ employees"
  },
  {
    name: "South America",
    countries: ["Brazil", "Argentina", "Colombia"],
    description: "Expanding presence in South American markets with drilling and exploration services.",
    image: "https://images.unsplash.com/photo-1619546952812-520e98064a52?w=600&q=80",
    stats: "4,000+ employees"
  }
];

export default function GeographySection() {
  return (
    <section className="py-24 lg:py-32 bg-background relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-primary font-medium tracking-widest text-sm uppercase">Global Presence</span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight">
            Our <span className="text-primary">Locations</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Operating across three continents, delivering energy solutions where they matter most.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {regions.map((region, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative rounded-2xl overflow-hidden h-[480px]"
            >
              <img
                src={region.image}
                alt={region.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-2 mb-2">
                  <Globe2 className="w-4 h-4 text-primary" />
                  <span className="text-primary text-sm font-medium">{region.stats}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{region.name}</h3>
                <p className="text-white/60 text-sm mb-4 leading-relaxed">{region.description}</p>
                <div className="flex flex-wrap gap-2">
                  {region.countries.map((country, j) => (
                    <span key={j} className="flex items-center gap-1 text-xs bg-white/10 backdrop-blur-sm text-white/80 px-3 py-1.5 rounded-full border border-white/10">
                      <MapPin className="w-3 h-3 text-primary" />
                      {country}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}