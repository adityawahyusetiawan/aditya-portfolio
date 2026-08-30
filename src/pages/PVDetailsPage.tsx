import { useRef } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";
import { SystemOverview } from "@/components/pv/SystemOverview";
import { ScrollImageSequence } from "@/components/pv/ScrollImageSequence";

// ---------------------------------------------------------------------------
// Frame path arrays — generated from public/<folder>/ezgif-frame-001.jpg …120
// Zero-padded filenames sort lexicographically = numerically. No renaming needed.
// ---------------------------------------------------------------------------
function buildFramePaths(folder: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(3, "0");
    return `/${folder}/ezgif-frame-${n}.jpg`;
  });
}

const PV_FRAMES = buildFramePaths("pv-animation", 120);
const INVERTER_FRAMES = buildFramePaths("inverter-animation", 120);
const MOTOR_FRAMES = buildFramePaths("motor-animation", 120);

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default function PVDetailsPage() {
  const systemRef = useRef<HTMLElement>(null);

  const scrollToSystem = () => {
    systemRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />

        <main className="flex-1">
          {/* ── 1. Daytime System overview ── */}
          <SystemOverview overviewRef={systemRef} />

          {/* ── 2. PV Array scroll animation ── */}
          <ScrollImageSequence
            id="pv-animation"
            title="PV Array Animation"
            description="Scroll to explore the photovoltaic module and mounting system."
            framePaths={PV_FRAMES}
            showBackToSystem
            onBackToSystem={scrollToSystem}
          />

          {/* ── 3. Hybrid Inverter scroll animation ── */}
          <ScrollImageSequence
            id="inverter-animation"
            title="Hybrid Inverter Animation"
            description="Scroll to explore the internal structure of the power conversion system."
            framePaths={INVERTER_FRAMES}
            showBackToSystem
            onBackToSystem={scrollToSystem}
          />

          {/* ── 4. Induction Motor scroll animation ── */}
          <ScrollImageSequence
            id="motor-animation"
            title="Induction Motor Animation"
            description="Scroll to explore the construction of the three-phase induction motor."
            framePaths={MOTOR_FRAMES}
            showBackToSystem
            onBackToSystem={scrollToSystem}
          />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
