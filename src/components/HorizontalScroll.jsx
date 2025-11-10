import React, { lazy, Suspense, useRef } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
const Cards = lazy(() => import("./Cards"));

const HorizontalScroll = ({ data = [], heading, trending }) => {
  const containerRef = useRef(null);
  const scrolling = useRef(false);

  const scroll = (direction) => {
    if (scrolling.current || !containerRef.current) return;
    
    scrolling.current = true;
    const container = containerRef.current;
    const scrollAmount = direction === 'right' ? 600 : -600;
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });

    // Reset scrolling flag after animation
    setTimeout(() => {
      scrolling.current = false;
    }, 300);
  };
  return (
    <div className="container mx-auto px-3 my-10">
      <h1 className="text-2xl text-white font-serif">{heading}</h1>
      <div className="relative group">
        <div
          ref={containerRef}
          className="grid grid-cols-[repeat(auto-fit,230px)]
           grid-flow-col gap-6 mt-2 relative z-20 overflow-x-auto
           scroll-smooth"
          style={{ scrollbarWidth: 'none' }}
        >
          {data.map((item, index) => (
            <Suspense 
              key={`${item.id}-${index}`}
              fallback={<div className="w-[230px] h-[345px] bg-gray-800 rounded" />}
            >
              <Cards
                data={item}
                trending={trending}
                index={index + 1}
              />
            </Suspense>
          ))}
        </div>
        
        {/* Navigation Buttons */}
        <div className="absolute top-0 flex items-center justify-between w-full h-full">
          <button
            onClick={() => scroll('left')}
            className="text-black rounded-full bg-slate-100 p-4 -ml-7 z-20 
                     hover:bg-red-500 cursor-pointer opacity-0 group-hover:opacity-100"
          >
            <AiFillCaretLeft size={15} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="text-black rounded-full bg-slate-100 p-4 -mr-3 z-20 
                     hover:bg-red-500 cursor-pointer opacity-0 group-hover:opacity-100"
          >
            <AiFillCaretRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;
