"use client";

import Image from "@/node_modules/next/image";
import { useRouter } from "@/node_modules/next/navigation";
import React from "react";

interface ProductProps {
  picture: string;
  title: string;
  price: number;
  itemId: string;
  discount?: number;
}

const Card = ({ picture, title, price, itemId }: ProductProps) => {
  const router = useRouter();

  const singleProduct = () => {
    router.push(`/products/${JSON.parse(itemId)}`);
  };
  return (
    <div onClick={singleProduct} className=" ">
      <div className="flex flex-col gap-3">
        <div className="overflow-hidden rounded-md">
          <Image
            src={picture}
            width={500}
            height={500}
            alt="product-picture"
            className="hover:scale-110"
          />
        </div>
        <div className="flex flex-col gap-3 px-2">
          <h3 className="h3-semibold">{title}</h3>
          <p className="primary-text-gradient text-[22px] font-semibold leading-[31.2px]">
            {price} RSD
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
