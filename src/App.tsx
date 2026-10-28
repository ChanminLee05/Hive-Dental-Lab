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
  Menu, 
  X, 
  Award, 
  ShieldCheck, 
  Sparkles,
  ArrowUpRight,
  Mail,
  Instagram,
  Users,
  Camera
} from "lucide-react";
import { useState, useEffect, ReactNode, FormEvent, MouseEvent, TouchEvent } from "react";

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
  aspectRatio?: string;
}

const BeforeAfterSlider = ({ before, after, title, aspectRatio = '4/3' }: BeforeAfter) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isResizing, setIsResizing] = useState(false);

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!isResizing && e.type !== 'touchmove') return;
    
    const container = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
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
        className="relative w-full overflow-hidden rounded-[2rem] cursor-col-resize select-none border border-gray-100 shadow-xl bg-neutral-900"
        style={{ aspectRatio }}
        onMouseMove={handleMove}
        onMouseDown={() => setIsResizing(true)}
        onMouseUp={() => setIsResizing(false)}
        onMouseLeave={() => setIsResizing(false)}
        onTouchStart={() => setIsResizing(true)}
        onTouchEnd={() => setIsResizing(false)}
        onTouchMove={handleMove}
      >
        {/* After Image (Background) */}
        <div className="absolute inset-0">
          <img 
            src={after} 
            alt="After" 
            className="w-full h-full object-cover object-center"
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
            className="w-full h-full object-cover object-center"
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
    items: ["Non-prep Veneers", "Veneers", "Diagnostic Wax-up", "Custom Shading"],
    icon: <Sparkles className="w-8 h-8" />
  },
  { 
    name: "Implant Solutions", 
    description: "Precision-engineered restorations compatible with all major implant systems, backed by dedicated case consultation.",
    items: ["Custom Abutments", "Stock Abutments", "Screw-retained Restorations", "All Major Brands Supported", "Case Planning & Consultation"],
    icon: <Award className="w-8 h-8" />
  },
  { 
    name: "Appliances", 
    description: "Custom-fit appliances designed for patient comfort and protection.",
    items: ["Space Maintainers", "Night Guards (Hard/Soft/Dual)", "Sports Guards", "Essix Retainer"],
    icon: <ShieldCheck className="w-8 h-8" />
  },
];

const beforeAfterCases: BeforeAfter[] = [
  {
    title: "Smile Reconstruction",
    before: "https://res.cloudinary.com/dziihg83k/image/upload/v1782270195/before1_ttvi5w.png",
    after: "https://res.cloudinary.com/dziihg83k/image/upload/v1782270195/after1_dubdjl.png",
    aspectRatio: "16 / 9"
  },
  {
    title: "Smile Reconstruction",
    before: "https://res.cloudinary.com/dziihg83k/image/upload/v1782270694/before2_snypil.png",
    after: "https://res.cloudinary.com/dziihg83k/image/upload/v1782270694/after2_lt7x8t.png",
    aspectRatio: "16 / 9"
  },
  {
    title: "Smile Reconstruction",
    before: "https://res.cloudinary.com/dziihg83k/image/upload/v1782274796/before4_dz9ku4.jpg",
    after: "https://res.cloudinary.com/dziihg83k/image/upload/v1782274795/after4_vobtxn.jpg",
    aspectRatio: "16 / 9"
  },
  {
    title: "Smile Reconstruction",
    before: "https://res.cloudinary.com/dziihg83k/image/upload/v1793226340/DSC_1138_axjhgl.jpg",
    after: "https://res.cloudinary.com/dziihg83k/image/upload/v1793226203/DSC_1273_lxemea.jpg",
    aspectRatio: "16 / 9"
  },
  {
    title: "Smile Reconstruction",
    before: "https://res.cloudinary.com/dziihg83k/image/upload/v1793227036/Gemini_Generated_Image_nm266inm266inm26_c1eptb.jpg",
    after: "https://res.cloudinary.com/dziihg83k/image/upload/v1782272551/after3_w6zncb.png",
    aspectRatio: "7 / 5"
  },
  {
    title: "Implant Final Fixation",
    before: "https://res.cloudinary.com/dziihg83k/image/upload/v1793225453/DSC_0830_hebgnf.jpg",
    after: "https://res.cloudinary.com/dziihg83k/image/upload/v1793225346/DSC_0838_npk4tk.jpg",
    aspectRatio: "7 / 5"
  }
];

