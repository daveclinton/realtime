import { ImageType } from "@/lib/types";
import React from "react";
import ImageCard from "./image-card";
import { Loader2, ImageOff } from "lucide-react";

interface ImageGridProps {
  isLoading: boolean;
  generatedImages: ImageType[];
  layout: string;
  favorites: ImageType[];
  toggleFavorite: (image: ImageType) => void;
  handleImageClick: (image: ImageType) => void;
  handleDownload: (src: string, alt: string) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({
  isLoading,
  generatedImages,
  layout,
  favorites,
  toggleFavorite,
  handleImageClick,
  handleDownload,
}) => {
  return (
    <div className="p-2 space-y-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <div className="col-span-full flex flex-col justify-center items-center h-64">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-lg font-medium text-primary">
              Generating amazing images...
            </p>
          </div>
        ) : generatedImages.length > 0 ? (
          generatedImages.map((image, i) => (
            <ImageCard
              key={i}
              image={image}
              layout={layout}
              isFavorite={favorites.some((fav) => fav.src === image.src)}
              toggleFavorite={toggleFavorite}
              handleImageClick={handleImageClick}
              handleDownload={handleDownload}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col justify-center items-center h-64 bg-gray-100 rounded-lg">
            <ImageOff className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-xl font-medium text-gray-600">
              No images generated yet
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Use the prompt below to create some amazing images!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGrid;
