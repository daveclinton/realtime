import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface PromptInputProps {
  prompt: string;
  setPrompt: (value: string) => void;
  handleGenerate: () => void;
  isLoading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({
  prompt,
  setPrompt,
  handleGenerate,
  isLoading,
}) => {
  return (
    <div className="p-2 border-t border-[#E5E5E5] bg-white">
      <div className="flex gap-2 max-w-2xl mx-auto">
        <Input
          placeholder="Enter your prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1 bg-white border-[#E5E5E5] text-[#1E1E1E] focus:border-[#7C3AED] focus:ring-[#7C3AED]"
        />
        <Button
          className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
          onClick={handleGenerate}
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate"}
        </Button>
      </div>
    </div>
  );
};

export default PromptInput;
