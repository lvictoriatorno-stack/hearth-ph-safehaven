import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shield, Heart, Users, Lock } from "lucide-react";

interface TreatmentPathwayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TreatmentPathwayDialog({ open, onOpenChange }: TreatmentPathwayDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-4 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary">
            Treatment Support
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Care is available on your terms, whenever you decide.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Privacy assurance */}
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-accent/30">
            <Lock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="font-medium text-sm">Confidential and discreet</p>
              <p className="text-xs text-muted-foreground mt-1">
                Your health decisions remain private. Partner clinics follow strict confidentiality.
              </p>
            </div>
          </div>

          {/* Support options */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">What's available</h3>
            
            <div className="flex items-start gap-3 p-4 rounded-2xl border border-border hover:bg-accent/20 transition-colors">
              <Heart className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium text-sm">Starting treatment</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Connect with partner clinics that provide compassionate, judgment-free care when you're ready.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl border border-border hover:bg-accent/20 transition-colors">
              <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium text-sm">Continuing care</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Support for maintaining or resuming treatment, with privacy and flexibility.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl border border-border hover:bg-accent/20 transition-colors">
              <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium text-sm">Peer navigation</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Optional guidance from trained peers who understand the journey.
                </p>
              </div>
            </div>
          </div>

          {/* Reassurance */}
          <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
            <p className="text-sm text-center">
              <span className="font-medium">There's no pressure.</span>{" "}
              <span className="text-muted-foreground">
                Treatment is most effective when you feel ready. Your timing matters.
              </span>
            </p>
          </div>

          {/* Footer */}
          <p className="text-xs text-center text-muted-foreground">
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
