import ProductForm from "@/components/forms/ProductForm";
import { getCategories } from "@/lib/actions/category.action";
import { getTags } from "@/lib/actions/tag.action";
import React from "react";

const page = async () => {
  const categories = await getCategories();
  const savedTags = await getTags();
  return (
    <>
      <div className="py-20 ">
        <ProductForm
          categories={JSON.stringify(categories)}
          savedTags={JSON.stringify(savedTags)}
        />
      </div>
    </>
  );
};

export default page;
