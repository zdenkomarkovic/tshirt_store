import Link from "@/node_modules/next/link";
import React from "react";

interface SlideProps {
  picture: string;
  title?: string;
  subtitle?: string;
  link?: string;
}

const SlideCard = ({ picture, title, subtitle, link }: SlideProps) => {
  return (
    <>
      <Link href={link || "/"}>
        <div className="relative w-[800px] h-[480px] rounded-lg text-center overflow-hidden">
          <img
            src={picture}
            alt=""
            className="hover:scale-110 w-[800px] h-[480px]"
          />
          <div className="absolute bottom-0  primary-gradient-opacity w-full h-[70px]"></div>
          <div className="absolute  flex flex-col align-middle items-center justify-center text-nowrap bottom-0 left-1/2 transform translate-x-[-50%] h-[70px] hover:scale-110 ">
            <h2 className="h2-bold text-white">{title}</h2>
            <h6 className="text-white">{subtitle}</h6>
          </div>
        </div>
      </Link>
    </>
  );
};

export default SlideCard;
