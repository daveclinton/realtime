import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Heart, Download } from "lucide-react";
import { Card } from "./ui/card";
import { ImageType } from "@/lib/types";

interface ImageCardProps {
  image: ImageType;
  layout: string;
  isFavorite: boolean;
  toggleFavorite: (image: ImageType) => void;
  handleImageClick: (image: ImageType) => void;
  handleDownload: (src: string, alt: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  image,
  layout,
  isFavorite,
  toggleFavorite,
  handleImageClick,
  handleDownload,
}) => {
  return (
    <Card className="bg-white border-[#E5E5E5] relative">
      <Image
        src={image.src || "/placeholder.svg"}
        alt={image.alt}
        width={layout === "portrait" ? 400 : 560}
        height={layout === "portrait" ? 560 : layout === "square" ? 560 : 420}
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
        {isFavorite ? (
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
  );
};

export default ImageCard;
