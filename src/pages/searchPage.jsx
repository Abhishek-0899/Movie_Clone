import axios from "axios";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const Cards = lazy(() => import("../components/Cards"));

const SearchPage = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // ✅ Extract search term from URL
  const searchTerm = decodeURIComponent(location.search.slice(3)); // e.g. "?q=batman" → "batman"

  // ✅ Debounce logic — wait 2 seconds after typing stops
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchTerm);
    }, 2000); // 2-second pause

    return () => clearTimeout(handler); // cleanup old timer if query changes fast
  }, [searchTerm]);

  const fetchData = async (query, page = 1) => {
    if (!query || isFetching) return;
    setIsFetching(true);
    try {
      const response = await axios.get(`/search/collection`, {
        params: {
          query,
          page,
        },
      });
      setData((prev) =>
        page === 1 ? response.data.results : [...prev, ...response.data.results]
      );
    } catch (e) {
      console.error("Error:", e);
    } finally {
      setIsFetching(false);
    }
  };

  // ✅ Fetch data when debounced query changes
  useEffect(() => {
    if (debouncedQuery) {
      setPageNo(1);
      setData([]);
      fetchData(debouncedQuery, 1);
    }
  }, [debouncedQuery]);

  // ✅ Fetch more pages (infinite scroll)
  useEffect(() => {
    if (pageNo > 1) {
      fetchData(debouncedQuery, pageNo);
    }
  }, [pageNo]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        setPageNo((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pt-14 text-white">
      <div className="container mx-auto">
        <h2 className="capitalize lg:text-lg font-bold my-2">Search Results</h2>

        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-7">
          {data.map((searchData, index) => (
            <Suspense fallback={<p>Loading...</p>}>
              <Cards
                data={searchData}
                key={`${searchData.id}-${index}-searchData`}
                media_type={searchData?.media_type || "movie"}
              />
            </Suspense>
          ))}
        </div>

        {/* Loader for bottom */}
        {isFetching && data.length > 0 && (
          <p className="text-center text-gray-400 mt-4">Loading more...</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
