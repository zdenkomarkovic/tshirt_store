import ProductForm from "@/components/forms/ProductForm";
import { getCategories } from "@/lib/actions/category.action";
import { getProductById } from "@/lib/actions/product.action";
import { ParamsProps } from "@/lib/actions/sharedTypes";
import { getTags } from "@/lib/actions/tag.action";
import React from "react";

const page = async ({ params }: ParamsProps) => {
  const result = await getProductById({ productId: params.id });
  const categories = await getCategories();
  const savedTags = await getTags();

  return (
    <>
      {" "}
      <h2 className="h2-bold my-10 text-center text-gray-900">Edit Product</h2>
      <div>
        <ProductForm
          type="Edit"
          productDetails={JSON.stringify(result)}
          categories={JSON.stringify(categories)}
          savedTags={JSON.stringify(savedTags)}
        />
      </div>
    </>
  );
};

export default page;
