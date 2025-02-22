import React, { FC } from "react";
import OptionInputTitle from "./OptionInputTitle";
import Rating from "./Rating";
import ImageOptionInputTile from "./ImageOptionInputTile";

interface PollContentProps {
  type: "single-choice" | "yes/no" | "rating" | "open-ended" | "image-based";
  options: Array<string | { optionText: string }>;
  selectedOptionIndex?: number;
  onOptionSelect?: (index: number) => void;
  rating: number;
  onRatingChange?: (star: number) => void;
  userResponse: string;
  onResponseChange?: (response: string) => void;
}

const PollContent: FC<PollContentProps> = ({
  type,
  options,
  selectedOptionIndex,
  onOptionSelect,
  rating,
  onRatingChange,
  userResponse,
  onResponseChange,
}) => {
  switch (type) {
    case "single-choice":
    case "yes/no":
      return (
        <div className="space-y-2">
          {options.map((option, index) => (
            <OptionInputTitle
              key={(option as any)._id || index}
              isSelected={selectedOptionIndex === index}
              label={typeof option === "string" ? option : option.optionText || ""}
              onSelect={() => onOptionSelect?.(index)}
            />
          ))}
        </div>
      );

    case "image-based":
      return (
        <div className="grid grid-cols-2 gap-4">
          {options.map((option, index) => (
            <ImageOptionInputTile
              key={index}
              isSelected={selectedOptionIndex === index}
              imgUrl={(typeof option === 'string' ? '' : option.optionText) || ""}
              onSelect={() => onOptionSelect?.(index)}
            />
          ))}
        </div>
      );

    case "rating":
      return (
        <Rating value={rating} onChange={onRatingChange} />
      );

    case "open-ended":
      return (
        <div className="mt-2">
          <textarea
            className="w-full text-[14px] p-3 rounded-lg bg-surface-a20 shadow-sm 
           transition duration-200 outline-none"
            placeholder="Your Response..."
            rows={4}
            value={userResponse}
            onChange={({ target }: React.ChangeEvent<HTMLTextAreaElement>) =>
              onResponseChange?.(target.value)
            }
          />
        </div>
      );

    default:
      return null;
  }
};

export default PollContent;