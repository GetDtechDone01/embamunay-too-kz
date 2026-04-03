import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import Logo from './components/common/Logo';
import Footer from './components/common/Footer';
import AIChatWidget from './components/chat/AIChatWidget';
import ScrollToTop from './components/common/ScrollToTop';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogIn } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: "Home", page: "Home" },
  { name: "About", page: "About" },
  { name: "Services", page: "Services" },
  { name: "Insights", page: "Insights" },
  { name: "Contact", page: "Contact" },
];

export default function Layout({ children, currentPageName }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const authed = await base44.auth.isAuthenticated();
      setIsAuthenticated(authed);
      if (authed) {
        const me = await base44.auth.me();
        setUser(me);
      }
    };
    checkAuth();
  }, []);

  const isHome = currentPageName === "Home";
  const isTransparent = isHome && !scrolled;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isTransparent ? 'bg-transparent' : 'bg-background/95 backdrop-blur-lg shadow-sm border-b border-border/50'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to={createPageUrl('Home')}>
            <div className={isTransparent ? 'text-white [&_span]:text-white [&_span]:text-white/60' : ''}>
              <Logo />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.page}
                to={createPageUrl(link.page)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  currentPageName === link.page
                    ? 'bg-primary/10 text-primary'
                    : isTransparent
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="ml-4 flex items-center gap-2">
              <Link to={createPageUrl('RequestService')}>
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-10 px-5">
                  Request Service
                </Button>
              </Link>

              {isAuthenticated ? (
                <Link to={createPageUrl('Dashboard')}>
                  <Button size="sm" variant="outline" className={`rounded-full h-10 px-4 ${isTransparent ? 'border-white/30 text-white hover:bg-white/10 hover:text-white/50' : ''}`}>
                    <User className="w-4 h-4 mr-2" />
                    {user?.full_name?.split(' ')[0] || 'Account'}
                  </Button>
                </Link>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => base44.auth.redirectToLogin()}
                  className={`rounded-full h-10 px-4 ${isTransparent ? 'border-white/30 text-white hover:bg-white/10 hover:text-white/50' : ''}`}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg ${isTransparent ? 'text-white' : 'text-foreground'}`}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-background border-t border-border overflow-hidden"
            >
              <div className="px-6 py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.page}
                    to={createPageUrl(link.page)}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                      currentPageName === link.page
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:bg-secondary'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link to={createPageUrl('RequestService')} onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full mt-2">
                    Request Service
                  </Button>
                </Link>
                {!isAuthenticated && (
                  <Button
                    variant="outline"
                    className="w-full rounded-full mt-2"
                    onClick={() => base44.auth.redirectToLogin()}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Page Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* AI Chat Widget */}
      <AIChatWidget />
      <ScrollToTop />
    </div>
  );
}