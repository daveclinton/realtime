import React from "react";
import { Palette } from "lucide-react";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  return (
    <div className="relative flex items-center">
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="absolute opacity-0 cursor-pointer w-8 h-8"
      />
      <Palette className="text-gray-600 hover:text-blue-500 cursor-pointer" />
    </div>
  );
};

export default ColorPicker;
