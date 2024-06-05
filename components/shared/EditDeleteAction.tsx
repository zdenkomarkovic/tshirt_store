"use client";

import { deleteCategory } from "@/lib/actions/category.action";
import { deleteColection } from "@/lib/actions/colection.action";
import { deleteProduct } from "@/lib/actions/product.action";
import { deleteSlider } from "@/lib/actions/slider.action";
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
    if (type === "Product") {
      router.push(`/office/productsList/edit/${itemId}`);
    }
    if (type === "Category") {
      router.push(`/office/category/edit/${itemId}`);
    }
    if (type === "Slider") {
      router.push(`/office/baner/edit/${itemId}`);
    }
    if (type === "Colection") {
      router.push(`/office/baner/edit/${itemId}`);
    }
  };
  const handleDelete = async () => {
    if (type === "Product") {
      await deleteProduct({
        productId: itemId,
        path: pathname,
      });
    }
    if (type === "Category") {
      await deleteCategory({
        categoryId: itemId,
        path: pathname,
      });
    }
    if (type === "Slider") {
      await deleteSlider({
        sliderId: itemId,
        path: pathname,
      });
    }
    if (type === "Colection") {
      await deleteColection({
        colectionId: itemId,
        path: pathname,
      });
    }
  };
  return (
    <div className="flex items-center justify-end gap-4 max-sm:w-full">
      <Image
        src="/assets/icons/edit.svg"
        alt="Edit"
        width={18}
        height={18}
        onClick={handleEdit}
        className="cursor-pointer object-contain"
      />

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
