import Card from "@/components/cards/productCard/page";
import { getProducts } from "@/lib/actions/product.action";

import React from "react";

const Store = async () => {
  let result = await getProducts();

  return (
    <div className="container grid grid-cols-4">
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

export default Store;
