import React from "react";
import { cn } from "../../lib/cn";

// Step 1: Define the component props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline";
    // Add other custom props if needed
}

// Step 2: Create the component
const Button: React.FC<ButtonProps> = ({
    variant,
    className,
    children,
    ...props
}) => {
    // Define the base classes and variant classes

    const baseClasses =
        "flex h-10 items-center justify-between gap-1 rounded-full p-2 px-4 hover:brightness-90 font-jakarta text-xs font-extrabold active:scale-95 transition-all border border-transparent";
    const variantClasses = {
        primary: "bg-brand-yellow text-zinc-900",
        outline: "bg-zinc-900 text-brand-yellow border-brand-yellow",
    };

    // Use classnames to combine them
    const buttonClasses = cn(
        baseClasses,
        variant ? variantClasses[variant] : variantClasses.primary, // Default to primary if no variant is specified
        className // This allows custom classes to be passed in
    );

    return (
        <button className={buttonClasses} {...props}>
            {children}
        </button>
    );
};

export default Button;
