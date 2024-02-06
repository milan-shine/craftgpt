import React from "react";

const AdminContainer: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  return (
    <section className="flex flex-col gap-2 mt-6 w-[60%]">{children}</section>
  );
};

export default AdminContainer;
