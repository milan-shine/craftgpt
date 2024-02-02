"use client";

import React from "react";
import { Sidebar } from "./components/sidebar";
import { usePathname } from "next/navigation";

export type SidebarTabs = {
  title: string;
  path: string;
}[];

const SIDEBAR_TABS: SidebarTabs = [
  {
    title: "Maturity Modules",
    path: "/admin/maturity-models",
  },
  {
    title: "tab 2",
    path: "/admin/tab-2",
  },
  {
    title: "tab 3",
    path: "/admin/tab-3",
  },
];

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();

  const authRoutes = ["/admin/login", "/admin/signup"];

  if (authRoutes.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-[100vh] bg-background">
      <div className="bg-secondary w-64 flex-1 shadow-lg text-secondary-foreground">
        <Sidebar sidebarTabs={SIDEBAR_TABS} />
      </div>
      <div className="flex-[5] space-y-2 p-8">{children}</div>
    </div>
  );
};

export default Layout;
