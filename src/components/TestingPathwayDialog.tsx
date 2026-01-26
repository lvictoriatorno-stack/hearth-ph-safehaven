import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Shield, MapPin, Package, Clock, X } from "lucide-react";

interface TestingPathwayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TestingPathwayDialog({ open, onOpenChange }: TestingPathwayDialogProps) {
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
              Testing Options
            </DrawerTitle>
            <DrawerDescription className="text-muted-foreground text-left text-base mt-1">
              There's no rush. Here's what's available when you're ready.
            </DrawerDescription>
          </DrawerHeader>

          <div className="space-y-5">
            {/* Privacy assurance - shown first */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-accent/30">
              <Shield className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium">Your privacy is protected</p>
                <p className="text-sm text-muted-foreground mt-1">
                  All testing options are confidential. No information is shared without your consent.
                </p>
              </div>
            </div>

            {/* Testing options - larger tap targets */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground px-1">Available options</h3>
              
              <button className="w-full flex items-start gap-4 p-5 rounded-2xl border border-border hover:bg-accent/30 active:bg-accent/50 transition-colors text-left min-h-[88px]">
                <Package className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-medium">Home test kit</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Discreet delivery to your address. Results are private.
                  </p>
                </div>
              </button>

              <button className="w-full flex items-start gap-4 p-5 rounded-2xl border border-border hover:bg-accent/30 active:bg-accent/50 transition-colors text-left min-h-[88px]">
                <MapPin className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-medium">Partner clinic pickup</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Collect a kit from a trusted clinic near you, on your schedule.
                  </p>
                </div>
              </button>

              <button className="w-full flex items-start gap-4 p-5 rounded-2xl border border-border hover:bg-accent/30 active:bg-accent/50 transition-colors text-left min-h-[88px]">
                <Clock className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-medium">In-clinic appointment</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Confidential testing with a healthcare provider when you're ready.
                  </p>
                </div>
              </button>
            </div>

            {/* Reassurance footer */}
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
