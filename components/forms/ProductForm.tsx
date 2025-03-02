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
import Link from "@/node_modules/next/link";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "@/components/ui/badge";
import Image from "@/node_modules/next/image";
import { ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

interface Props {
  type?: string;
  productDetails?: string;
  categories: string; // JSON string koji će se parsirati
  savedTags: string; // JSON string koji će se parsirati
}

const ProductForm = ({
  type,
  productDetails,
  categories,
  savedTags,
}: Props) => {
  const editorRef = useRef(null);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [updateImage, setUpdateImage] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const parsedProductDetails =
    productDetails && JSON.parse(productDetails || "");
  let parsedTags = [];
  try {
    parsedTags = JSON.parse(savedTags || "[]");
  } catch (error) {
    console.error("Error parsing savedTags:", error);
  }

  const groupedTags = parsedProductDetails?.tags.map((tag: any) => tag.title);

  let parsedCategories = [];
  try {
    parsedCategories = JSON.parse(categories || "[]");
  } catch (error) {
    console.error("Error parsing categories:", error);
  }
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: parsedProductDetails?.title || "",
      category: parsedProductDetails?.category || "",
      // brand: parsedProductDetails?.brand || "",
      price: parsedProductDetails?.price || "",
      discount: parsedProductDetails?.discount || "",
      stock: parsedProductDetails?.stock || "",
      image: parsedProductDetails?.image || "",
      features: parsedProductDetails?.features || "",
      description: parsedProductDetails?.description || "",
      hidden: parsedProductDetails?.hidden || false,
      showOnLandingPage: parsedProductDetails?.showOnLandingPage || false,
      productCode: parsedProductDetails?.productCode || "",
      // avaibility: parsedProductDetails?.avaibility || "",
      metaTitle: parsedProductDetails?.metaTitle || "",
      metaDescription: parsedProductDetails?.metaDescription || "",
      tags: groupedTags || [],
    },
  });

  async function onSubmit(values: z.infer<typeof ProductSchema>) {
    setIsSubmiting(true);
    try {
      if (type === "Edit" && !updateImage) {
        await editProduct({
          productId: parsedProductDetails._id,
          title: values.title,
          category: values.category,
          brand: values.brand,
          price: values.price,
          discount: values.discount,
          stock: values.stock,
          image: values.image,
          features: values.content,
          description: values.description,
          hidden: values.hidden,
          showOnLandingPage: values.showOnLandingPage,
          productCode: values.productCode,
          avaibility: values.avaibility,
          metaTitle: values.metaTitle,
          metaDescription: values.metaDescription,
          tags: values.tags,
          path: pathname,
        });

        router.push("/office/productsList");
      } else {
        if (type === "Edit" && updateImage) {
          const processedValues = { ...values };
          processedValues.image = await FileParser(values.image);
          await editProduct({
            productId: parsedProductDetails._id,
            title: values.title,
            category: values.category,
            brand: values.brand,
            price: values.price,
            discount: values.discount,
            stock: values.stock,
            image: processedValues.image,
            features: values.content,
            description: values.description,
            hidden: values.hidden,
            showOnLandingPage: values.showOnLandingPage,
            productCode: values.productCode,
            avaibility: values.avaibility,
            metaTitle: values.metaTitle,
            metaDescription: values.metaDescription,
            tags: values.tags,
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
            category: values.category,
            // brand: values.brand,
            price: values.price,
            discount: values.discount,
            stock: values.stock,
            image: processedValues.image,
            features: values.content,
            description: values.description,
            hidden: values.hidden,
            showOnLandingPage: values.showOnLandingPage,
            productCode: values.productCode,
            // avaibility: values.avaibility,
            metaTitle: values.metaTitle,
            metaDescription: values.metaDescription,
            tags: values.tags,
            path: pathname,
          });
          router.push("/office/productsList");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmiting(false);
    }
  }

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
          setOpen(false);
        }
      }
    }
  };
  const setSelectedTag = (tagValue, field) => {
    if (tagValue !== "") {
      if (!field.value.includes(tagValue as never)) {
        form.setValue("tags", [...field.value, tagValue]);
        form.clearErrors("tags");
      }
    }
  };

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTags);
  };

  return (
    <>
      <button
        className={` p-2 m-8 text-center primary-gradient text-light-900 rounded-lg ${type && "hidden"} `}
        onClick={() => setIsHidden((prev) => !prev)}
      >
        {isHidden ? "Create Product" : "Hide form"}
      </button>
      <div className={`${!type && isHidden && "hidden"} `}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex  flex-col gap-5 w-[900px] border p-10 rounded-lg mx-auto"
          >
            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }: any) => (
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
              <div className="flex gap-5 w-full">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }: any) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel className="paragraph-semibold text-dark400_light800">
                        Category <span className="text-primary-500">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="mt-2">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {parsedCategories?.map((category: any) => {
                            return (
                              <SelectItem
                                key={category._id}
                                value={category._id}
                                className="text-wrap"
                              >
                                {category.title}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>

                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel className="paragraph-semibold text-dark400_light800">
                        Brand
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="mt-2">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Brand" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {parsedCategories?.map((category) => {
                            return (
                              <SelectItem
                                key={category._id}
                                value={category._id}
                              >
                                {category.title}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>

                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                /> */}
              </div>
            </div>
            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="price"
                render={({ field }: any) => (
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
                render={({ field }: any) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel className="paragraph-semibold text-dark400_light800">
                      Discount
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
                render={({ field }: any) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel className="paragraph-semibold text-dark400_light800">
                      Stock
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
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, onChange, ...fieldProps } }: any) => (
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
              render={({ field }: any) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Features
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Editor
                      apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                      // @ts-ignore
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      onBlur={field.onBlur}
                      onEditorChange={(content: any) => field.onChange(content)}
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
                        content_style:
                          "body { font-family:Inter; font-size:14px }",
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
              render={({ field }: any) => (
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
                      onEditorChange={(content: any) => field.onChange(content)}
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
            <div className="flex gap-5  ">
              <FormField
                control={form.control}
                name="hidden"
                render={({ field }: any) => (
                  <FormItem className="flex  flex-col items-center">
                    <FormLabel className="paragraph-semibold text-dark400_light800">
                      Visible
                    </FormLabel>
                    <FormControl className="mt-3.5">
                      <Switch
                        className={` ${field.value ? "bg-slate-300" : "primary-gradient"} scale-90 `}
                        checked={!field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>

                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="showOnLandingPage"
                render={({ field }: any) => (
                  <FormItem className="flex flex-col items-center">
                    <FormLabel className="paragraph-semibold text-dark400_light800 text-nowrap">
                      Show on Landing Page
                    </FormLabel>
                    <FormControl className="mt-3.5">
                      <Switch
                        className={` ${field.value ? "primary-gradient" : "bg-slate-300"} scale-90 `}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>

                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productCode"
                render={({ field }: any) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel className="paragraph-semibold text-dark400_light800">
                      Product kod
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

              {/* <FormField
                control={form.control}
                name="avaibility"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel className="paragraph-semibold text-dark400_light800">
                      Avaibility
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="mt-2">
                        <SelectTrigger>
                          <SelectValue placeholder="---" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {parsedCategories?.map((category) => {
                          return (
                            <SelectItem key={category._id} value={category._id}>
                              {category.title}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>

                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              /> */}
            </div>

            <FormField
              control={form.control}
              name="metaTitle"
              render={({ field }: any) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Meta title
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
              name="metaDescription"
              render={({ field }: any) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Meta description
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
              name="tags"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Tags<span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-2">
                    <>
                      <Popover
                        open={open}
                        onOpenChange={setOpen}
                        className="ml-10"
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[200px] justify-between"
                          >
                            &quot;Enter Tags...
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput
                              placeholder="Enter Tag..."
                              onKeyDown={(e) => {
                                handleInputKeyDown(e, field);
                              }}
                            />
                            <CommandList>
                              <CommandEmpty>No tag found.</CommandEmpty>
                              <CommandGroup>
                                {parsedTags.map((tag: any) => (
                                  <CommandItem
                                    key={tag.title}
                                    value={tag.title}
                                    onSelect={(currentValue: any) => {
                                      setValue(
                                        currentValue === value
                                          ? ""
                                          : currentValue
                                      );
                                      setSelectedTag(currentValue, field);
                                      currentValue = "";
                                      setOpen(false);
                                    }}
                                  >
                                    {tag.title}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      {field.value.length > 0 && (
                        <div className=" flex flex-row-reverse mt-2.5 gap-2.5">
                          {field.value.map((tag: any) => (
                            <Badge
                              key={tag}
                              className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2"
                            >
                              {tag}
                              <Image
                                src="/assets/icons/close.svg"
                                alt="Close icon"
                                width={12}
                                height={12}
                                className="cursor-pointer object-contain invert-0 dark:invert"
                                onClick={() => handleTagRemove(tag, field)}
                              />
                            </Badge>
                          ))}
                        </div>
                      )}
                    </>
                  </FormControl>
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    Select an existing tag from the list; to add a new tag,
                    enter the tag text and press Enter.
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
                <>{type === "Edit" ? "Edit Product" : "Create Product"} </>
              )}
            </Button>
            <Link
              href={"/office/productsList"}
              className={`${!type && "hidden"}`}
            >
              Go Back
            </Link>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ProductForm;
