import EditDeleteAction from "@/components/shared/EditDeleteAction";
import { getProducts } from "@/lib/actions/product.action";
import Image from "@/node_modules/next/image";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductForm from "@/components/forms/ProductForm";
import VisibilityAction from "@/components/shared/VisibilityAction";
import { getCategories } from "@/lib/actions/category.action";
import { getTags } from "@/lib/actions/tag.action";

const page = async () => {
  const filter = "regular";
  const result = await getProducts({ filter });
  const categories = (await getCategories()) || [];
  const tags = (await getTags()) || [];

  const categoryMap = categories.reduce((acc, category) => {
    acc[category._id] = category.title;
    return acc;
  }, {});

  return (
    <>
      <div className="container">
        <ProductForm
          categories={JSON.stringify(categories)}
          savedTags={JSON.stringify(tags)}
        />
        <div>
          <Button>Svi proizvodi</Button>
          <Button>Nema u magacinu</Button>
          <Button>Alarm zaliha</Button>
          <Button>Aktivni</Button>
          <Button>Neaktivni</Button>
          <Button>Poslednji uvoz</Button>
        </div>
        <div className="flex gap-2">
          <Button>Search</Button>
          <Input placeholder="Naziv" className="h-8" />
          <Input placeholder="Sifra" className="h-8" />
          <Input placeholder="Kod" className="h-8" />
          <Input placeholder="Brand" className="h-8" />
          <Input placeholder="Kategorija" className="h-8" />
          <Input placeholder="Brand" className="h-8" />
          <Button>Prikazi vise</Button>
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox />
                </TableHead>
                <TableHead>slika</TableHead>
                <TableHead>proizvod</TableHead>
                <TableHead>kategorija</TableHead>
                <TableHead>brend</TableHead>
                <TableHead>cena</TableHead>
                <TableHead>zalihe</TableHead>
                <TableHead>vidljivost</TableHead>
                <TableHead>vidjeno</TableHead>

                <TableHead className="text-right">opcije</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.map((product) => {
                return (
                  <TableRow
                    key={product._id}
                    className={`${product.hidden && "opacity-60 bg-slate-500"}`}
                  >
                    <TableCell className="">
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Image
                        src={product.image}
                        width={50}
                        height={50}
                        alt="product-image"
                      />
                    </TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{categoryMap[product.category]}</TableCell>
                    <TableCell>brend</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell className="w-[135px]">
                      <p>{product.hidden ? "Product is Hidden" : "Visible"}</p>
                      <VisibilityAction
                        type={"product"}
                        itemId={product._id}
                        visibility={product.hidden}
                      />
                    </TableCell>
                    <TableCell>{product.views}</TableCell>
                    <TableCell className="text-right">
                      <EditDeleteAction type="Product" itemId={product._id} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default page;
