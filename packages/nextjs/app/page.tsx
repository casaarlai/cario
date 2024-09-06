"use client";

import Link from "next/link";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="px-6 pt-12 lg:px-24 lg:pt-28">
        <div className="">
          <h1 className="max-w-xl">
            <span className="block text-4xl font-bold">
              Cario connects <span className="text-sky-200">community leaders</span> and{" "}
              <span className="text-sky-200">brands</span>, empowering brand reach through influence.
            </span>
          </h1>
          <button className="btn btn-primary mt-6">
            <Link href="/market">Explore the markets</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
