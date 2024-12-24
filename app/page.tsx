"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronDown,
  Undo,
  Redo,
  MousePointer2,
  Hand,
  Pencil,
  Square,
  ArrowUpRight,
  Type,
  Copy,
  Image,
  LayoutGrid,
} from "lucide-react";
import CanvasDraw from "react-canvas-draw";

import { toast } from "sonner";
import { AIGeneratedImage, ShapeRecognitionResult } from "@/types/ai-design";
import { AIAssistant } from "@/component/ai-assistant";
import { mockAIService } from "@/types/mock";

type SizeType = "S" | "M" | "L" | "XL";

const DesignInterface: React.FC = () => {
  const canvasRef = useRef<CanvasDraw | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [currentTool, setCurrentTool] = useState<string>("pencil");
  const [currentColor, setCurrentColor] = useState<string>("#000000");
  const [currentSize, setCurrentSize] = useState<SizeType>("M");
  const [generatedImages, setGeneratedImages] = useState<AIGeneratedImage[]>(
    []
  );
  const [, setLastRecognizedShape] = useState<ShapeRecognitionResult | null>(
    null
  );

  const colors = [
    ["#000000", "#808080", "#E75480", "#800080"],
    ["#0000FF", "#4169E1", "#FFA500", "#8B4513"],
    ["#008000", "#90EE90", "#FFB6C1", "#FF0000"],
  ];

  const sizes: SizeType[] = ["S", "M", "L", "XL"];
  const sizeMap: Record<SizeType, number> = { S: 2, M: 4, L: 6, XL: 8 };

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handleUndo = () => {
    if (canvasRef.current) {
      canvasRef.current.undo();
    }
  };

  const handleClear = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
    }
  };

  const handleImageGenerated = (image: AIGeneratedImage) => {
    setGeneratedImages((prev) => [image, ...prev]);
    toast.success("Image generated successfully!");
  };

  // Mock shape recognition after drawing
  const handleDrawingChange = () => {
    if (currentTool === "pencil") {
      const result = mockAIService.recognizeShape();
      if (result.confidence > 0.8) {
        setLastRecognizedShape(result);
        toast.info(
          `Detected a ${result.type} shape with ${Math.round(
            result.confidence * 100
          )}% confidence`
        );
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="h-screen w-full relative bg-gray-50 overflow-hidden"
    >
      {/* Canvas */}
      {dimensions.width > 0 && dimensions.height > 0 && (
        <CanvasDraw
          ref={canvasRef}
          brushColor={currentColor}
          brushRadius={sizeMap[currentSize]}
          canvasWidth={dimensions.width}
          canvasHeight={dimensions.height}
          hideGrid
          className="absolute inset-0"
          lazyRadius={0}
          onChange={handleDrawingChange}
        />
      )}

      {/* Overlay UI */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Navigation - enable pointer events for interactive elements */}
        <div className="pointer-events-auto flex items-center p-2 bg-white/80 backdrop-blur-sm">
          <button className="flex items-center text-sm text-gray-600 hover:bg-gray-100 rounded px-2 py-1">
            <ChevronLeft className="w-4 h-4 mr-1" />
            <span>Back to content</span>
          </button>
          <div className="flex items-center ml-4">
            <span className="text-sm">Page 1</span>
            <ChevronDown className="w-4 h-4 ml-1" />
          </div>
          <div className="flex items-center ml-4 space-x-2">
            <button
              className="p-1 hover:bg-gray-100 rounded"
              onClick={handleUndo}
              aria-label="Undo"
            >
              <Undo className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded" aria-label="Redo">
              <Redo className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Sidebar - enable pointer events */}
        <div className="pointer-events-auto absolute right-4 top-20 bg-white rounded-lg shadow-lg p-4">
          {/* Color Palette */}
          <div className="grid gap-2">
            {colors.map((row, rowIndex) => (
              <div key={rowIndex} className="flex space-x-2">
                {row.map((color, colIndex) => (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    className={`w-6 h-6 rounded-full ${
                      color === currentColor ? "ring-2 ring-blue-500" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setCurrentColor(color)}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Size Options */}
          <div className="mt-4 flex items-center space-x-2">
            {sizes.map((size) => (
              <button
                key={size}
                className={`w-8 h-8 rounded border ${
                  currentSize === size
                    ? "bg-gray-100 ring-2 ring-blue-500"
                    : "hover:bg-gray-100"
                } flex items-center justify-center text-sm`}
                onClick={() => setCurrentSize(size)}
                aria-label={`Select size ${size}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* AI Assistant */}
        <div className="pointer-events-auto">
          <AIAssistant onImageGenerated={handleImageGenerated} />
        </div>

        {/* Generated Images Preview */}
        {generatedImages.length > 0 && (
          <div className="pointer-events-auto absolute left-4 top-20 bg-white rounded-lg shadow-lg p-4 w-64">
            <div className="text-sm font-medium mb-2">Generated Images</div>
            <div className="grid grid-cols-2 gap-2">
              {generatedImages.slice(0, 4).map((image) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={image.id}
                  src={image.url}
                  alt={image.prompt}
                  className="w-full aspect-square object-cover rounded-md"
                />
              ))}
            </div>
          </div>
        )}

        {/* Bottom Toolbar - enable pointer events */}
        <div className="pointer-events-auto absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-white rounded-full shadow-lg px-4 py-2 flex items-center space-x-4">
            {[
              { tool: "pointer", icon: MousePointer2 },
              { tool: "hand", icon: Hand },
              { tool: "pencil", icon: Pencil },
              { tool: "square", icon: Square },
              { tool: "arrow", icon: ArrowUpRight },
              { tool: "type", icon: Type },
              { tool: "clear", icon: Copy, onClick: handleClear },
              { tool: "image", icon: Image },
              { tool: "grid", icon: LayoutGrid },
            ].map(({ tool, icon: Icon, onClick }) => (
              <button
                key={tool}
                className={`p-2 rounded-full ${
                  currentTool === tool
                    ? "bg-gray-100 ring-2 ring-blue-500"
                    : "hover:bg-gray-100"
                }`}
                onClick={onClick || (() => setCurrentTool(tool))}
                aria-label={tool}
              >
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignInterface;
