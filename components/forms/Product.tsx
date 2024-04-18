"use client";

import { createProduct } from "@/lib/actions/product.action";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from "@/lib/validations";
import { usePathname, useRouter } from "next/navigation";
import { FileParser } from "@/lib/utils";
import Image from "@/node_modules/next/image";

type Inputs = z.infer<typeof ProductSchema>;

interface Props {
  type?: string;
  questionDetails: string;
}

const Product = ({ type, questionDetails }: Props) => {
  // const router = useRouter()
  const pathname = usePathname();

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(ProductSchema),
  });
  const image = watch("image");
  const imagePreview = image ? URL.createObjectURL(image) : null;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    try {
      const processedValues = { ...data };
      processedValues.image = await FileParser(data.image);
      console.log(processedValues);

      await createProduct({
        title: data.title,
        price: data.price,
        discount: data.discount,
        stock: data.stock,
        image: processedValues.image,
        features: data.features,
        description: data.description,
        path: pathname,
      });
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  // const handleOnSubmit = async (event: FormEvent<HTMLFormElement>)

  return (
    <div className="w-[600px] border rounded-lg mx-auto my-[50px] py-[50px]  ">
      <h3 className="h2-bold text-center">Add the product</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-[450px] mx-auto flex flex-col gap-3 "
        encType="multipart/form-data"
      >
        <div className="flex flex-col gap-1">
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
        <div className="flex flex-col gap-1">
          <label className="base-medium">
            Price:{" "}
            {errors.price?.message && (
              <span className=" text-sm text-red-400">
                {errors.price.message}
              </span>
            )}
          </label>
          <input
            className="border rounded-md base-medium py-[5px] px-[15px]"
            type="number"
            {...register("price")}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="base-medium">
            Discount:{" "}
            {errors.discount?.message && (
              <span className=" text-sm text-red-400">
                {errors.discount.message}
              </span>
            )}
          </label>
          <input
            className="border rounded-md base-medium py-[5px] px-[15px]"
            type="number"
            {...register("discount")}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="base-medium">
            Stock:{" "}
            {errors.stock?.message && (
              <span className=" text-sm text-red-400">
                {errors.stock.message}
              </span>
            )}
          </label>
          <input
            type="number"
            className="border rounded-md base-medium py-[5px] px-[15px]"
            {...register("stock")}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="base-medium">
            Image:{" "}
            {errors.image?.message && (
              <span className=" text-sm text-red-400">
                {errors.image.message}
              </span>
            )}
          </label>
          <Controller
            name="image"
            control={control}
            render={({ field: { ref, name, onBlur, onChange } }) => (
              <input
                type="file"
                ref={ref}
                name={name}
                onBlur={onBlur}
                onChange={(e) => onChange(e.target.files?.[0])}
              />
            )}
          />
          {imagePreview && <img src={imagePreview} />}
        </div>
        <div className="flex flex-col gap-1">
          <label className="base-medium">
            Features:{" "}
            {errors.features?.message && (
              <span className=" text-sm text-red-400">
                {errors.features.message}
              </span>
            )}
          </label>
          <input
            className="border rounded-md base-medium py-[5px] px-[15px]"
            {...register("features")}
          />
        </div>
        <div className="flex flex-col gap-1">
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
