import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Drill, Wrench, Factory, GitBranch, Truck, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const services = [
  {
    icon: Drill,
    title: "Drilling Services",
    description: "Advanced drilling technologies for oil and gas wells construction, including directional and horizontal drilling.",
    image: "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?w=600&q=80"
  },
  {
    icon: Wrench,
    title: "Well Services",
    description: "Complete well maintenance, workover operations, and production optimization services.",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80"
  },
  {
    icon: Factory,
    title: "Refinery Operations",
    description: "Full-cycle refinery services from crude oil processing to finished product delivery.",
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&q=80"
  },
  {
    icon: GitBranch,
    title: "Pipeline Construction",
    description: "Design, construction, and maintenance of oil and gas pipeline infrastructure.",
    image: "https://images.unsplash.com/photo-1473621038790-b778b4750efe?w=600&q=80"
  },
  {
    icon: Truck,
    title: "Logistics",
    description: "Comprehensive logistics and supply chain management for oil field operations.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80"
  },
  {
    icon: Headphones,
    title: "Consultation",
    description: "Expert technical consultation for exploration, production planning, and risk assessment.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80"
  }
];

export default function ServicesPreview() {
  return (
    <section className="py-24 lg:py-32 bg-accent text-accent-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 border border-primary rounded-full" />
        <div className="absolute bottom-10 right-10 w-96 h-96 border border-primary rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-primary" />
              <span className="text-primary font-medium tracking-widest text-sm uppercase">Our Services</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-display font-bold leading-tight">
              Comprehensive <br />
              <span className="text-primary">Energy Solutions</span>
            </h2>
          </div>
          <Link to={createPageUrl('Services')} className="mt-6 md:mt-0">
            <Button variant="outline" className="rounded-full border-primary/30 text-primary hover:bg-primary/10 h-12 px-6">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all duration-500"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent via-accent/50 to-transparent" />
              </div>
              <div className="p-6 relative">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 -mt-12 relative z-10 border border-primary/30">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}