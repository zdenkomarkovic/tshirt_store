import Card from "@/components/card/page";
import { getProducts } from "@/lib/actions/product.action";

import React from "react";

const page = async () => {
  let result = await getProducts();
  return (
    <div className="container flex flex-wrap px-auto justify-around">
      {result.length > 0 ? (
        result.map((product) => (
          <Card
            key={product._id}
            picture={product.image}
            title={product.title}
            price={product.price}
            itemId={JSON.stringify(product.id)}
          />
        ))
      ) : (
        <h4>Nema nicega</h4>
      )}
    </div>
  );
};

export default page;
