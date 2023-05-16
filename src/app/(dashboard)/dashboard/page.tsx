import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/session";
import { signOut } from "next-auth/react";

export default async function IndexPage() {
  const user = await getCurrentUser();

  return (
    <>
      {user ? (
        <div>
          <p>
            You are signed in as{" "}
            <span className="font-semibold">{user?.email}</span>
          </p>
        </div>
      ) : (
        <div>
          <p>You are not signed in.</p>
        </div>
      )}
    </>
  );
}
