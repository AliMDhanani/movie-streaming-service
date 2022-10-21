import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

const Login = () => {
  const [login, setLogin] = useState(false);

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>FLIX4U</title>
        <link rel="icon" href="/logo.ico" />
      </Head>
      <Image
        src="https://hannahb93.files.wordpress.com/2011/04/my-film-poster-moodboard.png"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />
      <img
        src="https://fontmeme.com/permalink/221018/7a8bf8a66c33bd9f6922f5ed5d88126f.png"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />

      <form className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14">
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input type="email" placeholder="Email" className="input" />
          </label>
          <label className="inline-block w-full">
            <input type="password" placeholder="Password" className="input" />
          </label>
        </div>
        <button className="w-full rounded bg-[#0088d5] py-3 font-semibold">Sign In</button>

        <div className="text-[gray]">
          New to FLIX4U?{' '}
          <button type="submit" className=" text-white hover:underline">Sign up now</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
