import React, { useEffect } from "react";

import { useSelector } from "react-redux";

const Home = () => {
  const bannerDat = useSelector((state) => state.movieData.bannerData);
  console.log("data", bannerDat);
  const imageUrl = useSelector((state) => state.movieData.imageUrl);
  console.log("image", imageUrl);

  useEffect(() => {}, [bannerDat]);
  return (
    <div className="">
      {bannerDat.map((data, index) => {
        return (
          <div className="flex flex-row">
            <img key={index} src={imageUrl + data.backdrop_path} alt="" />
          </div>
        );
      })}
    </div>
  );
};

export default Home;

// export const { setBannerData, setImageUrl } = MovieSlice.actions;
