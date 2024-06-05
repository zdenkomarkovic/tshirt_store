import { getCategories } from "@/lib/actions/category.action";
import Image from "@/node_modules/next/image";
import React from "react";
import EditDeleteAction from "../shared/EditDeleteAction";
import { Switch } from "../ui/switch";

const CategoryList = async () => {
  let result = await getCategories();

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>check</th>
            <th>slika</th>
            <th>kategorija</th>
            <th>vidljivost</th>
            <th>opcije</th>
          </tr>
        </thead>
        <tbody>
          {result.map((category: any) => {
            return (
              <tr key={category.id}>
                <td>check</td>
                <td>
                  <Image
                    src={category.image}
                    width={50}
                    height={50}
                    alt="category-image"
                  />
                </td>
                <td>{category.title}</td>

                <td>{category.linked}</td>
                <td>{category.description}</td>
                <td>
                  <Switch className="bg-blue-300" />
                </td>
                <td>
                  <EditDeleteAction type="Category" itemId={category._id} />
                </td>
              </tr>
            );
          })}
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
