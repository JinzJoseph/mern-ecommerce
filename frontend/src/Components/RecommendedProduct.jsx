import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import displayINRCurrency from "../Helper/displayPrice";

const RecommendedProduct = ({ category, heading }) => {
  const [data, SetData] = useState([]);
  const [loading, SetLoading] = useState(false);
  const scrollElement = useRef(null);

  const fetchData = async () => {
    console.log(category);
    try {
      SetLoading(true);
      const { data } = await axios.get(
        `/api/product/getcategortywiseproduct/${category}`
      );
      console.log(data.data);
      SetData(data.data);
      SetLoading(false);
    } catch (error) {
      console.log(error);
      SetLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-3 ">
      <h2 className="text-2xl font-semibold py-3">{heading}</h2>
      <div className="relative flex items-center gap-4 md:gap-6  scrollbar-none transition-all  ">
        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block z-10 items-center"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block z-10"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>
        <div
          className="flex items-center gap-4 md:gap-6 scroll-smooth scrollbar-none overflow-x-auto"
          ref={scrollElement}
        >
          {!loading &&
            data.map((product, index) => (
              <Link relative="path"
            to={`/productDetail/${product?._id}`}
                className="w-full min-w-[280px] md:min-w-[320px] bg-white rounded-sm shadow"
                key={index}
              >
                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[320px] flex justify-center items-center">
                  <img
                    src={product.productImage[0]}
                    alt={product.productName}
                    className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                  />
                </div>
                <div className="p-4 grid gap-3 items-center">
                  <h2>{product.productName}</h2>
                  <p className="capitalize text-slate-500">
                    {product?.category}
                  </p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-medium">
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>
                  <button className="text-sm bg-black m-auto hover:bg-red-700 text-white px-3 py-0.5 rounded-full">
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedProduct;
