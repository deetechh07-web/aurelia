import React from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = "", showText = true, ...props }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <svg 
        viewBox="0 0 512 512" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-8 h-8 md:w-10 md:h-10 text-foreground"
        {...props}
      >
        <g fill="currentColor">
          <circle cx="256" cy="256" r="230" stroke="currentColor" strokeWidth="6" fill="none" opacity="0.15"/>
          <path d="M256 110 L140 400 H165 L256 160 L347 400 H372 L256 110 Z" />
          <rect x="200" y="300" width="112" height="8" />
          <polygon points="256,210 270,240 256,270 242,240" opacity="0.7"/>
        </g>
      </svg>
      {showText && (
        <span className="font-serif text-2xl md:text-3xl font-medium tracking-[0.2em] uppercase text-foreground -ml-1">
          URELIA
        </span>
      )}
    </div>
  );
}
