"use client";

import { deleteProduct } from "@/lib/actions/product.action";
import Image from "@/node_modules/next/image";
import { usePathname, useRouter } from "@/node_modules/next/navigation";
import React from "react";

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const handleEdit = () => {
    router.push(`dashboard/productAdd/edit/${JSON.parse(itemId)}`);
  };
  const handleDelete = async () => {
    if (type === "Product") {
      await deleteProduct({
        productId: JSON.parse(itemId),
        path: pathname,
      });
    }
  };
  return (
    <div className="flex items-center justify-end gap-8 max-sm:w-full pr-8">
      {type === "Product" && (
        <Image
          src="/assets/icons/edit.svg"
          alt="Edit"
          width={18}
          height={18}
          onClick={handleEdit}
          className="cursor-pointer object-contain"
        />
      )}
      <Image
        src="/assets/icons/trash.svg"
        alt="Delete"
        width={18}
        height={18}
        onClick={handleDelete}
        className="cursor-pointer object-contain"
      />
    </div>
  );
};

export default EditDeleteAction;
