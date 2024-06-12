import axios from "axios";
import { toast } from "react-toastify";

export const addToCart = async (e, id) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      `/api/cart/addtocart`,
      {
        productId: id
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data.success) {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 409) {
        toast.error("Product already in cart");
      } else {
        toast.error(error.response.data.message || "An error occurred while adding to cart");
      }
    } else if (error.request) {
      // The request was made but no response was received
      toast.error("No response received from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      toast.error("An error occurred while adding to cart");
    }
    console.error(error);
  }
};
