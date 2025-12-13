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
        Maple Leaf Pancake House · West Hamilton · Since 1999
      </div>

      <Section className="bg-ph-red text-white overflow-hidden" pattern="dots">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left z-10">
            <div className="inline-block bg-black text-ph-yellow font-bold px-4 py-1 -rotate-2 mb-6 shadow-hard-sm text-sm">
              SERVING MCMASTER & WESTDALE
            </div>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.8] mb-6 drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
              MAPLE<br />
              LEAF<br />
              <span className="text-ph-yellow stroke-text">PANCAKE<br />HOUSE</span>
            </h1>
            <p className="font-bold text-lg md:text-2xl mb-8 max-w-lg leading-tight">
              The Hamilton breakfast staple that tastes like the mornings you grew up loving.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <BrutalButton onClick={scrollToMenu} variant="primary">See The Menu</BrutalButton>
              <BrutalButton onClick={scrollToMap} variant="secondary">Get Directions</BrutalButton>
            </div>
          </div>
          
          <div className="flex-1 relative w-full max-w-md md:max-w-full overflow-visible">
            <div className="absolute -top-8 -right-2 md:-right-8 w-28 md:w-32 h-28 md:h-32 text-ph-teal animate-pulse z-20">
              <StarburstSVG className="w-full h-full drop-shadow-[4px_4px_0_rgba(0,0,0,1)]" />
              <span className="absolute inset-0 flex items-center justify-center font-display text-ph-black text-xl rotate-12 text-center leading-none">
                OPEN<br/>DAILY!
              </span>
            </div>
            <div className="relative border-4 border-black bg-white p-2 rotate-3 shadow-hard-xl overflow-visible">
               <div className="aspect-[3/4] w-full overflow-hidden border-2 border-black">
                 <picture>
                   <source 
                     srcSet="/hero-400.webp 400w, /hero-600.webp 600w, /hero-800.webp 800w, /hero-1200.webp 1200w" 
                     sizes="(max-width: 768px) 100vw, 600px"
                     type="image/webp" 
                   />
                   <img 
                     src="/hero.webp" 
                     alt="Delicious breakfast dishes at Maple Leaf Pancake House featuring waffles, eggs benedict, and home fries" 
                     className="w-full h-full object-cover"
                     loading="eager"
                     decoding="sync"
                     width="600"
                     height="800"
                     {...{ fetchpriority: "high" } as any}
                   />
                 </picture>
               </div>
            </div>
          </div>
        </div>
      </Section>

      <div className="bg-black text-ph-yellow border-b-4 border-white py-4 overflow-hidden relative">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
          <span className="font-display text-3xl bg-ph-red text-white px-3 rotate-2 border-2 border-white">AWARD WINNING WAFFLE SPECIAL</span>
          <div>
            <span className="font-body"><span className="font-display text-2xl mr-2">Only $16.95:</span> Comes with 2 Strips of Bacon, 2 Sausages, and 1 Egg.</span>
          </div>
        </div>
      </div>

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
             <p className="font-bold text-lg mb-4">...AND TONS MORE OMELETTES, WAFFLES & BOTTOMLESS COFFEE.</p>
             <a href="/menu.pdf" target="_blank" rel="noopener noreferrer">
               <BrutalButton variant="primary">View Full Menu</BrutalButton>
             </a>
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
                  Founded in 1999 by the Vergos family. We survived the 90s diet crazes, the 2000s low-carb phase, and three recessions. We are fueled by McMaster students cramming for exams and locals needing a Saturday morning reset.
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
                  1520 Main St W<br/>Hamilton, ON L8S 1C8
                </p>
              </div>
              
              <div className="bg-white text-black border-4 border-black p-6 inline-block transform rotate-1 shadow-hard mb-8">
                <h3 className="font-display text-2xl mb-2">HOURS OF OPERATION</h3>
                <p className="text-left font-bold text-xl">OPEN 8 AM - 2:00 PM Daily</p>
              </div>

              <div>
                 <a 
                   href="https://www.google.com/maps/dir/?api=1&destination=1520+Main+St+W,+Hamilton,+ON+L8S+1C8" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   aria-label="Get directions to Maple Leaf Pancake House on Google Maps"
                 >
                   <BrutalButton variant="primary" fullWidth className="md:w-auto">
                     OPEN IN MAPS 
                     <span className="ml-2">↗</span>
                   </BrutalButton>
                 </a>
              </div>
            </div>

            <div className="flex-1 w-full relative">
               <div className="aspect-square bg-ph-cream border-4 border-black relative overflow-hidden shadow-hard-xl">
                  <svg viewBox="0 0 400 400" className="w-full h-full" role="img" aria-label="Map showing Maple Leaf Pancake House location at 1520 Main St W, 5 minutes walk from McMaster University">
                    <title>Location map of Maple Leaf Pancake House</title>
                    <rect width="400" height="400" fill="#FFFDF0" />
                    
                    <rect x="0" y="185" width="400" height="35" fill="#d4d4d4" stroke="#1a1a1a" strokeWidth="2" />
                    
                    <rect x="140" y="0" width="28" height="400" fill="#d4d4d4" stroke="#1a1a1a" strokeWidth="2" />
                    
                    <rect x="15" y="192" width="100" height="20" fill="#1a1a1a" rx="3" />
                    <text x="65" y="206" fill="white" fontWeight="bold" fontSize="12" textAnchor="middle">MAIN ST W</text>
                    
                    <rect x="145" y="280" width="18" height="80" fill="#1a1a1a" rx="2" />
                    <text x="154" y="320" fill="white" fontWeight="bold" fontSize="9" textAnchor="middle" transform="rotate(-90, 154, 320)">NORFOLK ST N</text>
                    
                    <g>
                      <rect x="310" y="75" width="80" height="55" fill="#dbeafe" stroke="#1a1a1a" strokeWidth="2" rx="4" />
                      <text x="350" y="98" fill="#1e40af" fontWeight="bold" fontSize="10" textAnchor="middle">MCMASTER</text>
                      <text x="350" y="112" fill="#1e40af" fontWeight="bold" fontSize="10" textAnchor="middle">UNIVERSITY</text>
                      <line x1="270" y1="102" x2="305" y2="102" stroke="#1a1a1a" strokeWidth="2" strokeDasharray="4,2" />
                      <polygon points="305,98 310,102 305,106" fill="#1a1a1a" />
                      <text x="287" y="95" fill="#666" fontSize="9" textAnchor="middle">5 min</text>
                    </g>
                    
                    <g className="animate-pulse">
                      <path d="M230 160 L230 172 L218 185 L242 185 L230 172" fill="#FF2A2A" stroke="#1a1a1a" strokeWidth="2" />
                      <circle cx="230" cy="138" r="26" fill="#FF2A2A" stroke="#1a1a1a" strokeWidth="3" />
                      <text x="230" y="146" fill="white" fontWeight="bold" fontSize="18" textAnchor="middle">PH</text>
                    </g>
                    <rect x="180" y="240" width="100" height="22" fill="white" stroke="#1a1a1a" strokeWidth="2" rx="3" />
                    <text x="230" y="256" fill="#1a1a1a" fontWeight="bold" fontSize="11" textAnchor="middle">PANCAKE HOUSE</text>
                  </svg>
               </div>
            </div>
          </div>
        </Section>
      </section>

      <footer className="bg-black text-white py-12 border-t-4 border-ph-yellow">
        <div className="container mx-auto px-4 text-center">
          <p className="font-display text-4xl mb-4 text-ph-yellow">MAPLE LEAF PANCAKE HOUSE</p>
          <p className="font-bold text-sm text-gray-400">
            © {new Date().getFullYear()} Maple Leaf Pancake House. Not affiliated with any cereal brands.
          </p>
          <a 
            href="https://www.instagram.com/mapleleafpancake/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block mt-4 font-bold text-ph-yellow hover:text-white transition-colors"
            aria-label="Follow Maple Leaf Pancake House on Instagram"
          >
            @mapleleafpancake on Instagram
          </a>
          <p className="font-bold text-sm text-gray-400 mt-2">
            <a href="https://goldberg-web-design.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-ph-yellow transition-colors">
              Designed for Hungry Students by Goldberg
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
};

export default App;
