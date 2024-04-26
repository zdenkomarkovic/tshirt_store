import DashboardSidebar from "@/components/sidebar/DashboardSidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div className="flex">
        <DashboardSidebar />
        <section className="container">
          <div>{children}</div>
        </section>
      </div>
    </main>
  );
};
export default Layout;
