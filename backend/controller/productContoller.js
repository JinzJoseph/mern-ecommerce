import Product from "../models/productModel.js";

export const uploadproduct = async (req, res) => {
  console.log(req.body);
  try {
    if (req.user.isAdmin === false) {
      return res.status(403).json({
        message: "You are not allowed to take these actions",
        success: false,
      });
    }

    if (
      !req.body.body.productName ||
      !req.body.body.brandName ||
      !req.body.body.category ||
      !req.body.body.productImage ||
      !req.body.body.description ||
      !req.body.body.price ||
      !req.body.body.sellingPrice
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const uploadproduct = new Product({
      productName: req.body.body.productName,
      brandName: req.body.body.brandName,

      category: req.body.body.category,
      productImage: req.body.body.productImage,
      description: req.body.body.description,
      price: req.body.body.price,
      sellingPrice: req.body.body.sellingPrice,
    });

    await uploadproduct.save();

    res.status(200).json({
      message: "Successfully uploaded product",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const getAllProduct = await Product.find().sort({ createAt: -1 });
    res.status(200).json({
      message: "successfully fetched data",
      success: true,
      data: getAllProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
export const updateProduct = async (req, res) => {
  try {
    if (req.user.isAdmin === false) {
      return res.status(403).json({
        message: "You are not allowed to take these actions",
        success: false,
      });
    }
    
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: req.params.productId }, // Corrected: req.params.productId
      {
        productName: req.body.productName,
        brandName: req.body.brandName,
        category: req.body.category,
        productImage: req.body.productImage,
        description: req.body.description,
        price: req.body.price,
        sellingPrice: req.body.sellingPrice,
      },
      { new: true } // This option returns the updated document
    );

    res.json({
      message: "Product updated successfully",
      data: updatedProduct,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const deleteProduct=async(req,res)=>{
  try {
    if (req.user.isAdmin === false) {
      return res.status(403).json({
        message: "You are not allowed to take these actions",
        success: false,
      });
    }
    const deleteproduct=await Product.findByIdAndDelete({_id: req.params.productId})
    res.status(200).json({
      message:"successfully deleted",
      success:true
    })
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  
  }
}