interface ScannerSystem {
  id: 'itero' | '3shape' | 'medit' | 'dscore';
  brand: string;
  name: string;
  tagline: string;
  connectionSteps: {
    title: string;
    steps: string[];
    note?: string;
  };
  imageUrl: string;
  imageAlt: string;
}

const scannerSystems: ScannerSystem[] = [
  {
    id: 'itero',
    brand: 'Align Technology',
    name: 'iTero Intraoral Scanner',
    tagline: 'Chairside Connection & Align Cloud Sync',
    connectionSteps: {
      title: 'How to Connect to Hive',
      steps: [
        "Log into your myiTero.com account.",
        "Go to Settings and select Find a Lab.",
        "Search for Hive Dental Lab in the search bar.",
        "Select 'Connect' — once approved, Hive Dental Lab will be permanently saved to your preferred lab list."
      ]
    },
    imageUrl: 'https://dentistry.co.uk/app/uploads/2025/04/align-april.jpg?auto=format&fit=crop&q=80&w=800',
    imageAlt: 'iTero Intraoral Scanner setup'
  },
  {
    id: '3shape',
    brand: '3Shape TRIOS',
    name: '3Shape TRIOS Scanner',
    tagline: '3Shape Communicate & Unite Cloud Ecosystem',
    connectionSteps: {
      title: 'How to Connect to Hive',
      steps: [
        "Log into your 3Shape Communicate account.",
        "Go to Connections and select Add Connection.",
        "Search for Hive Dental Lab in the search bar.",
        "Select 'Connect' — once approved, Hive Dental Lab will be permanently saved to your preferred lab list."
      ],
      note: "Need direct assistance? Call (780) 433-0770 or email hivedental@gmail.com and we can send an instant connection invite."
    },
    imageUrl: 'https://www.mackenziedentalcentre.com/uploads/upload/review-tooth.jpg?auto=format&fit=crop&q=80&w=800',
    imageAlt: '3Shape TRIOS setup'
  },
  {
    id: 'medit',
    brand: 'Medit Link',
    name: 'Medit Link',
    tagline: 'Cloud Partnership for Medit Scanners',
    connectionSteps: {
      title: 'How to Connect to Hive',
      steps: [
        "Log into your Medit Link account (meditlink.com).",
        "In the navigation menu, select Partners and click Search Partners.",
        "Search for Hive Dental Lab in the search bar.",
        "Select 'Request Partnership' — once accepted, Hive Dental Lab will be permanently connected."
      ],
      note: "Let us know once requested so our team can immediately accept and activate your clinic's partnership."
    },
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800',
    imageAlt: 'Medit intraoral scanner workflow'
  },
  {
    id: 'dscore',
    brand: 'Dentsply Sirona',
    name: 'DS Core & Primescanner',
    tagline: 'Fast Cloud Workflow: Primescan & Omnicam',
    connectionSteps: {
      title: 'How to Connect to Hive',
      steps: [
        "Log into your DS Core account at dscore.com.",
        "Navigate to Partners or Laboratories from the portal dashboard.",
        "Search for Hive Dental Lab in the search bar.",
        "Select 'Connect' — once approved, Hive Dental Lab will be permanently linked to your practice."
      ]
    },
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    imageAlt: 'DS Core and Primescan scanning'
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'digital-scan' | 'custom-shading'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scannerFilter, setScannerFilter] = useState<'all' | 'itero' | '3shape' | 'medit' | 'dscore'>('all');

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

  const navigateToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    if (currentPage === 'home') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    setCurrentPage('home');
    const startTime = Date.now();
    const interval = setInterval(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        clearInterval(interval);
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      } else if (Date.now() - startTime > 2500) {
        clearInterval(interval);
      }
    }, 30);
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
          <div className="relative h-16 w-36 md:w-44 lg:w-64 flex items-center shrink-0">
            <img 
              src="https://res.cloudinary.com/dziihg83k/image/upload/v1776735331/%EC%9D%B4%EA%B1%B0_%EB%B0%B1%EA%B7%B8%EB%9D%BC%EC%9A%B4%EB%93%9C_%ED%88%AC%EB%AA%85%ED%95%98%EA%B2%8C_202604201934-removebg-preview_odr6mg.png" 
              alt="Hive Dental Laboratory" 
              className="absolute left-0 h-20 md:h-28 lg:h-36 w-auto object-contain cursor-pointer transition-all duration-300 hover:scale-105 mix-blend-multiply origin-left"
              onClick={() => { setCurrentPage('home'); window.scrollTo(0, 0); }}
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2.5 lg:gap-5 xl:gap-8 shrink-0">
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
                    navigateToSection(item.toLowerCase());
                  }
                }}
                className="text-xs lg:text-sm font-medium hover:opacity-50 transition-opacity uppercase tracking-wider lg:tracking-widest whitespace-nowrap opacity-100"
              >
                {item}
              </button>
            ))}
            <a 
              href="tel:7804330770" 
              className="bg-[#1A1A1A] text-white px-3.5 lg:px-6 py-2 text-xs lg:text-sm font-medium rounded-full hover:bg-opacity-80 transition-all whitespace-nowrap shrink-0"
            >
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
                  if (item === "Digital Scan") {
                    setIsMenuOpen(false);
                    setCurrentPage('digital-scan');
                    window.scrollTo(0, 0);
                  } else if (item === "Custom Shading") {
                    setIsMenuOpen(false);
                    setCurrentPage('custom-shading');
                    window.scrollTo(0, 0);
                  } else {
                    navigateToSection(item.toLowerCase());
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
            <h1 className="text-[2.15rem] xs:text-4xl sm:text-6xl md:text-8xl font-light text-white leading-[1.15] tracking-tight mb-8">
              <span className="block whitespace-nowrap">Crafting Smiles</span>
              <span className="block italic font-serif">with Excellence</span>
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
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
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
              "Prosthetics are essentially a part of the human body that restores health and brings smiles back to people's faces."
            </p>
            <div className="space-y-6 text-gray-500 leading-relaxed">
              <p>
                When teeth fail to function properly, it can cause discomfort in daily life and lead to both physical health issues and psychological distress.
              </p>
              <p>
                Anterior teeth must look as natural and beautiful as one's own to give people a happy smile and the confidence to speak freely. On the other hand, posterior teeth must fully perform their functional duty—allowing proper chewing so that internal organs can digest food efficiently and absorb essential nutrients.
              </p>
              <p>
                Throughout my life as a dental technician, these are the truths I have realized from meeting, listening to, and conversing with countless patients. These experiences have naturally shaped my personal philosophy and professional outlook.
              </p>
              <p>
                At Hive Dental Lab, every single member of our team pours their heart, soul, and passion into every individual tooth, driven by the mission to deliver health and joyful smiles to our patients.
              </p>
            </div>
            <div className="pt-6">
              <button 
                onClick={() => {
                  const el = document.getElementById('services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest group hover:opacity-70 transition-opacity"
              >
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
          <div className="text-center mb-24">
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-gray-400 mb-4 block">Portfolio</span>
            <h2 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">Clinical Excellence</h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              Experience the transformations. Drag the sliders left and right to compare our precise restorations and aesthetic results before and after.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-20">
            {beforeAfterCases.map((pair, idx) => (
              <motion.div
                key={`ba-${idx}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="space-y-4"
              >
                <BeforeAfterSlider {...pair} />
              </motion.div>
            ))}
          </div>
          
          <div className="mt-32 text-center">
            <button 
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center gap-4 mx-auto text-sm font-bold uppercase tracking-[0.3em] hover:opacity-50 transition-all"
            >
              Consult with our Experts
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <span className="text-xs font-bold tracking-[0.4em] uppercase text-gray-400 mb-4 block">Contact Us</span>
              <h2 className="text-[1.75rem] xs:text-3xl sm:text-5xl md:text-6xl font-light leading-tight mb-8 sm:mb-12">
                <span className="block">Let's build something</span>
                <span className="block italic font-serif">extraordinary together.</span>
              </h2>
              
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
                    <h4 className="font-medium mb-1.5 uppercase tracking-widest text-xs text-gray-400">Phone</h4>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded">Office</span>
                        <a href="tel:7804330770" className="text-lg hover:underline">(780) 433-0770</a>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded">Mobile</span>
                        <a href="tel:7802467797" className="text-lg hover:underline">(780) 246-7797</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 uppercase tracking-widest text-xs text-gray-400">Hours</h4>
                    <p className="text-sm xs:text-base sm:text-lg whitespace-nowrap">Mon — Fri: 8:00 AM - 4:30 PM</p>
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
          transition={{ duration: 0.3 }}
          className="pt-32"
        >
          {/* Digital Scan Hero */}
          <section className="py-12 sm:py-20 md:py-24 px-5 sm:px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div>
                  <span className="text-xs font-bold tracking-[0.4em] uppercase text-gray-400 mb-4 sm:mb-6 block">Digital Workflow</span>
                  <h1 className="text-[1.65rem] xs:text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light leading-[1.15] md:leading-tight mb-6 md:mb-8">
                    <span className="block whitespace-nowrap">Connecting Your Clinic</span>
                    <span className="block italic font-serif text-black whitespace-nowrap">to Hive Dental Lab</span>
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-gray-500 mb-8 md:mb-10 leading-relaxed max-w-2xl">
                    <span className="md:block">Start sending your digital impressions to our lab in a few steps.</span>{' '}
                    <span className="md:block">We support all major intraoral scanners.</span>
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button 
                      onClick={() => navigateToSection('contact')}
                      className="w-full sm:w-auto text-center bg-black text-white px-7 py-3.5 sm:px-8 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-opacity-80 transition-all cursor-pointer"
                    >
                      Request Consultation
                    </button>
                    <a href="tel:7804330770" className="w-full sm:w-auto text-center border border-gray-200 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-gray-50 transition-all">
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
          <section className="py-12 sm:py-20 md:py-28 px-4 sm:px-6 bg-[#F9F9F9]">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-10 sm:mb-16">
                <span className="text-xs font-bold tracking-[0.4em] uppercase text-[#5A5A40] mb-4 block">Digital Scans & Integration</span>
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-light tracking-tight mb-4 sm:mb-6">Compatible Scanners</h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-light leading-relaxed">
                  Hive Dental Lab seamlessly integrates with all major intraoral scanners.
                </p>

                {/* Unified System Filter Tabs */}
                <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 mt-6 sm:mt-10">
                  <button
                    onClick={() => setScannerFilter('all')}
                    className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wider sm:tracking-widest uppercase transition-all duration-300 border ${
                      scannerFilter === 'all'
                        ? 'bg-black text-white border-black shadow-md shadow-black/10'
                        : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    All Scanners
                  </button>
                  {scannerSystems.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setScannerFilter(s.id)}
                      className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wider sm:tracking-widest uppercase transition-all duration-300 border ${
                        scannerFilter === s.id
                          ? 'bg-black text-white border-black shadow-md shadow-black/10'
                          : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {s.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scanner Cards Showcase */}
              <div className="space-y-8 sm:space-y-16 md:space-y-24">
                {scannerSystems
                  .filter((s) => scannerFilter === 'all' || scannerFilter === s.id)
                  .map((scanner) => (
                    <motion.div
                      key={scanner.id}
                      id={`scanner-${scanner.id}`}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.6 }}
                      className="bg-white rounded-3xl md:rounded-[2.5rem] p-5 sm:p-8 md:p-12 lg:p-16 border border-gray-100 shadow-sm relative overflow-hidden"
                    >
                      {/* Header Row */}
                      <div className="pb-5 sm:pb-8 border-b border-gray-100 mb-6 sm:mb-10">
                        <div className="space-y-2 sm:space-y-3">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#5A5A40] bg-[#F5F5F0] px-3 py-1 rounded-full whitespace-nowrap">
                              {scanner.brand}
                            </span>
                            <span className="text-[10px] sm:text-[11px] font-medium text-gray-400 uppercase tracking-wider sm:tracking-widest">
                              {scanner.tagline}
                            </span>
                          </div>
                          <h3 className="text-2xl sm:text-3xl md:text-5xl font-light tracking-tight text-black">
                            {scanner.name}
                          </h3>
                        </div>
                      </div>

                      {/* Main Grid: Steps & Media */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                        {/* Instructions Column (7 cols) */}
                        <div className="lg:col-span-7 space-y-6">
                          {/* Connection Protocol */}
                          <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#5A5A40] whitespace-nowrap">
                                Connection Guide
                              </span>
                              <div className="h-[1px] w-5 sm:w-6 bg-gray-200" />
                              <h4 className="text-lg sm:text-xl md:text-2xl font-light text-black">
                                {scanner.connectionSteps.title}
                              </h4>
                            </div>

                            <div className="space-y-2.5 sm:space-y-3.5 pt-2">
                              {scanner.connectionSteps.steps.map((step, sIdx) => (
                                <div
                                  key={sIdx}
                                  className="flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 md:p-5 rounded-2xl bg-[#FAFAFA] border border-gray-100 hover:border-gray-200 transition-colors"
                                >
                                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black text-white text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                                    {sIdx + 1}
                                  </span>
                                  <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed font-light">
                                    {step}
                                  </p>
                                </div>
                              ))}

                              {scanner.connectionSteps.note && (
                                <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-amber-900 text-xs sm:text-sm leading-relaxed font-light flex items-start gap-2.5 sm:gap-3 mt-3 sm:mt-4">
                                  <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                                  <span>{scanner.connectionSteps.note}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Image Column (5 cols) - Clean, pristine photo without text overlay */}
                        <div className="lg:col-span-5">
                          <div className="relative aspect-[4/3] lg:aspect-[4/3.8] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md sm:shadow-lg border border-gray-100 bg-gray-50 group">
                            <img
                              src={scanner.imageUrl}
                              alt={scanner.imageAlt}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </section>

          {/* Help Section */}
          <section className="py-14 sm:py-24 md:py-32 px-4 sm:px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="bg-[#1A1A1A] text-white p-7 sm:p-14 md:p-24 rounded-3xl md:rounded-[3rem] relative overflow-hidden">
                <div className="relative z-10 max-w-2xl mx-auto text-center">
                  <span className="text-xs font-bold tracking-[0.4em] uppercase text-gray-400 mb-4 sm:mb-6 block">Support</span>
                  <h2 className="text-3xl sm:text-4xl md:text-6xl font-light mb-6 md:mb-8">Need Help?</h2>
                  <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-12 max-w-md mx-auto">We're available to assist you with scanner setup or any technical questions.</p>
                  
                  <div className="pt-8 sm:pt-12 border-t border-white/10">
                    <a 
                      href="mailto:hivedental@gmail.com" 
                      className="text-lg sm:text-2xl md:text-3xl font-light hover:text-gray-400 transition-colors break-all tracking-tight"
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
          transition={{ duration: 0.3 }}
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
                      onClick={() => navigateToSection('contact')}
                      className="bg-black text-white px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-opacity-80 transition-all text-center shadow-lg shadow-black/10 cursor-pointer"
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
                      onClick={() => navigateToSection('contact')}
                      className="inline-block bg-white text-black px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-all cursor-pointer"
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
                    onClick={() => navigateToSection('services')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigateToSection('about')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigateToSection('gallery')}
                    className="hover:text-white transition-colors cursor-pointer"
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
                    className="hover:text-white transition-colors cursor-pointer"
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
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Custom Shading
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigateToSection('contact')}
                    className="hover:text-white transition-colors cursor-pointer"
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
            <p>© {new Date().getFullYear()} Hive Dental Laboratory. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
