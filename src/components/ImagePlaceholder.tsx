import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  label: string;
  className?: string;
  aspectRatio?: "square" | "video" | "portrait" | "wide";
  rounded?: "none" | "md" | "lg" | "full";
}

const aspectRatioClasses = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
};

const roundedClasses = {
  none: "rounded-none",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

function labelToFileName(label: string) {
  const slug = label
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${slug}.png`;
}

export function ImagePlaceholder({
  label,
  className,
  aspectRatio = "video",
  rounded = "lg",
}: ImagePlaceholderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fileName = labelToFileName(label);
  const src = `/${fileName}`;

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center gap-3 bg-placeholder border-2 border-dashed border-placeholder-foreground/30 overflow-hidden group transition-all duration-300 hover:border-accent/50 hover:bg-placeholder/80",
        aspectRatioClasses[aspectRatio],
        roundedClasses[rounded],
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {!hasError && (
        <img
          src={src}
          alt={label}
          loading="lazy"
          decoding="async"
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}

      {(hasError || !isLoaded) && (
        <>
          <ImageIcon className="w-10 h-10 text-placeholder-foreground/50 group-hover:text-accent/70 transition-colors duration-300" />
          <span className="text-sm text-placeholder-foreground/70 text-center px-4 font-medium group-hover:text-foreground/60 transition-colors duration-300">
            {label}
          </span>
        </>
      )}
    </div>
  );
}