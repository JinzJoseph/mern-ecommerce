import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import productCategory from "./ProductCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import uploadImage from "../Helper/UploadImg";
import DisplayImage from "./DisplayImage";
const UploadProduct = ({ onClose, productData, callFunc }) => {
    const [data,setData] = useState({
        productName : "",
        brandName : "",
        category : "",
        productImage : [],
        description : "",
        price : "",
        sellingPrice : ""
      })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((preve)=>{
        return{
          ...preve,
          [name]  : value
        }
      })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (data._id) {
        await axios.put(`/api/product/update/${data._id}`, data);
        toast.success("Product updated successfully");
      } else {
        await axios.post("/api/product/uploadproduct",{
          body:data
        } ,{
          headers:{
            "content-type": "application/json",
          }
        });
        toast.success("Product created successfully");
      }
      callFunc(); // Refresh the product list
      onClose(); // Close the modal
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
console.log(uploadImageCloudinary);
setData((preve) => {
      return {
        ...preve,
        productImage: [...preve.productImage, uploadImageCloudinary.url],
      };
    });
  };
  const handleDeleteProductImage=async(index)=>{
const  newproduct=[...data.productImage]
newproduct.splice(index,1)
setData((prev)=>{
  return{
    ...prev,productImage:[...newproduct]
  }
})
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75        ">
      <div className="bg-white p-4  rounded shadow-lg w-1/2">
        <h2 className="text-xl mb-4 justify-center items-center font-bold ml-auto underline">
          {data._id ? "Edit Product" : "Upload Product"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Product Name</label>
            <input
              type="text"
              name="productName"
              value={data.productName}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Brand Name</label>
            <input
              type="text"
              name="brandName"
              value={data.brandName}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <select
              required
              value={data.category}
              name="category"
              onChange={handleInputChange}
              className="p-2 bg-slate-100 border rounded w-full"
            >
              <option value={""}>Select Category</option>
              {productCategory.map((el, index) => {
                return (
                  <option value={el.value} key={el.value + index}>
                    {el.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="productImage" className="mt-3">
              Product Image :
            </label>
            <label htmlFor="uploadImageInput">
              <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
                <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                  <span className="text-4xl">
                    <FaCloudUploadAlt />
                  </span>
                  <p className="text-sm">Upload Product Image</p>
                  <input
                    type="file"
                    id="uploadImageInput"
                    className="hidden"
                    onChange={handleUploadProduct}
                  />
                </div>
              </div>
            </label>
          </div>
          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((el, index) => {
                  return (
                    <div className="relative group">
                      <img
                        src={el}
                        alt={el}
                        width={80}
                        height={80}
                        className="bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(el);
                        }}
                      />

                      <div
                        className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => handleDeleteProductImage(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                *Please upload product image
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              rows="1"
              cols="6"
              value={data.description}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Selling Price</label>
            <input
              type="number"
              name="sellingPrice"
              value={data.sellingPrice}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 bg-red-500 text-white p-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
      {
        openFullScreenImage &&(
          <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
        )
      }
    </div>
  );
};

export default UploadProduct;
