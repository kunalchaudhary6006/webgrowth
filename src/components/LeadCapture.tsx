import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScoreRing } from '@/components/ScoreRing';
import { ScoreBar } from '@/components/ScoreBar';
import { LeadInfo, AuditReport } from '@/lib/types';
import { Lock, Mail, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';

interface LeadCaptureProps {
  report: AuditReport;
  onSubmit: (lead: LeadInfo) => void;
}

const leadSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().trim().email('Please enter a valid email').max(255, 'Email too long'),
  businessType: z.string().min(1, 'Please select a business type'),
});

const businessTypes = [
  { value: 'ecommerce', label: 'E-commerce / Online Store' },
  { value: 'saas', label: 'SaaS / Software' },
  { value: 'agency', label: 'Agency / Consulting' },
  { value: 'local', label: 'Local Business' },
  { value: 'startup', label: 'Startup' },
  { value: 'enterprise', label: 'Enterprise' },
  { value: 'other', label: 'Other' },
];

export const LeadCapture = ({ report, onSubmit }: LeadCaptureProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessType: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = leadSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    onSubmit(result.data as LeadInfo);
  };

  const previewScores = [
    { label: 'SEO', score: report.seo.score },
    { label: 'Speed', score: report.pageSpeed.score },
    { label: 'Mobile', score: report.mobileFriendly.score },
    { label: 'UX', score: report.uxDesign.score },
    { label: 'Conversion', score: report.conversionOptimization.score },
    { label: 'Trust', score: report.trustCredibility.score },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 animate-fade-in">
        {/* Preview Panel */}
        <div className="order-2 md:order-1">
          <Card className="h-full relative overflow-hidden">
            <div className={showPreview ? 'blur-sm pointer-events-none' : ''}>
              <CardHeader>
                <CardTitle className="text-lg">Audit Results Preview</CardTitle>
                <CardDescription className="truncate">{report.url}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-center">
                  <ScoreRing score={report.overallScore} size="lg" />
                </div>
                <div className="space-y-4">
                  {previewScores.map((item) => (
                    <ScoreBar key={item.label} label={item.label} score={item.score} />
                  ))}
                </div>
              </CardContent>
            </div>
            
            {/* Blur Overlay */}
            {showPreview && (
              <div className="absolute inset-0 flex items-center justify-center bg-card/60 backdrop-blur-sm">
                <div className="text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Full Report Locked</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Enter your details to unlock the complete analysis
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    {showPreview ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
                    {showPreview ? 'Peek Preview' : 'Hide Preview'}
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Lead Form */}
        <div className="order-1 md:order-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Unlock Your Full Report</CardTitle>
              <CardDescription>
                We found <span className="font-semibold text-destructive">{
                  report.seo.issues.length + 
                  report.pageSpeed.issues.length + 
                  report.mobileFriendly.issues.length +
                  report.uxDesign.issues.length +
                  report.conversionOptimization.issues.length +
                  report.trustCredibility.issues.length
                } issues</span> on your website. Get the full breakdown with actionable fixes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Work Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select
                    value={formData.businessType}
                    onValueChange={(value) => setFormData({ ...formData, businessType: value })}
                  >
                    <SelectTrigger className={errors.businessType ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select your business type" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {businessTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.businessType && (
                    <p className="text-sm text-destructive">{errors.businessType}</p>
                  )}
                </div>

                <Button type="submit" className="w-full h-12 text-lg" size="lg">
                  Get My Full Report
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  🔒 We respect your privacy. No spam, ever. Unsubscribe anytime.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
