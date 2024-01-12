import React, { InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

interface SearchGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    // Add other custom props if needed
}

// Step 2: Create the component
export const SearchGroup: React.FC<SearchGroupProps> = ({
    className,
    children,
    ...props
}) => {
    return (
        <div
            className={cn(
                "flex h-10 w-fit items-center justify-between gap-1 rounded-full bg-zinc-900 p-2 px-4 font-jakarta text-xs font-extrabold",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};
interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
    // Add other custom props if needed
}

// Step 2: Create the component
export const SearchInput: React.FC<SearchInputProps> = ({
    className,
    ...props
}) => {
    return (
        <input
            className={cn(
                "bg-transparent text-zinc-200 outline-none placeholder:text-zinc-700",
                className
            )}
            {...props}
        />
    );
};
