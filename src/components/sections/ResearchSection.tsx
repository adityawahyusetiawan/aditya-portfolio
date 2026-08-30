import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, FileText, Award, ExternalLink, BadgeCheck, Copyright } from "lucide-react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { SingleItemCarousel } from "@/components/research/SingleItemCarousel";

const researchProjects = [
  {
    type: "Research Project",
    title: "E-MOS: IoT-Based Environmental Monitoring System Integrated Smartphone Application to Increase Leaf Vegetable Production",
    journal: "ARAU International Creativity Expo (ACE)",
    year: "2023",
    url: "https://www.kompasiana.com/adityawahyusetiawan1135/6964a70334777c377a0bfdf2/inovasi-berbasis-internet-of-things-karya-mahasiswa-um-harumkan-nama-bangsa-di-tingkat-internasional?page=1&page_images=1",
  },
  {
    type: "Research Project",
    title: "Digital Distance Protection Relay Trainer Using ESP32",
    journal: "Universitas Negeri Malang",
    year: "2025",
    url: "https://drive.google.com/file/d/1KdBBDNYgm85YdDwG0hPR1bgvDPG0yXWg/view?usp=sharing",
  },
  {
    type: "Research Project",
    title: "Generator Edukit",
    journal: "Universitas Negeri Malang",
    year: "2025",
    url: "https://drive.google.com/file/d/1D1GbUXM0omtyTSt9kDPpjhIBYswtRtU3/view?usp=sharing",
  }
];

const publications = [
  {
    type: "Journal",
    title: "Rancangan Kontrol Daya Resistif Berdasarkan Mikrokontroler Dengan Triac",
    journal: "Rekayasa Elektrikal Dan Energi (RELE)",
    year: "2024",
    url: "https://jurnal.umsu.ac.id:444/index.php/RELE/article/view/18958"
  },
  {
    type: "Journal",
    title: "Implementasi Sistem Monitoring Daya Sterilisasi Botol Kemasan Berbasis IoT-App untuk Pengembangan UMKM",
    journal: "Jurnal Teknik elektro UNIBA",
    year: "2024",
    url: "https://jurnal.fte.uniba-bpn.ac.id/index.php/JTE/article/view/296" // Ganti dengan URL yang sesuai
  }
];

const intellectualProperty = [
  {
    type: "Industrial Design",
    title: "Industrial Design \u2014 Generator Edukit",
    journal: "Universitas Negeri Malang",
    year: "2025",
    url: "https://drive.google.com/file/d/1D1GbUXM0omtyTSt9kDPpjhIBYswtRtU3/view?usp=sharing"
  },
  {
    type: "Copyright",
    title: "Copyright \u2014 DRAGONE ESP 32 Distance Relay Training System",
    journal: "Technical Manual / Guide Book",
    year: "2025",
    url: "https://drive.google.com/file/d/1KdBBDNYgm85YdDwG0hPR1bgvDPG0yXWg/view?usp=sharing"
  }
];

const researchAreas = [
  "Power Systems",
  "Renewable Energy",
  "Industrial Automation",
  "Power Electronics",
  "Smart Grid Technologies",
  "IoT-Based Monitoring Systems",
];

export function ResearchSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Journal":
        return BookOpen;
      case "Conference":
        return Award;
      case "Industrial Design":
        return BadgeCheck;
      case "Copyright":
        return Copyright;
      default:
        return FileText;
    }
  };

  const handlePublicationClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const renderTextCard = (item: any) => {
    const TypeIcon = getTypeIcon(item.type);
    return (
      <div
        onClick={() => item.url && handlePublicationClick(item.url)}
        className={`group bg-card rounded-xl p-5 border border-border transition-all duration-300 ${item.url ? 'hover:border-accent/30 hover:shadow-lg cursor-pointer' : ''}`}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 p-2 rounded-lg bg-accent/10">
            <TypeIcon className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">{item.type}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{item.year}</span>
              </div>
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Open document for ${item.title}`}
                  className="p-1.5 rounded-md hover:bg-accent/10 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-accent opacity-100" />
                </a>
              )}
            </div>
            <h4 className="text-base font-medium text-foreground group-hover:text-accent transition-colors line-clamp-2">
              {item.title}
            </h4>
            <p className="text-sm text-muted-foreground mt-1">{item.journal}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="research" className="section-padding bg-background" ref={sectionRef}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Research, Publications & Intellectual Property
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Applied research spanning power systems, renewable energy, industrial automation, and IoT-based monitoring.
          </p>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Publications List (Scrollable) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-3"
          >
            <SingleItemCarousel title="Research Projects" items={researchProjects} renderItem={renderTextCard} ariaLabel="research project" />

            <SingleItemCarousel title="Publications" items={publications} renderItem={renderTextCard} ariaLabel="publication" />

            <SingleItemCarousel title="Intellectual Property" items={intellectualProperty} renderItem={renderTextCard} ariaLabel="intellectual property" />

            {/* Research Areas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="pt-6"
            >
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Research Interests</h4>
              <div className="flex flex-wrap gap-2">
                {researchAreas.map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1.5 bg-muted text-muted-foreground text-sm rounded-lg hover:bg-accent/10 hover:text-accent transition-colors cursor-default"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Image (Aligned with left) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-full flex flex-col"
          >
            <div className="sticky top-24 flex-1">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/20 to-primary/10 rounded-2xl blur-2xl" />
              <ImagePlaceholder
                label="research-diagram" // Ganti dengan nama file gambar di public folder (tanpa ekstensi)
                aspectRatio="square"
                rounded="lg"
                className="relative w-full"
              />
              
              {/* Stats overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="relative -mt-16 mx-6 bg-card rounded-xl p-4 shadow-xl border border-border"
              >
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-foreground">2</p>
                    <p className="text-xs text-muted-foreground">Publications</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">3</p>
                    <p className="text-xs text-muted-foreground">Research Project</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">Since 2023</p>
                    <p className="text-xs text-muted-foreground">Research</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

