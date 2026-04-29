import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = "secondary",
    size = "lg",
    className = "",
    ...props
}) => {
    const baseStyles = "font-semibold rounded-lg focus:outline-none focus:ring transition duration-150";

    const variants = {
        primary: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 focus:ring-blue-400",
        secondary: "bg-gradient-to-r text-xs from-cyan-500 to-cyan-700 text-white hover:from-green-600 hover:to-cyan-800 focus:ring-gray-400",
        outline: "border border-blue-500 text-blue-500 hover:bg-blue-50 focus:ring-blue-400",
    };

    const sizes = {
        sm: "text-sm px-3 py-2",
        md: "text-base px-4 py-2",
        lg: "text-lg px-8 py-1",
    };

    return (
        <button
            className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${className}`.trim()}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
