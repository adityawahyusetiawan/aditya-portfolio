import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

const projects = [
  {
    id: 1, title: "Hybrid Solar PV Installation", subtitle: "Commercial & Residential", year: "2025",
    description: "Contributed to the planning and installation support for hybrid solar PV systems in commercial and residential applications.",
    technologies: ["Solar PV", "Hybrid Inverter", "Battery Storage", "Grid-Tie"], images: ["Main installation photo", "System diagram", "Monitoring dashboard"],
  },
  {
    id: 2, title: "Industrial Solar PV Feasibility Study", subtitle: "Large-Scale Analysis", year: "2025",
    description: "Supported site assessment, shading analysis, energy-yield simulation, and technical reporting for industrial-scale solar PV deployment.",
    technologies: ["PVsyst", "Solar PV", "Site Analysis", "Technical Report"], images: ["Site survey documentation", "Simulation results"],
  },
  {
    id: 3, title: "Solar-Powered Grass Chopper", subtitle: "Agricultural Machinery", year: "2024",
    description: "Contributed to the development and implementation of a solar-powered grass chopper for agricultural applications.",
    technologies: ["DC Motors", "Solar Power", "Mechanical Design", "Agriculture"], images: ["Complete machine photo", "Solar panel integration"],
  },
  {
    id: 4, title: "PLC Trainer & Automation Systems", subtitle: "Educational Equipment", year: "2021",
    description: "Developed educational PLC training equipment using Omron PLCs and CX-Programmer for ladder logic, I/O mapping, and basic automation workflows.",
    technologies: ["Omron PLC", "CX-Programmer", "Ladder Logic", "I/O Mapping"], images: ["Trainer module", "HMI interface", "Wiring documentation"],
  },
  {
    id: 5, title: "Digital Distance Protection Relay Trainer Using ESP32", subtitle: "Protection System", year: "2025",
    description: "Contributed to an ESP32-based distance protection relay trainer prototype for power-system protection learning and testing.",
    technologies: ["ESP32", "Protection Relay", "Microcontrollers", "Power Systems"], images: ["Prototype photo", "Circuit schematic", "Testing results"],
  },
  {
    id: 6, title: "Electro-Thermal Analysis of a PV-Fed Inverter Drive System", subtitle: "Bachelor’s Thesis", year: "2025",
    description: "Analyzed the electro-thermal behavior of a PV-fed inverter drive system, combining solar PV, inverter, and power-electronics modeling workflows.",
    technologies: ["Power Electronics", "Solar PV", "Inverter", "Electro-Thermal Analysis", "PLECS", "Python"], images: ["Simulation results", "Circuit schematic"],
  },
];

interface LightboxState {
  isOpen: boolean;
  projectId: number | null;
  imageIndex: number;
}

