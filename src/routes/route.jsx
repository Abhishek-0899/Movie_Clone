// routes/Router.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import ExplorePage from "../pages/ExplorePage.jsx";
import DetailsPage from "../pages/DetailsPage.jsx";
import SearchPage from "../pages/SearchPage.jsx";
import NotFound from "../pages/notFound.jsx";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App is the layout with Navbar
    children: [
      { path: "/", element: <Home /> },
      { path: "/explore", element: <ExplorePage /> },
      { path: "/detail", element: <DetailsPage /> },
      { path: "/search", element: <SearchPage /> },
      ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default Router;
