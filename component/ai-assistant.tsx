"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Sparkles,
  ImageIcon,
  Loader2,
  LayoutGrid,
  Square,
  ChevronUp,
  ChevronDown,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AIDesignSuggestion, AIGeneratedImage } from "../types/ai-design";
import { mockAIService } from "@/types/mock";

interface AIAssistantProps {
  onImageGenerated: (image: AIGeneratedImage) => void;
}

export function AIAssistant({ onImageGenerated }: AIAssistantProps) {
  const [suggestions, setSuggestions] = useState<AIDesignSuggestion[]>([]);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imagePrompt, setImagePrompt] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleGetSuggestion = async () => {
    setIsThinking(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const suggestion = mockAIService.generateSuggestion();
    setSuggestions((prev) => [suggestion, ...prev]);
    setIsThinking(false);
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt) return;

    setIsGeneratingImage(true);
    try {
      const image = await mockAIService.generateImage(imagePrompt);
      onImageGenerated(image);
      setImagePrompt("");

      const suggestion = mockAIService.generateSuggestion();
      setSuggestions((prev) => [suggestion, ...prev]);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case "color":
        return <Palette className="w-3 h-3" />;
      case "layout":
        return <LayoutGrid className="w-3 h-3" />;
      case "shape":
        return <Square className="w-3 h-3" />;
      default:
        return <Sparkles className="w-3 h-3" />;
    }
  };

  return (
    <Card className="w-96 absolute z-50 right-8 bottom-4 bg-white/95 backdrop-blur-sm shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4" />
            AI Design Assistant
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <CardContent className="space-y-6 pt-4">
              <div className="mb-4">
                <Input
                  placeholder="Describe the image you want to generate..."
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  className="w-full"
                  disabled={isGeneratingImage}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  variant={isGeneratingImage ? "secondary" : "default"}
                  disabled={isGeneratingImage || !imagePrompt}
                  onClick={handleGenerateImage}
                >
                  {isGeneratingImage ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <ImageIcon className="w-4 h-4 mr-2" />
                  )}
                  Generate Image
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={handleGetSuggestion}
                  disabled={isThinking}
                >
                  {isThinking ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Sparkles className="w-4 h-4 mr-2" />
                  )}
                  Get Suggestion
                </Button>
              </div>

              <ScrollArea className="h-72 pr-4">
                <AnimatePresence initial={false}>
                  {suggestions.map((suggestion, index) => (
                    <motion.div
                      key={suggestion.id}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="p-3 mb-2 text-sm bg-muted rounded-lg hover:bg-muted/70 transition-colors border border-muted-foreground/20">
                        <div className="font-medium mb-1 flex items-center gap-2">
                          {getSuggestionIcon(suggestion.type)}
                          {suggestion.type.charAt(0).toUpperCase() +
                            suggestion.type.slice(1)}{" "}
                          Suggestion
                        </div>
                        <p className="text-muted-foreground">
                          {suggestion.description}
                        </p>
                        <div className="text-xs text-muted-foreground/60 mt-1">
                          {new Date(suggestion.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </ScrollArea>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
      {(isThinking || isGeneratingImage) && (
        <div className="absolute top-0 left-0 w-full h-1 bg-primary/20">
          <div
            className="h-full bg-primary animate-pulse"
            style={{ width: "50%" }}
          ></div>
        </div>
      )}
    </Card>
  );
}
