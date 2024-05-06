"use client";

import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
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
import { ProductSchema } from "@/lib/validations";
import { createProduct, editProduct } from "@/lib/actions/product.action";
import { usePathname, useRouter } from "@/node_modules/next/navigation";
import { FileParser } from "../../lib/FileParser";

interface Props {
  type?: string;
  productDetails?: string;
}

const ProductForm = ({ type, productDetails }: Props) => {
  const editorRef = useRef(null);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [updateImage, setUpdateImage] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const parsedProductDetails =
    productDetails && JSON.parse(productDetails || "");

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: parsedProductDetails?.title || "",
      price: parsedProductDetails?.price || "",
      discount: parsedProductDetails?.discount || "",
      stock: parsedProductDetails?.stock || "",
      image: parsedProductDetails?.image || "",
      features: parsedProductDetails?.features || "",
      description: parsedProductDetails?.description || "",
    },
  });

  async function onSubmit(values: z.infer<typeof ProductSchema>) {
    setIsSubmiting(true);
    try {
      if (type === "Edit" && !updateImage) {
        await editProduct({
          productId: parsedProductDetails._id,
          title: values.title,
          price: values.price,
          discount: values.discount,
          stock: values.stock,
          image: values.image,
          features: values.features,
          description: values.description,
          path: pathname,
        });

        router.push(`/products/${parsedProductDetails._id}`);
        // router.push("/office/productsList");
      } else {
        if (type === "Edit" && updateImage) {
          const processedValues = { ...values };
          processedValues.image = await FileParser(values.image);
          await editProduct({
            productId: parsedProductDetails._id,
            title: values.title,
            price: values.price,
            discount: values.discount,
            stock: values.stock,
            image: processedValues.image,
            features: values.features,
            description: values.description,
            path: pathname,
          });
          setUpdateImage(false);
          // router.push(`/products/${parsedProductDetails.id}`);
          router.push("/office/productsList");
        } else {
          const processedValues = { ...values };
          processedValues.image = await FileParser(values.image);

          await createProduct({
            title: values.title,
            price: values.price,
            discount: values.discount,
            stock: values.stock,
            image: processedValues.image,
            features: values.content,
            description: values.description,
            path: pathname,
          });
          router.push("/office/productsList");
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
          name="price"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Price <span className="text-primary-500">*</span>
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
          name="discount"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Discount <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
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
          name="stock"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Stock <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
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
          name="features"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Features <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  // @ts-ignore
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  initialValue={parsedProductDetails?.content || ""}
                  init={{
                    height: 350,
                    menubar: true,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style: "body { font-family:Inter; font-size:14px }",
                  }}
                />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Description <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  // @ts-ignore
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  initialValue={parsedProductDetails?.description || ""}
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
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
            <>{type === "Edit" ? "Edit Product" : "Create Product"} </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
