import { ImageType } from "@/lib/types";
import React from "react";
import ImageCard from "./image-card";

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
          <div className="col-span-full flex justify-center items-center">
            <p>Loading...</p>
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
          <div className="col-span-full flex justify-center items-center">
            <p>No images generated yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGrid;
