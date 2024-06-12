import React, { useContext, useEffect, useState } from "react";
import Context from "../context";
import axios from "axios";
import displayINRCurrency from "../Helper/displayPrice";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const [data, SetData] = useState([]);
  const context = useContext(Context);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/cart/cartview");
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
  }, []);

  const deleteCartProduct = async (id) => {
    try {
      const { data } = await axios.delete(`/api/cart/deleteproduct/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      if (data.suucess) {
        toast.success(data.message);
        if (data.suucess) {
          fetchData();
          context.cartLength();
        }
      }
    } catch (error) {
      toast.error("Failed to delete the product");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="container mx-auto mt-10">
        <div className="text-center font-semibold">
          {data.length === 0 && <p className="text-2xl">No Data.....</p>}
        </div>
        <div className="sm:flex shadow-md my-10">
          <div className="w-full sm:w-3/4 bg-white px-8 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">
                {context?.length} Items
              </h2>
            </div>
            {data.map((item, index) => (
              <div
                className="md:flex relative items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50"
                key={index}
              >
                <div className="md:w-4/12 2xl:w-1/4 w-full">
                  <div className="h-28 py-3 flex justify-center items-center">
                    <img
                      src={item.productId.productImage[0]}
                      className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                      alt={item.productId.productName}
                    />
                  </div>
                </div>
                <div
                  className="absolute right-0 top-0 items-center text-2xl ml-4 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                  onClick={() => deleteCartProduct(item._id)}
                >
                  <MdDeleteForever />
                </div>
                <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                  <p className="text-xs leading-3 capitalize text-gray-800 md:pt-0 pt-4">
                    {item.productId.brandName}
                  </p>
                  <p className="text-base font-black leading-none text-gray-800 my-4">
                    {item.productId.productName}
                  </p>
                  <div className="flex items-center justify-end w-full">
                    <button
                      className="gap-3 border border-gray-200 mx-1 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                      // onClick={() =>
                      //   decraseQty(product?._id, product?.quantity)
                      // }
                    >
                      -
                    </button>
                    <span className="mx-3 gap-3 font-semibold">{item.Qty}</span>
                    <button
                      className="border gap-3 border-gray-200 focus:outline-non text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                      // onClick={() =>
                      //   increaseQty(product?._id, product?.quantity)
                      // }
                    >
                      +
                    </button>
                  </div>
                  <p className="text-xl leading-3 font-semibold mb-1 capitalize text-gray-600 pt-2">
                    category: {item.productId.category}
                  </p>

                  <div className="flex items-center justify-between pt-5">
                    <div className="flex items-center">
                      <p className="text-red-600 font-medium text-lg">
                        {displayINRCurrency(item.productId.sellingPrice)}
                      </p>
                    </div>
                    <p className="text-base font-black leading-none text-gray-800">
                      {displayINRCurrency(
                        item.productId.sellingPrice * item.Qty
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <Link
              to="/"
              className="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </Link>
          </div>
          <div id="summary" className="w-full sm:w-1/4 md:w-1/2 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                Items {data.length}
              </span>
              <span className="font-semibold text-sm">
                {displayINRCurrency(
                  data.reduce(
                    (total, item) =>
                      total + item.productId.sellingPrice * item.Qty,
                    0
                  )
                )}
              </span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">
                Shipping
              </label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>Standard shipping - ₹100.00</option>
              </select>
            </div>
            <div className="py-10">
              <label
                htmlFor="promo"
                className="font-semibold inline-block mb-3 text-sm uppercase"
              >
                Promo Code
              </label>
              <input
                type="text"
                id="promo"
                placeholder="Enter your code"
                className="p-2 text-sm w-full"
              />
            </div>
            <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
              Apply
            </button>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>
                  {displayINRCurrency(
                    data.reduce(
                      (total, item) =>
                        total + item.productId.sellingPrice * item.Qty,
                      0
                    ) + 100
                  )}
                </span>
              </div>
              <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
