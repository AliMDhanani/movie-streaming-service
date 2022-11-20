import React from "react";
import Head from "next/head";
import Link from "next/link";
import useSubscription from "../hooks/useSubscription";
import useAuth from "../hooks/useAuth";
import { BsFillCollectionPlayFill } from "react-icons/bs";


const Account = () => {
    const {user} = useAuth()
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

      <main  className="pt-24">
        <div>
            <h1 className="text-3xl md:text-4xl">Account</h1>
            <div className="-ml-0.5 items-center gap-x-1.5 flex">
                <BsFillCollectionPlayFill  className="h-5 w-5 text-[#097ee5]"/>
                <p className="text-xs font-semibold text-[#555]">member since {subscription?.created}</p>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Account;
