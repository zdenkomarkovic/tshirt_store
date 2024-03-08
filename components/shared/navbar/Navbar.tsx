"use client";

import { navbarLinks } from "@/constants/index";
import Image from "@/node_modules/next/image";
import Link from "@/node_modules/next/link";
import { usePathname } from "@/node_modules/next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className=" background-light900_dark200 light-border sticky left-0 top-0 p-3 shadow-light-300 dark:shadow-none ">
      <nav className="container flex-between">
        <Image src="/t-shirt.svg" width={23} height={23} alt="tshirt" />

        <div className="flex-between gap-10">
          {navbarLinks.map((item, i) => {
            const isActive =
              (pathname.includes(item.route) && item.route.length > 1) ||
              pathname === item.route;
            return (
              <Link
                key={i}
                href={item.route}
                className={`${isActive ? " primary-gradient rounded-lg text-light-900" : "text-dark300_light900"} bg-transparent px-4 py-2`}
              >
                <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                  {item.label}
                </p>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
