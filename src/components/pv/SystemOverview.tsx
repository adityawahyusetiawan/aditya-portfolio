import { useRef } from "react";
import { motion } from "framer-motion";

interface HotspotConfig {
  label: string;
  sublabel: string;
  targetId: string;
  ariaLabel: string;
  position: "left" | "center" | "right";
}

const HOTSPOTS: HotspotConfig[] = [
  {
    label: "PV Array",
    sublabel: "Solar Modules",
    targetId: "pv-animation",
    ariaLabel: "View PV array animation",
    position: "left",
  },
  {
    label: "Power Conversion",
    sublabel: "Hybrid Inverter",
    targetId: "inverter-animation",
    ariaLabel: "View hybrid inverter animation",
    position: "center",
  },
  {
    label: "Induction Motor Load",
    sublabel: "3-Phase Motor",
    targetId: "motor-animation",
    ariaLabel: "View induction motor animation",
    position: "right",
  },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

interface SystemOverviewProps {
  overviewRef?: React.RefObject<HTMLElement>;
}

export function SystemOverview({ overviewRef }: SystemOverviewProps) {
  const internalRef = useRef<HTMLElement>(null);
  const sectionRef = (overviewRef ?? internalRef) as React.RefObject<HTMLElement>;

  return (
    <section
      id="daytime-system"
      ref={sectionRef}
      className="section-padding container-custom"
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3">
          Daytime System
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
          Interactive Solar PV Energy Flow — click any area to explore the component in detail.
        </p>
      </motion.div>

      {/* Image + hotspot overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative w-full rounded-2xl overflow-hidden border border-border shadow-lg bg-card"
      >
        {/* Main system image — one continuous image, never cropped */}
        <img
          src="/sistem-siang.png"
          alt="Daytime Solar PV System — PV Array, Hybrid Inverter, and Induction Motor Load"
          className="w-full h-auto object-contain block"
          draggable={false}
        />

        {/* Three transparent interactive hotspots */}
        <div className="absolute inset-0 flex">
          {HOTSPOTS.map((spot) => (
            <button
              key={spot.targetId}
              onClick={() => scrollToSection(spot.targetId)}
              aria-label={spot.ariaLabel}
              className={[
                "flex-1 relative group flex flex-col items-center justify-end pb-4 sm:pb-6",
                "cursor-pointer border-0 bg-transparent outline-none",
                "transition-all duration-200",
                "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset",
              ].join(" ")}
            >
              {/* Subtle hover overlay */}
              <div
                className={[
                  "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                  "bg-accent/10 border border-accent/30",
                  spot.position === "left" ? "rounded-l-2xl" : "",
                  spot.position === "right" ? "rounded-r-2xl" : "",
                ].join(" ")}
              />

              {/* Hover label chip */}
              <div
                className={[
                  "relative z-10 px-3 py-1.5 rounded-lg text-center",
                  "bg-background/80 backdrop-blur-sm border border-border/60",
                  "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
                  "translate-y-2 group-hover:translate-y-0 group-focus-visible:translate-y-0",
                  "transition-all duration-200 pointer-events-none",
                ].join(" ")}
              >
                <p className="text-xs font-semibold text-foreground leading-tight">{spot.label}</p>
                <p className="text-xs text-muted-foreground leading-tight">{spot.sublabel}</p>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Mobile fallback buttons — visible on small screens as supplementary navigation */}
      <div className="mt-6 flex flex-wrap gap-3 justify-center md:hidden">
        {HOTSPOTS.map((spot) => (
          <button
            key={`mobile-${spot.targetId}`}
            onClick={() => scrollToSection(spot.targetId)}
            aria-label={spot.ariaLabel}
            className="px-4 py-2 rounded-lg border border-accent/40 text-sm font-medium text-accent hover:bg-accent/10 transition-colors duration-200"
          >
            {spot.label}
          </button>
        ))}
      </div>

      {/* Component legend */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-accent/60 rounded" />
          Left — PV Array
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-accent/60 rounded" />
          Center — Power Conversion / Inverter
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-accent/60 rounded" />
          Right — Induction Motor Load
        </span>
      </div>
    </section>
  );
}
