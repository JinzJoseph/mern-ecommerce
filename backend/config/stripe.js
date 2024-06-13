// import stripe from "stripe";

// const Stripe = stripe(process.env.STRIPE_SECRET_KEY);
// export default Stripe;

import Stripe from 'stripe';
import dotenv from "dotenv";
dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27', // use the version you're working with
});

export default stripe;