import React from "react";
import { X, Lightbulb } from "lucide-react";
import { useCanvas } from "@/contexts/CanvasContext";

interface AiDesignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AiDesignModal: React.FC<AiDesignModalProps> = ({ isOpen, onClose }) => {
  const { aiDesignSuggestion } = useCanvas();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[100] backdrop-blur-sm">
      <div
        className="
        bg-white 
        rounded-xl 
        shadow-2xl 
        p-6 
        max-w-md 
        w-full 
        relative 
        border 
        border-gray-100
      "
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X />
        </button>

        <div className="flex items-center space-x-4 mb-4">
          <Lightbulb className="text-yellow-500 w-10 h-10" />
          <h2 className="text-xl font-bold text-gray-800">
            AI Design Suggestion
          </h2>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
          <p className="text-blue-800 italic">
            &quot;{aiDesignSuggestion}&quot;
          </p>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          This AI-generated suggestion is a creative prompt to inspire your next
          design. Feel free to interpret it loosely or use it as a starting
          point for your artwork.
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="
              px-4 
              py-2 
              bg-gray-100 
              text-gray-700 
              rounded-md 
              hover:bg-gray-200 
              transition
            "
          >
            Close
          </button>
          <button
            onClick={() => {
              // TODO: Implement design generation logic
              console.log("Generate design based on suggestion");
            }}
            className="
              px-4 
              py-2 
              bg-blue-500 
              text-white 
              rounded-md 
              hover:bg-blue-600 
              transition
              flex 
              items-center 
              space-x-2
            "
          >
            <Lightbulb className="w-4 h-4" />
            <span>Generate Design</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiDesignModal;
