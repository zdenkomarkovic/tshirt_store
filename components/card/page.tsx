"use client";

import { deleteProduct, editProduct } from "@/lib/actions/product.action";
import Image from "@/node_modules/next/image";
import { usePathname, useRouter } from "@/node_modules/next/navigation";
import React from "react";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

interface ProductProps {
  picture: string;
  title: string;
  price: number;
  itemId: string;
}

const Card = ({ picture, title, price, itemId }: ProductProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const singleProduct = () => {
    router.push(`/products/${JSON.parse(itemId)}`);
  };
  return (
    <div className=" my-[50px] w-[300px] ">
      <div className="flex flex-col gap-3" onClick={singleProduct}>
        <div className="rounded-md overflow-hidden ">
          <Image
            src={picture}
            width={300}
            height={300}
            alt="product-picture"
            className=" hover:scale-110 "
          />
        </div>
        <div className="flex flex-col gap-3 px-2">
          <h3 className=" h3-semibold">{title}</h3>
          <p className=" text-[22px] font-semibold leading-[31.2px] primary-text-gradient">
            {price} RSD
          </p>
        </div>
      </div>
      <SignedIn>
        <EditDeleteAction type="Product" itemId={itemId} />
      </SignedIn>
    </div>
  );
};

export default Card;
