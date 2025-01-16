import React from "react";
import SidebarSection from "./sidebar-section";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SettingsSectionProps {
  tempNumImages: number;
  handleNumImagesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tempStyle: string;
  setTempStyle: (value: string) => void;
  tempLayout: string;
  setTempLayout: (value: string) => void;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  tempNumImages,
  handleNumImagesChange,
  tempStyle,
  setTempStyle,
  tempLayout,
  setTempLayout,
}) => {
  return (
    <SidebarSection title="General settings" defaultOpen>
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
          value={tempNumImages}
          onChange={handleNumImagesChange}
          className="w-full bg-white border-[#E5E5E5] text-[#1E1E1E]"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-[#6E6E6E]">Style</label>
        <Select value={tempStyle} onValueChange={setTempStyle}>
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
        <Select value={tempLayout} onValueChange={setTempLayout}>
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
    </SidebarSection>
  );
};

export default SettingsSection;
