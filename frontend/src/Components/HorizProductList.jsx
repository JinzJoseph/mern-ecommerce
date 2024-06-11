import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import displayINRCurrency from "../Helper/displayPrice";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
const HorizProductList = ({ category, heading }) => {
  const [data, SetData] = useState([]);
  const [loading, SetLoading] = useState(false);
  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();
  // const loadingList = new Array(10).fill(null)
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
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft += 300;
  };
  return (
    <div className="container mx-auto px-4 my-4">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div
        className="flex items-center gap-4 md:gap-6 overflow-x-auto translate-all relative"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>
        {!loading &&
          data.map((product, index) => (
            <Link
              to={`/product/${product._id}`}
              className="w-full min-w-[280px] md:min-w-[320px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
              key={index}
            >
              <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]">
                <img
                  src={product.productImage[0]}
                  alt={product.productName}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-2">
                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                  {product.productName}
                </h2>
                <p className="capitalize text-slate-500">{product?.category}</p>
                <div className="flex gap-3">
                  <p className="text-red-600 font-medium">
                    {displayINRCurrency(product?.sellingPrice)}
                  </p>
                  <p className="text-slate-500 line-through">
                    {displayINRCurrency(product?.price)}
                  </p>
                </div>
                <button className='text-sm bg-black m-auto hover:bg-red-700 text-white px-3 py-0.5 rounded-full' >Add to Cart</button>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default HorizProductList;
