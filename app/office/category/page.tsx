import CategoryList from "@/components/categoryList/page";
import CategoryForm from "@/components/forms/CategoryForm";
import React from "react";

const page = () => {
  return (
    <div>
      <CategoryForm />
      <CategoryList />
    </div>
  );
};

export default page;
