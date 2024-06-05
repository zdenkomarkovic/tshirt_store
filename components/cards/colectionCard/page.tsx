import Link from "@/node_modules/next/link";
import React from "react";

interface ColectionProps {
  picture: string;
  title?: string;
  subtitle?: string;
  link?: string;
}

const ColectionCard = ({ picture, title, subtitle, link }: ColectionProps) => {
  return (
    <>
      <Link href={link || "/"}>
        <div className="relative w-[400px] h-[400px] rounded-lg text-center border-2 border-primary-100 overflow-hidden">
          <img
            src={picture}
            alt=""
            className="hover:scale-110 w-full object-cover"
          />

          <div className="absolute  bottom-0 primary-gradient-opacity w-full h-[70px]"></div>
          <div className="absolute flex flex-col align-middle items-center justify-center text-nowrap bottom-0 left-1/2 transform translate-x-[-50%] h-[70px] hover:scale-110">
            <h3 className="h3-bold text-white">{title}</h3>
            <h6 className="text-white">{subtitle}</h6>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ColectionCard;
