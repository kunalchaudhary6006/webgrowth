export interface AuditScore {
  score: number;
  status: 'critical' | 'warning' | 'good';
  title: string;
  description: string;
  issues: AuditIssue[];
}

export interface AuditIssue {
  severity: 'critical' | 'important' | 'suggested';
  title: string;
  description: string;
  tip: string;
}

export interface AuditReport {
  url: string;
  overallScore: number;
  analyzedAt: Date;
  seo: AuditScore;
  pageSpeed: AuditScore;
  mobileFriendly: AuditScore;
  uxDesign: AuditScore;
  conversionOptimization: AuditScore;
  trustCredibility: AuditScore;
}

export interface LeadInfo {
  name: string;
  email: string;
  businessType: string;
}
