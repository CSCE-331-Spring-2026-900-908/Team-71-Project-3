// src/components/ProductCard.tsx
import Image from "next/image";

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  onCustomize: () => void; // Function to call when '+' is clicked
}

export default function ProductCard({
  name,
  description,
  price,
  imageUrl,
  onCustomize,
}: ProductCardProps) {
  return (
    <button onClick={onCustomize} className="bg-white text-left">
      {/* Product Image */}

      <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-(--secondary)">
        <Image src={imageUrl} alt={name} fill className="object-cover" />
      </div>

      {/* Text Info */}
      <h3 className="text-(--dark) text-2xl font-semibold mb-1">{name}</h3>
      <p className="text-gray-600 text-sm grow mb-4 truncate">{description}</p>

      {/* Price and Add Button */}
      <div className="flex justify-between items-center mt-auto">
        <span className="text-(--dark) text-xl font-bold">
          ${price.toFixed(2)}
        </span>
      </div>
    </button>
  );
}
