import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Image from "next/image";

interface IselectedImage {
  src: string;
  alt: string;
}

interface IImagePopup {
  selectedImage: IselectedImage;
  closePopup: () => void;
  handleDownload: (a: string, b: string) => void;
}

const ImagePopup = ({
  selectedImage,
  closePopup,
  handleDownload,
}: IImagePopup) => (
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
);

export default ImagePopup;
