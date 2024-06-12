import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: String,
    productId : {
      ref : 'Product',
      type : String,
 },
    Qty: Number,
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
