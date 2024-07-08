import EditDeleteAction from "@/components/shared/EditDeleteAction";
import Image from "@/node_modules/next/image";
import React from "react";
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
import { getBrands } from "@/lib/actions/brand.action";

const BrandList = async () => {
  let result = await getBrands();

  return (
    <>
      <div className="container">
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox />
                </TableHead>
                <TableHead>slika</TableHead>

                <TableHead>Ime brenda</TableHead>

                <TableHead className="text-right">opcije</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result?.map((brand) => {
                return (
                  <TableRow key={brand._id}>
                    <TableCell className="">
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Image
                        src={brand.image}
                        width={50}
                        height={50}
                        alt="brand-image"
                      />
                    </TableCell>
                    <TableCell>{brand.title}</TableCell>

                    <TableCell className="text-right">
                      <EditDeleteAction type="Brand" itemId={brand._id} />
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

export default BrandList;
