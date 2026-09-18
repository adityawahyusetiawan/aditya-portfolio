import { motion, useInView } from "framer-motion";
import { Award, GraduationCap } from "lucide-react";
import { useRef } from "react";

const highlights = [
  "Gold & Best Winner — ARAU International Creativity Exhibition, 2023",
  "1st Place — Essay Competition, UKM Einstein, Faculty of Engineering, University of Jember, 2024",
  "2nd Place — Abisatya Business Idea Development Competition, 2024",
];

export function EducationSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="education" className="section-padding bg-muted/30" ref={sectionRef}>
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Education</h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="max-w-4xl mx-auto bg-card rounded-xl p-6 md:p-8 border border-border shadow-lg">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 flex-shrink-0"><GraduationCap className="w-7 h-7 text-accent" /></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-accent mb-1">State University of Malang</p>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">Bachelor’s Degree in Electrical Engineering</h3>
              <p className="text-muted-foreground mt-2">Final GPA: <span className="font-semibold text-foreground">3.84 / 4.00</span></p>
              <div className="mt-6 pt-5 border-t border-border">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Academic Highlights</h4>
                <ul className="space-y-2">{highlights.map((highlight) => <li key={highlight} className="flex items-start gap-2 text-sm text-muted-foreground"><Award className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" /><span>{highlight}</span></li>)}</ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
