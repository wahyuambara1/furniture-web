"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { MdOutlineClose, MdMenu } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaArrowUp } from "react-icons/fa6";

// IMPORT DATA DAN CONTEXT
import { articlesData } from "@/data/articles";
import { useLanguage } from "@/context/LanguageContext";

const languages = [
  { code: "en", label: "English" },
  { code: "id", label: "Indonesian" },
  { code: "fr", label: "French" }
];

export default function ArticleDetail({ params }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // AMBIL STATE BAHASA GLOBAL
  const { locale, changeLanguage, t } = useLanguage();

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsLangOpen(false);
  };

  const resolvedParams = use(params);
  const articleSlug = resolvedParams.slug;
  const article = articlesData.find((a) => a.slug === articleSlug);

  const waLink = "https://wa.me/6281238396581";

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center font-bold text-2xl gap-4 bg-[#FAF8F5]">
        {t.detail.notFound || "Article Not Found!"}
        <Link href="/articles" className="bg-[#C89B3C] text-white text-sm px-6 py-2 rounded-lg hover:bg-yellow-700 transition">
          {t.detail.backToCatalog}
        </Link>
      </div>
    );
  }

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

        <nav className="hidden lg:flex items-center gap-8 font-semibold relative">
          <Link href="/" className={`${pathname === "/" ? "text-[#9F6301]" : "hover:text-white"} transition`}>{t.menu.home}</Link>
          <Link href="/furniture" className={`${pathname === "/furniture" ? "text-[#9F6301]" : "hover:text-white"} transition`}>{t.menu.furniture}</Link>
          <Link href="/articles" className={`${pathname.includes("/articles") ? "text-[#9F6301]" : "hover:text-white"} transition`}>{t.menu.articles}</Link>
          <Link href="/contact" className={`${pathname === "/contact" ? "text-[#9F6301]" : "hover:text-white"} transition`}>{t.menu.contact}</Link>
          <a href={waLink} target="_blank" rel="noreferrer" className="bg-[#C89B3C] text-white px-6 py-2 rounded shadow hover:bg-yellow-700 transition">{t.menu.order}</a>
          
          <div className="relative">
            <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-1.5 leading-none hover:text-white transition cursor-pointer uppercase">
              {locale} {isLangOpen ? <FaChevronUp className="text-[10px]" /> : <FaChevronDown className="text-[10px]" />}
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

        <button className="lg:hidden text-3xl" onClick={() => setIsMobileMenuOpen(true)}><MdMenu /></button>
      </header>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative w-64 bg-[#E5C37A] h-full p-6 flex flex-col gap-6 shadow-2xl animate-slide-in overflow-y-auto">
            <button className="self-end text-3xl" onClick={() => setIsMobileMenuOpen(false)}><MdOutlineClose /></button>
            <nav className="flex flex-col gap-4 font-bold text-lg">
              <Link href="/" className={`${pathname === "/" ? "text-[#9F6301]" : "hover:text-white"} transition`} onClick={() => setIsMobileMenuOpen(false)}>{t.menu.home}</Link>
              <Link href="/furniture" className={`${pathname === "/furniture" ? "text-[#9F6301]" : "hover:text-white"} transition`} onClick={() => setIsMobileMenuOpen(false)}>{t.menu.furniture}</Link>
              <Link href="/articles" className={`${pathname.includes("/articles") ? "text-[#9F6301]" : "hover:text-white"} transition`} onClick={() => setIsMobileMenuOpen(false)}>{t.menu.articles}</Link>
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
      <main className="flex-grow pb-16 px-6 lg:px-20 max-w-4xl mx-auto w-full pt-10">
        
        {/* Tombol Back */}
        <Link href="/articles" className="text-gray-500 hover:text-[#C89B3C] font-bold text-m mb-6 inline-flex items-center transition relative z-20">
          {t.detail.back}
        </Link>

        {/* Header Artikel */}
        <div className="mb-8">
          <p className="text-[#C89B3C] font-bold text-sm md:text-base mb-2">{article.date} • {article.author}</p>
          {/* Judul Artikel Dinamis */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">{article[`title_${locale}`]}</h1>
        </div>

        {/* Gambar Utama Artikel */}
        <div className="w-full h-64 md:h-[450px] rounded-2xl overflow-hidden shadow-sm mb-10 bg-gray-200">
          <img src={article.image} alt={article[`title_${locale}`]} className="w-full h-full object-cover" />
        </div>

        {/* Konten Artikel Dinamis */}
        <article 
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-justify 
                     prose-p:mb-5 prose-a:text-[#C89B3C] prose-li:mb-2 prose-ul:list-disc prose-ul:pl-5 prose-strong:text-gray-900"
          dangerouslySetInnerHTML={{ __html: article[`content_${locale}`] }}
        />

        {/* MORE ARTICLES RECOMMENDATION */}
        <section className="mt-16 border-t border-gray-200 pt-10">
          <h3 className="font-extrabold text-xl lg:text-2xl mb-6 text-[#C89B3C]">More Articles</h3>
          
          <div className="flex flex-col gap-8">
            {articlesData
              .filter((item) => item.slug !== article.slug)
              .slice(0, 3) 
              .map((item) => (
                <Link 
                  href={`/articles/${item.slug}`} 
                  key={item.slug} 
                  className="bg-white rounded-2xl shadow-sm border-[0.5px] border-gray-200 overflow-hidden hover:shadow-md transition flex flex-col lg:flex-row group cursor-pointer"
                >
                  <div className="w-full lg:w-1/3 h-52 lg:h-auto overflow-hidden bg-gray-100">
                    <img src={item.image} alt={item[`title_${locale}`]} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <div className="p-6 lg:p-8 flex flex-col justify-center w-full lg:w-2/3">
                    <p className="text-[#C89B3C] font-bold text-xs mb-2">{item.date} • {item.author}</p>
                    <h2 className="text-xl lg:text-2xl font-extrabold text-gray-900 mb-3 leading-snug group-hover:text-[#9F6301] transition">
                      {item[`title_${locale}`]}
                    </h2>
                    <p className="text-sm lg:text-base text-gray-600 leading-relaxed font-medium line-clamp-3">
                      {item[`desc_${locale}`]}
                    </p>
                  </div>
                </Link>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#EAE1CA] px-6 lg:px-20 py-7 flex flex-row justify-between gap-4 text-gray-900 mt-auto">
        <div className="flex flex-col gap-2 w-[55%]">
          <h2 className="font-extrabold text-xl lg:text-3xl">Bali Furniture</h2>
          <p className="text-xs lg:text-base mb-2 font-medium">The greatest bDKF SK</p>
          <h4 className="font-extrabold text-sm lg:text-lg">{t.detail.address}</h4>
          <p className="text-xs lg:text-base leading-relaxed font-medium pr-2">Jl. Raya Padonan No.5,<br />Tibubeneng, Kec. Kuta Utara,<br />Kabupaten Badung, Bali 80361</p>
        </div>
        <div className="flex flex-col gap-3 justify-center w-[45%] pl-2 lg:pl-10">
          <a href="#" className="flex items-center gap-2 hover:opacity-70 transition"><img src="/internet.png" alt="Website" className="w-5 h-5 lg:w-8 lg:h-8 object-contain" /><span className="text-[10px] sm:text-xs lg:text-lg font-medium break-all">balifurniture.com</span></a>
          <a href="#" className="flex items-center gap-2 hover:opacity-70 transition"><img src="/instagram.png" alt="Instagram" className="w-5 h-5 lg:w-8 lg:h-8 object-contain" /><span className="text-[10px] sm:text-xs lg:text-lg font-medium">balifurniture</span></a>
          <a href={waLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:opacity-70 transition"><img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5 lg:w-8 lg:h-8 object-contain" /><span className="text-[10px] sm:text-xs lg:text-lg font-medium">+62 888 8888 8888</span></a>
          <a href="mailto:balifurniture@gmail.com" className="flex items-center gap-2 hover:opacity-70 transition"><img src="/mail.png" alt="Email" className="w-5 h-5 lg:w-8 lg:h-8 object-contain" /><span className="text-[10px] sm:text-xs lg:text-lg font-medium break-all">balifurniture@gmail.com</span></a>
        </div>
      </footer>

      <div className="fixed bottom-6 right-6 flex flex-col items-center gap-3 z-50">
        {showBackToTop && (
          <button onClick={scrollToTop} className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition animate-fade-in"><FaArrowUp size={20} /></button>
        )}
        <a href={waLink} target="_blank" rel="noreferrer" className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-green-600 transition"><IoLogoWhatsapp size={32} /></a>
      </div>
    </div>
  );
}