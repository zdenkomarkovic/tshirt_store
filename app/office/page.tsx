import ProductForm from "@/components/forms/ProductForm";
import { getCategories } from "@/lib/actions/category.action";
import { getTags } from "@/lib/actions/tag.action";
import React from "react";

const page = async () => {
  const categories = await getCategories();
  const savedTags = await getTags();
  const safeCategories = categories || [];
  const safeSavedTags = savedTags || [];

  return (
    <>
      <div className="py-20">
        <ProductForm categories={safeCategories} savedTags={safeSavedTags} />
      </div>
    </>
  );
};

export default page;
