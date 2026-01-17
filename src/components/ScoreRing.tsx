import { cn } from '@/lib/utils';

interface ScoreRingProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const ScoreRing = ({ score, size = 'md', showLabel = true, className }: ScoreRingProps) => {
  const sizeConfig = {
    sm: { ring: 60, stroke: 6, text: 'text-lg' },
    md: { ring: 100, stroke: 8, text: 'text-2xl' },
    lg: { ring: 140, stroke: 10, text: 'text-4xl' },
  };

  const config = sizeConfig[size];
  const radius = (config.ring - config.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - score) / 100) * circumference;

  const getColor = () => {
    if (score >= 75) return 'text-success';
    if (score >= 50) return 'text-warning';
    return 'text-destructive';
  };

  const getTrackColor = () => {
    if (score >= 75) return 'stroke-success/20';
    if (score >= 50) return 'stroke-warning/20';
    return 'stroke-destructive/20';
  };

  const getStrokeColor = () => {
    if (score >= 75) return 'stroke-success';
    if (score >= 50) return 'stroke-warning';
    return 'stroke-destructive';
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={config.ring}
        height={config.ring}
        className="transform -rotate-90"
      >
        <circle
          cx={config.ring / 2}
          cy={config.ring / 2}
          r={radius}
          fill="none"
          strokeWidth={config.stroke}
          className={getTrackColor()}
        />
        <circle
          cx={config.ring / 2}
          cy={config.ring / 2}
          r={radius}
          fill="none"
          strokeWidth={config.stroke}
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          className={cn(getStrokeColor(), 'transition-all duration-1000 ease-out')}
        />
      </svg>
      {showLabel && (
        <div className={cn('absolute inset-0 flex items-center justify-center', config.text, 'font-bold', getColor())}>
          {score}
        </div>
      )}
    </div>
  );
};
