
import React from "react";
import { cn } from '../../../lib/utils';

type ChatBubbleBotProps = {
  text: string;
  type?: "bot" | "user";
  backgroundColor?: string;
  color?: string;
  image?: string;
  imageBackgroundColor?: string;
};

export default function ChatBubble({
  text,
  type,
  backgroundColor,
  color,
  image = "/images/chatbot.png",
  imageBackgroundColor,
}: ChatBubbleBotProps) {
  return (
    <div
      className={cn("flex justify-end gap-4 items-center py-4", {
        "justify-start": type === "bot",
      })}
    >
      <div
        className={cn("max-w-[70%] grid gap-4 min-w-[40%]", {
          "grid-cols-[auto,1fr]": type === "bot",
        })}
      >
        {type === "bot" && (
          <div
            className="!h-10 !w-10 rounded-full grid place-items-center bg-primary-100"
            style={{ backgroundColor: imageBackgroundColor}}
          >
            <img
              src={image}
              width={30}
              height={30}
              alt="Chatbot Intro"
              className="object-contain size-8"
            />
          </div>
        )}
        <div
          className={cn(
            "p-5 text-black border border-primary-100 font-medium",
            {
              "bg-primary-100 text-white rounded-b-[0.625rem] rounded-e-[0.625rem]":
                type === "bot",
              "rounded-s-[0.625rem] rounded-t-[0.625rem]": type !== "bot",
            }
          )}
          style={{ color, backgroundColor }}
        >
          <p className="text-sm md:text-base">{text}</p>
        </div>
      </div>
    </div>
  );
}
