import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar, FaStarHalf } from "react-icons/fa6";
import displayINRCurrency from "../Helper/displayPrice";
import VerticalCardProduct from "../Components/VerticalCardProduct"
import RecommendedProduct from "../Components/RecommendedProduct";
import { addToCart } from "../Helper/addToCart";
import Context from "../context";
const ProductDetails = () => {
  const { productId } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("");
  const [zoomImage, setZoomImage] = useState(false);
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/product/getproduct/${productId}`);
      // console.log(response.data);
      setData(response.data.data);
      setActive(response.data.data.productImage[0]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
// console.log(data);
  useEffect(() => {
    fetchProductData();
  }, [productId]);

  const productImageLoading = new Array(4).fill(null);

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
   
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImageCoordinate({ x, y });
  }, []);

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleMouseEnter = (img) => {
    setActive(img);
  };
  const { cartLength } = useContext(Context);
  const handleAddToCart = async (e,id) => {
    await addToCart(e, id);
    cartLength();
  };
  return (
    <div className="container mx-auto p-8">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-3">
        {/* Product image */}
        <div className="h-96 flex lg:flex-row-reverse gap-4 sm:flex-row">
          <div className="relative lg:h-96 lg:w-96 h-[300px] w-[300px] bg-slate-200">
            <img
              src={active}
              alt="Active product"
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />
            {zoomImage && (
              <div className="hidden lg:block absolute w-[500px] h-[400px] overflow-hidden bg-slate-200 p-1 -right-[510px] top-0">
                <div
                  className="w-full h-full mix-blend-multiply"
                  style={{
                    background: `url(${active})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }%`,
                    backgroundSize: "200%",
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-3 lg:flex-col scrollbar-none h-full">
                {productImageLoading.map((_, index) => (
                  <div
                    key={index}
                    className="h-20 w-20 bg-slate-300 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            ) : (
              <div className="flex gap-3 lg:flex-col scrollbar-none h-25">
                {data?.productImage?.map((image, index) => (
                  <div
                    className="h-20 w-20 bg-slate-300 rounded p-1"
                    key={index}
                  >
                    <img
                      src={image}
                      alt={`Product ${index}`}
                      className="object-scale-down mix-blend-multiply h-full w-full"
                      onClick={() => handleMouseEnter(image)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Product Details */}
        <div className="p-4 flex flex-col gap-3 mx-5">
          <p className="bg-slate-400 text-white rounded px-6 py-3">
           
          </p>
          <p className="font-semibold"> {data.brandName}</p>
          <h2 className="text-2xl lg:text-4xl font-bold">{data.productName}</h2>
          <p className="capitalize text-slate-400">{data.category}</p>
          <div className="text-red-600 flex items-center gap-1">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalf />
          </div>
          <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
            <p className="text-red-600">
              {displayINRCurrency(data.sellingPrice)}
            </p>
            <p className="text-slate-400 line-through">
              {displayINRCurrency(data.price)}
            </p>
          </div>
          <div className=" flex  items-center gap-3 my-3">
            <button className="border-2 bg-black text-white rounded px-3 py-1 min-w-[120px] font-medium ">
              Buy
            </button>
            <button className="border-2 bg-black text-white rounded px-3 py-1 min-w-[120px] font-medium"  onClick={(e)=>handleAddToCart(e,product?._id)}>
              Add to cart
            </button>
          </div>
          <div>
            <p className="text-slate-600 font-medium my-1">Description : </p>
            <p>{data?.description}</p>
          </div>
        </div>
      </div>
      <RecommendedProduct category={data.category} heading={"Recommended Products"}/>
    </div>
  );
};

export default ProductDetails;
