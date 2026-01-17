import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnalyzingLoaderProps {
  onComplete: () => void;
}

const scanSteps = [
  { label: 'Connecting to website...', duration: 800 },
  { label: 'Analyzing SEO structure...', duration: 1000 },
  { label: 'Measuring page speed...', duration: 900 },
  { label: 'Testing mobile responsiveness...', duration: 800 },
  { label: 'Evaluating UX & design...', duration: 900 },
  { label: 'Checking conversion elements...', duration: 800 },
  { label: 'Assessing trust signals...', duration: 700 },
  { label: 'Generating report...', duration: 600 },
];

export const AnalyzingLoader = ({ onComplete }: AnalyzingLoaderProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentStep >= scanSteps.length) {
      onComplete();
      return;
    }

    const step = scanSteps[currentStep];
    const progressIncrement = 100 / scanSteps.length;
    
    const timer = setTimeout(() => {
      setProgress((currentStep + 1) * progressIncrement);
      setCurrentStep(currentStep + 1);
    }, step.duration);

    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center">
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
          <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full border-4 border-primary/20 animate-pulse-ring" />
        </div>
        
        <h2 className="text-2xl font-bold text-foreground mb-2">Analyzing Your Website</h2>
        <p className="text-muted-foreground mb-8">
          {currentStep < scanSteps.length ? scanSteps[currentStep].label : 'Almost done...'}
        </p>
        
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-2">
          {scanSteps.map((step, index) => (
            <div
              key={index}
              className={cn(
                'w-2 h-2 rounded-full transition-colors duration-300',
                index <= currentStep ? 'bg-primary' : 'bg-muted'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
