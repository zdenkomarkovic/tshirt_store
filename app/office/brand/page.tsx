import BrandList from "@/components/brandList/page";
import BrandForm from "@/components/forms/BrandForm";
import React from "react";

const page = () => {
  return (
    <div>
      <BrandForm />
      <BrandList />
    </div>
  );
};

export default page;
