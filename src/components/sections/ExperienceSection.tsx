import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

const experiences = [
  {
    id: 1,
    company: "PT. Energi Terbarukan Internasional",
    role: "Solar PV EPC Intern",
    period: "Feb 2025 - Jun 2025",
    location: "Surabaya, Indonesia",
    responsibilities: [
      "Involved in Engineering, Procurement, and Construction (EPC) activities for solar PV projects.",
      "Assisted in planning and execution of solar panel installations for commercial-scale systems.",
      "Supported coordination between engineering design, field installation, and project documentation.",
      "Participated in technical inspections and verification of installed PV system components.",
    ],
    imageLabel: "solar-pv-epc-intern", // Nama file: solar-pv-epc-intern.png
  },
  {
    id: 2,
    company: "PT. King Manufacture",
    role: "Manufacturing & Automation Intern",
    period: "Jul 2020 - Dec 2020",
    location: "Surakarta, Indonesia",
    responsibilities: [
      "Assisted in manufacturing processes focused on industrial automation and precision component production.",
      "Participated in production of precision parts for automotive and heavy industry sectors.",
      "Gained exposure to industrial manufacturing workflows, quality control, and technical documentation.",
    ],
    imageLabel: "manufacturing-automation-intern", // Nama file: manufacturing-automation-intern.png
  },
  {
    id: 3,
    company: "PT. Alfan Mechatronics Innovation",
    role: "Mechatronics & Industrial Automation Intern",
    period: "Jul 2020 - Dec 2020",
    location: "malang, Indonesia",
    responsibilities: [
      "Assisted in industrial automation and mechanical–electrical construction (MEP) projects.",
      "Supported design and installation of renewable energy systems including solar PV and public street lighting (PJU).",
      "Participated in development of mechatronics-based systems such as educational trainers and automation modules.",
      "Collaborated with engineers and academic partners in vocational and applied engineering projects.",
    ],
    imageLabel: "mechatronics-automation-intern", // Nama file: mechatronics-automation-intern.png
  },
];

export function ExperienceSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding bg-background" ref={sectionRef}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Professional Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building practical expertise through industry internships and academic roles
          </p>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Experience Cards */}
        <div className="max-w-5xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Desktop Layout - Card and Image side by side */}
              <div className={`hidden md:flex items-stretch gap-6 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                {/* Content Card */}
                <div className="flex-1">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-card rounded-xl p-6 border border-border shadow-lg hover:shadow-xl hover:border-accent/30 transition-all duration-300 h-full"
                  >
                    {/* Header */}
                    <div className="flex flex-col gap-2 mb-4">
                      <div className="flex items-center gap-2 text-accent">
                        <Briefcase className="w-4 h-4" />
                        <span className="font-semibold">{exp.role}</span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground">{exp.company}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {exp.responsibilities.map((resp, respIndex) => (
                        <li
                          key={respIndex}
                          className="flex items-start gap-2"
                        >
                          <ChevronRight className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Image - Outside the card on desktop */}
                {exp.imageLabel && (
                  <div className="w-80 flex-shrink-0">
                    <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                      <ImagePlaceholder
                        label={exp.imageLabel}
                        aspectRatio="video"
                        rounded="lg"
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Layout - Image inside card */}
              <div className="md:hidden">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-card rounded-xl p-6 border border-border shadow-lg hover:shadow-xl hover:border-accent/30 transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center gap-2 text-accent">
                      <Briefcase className="w-4 h-4" />
                      <span className="font-semibold">{exp.role}</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{exp.company}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Image inside card on mobile - 16:9 aspect ratio */}
                  {exp.imageLabel && (
                    <div className="mb-4 aspect-video rounded-lg overflow-hidden">
                      <ImagePlaceholder
                        label={exp.imageLabel}
                        aspectRatio="video"
                        rounded="lg"
                        className="w-full h-full"
                      />
                    </div>
                  )}

                  {/* Responsibilities */}
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {exp.responsibilities.map((resp, respIndex) => (
                      <li key={respIndex} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}