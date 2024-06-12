import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CategoryProduct = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const categoryLoading = new Array(9).fill(null);
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/product/getcategoryproduct");
      setLoading(false);
      //console.log(data.data);
      setCategory(data.data);
    } catch (error) {
      setLoading(false); // Should be set to false on error as well
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto p-4 py-2">
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
        {loading
          ? categoryLoading.map((i, index) => {
              <div
                className="h-20 w-20 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                key={index}
              ></div>;
            })
          : category.map((item, index) => {
              return (
                <Link
                  to={`/product-category?category=${item.category}`}
                  className="cursor-pointer"
                  key={index}
                >
                  <div className="w-20 h-20 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-400 flex items-center flex-wrap">
                    <img
                      src={item.productImage[0]}
                      alt={item.productName}
                      className="h-full w-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                    />
                  </div>
                  <p> {item.category}</p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryProduct;
