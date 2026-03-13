import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const products = [
  {
    name: "EN590 ULSD",
    image: "https://images.unsplash.com/photo-1545670723-196ed0954986?w=400&q=80"
  },
  {
    name: "D2 DIESEL GAS OIL",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80"
  },
  {
    name: "UREA FERTILISER",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&q=80"
  },
  {
    name: "D6 VIRGIN FUEL OIL",
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&q=80"
  },
  {
    name: "LIQUEFIED PETROLEUM GAS",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80"
  },
  {
    name: "KAZAKHSTAN CRUDE OIL (KEBCO)",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&q=80"
  },
  {
    name: "FUEL OIL",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=400&q=80"
  },
  {
    name: "CST-180",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80"
  },
  {
    name: "BITUMEN 60/70 & 80/100",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=400&q=80"
  },
  {
    name: "JET A1 FUEL",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80"
  },
  {
    name: "AVIATION KEROSENE (JP54)",
    image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=400&q=80"
  }
];

export default function ProductsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-primary font-medium tracking-widest text-sm uppercase">What We Offer</span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Our Products and <span className="text-primary">What We Offer</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Premium quality petroleum products and refined fuels for global energy markets
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl hover:border-primary/50 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Market Indicators */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <div className="w-10 h-10 rounded-full bg-green-500/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>Available</span>
                  </div>
                  <span className="text-border">|</span>
                  <span className="text-green-600 font-medium">In Stock</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link to={createPageUrl('Contact')}>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-10 text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <TrendingUp className="w-5 h-5 mr-2" />
              Contact Us Now!
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}