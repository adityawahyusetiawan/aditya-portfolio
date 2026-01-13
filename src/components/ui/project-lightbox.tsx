import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

interface ProjectLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  projectTitle: string;
}

export function ProjectLightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNext,
  onPrev,
  projectTitle,
}: ProjectLightboxProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl mx-4 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute -top-2 -right-2 z-10 bg-card hover:bg-muted rounded-full shadow-lg"
            >
              <X className="w-5 h-5" />
            </Button>

            {/* Image Container */}
            <div className="relative bg-card rounded-xl overflow-hidden shadow-2xl border border-border">
              <div className="aspect-video relative">
                <ImagePlaceholder
                  label={images[currentIndex]}
                  aspectRatio="video"
                  rounded="none"
                  className="w-full h-full"
                />
              </div>

              {/* Project Title */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                <p className="text-sm text-muted-foreground">
                  {projectTitle} - Image {currentIndex + 1} of {images.length}
                </p>
              </div>
            </div>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={onPrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={onNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full shadow-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </>
            )}

            {/* Dots Indicator */}
            {images.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? "bg-accent w-6" : "bg-muted-foreground/30"
                    }`}
                    onClick={() => {
                      const diff = index - currentIndex;
                      if (diff > 0) {
                        for (let i = 0; i < diff; i++) onNext();
                      } else {
                        for (let i = 0; i < Math.abs(diff); i++) onPrev();
                      }
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
