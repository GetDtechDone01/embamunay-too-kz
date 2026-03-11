import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Drill, Wrench, Factory, GitBranch, Truck, Headphones, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const services = [
  {
    icon: Drill,
    title: "Drilling Services",
    description: "State-of-the-art drilling technologies for oil and gas wells construction, including directional and horizontal drilling across all geological formations.",
    features: ["Vertical & Directional Drilling", "Horizontal Well Construction", "Deep Well Drilling", "Slim-hole Drilling"],
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=80",
  },
  {
    icon: Wrench,
    title: "Well Services",
    description: "Comprehensive well maintenance and workover operations ensuring maximum production efficiency and well integrity throughout the lifecycle.",
    features: ["Workover Operations", "Well Completion", "Production Optimization", "Well Intervention"],
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
  },
  {
    icon: Factory,
    title: "Refinery Operations",
    description: "Full-cycle refinery services from crude oil processing to finished product delivery, utilizing modern refining technologies.",
    features: ["Crude Oil Processing", "Product Refining", "Quality Control", "Storage Solutions"],
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80",
  },
  {
    icon: GitBranch,
    title: "Pipeline Construction",
    description: "End-to-end pipeline infrastructure development including design, construction, testing, and ongoing maintenance services.",
    features: ["Pipeline Design & Engineering", "Construction & Welding", "Testing & Commissioning", "Maintenance & Repair"],
    image: "https://images.unsplash.com/photo-1473621038790-b778b4750efe?w=800&q=80",
  },
  {
    icon: Truck,
    title: "Logistics & Supply Chain",
    description: "Integrated logistics solutions tailored for remote oil field operations, ensuring timely delivery of equipment and materials.",
    features: ["Equipment Transport", "Material Supply Chain", "Fleet Management", "Warehouse Operations"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
  },
  {
    icon: Headphones,
    title: "Technical Consultation",
    description: "Expert advisory services for exploration planning, production strategy, risk assessment, and regulatory compliance.",
    features: ["Exploration Advisory", "Production Planning", "Risk Assessment", "Regulatory Compliance"],
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
  },
];

export default function Services() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1920&q=80"
            alt="Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-primary" />
              <span className="text-primary font-medium tracking-widest text-sm uppercase">What We Offer</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-display font-bold text-white leading-tight">
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="text-white/60 text-lg mt-4 max-w-2xl">
              Comprehensive energy solutions tailored to your project requirements, delivered with excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="relative rounded-2xl overflow-hidden h-[360px]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>
                </div>
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <h3 className="text-3xl font-display font-bold text-foreground mb-4">{service.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">{service.description}</p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {service.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link to={createPageUrl('RequestService')}>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-11 px-6">
                      Request This Service
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}