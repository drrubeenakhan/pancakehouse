import React from 'react';

interface BrutalButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
  onClick?: () => void;
  fullWidth?: boolean;
}

const BrutalButton: React.FC<BrutalButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  fullWidth = false
}) => {
  const baseStyles = "relative inline-block border-4 border-black font-display font-bold uppercase tracking-wider transition-transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-hard-sm hover:-translate-y-1 hover:shadow-hard-xl";
  
  const variants = {
    primary: "bg-ph-yellow text-black shadow-hard",
    secondary: "bg-white text-black shadow-hard",
    accent: "bg-ph-teal text-white shadow-hard",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className} px-6 py-4 text-xl md:text-2xl`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default BrutalButton;
