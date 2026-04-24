/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, 
  MapPin, 
  Clock, 
  ChevronRight, 
  ArrowLeft,
  Menu, 
  X, 
  Award, 
  ShieldCheck, 
  Sparkles,
  ArrowUpRight,
  Mail,
  Instagram,
  Facebook,
  CheckCircle2,
  Users,
  Camera
} from "lucide-react";
import { useState, useEffect, ReactNode, FormEvent, MouseEvent, TouchEvent } from "react";

// Declare Calendly on window for TypeScript
declare global {
  interface Window {
    Calendly: any;
  }
}

// Types
interface ServiceCategory {
  name: string;
  description: string;
  items: string[];
  icon: ReactNode;
}

interface BeforeAfter {
  before: string;
  after: string;
  title?: string;
}

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  album?: string[];
  beforeAfter?: BeforeAfter[];
}

const BeforeAfterSlider = ({ before, after, title }: BeforeAfter) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isResizing, setIsResizing] = useState(false);

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!isResizing && e.type !== 'touchmove') return;
    
    const container = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].pageX : e.pageX;
    const position = ((x - container.left) / container.width) * 100;
    
    if (position >= 0 && position <= 100) {
      setSliderPos(position);
    }
  };

  return (
    <div className="space-y-4 group/slider">
      <div className="flex justify-between items-end">
        {title && <h5 className="text-xl font-light tracking-tight text-gray-800">{title}</h5>}
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#5A5A40] opacity-0 group-hover/slider:opacity-100 transition-opacity">
          Drag to Compare
        </span>
      </div>
      <div 
        className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] cursor-col-resize select-none border border-gray-100 shadow-xl"
        onMouseMove={handleMove}
        onMouseDown={() => setIsResizing(true)}
        onMouseUp={() => setIsResizing(false)}
        onMouseLeave={() => setIsResizing(false)}
        onTouchMove={handleMove}
      >
        {/* After Image (Background) */}
        <div className="absolute inset-0">
          <img 
            src={after} 
            alt="After" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            After
          </div>
        </div>

        {/* Before Image (Foreground with Clip) */}
        <div 
          className="absolute inset-0 z-10"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img 
            src={before} 
            alt="Before" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            Before
          </div>
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute inset-y-0 z-20 w-[2px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] transition-all duration-100 pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border border-gray-200">
            <div className="flex gap-1">
              <ChevronRight className="w-4 h-4 text-gray-400 rotate-180" />
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const serviceCategories: ServiceCategory[] = [
  { 
    name: "Fixed Restorations", 
    description: "Premium aesthetic and functional crowns and bridges using the latest materials.",
    items: ["Zirconia (Monolithic/Layered)", "Emax (Lithium Disilicate)", "Inlays & Onlays", "PFM & PFG", "Full Gold & Metal Crowns"],
    icon: <ShieldCheck className="w-8 h-8" />
  },
  { 
    name: "Aesthetic & Planning", 
    description: "Meticulous design for the perfect smile transformation.",
    items: ["Veneers", "Diagnostic Wax-up", "Custom Shading"],
    icon: <Sparkles className="w-8 h-8" />
  },
  { 
    name: "Implant Solutions", 
    description: "Precision-engineered implant components for predictable clinical results.",
    items: ["Implant Crowns", "Custom Abutments", "Screw-retained Bridges", "Surgical Guides"],
    icon: <Award className="w-8 h-8" />
  },
  { 
    name: "Orthodontics & Protection", 
    description: "Custom-fit appliances designed for patient comfort and protection.",
    items: ["Space Maintainers", "Night Guards (Hard/Soft)", "Sports Guards", "Splints"],
    icon: <ShieldCheck className="w-8 h-8" />
  },
];

