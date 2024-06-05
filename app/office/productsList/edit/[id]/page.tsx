import ProductForm from "@/components/forms/ProductForm";
import { getProductById } from "@/lib/actions/product.action";
import { ParamsProps } from "@/lib/actions/sharedTypes";
import React from "react";

const page = async ({ params }: ParamsProps) => {
  const result = await getProductById({ productId: params.id });

  return (
    <>
      {" "}
      <h2 className="h2-bold text-dark_light900 text-center my-10">
        Edit Product
      </h2>
      <div>
        <ProductForm type="Edit" productDetails={JSON.stringify(result)} />
      </div>
    </>
  );
};

export default page;
