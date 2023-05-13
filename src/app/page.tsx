"use client";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { Link } from "lucide-react";
import { use } from "react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <h1 className="text-lg">
        <span className="italic underline font-semibold">Zelic</span>: an easy
        way to add comments and feedback to your site
      </h1>
      {session ? (
        <div>
          <p>
            You are signed in as{" "}
            <span className="font-semibold">{session.user?.email}</span>
          </p>
          <button onClick={() => signOut({ callbackUrl: "/" })}>
            Sign out
          </button>
        </div>
      ) : (
        <div>
          <p>You are not signed in.</p>
        </div>
      )}
    </main>
  );
}
