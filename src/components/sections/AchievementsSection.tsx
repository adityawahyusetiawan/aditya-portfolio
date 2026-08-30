import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Trophy, Medal, Award, Star, Sparkles, ChevronLeft, ChevronRight, X, FileText, Users, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

const achievements = [
  {
    id: 2,
    title: "National Seminar Speaker: Community Service SEPMAS",
    year: "2024",
    description:
      "Presented applied engineering solutions for community-based technology implementation and empowerment.",
    icon: Award,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    imageLabel: "national-seminar-speaker", // Nama file: national-seminar-speaker.png
  },
  {
    id: 3,
    title: "Gold Medal Award: E-MOS ACE Malaysia",
    year: "2023",
    description:
      "International recognition for innovative IoT-based environmental monitoring system.",
    icon: Star,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    imageLabel: "gold-medal-award", // Nama file: gold-medal-award.png
  },
  {
    id: 4,
    title: "Best IT Category Award: E-MOS ACE Malaysia",
    year: "2023",
    description:
      "Awarded for outstanding information technology innovation and system implementation.",
    icon: Medal,
    color: "text-gray-400",
    bgColor: "bg-gray-500/10",
    imageLabel: "best-it-award", // Nama file: best-it-award.png
  },
  {
    id: 6,
    title: "Community Service Certificate: Solar-Powered Grass Chopper Implementation 2024",
    year: "2024",
    description:
      "Implemented solar-powered agricultural machinery to improve rural productivity and energy efficiency.",
    icon: HeartHandshake, // Changed from Sparkles
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    imageLabel: "solar-grass-chopper", // Nama file: solar-grass-chopper.png
  },
  {
    id: 7,
    title: "Community Service Certificate: IoT-Based Bottle Sterilization for MSMEs 2024",
    year: "2024",
    description:
      "Developed IoT-enabled sterilization system to enhance hygiene and operational efficiency for MSMEs.",
    icon: Users, // Changed from Sparkles
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    imageLabel: "iot-bottle-sterilization", // Nama file: iot-bottle-sterilization.png
  },
  {
    id: 8,
    title: "2nd Place — Abisatya Business Idea Development Competition 2024",
    year: "2024",
    description:
      "Recognized for an innovative business idea in the Abisatya Business Idea Development Competition.",
    icon: Trophy, // Menggunakan Trophy untuk juara
    color: "text-amber-500", // Warna emas untuk juara
    bgColor: "bg-amber-500/10",
    imageLabel: "abisatya-business-competition-2024",
  },
];

export function AchievementsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  // Calculate visible cards (3 at a time for desktop, 1 for mobile)
  const visibleCount = 3;

  // Auto-slide every 10 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % achievements.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % achievements.length);
  };

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + achievements.length) % achievements.length);
  };

  const openModal = (index: number) => {
    setModalIndex(index);
    setModalOpen(true);
    setIsAutoPlaying(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsAutoPlaying(true);
  };

  const navigateModal = (direction: "next" | "prev") => {
    if (direction === "next") {
      setModalIndex((prev) => (prev + 1) % achievements.length);
    } else {
      setModalIndex((prev) => (prev - 1 + achievements.length) % achievements.length);
    }
  };

  // Get visible achievements for carousel
  const getVisibleAchievements = () => {
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % achievements.length;
      visible.push({ ...achievements[index], displayIndex: i });
    }
    return visible;
  };

  return (
    <section id="achievements" className="section-padding bg-background" ref={sectionRef}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Achievements & Awards
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Recognition for academic excellence and innovative engineering contributions
          </p>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Achievement Cards Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex justify-end gap-2 mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrev}
              className="rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Desktop Carousel - 3 cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {getVisibleAchievements().map((achievement, displayIndex) => (
                <motion.div
                  key={`${achievement.id}-${currentIndex}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3, delay: displayIndex * 0.1 }}
                  onClick={() => openModal(achievements.findIndex(a => a.id === achievement.id))}
                  className="cursor-pointer"
                >
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group relative bg-card rounded-xl overflow-hidden border border-border shadow-lg hover:shadow-xl hover:border-accent/30 transition-all duration-300 aspect-square"
                  >
                    {/* Image Placeholder */}
                    <div className="relative h-2/3">
                      <ImagePlaceholder
                        label={achievement.imageLabel || achievement.title} // Gunakan imageLabel jika ada
                        aspectRatio="square"
                        rounded="none"
                        className="w-full h-full"
                      />
                      {/* Year badge */}
                      <div className="absolute top-4 right-4 px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full">
                        {achievement.year}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-card via-card to-transparent p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          className={`p-2 rounded-lg ${achievement.bgColor}`}
                        >
                          <achievement.icon className={`w-4 h-4 ${achievement.color}`} />
                        </motion.div>
                        <h3 className="text-sm font-bold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
                          {achievement.title}
                        </h3>
                      </div>
                    </div>

                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Mobile Carousel - 1 card */}
          <div className="md:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                onClick={() => openModal(currentIndex)}
                className="cursor-pointer"
              >
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative bg-card rounded-xl overflow-hidden border border-border shadow-lg hover:shadow-xl hover:border-accent/30 transition-all duration-300 aspect-square max-w-sm mx-auto"
                >
                  {/* Image Placeholder */}
                  <div className="relative h-2/3">
                    <ImagePlaceholder
                      label={achievements[currentIndex].imageLabel || achievements[currentIndex].title}
                      aspectRatio="square"
                      rounded="none"
                      className="w-full h-full"
                    />
                    {/* Year badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full">
                      {achievements[currentIndex].year}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-card via-card to-transparent p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <motion.div
                        className={`p-2 rounded-lg ${achievements[currentIndex].bgColor}`}
                      >
                        {(() => {
                          const Icon = achievements[currentIndex].icon;
                          return <Icon className={`w-4 h-4 ${achievements[currentIndex].color}`} />;
                        })()}
                      </motion.div>
                      <h3 className="text-sm font-bold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
                        {achievements[currentIndex].title}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {achievements[currentIndex].description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {achievements.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-accent w-6" : "bg-muted-foreground/30"
                }`}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <Button
                variant="secondary"
                size="icon"
                onClick={closeModal}
                className="absolute -top-12 right-0 z-10 rounded-full shadow-lg"
              >
                <X className="w-5 h-5" />
              </Button>

              {/* Modal Content */}
              <div className="bg-card rounded-xl overflow-hidden shadow-2xl border border-border">
                <div className="aspect-video relative">
                  <ImagePlaceholder
                    label={achievements[modalIndex].imageLabel || achievements[modalIndex].title}
                    aspectRatio="video"
                    rounded="none"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-3 rounded-xl ${achievements[modalIndex].bgColor}`}>
                      {(() => {
                        const Icon = achievements[modalIndex].icon;
                        return <Icon className={`w-6 h-6 ${achievements[modalIndex].color}`} />;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {achievements[modalIndex].title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{achievements[modalIndex].year}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{achievements[modalIndex].description}</p>
                </div>
              </div>

              {/* Navigation Buttons */}
              <Button
                variant="secondary"
                size="icon"
                onClick={() => navigateModal("prev")}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 rounded-full shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={() => navigateModal("next")}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 rounded-full shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-4">
                {achievements.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === modalIndex ? "bg-accent w-6" : "bg-muted-foreground/30"
                    }`}
                    onClick={() => setModalIndex(index)}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}