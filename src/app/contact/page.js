"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronUp, FaChevronDown, FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineClose, MdMenu } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaArrowUp } from "react-icons/fa6";

// IMPORT DATA CONTEXT & TRANSLATION
import { useLanguage } from "@/context/LanguageContext";

const languages = [
  { code: "en", label: "English" },
  { code: "id", label: "Indonesian" },
  { code: "fr", label: "French" }
];

export default function ContactPage() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // MENGAMBIL STATE BAHASA GLOBAL
  const { locale, changeLanguage, t } = useLanguage();

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsLangOpen(false);
  };

  // Link Tujuan
  const waLink = "https://wa.me/6288888888888";
  const igLink = "https://instagram.com/balifurniture";
  const webLink = "https://balifurniture.com";
  const emailLink = "mailto:balifurniture@gmail.com";

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

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
          <Link href="/furniture" className={`${pathname.includes("/furniture") ? "text-[#9F6301]" : "hover:text-white"} transition`}>{t.menu.furniture}</Link>
          <Link href="/articles" className={`${pathname.includes("/articles") ? "text-[#9F6301]" : "hover:text-white"} transition`}>{t.menu.articles}</Link>
          <Link href="/contact" className={`${pathname === "/contact" ? "text-[#9F6301]" : "hover:text-white"} transition`}>{t.menu.contact}</Link>
          <a href={waLink} target="_blank" rel="noreferrer" className="bg-[#C89B3C] text-white px-6 py-2 rounded shadow hover:bg-yellow-700 transition">{t.menu.order}</a>
          
          <div className="relative">
            <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-1.5 leading-none hover:text-white transition cursor-pointer">
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

        <button className="lg:hidden text-3xl" onClick={() => setIsMobileMenuOpen(true)}><MdMenu /></button>
      </header>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative w-64 bg-[#E5C37A] h-full p-6 flex flex-col gap-6 shadow-2xl animate-slide-in overflow-y-auto">
            <button className="self-end text-3xl" onClick={() => setIsMobileMenuOpen(false)}><MdOutlineClose /></button>
            <nav className="flex flex-col gap-4 font-bold text-lg">
              <Link href="/" className={`${pathname === "/" ? "text-[#9F6301]" : "hover:text-white"} transition`} onClick={() => setIsMobileMenuOpen(false)}>{t.menu.home}</Link>
              <Link href="/furniture" className={`${pathname.includes("/furniture") ? "text-[#9F6301]" : "hover:text-white"} transition`} onClick={() => setIsMobileMenuOpen(false)}>{t.menu.furniture}</Link>
              <Link href="/articles" className={`${pathname.includes("/articles") ? "text-[#9F6301]" : "hover:text-white"} transition`} onClick={() => setIsMobileMenuOpen(false)}>{t.menu.articles}</Link>
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
      <main className="flex-grow pb-8 px-6 lg:px-20 max-w-5xl mx-auto w-full pt-8">
        <Link href="/" className="text-gray-500 hover:text-[#C89B3C] font-bold text-m mb-5 inline-flex items-center transition relative z-20">
          {t.detail.back}
        </Link>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">{t.menu.contact}</h1>
        <p className="text-gray-500 font-medium mb-10 text-sm lg:text-base leading-relaxed">
          {locale === 'id' ? "Punya pertanyaan? Kami selalu siap membantu Anda" : locale === 'fr' ? "Vous avez des questions ? Nous sommes toujours prêts à vous aider" : "Got questions? We're always ready to help and guide you"}
        </p>

        {/* Map & Address Section */}
        <div className="mb-12 flex flex-col gap-4">
          <div className="flex items-start gap-2">
            <FaMapMarkerAlt className="text-[#C89B3C] text-xl mt-1 flex-shrink-0" />
            <p className="text-sm lg:text-base font-medium leading-relaxed text-gray-800">
              Jl. Raya Padonan No.5, Tibubeneng, Kec. Kuta<br className="hidden lg:block" />
              Utara, Kabupaten Badung, Bali 80361
            </p>
          </div>
          
          <section className="px-[0.1] lg:px-2 py-1 bg-[#FAF8F5]">
            <div className="w-full h-64 lg:h-96 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
              <iframe src="https://maps.google.com/maps?q=Jl.%20Raya%20Padonan%20No.5,%20Tibubeneng,%20Kec.%20Kuta%20Utara,%20Kabupaten%20Badung,%20Bali%2080361&t=&z=15&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </section>
        </div>

        {/* Contact Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 bg-white p-6 lg:p-10 rounded-2xl shadow-sm border border-gray-100">
          <a href={webLink} target="_blank" rel="noreferrer" className="flex items-center gap-4 hover:opacity-70 transition p-3 rounded-lg hover:bg-gray-50">
            <img src="/internet.png" alt="Website" className="w-8 h-8 object-contain" />
            <span className="text-sm lg:text-lg font-bold text-gray-900 break-all">balifurniture.com</span>
          </a>
          <a href={igLink} target="_blank" rel="noreferrer" className="flex items-center gap-4 hover:opacity-70 transition p-3 rounded-lg hover:bg-gray-50">
            <img src="/instagram.png" alt="Instagram" className="w-8 h-8 object-contain" />
            <span className="text-sm lg:text-lg font-bold text-gray-900">balifurniture</span>
          </a>
          <a href={waLink} target="_blank" rel="noreferrer" className="flex items-center gap-4 hover:opacity-70 transition p-3 rounded-lg hover:bg-gray-50">
            <img src="/whatsapp.png" alt="WhatsApp" className="w-8 h-8 object-contain" />
            <span className="text-sm lg:text-lg font-bold text-gray-900">+62 888 8888 8888</span>
          </a>
          <a href={emailLink} className="flex items-center gap-4 hover:opacity-70 transition p-3 rounded-lg hover:bg-gray-50">
            <img src="/mail.png" alt="Email" className="w-8 h-8 object-contain" />
            <span className="text-sm lg:text-lg font-bold text-gray-900 break-all">balifurniture@gmail.com</span>
          </a>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">FAQ</h2>
          <p className="text-gray-500 font-medium mb-8 text-sm lg:text-base">
            {locale === 'id' ? "Pertanyaan yang Sering Diajukan" : locale === 'fr' ? "Questions Fréquemment Posées" : "Frequently Asked Questions"}
          </p>
          
          <div className="flex flex-col gap-4">
            {t.faqs.map((faq) => (
              <details key={faq.id} className="group bg-white rounded-xl shadow-sm border-[0.5px] border-gray-200 overflow-hidden cursor-pointer">
                <summary className="flex items-center justify-between p-5 font-bold text-gray-900 select-none outline-none">
                  {faq.question}
                  <FaChevronDown className="text-[#C89B3C] group-open:rotate-180 transition-transform duration-300" />
                </summary>
                <div className="px-5 pb-5 pt-0 text-sm lg:text-base text-gray-600 font-medium leading-relaxed border-t border-gray-100 mt-2">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
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
          <a href={webLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:opacity-70 transition"><img src="/internet.png" alt="Website" className="w-5 h-5 lg:w-8 lg:h-8 object-contain" /><span className="text-[10px] sm:text-xs lg:text-lg font-medium break-all">balifurniture.com</span></a>
          <a href={igLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:opacity-70 transition"><img src="/instagram.png" alt="Instagram" className="w-5 h-5 lg:w-8 lg:h-8 object-contain" /><span className="text-[10px] sm:text-xs lg:text-lg font-medium">balifurniture</span></a>
          <a href={waLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:opacity-70 transition"><img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5 lg:w-8 lg:h-8 object-contain" /><span className="text-[10px] sm:text-xs lg:text-lg font-medium">+62 888 8888 8888</span></a>
          <a href={emailLink} className="flex items-center gap-2 hover:opacity-70 transition"><img src="/mail.png" alt="Email" className="w-5 h-5 lg:w-8 lg:h-8 object-contain" /><span className="text-[10px] sm:text-xs lg:text-lg font-medium break-all">balifurniture@gmail.com</span></a>
        </div>
      </footer>

      {/* FLOATING BUTTONS */}
      <div className="fixed bottom-6 right-6 flex flex-col items-center gap-3 z-50">
        {showBackToTop && (
          <button onClick={scrollToTop} className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition animate-fade-in"><FaArrowUp size={20} /></button>
        )}
        <a href={waLink} target="_blank" rel="noreferrer" className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-green-600 transition"><IoLogoWhatsapp size={32} /></a>
      </div>
    </div>
  );
}