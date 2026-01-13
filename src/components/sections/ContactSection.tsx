import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Linkedin, MapPin, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactInfo = {
  email: "adityawahyusetiawan.id@email.com",
  linkedin: "www.linkedin.com/in/aditya-wahyu-setiawan-1492a32aa/",
  location: "Malang, East Java, Indonesia",
};

export function ContactSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${contactInfo.email}?subject=Portfolio Inquiry&body=Hello Aditya,%0D%0A%0D%0AI found your portfolio and would like to connect.%0D%0A%0D%0ABest regards`;
  };

  const handleLinkedInClick = () => {
    window.open(`https://${contactInfo.linkedin}`, "_blank");
  };

  return (
    <section id="contact" className="section-padding bg-background" ref={sectionRef}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        {/* Contact Card with GIF Background */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden">
            {/* GIF Background Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-accent/40 dark:from-primary/95 dark:via-[hsl(160,50%,15%)] dark:to-accent/30">
              {/* This would be replaced with actual GIF */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
              
              {/* Animated circles */}
              <motion.div
                className="absolute top-10 left-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-10 right-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 px-8 py-16 md:px-16 md:py-20">
              {/* Title / CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center mb-12"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Let's Build Something Amazing Together
                </h3>
                <p className="text-white/80 max-w-xl mx-auto">
                  Interested in research collaboration, project opportunities, or innovative engineering challenges? Let's connect!
                </p>
              </motion.div>

              {/* Contact Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                {/* Email Button */}
                <Button
                  size="lg"
                  onClick={handleEmailClick}
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm group"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  {contactInfo.email}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyEmail();
                    }}
                    className="ml-2 p-1 hover:bg-white/10 rounded transition-colors"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-accent" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </Button>

                {/* LinkedIn Button */}
                <Button
                  size="lg"
                  onClick={handleLinkedInClick}
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm group"
                >
                  <Linkedin className="mr-2 h-5 w-5" />
                  LinkedIn
                </Button>

                {/* Location Button */}
                <Button
                  size="lg"
                  variant="ghost"
                  className="w-full sm:w-auto text-white/80 hover:text-white hover:bg-white/10"
                >
                  <MapPin className="mr-2 h-5 w-5" />
                  {contactInfo.location}
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}