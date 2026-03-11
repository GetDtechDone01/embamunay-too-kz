import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Leaf, Users, GraduationCap } from 'lucide-react';

const pillars = [
  {
    icon: ShieldCheck,
    title: "Occupational Safety",
    description: "Zero injuries target with industry-leading HSE standards. We protect our personnel, contractors, and assets at every stage.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80"
  },
  {
    icon: Leaf,
    title: "Environmental Protection",
    description: "Committed to ecological compliance and rational use of natural resources across all operations.",
    image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=600&q=80"
  },
  {
    icon: Users,
    title: "Social Security",
    description: "A socially responsible employer providing advanced training, community support, and employee wellbeing.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80"
  },
  {
    icon: GraduationCap,
    title: "High Competence",
    description: "Continuous professional development and certification ensuring the highest standards in the industry.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80"
  }
];

export default function SocialResponsibility() {
  return (
    <section className="py-24 lg:py-32 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-primary font-medium tracking-widest text-sm uppercase">Sustainability</span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight">
            Social <span className="text-primary">Responsibility</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-500"
            >
              <div className="h-44 overflow-hidden relative">
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute bottom-4 left-4 w-10 h-10 rounded-lg bg-primary/90 flex items-center justify-center">
                  <pillar.icon className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground mb-2">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}