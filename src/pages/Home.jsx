import React from 'react';
import HeroSection from '../components/home/HeroSection';
import AboutPreview from '../components/home/AboutPreview';
import ServicesPreview from '../components/home/ServicesPreview';
import GeographySection from '../components/home/GeographySection';
import SocialResponsibility from '../components/home/SocialResponsibility';
import CTASection from '../components/home/CTASection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutPreview />
      <ServicesPreview />
      <GeographySection />
      <SocialResponsibility />
      <CTASection />
    </div>
  );
}