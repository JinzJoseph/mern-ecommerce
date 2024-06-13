// import stripe from "../config/stripe.js";

import Stripe from "../config/stripe.js";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js"
import dotenv from "dotenv";
import Cart from "../models/cartModel.js"
dotenv.config();
  export const payment = async (req, res) => {
    const { cartItems } = req.body;
  // console.log(cartItems);
    try {
      const user = await User.findOne({ _id: req.user.id });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_address_collection: {
          allowed_countries: ["IN"],
        },
        shipping_options: [
          {
            shipping_rate: "shr_1PR6wgSJ6EtDEFqqFSRlyMQD",
          },
        ],
        customer_email: user.email,
        metadata: {
          customer_name: user.username,
          userId: req.user.id,
        },

        line_items: cartItems.map((item,index) => {
          const images = Array.isArray(item.productId.productImage)
          ? item.productId.productImage
          : item.productId.productImage ? [item.productId.productImage] : [];
          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.productId.productName,
                images:images,  
                metadata: {
                  productId: item.productId._id,
                },
              },
              unit_amount: item.productId.sellingPrice * 100, // Stripe expects amount in the smallest currency unit
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.Qty,
          };
        }),
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/cancel",
      };

      const session = await Stripe.checkout.sessions.create(params);
      res.status(200).json({ id: session.id });
    } catch (error) {
      console.error("Payment Error:", error);
      res.status(500).json({
        message: error.message || "Internal Server Error",
        error: true,
        success: false,
      });
    }
  };
const endpointSecret = process.env.ENDPOINT_SECRET;
async function getLineItem(lineItems) {
  // console.log(lineItems);
  let ProductItems = [];
  if (lineItems?.data?.length) {
    for (const item of lineItems.data) {
      const product = await Stripe.products.retrieve(item.price.product);

      const productData = {
        productId: product.metadata.productId,
        name: product.name,
        price: item.price.unit_amount / 100,
        quantity: item.quantity,
        image: product.images,
      };
      ProductItems.push(productData);
     
    }
  }
  return ProductItems;
}
export const webhooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  //console.log("sig"+sig);
  const payloadString = JSON.stringify(req.body);
  //console.log("playload"+payloadString);
  const headers = Stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: endpointSecret,
  });
  let event;
  try {
    event = Stripe.webhooks.constructEvent(
      payloadString,
      headers,
      endpointSecret
    );
    // console.log("event"+event);
  } catch (error) {
    console.error("webhook Error:", error);
    res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const lineItems = await Stripe.checkout.sessions.listLineItems(
        session.id,
        { limit: 100 }
      );
      // console.log("wertgh"+event.data.object);
      const productData = await getLineItem(lineItems);
      const dataItems={
        productDetails:productData,
        email:session.customer_email,
        userId:session.metadata.userId,
        payementDetails: {
          paymentId:
           session.payment_intent,
          
          payment_method_type: session.payment_method_types,
          payment_status: session.payment_status,
        },
        shipping_options:session.shipping_options,
        totalAmount:session.amount_total/100
      }
      const order=new Order(dataItems)
      await order.save()
      //console.log("Line Items:", lineItems);
      if(order?._id){
        const deletecartItem=await Cart.deleteMany({userId:session.metadata.userId})
        
      }
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
  res.status(200).send();
};
