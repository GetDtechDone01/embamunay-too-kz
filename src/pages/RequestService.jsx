import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { base44 } from '@/api/base44Client';
import { Send, CheckCircle, Loader2, LogIn } from 'lucide-react';
import Logo from '../components/common/Logo';
import { toast } from 'sonner';

const serviceTypes = [
  { value: "drilling", label: "Drilling Services" },
  { value: "well_services", label: "Well Services" },
  { value: "refinery", label: "Refinery Operations" },
  { value: "pipeline", label: "Pipeline Construction" },
  { value: "consultation", label: "Technical Consultation" },
  { value: "logistics", label: "Logistics & Supply Chain" },
  { value: "other", label: "Other" },
];

const regions = [
  { value: "western_asia", label: "Western Asia (Kazakhstan, Uzbekistan, Turkmenistan)" },
  { value: "europe", label: "Europe (Germany, Poland, Romania)" },
  { value: "south_america", label: "South America (Brazil, Argentina, Colombia)" },
];

const budgetRanges = [
  { value: "under_100k", label: "Under $100,000" },
  { value: "100k_500k", label: "$100,000 - $500,000" },
  { value: "500k_1m", label: "$500,000 - $1,000,000" },
  { value: "1m_5m", label: "$1,000,000 - $5,000,000" },
  { value: "above_5m", label: "Above $5,000,000" },
];

export default function RequestService() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    company_name: '',
    service_type: '',
    region: '',
    budget_range: '',
    message: '',
  });

  useEffect(() => {
    const checkAuth = async () => {
      const authed = await base44.auth.isAuthenticated();
      setIsAuthenticated(authed);
      if (authed) {
        const me = await base44.auth.me();
        setUser(me);
        setForm(prev => ({
          ...prev,
          full_name: me.full_name || '',
          email: me.email || '',
        }));
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await base44.entities.ServiceRequest.create(form);
    toast.success('Service request submitted successfully! Our team will contact you soon.');
    setSubmitted(true);
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-secondary/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card p-10 rounded-2xl border border-border shadow-xl max-w-md w-full mx-6 text-center"
        >
          <div className="flex justify-center mb-6">
            <Logo size="large" />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">Sign In Required</h2>
          <p className="text-muted-foreground mb-8">
            Please sign in or create an account to submit a service request. This helps us better serve you.
          </p>
          <Button
            onClick={() => base44.auth.redirectToLogin(window.location.href)}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-full text-base"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Sign In / Register
          </Button>
        </motion.div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-secondary/30">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card p-10 rounded-2xl border border-border shadow-xl max-w-md w-full mx-6 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">Request Submitted!</h2>
          <p className="text-muted-foreground">
            Thank you for your interest. Our team will review your request and contact you within 24-48 hours.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[280px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80"
            alt="Request service"
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
              <span className="text-primary font-medium tracking-widest text-sm uppercase">Get Started</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
              Request a <span className="text-primary">Service</span>
            </h1>
            <p className="text-white/60 text-lg mt-4 max-w-xl">
              Tell us about your project and our team will prepare a customized proposal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
              <Logo />
              <div className="text-sm text-muted-foreground">Service Request Form</div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input
                    value={form.full_name}
                    onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                    placeholder="John Doe"
                    required
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@company.com"
                    required
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 234 567 8900"
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input
                    value={form.company_name}
                    onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                    placeholder="Your Company"
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label>Service Type *</Label>
                  <Select value={form.service_type} onValueChange={(v) => setForm({ ...form, service_type: v })}>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((s) => (
                        <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Preferred Region</Label>
                  <Select value={form.region} onValueChange={(v) => setForm({ ...form, region: v })}>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select a region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((r) => (
                        <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Budget Range</Label>
                <Select value={form.budget_range} onValueChange={(v) => setForm({ ...form, budget_range: v })}>
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((b) => (
                      <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Project Details *</Label>
                <Textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe your project requirements, timeline, and any specific needs..."
                  required
                  className="min-h-[150px] rounded-xl"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-13 rounded-full text-base"
                disabled={submitting}
              >
                {submitting ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  <Send className="w-5 h-5 mr-2" />
                )}
                Submit Request
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}