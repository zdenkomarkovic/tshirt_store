import { dashboardLinks } from "@/constants/index";
import Link from "@/node_modules/next/link";
import React from "react";

const DashboardSidebar = () => {
  return (
    <div className="flex flex-col gap-5 p-10 ">
      {dashboardLinks.map((link) => {
        return (
          <Link key={link.label} href={link.route}>
            {link.label}
          </Link>
        );
      })}
    </div>
  );
};

export default DashboardSidebar;
