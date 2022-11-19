import { Product } from "@stripe/firestore-stripe-payments";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { HiCheck } from "react-icons/hi";
import useAuth from "../hooks/useAuth";
import { loadCheckout } from "../library/stripe";
import Loader from "./Loader";
import Table from "./Table";

interface Props {
  products: Product[];
}

const Plans = ({ products }: Props) => {
  const { logout, user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[2]);
  const [isBillingLoading, setIsBillingLoading] = useState(false)

  const subscribeToPlan = () => {
    if (!user) return 

    loadCheckout(selectedPlan?.prices[0].id!)
    setIsBillingLoading(true)
  }

  return (
    <div>
      <Head>
        <title>Flix4U</title>
        <link rel="stylesheet" href="" />
      </Head>

      <header className="border-b border-white/10 bg-[#141414]">
        <Link href="/">
          <img
            src="https://fontmeme.com/permalink/221022/71674d34b5daa7f1ef5a2acb1d4acb81.png"
            alt="Flix4U"
            width={150}
            height={90}
            className="cursor-pointer object-contain"
          />
        </Link>
        <button
          className="text-lg font-medium hover:underline"
          onClick={logout}
        >
          Sign Out
        </button>
      </header>
      <main className=" mx-auto pt-28 max-w-5xl px-5 pb-12 transition-all md:px-10">
        <h1 className="mb-3 text-3xl font-medium">
          Choose your subscription plan
        </h1>
        <ul>
          <li className="flex items-center gap-x-2 text-lg">
            <HiCheck className="h-7 w-7 text-[#0944e5]" /> Ad-free. Watch
            whenever and where ever!
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <HiCheck className="h-7 w-7 text-[#0944e5]" /> Recommended Flix
            just for you.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <HiCheck className="h-7 w-7 text-[#0944e5]" /> Change or cancel your
            plan without long-term commitment.
          </li>
        </ul>

        <div className="mt-4 flex flex-col space-y-4">
          <div className="flex w-full items-center justify-end self-end md:w-3/5">
            {products.map((product) => (
              <div
                className={`planContainer ${
                  selectedPlan?.id === product.id ? "opacity-100" : "opacity-60"
                }`}
                key={product.id}
                onClick={() => setSelectedPlan(product)}
              >
                {product.name}
              </div>
            ))}
          </div>

          <Table products={products} selectedPlan={selectedPlan} />

          <button
            disabled={!selectedPlan || isBillingLoading}
            className={`mx-auto w-11/12 rounded bg-[#097ee5] py-4 text-xl shadow hover:bg-[gray] md:w-[420px] ${
              isBillingLoading && 'opacity-60'
            }`}
            onClick={subscribeToPlan}
          >
            {isBillingLoading ? (
              <Loader color="dark:fill-gray-300" />
            ) : (
              'Subscribe'
            )}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Plans;
