import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Globe, Award, Users, TrendingUp, Building2 } from 'lucide-react';

const timeline = [
  { year: "1998", title: "Company Founded", description: "EMBAMUNAI TOO KZ established in Astana, Kazakhstan, focused on local drilling operations." },
  { year: "2004", title: "Regional Expansion", description: "Expanded operations to Uzbekistan and Turkmenistan, growing our Western Asian footprint." },
  { year: "2010", title: "European Operations", description: "Opened offices in Germany, Poland, and Romania to serve European energy markets." },
  { year: "2015", title: "South American Entry", description: "Launched drilling and exploration services in Brazil, Argentina, and Colombia." },
  { year: "2020", title: "$2.5B Investment Milestone", description: "Reached cumulative investment of $2.5 billion with 12,000+ employees worldwide." },
  { year: "2024", title: "Digital Transformation", description: "Implemented AI-driven drilling optimization and automated safety monitoring systems." },
];

const values = [
  { icon: Shield, title: "Safety First", description: "Zero-harm culture with industry-leading HSE standards across all operations." },
  { icon: Globe, title: "Global Reach", description: "Operating across three continents with deep local expertise in each market." },
  { icon: Award, title: "Excellence", description: "ISO 9001, ISO 45001 & ISO 14001 certified operations delivering world-class results." },
  { icon: Users, title: "People", description: "12,000+ professionals committed to innovation, safety, and continuous improvement." },
  { icon: TrendingUp, title: "Growth", description: "Sustainable growth through strategic investment and technological advancement." },
  { icon: Building2, title: "Integrity", description: "Transparent business practices with environmental and social responsibility at core." },
];

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[320px] md:h-[60vh] md:min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://sunitausa.com/wp-content/uploads/2025/09/oil-gas-storage-processing-infrastructure.webp"
            alt="Oil refinery tanks"
            className="w-full h-full object-cover object-center"
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
              <span className="text-primary font-medium tracking-widest text-sm uppercase">Our Story</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-display font-bold text-white leading-tight">
              About <span className="text-primary">EMBAMUNAY</span>
            </h1>
            <p className="text-white/60 text-lg mt-4 max-w-2xl">
              A quarter century of excellence in oil and gas operations, from the heart of Central Asia to the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-6">
                Our <span className="text-primary">Mission</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                EMBAMUNAY TOO KZ is dedicated to being the partner of choice for oil and gas companies worldwide. We combine deep technical expertise with cutting-edge technology to deliver drilling, well services, and refinery solutions that exceed expectations.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Headquartered in Atyrau, Kazakhstan, we have built a global network spanning Western Asia, Europe, and South America, enabling us to serve clients wherever energy opportunities arise. Our commitment to safety, environmental stewardship, and social responsibility guides every project we undertake.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://media.istockphoto.com/id/1412547603/photo/refinery-blue-collar-worker-standing-by-lpg-pipeline-and-checking-gas-production-or.jpg?s=612x612&w=0&k=20&c=AOC0LhQeqFPc98YC7eCuu3hwstKAhaFcI0gWIE3YyZ4="
                alt="Operations"
                className="rounded-2xl w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl">
                <div className="text-3xl font-bold">27+</div>
                <div className="text-sm opacity-80">Years of Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground">
              Our <span className="text-primary">Values</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card p-6 rounded-2xl border border-border hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground">
              Our <span className="text-primary">Journey</span>
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-card p-6 rounded-2xl border border-border inline-block">
                      <div className="text-primary font-bold text-xl mb-1">{item.year}</div>
                      <div className="font-bold text-foreground mb-2">{item.title}</div>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg flex-shrink-0 hidden md:block" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}