import React from "react";
export default function Button({ className, children, withHoverEffect, variant, isLoading, ...rest }: React.ComponentProps<"button"> & {
    withHoverEffect?: boolean;
    variant?: "primary" | "secondary" | "tertiary";
    isLoading?: boolean;
}): React.JSX.Element;
