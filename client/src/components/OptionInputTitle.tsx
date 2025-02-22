import React, { FC } from "react";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

interface OptionInputTitleProps {
  isSelected: boolean;
  label: string;
  onSelect: () => void;
}

const OptionInputTitle: FC<OptionInputTitleProps> = ({ isSelected, label, onSelect }) => {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-1 mb-3 rounded-lg border 
        transition-all duration-200 ease-in-out
        ${isSelected
          ? "bg-primary-a10 text-tonal-a0 border-primary-a10 shadow-md"
          : "border border-surface-a30 text-white hover:bg-surface-a30"
        }`}
      onClick={onSelect}
      role="radio"
      aria-checked={isSelected}
    >
      {isSelected ? (
        <MdRadioButtonChecked className="text-xl text-tonal-a0" />
      ) : (
        <MdRadioButtonUnchecked className="text-xl text-gray-500" />
      )}

      <span className="text-[14px] font-medium">{label}</span>
    </button>
  );
};

export default OptionInputTitle;