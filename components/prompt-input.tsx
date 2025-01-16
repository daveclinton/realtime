import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Sparkles, Send } from "lucide-react";

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
    <div className="p-6 bg-gradient-to-br from-teal-100 to-cyan-100">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center space-x-2 mb-2">
          <Sparkles className="w-5 h-5 text-teal-600" />
          <h2 className="text-lg font-semibold text-teal-800">
            Create Your Vision
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-grow">
            <Input
              placeholder="Describe the image you want to generate..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full py-3 px-4 text-base bg-white border-2 border-teal-200 text-teal-900 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-200 transition-all duration-300 ease-in-out"
            />
          </div>
          <Button
            className="w-full sm:w-auto px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white text-base font-medium rounded-lg shadow-md transition-all duration-300 ease-in-out flex items-center justify-center gap-2 group"
            onClick={handleGenerate}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                Generating...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                Generate
              </>
            )}
          </Button>
        </div>
        <p className="text-sm text-teal-600 text-center italic">
          &ldquo;Imagination is the beginning of creation. You imagine what you
          desire, you will what you imagine, and at last, you create what you
          will.&quot; - George Bernard Shaw
        </p>
      </div>
    </div>
  );
};

export default PromptInput;
