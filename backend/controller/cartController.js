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
      userId: req.user._id,
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
export const countaddToCart = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(403).json({
        message: "please Login",
        success: false,
      });
    }
    const result = await Cart.countDocuments({
      userId:req.user._id
    });
    res.status(200).json({
      message: "successfully fetched Data",
      success: true,
      data: result,
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
