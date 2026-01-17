import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Search,
  Zap,
  Smartphone,
  Layout,
  Target,
  Shield,
  ArrowRight,
  CheckCircle,
  BarChart3,
} from 'lucide-react';

interface LandingPageProps {
  onAnalyze: (url: string) => void;
}

const features = [
  { icon: Search, title: 'SEO Analysis', description: 'Find hidden SEO issues hurting your rankings' },
  { icon: Zap, title: 'Page Speed', description: 'Identify what\'s slowing your site down' },
  { icon: Smartphone, title: 'Mobile Check', description: 'See how your site performs on mobile' },
  { icon: Layout, title: 'UX & Design', description: 'Discover usability problems' },
  { icon: Target, title: 'Conversion', description: 'Learn why visitors aren\'t converting' },
  { icon: Shield, title: 'Trust Signals', description: 'Build credibility with visitors' },
];

const stats = [
  { value: '10,000+', label: 'Websites Analyzed' },
  { value: '89%', label: 'Find Critical Issues' },
  { value: '< 60s', label: 'Analysis Time' },
];

export const LandingPage = ({ onAnalyze }: LandingPageProps) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!url.trim()) {
      setError('Please enter a website URL');
      return;
    }
    
    // Basic URL validation
    let processedUrl = url.trim();
    if (!processedUrl.startsWith('http://') && !processedUrl.startsWith('https://')) {
      processedUrl = 'https://' + processedUrl;
    }
    
    try {
      new URL(processedUrl);
      onAnalyze(processedUrl);
    } catch {
      setError('Please enter a valid URL (e.g., example.com)');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">WebGrowth</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <Button variant="outline" size="sm">Sign In</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6 animate-fade-in">
              <CheckCircle className="w-4 h-4" />
              Free Website Audit – No Credit Card Required
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
              Find Out Why Your Website{' '}
              <span className="text-primary">Isn't Converting</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
              Get a comprehensive analysis of your website's SEO, speed, mobile experience, 
              and conversion potential – with actionable tips to fix every issue.
            </p>

            {/* URL Input Form */}
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter your website URL (e.g., example.com)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="pl-12 h-14 text-lg bg-card border-border"
                  />
                </div>
                <Button type="submit" size="lg" className="h-14 px-8 text-lg">
                  Analyze Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              {error && (
                <p className="text-destructive text-sm mt-2 text-left">{error}</p>
              )}
            </form>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12 animate-fade-in" style={{ animationDelay: '400ms' }}>
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Complete Website Analysis
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive audit covers every aspect that affects your website's 
              performance and conversion rate.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={feature.title} className="border-border/50 hover:shadow-lg transition-shadow animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              Get your personalized report in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '1', title: 'Enter Your URL', description: 'Paste your website address and click analyze' },
              { step: '2', title: 'We Scan Everything', description: 'Our system checks 50+ performance factors' },
              { step: '3', title: 'Get Your Report', description: 'Receive actionable insights to improve' },
            ].map((item, index) => (
              <div key={item.step} className="text-center animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Improve Your Website?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Join thousands of business owners who've discovered exactly what's holding 
            their website back.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="h-14 px-8 text-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Start Free Analysis
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2024 WebGrowth Analyzer. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
