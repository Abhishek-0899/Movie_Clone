import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Meta, RouterProvider } from "react-router-dom";
import Router from "./routes/route.jsx";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./store/store.jsx";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] = `Bearer ${
  import.meta.env.VITE_APP_ACCESS_TOKEN
}`;

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={Router} />
  </Provider>
);
