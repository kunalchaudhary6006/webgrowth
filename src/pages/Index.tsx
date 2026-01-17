import { useState } from 'react';
import { LandingPage } from '@/components/LandingPage';
import { AnalyzingLoader } from '@/components/AnalyzingLoader';
import { LeadCapture } from '@/components/LeadCapture';
import { ReportPage } from '@/components/ReportPage';
import { generateMockReport } from '@/lib/mockData';
import { AuditReport, LeadInfo } from '@/lib/types';

type AppState = 'landing' | 'analyzing' | 'leadCapture' | 'report';

const Index = () => {
  const [state, setState] = useState<AppState>('landing');
  const [url, setUrl] = useState('');
  const [report, setReport] = useState<AuditReport | null>(null);
  const [lead, setLead] = useState<LeadInfo | null>(null);

  const handleAnalyze = (inputUrl: string) => {
    setUrl(inputUrl);
    setState('analyzing');
  };

  const handleAnalysisComplete = () => {
    const mockReport = generateMockReport(url);
    setReport(mockReport);
    setState('leadCapture');
  };

  const handleLeadSubmit = (leadInfo: LeadInfo) => {
    setLead(leadInfo);
    setState('report');
  };

  const handleStartOver = () => {
    setUrl('');
    setReport(null);
    setLead(null);
    setState('landing');
  };

  switch (state) {
    case 'analyzing':
      return <AnalyzingLoader onComplete={handleAnalysisComplete} />;
    case 'leadCapture':
      return report ? <LeadCapture report={report} onSubmit={handleLeadSubmit} /> : null;
    case 'report':
      return report && lead ? (
        <ReportPage report={report} lead={lead} onStartOver={handleStartOver} />
      ) : null;
    default:
      return <LandingPage onAnalyze={handleAnalyze} />;
  }
};

export default Index;
