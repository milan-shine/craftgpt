"use client";

import React from "react";
import { Sidebar } from "./components/sidebar";
import { usePathname } from "next/navigation";
import { ListChecks, Package } from "lucide-react";
import { ScrollArea } from "@/components/shadcn/ui/scroll-area";

export type SidebarTabs = {
  title: string;
  path: string;
  icon: any
}[];

const SIDEBAR_TABS: SidebarTabs = [
  {
    title: "Assessment Models",
    path: "/admin/assessment-models",
    icon: <Package />
  },
  {
    title: "Assessments",
    path: "/admin/assessments",
    icon: <ListChecks />
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
    <div className="relative flex bg-background">
      <div className="sticky top-0 flex h-[100vh] w-64 flex-1 bg-secondary text-secondary-foreground shadow-lg">
        <ScrollArea className="relative top-0 h-[100vh] w-full flex-col">
          <Sidebar sidebarTabs={SIDEBAR_TABS} />
        </ScrollArea>
      </div>
      <div className="flex-[5] space-y-2">{children}</div>
    </div>
  );
};

export default Layout;
