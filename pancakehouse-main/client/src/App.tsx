import React, { useEffect, useState, useRef } from 'react';
import { getDailySpecial } from '@/services/geminiService';
import { MENU_ITEMS, RULES, REVIEWS } from '@/constants';
import BrutalButton from '@/components/BrutalButton';
import MenuCard from '@/components/MenuCard';
import Section from '@/components/Section';

const StarburstSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path d="M50 0 L61 35 L98 35 L68 57 L79 91 L50 70 L21 91 L32 57 L2 35 L39 35 Z" fill="currentColor" stroke="black" strokeWidth="2" />
  </svg>
);

const SquiggleSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 20" className={className} preserveAspectRatio="none">
    <path d="M0 10 Q 5 0, 10 10 T 20 10 T 30 10 T 40 10 T 50 10 T 60 10 T 70 10 T 80 10 T 90 10 T 100 10" fill="none" stroke="currentColor" strokeWidth="4" />
  </svg>
);

const App: React.FC = () => {
  const [special, setSpecial] = useState<{ name: string; description: string } | null>(null);
  const [loadingSpecial, setLoadingSpecial] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (import.meta.env.VITE_API_KEY) {
      setLoadingSpecial(true);
      getDailySpecial().then(data => {
        setSpecial(data);
        setLoadingSpecial(false);
      });
    } else {
      setSpecial({
        name: "THE 90s REBOOT",
        description: "Radical raspberry puree on a stack of nostalgia."
      });
    }
  }, []);

  const scrollToMenu = () => menuRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToMap = () => mapRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main className="min-h-screen bg-ph-cream font-body">
      
      <div className="bg-ph-yellow border-b-4 border-black py-2 px-4 text-center font-bold tracking-widest text-xs md:text-sm uppercase">
        Pancake House · West Hamilton · Since 1994
      </div>

      <Section className="bg-ph-red text-white" pattern="dots">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left z-10">
            <div className="inline-block bg-black text-ph-yellow font-bold px-4 py-1 -rotate-2 mb-6 shadow-hard-sm text-sm">
              SERVING MCMASTER & WESTDALE
            </div>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.8] mb-6 drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
              PANCAKE<br />
              <span className="text-ph-yellow stroke-text">HOUSE</span><br />
              SATURDAY<br />
              MORNING<br />
              FOREVER
            </h1>
            <p className="font-bold text-lg md:text-2xl mb-8 max-w-lg leading-tight">
              The 30-year-old breakfast institution that tastes like cartoons and maple syrup.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <BrutalButton onClick={scrollToMenu} variant="primary">See The Menu</BrutalButton>
              <BrutalButton onClick={scrollToMap} variant="secondary">Get Directions</BrutalButton>
            </div>
          </div>
          
          <div className="flex-1 relative w-full max-w-md md:max-w-full overflow-visible">
            <div className="absolute -top-8 -right-8 w-32 h-32 text-ph-teal animate-pulse z-20">
              <StarburstSVG className="w-full h-full drop-shadow-[4px_4px_0_rgba(0,0,0,1)]" />
              <span className="absolute inset-0 flex items-center justify-center font-display text-ph-black text-xl rotate-12 text-center leading-none">
                OPEN<br/>DAILY!
              </span>
            </div>
            <div className="relative border-4 border-black bg-white p-2 rotate-3 shadow-hard-xl overflow-visible">
               <img 
                 src="https://picsum.photos/600/600?random=hero" 
                 alt="Giant stack of pancakes" 
                 className="w-full h-auto border-2 border-black object-cover"
                 width="600"
                 height="600"
                 loading="eager"
               />
            </div>
          </div>
        </div>
      </Section>

      {special && (
        <div className="bg-black text-ph-yellow border-b-4 border-white py-4 overflow-hidden relative">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <span className="font-display text-3xl bg-ph-red text-white px-3 rotate-2 border-2 border-white">TODAY'S AI SPECIAL</span>
            <div>
              <span className="font-display text-2xl uppercase mr-2">{special.name}:</span>
              <span className="font-body font-bold">{special.description}</span>
            </div>
          </div>
        </div>
      )}

      <section ref={menuRef}>
        <Section className="bg-ph-cream" pattern="zigzags">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-4 border-black pb-6 border-dashed">
            <div>
               <h2 className="font-display text-5xl md:text-7xl mb-2">EPISODE 01:<br/>THE FOOD</h2>
               <SquiggleSVG className="text-ph-red w-48 h-4" />
            </div>
            <p className="font-display text-2xl md:text-4xl text-ph-red mt-4 md:mt-0 max-w-xs text-right leading-none">
              CHOOSE YOUR BREAKFAST POWER-UP.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {MENU_ITEMS.map((item) => (
              <MenuCard key={item.id} item={item} onOrder={scrollToMap} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
             <p className="font-bold text-lg mb-4">...AND TONS MORE OMELETTES, WAFFLES & BAD COFFEE.</p>
             <BrutalButton variant="primary">Download Full PDF Menu</BrutalButton>
          </div>
        </Section>
      </section>

      <Section className="bg-ph-yellow">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-5xl md:text-6xl text-center mb-12 bg-white border-4 border-black inline-block px-8 py-2 shadow-hard transform -rotate-1 mx-auto block">
            THE PANCAKE HOUSE CODE
          </h2>

          <div className="space-y-6">
            {RULES.map((rule, index) => (
              <div key={rule.id} className={`bg-white border-4 border-black p-6 shadow-hard flex gap-6 items-start transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0 transition-transform`}>
                <div className="font-display text-6xl text-ph-teal stroke-text-yellow leading-none">
                  #{rule.id}
                </div>
                <div>
                  <h3 className="font-display text-3xl mb-1 uppercase">{rule.title}</h3>
                  <p className="font-bold text-lg">{rule.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 border-4 border-black bg-white p-2 max-w-md mx-auto rotate-1 shadow-hard-xl">
             <div className="border-2 border-black p-4">
                <h3 className="font-black text-4xl border-b-8 border-black mb-2">Heritage Facts</h3>
                <p className="font-bold text-sm mb-1">Serving Size: 1 Neighborhood</p>
                <div className="h-2 bg-black mb-4"></div>
                <p className="font-body text-sm leading-relaxed font-semibold">
                  Founded in 1994 by the Kowalski family. We survived the 90s diet crazes, the 2000s low-carb phase, and three recessions. We are fueled by McMaster students cramming for exams and locals needing a Saturday morning reset.
                </p>
                <div className="h-1 bg-black mt-4 mb-1"></div>
                <p className="font-black text-xs">INGREDIENTS: LOVE, FLOUR, NOSTALGIA.</p>
             </div>
          </div>
        </div>
      </Section>

      <Section className="bg-white" pattern="dots">
        <h2 className="font-display text-5xl text-center mb-12">FAN MAIL</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {REVIEWS.map((review, idx) => (
             <div key={review.id} className={`relative p-8 border-4 border-black ${idx === 2 ? 'md:col-span-3 bg-ph-teal text-white' : 'bg-gray-100'}`}>
                <p className={`font-display uppercase mb-4 leading-tight ${idx === 2 ? 'text-4xl md:text-6xl text-center' : 'text-2xl'}`}>
                  "{review.quote}"
                </p>
                <div className={`flex items-center gap-2 font-bold text-sm ${idx === 2 ? 'justify-center' : ''}`}>
                  <div className="w-8 h-8 bg-black rounded-full"></div>
                  <span>{review.name} <span className="opacity-70 font-normal">— {review.role}</span></span>
                </div>
             </div>
           ))}
        </div>
      </Section>

      <section ref={mapRef}>
        <Section className="bg-ph-red text-white">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-display text-5xl md:text-7xl mb-6">LEVEL: FIND THE FRONT DOOR</h2>
              <div className="space-y-4 font-bold text-xl mb-8">
                <p className="flex items-center gap-3 justify-center md:justify-start">
                  <span className="bg-ph-yellow text-black px-2 py-1 border-2 border-black text-sm">ZONE</span> 
                  West Hamilton / Ainslie Wood
                </p>
                <p className="flex items-center gap-3 justify-center md:justify-start">
                  <span className="bg-ph-yellow text-black px-2 py-1 border-2 border-black text-sm">PROXIMITY</span> 
                  5 min walk from McMaster
                </p>
                <p className="text-2xl mt-4 border-t-4 border-white pt-4 inline-block">
                  1234 Main Street West<br/>Hamilton, ON
                </p>
              </div>
              
              <div className="bg-white text-black border-4 border-black p-6 inline-block transform rotate-1 shadow-hard mb-8">
                <h3 className="font-display text-2xl mb-2">HOURS OF OPERATION</h3>
                <ul className="text-left font-bold space-y-1">
                  <li className="flex justify-between w-64"><span>MON-FRI</span> <span>7:00 AM - 2:00 PM</span></li>
                  <li className="flex justify-between w-64 text-ph-red"><span>SAT-SUN</span> <span>8:00 AM - 3:00 PM</span></li>
                </ul>
              </div>

              <div>
                 <BrutalButton variant="primary" fullWidth className="md:w-auto">
                   OPEN IN MAPS 
                   <span className="ml-2">↗</span>
                 </BrutalButton>
              </div>
            </div>

            <div className="flex-1 w-full relative">
               <div className="aspect-square bg-ph-cream border-4 border-black relative overflow-hidden shadow-hard-xl">
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    <rect width="400" height="400" fill="#FFFDF0" />
                    
                    <rect x="0" y="340" width="400" height="35" fill="#e5e5e5" stroke="#1a1a1a" strokeWidth="2" />
                    <text x="200" y="362" fill="#666" fontWeight="bold" fontSize="12" textAnchor="middle">HWY 8</text>
                    
                    <rect x="30" y="0" width="25" height="340" fill="#e5e5e5" stroke="#1a1a1a" strokeWidth="2" />
                    <text x="42" y="200" fill="#666" fontWeight="bold" fontSize="10" textAnchor="middle" transform="rotate(-90, 42, 200)">COOTES DR</text>
                    
                    <rect x="120" y="100" width="20" height="275" fill="#d4d4d4" stroke="#1a1a1a" strokeWidth="1" />
                    <text x="130" y="250" fill="#888" fontWeight="bold" fontSize="9" textAnchor="middle" transform="rotate(-90, 130, 250)">NORFOLK ST N</text>
                    
                    <path d="M55 80 Q 150 60, 280 30" fill="none" stroke="#d4d4d4" strokeWidth="18" />
                    <path d="M55 80 Q 150 60, 280 30" fill="none" stroke="#1a1a1a" strokeWidth="1" />
                    <text x="170" y="55" fill="#888" fontSize="8">SCHOLARS RD</text>
                    
                    <rect x="55" y="180" width="300" height="20" fill="#d4d4d4" stroke="#1a1a1a" strokeWidth="1" />
                    <text x="200" y="194" fill="#888" fontSize="9" textAnchor="middle">COLLEGE CRES</text>
                    
                    <rect x="280" y="200" width="15" height="175" fill="#d4d4d4" stroke="#1a1a1a" strokeWidth="1" />
                    <text x="287" y="290" fill="#888" fontSize="8" textAnchor="middle" transform="rotate(-90, 287, 290)">UNIVERSITY AVE</text>
                    
                    <rect x="200" y="40" width="180" height="130" fill="#dbeafe" stroke="#1a1a1a" strokeWidth="2" rx="4" />
                    <text x="290" y="90" fill="#1e40af" fontWeight="bold" fontSize="14" textAnchor="middle">MCMASTER</text>
                    <text x="290" y="110" fill="#1e40af" fontWeight="bold" fontSize="14" textAnchor="middle">UNIVERSITY</text>
                    
                    <rect x="160" y="220" width="100" height="60" fill="#f0fdf4" stroke="#1a1a1a" strokeWidth="1" rx="2" />
                    <text x="210" y="250" fill="#166534" fontSize="8" textAnchor="middle">INSTITUTE FOR</text>
                    <text x="210" y="262" fill="#166534" fontSize="8" textAnchor="middle">HEALTH SCIENCES</text>
                    
                    <rect x="160" y="290" width="80" height="40" fill="#f0fdf4" stroke="#1a1a1a" strokeWidth="1" rx="2" />
                    <text x="200" y="312" fill="#166534" fontSize="8" textAnchor="middle">INFO TECH</text>
                    
                    <circle cx="80" y="375" r="10" fill="#ef4444" stroke="#1a1a1a" strokeWidth="2" cy="375" />
                    <text x="80" y="379" fill="white" fontWeight="bold" fontSize="8" textAnchor="middle">E</text>
                    
                    <rect x="320" y="355" width="70" height="25" fill="#fce7f3" stroke="#1a1a1a" strokeWidth="1" rx="2" />
                    <text x="355" y="372" fill="#9d174d" fontSize="8" textAnchor="middle">SHOPPERS</text>
                    
                    <g className="animate-bounce">
                      <path d="M70 290 L70 310 L55 340 L85 340 L70 310" fill="#FF2A2A" stroke="#1a1a1a" strokeWidth="2" />
                      <circle cx="70" cy="278" r="20" fill="#FF2A2A" stroke="#1a1a1a" strokeWidth="3" />
                    </g>
                    <text x="70" y="284" fill="white" fontWeight="bold" fontSize="12" textAnchor="middle">PH</text>
                    <text x="95" y="270" fill="#1a1a1a" fontWeight="bold" fontSize="9">MAPLE LEAF</text>
                    <text x="95" y="282" fill="#1a1a1a" fontWeight="bold" fontSize="9">PANCAKE HOUSE</text>
                  </svg>
               </div>
            </div>
          </div>
        </Section>
      </section>

      <footer className="bg-black text-white py-12 border-t-4 border-ph-yellow">
        <div className="container mx-auto px-4 text-center">
          <p className="font-display text-4xl mb-4 text-ph-yellow">PANCAKE HOUSE</p>
          <p className="font-bold text-sm text-gray-400">
            © {new Date().getFullYear()} Pancake House. Not affiliated with any cereal brands.
            <br/>Designed for hungry students.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default App;
