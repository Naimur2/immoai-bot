
import React, { useImperativeHandle, useLayoutEffect } from "react";
import { cn } from '../../../lib/utils';

export type TChatContentRef = {
  scrollToBottom: () => void;
};

const ChatContent = React.forwardRef<
  TChatContentRef,
  React.ComponentProps<"div">
>((props, ref) => {
  const { children, ...rest } = props;

  const innerRef = React.useRef<HTMLDivElement>(null);
  const outerRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (innerRef.current) {
      innerRef.current.scrollTo({
        top: innerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useImperativeHandle(ref, () => ({
    scrollToBottom,
  }));

  useLayoutEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div
      ref={outerRef}
      {...rest}
      className={cn(
        "grid overflow-hidden h-full w-full !mt-0 grid-cols-1 ",
        rest.className
      )}
    >
      <div
        className="flex flex-col justify-end items-end w-full overflow-hidden h-full overflow-y-auto scrollbar-thin scrollbar-thumb-primary-100 scrollbar-track-primary-50 "
      >
        <div
          className="w-full grid overflow-scroll scrollbar-hide px-4 py-4 pb-8"
          ref={innerRef}
        >
          {children}
        </div>
      </div>
    </div>
  );
});

ChatContent.displayName = "ChatContent";

export default ChatContent;
