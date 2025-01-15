import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download } from "lucide-react";
import Image from "next/image";

interface MainContentProps {
  isLoading: boolean;
  generatedImages: { src: string; alt: string }[];
  handleImageClick: (image: { src: string; alt: string }) => void;
  handleDownload: (src: string, alt: string) => void;
  prompt: string;
  setPrompt: (prompt: string) => void;
  handleGenerate: () => void;
}

const MainContent: React.FC<MainContentProps> = ({
  isLoading,
  generatedImages,
  handleImageClick,
  handleDownload,
  prompt,
  setPrompt,
  handleGenerate,
}) => (
  <div className="flex-1 flex flex-col max-w-7xl mx-auto">
    <div className="p-4 flex items-center justify-end gap-2 border-b border-[#E5E5E5]"></div>
    <ScrollArea className="flex-1">
      <div className="p-4 space-y-4">
        <div className="grid gap-4">
          {isLoading ? (
            <div className="col-span-full flex justify-center items-center">
              <p>Loading...</p>
            </div>
          ) : generatedImages.length > 0 ? (
            generatedImages.map((image, i) => (
              <Card key={i} className="bg-white border-[#E5E5E5] relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={300}
                  height={225}
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
          ) : (
            <div className="col-span-full flex justify-center items-center">
              <p>No images generated yet.</p>
            </div>
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
);

export default MainContent;
