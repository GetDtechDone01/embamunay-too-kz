import React from 'react';
import HeroSection from '../components/home/HeroSection';
import AboutPreview from '../components/home/AboutPreview';
import ProductsSection from '../components/home/ProductsSection';
import ServicesPreview from '../components/home/ServicesPreview';
import MarketDashboard from '../components/home/MarketDashboard';
import GeographySection from '../components/home/GeographySection';
import SocialResponsibility from '../components/home/SocialResponsibility';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <MarketDashboard />
      <AboutPreview />
      <ProductsSection />
      <ServicesPreview />
      <GeographySection />
      <SocialResponsibility />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}