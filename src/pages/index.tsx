import { useEffect } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import type { RootState } from "~/store";
import { useSelector, useDispatch } from "react-redux";
import fetcher from "~/utils/fetcher";
import {
  type Permit,
  addPermits,
  resetPermits,
} from "~/features/permits/permitsSlice";
import { permitsTransformer } from "~/features/permits/permitsTransformer";
import useSWRImmutable from "swr";

const Home: NextPage = () => {
  const user = useUser();
  const appToken = process.env.NEXT_PUBLIC_SFGOV_APP_TOKEN || "";
  const markerLimit = 50;
  const url = `https://data.sfgov.org/resource/i98e-djp9.json?$limit=${markerLimit}&$$app_token=${appToken}`;
  const { data } = useSWRImmutable(url, fetcher);
  const dispatch = useDispatch();
  const permits = useSelector((state: RootState) => state.permits.value);
  const transformedData = permitsTransformer(data) as Permit[];

  useEffect(() => {
    if (data && permits.length === 0) {
      dispatch(addPermits(transformedData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <Head>
        <title>Permitful</title>
        <meta name="description" content="Building permit visualizations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="absolute left-2 top-2">
          <UserButton />
        </div>

        {!user.isSignedIn ? (
          <>
            <Link href="/sign-in">Sign in</Link>
            <Link href="/sign-up">Sign up</Link>
          </>
        ) : (
          <div className="p-2">
            <div className="mb-4">
              <button
                className="rounded-full bg-blue-500 px-4 py-2 text-white"
                onClick={() => dispatch(addPermits(transformedData))}
              >
                Get Permits
              </button>
              <button
                className="ml-2 rounded-full border border-blue-500 bg-transparent px-4 py-2 text-blue-600 disabled:cursor-not-allowed disabled:opacity-25"
                onClick={() => dispatch(resetPermits())}
                disabled={!permits.length}
              >
                Clear Permits
              </button>
            </div>
            <ul>
              {permits.map((permit) => {
                return <li key={permit.permitNumber}>{permit.address}</li>;
              })}
            </ul>
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
