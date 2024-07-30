"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/shadcn/ui/button";
import { SidebarTabs } from "../layout";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isCollapsed?: boolean;
  sidebarTabs: SidebarTabs;
}

export const Sidebar = ({ sidebarTabs, isCollapsed }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-0 data-[collapsed=true]:py-0"
    >
      <nav className="grid gap-1 p-0 px-0 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        <div
          className="flex h-16 items-center justify-center p-3 font-bold mb-3 border-b border-slate-600"
        >
          <h1>Web Assessment</h1>
        </div>
        {sidebarTabs.map((sidebarTab, index) => (
          <div
            className={cn(
              buttonVariants({
                variant: pathname.includes(sidebarTab.path)
                  ? "default"
                  : "ghost",
                size: "sm",
              }),
              pathname.includes(sidebarTab.path) &&
                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
              "justify-start rounded-none",
            )}
            style={{
              background: pathname.includes(sidebarTab.path) ? "#1E293B" : "",
              borderLeft: !pathname.includes(sidebarTab.path)
                ? "4px solid #112F49"
                : "4px solid #3764EB",
            }}
            key={index}
          >
            {sidebarTab.icon}
            <Link
              key={index}
              href={sidebarTab.path}
              as={sidebarTab.path}
              className={cn(
                buttonVariants({
                  variant: pathname.includes(sidebarTab.path)
                    ? "none"
                    : "none",
                  size: "default",
                }),
                !pathname.includes(sidebarTab.path) && "opacity-80",
              )}
            >
              {sidebarTab.title}
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
};
