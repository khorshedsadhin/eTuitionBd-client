import React from "react";
import { TbFidgetSpinner } from "react-icons/tb";

const LoadingSpinner = ({ smallHeight, color }) => {
  return (
    <div
      className={`
        flex 
        justify-center 
        items-center 
        ${smallHeight ? "h-[250px]" : "h-[70vh]"} 
        ${color ? color : ""}
      `}
    >
      <TbFidgetSpinner 
        size={50} 
        className="animate-spin text-primary" 
      />
    </div>
  );
};

export default LoadingSpinner;