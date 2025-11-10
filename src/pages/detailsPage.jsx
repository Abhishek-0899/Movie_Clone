import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import FetchData from "../hooks/fetchData";
import { useSelector } from "react-redux";
import HorizontalScroll from "../components/HorizontalScroll";

const DetailsPage = () => {
  const param = useParams();
  const imageUrl = useSelector((state) => state?.movieData?.imageUrl ?? "");
  const { data, loading, error } =
    FetchData(`/${param?.explore}/${param?.id}`) ?? {};
  const { data: similarData } =
    FetchData(`/${param?.explore}/${param?.id}/similar`) ?? {};
  const { data: recommendedMovie } =
    FetchData(`/${param?.explore}/${param?.id}/recommendations`) ?? {};

  const fallbackPoster = "/fallback-poster.png";

  const popularity = useMemo(
    () =>
      typeof data?.popularity === "number" ? data.popularity.toFixed(1) : "N/A",
    [data?.popularity]
  );

  const voteAverage = useMemo(
    () =>
      typeof data?.vote_average === "number"
        ? data.vote_average.toFixed(1)
        : "N/A",
    [data?.vote_average]
  );

  if (loading) return <div className="text-white p-4">Loading...</div>;
  if (error)
    return <div className="text-red-500 p-4">Failed to load data.</div>;
  if (!data) return null;

  const getArray = (d) =>
    Array.isArray(d) ? d : Array.isArray(d?.results) ? d.results : [];
  const similarArr = getArray(similarData);
  const recommendedArr = getArray(recommendedMovie);

  return (
    <div>
      <div className="relative min-h-screen bg-black text-white">
        {/* Backdrop */}
        <div className="w-full h-[400px] relative overflow-hidden">
          <img
            loading="lazy"
            className="h-full w-full object-cover brightness-75"
            src={imageUrl + data?.backdrop_path}
            alt={data?.title || data?.name || "Poster"}
            onError={(e) => (e.target.style.display = "none")}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center gap-10 px-20 mt-60">
          {/* Poster */}
          <div className="w-[220px] h-[320px] flex-shrink-0 border-4 border-white rounded-xl overflow-hidden shadow-2xl">
            <img
              src={imageUrl + data?.poster_path}
              alt={data?.title || "Poster"}
              className="w-full h-full object-cover transition-all duration-500 ease-in-out blur-sm hover:blur-0"
              onError={(e) => (e.target.src = fallbackPoster)}
              onLoad={(e) => e.target.classList.add("opacity-100")}
            />
          </div>

          {/* Text Section */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-3">
              {data?.title || data?.name}
            </h1>

            <p className="text-gray-400 mb-3 text-lg">
              {data?.tagline && <span>“{data.tagline}”</span>}
            </p>

            <div className="space-y-3 text-lg">
              <p>
                <span className="text-gray-400">Released on:</span>{" "}
                {data?.release_date || data?.first_air_date || "N/A"}
              </p>
              <p>
                <span className="text-gray-400">Popularity:</span> {popularity}
              </p>
              <p>
                <span className="text-gray-400">Vote Average:</span>{" "}
                {voteAverage}
              </p>
            </div>

            {data?.overview && (
              <p className="mt-6 text-gray-300 leading-relaxed max-w-2xl">
                {data.overview}
              </p>
            )}
          </div>
        </div>
      </div>
      <div>
        {similarArr.length > 0 && (
          <HorizontalScroll heading={"Similar Shows"} data={similarData} />
        )}
        {recommendedArr.length > 0 && (
          <HorizontalScroll
            heading={"Recommended Shows"}
            data={recommendedMovie}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(DetailsPage);
