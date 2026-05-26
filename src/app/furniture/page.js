"use client";

import { productsData } from "@/data/products";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronUp, FaChevronDown, FaSearch } from "react-icons/fa";
import { MdOutlineClose, MdMenu } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaArrowUp } from "react-icons/fa6";

// Import Terjemahan
import { translations } from "@/locales/translations"; 
import { useLanguage } from "@/context/LanguageContext";

const languages = [
  { code: "en", label: "English" },
  { code: "id", label: "Indonesian" },
  { code: "fr", label: "French" }
];

export default function FurniturePage() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // MENGAMBIL STATE BAHASA DARI CONTEXT
  const languageContext = useLanguage() || {}; 
  const locale = languageContext.locale || 'en';
  const changeLanguage = languageContext.changeLanguage || (() => {});
  const t = languageContext.t || translations[locale];

  const waLink = "https://wa.me/6281238396581";

  // PERBAIKAN: Menggunakan data nama produk sesuai bahasa yang aktif agar tidak error "toLowerCase"
  const filteredProducts = productsData.filter((product) => {
    const productName = product[`name_${locale}`] || "";
    return productName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Logika Back to Top
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsLangOpen(false);
  };

  // Menyesuaikan Teks Placeholder Pencarian
  const searchPlaceholder = locale === 'id' ? "Apa yang sedang Anda cari?" : locale === 'fr' ? "Que cherchez-vous ?" : "What are you looking for?";

  return (
    <div className="font-sans text-gray-800 bg-[#FAF8F5] relative w-full max-w-[100vw] overflow-x-hidden min-h-screen flex flex-col">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#E5C37A] px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Bali Furniture Logo" className="w-10 h-10 object-contain" />
          <Link href="/" className="font-bold text-xl uppercase tracking-wider leading-[1.2] hover:opacity-70 transition cursor-pointer">
            Bali<br/>Furniture
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8 font-semibold relative">
          <Link href="/" className={`${pathname === "/" ? "text-[#9F6301]" : "hover:text-white"} transition`}>{t.menu.home}</Link>
          <Link href="/furniture" className={`${pathname === "/furniture" ? "text-[#9F6301]" : "hover:text-white"} transition`}>{t.menu.furniture}</Link>
          <Link href="/articles" className={`${pathname === "/articles" ? "text-[#9F6301]" : "hover:text-white"} transition`}>{t.menu.articles}</Link>
          <Link href="/contact" className={`${pathname === "/contact" ? "text-[#9F6301]" : "hover:text-white"} transition`}>{t.menu.contact}</Link>
          
          <a href={waLink} target="_blank" rel="noreferrer" className="bg-[#C89B3C] text-white px-6 py-2 rounded shadow hover:bg-yellow-700 transition">
            {t.menu.order}
          </a>
          
          <div className="relative">
            <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-1.5 leading-none hover:text-white transition cursor-pointer font-bold">
              {locale.toUpperCase()} {isLangOpen ? <FaChevronUp className="text-[10px]" /> : <FaChevronDown className="text-[10px]" />}
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
              <Link href="/furniture" className={`${pathname === "/furniture" ? "text-[#9F6301]" : "hover:text-white"} transition`} onClick={() => setIsMobileMenuOpen(false)}>{t.menu.furniture}</Link>
              <Link href="/articles" className={`${pathname === "/articles" ? "text-[#9F6301]" : "hover:text-white"} transition`} onClick={() => setIsMobileMenuOpen(false)}>{t.menu.articles}</Link>
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

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow pb-2">
        {/* Tombol Back */}
                <Link href="/" className="text-gray-500 hover:text-[#C89B3C] font-bold text-m mt-5 ml-6 inline-flex items-center transition relative z-20">
                 {t.detail.back}
                </Link>
        {/* SEARCH BAR SECTION */}
        <div className="pt-7 px-6 max-w-3xl mx-auto">
          <div className="relative w-full shadow-sm rounded-xl">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-full border-[1.5px] border-gray-300 rounded-xl py-4 px-6 pr-12 focus:outline-none focus:border-[#C89B3C] transition font-medium text-gray-700 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          </div>
          
          {/* Teks Hasil Pencarian */}
          {searchQuery && (
            <p className="text-center mt-4 font-bold text-lg text-gray-800">
              {locale === 'id' ? "Hasil pencarian untuk " : locale === 'fr' ? "Résultat de la recherche pour " : "Search result for "}
              <span className="text-[#C89B3C]">{searchQuery}</span>
            </p>
          )}
        </div>

        {/* FURNITURE GRID SECTION */}
        <section className="px-6 lg:px-20 py-5">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {filteredProducts.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm p-3 border-[0.5px] border-gray-300 flex flex-col justify-between relative group hover:shadow-md transition">
                  
                  <Link href={`/furniture/${item.slug}`} className="absolute inset-0 z-10"></Link>

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
                  
                  {/* Bagian Harga dan Tombol ORDER NOW */}
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
          ) : (
            <div className="text-center text-gray-500 py-20 font-medium">
              {locale === 'id' ? `Maaf, furnitur "${searchQuery}" tidak ditemukan.` : locale === 'fr' ? `Désolé, les meubles "${searchQuery}" introuvables.` : `Sorry, furniture "${searchQuery}" not found.`}
            </div>
          )}
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#EAE1CA] px-6 lg:px-20 py-6 flex flex-row justify-between gap-4 text-gray-900 mt-auto">
        <div className="flex flex-col gap-2 w-[55%]">
          <h2 className="font-extrabold text-xl lg:text-3xl">Bali Furniture</h2>
          <p className="text-xs lg:text-base mb-2 font-medium">{t.sections.footerTag}</p>
          <h4 className="font-extrabold text-sm lg:text-lg">Address</h4>
          <p className="text-xs lg:text-base leading-relaxed font-medium pr-2">
            Jl. Raya Padonan No.5,<br />
            Tibubeneng, Kec. Kuta Utara,<br />
            Kabupaten Badung, Bali 80361
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