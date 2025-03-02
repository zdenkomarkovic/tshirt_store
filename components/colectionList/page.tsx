import EditDeleteAction from "@/components/shared/EditDeleteAction";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { getColections } from "@/lib/actions/colection.action";
import Image from "@/node_modules/next/image";
import Link from "@/node_modules/next/link";
import React from "react";
import ColectionForm from "../forms/ColectionForm";

const ColectionList = async () => {
  const result = await getColections();

  return (
    <div>
      <div>
        <ColectionForm />
      </div>
      <div className="container">
        <div className="w-full">
          <Table className="w-[900px] border-y-2">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox />
                </TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Subtitle</TableHead>
                <TableHead>Link to</TableHead>

                <TableHead className="text-right">opcije</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result?.map((colection: any) => {
                return (
                  <TableRow key={colection._id} className="">
                    <TableCell className="">
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Image
                        src={colection.image}
                        width={50}
                        height={50}
                        alt="colection-image"
                      />
                    </TableCell>
                    <TableCell>{colection.title}</TableCell>
                    <TableCell>{colection.subtitle}</TableCell>
                    <TableCell>
                      <Link href={colection.link}>{colection.link}</Link>
                    </TableCell>

                    <TableCell className="text-right">
                      <EditDeleteAction
                        type="Colection"
                        itemId={colection._id}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ColectionList;
