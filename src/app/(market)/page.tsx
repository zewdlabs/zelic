import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/config/site";
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
          <button onClick={() => signOut({ callbackUrl: "/" })}>
            Sign out
          </button>
        </div>
      ) : (
        <div>
          <p>You are not signed in.</p>
        </div>
      )}
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Easily manage your feeback from your site
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            {siteConfig.description}
          </p>
          <div className="space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}