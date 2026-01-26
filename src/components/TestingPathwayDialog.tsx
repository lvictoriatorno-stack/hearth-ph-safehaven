import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shield, MapPin, Package, Clock } from "lucide-react";

interface TestingPathwayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TestingPathwayDialog({ open, onOpenChange }: TestingPathwayDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-4 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary">
            Testing Options
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            There's no rush. Here's what's available when you're ready.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Privacy assurance */}
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-accent/30">
            <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="font-medium text-sm">Your privacy is protected</p>
              <p className="text-xs text-muted-foreground mt-1">
                All testing options are confidential. No information is shared without your consent.
              </p>
            </div>
          </div>

          {/* Testing options */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Available options</h3>
            
            <div className="flex items-start gap-3 p-4 rounded-2xl border border-border hover:bg-accent/20 transition-colors">
              <Package className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium text-sm">Home test kit</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Discreet delivery to your address. Results are private.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl border border-border hover:bg-accent/20 transition-colors">
              <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium text-sm">Partner clinic pickup</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Collect a kit from a trusted clinic near you, on your schedule.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl border border-border hover:bg-accent/20 transition-colors">
              <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium text-sm">In-clinic appointment</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Confidential testing with a healthcare provider when you're ready.
                </p>
              </div>
            </div>
          </div>

          {/* Reassurance footer */}
          <p className="text-xs text-center text-muted-foreground pt-2">
            You can close this anytime. Nothing is saved or tracked.
          </p>
        </div>

        <div className="mt-4">
          <Button 
            variant="soft" 
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
