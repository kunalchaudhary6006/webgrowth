import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScoreRing } from '@/components/ScoreRing';
import { SeverityBadge } from '@/components/SeverityBadge';
import { AuditScore } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface AuditCardProps {
  audit: AuditScore;
  icon: React.ReactNode;
  className?: string;
  delay?: number;
}

export const AuditCard = ({ audit, icon, className, delay = 0 }: AuditCardProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Card
      className={cn(
        'overflow-hidden transition-all duration-300 hover:shadow-lg animate-slide-up',
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              {icon}
            </div>
            <div>
              <CardTitle className="text-lg">{audit.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">{audit.description}</p>
            </div>
          </div>
          <ScoreRing score={audit.score} size="sm" />
        </div>
      </CardHeader>
      <CardContent>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3"
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {audit.issues.length} issue{audit.issues.length !== 1 ? 's' : ''} found
        </button>
        
        {isExpanded && (
          <div className="space-y-4">
            {audit.issues.map((issue, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-muted/50 border border-border/50"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className="font-medium text-foreground">{issue.title}</h4>
                  <SeverityBadge severity={issue.severity} />
                </div>
                <p className="text-sm text-muted-foreground mb-3">{issue.description}</p>
                <div className="flex items-start gap-2 p-3 rounded-md bg-accent/50">
                  <span className="text-xs font-semibold text-accent-foreground uppercase tracking-wide">Tip:</span>
                  <span className="text-sm text-accent-foreground">{issue.tip}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
