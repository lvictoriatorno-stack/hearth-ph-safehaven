import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Shield, Heart, Users, Lock, X } from "lucide-react";

interface TreatmentPathwayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TreatmentPathwayDialog({ open, onOpenChange }: TreatmentPathwayDialogProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[92vh] rounded-t-3xl">
        {/* Close X button - always accessible */}
        <DrawerClose className="absolute right-4 top-4 p-2 rounded-full hover:bg-accent/50 transition-colors z-10">
          <X className="h-5 w-5 text-muted-foreground" />
          <span className="sr-only">Close</span>
        </DrawerClose>

        {/* Scrollable content area */}
        <div className="overflow-y-auto flex-1 px-6 pb-8">
          <DrawerHeader className="pt-2 pb-4 px-0">
            <DrawerTitle className="text-xl font-semibold text-primary text-left">
              Treatment Support
            </DrawerTitle>
            <DrawerDescription className="text-muted-foreground text-left text-base mt-1">
              Care is available on your terms, whenever you decide.
            </DrawerDescription>
          </DrawerHeader>

          <div className="space-y-5">
            {/* Privacy assurance - shown first */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-accent/30">
              <Lock className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium">Confidential and discreet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Your health decisions remain private. Partner clinics follow strict confidentiality.
                </p>
              </div>
            </div>

            {/* Support options - larger tap targets */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground px-1">What's available</h3>
              
              <button className="w-full flex items-start gap-4 p-5 rounded-2xl border border-border hover:bg-accent/30 active:bg-accent/50 transition-colors text-left min-h-[88px]">
                <Heart className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-medium">Starting treatment</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Connect with partner clinics that provide compassionate, judgment-free care when you're ready.
                  </p>
                </div>
              </button>

              <button className="w-full flex items-start gap-4 p-5 rounded-2xl border border-border hover:bg-accent/30 active:bg-accent/50 transition-colors text-left min-h-[88px]">
                <Shield className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-medium">Continuing care</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Support for maintaining or resuming treatment, with privacy and flexibility.
                  </p>
                </div>
              </button>

              <button className="w-full flex items-start gap-4 p-5 rounded-2xl border border-border hover:bg-accent/30 active:bg-accent/50 transition-colors text-left min-h-[88px]">
                <Users className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-medium">Peer navigation</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Optional guidance from trained peers who understand the journey.
                  </p>
                </div>
              </button>
            </div>

            {/* Reassurance - prominently placed above close */}
            <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10">
              <p className="text-center">
                <span className="font-medium block mb-1">There's no pressure.</span>
                <span className="text-sm text-muted-foreground">
                  Treatment is most effective when you feel ready. Your timing matters.
                </span>
              </p>
            </div>

            {/* Footer reassurance */}
            <p className="text-sm text-center text-muted-foreground pt-2 pb-2">
              You can close this anytime. Nothing is saved or tracked.
            </p>

            {/* Close button - always reachable at bottom */}
            <Button 
              variant="soft" 
              className="w-full h-12 text-base"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
