import React from "react";
import Head from "next/head";
import Link from "next/link";
import useSubscription from "../hooks/useSubscription";
import useAuth from "../hooks/useAuth";
import { BsFillCollectionPlayFill } from "react-icons/bs";
import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import payments from "../library/stripe";
import { GetStaticProps } from "next";
import Membership from "../components/Membership";

interface Props {
    products: Product[];
}


const Account = ({products}: Props ) => {
    console.log(products)
    const {user, logout} = useAuth()
    const subscription = useSubscription(user)

  return (
    <div>
      <Head>
        <title>Account Settings - FLIX4U</title>
        <link rel="stylesheet" href="/favicon.ico" />
      </Head>

      <header className={`bg-[#141414]`}>
        <Link href="/">
          <img
            src="https://fontmeme.com/permalink/221022/71674d34b5daa7f1ef5a2acb1d4acb81.png"
            width={100}
            height={100}
            className="cursor-pointer object-contain"
          />
        </Link>
        <Link href="/account">
          <img
            src="https://www.svgrepo.com/show/170303/avatar.svg"
            alt=""
            className="cursor-pointer rounded h-10 w-10"
          />
        </Link>
      </header>

      <main  className="pt-24 mx-auto max-w-6xl px-5 pb-12 transition-all md:px-10 ">
        <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
            <h1 className="text-3xl md:text-4xl">Account</h1>
            <div className="-ml-0.5 items-center gap-x-1.5 flex pt-1">
                <BsFillCollectionPlayFill  className="h-5 w-5 text-[#097ee5]"/>
                <p className="text-xs font-semibold text-[#555]">member since {subscription?.created}</p>
            </div>
        </div>
        <Membership />

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4
        md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
            <h4>Plan Details</h4>
            {/* current user plan */}
            <div>
                {/* check id for every single product in relation to user subscription and compare that with n */}
                {products.filter((product) => product.id === subscription?.product)[0]?.name}
            </div>
            <p className="cursor-pointer text-red-500 hover:underline md:text-right">Change plan</p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4
        md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
            <h4>Settings</h4>
            <p
            className="col-span-3 cursor-pointer text-red-500 hover:underline"
            onClick={logout}
          >
            Sign out of all devices
          </p>
        </div>

      </main>
    </div>
  );
};

export default Account;

export const getStaticProps: GetStaticProps = async () => {
    const products = await getProducts(payments, {
      includePrices: true,
      activeOnly: true,
    })
      .then((res) => res)
      .catch((error) => console.log(error.message))
  
    return {
      props: {
        products,
      },
    }
  }
  