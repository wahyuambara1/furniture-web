"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaChevronUp, FaChevronDown, FaStar } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";
import { MdOutlineClose, MdMenu } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css/pagination";

// Import Data & Context
import { productsData } from "@/data/products";
import { testimonialsData } from "@/data/testimonials";
import { translations } from "@/locales/translations"; // Import langsung dari sumber
import { useLanguage } from "@/context/LanguageContext";

// Import CSS Swiper
import "swiper/css";
import "swiper/css/navigation";

const languages = [
  { code: "en", label: "English" },
  { code: "id", label: "Indonesian" },
  { code: "fr", label: "French" }
];


export default function Home() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  // State untuk fitur Read More di Testimoni
  const [expandedTestimonial, setExpandedTestimonial] = useState(null);
  // State untuk kontrol visibilitas Header
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // MENGAMBIL STATE BAHASA DARI CONTEXT
  const languageContext = useLanguage() || {}; 
  const locale = languageContext.locale || 'en';
  const changeLanguage = languageContext.changeLanguage || (() => {});
  
  // Mengambil kamus secara dinamis dan aman
  const t = languageContext.t || translations[locale];

  const waLink = "https://wa.me/6281238396581";

  const readMoreText = locale === 'id' ? "Baca selengkapnya" : locale === 'fr' ? "Lire la suite" : "Read more";
  const readLessText = locale === 'id' ? "Sembunyikan" : locale === 'fr' ? "Réduire" : "Read less";

  // Logika Scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Logika menyembunyikan/menampilkan header
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false); // Sembunyikan saat scroll turun
      } else {
        setIsHeaderVisible(true);  // Munculkan saat scroll naik
      }
      setLastScrollY(currentScrollY);

      // Logika Floating Back to Top Button
      setShowBackToTop(currentScrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]); // Jangan lupa tambahkan [lastScrollY] di sini

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsLangOpen(false);
  };

  return (
    <div className="font-sans text-gray-800 bg-[#FAF8F5] relative w-full max-w-[100vw] overflow-x-hidden">
      
      {/* HEADER */}
      <header className={`sticky top-0 z-50 bg-[#E5C37A] px-6 py-4 flex justify-between items-center shadow-md transition-transform duration-300 ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Bali Furniture Logo" className="w-10 h-10 object-contain" />
          <Link href="/" className="font-bold text-xl uppercase tracking-wider leading-[1.2] hover:opacity-70 transition cursor-pointer">
            Bali<br/>Furniture
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8 font-semibold relative">
          <Link href="/" className={`${pathname === "/" ? "text-[#9F6301]" : "hover:text-white"} transition`}>{t.menu.home}</Link>
          <Link href="/furniture" className={`${pathname.includes("/furniture") ? "text-[#9F6301]" : "hover:text-white"} transition`}>{t.menu.furniture}</Link>
          <Link href="/articles" className={`${pathname.includes("/articles") ? "text-[#9F6301]" : "hover:text-white"} transition`}>{t.menu.articles}</Link>
          <Link href="/contact" className={`${pathname === "/contact" ? "text-[#9F6301]" : "hover:text-white"} transition`}>{t.menu.contact}</Link>
          
          <a href={waLink} target="_blank" rel="noreferrer" className="bg-[#C89B3C] text-white px-6 py-2 rounded shadow hover:bg-yellow-700 transition">
            {t.menu.order}
          </a>
          
          {/* Menu Bahasa Desktop */}
          <div className="relative">
            <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-1 hover:text-white transition cursor-pointer font-bold">
              <span className="flex items-center gap-1.5 leading-none">
                {locale.toUpperCase()} {isLangOpen ? <FaChevronUp className="text-[10px]" /> : <FaChevronDown className="text-[10px]" />}
              </span>
            </button>
            
            {isLangOpen && (
              <div className="absolute top-full right-0 mt-2 w-32 bg-[#E5C37A] rounded shadow-lg p-2 flex flex-col gap-2 z-50">
                {languages.map((lang) => (
  <button 
    key={lang.code} 
    onClick={() => handleLanguageChange(lang.code)} 
    className={`text-left px-2 py-1 hover:bg-[#C89B3C] hover:text-white rounded transition text-sm ${locale === lang.code ? "bg-[#C89B3C] text-white font-bold" : ""}`}
  >
    {lang.label}
  </button>
))}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Hamburger Icon */}
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
    className={`text-left px-2 py-1 hover:bg-[#C89B3C] hover:text-white rounded transition text-sm ${locale === lang.code ? "bg-[#C89B3C] text-white font-bold" : ""}`}
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
      <section className="flex flex-col lg:flex-row items-center px-6 lg:px-20 py-10 gap-10">
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-bold mb-4 flex items-center gap-2">
             {t.hero.title}
          </h2>
          <p className="text-gray-600 leading-relaxed text-justify">
            {t.hero.desc}
          </p>
        </div>
        
        {/* Banner Auto Slider */}
        {/* Banner Auto Slider */}
        <div className="w-full lg:w-1/2 min-w-0">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 15000, disableOnInteraction: false }}
            // MENGUBAH WARNA TITIK MENJADI EMAS
            style={{ "--swiper-pagination-color": "#C89B3C", "--swiper-pagination-bullet-inactive-color": "#999999" }}
            // MENAMBAHKAN !pb-12 AGAR ADA RUANG UNTUK TITIK DI BAWAH
            className="!pb-12 w-full max-lg:[&_.swiper-button-next]:!hidden max-lg:[&_.swiper-button-prev]:!hidden"
          >
            <SwiperSlide>
              {/* PENGATURAN TINGGI (h-64 lg:h-80) DIPINDAH KE SINI AGAR RAPI */}
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
          {productsData.slice(0, 4).map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md p-3 border-[0.5px] border-gray-300 flex flex-col justify-between relative group hover:shadow-md transition">
              
              <Link href={`/detail/${item.slug}`} className="absolute inset-0 z-10"></Link>

              <div>
                <div className="h-32 lg:h-48 w-full rounded-lg mb-3 overflow-hidden bg-gray-100">
                  <img src={item.img} alt={item[`name_${locale}`]} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                </div>
                {/* DATA PRODUK DINAMIS BERDASARKAN BAHASA */}
                <h4 className="font-bold text-m lg:text-base text-gray-900 group-hover:text-[#9F6301] transition line-clamp-1">
                  {item[`name_${locale}`]}
                </h4>
                <p className="text-[11.5px] lg:text-xs text-gray-500 my-2 line-clamp-2">
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
              <h4 className="font-bold mb-2 text-[20px] lg:text-base text-gray-900">{item.title}</h4>
              <p className="text-[15px] lg:text-xs text-gray-700 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

    {/* TESTIMONIAL SLIDER */}
      <section className="px-6 lg:px-20 py-10 bg-white">
        <h3 className="text-2xl font-bold text-center mb-8">
          {t.sections.clientTitle} <span className="text-[#C89B3C]">{t.sections.clientHighlight}</span>
        </h3>
        <div className="max-w-4xl mx-auto">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{ 768: { slidesPerView: 2 } }}
            autoplay={{ delay: 15000, disableOnInteraction: false }}
            style={{ "--swiper-pagination-color": "#C89B3C", "--swiper-pagination-bullet-inactive-color": "#999999" }}
            className="!pb-12 max-lg:[&_.swiper-button-next]:!hidden max-lg:[&_.swiper-button-prev]:!hidden"
            // INI PENTING: Menutup read more saat slider digeser
            onSlideChange={() => setExpandedTestimonial(null)} 
          >
            {testimonialsData.map((item) => {
              const isExpanded = expandedTestimonial === item.id;

              return (
                <SwiperSlide key={item.id}>
                  
                  {/* LOGIKA WADAH: Jika tidak di-expand, tinggi kaku 280px. Jika di-expand, tinggi menyesuaikan (h-auto) */}
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
                    
                    {/* LOGIKA TEKS & TOMBOL READ MORE */}
                    <div className="flex flex-col flex-grow">
                      {/* Jika tidak di-expand, potong teks maksimal 4 baris (line-clamp-4) */}
                      <p className={`text-sm text-gray-800 leading-relaxed font-medium italic transition-all duration-300 ${isExpanded ? '' : 'line-clamp-4'}`}>
                        "{item[`text_${locale}`]}"
                      </p>
                      
                      {/* Tombol Toggle */}
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
        </div>
      </section>
      
      {/* MAPS SECTION */}
      <section className="px-6 lg:px-20 py-10 bg-[#FAF8F5]">
        <h3 className="text-2xl font-bold text-center mb-2">
          {t.sections.locTitle} <span className="text-[#C89B3C]">{t.sections.locHighlight}</span>
        </h3>
        <p className="text-center text-sm text-gray-600 mb-8 flex items-center justify-center gap-2">
          Jl. Raya Padonan No.5, Tibubeneng, Kec. Kuta Utara, Kabupaten Badung, Bali 80361
        </p>
        <div className="w-full h-64 lg:h-96 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
          <iframe src="https://maps.google.com/maps?q=Jl.%20Raya%20Padonan%20No.5,%20Tibubeneng,%20Kec.%20Kuta%20Utara,%20Kabupaten%20Badung,%20Bali%2080361&t=&z=15&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#EAE1CA] px-6 lg:px-20 py-6 flex flex-row justify-between gap-4 text-gray-900">
        <div className="flex flex-col gap-2 w-[55%]">
          <h2 className="font-extrabold text-xl lg:text-3xl">Bali Furniture</h2>
          <p className="text-xs lg:text-base mb-2 font-medium">{t.sections.footerTag}</p>
          <h4 className="font-extrabold text-sm lg:text-lg">Address</h4>
          <p className="text-xs lg:text-base leading-relaxed font-medium pr-2">
            Jl. Raya Padonan No.5,<br />Tibubeneng, Kec. Kuta Utara,<br />Kabupaten Badung, Bali 80361
          </p>
        </div>
        <div className="flex flex-col gap-3 justify-center w-[45%] pl-2 lg:pl-10">
          <a href="#" className="flex items-center gap-2 hover:opacity-70 transition">
            <img src="/internet.png" alt="Website" className="w-5 h-5 lg:w-8 lg:h-8 object-contain" />
            <span className="text-[10px] sm:text-xs lg:text-lg font-medium break-all">balifurniture.com</span>
          </a>
          <a href="#" className="flex items-center gap-2 hover:opacity-70 transition">
            <img src="/instagram.png" alt="Instagram" className="w-5 h-5 lg:w-8 lg:h-8 object-contain" />
            <span className="text-[10px] sm:text-xs lg:text-lg font-medium">balifurniture</span>
          </a>
          <a href={waLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:opacity-70 transition">
            <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5 lg:w-8 lg:h-8 object-contain" />
            <span className="text-[10px] sm:text-xs lg:text-lg font-medium">+62 888 8888 8888</span>
          </a>
          <a href="mailto:balifurniture@gmail.com" className="flex items-center gap-2 hover:opacity-70 transition">
            <img src="/mail.png" alt="Email" className="w-5 h-5 lg:w-8 lg:h-8 object-contain" />
            <span className="text-[10px] sm:text-xs lg:text-lg font-medium break-all">balifurniture@gmail.com</span>
          </a>
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