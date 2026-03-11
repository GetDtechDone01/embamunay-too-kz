import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, FileText, Clock, CheckCircle, AlertCircle, LogOut, Plus, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  in_review: "bg-blue-100 text-blue-800 border-blue-200",
  approved: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
};

const statusIcons = {
  pending: Clock,
  in_review: AlertCircle,
  approved: CheckCircle,
  rejected: AlertCircle,
};

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const init = async () => {
      const authed = await base44.auth.isAuthenticated();
      setIsAuthenticated(authed);
      if (authed) {
        const me = await base44.auth.me();
        setUser(me);
      } else {
        base44.auth.redirectToLogin(window.location.href);
      }
      setLoading(false);
    };
    init();
  }, []);

  const { data: requests = [], isLoading: requestsLoading } = useQuery({
    queryKey: ['my-requests'],
    queryFn: () => base44.entities.ServiceRequest.filter({ created_by: user?.email }, '-created_date'),
    enabled: !!user?.email,
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 bg-secondary/30 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-10"
        >
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Welcome, {user?.full_name || 'User'}</h1>
              <p className="text-muted-foreground text-sm">{user?.email}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to={createPageUrl('RequestService')}>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
                <Plus className="w-4 h-4 mr-2" />
                New Request
              </Button>
            </Link>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => base44.auth.logout()}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </motion.div>

        {/* Requests */}
        <Card className="rounded-2xl border border-border shadow-sm">
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              My Service Requests
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {requestsLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center py-16">
                <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground">No service requests yet</p>
                <Link to={createPageUrl('RequestService')} className="text-primary text-sm hover:underline mt-1 inline-block">
                  Submit your first request
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {requests.map((req) => {
                  const StatusIcon = statusIcons[req.status] || Clock;
                  return (
                    <div key={req.id} className="p-5 hover:bg-secondary/50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div>
                          <div className="font-medium text-foreground">
                            {req.service_type?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </div>
                          <p className="text-muted-foreground text-sm mt-1 line-clamp-1">{req.message}</p>
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date(req.created_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </div>
                        </div>
                        <Badge className={`${statusColors[req.status] || statusColors.pending} border flex items-center gap-1 w-fit`}>
                          <StatusIcon className="w-3 h-3" />
                          {(req.status || 'pending').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}