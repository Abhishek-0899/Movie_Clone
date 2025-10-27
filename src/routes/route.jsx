import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import { lazy, Suspense } from "react";

// :lazy import
const Home = lazy(() => import("../pages/Home.jsx"));
const ExplorePage = lazy(() => import("../pages/ExplorePage.jsx"));
const DetailsPage = lazy(() => import("../pages/detailsPage.jsx"));
const SearchPage = lazy(() => import("../pages/SearchPage.jsx"));
const NotFound = lazy(() => import("../pages/notFound.jsx"));

// Helper wrapper to sue Suspense for each route
const withSuspense = (Component) => (
  <Suspense fallback={<p>Loading...</p>}>
    <Component />
  </Suspense>
);

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App is the layout with Navbar
    children: [
      { path: "/", element: withSuspense(Home) },
      { path: ":explore", element: withSuspense(ExplorePage) },
      { path: "/search", element: withSuspense(SearchPage) },
      { path: ":media_type/:id", element: withSuspense(DetailsPage) },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default Router;
