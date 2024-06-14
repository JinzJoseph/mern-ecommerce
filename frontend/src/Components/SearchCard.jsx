import React, { useContext } from "react";
import Context from "../context";
import { addToCart } from "../Helper/addToCart";
import displayINRCurrency from "../Helper/displayPrice";
import { Link } from "react-router-dom";

const SearchCard = ({ data }) => {
  const { cartLength } = useContext(Context);
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    cartLength();
  };
  return (
    <div className="container mx-auto px-10 my-7">
       <div className="items-center justify-center">
       {
            data.length ===0 &&(
                <p className="text-center font-bold text-2xl ">No Data......</p>
            )
        }
       </div>
      <h1 className="text-2xl font-bold gap-4 mb-7">
      Search Results : {data.length}
      </h1>
      <div className="flex flex-wrap  gap-3 ">
        {data.map((product, index) => (
          <Link  to={`/productDetail/${product?._id}`}
            key={index}
            className="w-1/4 min-w-[280px] md:min-w-[320px] bg-white rounded-sm shadow flex-wrap  "
          >
            <article className="bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-700">
              <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[320px] flex justify-center items-center">
                <img
                  src={product.productImage[0]}
                  alt={product.productName}
                  className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                />
              </div>

              <div className="flex flex-col gap-1 mt-4 px-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-50">
                  {product.productName} {/* Use the product name */}
                </h2>
                <span className="font-normal text-gray-600 dark:text-gray-300 line-clamp-2">
                  {product.description} {/* Use the product description */}
                </span>
              </div>
              <div className="flex gap-5 items-center justify-center mt-4 ">
                <p className="text-red-600 font-medium">
                  {displayINRCurrency(product?.sellingPrice)}
                </p>
                <p className="text-slate-500 line-through">
                  {displayINRCurrency(product?.price)}
                </p>
              </div>

              <div className="mt-4 p-4 border-t border-gray-200 dark:border-gray-500 items-center">
                <button
                  className="text-sm bg-black hover:bg-red-700 text-white px-3 py-0.5 rounded-full justify-center"
                  onClick={(e) => handleAddToCart(e, product._id)}
                >
                  Add to Cart
                </button>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchCard;
