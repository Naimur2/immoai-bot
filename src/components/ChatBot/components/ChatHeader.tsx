import { Back, InfoCircle } from "iconsax-react";
import { X } from "lucide-react";
import React from "react";
import { cn } from "../../../lib/utils";

type TChatHeaderProps = {
  title?: string;
  subtitle?: string;
  avatar?: string;
  children?: React.ReactNode;
  backgroundColor?: string;
};

const BackButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>((props, ref) => {
  return (
    <button ref={ref} {...props} className={cn("p-1", props.className)}>
      <Back size={24} color="#fff" />
    </button>
  );
});

const InfoButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>((props, ref) => {
  return (
    <button ref={ref} {...props} className={cn("p-1", props.className)}>
      <InfoCircle size="24" color="#fff" />
    </button>
  );
});

const CloseButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>((props, ref) => {
  return (
    <button ref={ref} {...props} className={cn("p-1", props.className)}>
      <X size="24" color="#fff" />
    </button>
  );
});

const ChatHeaderRight = ({
  children,
  className,
  ...rest
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("flex items-center justify-end gap-2", className)}
      {...rest}
    >
      {children}
    </div>
  );
};

ChatHeaderRight.BackButton = BackButton;
ChatHeaderRight.InfoButton = InfoButton;
ChatHeaderRight.CloseButton = CloseButton;

export default function ChatHeader({
  title = "Max",
  subtitle = "Ihr persönlicher Assistent für alle Fragen rund um TD Dig",
  avatar = "/images/td.png",
  children,
  backgroundColor,
}: TChatHeaderProps) {

  return (
    <div
      className="bg-primary-100 p-4 grid grid-cols-[1fr,auto]"
      style={{ backgroundColor: backgroundColor ?? "#5C2BFF" }}
    >
      <div className="flex items-center gap-4">
        <img
          src={avatar}
          alt={title}
          width={64}
          height={64}
          className="size-14 xl:size-16 object-cover rounded-full overflow-hidden bg-white"
        />

        <div className="flex flex-col gap-2 justify-between">
          <h1 className="text-lg md:text-xl xl:text-2xl font-bold text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs xl:text-sm text-[#D2D2D2]">{subtitle}</p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

ChatHeader.Right = ChatHeaderRight;

BackButton.displayName = "BackButton";
InfoButton.displayName = "InfoButton";
CloseButton.displayName = "CloseButton";
