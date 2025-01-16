import React, { ReactNode } from "react";
import { ScrollArea } from "./ui/scroll-area";

interface MainContentProps {
  children: ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto">
      <div className="p-4 flex items-center justify-end gap-2 border-b border-[#E5E5E5]"></div>
      <ScrollArea className="flex-1">{children}</ScrollArea>
    </div>
  );
};

export default MainContent;
