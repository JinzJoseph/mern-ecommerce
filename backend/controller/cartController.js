import Cart from "../models/cartModel.js";
export const addToCart = async (req, res) => {
  try {
    console.log(req.body);
    const { productId, Qty } = req.body;
    if (!req.user) {
      return res.status(403).json({
        message: "please Login",
        success: false,
      });
    }
    const isProductAvailable = await Cart.findOne({ productId: productId });
    if (isProductAvailable) {
      return res.status(409).json({
        message: "product already availble",
        success: false,
      });
    }
    const uploadCart = new Cart({
      userId: req.user.id,
      productId: productId,
      Qty: 1,
    });
    await uploadCart.save();
    res.status(200).json({
      message: "successfully added to cart",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const countAddToCart = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(403).json({
        message: "Please login",
        success: false,
      });
    }

    const userId = req.user.id;
    console.log(`User ID: ${userId}`);

    const result = await Cart.countDocuments({ userId });
    console.log(result);
    return res.status(200).json({
      message: "Successfully fetched data",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message || "An error occurred",
      success: false,
    });
  }
};
export const cartView = async (req, res) => {
  try {
    // console.log(req.user);
    if (req.user === false) {
      return res.status(403).json({
        message: "please login t0 view cart",
        success: false,
      });
    }
    const result = await Cart.find({ userId: req?.user?.id }).populate(
      "productId"
    );
    if (!result) {
      return res.status(402).json({
        message: "No product in cart",
        success: false,
      });
    }
    res.status(200).json({
      message: "suucess fetched data",
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const result = await Cart.deleteOne({_id:productId });
    res.status(200).json({
      message: "successfully deleted",
      suucess: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
