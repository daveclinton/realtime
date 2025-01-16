import React, { ReactNode } from "react";

import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

interface SidebarSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  title,
  defaultOpen = false,
  children,
}) => {
  return (
    <Collapsible defaultOpen={defaultOpen}>
      <CollapsibleTrigger className="flex items-center gap-2 w-full text-[#1E1E1E]">
        <ChevronDown className="h-4 w-4" />
        <span>{title}</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2 space-y-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SidebarSection;
