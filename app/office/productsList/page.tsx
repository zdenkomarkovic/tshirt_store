import EditDeleteAction from "@/components/shared/EditDeleteAction";
import { getProducts } from "@/lib/actions/product.action";
import Image from "@/node_modules/next/image";
import React from "react";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const page = async () => {
  let result = await getProducts();

  return (
    <>
      <div className="container">
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

                <TableHead className="text-right">opcije</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.map((product) => {
                return (
                  <TableRow key={product._id} className="">
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
                    <TableCell>kategorija</TableCell>
                    <TableCell>brend</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Switch />
                    </TableCell>
                    <TableCell className="text-right">
                      <EditDeleteAction type="Product" itemId={product._id} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <table>
            <thead>
              <tr>
                <th>check</th>
                <th>slika</th>
                <th>proizvod</th>
                <th>kategorija</th>
                <th>brend</th>
                <th>cena</th>
                <th>zalihe</th>
                <th>vidljivost</th>
                <th>opcije</th>
              </tr>
            </thead>
            <tbody>
              {result.map((product) => {
                return (
                  <tr key={product.id}>
                    <td>check</td>
                    <td>
                      <Image
                        src={product.image}
                        width={50}
                        height={50}
                        alt="product-image"
                      />
                    </td>
                    <td>{product.title}</td>
                    <td>kategorija</td>
                    <td>brend</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <Switch className="bg-blue-300" />
                    </td>
                    <td>
                      <EditDeleteAction type="Product" itemId={product._id} />
                    </td>
                  </tr>
                );
              })}
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default page;
