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
export const deleteProduct = async (req, res) => {
  try {
    if (req.user.isAdmin === false) {
      return res.status(403).json({
        message: "You are not allowed to take these actions",
        success: false,
      });
    }
    const deleteproduct = await Product.findByIdAndDelete({
      _id: req.params.productId,
    });
    res.status(200).json({
      message: "successfully deleted",
      success: true,
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
export const categoryproduct = async (req, res) => {
  try {
    // Get the distinct categories from the Product collection
    const distinctCategories = await Product.distinct("category");
    //console.log(distinctCategories);

    // Array to store one product from each category
    const categoryProducts = [];

    // Loop over each category and fetch one product for each category
    for (const category of distinctCategories) {
      const product = await Product.findOne({ category });
      if (product) {
        categoryProducts.push(product);
      }
    }

    // Send the response with the fetched data
    res.status(200).json({
      message: "Successfully fetched data",
      success: true,
      data: categoryProducts,
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

export const getCategoryWiseProducts = async (req, res) => {
  const { category } = req.params;

  try {
    const data = await Product.find({ category });
    // console.log(data);
    res.status(200).json({
      message: "Successfully fetched data",
      success: true,
      data: data,
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
export const getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const result = await Product.findOne({ _id: productId });
    if (!result) {
      res.status(403).json({
        message: "failed to get product data",
        success: false,
      });
    }
    res.status(200).json({
      message: "successfully fetched data",
      success: true,
      data: result,
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
export const searchProducts = async (req, res) => {
  try {
    const { searchQuery } = req.params;
  
    const products = await Product.find({
      $or: [
        { productName: { $regex: searchQuery, $options: "i" } },
        { category: { $regex: searchQuery, $options: "i" } },
      ],
    });
    
    if (!products) {
      return res.status(402).json({
        message: "products doesnot exists",
        success: false,
      });
    }
    res.status(200).json({
      message: "successfully fetched Data",
      success: true,
      data:products
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const filterProduct=async(req,res)=>{
  try {
 
    const categoryList=req.body.body || [];
    console.log(categoryList);
    const product=await Product.find({
      category:{
        "$in":categoryList
      }
    })
   
    res.status(200).json({
      data:product,
      message:"successfull",
      success:true
    })

  } catch (error) {
    return res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}