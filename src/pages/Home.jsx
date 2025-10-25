import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

const Home = () => {
  const bannerDat = useSelector((state) => state.movieData.bannerData);
  // console.log("data", bannerDat);
  const imageUrl = useSelector((state) => state.movieData.imageUrl);
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => {
    setCurrentImage((prev) => (prev == bannerDat.length - 1 ? 0 : prev + 1));
  };
  const handlePrev = () => {
    setCurrentImage((prev) => (prev > bannerDat.length - 1 ? 0 : prev - 1));
  };

  useEffect(() => {
    if (!bannerDat || bannerDat.length === 0) return;
    const timer = setTimeout(() => {
      setCurrentImage((prev) => (prev === bannerDat.length - 1 ? 0 : prev + 1));
    }, 2000); // 3 seconds

    return () => clearTimeout(timer);
  }, [currentImage, bannerDat.length]);
  return (
    <div className="w-full h-full">
      <div className="flex min-h-full max-h-[90vh]">
        {bannerDat.map((data, index) => {
          return (
            <div
              className="min-w-full min-h-[450px] overflow-hidden relative"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <div className="w-full h-full">
                <img
                  className="h-full w-full object-cover"
                  key={index}
                  src={imageUrl + data.backdrop_path}
                  alt=""
                  loading="lazy"
                />
              </div>

              <div className="absolute top-0 w-full h-full flex items-center justify-between z-10">
                <button
                  onClick={handlePrev}
                  className="text-black rounded-full bg-slate-100 p-4 hover:bg-red-500 cursor-pointer"
                >
                  <AiFillCaretLeft size={15} />
                </button>
                <button
                  onClick={handleNext}
                  className="text-black rounded-full bg-slate-100 p-4 hover:bg-black"
                >
                  <AiFillCaretRight size={15} />
                </button>
              </div>

              <div
                className="absolute top-0 w-full h-full
              bg-gradient-to-t from-neutral-800 to-transparent"
              ></div>

              <div className="container mx-auto">
                <div className=" absolute bottom-0 px-5 max-w-2xl py-4">
                  <h1 className="text-white text-3xl font-bold">
                    {data?.title || data?.original_title || data?.original_name}
                  </h1>
                  <p className="text-white font-serif text-ellipsis line-clamp-3">
                    {data.overview}
                  </p>

                  <div className="flex gap-4 font-semibold text-white">
                    <p>
                      <span>Rating : </span>
                      {data.vote_average?.toFixed(1)}⭐
                    </p>
                    <p>
                      <span>Views :</span>
                      {data.vote_count} 👁️
                    </p>
                  </div>
                  <button className="rounded-lg font-bold cursor-pointer bg-orange-400 px-2 py-1 mt-2 hover:bg-orange-600 z-20  relative transition-colors duration-300">
                    Play
                  </button>
                  {/* <button className="rounded-lg font-bold cursor-pointer bg-orange-400 px-2 py-1 mt-2 hover:bg-slate-600 z-10 relative transition-colors duration-300">
                    Play
                  </button> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

// export const { setBannerData, setImageUrl } = MovieSlice.actions;
