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
    <div className="flex w-[280px] items-center justify-between text-[20px] font-bold">
      <div className="flex w-[120px] items-center justify-between rounded-lg bg-slate-50">
        <span
          className="cursor-pointer rounded-l-lg px-4 py-[8px] hover:bg-slate-200"
          onClick={() => quantity > 1 && setQuantity(quantity - 1)}
        >
          -
        </span>
        <span className="">{quantity}</span>
        <span
          className="cursor-pointer rounded-r-lg px-4 py-[8px] hover:bg-slate-200"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </span>
      </div>
      <button
        onClick={handleAddToCart}
        className="primary-gradient rounded-lg px-4 py-2 text-light-900 hover:scale-110"
      >
        Add to cart
      </button>
    </div>
  );
};

export default AddToCart;
