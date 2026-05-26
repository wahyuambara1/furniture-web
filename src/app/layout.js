import "./globals.css";
// 1. Import Provider yang baru kita buat
import { LanguageProvider } from "@/context/LanguageContext"; 

export const metadata = {
  title: "Bali Furniture",
  description: "Authentic Balinese Craftsmanship",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* 2. Bungkus children dengan LanguageProvider */}
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}