function ProjectCard({
  project,
  index,
  onImageClick,
  expandedProjectId,
  onToggleExpanded,
  baseHeight,
  setBaseRef,
}: {
  project: (typeof projects)[0];
  index: number;
  onImageClick: (projectId: number, imageIndex: number) => void;
  expandedProjectId: number | null;
  onToggleExpanded: (projectId: number) => void;
  baseHeight: number | null;
  setBaseRef: (projectId: number) => (el: HTMLDivElement | null) => void;
}) {
  const isExpanded = expandedProjectId === project.id;

  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border shadow-lg hover:shadow-xl hover:border-accent/30 transition-all duration-300 w-[300px] sm:w-[340px] flex-shrink-0 flex flex-col">
      <div
        ref={setBaseRef(project.id)}
        style={baseHeight ? { height: `${baseHeight}px` } : undefined}
        className="flex flex-col"
      >
        {/* Main Image */}
        <div
          className="relative overflow-hidden cursor-pointer group"
          onClick={() => onImageClick(project.id, 0)}
        >
          <ImagePlaceholder
            label={project.images[0]}
            aspectRatio="video"
            rounded="none"
            className="w-full transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-300" />
          <div className="absolute top-4 right-4 px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full">
            {project.year}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">{project.title}</h3>
            <p className="text-sm text-accent font-medium mb-2">{project.subtitle}</p>
            <p className="text-muted-foreground text-sm mb-4">{project.description}</p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-md font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Expandable Gallery Trigger */}
          <div className="mt-auto pt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleExpanded(project.id)}
              className="w-full justify-between text-muted-foreground hover:text-foreground text-xs"
            >
              <span>View more</span>
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Expandable Gallery */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden px-5 pb-5"
          >
            <div className="grid grid-cols-2 gap-2 pt-2">
              {project.images.slice(1).map((label, idx) => (
                <div
                  key={idx}
                  className="cursor-pointer group"
                  onClick={() => onImageClick(project.id, idx + 1)}
                >
                  <ImagePlaceholder
                    label={label}
                    aspectRatio="video"
                    rounded="md"
                    className="w-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);
  const baseRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [baseHeight, setBaseHeight] = useState<number | null>(null);

  const setBaseRef = (projectId: number) => (el: HTMLDivElement | null) => {
    baseRefs.current[projectId] = el;
  };

  useEffect(() => {
    let raf = 0;

    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const heights = projects.map((p) => {
          const el = baseRefs.current[p.id];
          return el ? el.scrollHeight : 0;
        });
        const max = Math.max(0, ...heights);
        setBaseHeight(max > 0 ? Math.ceil(max) : null);
      });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(raf);
    };
  }, [expandedProjectId]);

  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    projectId: null,
    imageIndex: 0,
  });

  const openLightbox = (projectId: number, imageIndex: number) => {
    setLightbox({ isOpen: true, projectId, imageIndex });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, projectId: null, imageIndex: 0 });
  };

  const navigateLightbox = (direction: "next" | "prev") => {
    if (lightbox.projectId === null) return;
    const project = projects.find((p) => p.id === lightbox.projectId);
    if (!project) return;

    const totalImages = project.images.length;
    let newIndex = lightbox.imageIndex;

    if (direction === "next") {
      newIndex = (newIndex + 1) % totalImages;
    } else {
      newIndex = (newIndex - 1 + totalImages) % totalImages;
    }

    setLightbox({ ...lightbox, imageIndex: newIndex });
  };

  const scrollProjects = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 360;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const currentProject = lightbox.projectId
    ? projects.find((p) => p.id === lightbox.projectId)
    : null;

  const handleToggleExpanded = (projectId: number) => {
    setExpandedProjectId((prev) => (prev === projectId ? null : projectId));
  };

  return (
    <section id="projects" className="section-padding bg-background" ref={sectionRef}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my engineering projects spanning renewable energy, automation, and power
            systems
          </p>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Horizontally Scrollable Projects */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex justify-end gap-2 mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollProjects("left")}
              className="rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollProjects("right")}
              className="rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-themed scroll-smooth items-start"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onImageClick={openLightbox}
                expandedProjectId={expandedProjectId}
                onToggleExpanded={handleToggleExpanded}
                baseHeight={baseHeight}
                setBaseRef={setBaseRef}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox.isOpen && currentProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <Button
                variant="secondary"
                size="icon"
                onClick={closeLightbox}
                className="absolute -top-12 right-0 z-10 rounded-full shadow-lg"
              >
                <X className="w-5 h-5" />
              </Button>

              {/* Image Container */}
              <div className="relative bg-card rounded-xl overflow-hidden shadow-2xl border border-border">
                <div className="aspect-video relative">
                  <ImagePlaceholder
                    label={currentProject.images[lightbox.imageIndex]}
                    aspectRatio="video"
                    rounded="none"
                    className="w-full h-full"
                  />
                </div>

                {/* Project Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                  <p className="text-foreground font-semibold">{currentProject.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Image {lightbox.imageIndex + 1} of {currentProject.images.length}
                  </p>
                </div>
              </div>

              {/* Navigation Buttons */}
              {currentProject.images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => navigateLightbox("prev")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 rounded-full shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => navigateLightbox("next")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 rounded-full shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </>
              )}

              {/* Dots Indicator */}
              {currentProject.images.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {currentProject.images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === lightbox.imageIndex ? "bg-accent w-6" : "bg-muted-foreground/30"
                      }`}
                      onClick={() => setLightbox({ ...lightbox, imageIndex: index })}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}