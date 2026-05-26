"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/locales/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Default bahasa adalah English ('en')
  const [locale, setLocale] = useState("en");

  // Cek apakah user sudah pernah memilih bahasa sebelumnya di browser
  useEffect(() => {
    const savedLanguage = localStorage.getItem("app_language");
    if (savedLanguage) {
      setLocale(savedLanguage);
    }
  }, []);

  // Fungsi untuk mengganti bahasa
  const changeLanguage = (lang) => {
    setLocale(lang);
    localStorage.setItem("app_language", lang); // Simpan pilihan di browser
  };

  // Ambil kamus sesuai bahasa yang aktif (t = translations)
  const t = translations[locale];

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);