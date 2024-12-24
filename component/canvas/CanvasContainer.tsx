"use client";
import React from "react";
import CanvasDraw from "react-canvas-draw";
import { useCanvas } from "@/contexts/CanvasContext";
import CanvasToolbar from "./CanvasToolbar";

const CanvasContainer: React.FC = () => {
  const { brushColor, brushRadius, isErasing, canvasRef } = useCanvas();

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col">
      <div className="flex-grow mt-14">
        <CanvasToolbar />
        <CanvasDraw
          ref={canvasRef}
          brushColor={isErasing ? "rgba(255,255,255,1)" : brushColor}
          brushRadius={brushRadius}
          canvasWidth={window?.innerWidth}
          canvasHeight={window?.innerHeight - 56}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default CanvasContainer;
