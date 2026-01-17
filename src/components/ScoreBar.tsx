import { cn } from '@/lib/utils';

interface ScoreBarProps {
  score: number;
  label?: string;
  showScore?: boolean;
  className?: string;
}

export const ScoreBar = ({ score, label, showScore = true, className }: ScoreBarProps) => {
  const getColor = () => {
    if (score >= 75) return 'bg-success';
    if (score >= 50) return 'bg-warning';
    return 'bg-destructive';
  };

  const getTrackColor = () => {
    if (score >= 75) return 'bg-success/20';
    if (score >= 50) return 'bg-warning/20';
    return 'bg-destructive/20';
  };

  return (
    <div className={cn('w-full', className)}>
      {(label || showScore) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-foreground">{label}</span>}
          {showScore && <span className="text-sm font-semibold text-muted-foreground">{score}/100</span>}
        </div>
      )}
      <div className={cn('w-full h-2 rounded-full overflow-hidden', getTrackColor())}>
        <div
          className={cn('h-full rounded-full transition-all duration-1000 ease-out', getColor())}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};
