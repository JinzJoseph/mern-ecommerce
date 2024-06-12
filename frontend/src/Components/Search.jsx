import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchCard from "./SearchCard";

const Search = () => {
  const [data, SetData] = useState([]);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const searchQuery = query.get("query");
  console.log(searchQuery);
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `/api/product/searchproduct/${searchQuery}`
      );
      console.log(data);
      if (data.success) {
        SetData(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [searchQuery]);
  return <SearchCard data={data} />;
};

export default Search;
