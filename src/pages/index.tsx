import styles from "./home.module.scss";
import Head from "next/head";
import { GetStaticProps } from "next";

import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";

interface homeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: homeProps) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>Hey, welcome! ✌</span>
          <h1>
            News About the <span> React</span> World
          </h1>
          <p>
            Access the publications
            <br />
            for <span> just {product.amount}</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="Girl Coding React"></img>
      </main>
    </>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  //executed inside the Node server
  const price = await stripe.prices.retrieve(
    "price_1Ian4tERWCfDZ6A04mW5qf2W" //to access all infos from the product
  );

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
    }).format(price.unit_amount / 100), //since it is in cents, this format is better to work with
  };
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, //60s* 60m* 24hs amount of time the page will access the APIs
  };
};
