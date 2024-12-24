/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "react-canvas-draw" {
  import { Component, ReactNode } from "react";

  interface CanvasDrawProps {
    brushColor?: string;
    brushRadius?: number;
    canvasWidth?: number;
    canvasHeight?: number;
    style?: React.CSSProperties;
    className?: string;
    children?: ReactNode;
    [key: string]: any;
  }

  class CanvasDraw extends Component<CanvasDrawProps> {
    canvas: any;
    clear(): void;
    undo(): void;
    getSaveData(): string;
    loadSaveData(saveData: string): void;
  }

  export default CanvasDraw;
}
