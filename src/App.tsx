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
  Facebook
} from "lucide-react";
import { useState, useEffect, ReactNode, FormEvent } from "react";

// Types
interface ServiceCategory {
  name: string;
  description: string;
  items: string[];
  icon: ReactNode;
}

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
}

const serviceCategories: ServiceCategory[] = [
  { 
    name: "Fixed Restorations", 
    description: "Premium aesthetic and functional crowns and bridges using the latest materials.",
    items: ["Zirconia (Monolithic/Layered)", "Emax (Lithium Disilicate)", "PFM & PFG", "Full Gold & Metal Crowns"],
    icon: <Sparkles className="w-8 h-8" />
  },
  { 
    name: "Implant Solutions", 
    description: "Precision-engineered implant components for predictable clinical results.",
    items: ["Implant Crowns", "Custom Abutments", "Screw-retained Bridges", "Surgical Guides"],
    icon: <Award className="w-8 h-8" />
  },
  { 
    name: "Removables & Repairs", 
    description: "Durable solutions for partials and urgent laboratory repairs.",
    items: ["Denture Repair", "Relines & Rebasing", "Cast Partial Frameworks", "Acrylic Partials"],
    icon: <ShieldCheck className="w-8 h-8" />
  },
  { 
    name: "Orthodontics & Protection", 
    description: "Custom-fit appliances designed for patient comfort and protection.",
    items: ["Clear Retainers", "Night Guards (Hard/Soft)", "Sports Guards", "Splints"],
    icon: <ShieldCheck className="w-8 h-8" />
  },
];

const galleryItems: GalleryItem[] = [
  { id: 1, title: "Anterior Zirconia", category: "Aesthetic", imageUrl: "https://www.docseducation.com/sites/default/files/inline-images/banner-4_26.jpg?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "Emax Veneers", category: "Aesthetic", imageUrl: "https://media.oralhealthgroup.com/uploads/2017/11/Siu-photos-YN-22.jpg?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "PFM Restoration", category: "Fixed", imageUrl: "https://atlasdental.ca/wp-content/uploads/2023/07/pfm-dental-crown-2.jpg?auto=format&fit=crop&q=80&w=800" },
  { id: 4, title: "Implant Solutions", category: "Implant", imageUrl: "https://i2.wp.com/evolutiondental.net/wp-content/uploads/screw-retained-01.png?w=1184?auto=format&fit=crop&q=80&w=800" },
  { id: 5, title: "Posterior Zirconia", category: "Fixed", imageUrl: "https://www.bremadent.co.uk/uploads/4/8/6/4/48649227/full-contour-zirconia-posterior-crowns_orig.png?auto=format&fit=crop&q=80&w=800" },
  { id: 6, title: "Full Gold Crown", category: "Fixed", imageUrl: "https://atlasdental.ca/wp-content/uploads/2023/07/gold-crown-2-768x513.jpeg?auto=format&fit=crop&q=80&w=800" },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
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
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#1A1A1A] flex items-center justify-center rounded-sm">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <span className="text-xl font-semibold tracking-tight uppercase">Hive Dental Lab</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Services", "About", "Gallery", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium hover:opacity-50 transition-opacity uppercase tracking-widest">
                {item}
              </a>
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
            {["Services", "About", "Gallery", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-light uppercase tracking-widest"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image with Blur */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/30 z-10" />
          <img 
            src="https://picsum.photos/seed/dentallab/1920/1080" 
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
      <section id="services" className="py-32 px-6 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase text-gray-400 mb-4 block">Our Expertise</span>
              <h2 className="text-4xl md:text-6xl font-light leading-tight">Comprehensive Restorative Solutions</h2>
            </div>
            <p className="text-gray-500 max-w-sm text-lg leading-relaxed">
              We combine traditional craftsmanship with digital precision to deliver the highest quality dental restorations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {serviceCategories.map((category, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -5 }}
                className="bg-white p-10 md:p-16 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col h-full"
              >
                <div className="mb-10 text-black">
                  {category.icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-light mb-6">{category.name}</h3>
                <p className="text-gray-500 mb-10 leading-relaxed text-lg">
                  {category.description}
                </p>
                <div className="mt-auto">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                        <div className="w-1.5 h-1.5 bg-black rounded-full shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
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
            <h2 className="text-4xl md:text-6xl font-light leading-tight">Aiden Lee</h2>
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

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
          >
            <AnimatePresence mode="popLayout">
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
            </AnimatePresence>
          </motion.div>
          
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

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm">
                  <span className="text-black font-bold text-lg">H</span>
                </div>
                <span className="text-xl font-semibold tracking-tight uppercase">Hive Dental Lab</span>
              </div>
              <p className="text-gray-400 max-w-sm leading-relaxed">
                Edmonton's premier dental laboratory specializing in aesthetic and restorative excellence. Partnering with clinicians to deliver superior patient outcomes.
              </p>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-8">Navigation</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-8">Social</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500 uppercase tracking-widest">
            <p>© 2024 Hive Dental Lab. All rights reserved.</p>
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
