import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';
import ReactMarkdown from 'react-markdown';

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Welcome to EMBAMUNAI TOO KZ! I'm your AI assistant. I can help you with questions about our oil & gas services, pricing, availability, and connect you with the right department. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    const conversationHistory = messages.map(m => `${m.role}: ${m.content}`).join('\n');

    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `You are the AI customer support assistant for EMBAMUNAI TOO KZ, a leading oil and gas company.

Company Information:
- Name: EMBAMUNAI TOO KZ
- Headquarters: Astana, Kazakhstan
- Operations: Western Asia (Kazakhstan, Uzbekistan, Turkmenistan), Europe (Germany, Poland, Romania), South America (Brazil, Argentina, Colombia)
- Services: Drilling, Well Services, Refinery Operations, Pipeline Construction & Maintenance, Logistics, Technical Consultation
- Annual Drilling Volume: 8,500,000+ meters
- Total Investments: Over $2.5 Billion
- Employees: 12,000+
- Certifications: ISO 9001, ISO 45001, ISO 14001
- Phone: +7 717 2 55 00 00
- Email: info@embamunai.kz

Previous conversation:
${conversationHistory}

User's new message: ${userMessage}

Respond helpfully and professionally. If the user wants to request a service, guide them to submit a Service Request form on the website. Keep responses concise and friendly.`,
    });

    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setLoading(false);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-2xl flex items-center justify-center hover:scale-105 transition-transform"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] h-[500px] bg-card rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-accent text-accent-foreground p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-sm">EMBAMUNAI AI Assistant</div>
                <div className="text-xs text-white/50 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  Online
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-secondary text-secondary-foreground rounded-bl-md'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <ReactMarkdown className="prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:my-1 [&_a]:text-primary">
                        {msg.content}
                      </ReactMarkdown>
                    ) : (
                      <p>{msg.content}</p>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3">
                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-full bg-secondary border-0 h-10 text-sm"
                  disabled={loading}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={loading || !input.trim()}
                  className="rounded-full w-10 h-10 bg-primary hover:bg-primary/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}