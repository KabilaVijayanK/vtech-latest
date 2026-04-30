import { useState } from "react";
import { PRODUCT_ICON, IconBelt } from "@/components/Illustrations";
import { Product } from "@/lib/site";

/**
 * Renders a product visual.
 * - If `product.image` is set AND the file loads → shows the photo (object-cover).
 * - Otherwise → falls back to the per-product SVG illustration.
 *   If no SVG is mapped for that product id, a generic belt icon is used.
 */
export const ProductMedia = ({ product, className = "" }: { product: Product; className?: string }) => {
  const [errored, setErrored] = useState(false);
  const Svg = PRODUCT_ICON[product.id] ?? IconBelt;

  if (product.image && !errored) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-surface ${className}`}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={() => setErrored(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Svg />
    </div>
  );
};
