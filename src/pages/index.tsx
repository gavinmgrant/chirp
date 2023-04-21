import { type NextPage } from "next";
import Head from "next/head";
import NavBar from "~/components/NavBar";
import PermitsMap from "~/features/permits/components/PermitsMap";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Permitful</title>
        <meta name="description" content="Building permit visualizations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen">
        <NavBar />
        <PermitsMap />
      </main>
    </>
  );
};

export default Home;
