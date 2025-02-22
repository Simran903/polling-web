"use client"
import React, { FC, useState } from 'react';
import { HiMiniStar } from 'react-icons/hi2';

interface RatingProps {
  maxStars?: number;
  value?: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
}

const Rating: FC<RatingProps> = ({ maxStars = 5, value = 0, onChange, readOnly = false }) => {
  const [hoverValue, setHoverValue] = useState<number>(0);

  const handleClick = (rating: number): void => {
    if (!readOnly && onChange) {
      onChange(rating);
    }
  };

  const handleMouseEnter = (rating: number): void => {
    if (!readOnly) {
      setHoverValue(rating);
    }
  };

  const handleMouseLeave = (): void => {
    if (!readOnly) {
      setHoverValue(0);
    }
  };

  return (
    <div className={`flex gap-2 ${readOnly ? "cursor-default" : "cursor-pointer"}`}>
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            className={`text-3xl transition-colors ${starValue <= (hoverValue || value) ? "text-yellow-400" : "text-surface-a30"}`}
            onClick={() => handleClick(starValue)} onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}>
            <HiMiniStar />
          </span>
        );
      })}
    </div>
  );
};

export default Rating;