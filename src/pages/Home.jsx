import BannerHome from "../components/bannerHome";
import HorizontalScroll from "../components/HorizontalScroll";
import { useSelector } from "react-redux";
import useFetch from "../hooks/fetchData";

const Home = () => {
  const trendingData = useSelector((state) => state.movieData.bannerData);

  const { data: nowPlayingData } = useFetch("/movie/now_playing");
  const { data: TopRated } = useFetch("/movie/top_rated");
  const { data: Upcoming } = useFetch("/movie/upcoming");

  return (
    <div>
      <BannerHome />
      
      <HorizontalScroll
        data={trendingData}
        heading={"Trending"}
        trending={true}
      />
   
      <HorizontalScroll
        data={nowPlayingData}
        heading={"Now playing"}
        trending={false}
      />
      <HorizontalScroll
        data={nowPlayingData}
        heading={"Now playing"}
        trending={false}
      />
      <HorizontalScroll
        data={Upcoming}
        heading={"Upcoming"}
        trending={false}
      />
      <HorizontalScroll
        data={TopRated}
        heading={"Top Rated"}
        trending={false}
      />
    </div>
  );
};

export default Home;
