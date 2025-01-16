"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar/sidebar";
import SettingsSection from "@/components/sidebar/settings-section";
import TextOverlaySection from "@/components/sidebar/text-overlay";
import FavoritesSection from "@/components/sidebar/favorites-section";
import MainContent from "@/components/main-content";
import ImageGrid from "@/components/image-grid";
import PromptInput from "@/components/prompt-input";
import ImagePopup from "@/components/image-popup";

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

  const [textOverlay, setTextOverlay] = useState("");
  const [textStyle, setTextStyle] = useState("bold");

  const generateImages = async () => {
    setIsLoading(true);
    try {
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
          prompt: fullPrompt,
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
      <Sidebar>
        <SettingsSection
          tempNumImages={tempNumImages}
          handleNumImagesChange={handleNumImagesChange}
          tempStyle={tempStyle}
          setTempStyle={setTempStyle}
          tempLayout={tempLayout}
          setTempLayout={setTempLayout}
        />
        <TextOverlaySection
          textOverlay={textOverlay}
          setTextOverlay={setTextOverlay}
          textStyle={textStyle}
          setTextStyle={setTextStyle}
        />
        <FavoritesSection
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      </Sidebar>

      <MainContent>
        <ImageGrid
          isLoading={isLoading}
          generatedImages={generatedImages}
          layout={layout}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          handleImageClick={handleImageClick}
          handleDownload={handleDownload}
        />
        <PromptInput
          prompt={prompt}
          setPrompt={setPrompt}
          handleGenerate={handleGenerate}
          isLoading={isLoading}
        />
      </MainContent>

      <ImagePopup
        selectedImage={selectedImage}
        closePopup={closePopup}
        handleDownload={handleDownload}
      />
    </div>
  );
}
