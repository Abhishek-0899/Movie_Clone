import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cards = ({ data, trending, index }) => {
  const imageUrl = useSelector((state) => state.movieData.imageUrl);
  // console.log("imageUrl", imageUrl);
  return (
    <Link
      to={"/" + data.media_type + "/" + data.id}
      className="w-full min-w-[230px] max-w-[230px] h-90 overflow-hidden rounded relative"
    >
      <img src={imageUrl + data?.poster_path} alt="" loading="lazy" />
      <div className="absolute top-0">
        {trending && (
          <div className="bg-red-600 text-white rounded-e-2xl backdrop-blur-sm overflow-hidden p-1">
            #{index} trending
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 h-20 w-full px-4 bg-black/40 backdrop-blur-sm">
        <h2 className="text-white">{data?.title || data?.name}</h2>
        <div className="flex text-white">
          <p>
            <span>Rating : </span>
            {data.vote_average?.toFixed(1)}⭐
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Cards;
