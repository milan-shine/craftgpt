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
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {sidebarTabs.map((sidebarTab, index) => (
          <Link
            key={index}
            href={sidebarTab.path}
            className={cn(
              buttonVariants({
                variant: pathname.includes(sidebarTab.path)
                  ? "default"
                  : "ghost",
                size: "default",
              }),
              pathname.includes(sidebarTab.path) &&
                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
              "justify-start"
            )}
          >
            {sidebarTab.title}
          </Link>
        ))}
      </nav>
    </div>
  );
};
