import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
// import { api } from "~/utils/api";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const user = useUser();

  return (
    <>
      <Head>
        <title>Permitful</title>
        <meta name="description" content="Building permit visualizations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <UserButton />
        {!!user.isSignedIn ? (
          <SignOutButton />
        ) : (
          <>
            <Link href="/sign-in">Sign in</Link>
            <Link href="/sign-up">Sign up</Link>
          </>
        )}
      </main>
    </>
  );
};

export default Home;
