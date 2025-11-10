import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BannerHome = () => {
  const bannerDat = useSelector((state) => state.movieData.bannerData);
  const navigate = useNavigate();
  const imageUrl = useSelector((state) => state.movieData.imageUrl);
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => {
    setCurrentImage((prev) => (prev === bannerDat?.length - 1 ? 0 : prev + 1));
  };
  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? bannerDat?.length - 1 : prev - 1));
  };

  const handleDetailsPage = (item) => {
    navigate(`/${item.media_type || "movie"}/${item.id}`);
  };

  useEffect(() => {
    if (!bannerDat?.length) return;
    const timer = setInterval(() => {
      setCurrentImage((prev) =>
        prev === bannerDat?.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [currentImage, bannerDat?.length]);

  if (!bannerDat || bannerDat.length === 0) return null;
  return (
    <div className="w-full h-full">
      <div className="flex min-h-full max-h-[90vh] overflow-hidden">
        {bannerDat.map((data, index) => {
          return (
            <div
              key={data.id + "bannerHome" + index}
              className="min-w-full overflow-hidden relative"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <div className="w-full h-full">
                <img
                  className="h-full w-full object-cover"
                  src={imageUrl + data.backdrop_path}
                  alt={data?.title || "Movie Poster"}
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
                  <button
                    onClick={() => handleDetailsPage(data)}
                    className="rounded-lg font-bold cursor-pointer bg-orange-400 px-2 py-1 mt-2 hover:bg-orange-600 z-20  relative transition-colors duration-300"
                  >
                    Watch
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BannerHome;
