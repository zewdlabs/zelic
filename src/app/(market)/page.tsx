import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/session";
import localFont from "next/font/local";
const fontHeading = localFont({
  src: "../../assets/fonts/CalSansSemiBold.woff2",
});

export default async function IndexPage() {
  const user = await getCurrentUser();
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1
            className={cn(
              "text-3xl sm:text-7xl md:text-6xl lg:text-7xl",
              fontHeading.className
            )}
          >
            Streamline website feedbacks
          </h1>
          <p
            className={cn(
              "max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
            )}
          >
            Amplify engagement and empower growth
          </p>
          <div className="space-x-4">
            {user ? (
              <Link
                href="/dashboard"
                className={cn(buttonVariants({ size: "lg" }))}
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className={cn(buttonVariants({ size: "lg" }))}
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
