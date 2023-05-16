import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Feedbacks",
      href: "/feedbacks",
    },
    {
      title: "Sites",
      href: "/sites",
    },
    {
      title: "Documentation",
      href: "/docs",
    },
    // {
    //   title: "Support",
    //   href: "/support",
    //   disabled: true,
    // },
  ],
  //   sidebarNav: [
  //     {
  //       title: "Posts",
  //       href: "/dashboard",
  //       icon: "post",
  //     },
  //     {
  //       title: "Billing",
  //       href: "/dashboard/billing",
  //       icon: "billing",
  //     },
  //     {
  //       title: "Settings",
  //       href: "/dashboard/settings",
  //       icon: "settings",
  //     },
  //   ],
};
