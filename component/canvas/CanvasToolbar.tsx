import React from "react";
import { useCanvas } from "@/contexts/CanvasContext";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Pencil,
  Eraser,
  Type,
  Square,
  Hand,
  Undo2,
  Download,
  Trash2,
} from "lucide-react";

const CanvasToolbar: React.FC = () => {
  const {
    brushColor,
    setBrushColor,
    brushRadius,
    setBrushRadius,
    currentTool,
    setCurrentTool,
    clearCanvas,
    undoCanvas,
    downloadCanvas,
    aiSuggestDesign,
    aiDesignSuggestion,
  } = useCanvas();

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md p-2 flex items-center space-x-2">
      <Button
        variant={currentTool === "pencil" ? "default" : "outline"}
        size="icon"
        onClick={() => setCurrentTool("pencil")}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant={currentTool === "eraser" ? "default" : "outline"}
        size="icon"
        onClick={() => setCurrentTool("eraser")}
      >
        <Eraser className="h-4 w-4" />
      </Button>
      <Button
        variant={currentTool === "text" ? "default" : "outline"}
        size="icon"
        onClick={() => setCurrentTool("text")}
      >
        <Type className="h-4 w-4" />
      </Button>
      <Button
        variant={currentTool === "shapes" ? "default" : "outline"}
        size="icon"
        onClick={() => setCurrentTool("shapes")}
      >
        <Square className="h-4 w-4" />
      </Button>
      <Button
        variant={currentTool === "hand" ? "default" : "outline"}
        size="icon"
        onClick={() => setCurrentTool("hand")}
      >
        <Hand className="h-4 w-4" />
      </Button>
      <input
        type="color"
        value={brushColor}
        onChange={(e) => setBrushColor(e.target.value)}
        className="w-8 h-8 rounded-full overflow-hidden"
      />
      <Slider
        value={[brushRadius]}
        onValueChange={(value) => setBrushRadius(value[0])}
        min={1}
        max={20}
        step={1}
        className="w-32"
      />
      <Button variant="outline" size="icon" onClick={undoCanvas}>
        <Undo2 className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={downloadCanvas}>
        <Download className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={clearCanvas}>
        <Trash2 className="h-4 w-4" />
      </Button>
      <Button variant="outline" onClick={aiSuggestDesign}>
        AI Suggest
      </Button>
      {aiDesignSuggestion && (
        <div className="ml-2 text-sm text-gray-600">{aiDesignSuggestion}</div>
      )}
    </div>
  );
};

export default CanvasToolbar;
