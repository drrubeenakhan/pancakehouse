import React from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  pattern?: 'dots' | 'zigzags' | 'none';
}

const Section: React.FC<SectionProps> = ({ id, className = '', children, pattern = 'none' }) => {
  let patternStyle = {};
  
  if (pattern === 'dots') {
    patternStyle = {
      backgroundImage: 'radial-gradient(black 1.5px, transparent 1.5px)',
      backgroundSize: '24px 24px',
      opacity: 0.1
    };
  } else if (pattern === 'zigzags') {
    patternStyle = {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='12' viewBox='0 0 40 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 12L10 2L20 12L30 2L40 12' stroke='black' stroke-width='2' fill='none'/%3E%3C/svg%3E")`,
      opacity: 0.1
    };
  }

  return (
    <section id={id} className={`relative w-full overflow-hidden border-b-4 border-black ${className}`}>
      {pattern !== 'none' && (
        <div className="absolute inset-0 pointer-events-none" style={patternStyle}></div>
      )}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-24">
        {children}
      </div>
    </section>
  );
};

export default Section;
