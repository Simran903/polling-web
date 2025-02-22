import Image from "next/image";
import React, { FC } from "react";

interface ImageOptionInputTileProps {
  isSelected: boolean;
  imgUrl: string;
  onSelect: () => void;
}

const ImageOptionInputTile: FC<ImageOptionInputTileProps> = ({
  isSelected,
  imgUrl,
  onSelect,
}) => {
  
  return (
    <button
      className={`relative w-full h-40 rounded-lg overflow-hidden border-2 
        ${isSelected ? "border-primary-a0 shadow-lg" : "border-gray-300"} 
        transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-primary-a0`}
      onClick={onSelect}
    >
      <img
        src={imgUrl}
        alt="Poll Option"
        
        // objectFit="cover"
        className="rounded-lg object-contain"
      />
      {isSelected && (
        <div className="absolute inset-0 bg-primary-a0/30 rounded-lg"></div>
      )}
    </button>
  );
};

export default ImageOptionInputTile;
