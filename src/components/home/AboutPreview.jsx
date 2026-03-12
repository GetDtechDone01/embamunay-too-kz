import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Globe, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function AboutPreview() {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80"
                alt="Oil refinery"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-2xl">
              <div className="text-4xl font-bold">27+</div>
              <div className="text-sm opacity-80">Years of Excellence</div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-primary" />
              <span className="text-primary font-medium tracking-widest text-sm uppercase">About Us</span>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              EMBAMUNAY TOO KZ is a premier oil and gas company headquartered in Kazakhstan, with operations spanning three continents. We specialize in drilling, well services, refinery operations, and pipeline construction, delivering world-class solutions to meet global energy demands.
            </p>

            <div className="space-y-4 mb-10">
              {[
                { icon: Shield, text: "ISO 9001, ISO 45001 & ISO 14001 Certified" },
                { icon: Globe, text: "Operations in Western Asia, Europe & South America" },
                { icon: Award, text: "Industry-leading safety and environmental standards" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground">{item.text}</span>
                </div>
              ))}
            </div>

            <Link to={createPageUrl('About')}>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground h-12 px-6 rounded-full">
                Learn More About Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}