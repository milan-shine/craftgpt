import React from "react";

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header>
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
    </header>
  );
};

export default Header;
