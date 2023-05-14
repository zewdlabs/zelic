import { siteConfig } from "@/lib/config/site";
import { Navbar } from "./components/navbar";

export default function MarkettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
