import ProductForm from "@/components/forms/ProductForm";
import React from "react";

const page = () => {
  return (
    <div>
      <h2 className="h2-bold text-dark_light900 text-center my-10">
        Create Product
      </h2>
      <ProductForm />
    </div>
  );
};

export default page;
