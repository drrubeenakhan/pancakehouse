import React from 'react';
import { MenuItem } from '@/types';

interface MenuCardProps {
  item: MenuItem;
}

const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  return (
    <div className="bg-white border-4 border-black shadow-hard p-4 flex flex-col h-full transform transition-transform hover:-rotate-1">
      <div className="relative mb-4 border-4 border-black overflow-hidden bg-gray-200 aspect-[4/3]">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
          width="400"
          height="300"
          loading="lazy"
        />
        {item.badge && (
          <div className="absolute top-[-10px] right-[-10px] bg-ph-teal border-2 border-black text-white text-xs font-bold px-3 py-1 rotate-12 shadow-hard-sm">
            {item.badge}
          </div>
        )}
      </div>
      <div className="flex-grow">
        <h3 className="font-display text-2xl md:text-3xl leading-none mb-2 uppercase">{item.name}</h3>
        <p className="font-body text-black/80 font-bold text-sm md:text-base mb-4 leading-tight">
          {item.description}
        </p>
      </div>
      <div className="mt-auto flex justify-between items-center border-t-2 border-black pt-3 border-dashed">
        <span className="font-display text-2xl text-ph-red">{item.price}</span>
        <button className="bg-black text-white font-body font-bold text-xs uppercase px-3 py-1 hover:bg-ph-yellow hover:text-black transition-colors">
          Order
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
