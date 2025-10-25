import axios from "axios";
import Footer from "./components/footer";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBannerData, setImageUrl } from "./store/MovieSlice";

function App() {
  const dispatch = useDispatch();

  const fetchMovieData = async () => {
    try {
      const response = await axios.get("/trending/all/day");
      dispatch(setBannerData(response.data.results));
      // console.log("response", response.data.results);
    } catch (e) {
      console.log("error", e);
    }
  };

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get("/configuration");
      dispatch(setImageUrl(response.data.images.secure_base_url + "original"))
      // console.log("config", response.data.images.secure_base_url + "original");
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    fetchMovieData();
    fetchConfiguration();
  }, []);

  return (
    <div className="bg-gray-300 min-h-screen  ">
      <Navbar />
      <div className="pt-5">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
