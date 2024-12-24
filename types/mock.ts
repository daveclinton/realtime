import {
  AIDesignSuggestion,
  AIGeneratedImage,
  ShapeRecognitionResult,
  SuggestionType,
  RecognizedShape,
} from "../types/ai-design";

const designPatterns = {
  colors: [
    { primary: "#FF6B6B", secondary: "#4ECDC4" },
    { primary: "#45B7D1", secondary: "#FFBE0B" },
    { primary: "#96CEB4", secondary: "#FFEEAD" },
  ],
  layouts: [
    "asymmetrical balance",
    "grid-based",
    "minimalist",
    "dynamic flow",
    "radial composition",
  ],
  shapes: [
    "organic curves",
    "geometric patterns",
    "abstract forms",
    "structured grids",
    "flowing lines",
  ],
};

const contextualSuggestions: Record<SuggestionType, string[]> = {
  color: [
    "The current palette could be enhanced with {color} to create more visual depth",
    "Consider introducing {color} as an accent to make key elements pop",
    "A subtle gradient from {color1} to {color2} could add sophistication",
    "The contrast could be improved by incorporating {color} tones",
  ],
  layout: [
    "Try organizing elements in a {layout} pattern for better visual hierarchy",
    "A {layout} approach could improve the overall composition",
    "Shifting towards a {layout} layout might better serve your content",
    "Consider restructuring using {layout} principles for better flow",
  ],
  shape: [
    "Incorporating {shape} could add interesting visual texture",
    "The composition might benefit from {shape} to create rhythm",
    "Try introducing {shape} to complement existing elements",
    "Adding {shape} could help guide the viewer's eye",
  ],
};

export const mockAIService = {
  generateSuggestion: (): AIDesignSuggestion => {
    const types: SuggestionType[] = ["color", "layout", "shape"];
    const type = types[Math.floor(Math.random() * types.length)];

    let description =
      contextualSuggestions[type][
        Math.floor(Math.random() * contextualSuggestions[type].length)
      ];

    if (type === "color") {
      const colors =
        designPatterns.colors[
          Math.floor(Math.random() * designPatterns.colors.length)
        ];
      description = description
        .replace("{color}", colors.primary)
        .replace("{color1}", colors.primary)
        .replace("{color2}", colors.secondary);
    } else if (type === "layout") {
      description = description.replace(
        "{layout}",
        designPatterns.layouts[
          Math.floor(Math.random() * designPatterns.layouts.length)
        ]
      );
    } else {
      description = description.replace(
        "{shape}",
        designPatterns.shapes[
          Math.floor(Math.random() * designPatterns.shapes.length)
        ]
      );
    }

    return {
      id: Math.random().toString(36).slice(2, 11),
      type,
      description,
      timestamp: new Date().toISOString(),
    };
  },

  generateImage: async (prompt: string): Promise<AIGeneratedImage> => {
    // Simulate varying response times
    const delay = Math.random() * 1000 + 1000; // 1-2 seconds
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Generate different sized images
    const sizes = [400, 500, 600];
    const size = sizes[Math.floor(Math.random() * sizes.length)];

    // Generate random image ID for Picsum
    const imageId = Math.floor(Math.random() * 1000);

    // Create Picsum URL with random image and size
    // Using grayscale option for some images to create variety
    const useGrayscale = Math.random() > 0.5;
    const grayscaleParam = useGrayscale ? "?grayscale" : "";

    return {
      id: Math.random().toString(36).slice(2, 11),
      url: `https://picsum.photos/id/${imageId}/${size}/${size}${grayscaleParam}`,
      prompt,
      metadata: {
        size: `${size}x${size}`,
        generationTime: `${(delay / 1000).toFixed(1)}s`,
        style: useGrayscale
          ? "monochrome"
          : prompt.toLowerCase().includes("modern")
          ? "modern"
          : prompt.toLowerCase().includes("minimal")
          ? "minimal"
          : "standard",
      },
    };
  },

  recognizeShape: (): ShapeRecognitionResult => {
    const shapes: RecognizedShape[] = [
      "circle",
      "rectangle",
      "triangle",
      "arrow",
      "star",
      "hexagon",
      "spiral",
      "freeform",
    ];

    const baseConfidence = 0.75;
    const variation = Math.random() * 0.2;
    const confidence = Math.min(baseConfidence + variation, 0.98);

    return {
      type: shapes[Math.floor(Math.random() * shapes.length)],
      confidence,
      details: {
        size: Math.floor(Math.random() * 100 + 50),
        position: {
          x: Math.floor(Math.random() * 800),
          y: Math.floor(Math.random() * 600),
        },
        rotation: Math.floor(Math.random() * 360),
      },
    };
  },
};
