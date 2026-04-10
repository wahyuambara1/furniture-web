"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FaBars, FaTimes, FaWhatsapp, FaChevronUp, FaMapMarkerAlt, FaCheck, FaEnvelope } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";
import { MdOutlineClose, MdMenu } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";

// Import CSS Swiper wajib
import "swiper/css";
import "swiper/css/navigation";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const waLink = "https://wa.me/6281238396581";
  const mapLink = "https://maps.app.goo.gl/GVMcLKGkGgE1Gjjc7";

  // Logika untuk memunculkan tombol Back to Top saat di-scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="font-sans text-gray-800 bg-[#FAF8F5] relative w-full max-w-[100vw] overflow-x-hidden">
      {/* HEADER [cite: 324] */}
      <header className="sticky top-0 z-50 bg-[#E5C37A] px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-xs">
            Logo
          </div>
          <h1 className="font-bold text-xl uppercase tracking-wider">Bali<br/>Furniture</h1>
        </div>

        {/* Desktop Menu [cite: 2] */}
        <nav className="hidden lg:flex items-center gap-8 font-semibold">
          <Link href="/" className="hover:text-white transition">HOME</Link>
          <Link href="/furniture" className="hover:text-white transition">FURNITURE</Link>
          <Link href="/articles" className="hover:text-white transition">ARTICLES</Link>
          <Link href="/contact" className="hover:text-white transition">CONTACT</Link>
          <a href={waLink} target="_blank" rel="noreferrer" className="bg-[#C89B3C] text-white px-6 py-2 rounded shadow hover:bg-yellow-700 transition">
            ORDER NOW
          </a>
          <span>EN ⌄</span>
        </nav>

        {/* Mobile Hamburger Icon [cite: 324] */}
        <button className="lg:hidden text-3xl" onClick={() => setIsMobileMenuOpen(true)}>
          <MdMenu />
        </button>
      </header>

      {/* MOBILE MENU OVERLAY [cite: 263] */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex justify-end">
          <div className="w-64 bg-[#E5C37A] h-full p-6 flex flex-col gap-6 shadow-2xl animate-slide-in">
            <button className="self-end text-3xl" onClick={() => setIsMobileMenuOpen(false)}>
              <MdOutlineClose />
            </button>
            <nav className="flex flex-col gap-4 font-bold text-lg">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>HOME</Link>
              <Link href="/furniture" onClick={() => setIsMobileMenuOpen(false)}>FURNITURE</Link>
              <Link href="/articles" onClick={() => setIsMobileMenuOpen(false)}>ARTICLES</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>CONTACT</Link>
              <a href={waLink} className="bg-[#C89B3C] text-white text-center py-2 mt-4 rounded">ORDER NOW</a>
            </nav>
          </div>
        </div>
      )}

      {/* HERO SECTION & BANNER SLIDER [cite: 325, 327] */}
      <section className="flex flex-col lg:flex-row items-center px-4 lg:px-20 py-10 gap-10">
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-bold mb-4 flex items-center gap-2">
            <span className="text-[#C89B3C] text-3xl">☕</span> Bali Furniture
          </h2>
          <p className="text-gray-600 leading-relaxed">
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo, totam rem aperiam, eaque ipsa quae ab illo lila aka suatu. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, tota" [cite: 326]
          </p>
        </div>
        
        {/* Banner Auto Slider (15 detik) */}
        <div className="w-full lg:w-1/2 h-64 lg:h-80 rounded-2xl overflow-hidden bg-[#E5C37A] min-w-0">
          <Swiper
            modules={[Autoplay, Navigation]}
            navigation
            autoplay={{ delay: 15000, disableOnInteraction: false }}
            className="w-full h-full"
          >
            <SwiperSlide className="flex items-center justify-center font-bold text-4xl lg:text-6xl text-center p-8">
              GET <br /> DISCOUNT [cite: 327]
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center font-bold text-4xl lg:text-6xl text-center p-8">
              NEW <br /> ARRIVALS
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* FURNITURE SECTION [cite: 328] */}
      <section className="px-6 lg:px-20 py-10 bg-white">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold flex justify-center items-center gap-2">
            🛋️ Furniture
          </h3>
          <p className="text-gray-500">Take a look around at the furniture you like [cite: 329]</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {/* Card Dummy - Lakukan Map Data disini nantinya [cite: 330] */}
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-xl shadow-md p-3 border">
              <div className="bg-gray-200 h-32 lg:h-48 w-full rounded-lg mb-3">
                {/* Ganti dengan <img src="/path-gambar.jpg" /> */}
              </div>
              <h4 className="font-bold text-sm lg:text-base">Balinese Sofa [cite: 330]</h4>
              <p className="text-[10px] lg:text-xs text-gray-500 my-2 line-clamp-2">Sed ut perspiciatis unde omnis iste natus [cite: 331]</p>
              <div className="flex justify-between items-center mt-2">
                <div>
                  <span className="font-bold text-sm">Rp 3.488</span>
                  <span className="text-[10px] text-red-500 bg-red-100 px-1 ml-1 rounded">50%</span>
                </div>
                <a href={waLink} target="_blank" rel="noreferrer" className="bg-[#C89B3C] text-white text-[10px] lg:text-xs px-2 py-1 lg:px-4 lg:py-2 rounded font-bold hover:bg-yellow-700">
                  ORDER NOW
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol See More Redirect ke Page Furniture [cite: 346] */}
        <div className="text-center mt-8">
          <Link href="/furniture">
            <button className="border-2 border-black px-8 py-2 rounded-lg font-semibold hover:bg-black hover:text-white transition">
              SEE MORE
            </button>
          </Link>
        </div>
      </section>

      {/* REASON TO CHOOSE US [cite: 347] */}
      <section className="px-6 lg:px-20 py-10 bg-[#FAF8F5]">
        <h3 className="text-2xl font-bold text-center mb-8">Reason to <span className="text-[#C89B3C]">Choose Us</span></h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-[#EAE1CA] p-6 rounded-xl text-center shadow">
              <div className="bg-[#C89B3C] w-12 h-12 mx-auto rounded flex items-center justify-center text-white text-2xl mb-4">
                ✓
              </div>
              <h4 className="font-bold mb-2">Top Quality [cite: 348]</h4>
              <p className="text-xs text-gray-700">"Sed ut perspiciatis unde omnis iste natus error sit he voluptatem" [cite: 349]</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL SLIDER [cite: 358] */}
      <section className="px-6 lg:px-20 py-10 bg-white">
        <h3 className="text-2xl font-bold text-center mb-8">What <span className="text-[#C89B3C]">Our Clients Say</span></h3>
        <div className="max-w-4xl mx-auto">
          <Swiper
            modules={[Autoplay, Navigation]}
            navigation
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{ 768: { slidesPerView: 2 } }}
            autoplay={{ delay: 15000, disableOnInteraction: false }}
          >
            {[1, 2, 3].map((item) => (
              <SwiperSlide key={item}>
                <div className="border p-6 rounded-xl shadow-sm text-center bg-[#FAF8F5]">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div className="text-left">
                      <h4 className="font-bold text-sm">Wahyu Ambara [cite: 359]</h4>
                      <p className="text-xs text-gray-500">21-12-2026 [cite: 360]</p>
                    </div>
                  </div>
                  <div className="text-[#C89B3C] mb-2">★★★★★</div>
                  <p className="text-xs text-gray-600">Sed ut perspiciatis unde omnis iste natus error sit he voluptatem Sed ut perspiciatis unde omnis iste natus error sit he voluptatem [cite: 361]</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* MAPS SECTION [cite: 366] */}
      <section className="px-6 lg:px-20 py-10 bg-[#FAF8F5]">
        <h3 className="text-2xl font-bold text-center mb-2">Our Location in <span className="text-[#C89B3C]">Canggu</span></h3>
        <p className="text-center text-sm text-gray-600 mb-8 flex items-center justify-center gap-2">
          📍 Jl. Raya Padonan No.5, Tibubeneng, Kec. Kuta Utara, Kabupaten Badung, Bali 80361 [cite: 367, 368]
        </p>
        <a href={mapLink} target="_blank" rel="noreferrer" className="block w-full h-64 lg:h-96 rounded-2xl overflow-hidden shadow-lg border-4 border-white cursor-pointer hover:opacity-90 transition">
          {/* Ganti dengan img peta aslimu */}
          <div className="w-full h-full bg-green-200 flex items-center justify-center text-green-800 font-bold text-xl">
             [KLIK UNTUK BUKA GOOGLE MAPS] <br/> Bali Map Placeholder [cite: 374]
          </div>
        </a>
      </section>

      {/* FOOTER [cite: 379] */}
      <footer className="bg-[#EAE1CA] px-6 lg:px-20 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <h2 className="font-bold text-xl mb-2">Bali Furniture [cite: 379]</h2>
          <p className="text-sm">The greatest bDKF SK [cite: 380]</p>
          <div className="mt-4">
             <h4 className="font-bold mb-1">Address [cite: 382]</h4>
             <p className="text-sm">Jl. Raya Padonan No.5, Tibubeneng, Kec. Kuta Utara, Kabupaten Badung, Bali 80361 [cite: 384, 386]</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-center text-sm">
          <a href="#" className="flex items-center gap-2"><span>🌐</span> balifurniture.com [cite: 381]</a>
          <a href="#" className="flex items-center gap-2"><span>📷</span> balifurniture [cite: 383]</a>
        </div>
        <div className="flex flex-col gap-3 justify-center text-sm">
          <a href={waLink} className="flex items-center gap-2"><span>📞</span> +62 888 8888 8888 [cite: 385]</a>
          <a href="mailto:balifurniture@gmail.com" className="flex items-center gap-2"><span>✉️</span> balifurniture@gmail.com [cite: 388]</a>
        </div>
      </footer>

      {/* FLOATING BUTTONS (WA & Back to Top) */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        {showBackToTop && (
          <button 
            onClick={scrollToTop}
            className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition animate-fade-in"
            aria-label="Back to Top"
          >
            <FaArrowUp size={20} />
          </button>
        )}
        <a 
          href={waLink} 
          target="_blank" 
          rel="noreferrer"
          className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-green-600 transition"
          aria-label="Chat on WhatsApp"
        >
          <IoLogoWhatsapp size={32} />
        </a>
      </div>
    </div>
  );
}