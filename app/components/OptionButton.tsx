// src/components/OptionButton.tsx

interface OptionButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function OptionButton({
  label,
  isSelected,
  onClick,
}: OptionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-colors 
        ${
          isSelected
            ? "bg-[#00A67E] text-white border-[#00A67E]"
            : "bg-white text-gray-700 border-[#00A67E] hover:bg-[#00A67E]/10"
        }`}
    >
      {label}
    </button>
  );
}