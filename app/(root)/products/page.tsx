import Card from "@/components/cards/productCard/page";
import { getProducts } from "@/lib/actions/product.action";

import React from "react";

const page = async () => {
  const filter = "regular";
  const result = (await getProducts({ filter })) || [];
  const visibleProducts = result.filter((item) => !item.hidden);
  return (
    <div className="container mx-auto flex flex-wrap justify-around">
      {visibleProducts.length > 0 ? (
        visibleProducts.map((product) => (
          <div key={product._id} className={`my-[50px] w-[300px]`}>
            <Card
              picture={product.image}
              title={product.title}
              price={product.price}
              itemId={JSON.stringify(product.id)}
              discount={product.discount}
            />
          </div>
        ))
      ) : (
        <h4>Nema nicega</h4>
      )}
    </div>
  );
};

export default page;
