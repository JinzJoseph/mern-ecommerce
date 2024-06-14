import Order from "../models/orderModel.js";

export const order = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderList = await Order.find({ userId: userId }).sort({
      creatAt: -1,
    });
    res.status(200).json({
      message: "successfully fetched Data",
      success: true,
      data: orderList,
    });
  } catch (error) {
    console.error(error);
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const allOrders = async (req, res) => {
  try {
    if (req.user.isAdmin === false) {
      return res.status(403).json({
        message: "unauthorised",
        success: false,
      });
    }
    const orderList=await Order.find().sort({createAt:-1})
    res.status(200).json({
        message:"successfully fetched Data",
        success:true,
        data:orderList
    })
  } catch (error) {
    console.error(error);
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
