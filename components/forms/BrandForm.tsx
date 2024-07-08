"use client";

import React, { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "@/node_modules/next/navigation";
import { FileParser } from "../../lib/FileParser";
import { revalidatePath } from "@/node_modules/next/cache";
import Link from "@/node_modules/next/link";
import { BrandSchema } from "@/lib/validations";
import { createBrand, editBrand } from "@/lib/actions/brand.action";

interface Props {
  type?: string;
  brandDetails?: string;
}

const BrandForm = ({ type, brandDetails }: Props) => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [updateImage, setUpdateImage] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const parsedBrandDetails = brandDetails && JSON.parse(brandDetails || "");

  const form = useForm<z.infer<typeof BrandSchema>>({
    resolver: zodResolver(BrandSchema),
    defaultValues: {
      title: parsedBrandDetails?.title || "",
      image: parsedBrandDetails?.image || "",
    },
  });

  async function onSubmit(values: z.infer<typeof BrandSchema>) {
    setIsSubmiting(true);
    try {
      if (type === "Edit" && !updateImage) {
        await editBrand({
          brandId: parsedBrandDetails._id,
          title: values.title,
          image: values.image,
          path: pathname,
        });
        router.push("/office/brand");
      } else {
        if (type === "Edit" && updateImage) {
          const processedValues = { ...values };
          processedValues.image = await FileParser(values.image);
          await editBrand({
            brandId: parsedBrandDetails._id,
            title: values.title,
            image: processedValues.image,
            path: pathname,
          });
          setUpdateImage(false);
          router.push("/office/brand");
        } else {
          const processedValues = { ...values };
          processedValues.image = await FileParser(values.image);

          await createBrand({
            title: values.title,
            image: processedValues.image,
            path: pathname,
          });

          router.push("/office/brand");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmiting(false);
      form.reset();
    }
  }
  return (
    <>
      <button
        className={` p-2 m-8 text-center primary-gradient text-light-900 rounded-lg ${type && "hidden"} `}
        onClick={() => setIsHidden((prev) => !prev)}
      >
        {isHidden ? "Create Brand" : "Hide form"}
      </button>
      <div className={`${!type && isHidden && "hidden"} `}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex  flex-col gap-5 w-[900px] border p-10 rounded-lg mx-auto"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Title <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-2">
                    <Input
                      className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[36px] border"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Image
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      {...fieldProps}
                      type="file"
                      accept="image/*, application/pdf"
                      onChange={(event) => {
                        onChange(event.target.files?.[0]);
                        setUpdateImage(true);
                      }}
                      className="w-[300px]"
                    />
                  </FormControl>
                  <FormDescription>
                    Only jpg. png. webp. max size 20kb
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="primary-gradient w-fit !text-light-900"
              disabled={isSubmiting}
            >
              {isSubmiting ? (
                <>{type === "Edit" ? "Editing..." : "Posting..."}</>
              ) : (
                <>{type === "Edit" ? "Edit Brand" : "Create Brand"} </>
              )}
            </Button>
            <Link href={"/office/brand"} className={`${!type && "hidden"}`}>
              Go Back
            </Link>
          </form>
        </Form>
      </div>
    </>
  );
};

export default BrandForm;
