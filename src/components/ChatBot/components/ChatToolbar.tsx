
import React from "react";
import { cn } from '../../../lib/utils';
import SendIcon from '../../icons/SendIcon';

type TChatToolbar = {
  onSend?: (text: string) => void;
  isDisabled?: boolean;
};

export default function ChatToolbar({ onSend, isDisabled }: TChatToolbar) {
  const [value, setValue] = React.useState("");

  const handleSend = () => {
    if (onSend) {
      onSend(value);
    }
    setValue("");
  };

  return (
    <div className="px-4 w-full">
      <div
        className={cn(
          "grid grid-cols-[1fr,auto] gap-4 py-2 border-t border-t-[#707C9726] w-full items-center ",
          {
            "opacity-50 cursor-not-allowed pointer-events-none": isDisabled,
          }
        )}
      >
        <textarea
          className="placeholder:text-[#707C9750] text-[#707C97] font-heading font-medium text-base md:text-lg xl:text-xl py-1 px-1 outline-none p-4  resize-none min-h-[3rem] scrollbar-hide"
          value={value}
          rows={2}
          onChange={(e) => setValue(e.currentTarget.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        ></textarea>
        <button
          className="size-10 rounded-full grid place-items-center bg-headerBg disabled:opacity-55 disabled:cursor-not-allowed"
          onClick={handleSend}
          disabled={!value.trim()}

        >
          <SendIcon color="#fff" />
        </button>
      </div>
    </div>
  );
}
