import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function CTASection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://miro.medium.com/1*bs-PvaaT2p9UmkPuL0uJnQ.jpeg"
          alt="Oil rig sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
            Ready to Start Your <span className="text-primary">Next Project?</span>
          </h2>
          <p className="text-white/60 text-lg mb-10 leading-relaxed">
            Whether you need drilling services, pipeline construction, or expert consultation, our team is ready to deliver world-class solutions tailored to your needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={createPageUrl('RequestService')}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8 text-base font-semibold rounded-full">
                Request a Service
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base font-semibold rounded-full border-white/30 text-white hover:bg-gray-500/30 hover:text-gray-300 hover:border-gray-400/40">
                <Phone className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}