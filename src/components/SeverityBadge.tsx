import { cn } from '@/lib/utils';
import { AlertTriangle, AlertCircle, Lightbulb } from 'lucide-react';

interface SeverityBadgeProps {
  severity: 'critical' | 'important' | 'suggested';
  className?: string;
}

export const SeverityBadge = ({ severity, className }: SeverityBadgeProps) => {
  const config = {
    critical: {
      icon: AlertTriangle,
      label: 'Critical',
      className: 'bg-destructive/10 text-destructive border-destructive/20',
    },
    important: {
      icon: AlertCircle,
      label: 'Important',
      className: 'bg-warning/10 text-warning border-warning/20',
    },
    suggested: {
      icon: Lightbulb,
      label: 'Suggested',
      className: 'bg-primary/10 text-primary border-primary/20',
    },
  };

  const { icon: Icon, label, className: badgeClassName } = config[severity];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border',
        badgeClassName,
        className
      )}
    >
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
};
