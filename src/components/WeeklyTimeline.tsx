import { Pill, Clock, Circle } from "lucide-react";
import { format } from "date-fns";

interface DayStatus {
  date: Date;
  status: "taken" | "reminder" | "missed";
}

interface WeeklyTimelineProps {
  days: DayStatus[];
}

export const WeeklyTimeline = ({ days }: WeeklyTimelineProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "taken":
        return <Pill className="h-6 w-6 text-green-500" />;
      case "reminder":
        return <Clock className="h-6 w-6 text-yellow-500" />;
      case "missed":
        return <Circle className="h-6 w-6 text-muted-foreground opacity-30" />;
      default:
        return <Circle className="h-6 w-6 text-muted-foreground opacity-30" />;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "taken":
        return "bg-green-500/10";
      case "reminder":
        return "bg-yellow-500/10";
      case "missed":
        return "bg-muted";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-3 min-w-max">
        {days.map((day, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div
              className={`w-14 h-14 rounded-2xl ${getStatusBg(
                day.status
              )} flex items-center justify-center transition-all duration-300`}
            >
              {getStatusIcon(day.status)}
            </div>
            <div className="text-center">
              <p className="text-xs font-medium">{format(day.date, "EEE")}</p>
              <p className="text-xs text-muted-foreground">
                {format(day.date, "d")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
