import { motion } from "framer-motion";
import { Linkedin, Mail, Instagram, MessageCircle } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#research" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/aditya-wahyu-setiawan-1492a32aa/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:adityawahyusetiawan.id@gmail.com", label: "Email" },
  { icon: Instagram, href: "https://www.instagram.com/aditya.wahyu.id/", label: "Instagram" },
  { icon: MessageCircle, href: "https://wa.me/62859106722095", label: "WhatsApp" },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-border">
      <div className="container-custom py-8">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
              className="inline-block text-2xl font-display font-bold text-foreground hover:text-accent transition-colors"
            >
              Aditya Wahyu S
            </a>
            <p className="text-xs text-muted-foreground mt-1">
              Electrical Engineer | Power Systems & Renewable Energy
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-muted/50 hover:bg-accent/10 hover:text-accent text-muted-foreground transition-all text-sm"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{social.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Aditya Wahyu Setiawan. All rights reserved.
          </p>
          <div className="flex gap-4">
            {navLinks.slice(0, 4).map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-xs text-muted-foreground hover:text-accent transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}