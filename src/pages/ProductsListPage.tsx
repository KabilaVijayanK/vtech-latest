import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductsPage } from "./ProductsPage";

export const ProductsListPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (page: "home" | "about" | "products" | "services" | "contact") => {
    navigate("/");
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar current="products" onNavigate={handleNavigate} />
      <main className="flex-1 pt-[68px]">
        <ProductsPage onNavigate={handleNavigate} />
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};
