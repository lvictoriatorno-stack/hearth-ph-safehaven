import { Pill } from "lucide-react";

interface AdherenceRingProps {
  streak: number;
  percentage: number;
}

export const AdherenceRing = ({ streak, percentage }: AdherenceRingProps) => {
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="transform -rotate-90 w-48 h-48">
        <circle
          cx="96"
          cy="96"
          r="70"
          stroke="hsl(var(--muted))"
          strokeWidth="12"
          fill="none"
        />
        <circle
          cx="96"
          cy="96"
          r="70"
          stroke="hsl(var(--primary))"
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
          <Pill className="h-6 w-6 text-primary" />
        </div>
        <p className="text-3xl font-bold text-foreground">{streak}</p>
        <p className="text-sm text-muted-foreground">
          {streak === 1 ? "Day" : "Days"} Strong
        </p>
      </div>
    </div>
  );
};
