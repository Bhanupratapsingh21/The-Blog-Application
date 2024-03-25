import React from "react";
function Button ({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    className = "text-white",
    textColor='red-500',
    ...props
}){
    return(
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    )
}
export default Button