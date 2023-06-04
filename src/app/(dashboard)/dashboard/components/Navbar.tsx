"use client";

import * as React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { MainNavItem } from "@/types";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { User as AuthUser } from "next-auth";
import { CreditCard, LogOut, PlusCircle, Settings, User } from "lucide-react";
import TeamSwitcher from "./TeamSwitcher";
import { Input } from "@/components/ui/input";

export function MainNav({
  items,
  user,
}: {
  items?: MainNavItem[];
  user: Pick<AuthUser, "name" | "image" | "email">;
}) {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  React.useLayoutEffect((): (() => void) => {
    const originalStyle: string = window.getComputedStyle(
      document.body
    ).overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = originalStyle);
  }, []);

  return (
    <>
      <div className="flex gap-6 md:gap-10">
        {/* <Link href="/" className="hidden items-center space-x-2 md:flex">
          <Icons.logo />
          <span className="hidden font-bold sm:inline-block">
            {siteConfig.name}
          </span>
        </Link> */}
        <TeamSwitcher className="hidden md:flex" user={user} />
        {items?.length ? (
          <nav className="hidden gap-6 md:flex">
            {items?.map((item, index) => (
              <Link
                key={index}
                href={item.disabled ? "#" : item.href}
                className={cn(
                  "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                  item.href.startsWith(`/${segment}`)
                    ? "text-foreground"
                    : "text-foreground/60",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        ) : null}
        <button
          className="flex items-center space-x-2 md:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <Icons.close /> : <Icons.logo />}
          <span className="font-bold">Menu</span>
        </button>

        {showMobileMenu && items && (
          <div
            className={cn(
              "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
            )}
          >
            <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
              <TeamSwitcher className="flex w-full" user={user} />
              <nav className="grid grid-flow-row auto-rows-max text-sm">
                {items.map((item, index) => (
                  <Link
                    key={index}
                    href={item.disabled ? "#" : item.href}
                    className={cn(
                      "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                      item.disabled && "cursor-not-allowed opacity-60"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-6 md:gap-10">
        {/* searchbar here */}
        <div>
          <Input
            type="search"
            placeholder="Search..."
            className="h-9 md:w-[100px] lg:w-[300px]"
          />
        </div>
        {/* user dropdown menu */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-8 w-8">
              {user.image ? (
                <AvatarImage alt="Picture" src={user.image} />
              ) : (
                <AvatarFallback>
                  <span className="sr-only">{user.name}</span>
                  <Icons.user className="h-4 w-4" />
                </AvatarFallback>
              )}
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  {user.name && <p className="font-medium">{user.name}</p>}
                  {user.email && (
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  )}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <Link href="">Profile</Link>
                {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <Link href="/dashboard/billing">Billing</Link>
                {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <Link href="/dashboard/settings">Settings</Link>
                {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={(event) => {
                event.preventDefault();
                signOut({
                  callbackUrl: `${window.location.origin}`,
                });
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

// "use client";

// import * as React from "react";
// import Link from "next/link";
// import { useSelectedLayoutSegment } from "next/navigation";

// import { MainNavItem } from "@/types";
// import { siteConfig } from "@/lib/config/site";
// import { cn } from "@/lib/utils";
// import { Icons } from "@/components/Icons";

// import { signOut } from "next-auth/react";
// import { User as AuthUser } from "next-auth";
// import TeamSwitcher from "./TeamSwitcher";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";

// export function MainNav({
//   items,
//   user,
// }: {
//   items?: MainNavItem[];
//   user: Pick<AuthUser, "name" | "image" | "email">;
// }) {
//   const segment = useSelectedLayoutSegment();
//   const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

//   React.useLayoutEffect((): (() => void) => {
//     const originalStyle: string = window.getComputedStyle(
//       document.body
//     ).overflow;
//     document.body.style.overflow = "hidden";
//     return () => (document.body.style.overflow = originalStyle);
//   }, []);

//   return (
//     <>
//       <div className="flex gap-6 md:gap-10">
//         <div className="flex h-16 items-center">
//           {/* <Link href="/" className="hidden items-center md:flex">
//             <Icons.logo />
//             <span className="hidden font-bold sm:inline-block">
//               {siteConfig.name}
//             </span>
//           </Link> */}
//
//           {/* navlinks for the dashboard */}

//           {items?.length ? (
//             <nav
//               className={cn("flex items-center space-x-4 lg:space-x-6 mx-6")}
//             >
//               {items?.map((item, index) => (
//                 <Link
//                   key={index}
//                   href={item.disabled ? "#" : item.href}
//                   className={cn(
//                     "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
//                     item.href.startsWith(`/${segment}`)
//                       ? "text-foreground"
//                       : "text-foreground/60",
//                     item.disabled && "cursor-not-allowed opacity-80"
//                   )}
//                 >
//                   {item.title}
//                 </Link>
//               ))}
//             </nav>
//           ) : null}

//           {/* // searchboar inside the navbar */}

//         </div>

//         <button
//           className="flex items-center space-x-2 md:hidden"
//           onClick={() => setShowMobileMenu(!showMobileMenu)}
//         >
//           {showMobileMenu ? <Icons.close /> : <Icons.logo />}
//           <span className="font-bold">Menu</span>
//         </button>

//         {showMobileMenu && items && (
//           <div
//             className={cn(
//               "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
//             )}
//           >
//             <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
//               <Link href="/" className="flex items-center space-x-2">
//                 <span className="font-bold">{siteConfig.name}</span>
//               </Link>
//               <nav className="grid grid-flow-row auto-rows-max text-sm">
//                 {items.map((item, index) => (
//                   <Link
//                     key={index}
//                     href={item.disabled ? "#" : item.href}
//                     className={cn(
//                       "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
//                       item.disabled && "cursor-not-allowed opacity-60"
//                     )}
//                   >
//                     {item.title}
//                   </Link>
//                 ))}
//               </nav>
//             </div>
//           </div>
//         )}
//       </div>
//
//     </>
//   );
// }
