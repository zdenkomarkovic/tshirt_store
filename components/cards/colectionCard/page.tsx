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
        <div className="relative h-[400px] w-[400px] overflow-hidden rounded-lg border-2 border-primary-100 text-center">
          <img
            src={picture}
            alt=""
            className="w-full object-cover hover:scale-110"
          />

          <div className="primary-gradient-opacity absolute bottom-0 h-[70px] w-full"></div>
          <div className="absolute bottom-0 left-1/2 flex h-[70px] translate-x-[-50%] transform flex-col items-center justify-center text-nowrap align-middle hover:scale-110">
            <h3 className="h3-bold text-white">{title}</h3>
            <h6 className="text-white">{subtitle}</h6>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ColectionCard;
