import Product from "@/components/forms/Product";
import { getProductById } from "@/lib/actions/product.action";
import { ParamsProps } from "@/lib/actions/sharedTypes";
import React from "react";

const page = async ({ params }: ParamsProps) => {
  const result = await getProductById({ productId: params.id });
  return (
    <>
      <h4>Edit product</h4>
      <Product type="Edit" questionDetails={JSON.stringify(result)} />
    </>
  );
};

export default page;
