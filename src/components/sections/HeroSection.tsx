import { motion } from "framer-motion";
import { Download, Mail, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/Aditya-Wahyu-Setiawan-resume.pdf";
    link.download = "Aditya-Wahyu-Setiawan-resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container-custom relative z-10 pt-20 pb-10 sm:pb-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Open to opportunities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4"
            >
              Aditya Wahyu
              <span className="block text-accent">Setiawan</span>
            </motion.h1>

            {/* Mobile Profile Image - Between name and job title */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="lg:hidden flex justify-center my-8"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-accent/20 via-primary/10 to-transparent blur-xl" />
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-accent to-primary opacity-20" />
                <div className="w-48 h-48 sm:w-56 sm:h-56 relative overflow-hidden rounded-full">
                  <img
                    src="/profile.jpg"
                    alt="Aditya Wahyu Setiawan"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground mb-4"
            >
              Electrical Engineer
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-base text-muted-foreground/80 mb-8 max-w-lg mx-auto lg:mx-0"
            >
              <span className="text-accent font-medium">Power Systems</span> |{" "}
              <span className="text-accent font-medium">Renewable Energy</span> |{" "}
              <span className="text-accent font-medium">Industrial Automation</span><br />
              Electrical Engineering graduate with hands-on experience in power systems, solar PV, industrial automation, and applied engineering projects. Focused on developing practical, reliable, and sustainable electrical engineering solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start pb-8 sm:pb-0"
            >
              <Button
                size="lg"
                onClick={scrollToProjects}
                className="group bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Eye className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                View Projects
              </Button>
              <Button size="lg" variant="outline" onClick={handleDownloadCV}>
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Button>
              <Button size="lg" variant="outline" onClick={scrollToContact} className="group">
                <Mail className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Contact Me
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Profile Image (Desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="hidden lg:flex justify-center lg:justify-end order-2"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-accent/20 via-primary/10 to-transparent blur-xl" />
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-accent to-primary opacity-20" />

              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative overflow-hidden rounded-full">
                <img
                  src="/profile.jpg"
                  alt="Aditya Wahyu Setiawan"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
