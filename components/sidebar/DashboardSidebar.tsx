"use client";

import {
  officeOrdersLinks,
  officeProductLinks,
  officePromotionLinks,
  officeReportLinks,
  officeWebsiteLinks,
} from "@/constants/index";
import Link from "@/node_modules/next/link";
import React, { useState } from "react";
import { SlArrowDown } from "react-icons/sl";

const DashboardSidebar = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [activeLink, setActiveLink] = useState(null);

  const handleClick = (buttonName: any) => {
    setActiveButton(activeButton === buttonName ? null : buttonName);
  };
  const handleClickLink = (linkName: any) => {
    setActiveLink(linkName);
  };

  return (
    <div className="background-light900_dark200 light-border sticky left-0 top-0 flex h-screen flex-col border-r shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[200px]">
      <Link
        href="/products"
        target={"_blank"}
        rel="noopener noreferrer"
        className="primary-gradient m-8 rounded-lg p-2 text-center text-light-900"
      >
        Go to Website
      </Link>
      <button
        onClick={() => handleClick("orders")}
        className={`flex items-center justify-between p-3 text-left hover:bg-slate-100 ${activeButton === "orders" ? "primary-gradient text-light-900" : "bg-transparent"}`}
      >
        Porudzbine{" "}
        <SlArrowDown
          className={`${activeButton === "orders" ? "" : "-rotate-90"}`}
        />
      </button>
      <div
        className={`flex flex-col bg-slate-50 ${activeButton === "orders" ? "visible" : "hidden"}`}
      >
        {" "}
        {officeOrdersLinks.map((orderLink) => {
          return (
            <Link
              key={orderLink.label}
              href={orderLink.route}
              onClick={() => handleClickLink(orderLink.label)}
              className={`px-3 py-2 hover:bg-slate-200 ${activeLink === orderLink.label ? "bg-slate-200" : ""}`}
            >
              {orderLink.label}
            </Link>
          );
        })}
      </div>
      <button
        className={`flex items-center justify-between p-3 text-left hover:bg-slate-100 ${activeButton === "products" ? "primary-gradient text-light-900" : "bg-transparent"}`}
        onClick={() => handleClick("products")}
      >
        Proizvodi
        <SlArrowDown
          className={` ${activeButton === "products" ? "" : "-rotate-90"}`}
        />
      </button>
      <div
        className={`flex flex-col bg-slate-50 ${activeButton === "products" ? "visible" : "hidden"}`}
      >
        {" "}
        {officeProductLinks.map((orderLink) => {
          return (
            <Link
              key={orderLink.label}
              href={orderLink.route}
              onClick={() => handleClickLink(orderLink.label)}
              className={`px-3 py-2 hover:bg-slate-200 ${activeLink === orderLink.label ? "bg-slate-200" : ""}`}
            >
              {orderLink.label}
            </Link>
          );
        })}
      </div>
      <button
        className={`flex items-center justify-between p-3 text-left hover:bg-slate-100 ${activeButton === "website" ? "primary-gradient text-light-900" : "bg-transparent"}`}
        onClick={() => handleClick("website")}
      >
        Website
        <SlArrowDown
          className={` ${activeButton === "website" ? "" : "-rotate-90"}`}
        />
      </button>
      <div
        className={`flex flex-col bg-slate-50 ${activeButton === "website" ? "visible" : "hidden"}`}
      >
        {" "}
        {officeWebsiteLinks.map((orderLink) => {
          return (
            <Link
              key={orderLink.label}
              href={orderLink.route}
              onClick={() => handleClickLink(orderLink.label)}
              className={`px-3 py-2 hover:bg-slate-200 ${activeLink === orderLink.label ? "bg-slate-200" : ""}`}
            >
              {orderLink.label}
            </Link>
          );
        })}
      </div>
      <button
        className={`flex items-center justify-between p-3 text-left hover:bg-slate-100 ${activeButton === "promotion" ? "primary-gradient text-light-900" : "bg-transparent"}`}
        onClick={() => handleClick("promotion")}
      >
        Promocije
        <SlArrowDown
          className={` ${activeButton === "promotion" ? "" : "-rotate-90"}`}
        />
      </button>
      <div
        className={`flex flex-col bg-slate-50 ${activeButton === "promotion" ? "visible" : "hidden"}`}
      >
        {" "}
        {officePromotionLinks.map((orderLink) => {
          return (
            <Link
              key={orderLink.label}
              href={orderLink.route}
              onClick={() => handleClickLink(orderLink.label)}
              className={`px-3 py-2 hover:bg-slate-200 ${activeLink === orderLink.label ? "bg-slate-200" : ""}`}
            >
              {orderLink.label}
            </Link>
          );
        })}
      </div>
      <button
        className={`flex items-center justify-between p-3 text-left hover:bg-slate-100 ${activeButton === "report" ? "primary-gradient text-light-900" : "bg-transparent"}`}
        onClick={() => handleClick("report")}
      >
        Izvestaji
        <SlArrowDown
          className={` ${activeButton === "report" ? "" : "-rotate-90"}`}
        />
      </button>
      <div
        className={`flex flex-col bg-slate-50 ${activeButton === "report" ? "visible" : "hidden"}`}
      >
        {" "}
        {officeReportLinks.map((orderLink) => {
          return (
            <Link
              key={orderLink.label}
              href={orderLink.route}
              onClick={() => handleClickLink(orderLink.label)}
              className={`px-3 py-2 hover:bg-slate-200 ${activeLink === orderLink.label ? "bg-slate-200" : ""}`}
            >
              {orderLink.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardSidebar;
