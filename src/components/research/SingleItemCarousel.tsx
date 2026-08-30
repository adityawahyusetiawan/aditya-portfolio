import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SingleItemCarouselProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  ariaLabel: string;
  title: string;
}

export function SingleItemCarousel<T>({ items, renderItem, ariaLabel, title }: SingleItemCarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const next = () => setCurrentIndex((i) => Math.min(items.length - 1, i + 1));

  if (!items?.length) return null;

  return (
    <div className="space-y-0">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <div className="flex items-center gap-3">
          {items.length > 1 && (
            <span className="text-xs text-muted-foreground tabular-nums font-medium">
              {currentIndex + 1} / {items.length}
            </span>
          )}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 rounded-full border-border hover:bg-accent/10 hover:text-accent hover:border-accent/30 transition-all"
              onClick={prev}
              disabled={currentIndex === 0}
              aria-label={`Previous ${ariaLabel}`}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 rounded-full border-border hover:bg-accent/10 hover:text-accent hover:border-accent/30 transition-all"
              onClick={next}
              disabled={currentIndex === items.length - 1}
              aria-label={`Next ${ariaLabel}`}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderItem(items[currentIndex])}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
