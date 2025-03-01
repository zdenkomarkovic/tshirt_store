"use client";

import { LS_CART } from "@/config/config";

import { useRouter } from "@/node_modules/next/navigation";
import React, { useState } from "react";

interface Params {
  productId: string;
}

const AddToCart = ({ productId }: Params) => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const cart = {
    quantity,
    productId,
  };
  const handleAddToCart = () => {
    setTimeout(() => {
      localStorage.setItem(LS_CART, JSON.stringify(cart));
      router.push("/products");
    }, 500);
  };

  return (
    <div className="flex items-center w-[280px] justify-between text-[20px] font-bold">
      <div className=" flex items-center bg-slate-50 w-[120px] justify-between rounded-lg ">
        <span
          className="px-4 py-[8px] cursor-pointer rounded-l-lg hover:bg-slate-200 "
          onClick={() => quantity > 1 && setQuantity(quantity - 1)}
        >
          -
        </span>
        <span className="">{quantity}</span>
        <span
          className="px-4 py-[8px] rounded-r-lg hover:bg-slate-200 cursor-pointer"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </span>
      </div>
      <button
        onClick={handleAddToCart}
        className="primary-gradient rounded-lg text-light-900 px-4 py-2 hover:scale-110"
      >
        Add to cart
      </button>
    </div>
  );
};

export default AddToCart;
