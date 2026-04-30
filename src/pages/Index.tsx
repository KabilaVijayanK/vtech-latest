import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HomePage } from "./HomePage";
import { AboutPage } from "./AboutPage";
import { ProductsPage } from "./ProductsPage";
import { ServicesPage } from "./ServicesPage";
import { ContactPage } from "./ContactPage";
import { PageKey } from "@/lib/site";

const Index = () => {
  const [page, setPage] = useState<PageKey>("home");

  const onNavigate = (p: PageKey) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.title =
      page === "home"
        ? "V TECH INDUSTRIES — Industrial Conveyor Manufacturer | Chennai"
        : `${page.charAt(0).toUpperCase() + page.slice(1)} — V TECH INDUSTRIES`;
  }, [page]);

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar current={page} onNavigate={onNavigate} />
      <main className="flex-1 pt-[68px]" key={page}>
        {page === "home" && <HomePage onNavigate={onNavigate} />}
        {page === "about" && <AboutPage onNavigate={onNavigate} />}
        {page === "products" && <ProductsPage onNavigate={onNavigate} />}
        {page === "services" && <ServicesPage onNavigate={onNavigate} />}
        {page === "contact" && <ContactPage />}
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default Index;
