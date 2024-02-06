"use client";

import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

export default function BreadcrumbView({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const routes = pathname.split("/").slice(2);
  console.log(routes, "routes", pathname);
  return (
    <div className="flex flex-col">
        <span className="flex">
      {routes.map((path) => (
        <span>/{path}</span>
      ))}
      </span>
      {children}
    </div>
  );
}
