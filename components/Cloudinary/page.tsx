import React from "react";
import { CldUploadWidget } from "next-cloudinary";

const Cloudinary = () => {
  return (
    <div className="mx-auto flex w-[500px] flex-col">
      <label htmlFor="">Image:</label>
      <CldUploadWidget uploadPreset="tshirt-uploads-unsigned">
        {({ open }) => {
          return (
            <button
              onClick={() => open()}
              className="mb-4 rounded bg-indigo-500 px-4 py-2 text-white"
            >
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default Cloudinary;
