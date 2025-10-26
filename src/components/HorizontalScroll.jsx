import React, { useRef } from "react";
// import { useSelector } from "react-redux";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import Cards from "./Cards";

const HorizontalScroll = ({ data = [], heading, trending }) => {
  // const trendingData = useSelector((state) => state.movieData.bannerData);
  // console.log("trending", trendingData);

  const containerRef = useRef();
  const handleNext = () => {
    // 1st method
    // containerRef.current.scroll += 300;
    // 2nd method
    containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };
  const handlePrev = () => {
    containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };
  return (
    <div className="container mx-auto px-3 my-10">
      <h1 className="text-2xl font-bold font-serif">{heading}</h1>
      <div className="relative ">
        <div
          ref={containerRef}
          className="grid grid-cols-[repeat(auto-fit,230px)]
           grid-flow-col gap-6 mt-2 relative z-20 overflow-hidden
           scroll-smooth transition-all ease-in"
        >
          {data.map((data, index) => {
            return (
              <Cards
                key={data.id + "heading" + index}
                data={data}
                trending={trending}
                index={index + 1}
                className="snap-start"
              />
            );
          })}
        </div>
        <div className="absolute top-0 flex items-center justify-between w-full h-full">
          <button
            onClick={handlePrev}
            className="text-black rounded-full bg-slate-100 p-4 -ml-7 z-20 hover:bg-red-500 cursor-pointer"
          >
            <AiFillCaretLeft size={15} />
          </button>
          <button
            onClick={handleNext}
            className="text-black rounded-full bg-slate-100 p-4 -mr-3 z-20 hover:bg-red-500 cursor-pointer"
          >
            <AiFillCaretRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;
