import CategoryForm from "@/components/forms/CategoryForm";
import { getCategoryById } from "@/lib/actions/category.action";
import { ParamsProps } from "@/lib/actions/sharedTypes";
import React from "react";

const page = async ({ params }: ParamsProps) => {
  const result = await getCategoryById({ categoryId: params.id });

  return (
    <>
      <h2 className="h2-bold text-dark_light900 text-center my-10">
        Edit Category
      </h2>
      <div>
        <CategoryForm type="Edit" categoryDetails={JSON.stringify(result)} />
      </div>
    </>
  );
};

export default page;
