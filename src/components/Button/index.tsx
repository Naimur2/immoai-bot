
import React from "react";
import { cn } from '../../lib/utils';

export default function Button({
    className,
    children,
    withHoverEffect = true,
    variant = "primary",
    isLoading = false,
    ...rest
}: React.ComponentProps<"button"> & {
    withHoverEffect?: boolean;
    variant?: "primary" | "secondary" | "tertiary";
    isLoading?: boolean;
}) {
    return (
        <button
            className={cn(
                "text-white  bg-primary-100 px-4 py-3 xl:px-5 xl:py-3 rounded-md font-bold text-xs sm:text-sm xl:text-base flex items-center justify-center transition-all duration-200 border-2 border-transparent group",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                {
                    "hover:bg-white hover:text-primary-100 hover:border-primary-100":
                        withHoverEffect && variant === "primary",
                    "bg-white text-primary-100 border-primary-100":
                        variant === "secondary",
                    "bg-white text-[#FF3366] border-[#FFD2DE]":
                        variant === "tertiary",
                    "hover:bg-primary-100 hover:text-white hover:border-transparent":
                        withHoverEffect && variant === "secondary",
                },
                className
            )}
            disabled={isLoading}
            {...rest}
        >
            {isLoading ? <span className="loader"></span> : children}
        </button>
    );
}
