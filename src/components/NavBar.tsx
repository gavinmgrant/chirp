import { type FC } from "react";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

const NavBar: FC = () => {
  const user = useUser();

  return (
    <nav className="sticky top-0 flex w-screen justify-between bg-white p-4">
      <Link href="/">
        <h1 className="text-xl">Permitful</h1>
      </Link>
      {!user.isSignedIn ? (
        <div className="flex space-x-4">
          <Link href="/sign-in">Sign in</Link>
          <Link href="/sign-up">Sign up</Link>
        </div>
      ) : (
        <UserButton />
      )}
    </nav>
  );
};

export default NavBar;
