import React from "react";

interface HeaderProps extends React.ComponentPropsWithoutRef<"header"> {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title, className, style, ...restProps }) => {
  return (
    <header
      className={`${className} sticky top-0 z-50 flex min-h-16 items-center px-8 shadow-lg bg-white`}
      style={{ ...style }}
      {...restProps}
    >
      <h1 className="text-xl font-semibold tracking-tight">
        {title}
      </h1>
    </header>
  );
};

export default Header;
