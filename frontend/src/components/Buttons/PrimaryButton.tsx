import React from "react";
import cn from "clsx";
import {Button} from "@/components/ui/button.tsx";

interface PrimaryButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    color?: string; // Pass classes like "bg-blue-100 text-blue-600" through props
    type?: "button" | "submit" | "reset";
    variant?: "outline" | "default" | "link" | "destructive" | "secondary" | "ghost"; // Reserved for future variants if needed
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    children,
    className,
    onClick,
    color,
    type = "button",
    variant = "outline",
}) => {
    return (
        <Button
            type={type}
            variant={variant}
            onClick={onClick}
            className={cn(
                "transition-transform duration-150 rounded-full active:translate-y-1 shadow-lg active:shadow-md px-4 py-2",
                color,
                className
            )}
        >
            {children}
        </Button>
    );
};

export default PrimaryButton;
