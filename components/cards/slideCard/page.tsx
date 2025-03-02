import Image from "@/node_modules/next/image";
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
        <div className="relative h-[480px] w-[800px] overflow-hidden rounded-lg text-center">
          <Image
            src={picture}
            width={800}
            height={480}
            alt=""
            className="h-[480px] w-[800px] hover:scale-110"
          />
          <div className="primary-gradient-opacity absolute bottom-0 h-[70px] w-full"></div>
          <div className="absolute bottom-0 left-1/2 flex h-[70px] -translate-x-1/2 flex-col items-center justify-center text-nowrap align-middle hover:scale-110">
            <h2 className="h2-bold text-white">{title}</h2>
            <h6 className="text-white">{subtitle}</h6>
          </div>
        </div>
      </Link>
    </>
  );
};

export default SlideCard;
