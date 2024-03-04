"use client";
import React from "react";

import classNames from "classnames";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiBugBeetleLight } from "react-icons/pi";

const NavBar = () => {
  const currentPath = usePathname();
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
    <nav className="mb-2 flex h-14 items-center justify-between gap-6 border-b px-4">
      <Link href={"/"}>
        <PiBugBeetleLight size={"2rem"} className="text-zinc-500" />
      </Link>
      <ul className="flex gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            className={classNames("transition-colors hover:text-zinc-800", {
              "text-zinc-900": currentPath === link.href,
              "text-zinc-400": currentPath !== link.href,
            })}
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
