import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Alexander Petrov",
    title: "CEO, KazMunaiGas",
    company: "KazMunaiGas",
    avatar: "AP",
    rating: 5,
    comment: "EMBAMUNAY TOO KZ delivered exceptional drilling services for our Caspian offshore project. Their technical expertise and commitment to safety standards exceeded all our expectations. A truly world-class partner."
  },
  {
    name: "Hans Mueller",
    title: "Operations Director, EuroEnergy GmbH",
    company: "EuroEnergy GmbH",
    avatar: "HM",
    rating: 5,
    comment: "We have worked with EMBAMUNAY on multiple pipeline construction projects across Europe. Their professionalism, on-time delivery, and quality of work are unmatched in the industry."
  },
  {
    name: "Carlos Mendoza",
    title: "VP Exploration, PetroSur S.A.",
    company: "PetroSur S.A.",
    avatar: "CM",
    rating: 5,
    comment: "Outstanding service from start to finish. EMBAMUNAY's team in South America handled our well services with incredible precision. Their local expertise combined with global standards made all the difference."
  },
  {
    name: "Dmitry Volkov",
    title: "Project Manager, RusOil Corp",
    company: "RusOil Corp",
    avatar: "DV",
    rating: 5,
    comment: "Reliable, professional, and highly skilled. EMBAMUNAY TOO KZ managed our refinery operations with zero incidents and delivered 15% above target production efficiency. Highly recommended."
  },
  {
    name: "Fatima Al-Rashid",
    title: "Head of Procurement, Gulf Petroleum",
    company: "Gulf Petroleum",
    avatar: "FA",
    rating: 5,
    comment: "From consultation to execution, the EMBAMUNAY team demonstrated deep knowledge and genuine commitment. Their logistics support for our Western Asian operations was flawless and cost-effective."
  },
  {
    name: "Thomas Bergmann",
    title: "Technical Director, Nordic Oil Partners",
    company: "Nordic Oil Partners",
    avatar: "TB",
    rating: 5,
    comment: "EMBAMUNAY's drilling team is among the best we've worked with globally. Their adherence to ISO standards and proactive communication made the entire project run smoothly."
  }
];

function StarRating({ count }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(testimonials.length / perPage);
  const visible = testimonials.slice(current * perPage, current * perPage + perPage);

  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-primary font-medium tracking-widest text-sm uppercase">Client Testimonials</span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Trusted by leading energy companies across three continents
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-primary text-primary" />)}
            </div>
            <span className="text-foreground font-semibold ml-2">5.0</span>
            <span className="text-muted-foreground">— Rated Excellent by 200+ clients</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {visible.map((t, i) => (
            <motion.div
              key={current * perPage + i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col"
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4 flex-shrink-0" />
              <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">"{t.comment}"</p>
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold text-sm">{t.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-foreground text-sm truncate">{t.name}</div>
                  <div className="text-muted-foreground text-xs truncate">{t.title}</div>
                  <StarRating count={t.rating} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-primary w-6' : 'bg-border'}`}
            />
          ))}
          <button
            onClick={() => setCurrent((c) => Math.min(totalPages - 1, c + 1))}
            disabled={current === totalPages - 1}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}