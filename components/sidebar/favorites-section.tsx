import React from "react";

import { X } from "lucide-react";
import Image from "next/image";
import SidebarSection from "./sidebar-section";
import { Button } from "../ui/button";

interface Favorite {
  src: string;
  alt: string;
}

interface FavoritesSectionProps {
  favorites: Favorite[];
  toggleFavorite: (fav: Favorite) => void;
}

const FavoritesSection: React.FC<FavoritesSectionProps> = ({
  favorites,
  toggleFavorite,
}) => {
  return (
    <SidebarSection title="Favorites">
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
    </SidebarSection>
  );
};

export default FavoritesSection;
