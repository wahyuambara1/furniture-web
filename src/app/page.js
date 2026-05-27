"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { FaChevronUp, FaChevronDown, FaStar, FaChevronLeft, FaChevronRight, FaMapMarkerAlt } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";
import { MdOutlineClose, MdMenu } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";

// Import Data & Context
import { productsData } from "@/data/products";
import { testimonialsData } from "@/data/testimonials";
import { useLanguage } from "@/context/LanguageContext";

// Import CSS Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const languages = [
  { code: "en", label: "English" },
  { code: "id", label: "Indonesian" },
  { code: "fr", label: "French" }
];

export default function Home() {
  const pathname = usePathname();
  
  // States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [expandedTestimonial, setExpandedTestimonial] = useState(null); 

  const dropdownRef = useRef(null);

  const { locale, changeLanguage, t } = useLanguage();

  const waLink = "https://wa.me/6281238396581";
  
  const readMoreText = locale === 'id' ? "Baca selengkapnya" : locale === 'fr' ? "Lire la suite" : "Read more";
  const readLessText = locale === 'id' ? "Sembunyikan" : locale === 'fr' ? "Réduire" : "Read less";
  const footerTagline = locale === 'id' ? "Menghadirkan kehangatan Bali ke rumah Anda." : locale === 'fr' ? "Apporter la chaleur de Bali dans votre maison." : "Bringing the warmth of Bali to your home.";

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsLangOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let lastScrollValue = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollValue && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      lastScrollValue = currentScrollY;
      setShowBackToTop(currentScrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="font-sans text-gray-800 bg-[#FAF8F5] relative w-full max-w-[100vw] overflow-x-hidden">

      {/* HEADER: px-6 lg:px-20 agar sejajar persis dengan konten di bawahnya */}
      <header className={`sticky top-0 z-50 bg-[#E5C37A] px-6 lg:px-20 py-4 flex justify-between items-center shadow-md transition-transform duration-300 ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"}`}>
        <Link href="/" className="flex items-center gap-2 lg:gap-3 hover:opacity-70 transition cursor-pointer">
          <img src="/logo.png" alt="Bali Furniture Logo" className="w-10 h-10 lg:w-11 lg:h-11 object-contain" />
          <span className="lg:hidden font-extrabold text-xl uppercase tracking-wider leading-[1.2] text-gray-900">
            Bali<br />Furniture
          </span>
          <span className="hidden lg:block font-extrabold text-xl uppercase tracking-widest text-gray-900 mt-0.5">
            BALI FURNITURE
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8 font-semibold relative">
          <Link href="/" className={`${pathname === "/" ? "text-[#9F6301]" : "hover:text-white"} transition`}>{t.menu.home}</Link>
          <Link href="/furniture" className={`${pathname.startsWith("/furniture") ? "text-[#9F6301]" : "hover:text-white"} transition`}>{t.menu.furniture}</Link>
          <Link href="/articles" className={`${pathname.startsWith("/articles") ? "text-[#9F6301]" : "hover:text-white"} transition`}>{t.menu.articles}</Link>
          <Link href="/contact" className={`${pathname === "/contact" ? "text-[#9F6301]" : "hover:text-white"} transition`}>{t.menu.contact}</Link>
          
          <a href={waLink} target="_blank" rel="noreferrer" className="bg-[#C89B3C] text-white px-6 py-2 rounded shadow hover:bg-yellow-700 transition">
            {t.menu.order}
          </a>
          
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-1 hover:text-white transition cursor-pointer font-bold">
              <span className="flex items-center gap-1.5 leading-none">
                {locale.toUpperCase()} {isLangOpen ? <FaChevronUp className="text-[10px]" /> : <FaChevronDown className="text-[10px]" />}
              </span>
            </button>
            
            {isLangOpen && (
              <div className="absolute top-full right-0 mt-6 w-32 bg-[#E5C37A] rounded shadow-lg p-2 flex flex-col gap-2 z-50">
                {languages.map((lang) => (
                  <button 
                    key={lang.code} 
                    onClick={() => handleLanguageChange(lang.code)} 
                    className={`text-left px-2 py-1 rounded transition text-sm ${locale === lang.code ? "bg-[#C89B3C] text-white font-bold" : "hover:bg-[#C89B3C] hover:text-white"}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        <button className="lg:hidden text-3xl" onClick={() => setIsMobileMenuOpen(true)}>
          <MdMenu />
        </button>
      </header>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative w-64 bg-[#E5C37A] h-full p-6 flex flex-col gap-6 shadow-2xl animate-slide-in overflow-y-auto">
            <button className="self-end text-3xl" onClick={() => setIsMobileMenuOpen(false)}>
              <MdOutlineClose />
            </button>
            <nav className="flex flex-col gap-4 font-bold text-lg">
              <Link href="/" className={`${pathname === "/" ? "text-[#9F6301]" : "hover:text-white"} transition`} onClick={() => setIsMobileMenuOpen(false)}>{t.menu.home}</Link>
              <Link href="/furniture" className={`${pathname.startsWith("/furniture") ? "text-[#9F6301]" : "hover:text-white"} transition`} onClick={() => setIsMobileMenuOpen(false)}>{t.menu.furniture}</Link>
              <Link href="/articles" className={`${pathname.startsWith("/articles") ? "text-[#9F6301]" : "hover:text-white"} transition`} onClick={() => setIsMobileMenuOpen(false)}>{t.menu.articles}</Link>
              <Link href="/contact" className={`${pathname === "/contact" ? "text-[#9F6301]" : "hover:text-white"} transition`} onClick={() => setIsMobileMenuOpen(false)}>{t.menu.contact}</Link>
              
              <a href={waLink} className="bg-[#C89B3C] text-white text-center py-2 my-2 rounded hover:bg-yellow-700 transition uppercase">{t.menu.order}</a>
              
              <div>
                <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-1.5 leading-none font-bold w-full text-left">
                  {locale.toUpperCase()} {isLangOpen ? <FaChevronUp className="text-[10px]" /> : <FaChevronDown className="text-[10px]" />}
                </button>
                {isLangOpen && (
                  <div className="flex flex-col gap-3 mt-3 pl-2 text-base font-medium font-sans text-gray-800">
                    {languages.map((lang) => (
                      <button 
                        key={lang.code} 
                        onClick={() => handleLanguageChange(lang.code)} 
                        className={`text-left hover:text-white transition ${locale === lang.code ? "text-white font-bold" : ""}`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="flex flex-col lg:flex-row items-center px-6 lg:px-20 py-10 gap-10 lg:gap-20">
        
        {/* Kolom Teks (Dibuat sedikit lebih kecil: 45%) */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4 flex items-center gap-2">
             {t.hero.title}
          </h2>
          <p className="text-gray-600 leading-relaxed text-justify lg:text-[15px]">
            {t.hero.desc}
          </p>
        </div>
        
        {/* Kolom Banner (Dibuat sedikit lebih besar: 55% dan ditambahkan padding kiri) */}
        <div className="w-full lg:w-[55%] min-w-0 relative group lg:pl-6">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            navigation={{ nextEl: '.banner-next', prevEl: '.banner-prev' }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 15000, disableOnInteraction: false }}
            style={{ 
              "--swiper-pagination-color": "#C89B3C", 
              "--swiper-pagination-bullet-inactive-color": "#999999"
            }}
            className="custom-swiper !pb-12 w-full max-lg:[&_.swiper-button-next]:!hidden max-lg:[&_.swiper-button-prev]:!hidden"
          >
            <SwiperSlide>
              <div className="w-full h-64 lg:h-80 rounded-2xl overflow-hidden bg-[#E5C37A]">
                <img src="/banner-1.png" alt="Discount Banner" className="w-full h-full object-cover" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full h-64 lg:h-80 rounded-2xl overflow-hidden bg-[#E5C37A]">
                <img src="/banner-2.png" alt="New Arrivals" className="w-full h-full object-cover" />
              </div>
            </SwiperSlide>
          </Swiper>

          {/* Panah Minimalis Banner */}
          <button className="banner-prev absolute -left-6 lg:-left-4 top-[calc(50%-24px)] -translate-y-1/2 text-[#C89B3C] hover:text-[#9F6301] transition z-10 hidden lg:flex items-center justify-center cursor-pointer">
            <FaChevronLeft size={36} />
          </button>
          <button className="banner-next absolute -right-112 lg:-right-9 top-[calc(50%-24px)] -translate-y-1/2 text-[#C89B3C] hover:text-[#9F6301] transition z-10 hidden lg:flex items-center justify-center cursor-pointer">
            <FaChevronRight size={36} />
          </button>
        </div>
      </section>

      {/* FURNITURE SECTION */}
      <section className="px-6 lg:px-20 py-10 bg-white">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold flex justify-center items-center gap-2">
            {t.sections.furnTitle}
          </h3>
          <p className="text-gray-500">{t.sections.furnSub}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {productsData.slice(0, 8).map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md p-3 border-[0.5px] border-gray-300 flex flex-col justify-between relative group hover:shadow-md transition">
              
              <Link href={`/furniture/${item.slug}`} className="absolute inset-0 z-10"></Link>

              <div>
                <div className="h-32 lg:h-48 w-full rounded-lg mb-3 overflow-hidden bg-gray-100">
                  <img src={item.img} alt={item[`name_${locale}`]} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                </div>
                <h4 className="font-bold text-sm lg:text-[17px] text-gray-900 group-hover:text-[#9F6301] transition line-clamp-1">
                  {item[`name_${locale}`]}
                </h4>
                <p className="text-[10px] lg:text-[15px] text-gray-500 my-2 line-clamp-2">
                  {item[`desc_${locale}`]}
                </p>
              </div>
              
              <div className="flex justify-between items-center mt-2 relative z-20">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm text-[#C89B3C]">${item.price}</span>
                  <span className="text-xs text-gray-300 line-through font-medium">${item.originalPrice}</span>
                </div>
                <a href={waLink} target="_blank" rel="noreferrer" className="bg-[#C89B3C] text-white text-[10px] lg:text-xs px-2 py-1 lg:px-4 lg:py-2 rounded font-bold hover:bg-yellow-700 transition uppercase">
                  {t.menu.order}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/furniture">
            <button className="border-[1.5px] border-gray-300 px-8 py-2 rounded-lg font-semibold hover:bg-black hover:text-white transition uppercase">
              {t.sections.furnBtn}
            </button>
          </Link>
        </div>
      </section>

      {/* REASON TO CHOOSE US SECTION */}
      <section className="px-6 lg:px-20 py-10 bg-[#FAF8F5]">
        <h3 className="text-2xl font-bold text-center mb-8">
           {t.sections.reasonTitle} <span className="text-[#C89B3C]">{t.sections.reasonHighlight}</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {t.reasons.map((item, index) => (
            <div key={index} className="bg-[#EAE1CA] p-6 rounded-xl text-center shadow flex flex-col items-center">
              <div className="bg-[#C89B3C] w-12 h-12 rounded flex items-center justify-center text-white text-2xl mb-4">✓</div>
              <h4 className="font-bold mb-2 text-[20px] lg:text-[20px] text-gray-900">{item.title}</h4>
              <p className="text-[15px] lg:text-[13px] text-gray-700 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL SLIDER */}
      <section className="px-6 lg:px-20 py-10 bg-white">
        <h3 className="text-2xl font-bold text-center mb-8">
          {t.sections.clientTitle} <span className="text-[#C89B3C]">{t.sections.clientHighlight}</span>
        </h3>
        <div className="relative group w-full">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            navigation={{ nextEl: '.testi-next', prevEl: '.testi-prev' }}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{ 
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            autoplay={{ delay: 15000, disableOnInteraction: false }}
            style={{ 
              "--swiper-pagination-color": "#C89B3C", 
              "--swiper-pagination-bullet-inactive-color": "#999999"
            }}
            className="!pb-12 max-lg:[&_.swiper-button-next]:!hidden max-lg:[&_.swiper-button-prev]:!hidden w-full"
            onSlideChange={() => setExpandedTestimonial(null)} 
          >
            {testimonialsData.map((item) => {
              const isExpanded = expandedTestimonial === item.id;

              return (
                <SwiperSlide key={item.id}>
                  <div className={`border-[1px] border-gray-100 p-6 rounded-2xl bg-[#EAE1CA] flex flex-col text-left overflow-hidden transition-all duration-300 ${isExpanded ? 'h-auto min-h-[280px]' : 'h-[280px]'}`}>
                    <div className="flex items-center gap-4 mb-3">
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-full object-cover" />
                      <div>
                        <h4 className="font-extrabold text-lg text-black leading-tight">{item.name}</h4>
                        <p className="text-sm text-gray-700 mt-1 font-medium">{item.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 mb-3 text-[#E5B83A] text-xl">
                      <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                    </div>
                    
                    <div className="flex flex-col flex-grow">
                      <p className={`text-sm text-gray-800 leading-relaxed font-medium italic transition-all duration-300 ${isExpanded ? '' : 'line-clamp-4'}`}>
                        "{item[`text_${locale}`]}"
                      </p>
                      <button 
                        onClick={() => setExpandedTestimonial(isExpanded ? null : item.id)}
                        className="text-[#9F6301] text-sm font-extrabold mt-2 text-left hover:underline focus:outline-none w-max"
                      >
                        {isExpanded ? readLessText : readMoreText}
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Panah Minimalis Testimoni (Di Luar) */}
          <button className="testi-prev absolute -left-12 top-[calc(50%-24px)] -translate-y-1/2 text-[#C89B3C] hover:text-[#9F6301] transition z-10 hidden lg:flex items-center justify-center cursor-pointer">
            <FaChevronLeft size={36} />
          </button>
          <button className="testi-next absolute -right-12 top-[calc(50%-24px)] -translate-y-1/2 text-[#C89B3C] hover:text-[#9F6301] transition z-10 hidden lg:flex items-center justify-center cursor-pointer">
            <FaChevronRight size={36} />
          </button>
        </div>
      </section>

      {/* MAPS SECTION */}
      <section className="px-6 lg:px-20 py-10 lg:py-20 bg-[#FAF8F5]">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 w-full">
          
          <div className="w-full lg:w-1/2 h-64 lg:h-[400px] rounded-3xl overflow-hidden shadow-md border-4 border-white">
            <iframe src="https://maps.google.com/maps?q=Jl.%20Raya%20Padonan%20No.5,%20Tibubeneng,%20Kec.%20Kuta%20Utara,%20Kabupaten%20Badung,%20Bali%2080361&t=&z=15&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h3 className="text-[23px] lg:text-2xl font-bold mb-6 text-gray-900">
              {t.sections.locTitle} <span className="text-[#C89B3C]">{t.sections.locHighlight}</span>
            </h3>
            <div className="flex items-start gap-4">
              <div className="bg-[#C89B3C] text-white p-3 rounded-full flex-shrink-0 mt-1">
                <FaMapMarkerAlt size={24} />
              </div>
              <p className="text-base lg:text-lg text-gray-700 leading-relaxed font-medium">
                Jl. Raya Padonan No.5, Tibubeneng, Kec. Kuta Utara, Kabupaten Badung, Bali 80361
              </p>
            </div>
          </div>
          
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#EAE1CA] px-6 lg:px-20 py-8 lg:py-12 mt-auto">
        
        {/* Container Utama: Flex Row untuk Mobile, Grid 4 Kolom untuk Desktop */}
        <div className="flex flex-row justify-between lg:grid lg:grid-cols-4 gap-4 lg:gap-12 w-full max-w-7xl mx-auto">
          
          {/* WADAH KIRI (Mobile) - Membungkus Brand dan Alamat */}
          {/* lg:contents akan membuat wadah ini transparan di Desktop sehingga anak-anaknya langsung masuk ke Grid */}
          <div className="flex flex-col gap-6 w-[55%] lg:w-auto lg:contents">
            
            {/* Kolom 1: Brand & Tagline */}
            <div className="flex flex-col gap-1.5 lg:gap-3">
              <h2 className="font-extrabold text-xl lg:text-3xl text-gray-900">Bali Furniture</h2>
              <p className="text-xs lg:text-base font-medium text-gray-800 leading-relaxed">
                {footerTagline}
              </p>
            </div>

            {/* Kolom 2: Address */}
            <div className="flex flex-col gap-1.5 lg:gap-3">
              <h4 className="font-extrabold text-sm lg:text-lg text-gray-900">{t.detail.address}</h4>
              <p className="text-xs lg:text-base leading-relaxed font-medium text-gray-800 pr-2 lg:pr-0">
                Jl. Raya Padonan No.5, Tibubeneng, Kec. Kuta Utara, Kabupaten Badung, Bali 80361
              </p>
            </div>

          </div>

          {/* WADAH KANAN (Mobile) - Membungkus Sosial Media dan Kontak */}
          <div className="flex flex-col gap-4 justify-center w-[45%] pl-2 lg:pl-0 lg:w-auto lg:contents">
            
            {/* Kolom 3: Web & IG */}
            <div className="flex flex-col gap-3 lg:gap-4">
              <a href="#" className="flex items-center gap-2 lg:gap-3 hover:opacity-70 transition">
                <img src="/internet.png" alt="Website" className="w-5 h-5 lg:w-6 lg:h-6 object-contain flex-shrink-0" />
                <span className="text-[10px] sm:text-xs lg:text-base font-medium text-gray-900">balifurniture.com</span>
              </a>
              <a href="#" className="flex items-center gap-2 lg:gap-3 hover:opacity-70 transition">
                <img src="/instagram.png" alt="Instagram" className="w-5 h-5 lg:w-6 lg:h-6 object-contain flex-shrink-0" />
                <span className="text-[10px] sm:text-xs lg:text-base font-medium text-gray-900">balifurniture</span>
              </a>
            </div>

            {/* Kolom 4: WA & Email */}
            <div className="flex flex-col gap-3 lg:gap-4">
              <a href={waLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 lg:gap-3 hover:opacity-70 transition">
                <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5 lg:w-6 lg:h-6 object-contain flex-shrink-0" />
                <span className="text-[10px] sm:text-xs lg:text-base font-medium text-gray-900">+62 888 8888 8888</span>
              </a>
              <a href="mailto:balifurniture@gmail.com" className="flex items-center gap-2 lg:gap-3 hover:opacity-70 transition">
                <img src="/mail.png" alt="Email" className="w-5 h-5 lg:w-6 lg:h-6 object-contain flex-shrink-0" />
                <span className="text-[10px] sm:text-xs lg:text-base font-medium text-gray-900 break-all">balifurniture@gmail.com</span>
              </a>
            </div>

          </div>

        </div>
      </footer>

      {/* FLOATING BUTTONS */}
      <div className="fixed bottom-6 right-6 flex flex-col items-center gap-3 z-50">
        {showBackToTop && (
          <button onClick={scrollToTop} className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition animate-fade-in">
            <FaArrowUp size={20} />
          </button>
        )}
        <a href={waLink} target="_blank" rel="noreferrer" className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-green-600 transition">
          <IoLogoWhatsapp size={32} />
        </a>
      </div>
    </div>
  );
}