import React, { ReactNode } from "react";
import { ScrollArea } from "../ui/scroll-area";

interface SidebarProps {
  children: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <div className="w-64 border-r border-[#E5E5E5]">
      <div className="p-4 flex items-center gap-2">
        <h1 className="text-lg font-medium">Realtime Design</h1>
      </div>
      <ScrollArea className="h-[calc(100vh-64px)]">
        <div className="p-4 space-y-6">{children}</div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
