import React from "react";
import { Input } from "../ui/input";
import SidebarSection from "./sidebar-section";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface TextOverlaySectionProps {
  textOverlay: string;
  setTextOverlay: (value: string) => void;
  textStyle: string;
  setTextStyle: (value: string) => void;
}

const TextOverlaySection: React.FC<TextOverlaySectionProps> = ({
  textOverlay,
  setTextOverlay,
  textStyle,
  setTextStyle,
}) => {
  return (
    <SidebarSection title="Text Overlay">
      <div className="space-y-2">
        <label className="text-sm text-[#6E6E6E]">Text</label>
        <Input
          type="text"
          placeholder="Enter text for overlay"
          value={textOverlay}
          onChange={(e) => setTextOverlay(e.target.value)}
          className="w-full bg-white border-[#E5E5E5] text-[#1E1E1E]"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-[#6E6E6E]">Text Style</label>
        <Select value={textStyle} onValueChange={setTextStyle}>
          <SelectTrigger className="w-full bg-white border-[#E5E5E5]">
            <SelectValue placeholder="Select text style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bold">Bold</SelectItem>
            <SelectItem value="italic">Italic</SelectItem>
            <SelectItem value="underline">Underline</SelectItem>
            <SelectItem value="shadow">Shadow</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </SidebarSection>
  );
};

export default TextOverlaySection;
