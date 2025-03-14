import AddToCart from "@/components/addToCart/page";
import { getProductById } from "@/lib/actions/product.action";
import { ParamsProps } from "@/lib/actions/sharedTypes";
import Image from "@/node_modules/next/image";
import React from "react";

const page = async ({ params }: ParamsProps) => {
  const result = await getProductById({ productId: params.id });
  function formatPrice(price: number) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  const formattedPrice = formatPrice(result?.price);

  return (
    <div className="container">
      <div className="my-16 flex items-start gap-20">
        <Image
          src={result?.image}
          width={550}
          height={550}
          alt="product-picture"
        />
        <div className="flex flex-col gap-8">
          <h2 className="primary-text-gradient py-[50px] text-[40px] font-bold">
            {result?.title}
          </h2>
          <h3>{result?.features}</h3>
          <h3 className="primary-text-gradient text-[30px] font-bold">
            {formattedPrice} RSD
          </h3>

          <AddToCart productId={result._id} />
        </div>
      </div>

      <p>{result?.description}</p>
    </div>
  );
};

export default page;
