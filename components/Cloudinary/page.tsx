import React from "react";
import { CldUploadWidget } from "next-cloudinary";

const Cloudinary = () => {
  return (
    <div className="w-[500px] mx-auto flex flex-col">
      <label htmlFor="">Image:</label>
      <CldUploadWidget uploadPreset="tshirt-uploads-unsigned">
        {({ open }) => {
          return (
            <button
              onClick={() => open()}
              className="bg-indigo-500 rounded py-2 px-4 mb-4 text-white"
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
