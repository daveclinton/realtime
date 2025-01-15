import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ChevronDown, ChevronLeft, Copy } from "lucide-react";

interface SidebarProps {
  numImages: number;
  setNumImages: (value: number) => void;
  style: string;
  setStyle: (value: string) => void;
  layout: string;
  setLayout: (value: string) => void;
}

const Sidebar = ({
  numImages,
  setNumImages,
  style,
  setStyle,
  layout,
  setLayout,
}: SidebarProps) => (
  <div className="w-80 border-r border-[#E5E5E5]">
    <div className="p-4 flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="text-[#1E1E1E] hover:bg-[#F5F5F5]"
        aria-label="Back"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <h1 className="text-lg font-medium">Image Generation</h1>
      <Button
        variant="ghost"
        size="icon"
        className="ml-auto text-[#1E1E1E] hover:bg-[#F5F5F5]"
        aria-label="Copy"
      >
        <Copy className="h-4 w-4" />
      </Button>
    </div>
    <ScrollArea className="h-[calc(100vh-64px)]">
      <div className="p-4 space-y-6">
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center gap-2 w-full text-[#1E1E1E]">
            <ChevronDown className="h-4 w-4" />
            <span>General settings</span>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-[#6E6E6E]">Models</label>
              <Button
                variant="outline"
                className="w-full justify-between bg-white text-[#1E1E1E] hover:bg-[#F5F5F5] border-[#E5E5E5]"
              >
                🎨 Flux
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-[#6E6E6E]">Number of Images</label>
              <Input
                type="number"
                min={1}
                max={8}
                value={numImages}
                onChange={(e) => setNumImages(parseInt(e.target.value, 10))}
                className="w-full bg-white border-[#E5E5E5] text-[#1E1E1E]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-[#6E6E6E]">Style</label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger className="w-full bg-white border-[#E5E5E5]">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="illustration">Illustration</SelectItem>
                  <SelectItem value="dark-humor">Dark Humor</SelectItem>
                  <SelectItem value="scifi">Sci-Fi</SelectItem>
                  <SelectItem value="art">Art</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-[#6E6E6E]">Layout</label>
              <Select value={layout} onValueChange={setLayout}>
                <SelectTrigger className="w-full bg-white border-[#E5E5E5]">
                  <SelectValue placeholder="Select layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="landscape">Landscape</SelectItem>
                  <SelectItem value="portrait">Portrait</SelectItem>
                  <SelectItem value="square">Square</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible>
          <CollapsibleTrigger className="flex items-center gap-2 w-full text-[#1E1E1E]">
            <ChevronDown className="h-4 w-4" />
            <span>Styles</span>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-4">
            {/* Style options would go here */}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </ScrollArea>
  </div>
);

export default Sidebar;
