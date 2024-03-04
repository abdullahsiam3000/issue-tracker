"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { PiBugBeetleLight } from "react-icons/pi";

const NavBar = () => {
  const currentPath = usePathname();
  console.log(currentPath);
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
      <Link href={"/"}>
        <PiBugBeetleLight size={"2rem"} className="text-zinc-500" />
      </Link>
      <ul className="flex gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            className={`${
              currentPath === link.href ? "text-zinc-800" : "text-zinc-400"
            } hover:text-zinc-800 transition-colors `}
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
