import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Hand, ChevronRight } from "lucide-react";
import { TestingPathwayDialog } from "./TestingPathwayDialog";
import { TreatmentPathwayDialog } from "./TreatmentPathwayDialog";

export function CarePathwayCard() {
  const [testingOpen, setTestingOpen] = useState(false);
  const [treatmentOpen, setTreatmentOpen] = useState(false);

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Hand className="h-5 w-5 text-primary" aria-hidden="true" />
          <h2 className="font-semibold">When you're ready</h2>
        </div>
        
        <p className="text-sm text-muted-foreground mb-5">
          Some people need time before seeking care. You don't have to decide anything today.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => setTestingOpen(true)}
            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-accent/30 hover:bg-accent/50 transition-all text-left group"
            aria-label="Learn about testing options"
          >
            <div className="flex-1">
              <span className="font-medium block text-sm">If you're thinking about testing</span>
              <span className="text-xs text-muted-foreground">
                Private options, no commitment
              </span>
            </div>
            <ChevronRight 
              className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" 
              aria-hidden="true" 
            />
          </button>

          <button
            onClick={() => setTreatmentOpen(true)}
            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-accent/30 hover:bg-accent/50 transition-all text-left group"
            aria-label="Learn about treatment support options"
          >
            <div className="flex-1">
              <span className="font-medium block text-sm">If you decide you want treatment support</span>
              <span className="text-xs text-muted-foreground">
                Confidential care, on your terms
              </span>
            </div>
            <ChevronRight 
              className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" 
              aria-hidden="true" 
            />
          </button>
        </div>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          Nothing here triggers notifications or follow-ups.
        </p>
      </Card>

      <TestingPathwayDialog open={testingOpen} onOpenChange={setTestingOpen} />
      <TreatmentPathwayDialog open={treatmentOpen} onOpenChange={setTreatmentOpen} />
    </>
  );
}
