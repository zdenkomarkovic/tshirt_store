"use client";

import React, { useState } from "react";
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
import { SliderSchema } from "@/lib/validations";
import { usePathname, useRouter } from "@/node_modules/next/navigation";
import { FileParser } from "../../lib/FileParser";
import { createSlider, editSlider } from "@/lib/actions/slider.action";
import Link from "@/node_modules/next/link";

interface Props {
  type?: string;
  sliderDetails?: string;
}

const SliderForm = ({ type, sliderDetails }: Props) => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [updateImage, setUpdateImage] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const parsedSliderDetails = sliderDetails && JSON.parse(sliderDetails || "");

  const form = useForm<z.infer<typeof SliderSchema>>({
    resolver: zodResolver(SliderSchema),
    defaultValues: {
      title: parsedSliderDetails?.title || "",
      subtitle: parsedSliderDetails?.subtitle || "",
      image: parsedSliderDetails?.image || "",
      link: parsedSliderDetails?.link || "",
    },
  });

  async function onSubmit(values: z.infer<typeof SliderSchema>) {
    setIsSubmiting(true);
    try {
      if (type === "Edit" && !updateImage) {
        await editSlider({
          sliderId: parsedSliderDetails._id,
          title: values.title,
          subtitle: values.subtitle,
          image: values.image,
          link: values.link,
          path: pathname,
        });

        // router.push(`/products/${parsedSliderDetails._id}`);
        router.push("/office/baner");
      } else {
        if (type === "Edit" && updateImage) {
          const processedValues = { ...values };
          processedValues.image = await FileParser(values.image);
          await editSlider({
            sliderId: parsedSliderDetails._id,
            title: values.title,
            subtitle: values.subtitle,
            image: processedValues.image,
            link: values.link,
            path: pathname,
          });
          setUpdateImage(false);
          router.push("/office/baner");
        } else {
          const processedValues = { ...values };
          processedValues.image = await FileParser(values.image);

          await createSlider({
            title: values.title,
            subtitle: values.subtitle,
            image: processedValues.image,
            link: values.link,
            path: pathname,
          });
          setIsHidden((prev) => !prev);
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
        className={`primary-gradient m-8 rounded-lg p-2 text-center text-light-900 ${type && "hidden"} `}
        onClick={() => setIsHidden((prev) => !prev)}
      >
        {isHidden ? "Create Slide" : "Hide form"}
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
                    Title
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
              name="subtitle"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Subtitle
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
                    Image <span className="text-primary-500">*</span>
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
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Link to
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
            <Button
              type="submit"
              className="primary-gradient w-fit !text-light-900"
              disabled={isSubmiting}
            >
              {isSubmiting ? (
                <>{type === "Edit" ? "Editing..." : "Posting..."}</>
              ) : (
                <>{type === "Edit" ? "Edit Slide" : "Create Slide"} </>
              )}
            </Button>
            <Link href={"/office/baner"} className={`${!type && "hidden"}`}>
              Go Back
            </Link>
          </form>
        </Form>
      </div>
    </>
  );
};

export default SliderForm;
