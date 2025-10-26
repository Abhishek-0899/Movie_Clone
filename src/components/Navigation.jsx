import React from "react";

import { BiMovie } from "react-icons/bi";
import { BiTv } from "react-icons/bi";
export const Navigation = [
  {
    label: "Movies",
    href: "/explore/movie", 
    icon: <BiMovie />,
  },

  {
    label: "TV Shows",
    href: "/tv",
    icon: <BiTv />,
  },
];
