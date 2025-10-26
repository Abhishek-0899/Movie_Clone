import React, { useRef } from "react";
// import { useSelector } from "react-redux";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import Cards from "./Cards";

const HorizontalScroll = ({ data = [], heading, trending }) => {
  // const trendingData = useSelector((state) => state.movieData.bannerData);
  // console.log("trending", trendingData);

  const containerRef = useRef();

  return (
    <div className="container mx-auto px-3 my-10">
      <h1 className="text-2xl font-bold font-serif">{heading}</h1>
      <div className="relative ">
        <div
          ref={containerRef}
          className="grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 mt-2 overflow-x-scroll relative z-20 overflow-hidden"
        >
          {data.map((data, index) => {
            return (
              <Cards
                key={data.id + "heading" + index}
                data={data}
                trending={trending}
                index={index + 1}
              />
            );
          })}
        </div>
        <div className="absolute top-0 flex items-center justify-between w-full h-full">
          <button className="text-black rounded-full bg-slate-100 p-4 -ml-7 z-20 hover:bg-red-500 cursor-pointer">
            <AiFillCaretLeft size={15} />
          </button>
          <button className="text-black rounded-full bg-slate-100 p-4 -mr-3 z-20 hover:bg-red-500 cursor-pointer">
            <AiFillCaretRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;
