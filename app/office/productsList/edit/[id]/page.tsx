import ProductForm from "@/components/forms/ProductForm";
import { getCategories } from "@/lib/actions/category.action";
import { getProductById } from "@/lib/actions/product.action";
import { ParamsProps } from "@/lib/actions/sharedTypes";
import { getTags } from "@/lib/actions/tag.action";
import React from "react";

const page = async ({ params }: ParamsProps) => {
  // Pozivanje asinhronih funkcija
  const result = await getProductById({ productId: params.id });
  const categories = await getCategories(); // Osiguravanje da je pozvano asinhrono
  const savedTags = await getTags(); // Osiguravanje da je pozvano asinhrono

  // Definisanje sigurnih vrednosti u slučaju da je rezultat undefined
  const safeCategories = categories || [];
  const safeSavedTags = savedTags || [];

  return (
    <>
      <h2 className="h2-bold my-10 text-center text-gray-900">Edit Product</h2>
      <div>
        <ProductForm
          type="Edit"
          productDetails={result}
          categories={JSON.stringify(safeCategories)}  {/* Convert to string */}
          savedTags={JSON.stringify(safeSavedTags)}  {/* Convert to string */}
        />
      </div>
    </>
  );
};

export default page;