import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn/ui/dialog";
import { Button } from "../shadcn/ui/button";

export const ConfirmationDialog: React.FC<{
  icon: React.ReactNode;
  buttonText: string;
  actionButtonVariant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  description: string;
  onClick: () => void;
  cancelButtonText?: string;
  cancelButtonAction?: () => void;
}> = ({
  icon,
  open,
  setOpen,
  title,
  description,
  onClick,
  actionButtonVariant,
  buttonText,
  cancelButtonText,
  cancelButtonAction,
}) => {
  return (
    <Dialog onOpenChange={() => setOpen(false)} open={open}>
      <DialogContent className="max-w-60">
        <DialogHeader className="items-center gap-5">
          {icon}
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{description}</DialogDescription>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={
              (() => {
                if (cancelButtonAction) {
                  cancelButtonAction();
                }
                setOpen(false);
              }) || (() => setOpen(false))
            }
          >
            {cancelButtonText || "Cancel"}
          </Button>
          <Button
            variant={actionButtonVariant}
            onClick={() => {
              onClick();
              setOpen(false);
            }}
          >
            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
