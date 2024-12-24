import React, { ReactNode } from "react";

interface IconButtonProps {
  icon: ReactNode;
  onClick: () => void;
  active?: boolean;
  title?: string;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  active = false,
  title,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`
        p-2 rounded-md transition-colors 
        ${active ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}
        ${className}
      `}
    >
      {icon}
    </button>
  );
};

export default IconButton;
