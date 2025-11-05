import React from "react";
import { useParams } from "react-router-dom";
import FetchData from "../hooks/fetchData";
import { useSelector } from "react-redux";

const DetailsPage = () => {
  const param = useParams();
  const { data } = FetchData(`/${param?.explore}/${param?.id}`);
  console.log('data'.data);
  
  // const { data: crewData } = FetchData(
  //   `/${param?.explore}/${param?.id}/credits`
  // );
  const imageUrl = useSelector((state) => state.movieData.imageUrl);
  return (
    <div className="">
      {/* Backdrop */}
      <div className="w-full h-[400px] relative">
        <img
          className="h-full object-cover w-full"
          src={imageUrl + data?.backdrop_path}
          
        />
        
      </div>
    </div>
  );
};

export default DetailsPage;
