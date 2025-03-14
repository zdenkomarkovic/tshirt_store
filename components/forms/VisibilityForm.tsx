"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { VisibilitySchema } from "@/lib/validations";
import { usePathname } from "@/node_modules/next/navigation";
import { Switch } from "../ui/switch";
import { createVisibility } from "@/lib/actions/visibility.action";

interface Props {
  type?: string;
  productDetails?: string;
}

const VisibilityForm = ({ type, productDetails }: Props) => {
  const [isHidden, setIsHidden] = useState(true);
  const pathname = usePathname();

  const parsedProductDetails =
    productDetails && JSON.parse(productDetails || "");

  const form = useForm<z.infer<typeof VisibilitySchema>>({
    resolver: zodResolver(VisibilitySchema),
    defaultValues: {
      title: parsedProductDetails?.title || "",
      hidden: parsedProductDetails?.hidden || false,
    },
  });

  async function onSubmit(values: z.infer<typeof VisibilitySchema>) {
    try {
      await createVisibility({
        title: values.title,
        hidden: values.hidden,
        path: pathname,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <button
        className={`primary-gradient m-8 rounded-lg p-2 text-center text-light-900 ${type && "hidden"} `}
        onClick={() => setIsHidden((prev) => !prev)}
      >
        {isHidden ? "Create Visibility" : "Hide form"}
      </button>
      <div className={`${!type && isHidden && "hidden"} `}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto flex w-[900px] flex-col gap-5 rounded-lg border p-10"
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
              name="hidden"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    {field.value ? "hidden" : "hide"}
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Switch
                      className={`primary-gradient scale-90`}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="primary-gradient w-fit !text-light-900"
            >
              Create Visibility
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default VisibilityForm;
