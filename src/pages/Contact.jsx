import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import ProjectsMap from '../components/contact/ProjectsMap';
import { base44 } from '@/api/base44Client';

const offices = [
  {
    city: "Atyrau, Kazakhstan",
    type: "Head Office",
    address: "060002, ATYRAU REGION, ATYRAU CITY, ST. KAYIRGALI SMAGULOV, 4A Republic of Kazakhstan",
    phone: "+7 778 679 5570, +7 999 802 9310",
    email: "info@embamunaitoo.kz",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM"
  },
  {
    city: "Novorossiysk, Russia",
    type: "European Office",
    address: "353901, 14, Portovaya ST, NOVOROSSIYSK, Krasnodar Region, Russia Federation",
    phone: "+7 778 679 5570, +7 999 802 9310",
    email: "info@embamunaitoo.kz",
    hours: "Mon-Fri: 8:00 AM - 5:00 PM CET"
  }
];

const budgetOptions = [
  "$10,000 - $50,000",
  "$50,000 - $100,000",
  "$100,000 - $500,000",
  "$500,000 - $1,000,000",
  "$1,000,000 - $5,000,000",
  "$5,000,000 - $10,000,000",
  "$10,000,000 - $50,000,000",
  "$50,000,000 - $100,000,000",
  "$100,000,000 - $500,000,000"
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    companyName: '',
    phone: '',
    budget: '',
    subject: '', 
    message: '',
    attachment: null
  });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setFormData({ ...formData, attachment: { name: file.name, url: file_url } });
      toast.success('File uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Prepare email content
      const emailBody = `
New Contact Form Submission

Contact Details:
- Name: ${formData.name}
- Email: ${formData.email}
- Company: ${formData.companyName}
- Phone: ${formData.phone}
- Budget: ${formData.budget}

Subject: ${formData.subject}

Message:
${formData.message}

${formData.attachment ? `\nAttachment: ${formData.attachment.url}` : ''}
      `;

      // Send to info@embamunaitoo.kz
      await base44.integrations.Core.SendEmail({
        from_name: "EMBAMUNAY TOO KZ Website",
        to: "info@embamunaitoo.kz",
        subject: `New Contact: ${formData.subject}`,
        body: emailBody
      });

      // Send to salesdept@embamunaitoo.kz
      await base44.integrations.Core.SendEmail({
        from_name: "EMBAMUNAY TOO KZ Website",
        to: "salesdept@embamunaitoo.kz",
        subject: `New Contact: ${formData.subject}`,
        body: emailBody
      });

      toast.success('Message sent successfully! We will get back to you soon.');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setFormData({ 
        name: '', 
        email: '', 
        companyName: '',
        phone: '',
        budget: '',
        subject: '', 
        message: '',
        attachment: null
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[320px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://img2.chinadaily.com.cn/images/202109/23/614c09e2a310cdd3d80ee85f.jpeg"
            alt="Contact"
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
              <span className="text-primary font-medium tracking-widest text-sm uppercase">Get in Touch</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-display font-bold text-white leading-tight">
              Contact <span className="text-primary">Us</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 mb-20">
            {offices.map((office, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card p-6 rounded-2xl border border-border"
              >
                <div className="text-primary text-sm font-medium mb-1">{office.type}</div>
                <h3 className="text-xl font-bold text-foreground mb-4">{office.city}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{office.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{office.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{office.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{office.hours}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-display font-bold text-foreground">
                Send Us a <span className="text-primary">Message</span>
              </h2>
              <p className="text-muted-foreground mt-2">We'll respond within 24 hours</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    required
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    required
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Your Company"
                    required
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 234 567 8900"
                    required
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Budget</Label>
                <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })} required>
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="Select your budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetOptions.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Subject</Label>
                <Input
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="How can we help?"
                  required
                  className="h-12 rounded-xl"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your project..."
                  required
                  className="min-h-[150px] rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label>Attachment (Optional)</Label>
                <div className="relative">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={uploading}
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center h-12 px-4 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    <Upload className="w-5 h-5 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {uploading ? 'Uploading...' : formData.attachment ? formData.attachment.name : 'Click to upload file'}
                    </span>
                  </label>
                  {formData.attachment && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attachment: null })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-full text-base"
                disabled={submitted}
              >
                {submitted ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <ProjectsMap />
    </div>
  );
}