import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
  if (req.user.isAdmin === false) {
    res.status(403).json({
      message: "You are not allowed to do these action",
      success: false,
    });
  }
  try {
    const users = await User.find().sort({ createAt: 1 });
    const userWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });
    res.status(200).json({
      message: "Suucessfully fetched users",
      success: true,
      data: userWithoutPassword,
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
export const updateUser = async (req, res) => {
  if (req.user.isAdmin === false) {
    res.status(403).json({
      message: "You are not allowed to do these action",
      success: false,
    });
  }
  try {

    const updateUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          isAdmin: req.body.role ==="Admin"?true:false
        },
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      message: "successfully updated",
      success: true,
      data: updateUser,
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
