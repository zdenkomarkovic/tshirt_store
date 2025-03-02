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
import { CategorySchema } from "@/lib/validations";
import { usePathname, useRouter } from "@/node_modules/next/navigation";
import { FileParser } from "../../lib/FileParser";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../ui/select";
import { createCategory, editCategory } from "@/lib/actions/category.action";
import Link from "@/node_modules/next/link";

interface Props {
  type?: string;
  categoryDetails?: string;
}

const CategoryForm = ({ type, categoryDetails }: Props) => {
  const editorRef = useRef(null);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [updateImage, setUpdateImage] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const parsedCategoryDetails =
    categoryDetails && JSON.parse(categoryDetails || "");

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      title: parsedCategoryDetails?.title || "",
      linked: parsedCategoryDetails?.linked || "",
      image: parsedCategoryDetails?.image || "",
      description: parsedCategoryDetails?.description || "",
    },
  });

  async function onSubmit(values: z.infer<typeof CategorySchema>) {
    setIsSubmiting(true);
    try {
      if (type === "Edit" && !updateImage) {
        const processedValues = { ...values };
        processedValues.linked = processedValues.linked || "";
        await editCategory({
          categoryId: parsedCategoryDetails._id,
          title: values.title,
          linked: processedValues.linked,
          image: values.image,
          description: values.description,
          path: pathname,
        });
        router.push("/office/category");
      } else {
        if (type === "Edit" && updateImage) {
          const processedValues = { ...values };
          processedValues.image = await FileParser(values.image);
          processedValues.linked = processedValues.linked || "";
          await editCategory({
            categoryId: parsedCategoryDetails._id,
            title: values.title,
            linked: processedValues.linked,
            image: processedValues.image,
            description: values.description,
            path: pathname,
          });
          setUpdateImage(false);
          router.push("/office/category");
        } else {
          const processedValues = { ...values };
          processedValues.image = await FileParser(values.image);
          processedValues.linked = processedValues.linked || "";

          await createCategory({
            title: values.title,
            linked: processedValues.linked,
            image: processedValues.image,
            description: values.description,
            path: pathname,
          });

          router.push("/office/category");
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
        {isHidden ? "Create Category" : "Hide form"}
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
              name="linked"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Pozicija kategorije
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="mt-2">
                      <SelectTrigger className="w-[300px]">
                        <SelectValue placeholder="Prva pozicija - glavna kategorija" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Prva pozicija - glavna kategorija">
                          Prva pozicija - glavna kategorija
                        </SelectItem>
                        <SelectItem value="Bastenska oprema">
                          Bastenska oprema
                        </SelectItem>
                        <SelectItem value="Gejmerska oprema">
                          Gejmerska oprema
                        </SelectItem>
                        <SelectItem value="Fitnes oprema">
                          Fitnes oprema
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Opis
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Editor
                      apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                      // @ts-ignore
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      onBlur={field.onBlur}
                      onEditorChange={(content) => field.onChange(content)}
                      initialValue={parsedCategoryDetails?.content || ""}
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
                        content_style:
                          "body { font-family:Inter; font-size:14px }",
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
                <>{type === "Edit" ? "Edit Category" : "Create Category"} </>
              )}
            </Button>
            <Link href={"/office/category"} className={`${!type && "hidden"}`}>
              Go Back
            </Link>
          </form>
        </Form>
      </div>
    </>
  );
};

export default CategoryForm;
