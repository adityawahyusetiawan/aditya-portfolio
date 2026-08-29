import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { GraduationCap, Target, Lightbulb, Zap, Wrench } from "lucide-react";

function AnimatedCounter({ target, duration = 2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = target;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start * 100) / 100);
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, target, duration]);

  return <span ref={ref}>{count.toFixed(2)}</span>;
}

const focusAreas = [
  { icon: Zap, label: "Power Systems" },
  { icon: Lightbulb, label: "Renewable Energy" },
  { icon: Target, label: "Industrial Automation" },
  { icon: GraduationCap, label: "Applied Engineering" },
];

const softwareExpertise = [
  { label: "ETAP" },
  { label: "PVsyst" },
  { label: "Proteus" },
  { label: "Autodesk Inventor" },
  { label: "SketchUp" },
];

const embeddedHardware = ["ESP32", "Microcontrollers", "PLC"];

export function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-background" ref={sectionRef}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-accent/20 to-primary/10 rounded-2xl blur-2xl" />
            <div className="relative w-full max-w-sm aspect-[3/4]">
              <img
                src="/about-me.png"
                alt="About Me Photo (Workshop / Lab / Field Work)"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            {/* GPA Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-flex items-center gap-4 px-6 py-4 bg-card rounded-xl shadow-lg border border-border"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10">
                <GraduationCap className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Final GPA</p>
                <p className="text-2xl font-bold text-foreground">
                  <AnimatedCounter target={3.82} /> <span className="text-muted-foreground text-base font-normal">/ 4.00</span>
                </p>
              </div>
            </motion.div>

            <div className="space-y-4">
              <p className="text-lg text-foreground">
                <span className="font-semibold text-accent">Electrical Engineering graduate</span> from{" "}
                <span className="font-semibold">State University of Malang</span> with a background in power systems, renewable energy, industrial automation, and electrical system development.
              </p>
              <p className="text-muted-foreground">
                Experienced in the design, implementation, and troubleshooting of electrical, control, and electronic systems through academic, research, and industrial projects.
              </p>
              <p className="text-muted-foreground">
                My experience combines engineering analysis with hands-on implementation, including renewable energy systems, industrial automation, power system applications, and applied engineering research.
              </p>
            </div>

            {/* Focus Areas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-4"
            >
              <p className="text-sm font-medium text-muted-foreground mb-3">Focus Areas</p>
              <div className="flex flex-wrap gap-3">
                {focusAreas.map((area, index) => (
                  <motion.div
                    key={area.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border shadow-sm hover:border-accent/50 hover:shadow-md transition-all duration-200"
                  >
                    <area.icon className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-foreground">{area.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Engineering Software */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="pt-2"
            >
              <p className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                Engineering Software
              </p>
              <div className="flex flex-wrap gap-3">
                {softwareExpertise.map((software, index) => (
                  <motion.div
                    key={software.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-lg border border-accent/20 shadow-sm hover:border-accent/50 hover:shadow-md transition-all duration-200"
                  >
                    <span className="text-sm font-medium text-foreground">{software.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pt-2"
            >
              <p className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                Embedded & Hardware
              </p>
              <div className="flex flex-wrap gap-3">
                {embeddedHardware.map((technology) => (
                  <div key={technology} className="px-4 py-2 bg-card rounded-lg border border-border shadow-sm">
                    <span className="text-sm font-medium text-foreground">{technology}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}