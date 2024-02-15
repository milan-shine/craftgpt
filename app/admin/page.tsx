import { redirect } from "next/navigation";
import React from "react";

const Page: React.FC = () => {
  redirect("/admin/login");
  return <></>;
};

export default Page;
