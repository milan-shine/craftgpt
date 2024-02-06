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
    title: "Assessment Models",
    path: "/admin/assessment-models",
  },
  {
    title: "Assessments",
    path: "/admin/assessments",
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
