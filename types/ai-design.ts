export type SuggestionType = "color" | "layout" | "shape";
export type RecognizedShape =
  | "circle"
  | "rectangle"
  | "triangle"
  | "arrow"
  | "star"
  | "hexagon"
  | "spiral"
  | "freeform";

export interface AIDesignSuggestion {
  id: string;
  type: SuggestionType;
  description: string;
  timestamp: string;
}

export interface AIGeneratedImage {
  id: string;
  url: string;
  prompt: string;
  metadata?: {
    size: string;
    generationTime: string;
    style: string;
  };
}

export interface ShapeRecognitionResult {
  type: RecognizedShape;
  confidence: number;
  details?: {
    size: number;
    position: {
      x: number;
      y: number;
    };
    rotation: number;
  };
}
