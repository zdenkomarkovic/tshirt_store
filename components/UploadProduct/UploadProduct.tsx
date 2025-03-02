"use client";

import Image from "@/node_modules/next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const TSHIRT_CLOUDINARY_API_KEY: string =
  process.env.TSHIRT_CLOUDINARY_API_KEY || "";

const UploadProduct = () => {
  // const [state, setState] = useState("");
  // const [file, setFile] = useState<File | undefined>();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFiles(acceptedFiles);
    const file = new FileReader();
    file.onload = function () {
      setPreview(file.result);
    };
    file.readAsDataURL(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleOnSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return;
    const formData = new FormData();
    formData.append("file", selectedFiles[0]); // Koristi prvi fajl
    formData.append("upload_preset", "tshirt-uploads-unsigned");
    formData.append("api_key", TSHIRT_CLOUDINARY_API_KEY);

    const results = await fetch(
      "https://api.cloudinary.com/v1_1/dhvwrf6zj/image/upload",
      {
        method: "POST",
        body: formData,
      },
    ).then((res) => res.json());
    console.log(results);
  };

  // const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
  //   const target = e.target as HTMLInputElement & {
  //     files: FileList;
  //   };
  //   setFile(target.files[0]);
  //   const file = new FileReader();
  //   file.onload = function () {
  //     setPreview(file.result);
  //   };
  //   file.readAsDataURL(target.files[0]);
  // };

  return (
    <div className="mx-auto my-[50px] w-[600px] rounded-lg border py-[50px]">
      <h3 className="h2-bold text-center">Add the product</h3>
      <form
        onSubmit={handleOnSubmit}
        className="mx-auto flex w-[450px] flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <label className="base-medium">Title:</label>
          <input
            type="text"
            name="title"
            className="base-medium rounded-md border px-[15px] py-[5px]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="base-medium">Description:</label>
          <input
            type="text"
            name="description"
            className="base-medium rounded-md border px-[15px] py-[5px]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="base-medium">Image:</label>
          {/* <input
            type="file"
            name="image"
            accept="image/png, image/jpg"
            className="border rounded-md base-medium py-[5px] px-[15px]"
            onChange={handleOnChange}
            multiple
          /> */}
          {typeof preview === "string" && (
            <Image
              src={preview}
              width={100}
              height={100}
              className={`${preview ? "" : "hidden"}`}
              alt="Preview"
            />
          )}

          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>
                Drag &apos;n&apos; drop some files here, or click to select
                files
              </p>
            )}
          </div>
        </div>
        <div className="">
          <button className="primary-gradient base-medium rounded-md px-[15px] py-[5px] text-light-900">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadProduct;
