"use client";

import { createProduct } from "@/lib/actions/product.action";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from "@/lib/validations";
import { usePathname, useRouter } from "next/navigation";

type Inputs = z.infer<typeof ProductSchema>;

const Product = () => {
  // const router = useRouter()
  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(ProductSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await createProduct({
        title: data.title,
        description: data.description,
        path: pathname,
      });
    } catch (error) {
      console.log(error);
    }
    reset();
    console.log(data);
  };

  // const handleOnSubmit = async (event: FormEvent<HTMLFormElement>)

  return (
    <div className="w-[600px] border rounded-lg mx-auto my-[50px] py-[50px]  ">
      <h3 className="h2-bold text-center">Add the product</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-[450px] mx-auto flex flex-col gap-6 "
      >
        <div className="flex flex-col gap-2">
          <label className="base-medium">
            Title:{" "}
            {errors.title?.message && (
              <span className=" text-sm text-red-400">
                {errors.title.message}
              </span>
            )}
          </label>
          <input
            className="border rounded-md base-medium py-[5px] px-[15px]"
            {...register("title")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="base-medium">
            Description:{" "}
            {errors.description?.message && (
              <span className="text-sm text-red-400">
                {errors.description.message}
              </span>
            )}
          </label>
          <input
            className="border rounded-md base-medium py-[5px] px-[15px]"
            {...register("description")}
          />
        </div>

        <div className="">
          <input
            type="submit"
            className="primary-gradient rounded-md text-light-900 base-medium py-[5px] px-[15px]"
          />
        </div>
      </form>
    </div>
  );
};

export default Product;
