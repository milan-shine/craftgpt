import React from "react";

const AdminContainer: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  return (
    <section className="mt-6 flex w-[100%] flex-col gap-2">{children}</section>
  );
};

export default AdminContainer;
