import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScoreRing } from '@/components/ScoreRing';
import { AuditCard } from '@/components/AuditCard';
import { AuditReport, LeadInfo } from '@/lib/types';
import {
  Search,
  Zap,
  Smartphone,
  Layout,
  Target,
  Shield,
  Download,
  Share2,
  RefreshCw,
  BarChart3,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

interface ReportPageProps {
  report: AuditReport;
  lead: LeadInfo;
  onStartOver: () => void;
}

export const ReportPage = ({ report, lead, onStartOver }: ReportPageProps) => {
  const allIssues = [
    ...report.seo.issues,
    ...report.pageSpeed.issues,
    ...report.mobileFriendly.issues,
    ...report.uxDesign.issues,
    ...report.conversionOptimization.issues,
    ...report.trustCredibility.issues,
  ];

  const criticalCount = allIssues.filter((i) => i.severity === 'critical').length;
  const importantCount = allIssues.filter((i) => i.severity === 'important').length;

  const auditSections = [
    { key: 'seo', data: report.seo, icon: <Search className="w-5 h-5" /> },
    { key: 'pageSpeed', data: report.pageSpeed, icon: <Zap className="w-5 h-5" /> },
    { key: 'mobileFriendly', data: report.mobileFriendly, icon: <Smartphone className="w-5 h-5" /> },
    { key: 'uxDesign', data: report.uxDesign, icon: <Layout className="w-5 h-5" /> },
    { key: 'conversionOptimization', data: report.conversionOptimization, icon: <Target className="w-5 h-5" /> },
    { key: 'trustCredibility', data: report.trustCredibility, icon: <Shield className="w-5 h-5" /> },
  ];

  const getTopPriorities = () => {
    const critical = allIssues.filter((i) => i.severity === 'critical').slice(0, 2);
    const important = allIssues.filter((i) => i.severity === 'important').slice(0, 3 - critical.length);
    return [...critical, ...important].slice(0, 3);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">WebGrowth</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button size="sm" onClick={onStartOver}>
              <RefreshCw className="w-4 h-4 mr-2" />
              New Audit
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground mb-1">
            Hi {lead.name.split(' ')[0]}, here's your website analysis
          </h1>
          <p className="text-muted-foreground">
            Report generated for{' '}
            <span className="font-medium text-foreground">{report.url}</span>
            {' '}on {report.analyzedAt.toLocaleDateString()}
          </p>
        </div>

        {/* Overview Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Overall Score Card */}
          <Card className="lg:col-span-1 animate-slide-up">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
              <ScoreRing score={report.overallScore} size="lg" />
              <h2 className="text-xl font-semibold text-foreground mt-4 mb-2">Overall Score</h2>
              <p className="text-sm text-muted-foreground">
                {report.overallScore >= 75
                  ? 'Good! A few improvements needed.'
                  : report.overallScore >= 50
                  ? 'Needs work. Follow our recommendations.'
                  : 'Critical issues found. Act now!'}
              </p>
            </CardContent>
          </Card>

          {/* Issues Summary */}
          <Card className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Issues Found</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/10">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <span className="font-medium text-foreground">Critical Issues</span>
                </div>
                <span className="text-2xl font-bold text-destructive">{criticalCount}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-warning/10">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  <span className="font-medium text-foreground">Important Issues</span>
                </div>
                <span className="text-2xl font-bold text-warning">{importantCount}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium text-foreground">Suggestions</span>
                </div>
                <span className="text-2xl font-bold text-primary">
                  {allIssues.length - criticalCount - importantCount}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Top Priorities */}
          <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Top Priorities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getTopPriorities().map((issue, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{issue.title}</p>
                      <p className="text-xs text-muted-foreground">{issue.description.slice(0, 60)}...</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Audit Sections */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-6">Detailed Analysis</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {auditSections.map((section, index) => (
              <AuditCard
                key={section.key}
                audit={section.data}
                icon={section.icon}
                delay={index * 100}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-primary text-primary-foreground animate-fade-in">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need Help Fixing These Issues?</h2>
            <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
              Our team of experts can help you implement these improvements and boost 
              your website's performance. Book a free consultation today.
            </p>
            <Button variant="secondary" size="lg" className="h-12 px-8">
              Book Free Consultation
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2024 WebGrowth Analyzer. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
