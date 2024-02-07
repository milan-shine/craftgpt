import React from "react";
import Assessment from "./components/Assessment";

const Page = async ({ searchParams }: { searchParams: any }) => {
  const accessCode = searchParams?.["access-code"];
  return (
    <>
      <Assessment accessCode={accessCode} />
    </>
  );
};

export default Page;
