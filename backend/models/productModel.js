import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  brandName: { type: String, required: true },
  category: { type: String, required: true },
  productImage: [],
  description: { type: String, required: true },
  price: { type: Number, required: true },
  sellingPrice: { type: Number, required: true }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
