"use client";

import { deleteProduct, editProduct } from "@/lib/actions/product.action";
import Image from "@/node_modules/next/image";
import { usePathname, useRouter } from "@/node_modules/next/navigation";
import React from "react";

interface ProductProps {
  picture: string;
  title: string;
  price: number;
  itemId: string;
}

const Card = ({ picture, title, price, itemId }: ProductProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleDelete = async () => {
    await deleteProduct({
      productId: JSON.parse(itemId),
      path: pathname,
    });
  };

  const handleEditProduct = () => {
    router.push(`/dashboard/edit/${JSON.parse(itemId)}`);
  };

  return (
    <div className="flex-center flex-col gap-5 mt-[100px]">
      <div className="rounded-md overflow-hidden">
        <Image
          src={picture}
          width={300}
          height={500}
          alt="product-picture"
          className=" hover:scale-110 "
        />
      </div>
      <div>
        <h4>{title}</h4>
        <p>{price}</p>

        <div className="flex gap-5">
          <Image
            src="/icons/trash.svg"
            alt="delete"
            width={14}
            height={14}
            className="cursor-pointer object-contain"
            onClick={handleDelete}
          />
          <Image
            src="/icons/edit.svg"
            alt="delete"
            width={14}
            height={14}
            className="cursor-pointer object-contain"
            onClick={handleEditProduct}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
