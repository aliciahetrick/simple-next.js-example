import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import getStripe from "../lib/getStripe";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  async function handleCheckout() {
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "payment",
      successUrl: `http://localhost:3001/success`,
      cancelUrl: `http://localhost:3001/`,
      customerEmail: "aliciahetrick@gmail.com",
    });
    console.warn(error.message);
  }

  return <button onClick={handleCheckout}>Checkout</button>;
}
