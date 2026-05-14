import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Phone, Mail, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const FAQ_ITEMS = [
  {
    q: "What services do you offer?",
    a: "We provide Drilling, Well Services, Refinery Operations, Pipeline Construction, Logistics, and Technical Consultation across Western Asia, Europe, and South America."
  },
  {
    q: "How do I request a service?",
    a: "You can submit a Service Request through our website. Our team will review and respond within 24–48 hours."
  },
  {
    q: "Where are you headquartered?",
    a: "Our head office is in Atyrau, Kazakhstan. We also have a European office in Novorossiysk, Russia."
  },
  {
    q: "How can I reach your team?",
    a: "Call us at +7 778 679 5570 or email info@embamunaitoo.kz. We're available Mon–Fri, 9 AM – 6 PM."
  },
];

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-2xl flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle contact widget"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>

      {/* Widget Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-card rounded-2xl shadow-2xl border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="bg-accent text-white p-4">
              <div className="font-semibold text-base">How can we help?</div>
              <div className="text-white/60 text-xs mt-0.5">Browse common questions or reach us directly</div>
            </div>

            {/* FAQ */}
            <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors flex items-center justify-between"
                  >
                    <span>{item.q}</span>
                    <span className="text-primary ml-2 flex-shrink-0">{openIndex === i ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-3 text-sm text-muted-foreground">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Contact Actions */}
            <div className="p-4 border-t border-border space-y-2">
              <Link
                to={createPageUrl('Contact')}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Send us a message
                <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
              </Link>
              <a
                href="tel:+77786795570"
                className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl bg-secondary text-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
              >
                <Phone className="w-4 h-4" />
                +7 778 679 5570
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}