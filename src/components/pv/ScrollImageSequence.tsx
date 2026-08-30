import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";

interface ScrollImageSequenceProps {
  id: string;
  title: string;
  description: string;
  framePaths: string[];
  showBackToSystem?: boolean;
  onBackToSystem?: () => void;
}

export function ScrollImageSequence({
  id,
  title,
  description,
  framePaths,
  showBackToSystem = true,
  onBackToSystem,
}: ScrollImageSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastFrameRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);
  const rafRef = useRef<number>(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const totalFrames = framePaths.length;

  useEffect(() => {
    if (totalFrames === 0) return;
    const imgs: HTMLImageElement[] = new Array(totalFrames);
    let loaded = 0;
    const onLoad = () => {
      loaded += 1;
      setLoadedCount(loaded);
      if (loaded === totalFrames) setIsReady(true);
    };
    framePaths.forEach((src, i) => {
      const img = new Image();
      img.onload = onLoad;
      img.onerror = onLoad;
      img.src = src;
      imgs[i] = img;
    });
    imagesRef.current = imgs;
    return () => { imagesRef.current = []; };
  }, [framePaths, totalFrames]);

  const drawFrame = (frameIdx: number) => {
    const canvas = canvasRef.current;
    const imgs = imagesRef.current;
    if (!canvas || !imgs[frameIdx]?.complete) return;
    const img = imgs[frameIdx];
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const displayW = canvas.clientWidth;
    const displayH = canvas.clientHeight;
    if (canvas.width !== Math.round(displayW * dpr) || canvas.height !== Math.round(displayH * dpr)) {
      canvas.width = Math.round(displayW * dpr);
      canvas.height = Math.round(displayH * dpr);
      ctx.scale(dpr, dpr);
    }
    const scale = Math.min(displayW / img.naturalWidth, displayH / img.naturalHeight);
    const drawW = img.naturalWidth * scale;
    const drawH = img.naturalHeight * scale;
    ctx.clearRect(0, 0, displayW, displayH);
    ctx.drawImage(img, (displayW - drawW) / 2, (displayH - drawH) / 2, drawW, drawH);
  };

  useEffect(() => {
    if (!isReady) return;
    lastFrameRef.current = 0;
    drawFrame(0);
  }, [isReady]);

  useEffect(() => {
    if (!isReady) return;
    const onResize = () => {
      const canvas = canvasRef.current;
      if (canvas) { canvas.width = 0; canvas.height = 0; }
      drawFrame(lastFrameRef.current);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [isReady]);

  useEffect(() => {
    if (!isReady || totalFrames === 0) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleWheel = (e: WheelEvent) => {
      if (!isHoveredRef.current) return;
      e.preventDefault();
      e.stopPropagation();

      const delta = e.deltaY > 0 ? 1 : -1;
      const next = Math.max(0, Math.min(totalFrames - 1, lastFrameRef.current + delta));

      if (next !== lastFrameRef.current) {
        lastFrameRef.current = next;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(next));
      }
    };

    wrapper.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      wrapper.removeEventListener("wheel", handleWheel);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isReady, totalFrames]);

  const loadPercent = totalFrames > 0 ? Math.round((loadedCount / totalFrames) * 100) : 0;

  return (
    <section id={id} className="py-8 md:py-12">
      <div className="container-custom">
        <div className="mb-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">{title}</h2>
              <p className="text-muted-foreground text-sm sm:text-base max-w-xl">{description}</p>
            </div>
            {showBackToSystem && onBackToSystem && (
              <button
                onClick={onBackToSystem}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors duration-200 flex-shrink-0 mt-1"
                aria-label="Back to system overview"
              >
                <ChevronUp className="w-4 h-4" />
                Back to System
              </button>
            )}
          </div>
          {!isReady && (
            <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden max-w-xs">
              <div className="h-full bg-accent rounded-full transition-all duration-100" style={{ width: `${loadPercent}%` }} />
            </div>
          )}
        </div>

        <div
          ref={wrapperRef}
          className="relative rounded-xl overflow-hidden border border-border bg-card shadow-sm"
          style={{ height: "65vh", minHeight: "320px", maxHeight: "700px" }}
          onMouseEnter={() => { isHoveredRef.current = true; setIsHovered(true); }}
          onMouseLeave={() => { isHoveredRef.current = false; setIsHovered(false); }}
        >
          {!isReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground">Loading frames… {loadPercent}%</p>
              </div>
            </div>
          )}
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            style={{ opacity: isReady ? 1 : 0, transition: "opacity 0.3s ease" }}
            aria-label={`${title} animation frame`}
          />
          {isReady && !isHovered && (
            <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none select-none">
              <div className="flex flex-col items-center gap-1 text-muted-foreground/60">
                <p className="text-xs tracking-widest uppercase">Hover &amp; scroll to animate</p>
                <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }} className="w-px h-4 bg-muted-foreground/40" />
              </div>
            </div>
          )}
          {isReady && isHovered && (
            <div className="absolute top-3 right-3 pointer-events-none select-none">
              <span className="px-2 py-1 rounded-md bg-accent/90 text-accent-foreground text-xs font-medium shadow-sm">
                Scroll to animate
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
