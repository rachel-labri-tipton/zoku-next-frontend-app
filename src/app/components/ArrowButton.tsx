import { ArrowLeft, ArrowRight } from 'lucide-react';

import Button from '@mui/material/Button';

interface ArrowButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  ariaLabel?: string;
  className?: string;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
  direction,
  onClick,
  ariaLabel,
  className = '',
}) => {
  return (
    <Button
      onClick={onClick}
      aria-label={ariaLabel || `${direction === 'left' ? 'Previous' : 'Next'}`}
      className={`
        rounded-full 
        border-2 
        border-black 
        w-11 
        h-11 
        flex 
        items-center 
        justify-center 
        text-xl 
        bg-white 
        hover:bg-black 
        hover:text-white 
        transition-all 
        duration-200 
        shadow-[2px_2px_0_0_black]
        ${className}
      `}
    >
      {direction === 'left' ? <ArrowLeft /> : <ArrowRight />}
    </Button>
  );
};

export default ArrowButton;
