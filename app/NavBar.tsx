import Link from "next/link";
import React from "react";

const NavBar = () => {
  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ];
  return (
    <nav className="flex border-b px-4 h-14 items-center gap-6">
      <Link href={"/"}>Issue Tracker</Link>
      <ul className="flex gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            className="text-zinc-400 hover:text-zinc-800 transition-colors"
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
