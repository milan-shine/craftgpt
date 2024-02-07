import React from "react";
import { Button } from "../shadcn/ui/button";
import { LucideIcon } from "lucide-react";

interface ActionButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  Icon: LucideIcon;
}

const ActionButton: React.FC<ActionButtonProps> = ({ Icon, onClick, ...props }) => {
  return (
    <Button {...props} onClick={onClick} className="bg-transparent p-1 text-foreground hover:bg-transparent">
      <Icon />
    </Button>
  );
};

export default ActionButton;
