import React, { createContext, useState, useContext, useCallback } from "react";
import CanvasDraw from "react-canvas-draw";

type ToolType = "pencil" | "eraser" | "text" | "shapes" | "hand";

interface CanvasContextType {
  brushColor: string;
  setBrushColor: (color: string) => void;
  brushRadius: number;
  setBrushRadius: (radius: number) => void;
  currentTool: ToolType;
  setCurrentTool: (tool: ToolType) => void;
  isErasing: boolean;
  canvasRef: React.RefObject<CanvasDraw | null> | null;
  clearCanvas: () => void;
  undoCanvas: () => void;
  downloadCanvas: () => void;
  aiSuggestDesign: () => void;
  aiDesignSuggestion: string | null;
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

export const CanvasProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const canvasRef = React.useRef<CanvasDraw>(null);
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushRadius, setBrushRadius] = useState(5);
  const [currentTool, setCurrentTool] = useState<ToolType>("pencil");
  const [aiDesignSuggestion, setAiDesignSuggestion] = useState<string | null>(
    null
  );

  const clearCanvas = useCallback(() => {
    canvasRef.current?.clear();
  }, []);

  const undoCanvas = useCallback(() => {
    canvasRef.current?.undo();
  }, []);

  const downloadCanvas = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current.canvas.drawing;
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "drawing.png";
      link.href = image;
      link.click();
    }
  }, []);

  const aiSuggestDesign = useCallback(() => {
    // Mock AI design suggestion
    const suggestions = [
      "Minimalist geometric landscape with soft pastel colors",
      "Abstract cityscape using bold, intersecting lines",
      "Organic flow of interconnected shapes inspired by nature",
      "Retro-futuristic design with vibrant color gradients",
      "Symmetrical mandala-like pattern with intricate details",
    ];
    setAiDesignSuggestion(
      suggestions[Math.floor(Math.random() * suggestions.length)]
    );
  }, []);

  return (
    <CanvasContext.Provider
      value={{
        brushColor,
        setBrushColor,
        brushRadius,
        setBrushRadius,
        currentTool,
        setCurrentTool,
        isErasing: currentTool === "eraser",
        canvasRef,
        clearCanvas,
        undoCanvas,
        downloadCanvas,
        aiSuggestDesign,
        aiDesignSuggestion,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (context === undefined) {
    throw new Error("useCanvas must be used within a CanvasProvider");
  }
  return context;
};
