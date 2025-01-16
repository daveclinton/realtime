"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronLeft,
  ChevronDown,
  Copy,
  Download,
  Heart,
  X,
} from "lucide-react";
import Image from "next/image";

export default function ImageGenerator() {
  const [numImages, setNumImages] = useState(1);
  const [style, setStyle] = useState("illustration");
  const [layout, setLayout] = useState("landscape");
  const [prompt, setPrompt] = useState(
    "Generate an image of google headquarters"
  );
  const [generatedImages, setGeneratedImages] = useState<
    { src: string; alt: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const [tempNumImages, setTempNumImages] = useState(numImages);
  const [tempStyle, setTempStyle] = useState(style);
  const [tempLayout, setTempLayout] = useState(layout);

  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const [favorites, setFavorites] = useState<{ src: string; alt: string }[]>(
    []
  );

  // Text overlay state
  const [textOverlay, setTextOverlay] = useState("");
  const [textStyle, setTextStyle] = useState("bold"); // Default text style

  const generateImages = async () => {
    setIsLoading(true);
    try {
      // Combine the prompt with the text overlay and style
      const fullPrompt = `${prompt} with text overlay: "${textOverlay}" in ${textStyle} style`;

      const requests = Array.from({ length: tempNumImages }, () => {
        const requestBody = {
          width:
            layout === "landscape" ? 1024 : layout === "portrait" ? 768 : 1024,
          height:
            layout === "landscape" ? 768 : layout === "portrait" ? 1024 : 1024,
          num_inference_steps: 4,
          negative_prompt: "",
          seed: -1,
          response_extension: "webp",
          response_format: "url",
          prompt: fullPrompt, // Use the full prompt with text overlay
          model: "black-forest-labs/flux-schnell",
        };
        return fetch("/api/proxy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
      });

      const responses = await Promise.all(requests);

      const data = await Promise.all(
        responses.map(async (response) => {
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              `API Error: ${errorData.error || response.statusText}`
            );
          }
          return response.json();
        })
      );

      const newImages = data.map((d, i) => ({
        src: d.data[0]?.url || "/placeholder.svg",
        alt: `Generated image ${i + 1} based on prompt: ${fullPrompt}`,
      }));

      setGeneratedImages(newImages);
    } catch (error) {
      console.error("Error generating images:", error);
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = () => {
    setNumImages(tempNumImages);
    setStyle(tempStyle);
    setLayout(tempLayout);

    generateImages();
  };

  const handleDownload = (src: string, alt: string) => {
    const link = document.createElement("a");
    link.href = src;
    link.download = alt.replace(/ /g, "_") + ".webp";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImageClick = (image: { src: string; alt: string }) => {
    setSelectedImage(image);
  };

  const closePopup = () => {
    setSelectedImage(null);
  };

  const handleNumImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1 && value <= 8) {
      setTempNumImages(value);
    }
  };

  const toggleFavorite = (image: { src: string; alt: string }) => {
    if (favorites.some((fav) => fav.src === image.src)) {
      setFavorites(favorites.filter((fav) => fav.src !== image.src));
    } else {
      setFavorites([...favorites, image]);
    }
  };

  return (
    <div className="flex h-screen bg-white text-[#1E1E1E]">
      <div className="w-64 border-r border-[#E5E5E5]">
        <div className="p-4 flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-[#1E1E1E] hover:bg-[#F5F5F5]"
            aria-label="Back"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-medium">Image Generation</h1>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto text-[#1E1E1E] hover:bg-[#F5F5F5]"
            aria-label="Copy"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-64px)]">
          <div className="p-4 space-y-6">
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center gap-2 w-full text-[#1E1E1E]">
                <ChevronDown className="h-4 w-4" />
                <span>General settings</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-[#6E6E6E]">Models</label>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-white text-[#1E1E1E] hover:bg-[#F5F5F5] border-[#E5E5E5]"
                  >
                    🎨 Flux
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#6E6E6E]">
                    Number of Images
                  </label>
                  <Input
                    type="number"
                    min={1}
                    max={8}
                    value={tempNumImages}
                    onChange={handleNumImagesChange}
                    className="w-full bg-white border-[#E5E5E5] text-[#1E1E1E]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#6E6E6E]">Style</label>
                  <Select value={tempStyle} onValueChange={setTempStyle}>
                    <SelectTrigger className="w-full bg-white border-[#E5E5E5]">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="illustration">Illustration</SelectItem>
                      <SelectItem value="dark-humor">Dark Humor</SelectItem>
                      <SelectItem value="scifi">Sci-Fi</SelectItem>
                      <SelectItem value="art">Art</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#6E6E6E]">Layout</label>
                  <Select value={tempLayout} onValueChange={setTempLayout}>
                    <SelectTrigger className="w-full bg-white border-[#E5E5E5]">
                      <SelectValue placeholder="Select layout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="landscape">Landscape</SelectItem>
                      <SelectItem value="portrait">Portrait</SelectItem>
                      <SelectItem value="square">Square</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center gap-2 w-full text-[#1E1E1E]">
                <ChevronDown className="h-4 w-4" />
                <span>Text Overlay</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-[#6E6E6E]">Text</label>
                  <Input
                    type="text"
                    placeholder="Enter text for overlay"
                    value={textOverlay}
                    onChange={(e) => setTextOverlay(e.target.value)}
                    className="w-full bg-white border-[#E5E5E5] text-[#1E1E1E]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#6E6E6E]">Text Style</label>
                  <Select value={textStyle} onValueChange={setTextStyle}>
                    <SelectTrigger className="w-full bg-white border-[#E5E5E5]">
                      <SelectValue placeholder="Select text style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bold">Bold</SelectItem>
                      <SelectItem value="italic">Italic</SelectItem>
                      <SelectItem value="underline">Underline</SelectItem>
                      <SelectItem value="shadow">Shadow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center gap-2 w-full text-[#1E1E1E]">
                <ChevronDown className="h-4 w-4" />
                <span>Favorites</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2 space-y-4">
                {favorites.map((fav, i) => (
                  <div key={i} className="relative">
                    <Image
                      src={fav.src}
                      alt={fav.alt}
                      width={100}
                      height={100}
                      className="w-full h-auto rounded-lg object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white/90"
                      onClick={() => toggleFavorite(fav)}
                      aria-label="Remove Favorite"
                    >
                      <X className="h-4 w-4 text-[#1E1E1E]" />
                    </Button>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col max-w-7xl mx-auto">
        <div className="p-4 flex items-center justify-end gap-2 border-b border-[#E5E5E5]"></div>

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {isLoading ? (
                <div className="col-span-full flex justify-center items-center">
                  <p>Loading...</p>
                </div>
              ) : generatedImages.length > 0 ? (
                generatedImages.map((image, i) => (
                  <Card key={i} className="bg-white border-[#E5E5E5] relative">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      width={layout === "portrait" ? 200 : 280}
                      height={
                        layout === "portrait"
                          ? 280
                          : layout === "square"
                          ? 280
                          : 210
                      }
                      className="w-full h-auto rounded-lg object-cover cursor-pointer"
                      onClick={() => handleImageClick(image)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-10 bg-white/80 hover:bg-white/90"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(image);
                      }}
                      aria-label="Favorite"
                    >
                      {favorites.some((fav) => fav.src === image.src) ? (
                        <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                      ) : (
                        <Heart className="h-4 w-4 text-[#1E1E1E]" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white/90"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(image.src, image.alt);
                      }}
                      aria-label="Download"
                    >
                      <Download className="h-4 w-4 text-[#1E1E1E]" />
                    </Button>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex justify-center items-center">
                  <p>No images generated yet.</p>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        <div className="p-2 border-t border-[#E5E5E5] bg-white">
          <div className="flex gap-2 max-w-2xl mx-auto">
            <Input
              placeholder="Enter your prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 bg-white border-[#E5E5E5] text-[#1E1E1E] focus:border-[#7C3AED] focus:ring-[#7C3AED]"
            />
            <Button
              className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
              onClick={handleGenerate}
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate"}
            </Button>
          </div>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          onClick={closePopup}
        >
          <div className="relative max-w-full max-h-full">
            <Image
              src={selectedImage.src || "/placeholder.svg"}
              alt={selectedImage.alt}
              width={800}
              height={600}
              className="rounded-lg max-w-full max-h-[90vh] w-auto h-auto"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white/90"
              onClick={(e) => {
                e.stopPropagation();
                handleDownload(selectedImage.src, selectedImage.alt);
              }}
              aria-label="Download"
            >
              <Download className="h-4 w-4 text-[#1E1E1E]" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