const galleryItems: GalleryItem[] = [
  { 
    id: 1, 
    title: "Anterior Zirconia", 
    category: "Aesthetic", 
    imageUrl: "https://images.unsplash.com/photo-1670250492416-570b5b7343b1?auto=format&fit=crop&q=80&w=800",
    album: [
      "https://res.cloudinary.com/dziihg83k/image/upload/v1776910357/DSC_2263_q9d2u9.jpg?auto=format&fit=crop&q=80&w=800"
    ],
    beforeAfter: [
      {
        title: "Smile Reconstruction",
        before: "https://res.cloudinary.com/dziihg83k/image/upload/v1776910357/DSC_0685_wjb0si.jpg?auto=format&fit=crop&q=80&w=800",
        after: "https://res.cloudinary.com/dziihg83k/image/upload/v1776910356/DSC_0679_f6freq.jpg?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Smile Reconstruction",
        before: "https://res.cloudinary.com/dziihg83k/image/upload/v1776910356/DSC_1115_ubtsu9.jpg?auto=format&fit=crop&q=80&w=800",
        after: "https://res.cloudinary.com/dziihg83k/image/upload/v1776910356/DSC_1114_znnl2y.jpg?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Smile Reconstruction",
        before: "https://res.cloudinary.com/dziihg83k/image/upload/v1776910357/DSC_1298_u299k5.jpg?auto=format&fit=crop&q=80&w=800",
        after: "https://res.cloudinary.com/dziihg83k/image/upload/v1776910356/DSC_1294_jrvdhq.jpg?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Smile Reconstruction",
        before: "https://res.cloudinary.com/dziihg83k/image/upload/v1776910356/DSC_0983_u3l2bc.jpg?auto=format&fit=crop&q=80&w=800",
        after: "https://res.cloudinary.com/dziihg83k/image/upload/v1776910357/DSC_0979_ndirj1.jpg?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Smile Reconstruction",
        before: "https://res.cloudinary.com/dziihg83k/image/upload/v1776910356/DSC_1138_miq6n9.jpg?auto=format&fit=crop&q=80&w=800",
        after: "https://res.cloudinary.com/dziihg83k/image/upload/v1776910357/DSC_1273_e2w0id.jpg?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  { 
    id: 2, 
    title: "Emax Veneers", 
    category: "Aesthetic", 
    imageUrl: "https://images.unsplash.com/photo-1690167687106-180b0ea1d813?auto=format&fit=crop&q=80&w=800",
    album: [
      "https://res.cloudinary.com/dziihg83k/image/upload/v1776914057/To_Be_Updated_202604222114_uzbukh.jpg?auto=format&fit=crop&q=80&w=800"
    ],
    // beforeAfter: [
    //   {
    //     title: "Veneer Placement",
    //     before: "https://images.unsplash.com/photo-1616391182219-e080b4d1043a?auto=format&fit=crop&q=80&w=800",
    //     after: "https://images.unsplash.com/photo-1690167687106-180b0ea1d813?auto=format&fit=crop&q=80&w=800"
    //   }
    // ]
  },
  { 
    id: 3, 
    title: "PFM Restoration", 
    category: "Fixed", 
    imageUrl: "https://res.cloudinary.com/dziihg83k/image/upload/v1774812501/PFM_mw7t1y.jpg?auto=format&fit=crop&q=80&w=800",
    album: [
      "https://res.cloudinary.com/dziihg83k/image/upload/v1776914057/To_Be_Updated_202604222114_uzbukh.jpg?auto=format&fit=crop&q=80&w=800"
    ],
    // beforeAfter: [
    //   {
    //     title: "Crown Prep & Fit",
    //     before: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800",
    //     after: "https://res.cloudinary.com/dziihg83k/image/upload/v1774812501/PFM_mw7t1y.jpg?auto=format&fit=crop&q=80&w=800"
    //   }
    // ]
  },
  { 
    id: 4, 
    title: "Implant Solutions", 
    category: "Implant", 
    imageUrl: "https://res.cloudinary.com/dziihg83k/image/upload/v1777000385/%EC%B9%98%EC%95%84_%EB%B3%B4%EC%9D%B4%EB%8A%94_%EC%9E%84%ED%94%8C%EB%9E%80%ED%8A%B8_202604232112_ukot7f.jpg?auto=format&fit=crop&q=80&w=800",
    album: [
      "https://res.cloudinary.com/dziihg83k/image/upload/v1776910356/DSC_0835_qixjdo.jpg?auto=format&fit=crop&q=80&w=800"
    ],
    beforeAfter: [
      {
        title: "Implant Final Fixation",
        before: "https://res.cloudinary.com/dziihg83k/image/upload/v1776910356/DSC_0830_uvctva.jpg?auto=format&fit=crop&q=80&w=800",
        after: "https://res.cloudinary.com/dziihg83k/image/upload/v1776910356/DSC_0838_l6eqco.jpg?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  { 
    id: 5, 
    title: "Posterior Zirconia", 
    category: "Fixed", 
    imageUrl: "https://backerdentallab.com/wp-content/uploads/2018/05/Z-max-molar-1.jpg?auto=format&fit=crop&q=80&w=800",
    album: [
      "https://res.cloudinary.com/dziihg83k/image/upload/v1776914057/To_Be_Updated_202604222114_uzbukh.jpg?auto=format&fit=crop&q=80&w=800",
      
    ]
  },
  { 
    id: 6, 
    title: "Full Gold Crown", 
    category: "Fixed", 
    imageUrl: "https://www.dmsdentistry.com/wp-content/uploads/2019/03/goldcrown1.jpg?auto=format&fit=crop&q=80&w=800",
    album: [
      "https://res.cloudinary.com/dziihg83k/image/upload/v1776914057/To_Be_Updated_202604222114_uzbukh.jpg?auto=format&fit=crop&q=80&w=800",
    ]
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'digital-scan' | 'custom-shading'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Case Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formspree.io/f/mkopgqzb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: 'Case Inquiry',
          message: ''
        });
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = ["All", "Fixed", "Aesthetic", "Implant"];
  
  const filteredItems = activeCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/lee-chanmin1' });
    } else {
      // Fallback if script not loaded
      window.open('https://calendly.com/lee-chanmin1', '_blank');
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-sans selection:bg-[#E5E5E5]">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/80 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="relative h-16 w-48 md:w-64 flex items-center">
            <img 
              src="https://res.cloudinary.com/dziihg83k/image/upload/v1776735331/%EC%9D%B4%EA%B1%B0_%EB%B0%B1%EA%B7%B8%EB%9D%BC%EC%9A%B4%EB%93%9C_%ED%88%AC%EB%AA%85%ED%95%98%EA%B2%8C_202604201934-removebg-preview_odr6mg.png" 
              alt="Hive Dental Laboratory" 
              className="absolute left-0 h-24 md:h-36 w-auto object-contain cursor-pointer transition-all duration-300 hover:scale-105 mix-blend-multiply origin-left"
              onClick={() => { setCurrentPage('home'); window.scrollTo(0, 0); }}
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Services", "About", "Gallery", "Digital Scan", "Custom Shading", "Contact"].map((item) => (
              <button 
                key={item} 
                onClick={() => {
                  if (item === "Digital Scan") {
                    setCurrentPage('digital-scan');
                    window.scrollTo(0, 0);
                  } else if (item === "Custom Shading") {
                    setCurrentPage('custom-shading');
                    window.scrollTo(0, 0);
                  } else {
                    setCurrentPage('home');
                    setTimeout(() => {
                      const el = document.getElementById(item.toLowerCase());
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
                className="text-sm font-medium hover:opacity-50 transition-opacity uppercase tracking-widest opacity-100"
              >
                {item}
              </button>
            ))}
            <a href="tel:7804330770" className="bg-[#1A1A1A] text-white px-6 py-2 text-sm font-medium rounded-full hover:bg-opacity-80 transition-all">
              (780) 433-0770
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {["Services", "About", "Gallery", "Digital Scan", "Custom Shading", "Contact"].map((item) => (
              <button 
                key={item} 
                onClick={() => {
                  setIsMenuOpen(false);
                  if (item === "Digital Scan") {
                    setCurrentPage('digital-scan');
                    window.scrollTo(0, 0);
                  } else if (item === "Custom Shading") {
                    setCurrentPage('custom-shading');
                    window.scrollTo(0, 0);
                  } else {
                    setCurrentPage('home');
                    setTimeout(() => {
                      const el = document.getElementById(item.toLowerCase());
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
                className="text-3xl font-light uppercase tracking-widest"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentPage === 'home' ? (
        <motion.div
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image with Blur */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/30 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1920" 
            alt="Dental Lab Background" 
            className="w-full h-full object-cover blur-[4px] scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Subtle Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FDFDFD] z-20" />
        </div>

        <div className="relative z-30 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block text-white/80 text-sm font-medium tracking-[0.3em] uppercase mb-6">
              Precision & Artistry in Edmonton
            </span>
            <h1 className="text-5xl md:text-8xl font-light text-white leading-[1.1] tracking-tight mb-8">
              Crafting Smiles <br />
              <span className="italic font-serif">with Excellence</span>
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a href="#contact" className="bg-white text-black px-10 py-4 rounded-full text-sm font-semibold uppercase tracking-widest hover:scale-105 transition-transform">
                Get in Touch
              </a>
              <a href="#gallery" className="text-white border border-white/30 px-10 py-4 rounded-full text-sm font-semibold uppercase tracking-widest backdrop-blur-sm hover:bg-white hover:text-black transition-all">
                View Gallery
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 text-white/50"
        >
          <div className="w-[1px] h-12 bg-white/30 mx-auto" />
        </motion.div>
      </section>

      {/* Stats / Intro Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-grid-cols-3 gap-12 text-center">
          <div className="space-y-2">
            <h3 className="text-4xl font-light">20+</h3>
            <p className="text-sm text-gray-500 uppercase tracking-widest">Years Experience</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-light">100%</h3>
            <p className="text-sm text-gray-500 uppercase tracking-widest">Precision Fit</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-light">5k+</h3>
            <p className="text-sm text-gray-500 uppercase tracking-widest">Restorations</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 bg-[#F5F2ED] relative overflow-hidden">
        {/* Subtle Texture/Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-12">
            <div className="max-w-3xl">
              <span className="text-xs font-bold tracking-[0.5em] uppercase text-gray-400 mb-6 block">Our Expertise</span>
              <h2 className="text-5xl md:text-8xl font-light leading-[0.9] tracking-tighter text-[#1A1A1A] mb-8">
                Precision <br />
                <span className="italic font-serif text-[#5A5A40]">Craftsmanship</span>
              </h2>
            </div>
            <div className="max-w-md pt-4">
              <p className="text-gray-600 text-xl leading-relaxed font-light">
                We bridge the gap between clinical requirements and aesthetic perfection through a meticulous digital-analog workflow.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {serviceCategories.map((category, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -8 }}
                className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#E5E5E5] group transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-12">
                  <div className="text-[#1A1A1A] group-hover:scale-110 transition-transform duration-500 origin-left">
                    {category.icon}
                  </div>
                  <span className="font-serif italic text-4xl text-[#E5E5E5] group-hover:text-[#5A5A40] transition-colors duration-500">
                    0{idx + 1}
                  </span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-light mb-8 tracking-tight text-[#1A1A1A]">{category.name}</h3>
                <p className="text-gray-500 mb-12 leading-relaxed text-lg font-light">
                  {category.description}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {category.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-medium text-gray-400 group-hover:text-[#1A1A1A] transition-colors">
                      <div className="w-1 h-1 bg-[#5A5A40] rounded-full opacity-40 group-hover:opacity-100 transition-opacity" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Sungho Lee */}
      <section id="about" className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] bg-gray-100 rounded-3xl overflow-hidden">
              <img 
                src="https://picsum.photos/seed/technician/800/1000" 
                alt="Aiden Lee" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-[#1A1A1A] text-white p-12 rounded-3xl hidden lg:block">
              <p className="text-5xl font-light mb-2">20+</p>
              <p className="text-xs uppercase tracking-widest opacity-60">Years of Mastery</p>
            </div>
          </div>
          <div className="space-y-8">
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-gray-400 block">The Founder</span>
            <h2 className="text-4xl md:text-6xl font-light leading-tight">Sungho Aiden Lee</h2>
            <p className="text-xl text-gray-600 leading-relaxed italic font-serif">
              "Precision is not just a goal; it's our standard. Every restoration is a piece of art that restores both function and confidence."
            </p>
            <div className="space-y-6 text-gray-500 leading-relaxed">
              <p>
                With over two decades of experience in the dental laboratory industry, Aiden Lee has established Hive Dental Lab as a beacon of quality in Edmonton. His expertise spans from complex full-mouth reconstructions to delicate aesthetic veneers.
              </p>
              <p>
                Under his leadership, Hive Dental Lab integrates the latest digital technologies with time-tested hand-finishing techniques to ensure every crown, bridge, and guard meets the highest clinical standards.
              </p>
            </div>
            <div className="pt-6">
              <button className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest group">
                Learn more about our process
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-gray-400 mb-4 block">Portfolio</span>
            <h2 className="text-4xl md:text-6xl font-light mb-8">Clinical Excellence</h2>
            
            {/* Filter Bar */}
            <div className="flex flex-wrap justify-center gap-4 mt-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-8 py-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
                    activeCategory === cat 
                      ? "bg-black text-white border-black" 
                      : "bg-transparent text-gray-400 border-gray-100 hover:border-gray-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!selectedGalleryItem ? (
              <motion.div 
                key="grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                  {filteredItems.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ y: -10 }}
                      className="group cursor-pointer"
                      onClick={() => {
                        setSelectedGalleryItem(item);
                        const el = document.getElementById('gallery');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden mb-8">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-[1px] w-8 bg-gray-200" />
                          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">{item.category}</p>
                        </div>
                        <h4 className="text-2xl font-light tracking-tight">{item.title}</h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="album"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="space-y-24"
              >
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-b border-gray-100 pb-12">
                  <div className="space-y-6">
                    <button 
                      onClick={() => setSelectedGalleryItem(null)}
                      className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 hover:text-black transition-all group"
                    >
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      Back to Portfolio
                    </button>
                    <h3 className="text-5xl md:text-7xl font-light tracking-tighter text-[#1A1A1A]">{selectedGalleryItem.title}</h3>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#5A5A40] bg-[#F5F5F0] px-4 py-2 rounded-full">
                      {selectedGalleryItem.category}
                    </span>
                  </div>
                </div>

                {/* Comparison Section */}
                {selectedGalleryItem.beforeAfter && selectedGalleryItem.beforeAfter.length > 0 && (
                  <div className="space-y-12">
                    <div className="flex items-center gap-4">
                      <div className="h-[1px] flex-1 bg-gray-100" />
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-300">Before & After Comparisons</h4>
                      <div className="h-[1px] flex-1 bg-gray-100" />
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      {selectedGalleryItem.beforeAfter.map((pair, idx) => (
                        <motion.div
                          key={`ba-${idx}`}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <BeforeAfterSlider {...pair} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Album Grid */}
                <div className="space-y-12">
                  <div className="flex items-center gap-4">
                    <div className="h-[1px] flex-1 bg-gray-100" />
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-300">Case Gallery</h4>
                    <div className="h-[1px] flex-1 bg-gray-100" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {selectedGalleryItem.album?.map((img, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="aspect-[4/5] bg-gray-50 overflow-hidden cursor-pointer group rounded-2xl border border-gray-100"
                        onClick={() => setSelectedImage(img)}
                      >
                        <img 
                          src={img} 
                          alt={`${selectedGalleryItem.title} ${idx + 1}`} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
                          <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-90 group-hover:scale-100" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="mt-32 text-center">
            <button className="group flex items-center gap-4 mx-auto text-sm font-bold uppercase tracking-[0.3em] hover:opacity-50 transition-all">
              View All Case Studies
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24">
            <div>
              <span className="text-xs font-bold tracking-[0.4em] uppercase text-gray-400 mb-4 block">Contact Us</span>
              <h2 className="text-4xl md:text-6xl font-light leading-tight mb-12">Let's build something <br /><span className="italic font-serif">together.</span></h2>
              
              <div className="space-y-10">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 uppercase tracking-widest text-xs text-gray-400">Location</h4>
                    <p className="text-lg">7125 109 St NW #201, <br />Edmonton, AB T6G 1B9</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 uppercase tracking-widest text-xs text-gray-400">Phone</h4>
                    <a href="tel:7804330770" className="text-lg hover:underline">(780) 433-0770</a>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 uppercase tracking-widest text-xs text-gray-400">Hours</h4>
                    <p className="text-lg">Mon — Fri: 8:00 AM - 4:30 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 uppercase tracking-widest text-xs text-gray-400">Email</h4>
                    <a href="mailto:hivedental@gmail.com" className="text-lg hover:underline">hivedental@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F9F9F9] p-12 rounded-3xl">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Name</label>
                    <input 
                      name="name" 
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white border-none rounded-xl p-4 focus:ring-2 focus:ring-black outline-none transition-all" 
                      placeholder="Dr. Jane Smith" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email</label>
                    <input 
                      name="email" 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white border-none rounded-xl p-4 focus:ring-2 focus:ring-black outline-none transition-all" 
                      placeholder="jane@clinic.com" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Subject</label>
                  <select 
                    name="subject" 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-white border-none rounded-xl p-4 focus:ring-2 focus:ring-black outline-none transition-all"
                  >
                    <option>Case Inquiry</option>
                    <option>New Account Setup</option>
                    <option>General Question</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Message</label>
                  <textarea 
                    name="message" 
                    rows={4} 
                    required 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-white border-none rounded-xl p-4 focus:ring-2 focus:ring-black outline-none transition-all" 
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-black text-white py-5 rounded-xl font-bold uppercase tracking-widest hover:opacity-80 transition-opacity disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
                {isSubmitted && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-green-600 font-medium text-sm"
                  >
                    Thank you! Your message has been sent.
                  </motion.p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
        </motion.div>
      ) : currentPage === 'digital-scan' ? (
        <motion.div
          key="digital-scan"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="pt-32"
        >
          {/* Digital Scan Hero */}
          <section className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <span className="text-xs font-bold tracking-[0.4em] uppercase text-gray-400 mb-6 block">Digital Workflow</span>
                  <h1 className="text-5xl md:text-7xl font-light leading-tight mb-8">
                    Connecting Your Clinic <br />
                    <span className="italic font-serif text-black">to Hive Dental Lab</span>
                  </h1>
                  <p className="text-xl text-gray-500 mb-10 leading-relaxed max-w-lg">
                    Start sending your digital impressions directly to our lab in just a few steps. We support all major intraoral scanners.
                  </p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => {
                        setCurrentPage('home');
                        setTimeout(() => {
                          const el = document.getElementById('contact');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="bg-black text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-opacity-80 transition-all"
                    >
                      Request Consultation
                    </button>
                    <a href="tel:7804330770" className="border border-gray-200 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-gray-50 transition-all">
                      Call Now
                    </a>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-video bg-gray-100 rounded-3xl overflow-hidden shadow-2xl">
                    <img 
                      src="https://cdn.dental-tribune.com/dti//0001/6ffec962/cmVzaXplLWNyb3Aodz0xOTIwO2g9MTA4MCk6c2hhcnBlbihsZXZlbD0wKTpvdXRwdXQoZm9ybWF0PWpwZWcp/up/dt/2024/09/DIM-Image-Primescan2.jpg?auto=format&fit=crop&q=80&w=1200" 
                      alt="Digital Scanning" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Scanners Section */}
          <section className="py-32 px-6 bg-[#F9F9F9]">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-24">
                <span className="text-xs font-bold tracking-[0.4em] uppercase text-black mb-4 block">Digital Scans</span>
                <h2 className="text-4xl md:text-5xl font-light">Scanners We Accept</h2>
                <p className="text-gray-500 mt-4">We are compatible with the following systems</p>
              </div>

              <div className="space-y-32">
                {/* iTero */}
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                  <div className="space-y-8">
                    <div>
                      <span className="text-xs font-bold text-black uppercase tracking-widest mb-2 block">iTero Scanner</span>
                      <h3 className="text-3xl font-light">Option 1 — Quick Setup on Scanner</h3>
                    </div>
                    <ul className="space-y-6">
                      {[
                        "On your iTero scanner, select 'Find a Laboratory.'",
                        "Search and connect with Hive Dental Lab using our Lab ID: 144030.",
                        "Once connected, simply select Hive Dental Lab when sending your scans."
                      ].map((step, i) => (
                        <li key={i} className="flex gap-4">
                          <CheckCircle2 className="w-6 h-6 text-black shrink-0" />
                          <p className="text-gray-600 leading-relaxed">{step}</p>
                        </li>
                      ))}
                    </ul>
                    <a href="tel:7804330770" className="inline-block bg-black text-white px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all">
                      Call Now
                    </a>
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-xl">
                    <img src="https://dentistry.co.uk/app/uploads/2025/04/align-april.jpg?auto=format&fit=crop&q=80&w=800" alt="iTero Setup" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>

                {/* 3Shape Trios */}
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                  <div className="lg:order-2 space-y-8">
                    <div>
                      <span className="text-xs font-bold text-black uppercase tracking-widest mb-2 block">How to Connect to Hive</span>
                      <h3 className="text-3xl font-light">Trios — 3Shape Connection</h3>
                    </div>
                    <div className="space-y-6">
                      <p className="text-gray-600 font-bold">Option 1:</p>
                      <ul className="space-y-4">
                        {[
                          "Open your 3Shape Communicate portal in your browser.",
                          "Go to Connections.",
                          "Search for and request a connection with Hive Dental Lab."
                        ].map((step, i) => (
                          <li key={i} className="flex gap-4">
                            <CheckCircle2 className="w-5 h-5 text-black shrink-0" />
                            <p className="text-gray-600 text-sm">{step}</p>
                          </li>
                        ))}
                      </ul>
                      <p className="text-gray-600 font-bold mt-4">Option 2:</p>
                      <p className="text-gray-600 text-sm">Email us at <span className="text-black font-semibold underline">hivedental@gmail.com</span> or call (780) 433-0770. We'll send you a connection invite—just approve it to get started.</p>
                    </div>
                    <a href="tel:7804330770" className="inline-block bg-black text-white px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all">
                      Call Now
                    </a>
                  </div>
                  <div className="lg:order-1 rounded-3xl overflow-hidden shadow-xl">
                    <img src="https://www.mackenziedentalcentre.com/uploads/upload/review-tooth.jpg?auto=format&fit=crop&q=80&w=800" alt="3Shape Setup" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>

                {/* Medit */}
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                  <div className="space-y-8">
                    <div>
                      <span className="text-xs font-bold text-black uppercase tracking-widest mb-2 block">How to Connect to Hive</span>
                      <h3 className="text-3xl font-light">Medit (Meditlink)</h3>
                    </div>
                    <ul className="space-y-4">
                      {[
                        "Log into Meditlink.",
                        "Click Partner and enter Hive Dental Lab.",
                        "Call or email us to let us know you've sent the request."
                      ].map((step, i) => (
                        <li key={i} className="flex gap-4">
                          <CheckCircle2 className="w-5 h-5 text-black shrink-0" />
                          <p className="text-gray-600 text-sm">{step}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="p-6 bg-white rounded-2xl border border-gray-100">
                      <p className="font-bold text-sm mb-4">To Send Cases:</p>
                      <ul className="space-y-2 text-[0.7rem] text-gray-500">
                        <li>• After scanning, go to the Case Details page.</li>
                        <li>• Click Order, fill out the form, and click OK.</li>
                        <li>• Your order will show as Accepted, and then Shipped.</li>
                      </ul>
                    </div>
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-xl">
                    <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800" alt="Medit Setup" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>

                {/* DS Core */}
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                  <div className="lg:order-2 space-y-8">
                    <div>
                      <span className="text-xs font-bold text-black uppercase tracking-widest mb-2 block">Dentsply Sirona</span>
                      <h3 className="text-3xl font-light">DS Core Connection</h3>
                    </div>
                    <ul className="space-y-4">
                      {[
                        "Log into your DS Core account.",
                        "Navigate to 'Partners' or 'Laboratories'.",
                        "Search for 'Hive Dental Lab' and send a connection request.",
                        "Once accepted, you can send cases directly through the DS Core platform."
                      ].map((step, i) => (
                        <li key={i} className="flex gap-4">
                          <CheckCircle2 className="w-5 h-5 text-black shrink-0" />
                          <p className="text-gray-600 text-sm">{step}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="p-6 bg-white rounded-2xl border border-gray-100">
                      <p className="font-bold text-sm mb-4">Why DS Core?</p>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        DS Core provides a seamless, cloud-based workflow for Dentsply Sirona users, ensuring high-speed data transfer and secure case management.
                      </p>
                    </div>
                    <a href="tel:7804330770" className="inline-block bg-black text-white px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all">
                      Call Now
                    </a>
                  </div>
                  <div className="lg:order-1 rounded-3xl overflow-hidden shadow-xl">
                    <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" alt="DS Core Setup" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Help Section */}
          <section className="py-32 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="bg-[#1A1A1A] text-white p-12 md:p-24 rounded-[3rem] relative overflow-hidden">
                <div className="relative z-10 max-w-2xl mx-auto text-center">
                  <span className="text-xs font-bold tracking-[0.4em] uppercase text-gray-400 mb-6 block">Support</span>
                  <h2 className="text-4xl md:text-6xl font-light mb-8">Need Help?</h2>
                  <p className="text-lg text-gray-400 mb-12 max-w-md mx-auto">We're available to assist you with scanner setup or any technical questions.</p>
                  
                  <div className="pt-12 border-t border-white/10">
                    <a 
                      href="mailto:hivedental@gmail.com" 
                      className="text-xl md:text-3xl font-light hover:text-gray-400 transition-colors break-all tracking-tight"
                    >
                      hivedental@gmail.com
                    </a>
                  </div>
                </div>
                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
              </div>
            </div>
          </section>
        </motion.div>
        ) : (
        <motion.div
          key="custom-shading"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="pt-32"
        >
          {/* Custom Shading Hero */}
          <section className="py-24 px-6 bg-white relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#F9F9F9] -skew-x-12 translate-x-1/2 pointer-events-none" />
            
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="text-xs font-bold tracking-[0.4em] uppercase text-gray-400 mb-6 block">Aesthetic Excellence</span>
                  <h1 className="text-5xl md:text-8xl font-light leading-[0.9] tracking-tighter mb-8">
                    Custom <br />
                    <span className="italic font-serif text-[#5A5A40]">Shading</span>
                  </h1>
                  <p className="text-xl text-gray-500 mb-10 leading-relaxed max-w-lg font-light">
                    Achieve an undetectable match with our personalized custom shading services. We bridge the gap between clinical photography and real-world lighting for a perfect restoration.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <button 
                      onClick={openCalendly}
                      className="bg-black text-white px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-opacity-80 transition-all text-center shadow-lg shadow-black/10"
                    >
                      Book Appointment
                    </button>
                    <a href="tel:7804330770" className="group flex items-center justify-center gap-3 px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest border border-gray-200 hover:bg-gray-50 transition-all">
                      <Phone className="w-4 h-4" />
                      Call to Schedule
                    </a>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="aspect-[4/5] bg-gray-100 rounded-[3rem] overflow-hidden shadow-2xl relative">
                    <img 
                      src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200" 
                      alt="Custom Shading Process" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-32 px-6 bg-[#F5F2ED]">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                <div className="max-w-2xl">
                  <span className="text-xs font-bold tracking-[0.4em] uppercase text-[#5A5A40] mb-4 block">The Experience</span>
                  <h2 className="text-4xl md:text-6xl font-light tracking-tight">Meticulous Process</h2>
                </div>
                <p className="text-gray-500 max-w-xs text-lg font-light">A seamless workflow designed for patient comfort and clinical precision.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Consultation",
                    desc: "We review the clinical case and patient expectations to determine the ideal aesthetic outcome.",
                    icon: <Users className="w-6 h-6" />
                  },
                  {
                    title: "Shade Analysis",
                    desc: "Using multi-spectrum lighting and advanced shade guides, we map the internal structure and surface texture.",
                    icon: <Camera className="w-6 h-6" />
                  },
                  {
                    title: "Characterization",
                    desc: "We document the unique nuances, translucency, and mamelon structures to ensure a lifelike integration.",
                    icon: <Sparkles className="w-6 h-6" />
                  }
                ].map((step, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
                  >
                    <div className="w-14 h-14 bg-[#F9F9F9] rounded-2xl flex items-center justify-center mb-8 text-black group-hover:bg-black group-hover:text-white transition-colors duration-500">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">{step.title}</h3>
                    <p className="text-gray-500 leading-relaxed font-light">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Appointment Options Section */}
          <section className="py-32 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                {/* In-Lab Option */}
                <div className="bg-[#1A1A1A] text-white p-12 md:p-16 rounded-[3rem] relative overflow-hidden flex flex-col justify-between">
                  <div className="relative z-10">
                    <span className="text-xs font-bold tracking-[0.4em] uppercase text-gray-400 mb-6 block">In-Lab Visit</span>
                    <h2 className="text-3xl md:text-5xl font-light mb-8">In-Lab Appointments</h2>
                    <p className="text-lg text-gray-400 mb-12">Our lab is conveniently located in Edmonton. Patients can visit us for a professional shade match in a controlled environment.</p>
                  </div>
                  <div className="pt-12 border-t border-white/10 mt-auto">
                    <p className="text-xl font-light mb-4 text-white">Hive Dental Laboratory</p>
                    <p className="text-gray-400 mb-8">Edmonton, AB</p>
                    <button 
                      onClick={openCalendly}
                      className="inline-block bg-white text-black px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-all"
                    >
                      Book In-Lab Slot
                    </button>
                  </div>
                </div>

                {/* On-Site Option */}
                <div className="bg-[#F9F9F9] text-black p-12 md:p-16 rounded-[3rem] relative overflow-hidden flex flex-col justify-between border border-gray-100">
                  <div className="relative z-10">
                    <span className="text-xs font-bold tracking-[0.4em] uppercase text-gray-400 mb-6 block">Mobile Service</span>
                    <h2 className="text-3xl md:text-5xl font-light mb-8">On-Site Clinic Visits</h2>
                    <p className="text-lg text-gray-500 mb-12">We bring our expertise to your clinic. Our technicians can visit your office to perform custom shading directly in the chairside setting.</p>
                  </div>
                  <div className="pt-12 border-t border-gray-200 mt-auto">
                    <p className="text-xl font-light mb-4">Your Dental Clinic</p>
                    <p className="text-gray-500 mb-8">Edmonton & Surrounding Areas</p>
                    <a 
                      href="tel:7804330770"
                      className="inline-block bg-black text-white px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-opacity-80 transition-all"
                    >
                      Call to Arrange Visit
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-transparent p-2 rounded-lg">
                  <img 
                    src="https://res.cloudinary.com/dziihg83k/image/upload/v1776747390/%EC%9D%B4%EA%B1%B0_%ED%95%98%EC%96%80%EC%83%89%EC%9C%BC%EB%A1%9C_%EB%B0%94%EA%BF%94%EC%A4%98_202604202255-removebg-preview_kkdvz9.png" 
                    alt="Hive Dental Logo Icon" 
                    className="w-10 h-10 object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-xl font-bold tracking-tight uppercase text-white">HIVE DENTAL LABORATORY</span>
              </div>
              <p className="text-gray-400 max-w-sm leading-relaxed">
                Edmonton's premier dental laboratory specializing in aesthetic and restorative excellence. Partnering with clinicians to deliver superior patient outcomes.
              </p>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-8">Navigation</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li>
                  <button 
                    onClick={() => {
                      setCurrentPage('home');
                      setTimeout(() => {
                        const el = document.getElementById('services');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setCurrentPage('home');
                      setTimeout(() => {
                        const el = document.getElementById('about');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="hover:text-white transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setCurrentPage('home');
                      setTimeout(() => {
                        const el = document.getElementById('gallery');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Gallery
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setCurrentPage('digital-scan');
                      window.scrollTo(0, 0);
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Digital Scan
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setCurrentPage('custom-shading');
                      window.scrollTo(0, 0);
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Custom Shading
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setCurrentPage('home');
                      setTimeout(() => {
                        const el = document.getElementById('contact');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-8">Social</h4>
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/hivedental/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="mailto:hivedental@gmail.com" 
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500 uppercase tracking-widest">
            <p>© 2024 Hive Dental Laboratory. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-8 right-8 text-white hover:opacity-50 transition-opacity z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X className="w-8 h-8" />
            </motion.button>
            <motion.img
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-full object-contain shadow-2xl"
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
