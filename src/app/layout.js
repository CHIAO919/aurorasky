import "./globals.css";
import "@/fontawesome";
import Header from "@/components/Header";
import Footer from "@/components/footer/FooterBooking";

export const metadata = {
  title: "Aurora Sky",
  description: "Time Flies with Precision",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body>
        <Header></Header>
        <main>
          {children}
        </main>
        <Footer></Footer>
      </body>
    </html>
  );
}
