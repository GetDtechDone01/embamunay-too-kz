import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { MapPin, Phone, Mail, Globe2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Logo />
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              A premier oil and gas company delivering world-class energy solutions across three continents.
            </p>
            <div className="flex gap-3">
              {['LinkedIn', 'X', 'FB'].map((social, i) => (
                <div key={i} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-xs text-white/60 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                  {social}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase">Company</h4>
            <div className="space-y-3">
              {[
                { name: "About Us", page: "About" },
                { name: "Services", page: "Services" },
                { name: "Contact", page: "Contact" },
                { name: "Request Service", page: "RequestService" },
              ].map((link, i) => (
                <Link
                  key={i}
                  to={createPageUrl(link.page)}
                  className="block text-white/50 hover:text-primary transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase">Services</h4>
            <div className="space-y-3">
              {["Drilling", "Well Services", "Refinery Operations", "Pipeline Construction", "Logistics", "Consultation"].map((service, i) => (
                <span key={i} className="block text-white/50 text-sm">{service}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-white/50 text-sm">Astana, Kazakhstan<br />Business Center "EMBAMUNAI"</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-white/50 text-sm">+7 926 9769</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-white/50 text-sm">info@embamunai.kz</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe2 className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-white/50 text-sm">www.embamunai.kz</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-white/30 text-sm">
            © {new Date().getFullYear()} EMBAMUNAI TOO KZ. All rights reserved.
          </span>
          <div className="flex gap-6">
            <span className="text-white/30 text-sm hover:text-white/50 cursor-pointer">Privacy Policy</span>
            <span className="text-white/30 text-sm hover:text-white/50 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}