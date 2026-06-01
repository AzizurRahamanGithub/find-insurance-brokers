"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function TermsDialog({
  open,
  onOpenChange,
  control,
  setValue,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  control?: any;
  setValue?: any;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Terms and Conditions</DialogTitle>
          <DialogDescription>
            Please read these terms and conditions carefully before using Our Service.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            <strong>1. Acknowledgment</strong>
            <br />
            These are the Terms and Conditions governing the use of this Service
            and the agreement that operates between You and the Company.
          </p>
          <p>
            <strong>2. User Accounts</strong>
            <br />
            When You create an account with Us, You must provide Us information
            that is accurate, complete, and current at all times.
          </p>
          <p>
            <strong>3. Content</strong>
            <br />
            Our Service allows You to post, link, store, share and otherwise make
            available certain information, text, graphics, videos, or other
            material.
          </p>
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button
            onClick={() => {
              if (setValue) setValue("isAgree", true);
              onOpenChange(false);
            }}
          >
            I Agree
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
