import React from "react";

interface HeaderProps extends React.ComponentPropsWithoutRef<"header"> {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title, ...restProps }) => {
  return (
    <header {...restProps}>
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
    </header>
  );
};

export default Header;
