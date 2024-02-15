"use client";

import React, { ReactNode } from "react";
import { createTitleCase } from "@/utils/string";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function BreadcrumbView({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const routes = pathname.split("/").slice(2);
  const isCurrentScreen = (index: number) =>  routes.length === index + 1

  return (
    <div className="flex flex-col pb-3">
      <span className="flex">
        { routes.length > 1 
          && routes.map((path, i) =>
           isCurrentScreen(i) ? (
            <span key={path} className="flex text-muted-foreground">
            {i > 0 && <span><ChevronRight/></span>}
            {createTitleCase(path)}
           </span>
          ) : (
            <Link key={path} className="hover:underline" href={`/admin/${path}`}>
            {i > 0 && <span className="mx-2">/</span>}
            {createTitleCase(path).replace(/-/g, ' ')}
          </Link>
          )
        )}
      </span>
      {children}
    </div>
  )
}
