"use client";

import { productsData } from "@/data/products";
import React, { useState, useEffect, use, useRef } from "react"; 
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { MdOutlineClose, MdMenu } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { useLanguage } from "@/context/LanguageContext";

const languages = [
  { code: "en", label: "English" },
  { code: "id", label: "Indonesian" },
  { code: "fr", label: "French" }
];

export default function ProductDetail({ params }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  const { locale, changeLanguage, t } = useLanguage();

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsLangOpen(false);
  };

  const dropdownRef = useRef(null);

  // Terjemahan Tagline Baru
  const footerTagline = locale === 'id' ? "Di mana kenyamanan bertemu keanggunan." : locale === 'fr' ? "Où le confort rencontre l'élégance." : "Where comfort meets elegance.";

  // Logika untuk menutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const resolvedParams = use(params);
  const productSlug = resolvedParams.slug; 
  const product = productsData.find((p) => p.slug === productSlug);

  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (product) {
      setMainImage(product.img);
    }
  }, [product]);

  const waLink = "https://wa.me/6281238396581";

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center font-bold text-2xl gap-4 bg-[#FAF8F5]">
        {t.detail.notFound}
        <Link href="/furniture" className="bg-[#C89B3C] text-white text-sm px-6 py-2 rounded-lg hover:bg-yellow-700 transition">
          {t.detail.backToCatalog}
        </Link>
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-800 bg-[#FAF8F5] relative w-full max-w-[100vw] overflow-x-hidden min-h-screen flex flex-col">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#E5C37A] px-6 lg:px-20 py-4 flex justify-between items-center shadow-md">
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
          
          {/* Wadah Dropdown Language */}
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
              <a href={waLink} className="bg-[#C89B3C] text-white text-center py-2 my-2 rounded hover:bg-yellow-700 transition">{t.menu.order}</a>
              
              <div>
                <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-1.5 leading-none font-bold w-full text-left uppercase">
                  {locale} {isLangOpen ? <FaChevronUp className="text-[10px]" /> : <FaChevronDown className="text-[10px]" />}
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

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow pb-10">
        
        {/* Tombol Back */}
        <div className="max-w-6xl mx-auto w-full px-6 pt-6">
          <Link href="/furniture" className="text-gray-500 hover:text-[#C89B3C] font-bold text-base inline-flex items-center transition relative z-20">
            {t.detail.back}
          </Link>
        </div>

        {/* DETAIL PRODUCT SECTION (Desktop Sampingan, Mobile Bawah) */}
        <section className="px-6 py-6 lg:py-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* KOLOM KIRI: Gambar Utama & Thumbnails */}
          <div className="w-full lg:w-[45%] flex flex-col gap-4">
            <div className="w-full h-80 lg:h-[450px] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
              <img src={mainImage} alt={product[`name_${locale}`]} className="w-full h-full object-cover transition-all duration-500" />
            </div>

            <div className="flex gap-3 overflow-x-auto py-2 px-1 scrollbar-hide">
              {product.thumbnails.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setMainImage(img)} 
                  className={`flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden border-[2.5px] transition-all duration-300 ${mainImage === img ? "border-[#C89B3C] scale-105 shadow-md" : "border-transparent hover:border-gray-300"}`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* KOLOM KANAN: Detail Info & Tombol Order di dalam Kotak Putih (Desktop) */}
          <div className="w-full lg:w-[55%] flex flex-col">
            <div className="lg:bg-white lg:shadow-sm lg:border lg:border-gray-200 lg:rounded-2xl lg:p-8 flex flex-col h-full">
              
              <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight">
                {product[`name_${locale}`]}
              </h2>
              
              <div className="flex items-center gap-3 mt-3 mb-6">
                <span className="font-extrabold text-2xl lg:text-3xl text-[#C89B3C]">${product.price}</span>
                <span className="text-base lg:text-lg text-gray-400 line-through font-semibold">${product.originalPrice}</span>
              </div>
              
              {/* Garis Pemisah (Hanya terlihat di Desktop) */}
              <div className="w-full h-[1px] bg-gray-100 hidden lg:block mb-6"></div>
              
              <p className="text-sm lg:text-base text-gray-600 leading-relaxed text-justify font-medium whitespace-pre-wrap flex-grow">
                {product[`longDesc_${locale}`]}
              </p>

              {/* Tombol ORDER NOW Khusus Desktop (berada di dalam kotak) */}
              <div className="mt-8 hidden lg:block">
                <a href={waLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center bg-[#C89B3C] text-white px-8 py-3 rounded-xl font-bold hover:bg-yellow-700 transition shadow-md uppercase text-sm tracking-wide">
                  {t.menu.order}
                </a>
              </div>
              
            </div>
          </div>
        </section>

        {/* OTHER RECOMMENDATIONS */}
        <section className="px-6 py-10 max-w-6xl mx-auto border-t mt-4 border-gray-200">
          <h3 className="font-extrabold text-xl lg:text-2xl mb-6 text-gray-900">{t.detail.otherRecs}</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {productsData
              .filter((item) => item.slug !== product.slug) 
              .slice(0, 4) 
              .map((item) => (
              <div key={item.slug} className="bg-white rounded-xl shadow-sm p-3 border-[0.5px] border-gray-300 flex flex-col justify-between relative group hover:shadow-md transition">
                
                <Link href={`/furniture/${item.slug}`} className="absolute inset-0 z-10"></Link>
                
                <div>
                  <div className="h-32 lg:h-48 w-full rounded-lg mb-3 overflow-hidden bg-gray-100">
                    <img src={item.img} alt={item[`name_${locale}`]} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <h4 className="font-bold text-sm lg:text-base text-gray-900 group-hover:text-[#9F6301] transition">{item[`name_${locale}`]}</h4>
                  <p className="text-[10px] lg:text-xs text-gray-500 my-2 line-clamp-2">{item[`desc_${locale}`]}</p>
                </div>
                <div className="flex justify-between items-center mt-2 relative z-20">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm text-[#C89B3C]">${item.price}</span>
                    <span className="text-[10px] text-gray-400 line-through font-medium">${item.originalPrice}</span>
                  </div>
                  <a href={waLink} target="_blank" rel="noreferrer" className="bg-[#C89B3C] text-white text-[10px] lg:text-xs px-2 py-1 lg:px-4 lg:py-2 rounded font-bold hover:bg-yellow-700 transition uppercase">
                    {t.menu.order}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

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

      {/* STICKY ORDER NOW BAR (Dihilangkan pada mode Desktop karena sudah ada di kotak putih) */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.1)] border-t border-gray-200 px-6 py-3 flex justify-between items-center z-[55] lg:hidden">
        <div className="flex flex-col">
          <h4 className="font-extrabold text-sm text-gray-900 leading-tight">{product[`name_${locale}`]}</h4>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-extrabold text-base text-[#C89B3C]">${product.price}</span>
            <span className="text-[11px] text-gray-400 line-through font-semibold">${product.originalPrice}</span>
          </div>
        </div>
        <a href={waLink} target="_blank" rel="noreferrer" className="bg-[#C89B3C] text-white px-6 py-2.5 rounded-lg font-bold hover:bg-yellow-700 transition shadow-md text-sm uppercase">
          {t.menu.order}
        </a>
      </div>

      {/* FLOATING BACK TO TOP BUTTON */}
      <div className="fixed bottom-20 lg:bottom-6 right-6 flex flex-col items-center gap-3 z-50">
        {showBackToTop && (
          <button onClick={scrollToTop} className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition animate-fade-in opacity-80 hover:opacity-100">
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