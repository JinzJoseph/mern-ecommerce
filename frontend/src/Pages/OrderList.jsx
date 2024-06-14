import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import displayINRCurrency from "../Helper/displayPrice";

const OrderList = () => {
  const [data, setData] = useState([]);

  const fetchOrderList = async () => {
    try {
      const res = await axios.get("/api/order/all-orders");
      console.log(res);
      if (res.status === 200) {
        setData(res.data.data);
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrderList();
  }, []);

 

  console.log(data);

  return (
    <>
      {data.length === 0 && (
        <p className="font-medium text-lg text-center mb-5 mt-6 ">No Data......</p>
      )}
       <div>
                <p className="font-bold text-3xl text-center mb-5"> Ordered Items</p>
            </div>
      {data.map((item, index) => {
        return (
          <div className="container mx-auto py-5" key={index}>
           
            <p className="font-bold mb-3 my-4">
              {moment(item.createdAt).format("LL")}
            </p>
            
            <div className="grid gap-2">
              {item.productDetails.map((product, index) => {
                return (
                  <div key={index} className="flex gap-3 bg-slate-300 p-3 rounded-md">
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-24 h-28 bg-slate-600 object-scale-down p-2"
                    />
                    <div>
                      <div className="font-medium text-lg text-ellipsis line-clamp-2">
                        {product.name}
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="text-lg">
                          {displayINRCurrency(product.price)}
                        </div>
                        <p className="text-sm">Quantity: {product.quantity}</p>
                      </div>

                    </div>
                    <div className="flex justify-between text-2xl">
                        <div>
                            <p className="text-black font-bold">customer Email:{item.email}</p>
                        </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col lg:flex-row gap-8 p-3 mt-5 bg-gray-100 rounded-md">
              <div>
                <div className="text-lg font-medium">Payment Details:</div>
                <p className="font-medium ml-2">
                  Payment Method: {item.payementDetails.payment_method_type[0]}
                </p>
                <p className="font-medium ml-2">
                  Payment Status: {item.payementDetails.payment_status}
                </p>
              </div>
              <div>
                <div className="text-lg font-medium">Shipping Details:</div>
                {item.shipping_options.map((ship, index) => (
                  <div key={index} className="ml-2">
                    Shipping Amount: {displayINRCurrency(ship.shipping_amount)}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-bold text-xl mt-5">
              Total Amount: {displayINRCurrency(item.totalAmount)}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default OrderList;
