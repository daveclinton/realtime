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
import { ChevronDown, Download } from "lucide-react";
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

  const generateImages = async () => {
    setIsLoading(true);
    try {
      const timestamp = Date.now();
      const images = Array(numImages)
        .fill(null)
        .map((_, i) => ({
          src: `https://picsum.photos/seed/${timestamp + i}/400/300`,
          alt: `Generated ${style} image in ${layout} layout based on prompt: ${prompt}`,
        }));
      setGeneratedImages(images);
    } catch (error) {
      console.error("Error generating images:", error);
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
    link.download = alt.replace(/ /g, "_") + ".jpg";
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

  return (
    <div className="flex h-screen bg-white text-[#1E1E1E]">
      <div className="w-80 border-r border-[#E5E5E5]">
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
                <span>Styles</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2 space-y-4"></CollapsibleContent>
            </Collapsible>
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col max-w-7xl mx-auto">
        <div className="p-4 flex items-center justify-end gap-2 border-b border-[#E5E5E5]"></div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            <div
              className={`grid gap-4 ${
                layout === "portrait"
                  ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                  : layout === "square"
                  ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {isLoading ? (
                <div className="col-span-full flex justify-center items-center">
                  <p>Loading...</p>
                </div>
              ) : (
                generatedImages.map((image, i) => (
                  <Card key={i} className="bg-white border-[#E5E5E5] relative">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      width={layout === "portrait" ? 200 : 300}
                      height={
                        layout === "portrait"
                          ? 300
                          : layout === "square"
                          ? 300
                          : 225
                      }
                      className="w-full h-auto rounded-lg object-cover cursor-pointer"
                      onClick={() => handleImageClick(image)}
                    />
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
              )}
            </div>
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-[#E5E5E5] bg-white">
          <div className="flex gap-2">
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
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={800}
              height={600}
              className="rounded-lg"
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
