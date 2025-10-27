import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cards from "../components/Cards";
const ExplorePage = () => {
  const params = useParams();
  // console.log("params", params.explore);
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  const [totalPageNo, settotalPageNo] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = async () => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const response = await axios.get(`/discover/${params.explore}`, {
        params: {
          page: pageNo,
        },
      });
      setData((preve) => {
        return [...preve, ...response.data.results];
      });
      settotalPageNo(response.data.total_pages);
      // console.log("response", response.data.results);
    } catch (e) {
      console.log("error", e);
    } finally {
      setIsFetching(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      setPageNo((preve) => preve + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.explore, pageNo, isFetching]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div className="pt-14 text-white">
        <div className="container mx-auto">
          <h2 className="capitalize lg:text-lg font-bold my-2">
            Popular <span>{params.explore}</span>Shows
          </h2>

          <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-7">
            {data.map((exploreData, index) => {
              return (
                <Cards
                  data={exploreData}
                  // key={exploreData.id + `exploreSection`}
                  key={`${exploreData.id}-${index}-exploreSection`}
                  media_type={params.explore}
                />
              );
            })}
          </div>
          {/* Loader for bottom */}
          {isFetching && (
            <p className="text-center text-gray-400 mt-4">Loading more...</p>
          )}
        </div>
      </div>
      ;
    </>
  );
};

export default ExplorePage;
