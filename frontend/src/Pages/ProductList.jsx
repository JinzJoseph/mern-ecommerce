import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import axios from "axios";
import { MdModeEdit, MdDelete } from "react-icons/md";
import UploadProduct from "../Components/UploadProduct"; // Assuming you have an UploadProduct component
import EditProduct from "../Components/EditProduct";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [editproduct, Seteditproduct] = useState(false);
  const [edititem, SetEditedItem] = useState("");
  const [openUploadRole, setOpenUploadRole] = useState(false);
  const [uploadProduct, setUploadProduct] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: "",
    description: "",
    price: "",
    sellingPrice: "",
    _id: "",
  });

  const getProductList = async () => {
    try {
      const response = await axios.get("/api/product/getproducts");
      setData(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/api/product/deleteproduct/${productId}`);
      toast.success("Product deleted successfully");
      getProductList(); // Refresh the product list
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold underline">Product List</h1>
      </div>
      <div className="flex ml-5">
        <button
          className="bg-green-500 text-white p-4 rounded-lg"
          onClick={() => {
            setOpenUploadRole(true);
            setUploadProduct({
              productName: "",
              brandName: "",
              category: "",
              productImage: "",
              description: "",
              price: "",
              sellingPrice: "",
              _id: "",
            }); // Reset uploadProduct state
          }}
        >
          Upload Product
        </button>
      </div>
      <div className="mt-10 ml-5">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SR
                </th>
                <th scope="col" className="px-6 py-3">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Brand Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Product Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Selling Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.productName}
                  </th>
                  <td className="px-6 py-4">{item.brandName}</td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">
                    <img
                      src={item.productImage[0]}
                      alt="product"
                      className="w-20 h-20"
                    />
                  </td>
                  <td className="px-6 py-4">{item.sellingPrice}</td>
                  <td className="px-6 py-4">
                    {moment(item.createdAt).format("LL")}
                  </td>
                  <td className="px-6 py-4 flex ">
                    <button
                      className="bg-green-500 p-2 rounded-full cursor-pointer hover:bg-red-300 text-white items-center"
                      onClick={() => {
                        Seteditproduct(true);
                        SetEditedItem(item);
                      }}
                    >
                      <MdModeEdit />
                    </button>
                    <button
                      className="bg-red-500 p-2 rounded-full cursor-pointer text-white ml-3 items-center"
                      onClick={() => handleDelete(item._id)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {openUploadRole && (
            <UploadProduct
              onClose={() => setOpenUploadRole(false)}
              productData={uploadProduct}
              callFunc={getProductList}
            />
          )}
          {editproduct && (
            <EditProduct
              onClose={() => Seteditproduct(false)}
              productData={edititem}
              callFunc={getProductList}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
