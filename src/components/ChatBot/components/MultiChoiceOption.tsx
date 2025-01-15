
import React from "react";
import { cn } from '../../../lib/utils';

type TOptions = {
  label: string;
  value: string;
};

type ChatBubbleBotProps = {
  type?: "bot" | "user";
  options: TOptions[];
  onSelected?: (value: string) => void;
};

export default function MultiChoiceOption({ type, options, onSelected }: ChatBubbleBotProps) {
  return (
    <div
      className={cn("flex justify-end gap-4 items-center", {
        "justify-start": type === "bot",
      })}
    >
      <div className="max-w-[80%] flex items-center gap-4 flex-wrap">
        {options.map((option, index) => (
          <button
            className={cn(
              "p-4 rounded-[0.625rem] text-black border border-primary-100 font-medium text-sm md:text-base",
              {
                "bg-primary-100 text-white": type === "user",
              }
            )}
            onClick={() => onSelected && onSelected(option.value)}
            key={index}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
