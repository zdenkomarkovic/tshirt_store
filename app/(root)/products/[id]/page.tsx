import { getProductById } from "@/lib/actions/product.action";
import { ParamsProps } from "@/lib/actions/sharedTypes";
import Image from "@/node_modules/next/image";
import React from "react";

const page = async ({ params }: ParamsProps) => {
  const result = await getProductById({ productId: params.id });

  return (
    <div className="container">
      <h2>{result.title}</h2>
      <Image
        src={result.image}
        width={600}
        height={600}
        alt="product-picture"
      />
      <h3>{result.price} RSD</h3>
      <h3>{result.discount}%</h3>
      <p>{result.stock}</p>
      <h3>{result.features}</h3>
      <p>{result.description}</p>
    </div>
  );
};

export default page;
