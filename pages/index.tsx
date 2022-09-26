import type { NextPage } from "next";
import Head from "next/head";

import React from "react";
import { ScanLogo } from "../components/ScanLogo";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌍</text></svg>"
        />
        <title>Scan Places</title>
      </Head>
      <header>
        <ScanLogo className="text-pink-500 w-28" />
        <h1 className="text-3xl font-semibold">Scan Places</h1>
      </header>
      <main>{/* Frontend goes here */}</main>
    </div>
  );
};

export default Home;
