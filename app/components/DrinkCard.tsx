
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
    <div className="bg-white rounded-2xl shadow-md border-2 border-[#00A67E] p-4 flex flex-col h-full relative">
      {/* Product Image */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3">
        <Image src={imageUrl} alt={name} fill className="object-cover" />
      </div>

      {/* Text Info */}
      <h3 className="text-2xl font-semibold mb-1">{name}</h3>
      <p className="text-gray-600 text-sm flex-grow mb-4">{description}</p>
      
      {/* Price and Add Button */}
      <div className="flex justify-between items-center mt-auto">
        <span className="text-xl font-bold">${price.toFixed(2)}</span>
        <button 
          onClick={onCustomize} 
          className="bg-[#00A67E] text-white rounded-full p-2 hover:scale-105 active:scale-95 transition-all shadow-md"
        >
          <Image src="/plus-icon.svg" alt="Add" width={24} height={24} /> {/* Assuming you have this icon */}
        </button>
      </div>
    </div>
  );
}