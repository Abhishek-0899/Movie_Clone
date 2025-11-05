import axios from "axios";
import React, { useEffect, useState } from "react";

const FetchData = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(endpoint);
      setLoading(false);
      setData(response.data.results || response.data);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);
  return { data, loading };
};

export default FetchData;
